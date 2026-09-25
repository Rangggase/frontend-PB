import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine,
} from 'recharts'
import { buildBarData, fmtSigned, displayLabel } from '../lib/result'

export default function ExplainabilityChart({ result }) {
  if (!result?.module_contributions) return null

  const data = buildBarData(result).map((d) => ({ ...d, value: Number(d.value.toFixed(3)) }))
  const max = Math.max(1, Math.ceil(Math.max(...data.map((d) => Math.abs(d.value))) * 1.1))
  const ticks = [-max, -max / 2, 0, max / 2, max]

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-ink mb-1">Kontribusi Tiap Komponen</h3>
      <p className="text-xs text-ink-muted mb-3">
        Batang merah mendorong hasil ke arah Fake, hijau ke arah Real. Modul konteks, numerik,
        fuzzy, dan justification tidak menerima data dari teks yang ditempel, jadi digabung menjadi
        &quot;kecenderungan bawaan model&quot;.
      </p>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#dbd7cb" />
          <XAxis
            type="number"
            domain={[-max, max]}
            ticks={ticks}
            tick={{ fontSize: 11, fill: '#6b6558' }}
            tickFormatter={(v) => v.toFixed(1)}
          />
          <YAxis type="category" dataKey="label" width={150} tick={{ fontSize: 11, fill: '#6b6558' }} />
          <Tooltip
            formatter={(v) => [
              `${fmtSigned(v)} → ${v > 0 ? 'condong Fake' : 'condong Real'}`,
              'Kontribusi',
            ]}
          />
          <ReferenceLine x={0} stroke="#8c8577" />
          <Bar dataKey="value" radius={2} isAnimationActive={false}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.value > 0 ? '#b3261e' : '#1f6f54'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-center text-[11px] text-ink-soft">← condong Real &nbsp;|&nbsp; condong Fake →</p>

      <details className="mt-2 text-xs">
        <summary className="cursor-pointer text-accent">Lihat semua modul</summary>
        <table className="mt-2 w-full text-left">
          <thead>
            <tr className="text-ink-soft">
              <th className="py-1 pr-2 font-medium">Modul</th>
              <th className="py-1 pr-2 font-medium">Nilai</th>
              <th className="py-1 pr-2 font-medium">Arah</th>
              <th className="py-1 font-medium">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {result.module_contributions.map((m) => (
              <tr key={m.module} className="border-t border-rule text-ink-muted">
                <td className="py-1 pr-2">{m.label}</td>
                <td className="py-1 pr-2 tabular-nums">{fmtSigned(m.value)}</td>
                <td className="py-1 pr-2">{displayLabel(m.direction)}</td>
                <td className="py-1">
                  {m.informative ? 'dipengaruhi teks' : 'nilai tetap (tanpa data)'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  )
}
