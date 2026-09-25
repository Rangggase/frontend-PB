import { highlightColor } from '../lib/result'

function titleFor(h) {
  if (!h.seen_by_model) return 'Di luar bagian yang dibaca model'
  if (h.score > 0) return 'Mendorong ke Fake'
  if (h.score < 0) return 'Mendorong ke Real'
  return 'Pengaruh kecil'
}

export default function HighlightedText({ highlights }) {
  if (!highlights || highlights.length === 0) return null

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-ink mb-1">Bagian Teks yang Berpengaruh</h3>
      <p className="text-xs text-ink-muted mb-3">
        Dihitung dengan menghapus satu kalimat lalu melihat seberapa berubah prediksinya. Semakin
        pekat warnanya, semakin besar pengaruhnya.
      </p>
      <div className="text-sm leading-loose text-ink bg-paper-dim/40 border border-rule p-4">
        {highlights.map((h, i) => (
          <span
            key={i}
            title={titleFor(h)}
            className={`rounded px-0.5 ${h.seen_by_model ? '' : 'text-ink-soft'}`}
            style={{ backgroundColor: highlightColor(h.intensity, h.seen_by_model) }}
          >
            {h.text}{' '}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-ink-muted">
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 inline-block" style={{ background: 'rgba(179,38,30,.5)' }} />
          mendorong ke Fake
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 inline-block" style={{ background: 'rgba(31,111,84,.5)' }} />
          mendorong ke Real
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 inline-block bg-paper-dim border border-rule" />
          di luar bacaan model
        </span>
      </div>
    </div>
  )
}
