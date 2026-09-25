// Kartu hasil ringkas (tidak dipakai di halaman utama; hasil lengkap ada di ResultModal).
export default function ResultCard({ result }) {
  if (!result) return null

  const isFake = result.prediction === 'Fake'
  const confidencePct = Math.round((result.confidence ?? 0) * 100)

  return (
    <div
      className={`mt-5 rounded-xl border p-5 shadow-sm ${
        isFake ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{isFake ? '⚠️' : '✅'}</span>
        <div>
          <p className={`font-semibold ${isFake ? 'text-red-700' : 'text-emerald-700'}`}>
            {isFake ? 'Terindikasi Fake' : 'Terindikasi Real'}
          </p>
          <p className="text-sm text-slate-600">Tingkat keyakinan model: {confidencePct}%</p>
        </div>
      </div>

      {result.explanation && <p className="mt-3 text-sm text-slate-600">{result.explanation}</p>}
    </div>
  )
}
