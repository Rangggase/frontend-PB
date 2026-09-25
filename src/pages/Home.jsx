import { useState } from 'react'
import EducationSection from '../components/EducationSection'
import InputForm from '../components/InputForm'
import ResultModal from '../components/ResultModal'
import Toast from '../components/Toast'
import HeroGraphic from '../components/HeroGraphic'
import { checkNews } from '../services/api'

const STATS = [
  { value: '5', label: 'Modul dalam model hibrida' },
  { value: '2', label: 'Bahasa: Indonesia & Inggris' },
  { value: '±64%', label: 'Akurasi seimbang (teks saja)' },
]

export default function Home() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleCheck = async (text) => {
    setLoading(true)
    setError(null)
    try {
      const data = await checkNews(text)
      setResult(data)
      setModalOpen(true)
    } catch (err) {
      setError(err?.message || 'Gagal menghubungi server. Coba lagi nanti.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <Toast message={error} type="error" onClose={() => setError(null)} />

      {/* Hero — dua kolom penuh lebar layar */}
      <section className="grid lg:grid-cols-[1fr_440px] gap-12 lg:gap-16 px-6 lg:px-12 py-14 lg:py-20 max-w-[1600px] mx-auto items-start">
        <div className="max-w-2xl">
          <p className="font-serif text-base italic text-accent-dim mb-3">
            Sebelum kamu tekan bagikan —
          </p>
          <h1 className="font-serif text-5xl xl:text-6xl font-semibold leading-[1.05] text-ink tracking-tight">
            Periksa berita ini dulu.
          </h1>
          <p className="mt-5 text-base text-ink-muted leading-relaxed max-w-lg">
            Tempel isi berita di bawah. Model akan memberi indikasi <em className="font-serif not-italic text-fake">Fake</em>{' '}
            atau <em className="font-serif not-italic text-real">Real</em> beserta alasannya — alat bantu untuk
            berpikir kritis, bukan penentu kebenaran.
          </p>

          <div className="mt-10 max-w-xl">
            <InputForm onSubmit={handleCheck} loading={loading} />
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="border border-rule bg-paper-dim/30 p-6">
            <HeroGraphic />
          </div>
          <dl className="mt-6 divide-y divide-rule border-t border-rule">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between py-3">
                <dt className="text-sm text-ink-muted">{s.label}</dt>
                <dd className="font-serif text-2xl font-semibold text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Edukasi — band bertekstur, full-bleed */}
      <section className="border-t border-rule bg-paper-dim/40">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16">
          <EducationSection />
        </div>
      </section>

      <ResultModal result={result} open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}
