import { useState } from 'react'
import { MIN_CHARS, MAX_CHARS } from '../lib/result'

const EXAMPLES = [
  {
    label: 'Pesan berantai',
    text: 'BREAKING: Pemerintah diam-diam menaikkan harga BBM hingga 50 persen mulai besok pagi. Warga diminta segera membagikan pesan ini ke semua grup sebelum media menghapusnya.',
  },
  {
    label: 'Klaim politik (Inggris)',
    text: 'Says the state cut funding for school lunch programs by half last year, and that nobody in the legislature was told about it. Officials have refused to comment, and the numbers have not been published anywhere.',
  },
  {
    label: 'Berita cuaca',
    text: 'Badan cuaca memperkirakan hujan ringan hingga sedang akan turun di sebagian wilayah pada sore hingga malam hari. Masyarakat diimbau tetap waspada terhadap potensi genangan di daerah dataran rendah.',
  },
]

export default function InputForm({ onSubmit, loading }) {
  const [text, setText] = useState('')
  const [focused, setFocused] = useState(false)

  const charCount = text.length
  const trimmedLen = text.trim().length
  const tooShort = trimmedLen < MIN_CHARS
  const nearLimit = charCount > MAX_CHARS * 0.9

  const handleSubmit = (e) => {
    e.preventDefault()
    if (tooShort || loading) return
    onSubmit(text.trim())
  }

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleSubmit(e)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="news-text" className="block text-sm font-medium text-ink mb-2">
        Tempel isi berita
        <span className="font-normal text-ink-soft"> — bahasa Indonesia atau Inggris</span>
      </label>

      <textarea
        id="news-text"
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={8}
        placeholder="Tempel isi berita di sini…"
        className={`w-full bg-paper-dim/50 border-b-2 px-3 py-3 text-[15px] leading-relaxed focus:outline-none resize-y transition-colors ${
          focused ? 'border-accent' : 'border-rule-strong'
        }`}
      />

      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-ink-soft">
          {charCount > 0 && tooShort ? `Minimal ${MIN_CHARS} karakter` : 'Ctrl+Enter untuk periksa cepat'}
        </span>
        <span className={`text-xs ${nearLimit ? 'text-warn font-medium' : 'text-ink-soft'}`}>
          {charCount}/{MAX_CHARS}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-4 text-xs">
        <span className="text-ink-soft">Coba contoh:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            type="button"
            onClick={() => setText(ex.text)}
            className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
          >
            {ex.label}
          </button>
        ))}
        {text.length > 0 && (
          <button
            type="button"
            onClick={() => setText('')}
            className="text-ink-soft hover:text-fake ml-auto"
          >
            Bersihkan
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={tooShort || loading}
        className="mt-6 w-full sm:w-auto px-8 py-2.5 bg-ink text-paper text-sm font-medium hover:bg-accent-dim transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-ink"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-3.5 w-3.5 rounded-full border-2 border-paper/40 border-t-paper animate-spin" />
            Memeriksa…
          </span>
        ) : (
          'Periksa Berita'
        )}
      </button>
    </form>
  )
}
