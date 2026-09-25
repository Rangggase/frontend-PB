import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ConfidenceIndicator from './ConfidenceIndicator'
import TopicDomainBadge from './TopicDomainBadge'
import ExplainabilityChart from './ExplainabilityChart'
import HighlightedText from './HighlightedText'
import ExportButton from './ExportButton'

export default function ResultModal({ result, open, onClose }) {
  const contentRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!result) return null

  const isFake = result.prediction === 'Fake'
  const pct = Math.round((result.confidence ?? 0) * 100)
  const verdictColor = isFake ? 'text-fake' : 'text-real'

  const handleCopy = async () => {
    const summary = `Hasil: ${isFake ? 'Fake' : 'Real'} (${pct}% keyakinan)\n${result.explanation}\n\n${result.disclaimer || 'Bukan keputusan final, hanya alat bantu.'}`
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard tidak tersedia, abaikan
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Hasil analisis"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-paper max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-rule"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-rule sticky top-0 bg-paper z-10">
              <h2 className="text-sm font-semibold text-ink-muted uppercase tracking-wide">
                Hasil Analisis
              </h2>
              <button
                onClick={onClose}
                className="text-ink-soft hover:text-ink h-7 w-7 flex items-center justify-center"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>

            <div ref={contentRef} className="px-6 py-6 bg-paper">
              {/* Verdict — satu-satunya elemen "berani" di tampilan ini */}
              <div className="flex items-end justify-between gap-4 pb-5 border-b-2 border-ink">
                <div>
                  <p className="text-xs text-ink-soft uppercase tracking-wide mb-1">Prediksi</p>
                  <p className={`font-serif text-4xl font-semibold ${verdictColor}`}>
                    {isFake ? 'Fake' : 'Real'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-ink-soft uppercase tracking-wide mb-1">Keyakinan</p>
                  <p className="font-serif text-4xl font-semibold text-ink">{pct}%</p>
                </div>
              </div>

              <ConfidenceIndicator
                confidence={result.confidence}
                level={result.confidence_level}
                disclaimer={result.disclaimer}
              />

              {result.warnings?.length > 0 && (
                <div className="mt-5 border-l-2 border-warn bg-warn-soft/60 p-3 text-xs text-ink">
                  <p className="font-semibold mb-1">Perhatian</p>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {result.warnings.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.explanation && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-ink mb-1">Mengapa hasilnya begitu?</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{result.explanation}</p>
                </div>
              )}

              <TopicDomainBadge topic={result.topic} domain={result.domain} />
              <ExplainabilityChart result={result} />
              <HighlightedText highlights={result.highlights} />

              <p className="mt-6 text-[11px] text-ink-soft">
                Dianalisis {new Date().toLocaleString('id-ID')}
                {result.elapsed_ms ? ` · waktu proses ${result.elapsed_ms} ms` : ''}
              </p>
            </div>

            <div className="px-6 py-3.5 border-t border-rule flex flex-wrap justify-end gap-4 text-xs">
              <button onClick={handleCopy} className="text-ink-muted hover:text-ink underline decoration-rule-strong underline-offset-2">
                {copied ? 'Tersalin' : 'Salin ringkasan'}
              </button>
              <ExportButton targetRef={contentRef} fileName="hasil-fake-news-checker" format="png" />
              <ExportButton targetRef={contentRef} fileName="hasil-fake-news-checker" format="pdf" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
