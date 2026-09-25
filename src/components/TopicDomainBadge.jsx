function normalize(v) {
  if (!v) return []
  if (typeof v === 'string') return [{ label: v, prob: null }]
  if (Array.isArray(v)) return v.filter((x) => x && x.label)
  return []
}

function Meters({ title, items }) {
  if (items.length === 0) return null
  return (
    <div className="mt-3">
      <p className="text-xs font-medium text-ink-muted mb-1.5">{title}</p>
      {items.map((x) =>
        x.prob === null ? (
          <span key={x.label} className="text-sm text-ink mr-3">
            {x.label}
          </span>
        ) : (
          <div key={x.label} className="grid grid-cols-[110px_1fr_40px] items-center gap-2 my-1 text-xs">
            <span className="text-ink truncate">{x.label}</span>
            <div className="h-1.5 bg-paper-dim overflow-hidden">
              <div className="h-full bg-accent" style={{ width: `${(x.prob * 100).toFixed(1)}%` }} />
            </div>
            <span className="text-ink-soft text-right">{Math.round(x.prob * 100)}%</span>
          </div>
        ),
      )}
    </div>
  )
}

export default function TopicDomainBadge({ topic, domain }) {
  const topics = normalize(topic)
  const domains = normalize(domain)
  if (topics.length === 0 && domains.length === 0) return null

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-ink">
        Perkiraan {topics.length > 0 ? 'Topik & Domain' : 'Domain'} Berita
      </h3>
      <Meters title="Topik" items={topics} />
      <Meters title="Domain" items={domains} />
    </div>
  )
}
