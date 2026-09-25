import { NavLink, useLocation } from 'react-router-dom'
import ServerStatus from './ServerStatus'

const LINKS = [
  { to: '/', label: 'Beranda' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/tentang', label: 'Tentang' },
  { to: '/kode-etik', label: 'Kode Etik' },
  { to: '/ketentuan-layanan', label: 'Ketentuan' },
  { to: '/kebijakan-koreksi', label: 'Koreksi' },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <header className="bg-ink text-paper border-b-4 border-accent">
      <div className="px-6 lg:px-12 py-4 flex items-center justify-between gap-4">
        <NavLink to="/" className="shrink-0">
          <span className="font-serif text-2xl font-semibold tracking-tight">
            Periksa<span className="text-accent-soft opacity-70">Berita</span>
          </span>
        </NavLink>

        <nav className="flex items-center gap-6 text-sm">
          {LINKS.map((link) => {
            const isActive =
              link.to === '/' ? location.pathname === '/' : location.pathname.startsWith(link.to)
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`pb-0.5 border-b-2 transition-colors ${
                  isActive
                    ? 'border-paper text-paper'
                    : 'border-transparent text-paper/60 hover:text-paper/90'
                }`}
              >
                {link.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="hidden sm:block">
          <ServerStatus />
        </div>
      </div>
      <div className="px-6 lg:px-12 py-1.5 border-t border-paper/10 flex items-center justify-between text-[11px] text-paper/50">
        <span>Alat bantu verifikasi berita berbasis machine learning</span>
        <span className="hidden md:inline">Proyek Capstone — Deteksi Berita Palsu</span>
      </div>
    </header>
  )
}