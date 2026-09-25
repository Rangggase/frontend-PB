import { useEffect, useState } from 'react'
import { checkHealth, API_BASE_URL } from '../services/api'

const STATUS = {
  checking: { dot: 'bg-slate-400', text: 'Memeriksa server…' },
  ready: { dot: 'bg-emerald-400', text: 'Server siap' },
  loading: { dot: 'bg-amber-400', text: 'Server memuat model…' },
  offline: { dot: 'bg-red-400', text: 'Server tidak terhubung' },
  demo: { dot: 'bg-sky-400', text: 'Mode demo' },
}

export default function ServerStatus() {
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    let active = true
    const run = async () => {
      const s = await checkHealth()
      if (active) setStatus(s)
    }
    run()
    const id = setInterval(run, 30000)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [])

  const s = STATUS[status]
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-paper/15 bg-paper/5 px-2.5 py-1 text-xs text-paper/70 whitespace-nowrap"
      title={`Backend: ${API_BASE_URL}`}
      role="status"
    >
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      <span className="hidden sm:inline">{s.text}</span>
    </span>
  )
}
