import { gaugePosition } from '../lib/result'

const DEFAULT_DISCLAIMER =
  'Hasil ini adalah prediksi model machine learning dan bukan keputusan final. Gunakan sebagai alat bantu, bukan satu-satunya sumber kebenaran — tetap verifikasi ke sumber terpercaya.'

export default function ConfidenceIndicator({ confidence, level, disclaimer }) {
  const conf = confidence ?? 0.5
  const pct = Math.round(conf * 100)
  const pos = gaugePosition(conf)

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
        <span>Tingkat keyakinan model</span>
        <span className="font-medium text-ink">
          {pct}%{level ? ` · ${level}` : ''}
        </span>
      </div>

      <div className="relative">
        <div className="flex h-1.5 w-full overflow-hidden">
          <div className="w-[20%] bg-fake/40" />
          <div className="w-[40%] bg-warn/40" />
          <div className="w-[40%] bg-real/40" />
        </div>
        <div
          className="absolute -top-1 h-3.5 w-0.5 bg-ink"
          style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
          aria-hidden="true"
        />
      </div>
      <div className="mt-1.5 flex text-[11px] text-ink-soft">
        <span className="w-[20%]">rendah</span>
        <span className="w-[40%] text-center">sedang</span>
        <span className="w-[40%] text-right">tinggi</span>
      </div>

      <p className="mt-4 text-xs text-ink-muted border-l-2 border-rule pl-3">
        <strong className="text-ink">Bukan keputusan final.</strong> {disclaimer || DEFAULT_DISCLAIMER}
      </p>
    </div>
  )
}
