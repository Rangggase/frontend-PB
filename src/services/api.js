import axios from 'axios'

// Alamat backend. Diatur lewat file .env (lihat .env.example).
// Untuk lokal pakai 127.0.0.1, BUKAN "localhost" (di Windows bisa lambat ±2 detik).
const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:7860').replace(/\/$/, '')
const USE_DUMMY = import.meta.env.VITE_USE_DUMMY === 'true'

export const API_BASE_URL = BASE_URL
export const IS_DEMO_MODE = USE_DUMMY

/**
 * Mengirim teks berita ke backend (POST /analyze).
 *
 * Bentuk respons backend yang dipakai komponen:
 * {
 *   prediction: "Fake" | "Real",
 *   confidence: 0.66,                 // keyakinan pada kelas yang diprediksi (0.5..1)
 *   confidence_level: "rendah" | "sedang" | "tinggi",
 *   probabilities: { Fake, Real },
 *   module_contributions: [{ module, label, informative, value, share_pct, direction }],
 *   contribution_bias, text_signal, base_offset,
 *   explanation: "...",
 *   highlights: [{ text, score, intensity(-1..1), seen_by_model }],
 *   topic: null,                      // dimatikan di backend
 *   domain: [{ label, prob }],
 *   warnings: ["..."], disclaimer: "...", language_guess, elapsed_ms
 * }
 */
export async function checkNews(text) {
  if (USE_DUMMY) return checkNewsDummy(text)

  try {
    const { data } = await axios.post(
      `${BASE_URL}/analyze`,
      { text, explain: true },
      { timeout: 90000 },
    )
    return data
  } catch (err) {
    if (err.response) {
      const detail = err.response.data?.detail
      throw new Error(
        typeof detail === 'string' ? detail : `Server mengembalikan error ${err.response.status}.`,
      )
    }
    if (err.code === 'ECONNABORTED') {
      throw new Error('Server terlalu lama menjawab. Coba lagi sebentar.')
    }
    throw new Error(`Tidak dapat menghubungi server (${BASE_URL}). Pastikan backend sedang menyala.`)
  }
}

/** Status server: 'ready' | 'loading' | 'offline' | 'demo' */
export async function checkHealth() {
  if (USE_DUMMY) return 'demo'
  try {
    const { data } = await axios.get(`${BASE_URL}/health`, { timeout: 6000 })
    return data?.model_loaded ? 'ready' : 'loading'
  } catch {
    return 'offline'
  }
}

// --- Data contoh untuk mengembangkan tampilan tanpa backend (VITE_USE_DUMMY=true) ---
function checkNewsDummy(text) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const suspicious = /breaking|viral|rahasia|segera bagikan|dihapus/i.test(text)
      const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0)
      const highlights = sentences.map((s, i) => {
        const hit = /breaking|viral|rahasia|segera bagikan|dihapus/i.test(s)
        const intensity = hit ? 0.9 : i % 2 === 0 ? -0.3 : 0.15
        return { text: s, score: intensity * 0.1, intensity, seen_by_model: true }
      })
      const sign = suspicious ? 1 : -1
      const modules = [
        { module: 'stmt', label: 'Makna teks (MiniLM)', informative: true, value: 0.9 * sign },
        { module: 'ctx', label: 'Konteks (default)', informative: false, value: 0.08 },
        { module: 'num', label: 'Riwayat numerik (default)', informative: false, value: -0.79 },
        { module: 'fuzzy', label: 'Fuzzy (default)', informative: false, value: -0.32 },
        { module: 'just', label: 'Justification/TextCNN (default)', informative: false, value: 0.65 },
        { module: 'hfgnn', label: 'Penggabung graf HFGNN', informative: true, value: 0.2 * sign },
      ].map((m) => ({ ...m, direction: m.value > 0 ? 'Fake' : 'Real', share_pct: 0 }))

      resolve({
        prediction: suspicious ? 'Fake' : 'Real',
        confidence: suspicious ? 0.78 : 0.71,
        confidence_level: 'sedang',
        probabilities: suspicious ? { Fake: 0.78, Real: 0.22 } : { Fake: 0.29, Real: 0.71 },
        module_contributions: modules,
        contribution_bias: 0.4,
        text_signal: 1.1 * sign,
        base_offset: 0.03,
        language_guess: 'id',
        explanation: suspicious
          ? 'DATA CONTOH: teks mengandung pola bahasa sensasional yang umum pada berita palsu.'
          : 'DATA CONTOH: teks tidak menunjukkan pola bahasa mencurigakan yang signifikan.',
        highlights,
        topic: null,
        domain: [
          { label: 'Politics', prob: 0.8 },
          { label: 'Business', prob: 0.15 },
          { label: 'Sports', prob: 0.05 },
        ],
        warnings: ['Mode demo: hasil ini data contoh, bukan dari model asli.'],
        disclaimer: 'Hasil ini bukan keputusan final, hanya alat bantu. Selalu verifikasi ke sumber tepercaya.',
        elapsed_ms: 900,
      })
    }, 900)
  })
}
