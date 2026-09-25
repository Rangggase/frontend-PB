export default function HeroGraphic() {
  return (
    <svg viewBox="0 0 420 420" className="w-full h-auto" role="img" aria-label="Ilustrasi verifikasi berita">
      {/* Grid titik latar — nuansa data/kertas grafik */}
      <defs>
        <pattern id="dotgrid" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="#dbd7cb" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="420" height="420" fill="url(#dotgrid)" />

      {/* Kertas artikel, sedikit miring */}
      <g transform="rotate(-6 160 210)">
        <rect x="70" y="70" width="190" height="260" fill="#faf9f6" stroke="#1c2321" strokeWidth="2" />
        <rect x="92" y="100" width="120" height="14" fill="#1c2321" />
        <rect x="92" y="128" width="146" height="6" fill="#b9b4a3" />
        <rect x="92" y="144" width="146" height="6" fill="#b9b4a3" />
        <rect x="92" y="160" width="110" height="6" fill="#b9b4a3" />
        <rect x="92" y="188" width="146" height="6" fill="#dbd7cb" />
        <rect x="92" y="204" width="146" height="6" fill="#dbd7cb" />
        <rect x="92" y="220" width="146" height="6" fill="#dbd7cb" />
        <rect x="92" y="236" width="90" height="6" fill="#dbd7cb" />
        <rect x="92" y="264" width="146" height="6" fill="#dbd7cb" />
        <rect x="92" y="280" width="146" height="6" fill="#dbd7cb" />
        <rect x="92" y="296" width="120" height="6" fill="#dbd7cb" />
      </g>

      {/* Stempel "terverifikasi" */}
      <g transform="translate(255 235) rotate(10)">
        <circle cx="0" cy="0" r="68" fill="none" stroke="#2f5233" strokeWidth="5" />
        <circle cx="0" cy="0" r="56" fill="none" stroke="#2f5233" strokeWidth="1.5" />
        <path
          d="M -26 2 L -8 20 L 30 -22"
          fill="none"
          stroke="#2f5233"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Kaca pembesar */}
      <g transform="translate(118 300)">
        <circle cx="0" cy="0" r="34" fill="#faf9f6" stroke="#1c2321" strokeWidth="5" />
        <line x1="24" y1="24" x2="52" y2="52" stroke="#1c2321" strokeWidth="7" strokeLinecap="round" />
      </g>
    </svg>
  )
}
