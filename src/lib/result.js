// Fungsi-fungsi kecil (murni, tanpa React) untuk memproses respons backend.

export const MIN_CHARS = 20
export const MAX_CHARS = 5000

// Di dataset label "Legit" berarti Real
export function displayLabel(label) {
  return label === 'Legit' ? 'Real' : label
}

// Keyakinan model biner selalu 50%..100% -> posisi penanda 0..100 pada bar
export function gaugePosition(conf) {
  return Math.min(100, Math.max(0, ((conf - 0.5) / 0.5) * 100))
}

// intensity: -1 (mendorong ke Real) .. +1 (mendorong ke Fake)
export function highlightColor(intensity, seen = true) {
  if (!seen) return 'transparent'
  const a = Math.min(1, Math.abs(intensity || 0)) * 0.5
  return intensity > 0
    ? `rgba(179,38,30,${a.toFixed(2)})`
    : `rgba(31,111,84,${a.toFixed(2)})`
}

export function fmtSigned(v) {
  const n = Number(v)
  return (n > 0 ? '+' : '') + n.toFixed(2)
}

// Tiga batang untuk chart: modul konteks/numerik/fuzzy/justification menerima
// nilai default (bukan dari teks), jadi digabung menjadi "kecenderungan bawaan".
export function buildBarData(result) {
  const by = Object.fromEntries(
    (result.module_contributions || []).map((m) => [m.module, m.value]),
  )
  const base =
    result.base_offset ??
    (by.ctx || 0) + (by.num || 0) + (by.fuzzy || 0) + (by.just || 0) + (result.contribution_bias || 0)
  return [
    { label: 'Makna teks (MiniLM)', value: by.stmt ?? 0 },
    { label: 'Penggabung HFGNN', value: by.hfgnn ?? 0 },
    { label: 'Kecenderungan bawaan model', value: base },
  ]
}

// Untuk PDF beberapa halaman: potong canvas tinggi menjadi irisan per halaman
export function pageSlices(canvasW, canvasH, pageW, pageH, margin) {
  const imgW = pageW - margin * 2
  const contentH = pageH - margin * 2
  const slicePx = Math.floor((contentH * canvasW) / imgW)
  const out = []
  for (let y = 0; y < canvasH; y += slicePx) {
    const sh = Math.min(slicePx, canvasH - y)
    out.push({ sy: y, sh, dw: imgW, dh: (sh * imgW) / canvasW })
  }
  return out
}
