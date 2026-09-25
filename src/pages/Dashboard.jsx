import React, { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'
import stats from '../data/datasetStats.json'
import { displayLabel } from '../lib/result'
import Footer from '../components/Footer'

// Palet warna analitik
const COLORS = { Fake: '#e11d48', Real: '#059669' }
const AXIS_STYLE = { fontSize: 12, fill: '#71717a', fontFamily: 'inherit' }

// --- DATA SAMPEL ASLI DARI LIAR2_TALLIP_Indo-English_Test ---
// Diambil secara acak mewakili semua 7 Domain & Bahasa (English / Indonesian)
const SAMPLE_DATASET = [
  { "id": "LIAR2_15699", "label": "Fake", "title": "The word picnic is a 'racially insensitive word.", "source": "robert mckinzie", "domain": "Politics", "language": "English" },
  { "id": "LIAR2_8683", "label": "Fake", "title": "My state of Florida is now the third-largest state. We have surpassed New York in population.", "source": "bill nelson", "domain": "Politics", "language": "English" },
  
  // Data Indonesian
  { "id": "TALLIP_749", "label": "Real", "title": "Michelle Obama dan Beyoncé tidak pernah merahasiakan penghargaan bersama mereka. Keduanya telah berteman selama hampir satu dekade...", "source": "anonymous", "domain": "Celebrity", "language": "Indonesian" },
  { "id": "TALLIP_559", "label": "Real", "title": "Robert Pattinson mendapat sambutan hangat untuk penampilannya yang intens dan menggetarkan dalam film thriller kejahatan...", "source": "anonymous", "domain": "Celebrity", "language": "Indonesian" },
  { "id": "TALLIP_85", "label": "Real", "title": "London Stock Exchange mengatakan pihaknya terus 'bekerja keras' pada rencana merger dengan Deutsche Boerse...", "source": "anonymous", "domain": "Business", "language": "Indonesian" },
  { "id": "TALLIP_86", "label": "Real", "title": "Rusia dapat menunggu pemulihan harga minyak yang berkelanjutan sebelum melakukan pengeboran lagi di perairan Kutub Utara...", "source": "anonymous", "domain": "Business", "language": "Indonesian" },
  { "id": "TALLIP_1216", "label": "Fake", "title": "Para pendukung pilihan sekolah akhirnya terbukti benar. Sebuah studi baru oleh majalah Fortune, yang melihat 100 siswa...", "source": "nan", "domain": "Education", "language": "Indonesian" },
  { "id": "TALLIP_1225", "label": "Real", "title": "Peluncuran versi 'Minecraft' 1 November yang dirancang khusus untuk kelas ini adalah pendidik dan orang tua yang menyenangkan.", "source": "nan", "domain": "Education", "language": "Indonesian" },
  { "id": "TALLIP_1366", "label": "Fake", "title": "Aktris Scarlett Johansson menyatakan dia tidak akan berbagi rahasia dari film barunya Ghost in the Shell...", "source": "nan", "domain": "Entertainment", "language": "Indonesian" },
  { "id": "TALLIP_1389", "label": "Fake", "title": "Orang-orang mengkonfirmasi bahwa aktor Benedict Cumberbatch dan pacarnya, Sophie Hunter, menyambut seorang anak laki-laki...", "source": "nan", "domain": "Entertainment", "language": "Indonesian" },
  { "id": "TALLIP_1666", "label": "Fake", "title": "Olimpiade Rio 2016 Lawrence Okolie dikalahkan KO dalam 20 detik, kalah dalam pertarungan profesional pertamanya...", "source": "nan", "domain": "Sports", "language": "Indonesian" },
  { "id": "TALLIP_1675", "label": "Real", "title": "kata Ramon Calderon 'Real Madrid berada dalam situasi yang sangat baik secara finansial tetapi mungkin tidak bersedia membayar...'", "source": "nan", "domain": "Sports", "language": "Indonesian" },
  { "id": "TALLIP_1816", "label": "Fake", "title": "Makanan Mustahil, hamburger tanpa daging yang tumbuh di laboratorium terbang dari rak. Saat ini Anda hanya dapat membeli burger tanpa daging...", "source": "nan", "domain": "Technology", "language": "Indonesian" },
  { "id": "TALLIP_1825", "label": "Real", "title": "Apple kehilangan kendali pada ruang kelas Amerika, yang telah lama digunakan perusahaan teknologi untuk mengaitkan siswa dengan merek mereka seumur hidup.", "source": "nan", "domain": "Technology", "language": "Indonesian" },

  // Data English
  { "id": "TALLIP_183", "label": "Fake", "title": "theJasmineBRAND.com exclusively reports, Usher has allegedly been cast on the upcoming season of Dancing with the Stars...", "source": "nan", "domain": "Celebrity", "language": "English" },
  { "id": "TALLIP_0", "label": "Fake", "title": "Setting Up Face-Off With Trump 'California's clean-air agency voted on Friday to reevaluate their stricter emissions standards for cars and trucks...", "source": "nan", "domain": "Business", "language": "English" },
  { "id": "TALLIP_1150", "label": "Fake", "title": "With the launch of 'Minecraft' edition created with the classroom in mine is energizing Democratic and liberal politicians alike...", "source": "nan", "domain": "Education", "language": "English" },
  { "id": "TALLIP_1300", "label": "Fake", "title": "White House Press Secretary Sean Spicer told a reporter to 'stop shaking your head' while answering an African-American reporter's question...", "source": "nan", "domain": "Entertainment", "language": "English" },
  { "id": "TALLIP_1600", "label": "Fake", "title": "CORPUS CHRISTI, Texas (AP)- The police department loaned a number of electric shock tasers to the local elementary school...", "source": "nan", "domain": "Sports", "language": "English" },
  { "id": "TALLIP_1750", "label": "Fake", "title": "Due to the hazards presented by exploding batteries, the Transportation Department had previously banned the Samsung Galaxy Note 7...", "source": "nan", "domain": "Technology", "language": "English" }
];

// --- Komponen Pop-up / Modal Dataset ---
function DatasetModal({ isOpen, onClose, filterType, filterValue }) {
  if (!isOpen) return null;

  // Logika Filter Multi-Dimensi (All, Label, Domain, atau Language)
  const filteredData = SAMPLE_DATASET.filter(row => {
    if (filterType === 'All') return true;
    if (filterType === 'Label') return row.label === filterValue;
    if (filterType === 'Domain') return row.domain.toLowerCase() === filterValue.toLowerCase();
    
    // Perbaikan deteksi Language (Mengizinkan "Indonesia" atau "Indonesian" untuk klik filter dari chart)
    if (filterType === 'Language') {
        const val = filterValue.toLowerCase();
        const rowLang = row.language.toLowerCase();
        if (val.includes('indonesia')) return rowLang === 'indonesian' || rowLang === 'indonesia';
        return rowLang === val;
    }
    return true;
  });

  // Teks Penanda Filter di Header Modal
  let badgeText = 'Semua Data';
  if (filterType === 'Label') badgeText = `Label: ${filterValue}`;
  if (filterType === 'Domain') badgeText = `Domain: ${filterValue}`;
  if (filterType === 'Language') badgeText = `Bahasa: ${filterValue}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-900/70 backdrop-blur-sm transition-opacity">
      <div className="bg-white w-full max-w-[1400px] max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-zinc-200 transform transition-all">
        
        {/* Header Modal */}
        <div className="px-6 py-5 md:px-8 md:py-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xl md:text-2xl font-serif font-bold text-zinc-900">
                Korpus Data 
              </h3>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase border border-blue-100">
                {badgeText}
              </span>
            </div>
            <p className="text-sm md:text-[15px] text-zinc-500">
              Menampilkan sampel dari dataset asli <strong className="text-zinc-700">LIAR2_TALLIP_Indo-English</strong> berdasarkan filter yang Anda pilih.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0 ml-4"
            title="Tutup Pratinjau"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Isi Tabel */}
        <div className="overflow-x-auto flex-grow p-0 md:p-4 bg-zinc-50/30">
          <div className="min-w-[900px] md:bg-white md:rounded-2xl md:border md:border-zinc-100 md:shadow-sm h-full overflow-y-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-zinc-100/50 text-zinc-500 font-bold tracking-wider uppercase text-xs sticky top-0 z-10 backdrop-blur-md">
                <tr>
                  <th className="px-6 py-4 md:rounded-tl-2xl">ID Record</th>
                  <th className="px-6 py-4">Teks Berita / Klaim</th>
                  <th className="px-6 py-4">Sumber / Pembicara</th>
                  <th className="px-6 py-4">Kategori Domain</th>
                  <th className="px-6 py-4">Bahasa</th>
                  <th className="px-6 py-4 text-center md:rounded-tr-2xl">Label Sistem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-zinc-50 transition-colors group cursor-default">
                      <td className="px-6 py-5 text-zinc-400 font-mono text-xs">{row.id}</td>
                      <td className="px-6 py-5 whitespace-normal min-w-[300px] max-w-[400px]">
                        <p className="text-zinc-800 font-medium leading-relaxed group-hover:text-zinc-950 transition-colors">"{row.title}"</p>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-zinc-600 bg-zinc-100 px-3 py-1.5 rounded-lg text-xs font-semibold">{row.source === 'nan' ? 'Unknown' : row.source}</span>
                      </td>
                      <td className="px-6 py-5 font-medium text-zinc-600">{row.domain}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{row.language === 'Indonesian' || row.language === 'Indonesia' ? '🇮🇩' : '🇬🇧'}</span>
                          <span className="text-zinc-500 font-medium">{row.language}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold tracking-wide border shadow-sm ${
                          row.label === 'Real' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${row.label === 'Real' ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`}></span>
                          {row.label.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-zinc-400">
                        <svg className="w-12 h-12 mb-4 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-base font-medium text-zinc-500">Tidak ada sampel data yang tersedia untuk filter ini.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Modal */}
        <div className="px-6 py-4 md:px-8 md:py-5 border-t border-zinc-100 bg-zinc-50 flex justify-between items-center">
          <p className="text-xs md:text-sm text-zinc-500 font-medium flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Menampilkan {filteredData.length} baris sampel dataset.
          </p>
          <button onClick={onClose} className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl font-medium hover:bg-zinc-800 transition-all hover:shadow-lg hover:-translate-y-0.5">
            Tutup Pratinjau
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Helper Functions Recharts ---
function toRows(block) {
  return block.categories.map((cat, i) => {
    const row = { name: cat }
    block.labels.forEach((l, j) => {
      row[displayLabel(l)] = block.counts[i][j]
    })
    return row
  })
}

// Tick Y-Axis Interaktif
function CategoryTick({ x, y, payload, isClickable, onClick }) {
  const label = String(payload.value)
  const short = label.length > 15 ? `${label.slice(0, 14)}…` : label
  return (
    <text 
      x={x} 
      y={y} 
      dy={4} 
      textAnchor="end" 
      fontSize={12} 
      fill={isClickable ? "#27272a" : "#71717a"} 
      className={`font-medium tracking-wide transition-colors ${isClickable ? 'cursor-pointer hover:font-bold hover:fill-blue-600' : ''}`}
      onClick={() => isClickable && onClick(label)}
    >
      <title>{label}</title>
      {short}
    </text>
  )
}

function LegendChips({ series }) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {series.map((s) => (
        <span key={s} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-full text-xs font-bold tracking-wide text-zinc-600 shadow-sm">
          <span className="h-2.5 w-2.5 rounded-full shrink-0 shadow-inner" style={{ background: COLORS[s] || '#a1a1aa' }} />
          {s}
        </span>
      ))}
    </div>
  )
}

// --- Komponen Visual Dashboard ---
function OverviewBar({ data }) {
  const total = data.reduce((sum, d) => sum + d.count, 0)
  if (total === 0) return null

  return (
    <div className="mb-10 bg-white p-8 md:p-10 rounded-3xl border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-shadow hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] relative overflow-hidden">
      <div className="absolute right-0 top-0 w-64 h-64 bg-zinc-50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>

      <div className="flex justify-between items-end mb-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-serif font-semibold text-zinc-900 tracking-tight">Keseimbangan Basis Data</h2>
          <p className="text-[15px] text-zinc-500 mt-2 leading-relaxed">
            Menampilkan rasio kelas (label) dalam keseluruhan dataset. Rasio yang seimbang krusial untuk mencegah model kecerdasan buatan mengalami bias (<i>overfitting</i>).
          </p>
        </div>
      </div>
      
      <div className="flex h-14 w-full overflow-hidden rounded-2xl shadow-inner bg-zinc-100 ring-1 ring-black/5">
        {data.map((d) => {
          const pct = (d.count / total) * 100
          return (
            <div
              key={d.label}
              style={{ width: `${pct}%`, backgroundColor: COLORS[d.label] || '#a1a1aa' }}
              className="flex items-center justify-center transition-all duration-700 ease-out first:rounded-l-2xl last:rounded-r-2xl border-r border-white/20 last:border-0 hover:brightness-110 cursor-default relative group"
            >
              {pct > 8 && (
                <span className="text-sm font-bold text-white tracking-wider drop-shadow-md z-10">{pct.toFixed(1)}%</span>
              )}
            </div>
          )
        })}
      </div>
      
      <div className="flex flex-wrap gap-x-12 gap-y-4 mt-6">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-3">
            <span className="h-4 w-4 rounded-md shrink-0 shadow-sm" style={{ backgroundColor: COLORS[d.label] || '#a1a1aa' }} />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{d.label}</span>
              <span className="text-lg text-zinc-900 font-serif font-semibold">{d.count.toLocaleString('id-ID')} <span className="text-sm font-sans font-normal text-zinc-500">artikel</span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProportionLegend({ data }) {
  const total = data.reduce((sum, d) => sum + d.count, 0)
  return (
    <ul className="space-y-6">
      {data.map((d) => {
        const pct = total ? (d.count / total) * 100 : 0
        return (
          <li key={d.label} className="group cursor-default">
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-3 text-zinc-900 font-serif font-semibold text-lg">
                <span className="h-4 w-4 rounded-md shrink-0 shadow-sm" style={{ backgroundColor: COLORS[d.label] || '#a1a1aa' }} />
                {d.label}
              </span>
              <span className="text-zinc-500 font-medium tabular-nums">
                {d.count.toLocaleString('id-ID')} <span className="text-zinc-300 mx-2">|</span> <span className="font-bold text-zinc-800">{pct.toFixed(1)}%</span>
              </span>
            </div>
            <div className="h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out group-hover:brightness-110"
                style={{ width: `${pct}%`, backgroundColor: COLORS[d.label] || '#a1a1aa' }}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function StatCard({ label, value, color = 'text-zinc-900', icon, bgGlow, description, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="relative p-8 bg-white rounded-3xl border border-zinc-200 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1.5 hover:border-zinc-300 transition-all duration-500 group overflow-hidden flex flex-col h-full cursor-pointer ring-1 ring-transparent hover:ring-zinc-200"
      title={`Klik untuk memfilter dataset ${label}`}
    >
      <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none ${bgGlow}`}></div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest leading-relaxed group-hover:text-zinc-700 transition-colors">{label}</p>
        <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-zinc-900 group-hover:bg-zinc-100 transition-colors duration-300 shadow-sm">
          {icon}
        </div>
      </div>
      
      <div className="mt-auto relative z-10">
        <p className={`font-serif text-4xl lg:text-5xl font-semibold tracking-tight mb-3 ${color} group-hover:scale-105 origin-left transition-transform duration-300`}>
          {value}
        </p>
        <div className="border-t border-zinc-100 pt-3 flex items-start justify-between">
          <p className="text-[13px] text-zinc-500 font-medium leading-relaxed pr-2">
            {description}
          </p>
          <svg className="w-4 h-4 text-zinc-300 group-hover:text-zinc-600 transition-colors shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function ChartPanel({ title, description, className = "", children }) {
  return (
    <div className={`bg-white p-8 md:p-10 rounded-3xl border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-shadow duration-500 flex flex-col h-full ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-serif font-semibold text-zinc-900 tracking-tight">{title}</h3>
        {description && (
          <p className="text-[14px] text-zinc-500 mt-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <hr className="border-zinc-100 mb-8" />
      <div className="flex-grow">
        {children}
      </div>
    </div>
  )
}

// --- Definisi Konteks Grup Analisis ---
const GROUPS = [
  { key: 'by_year', title: 'Tren Waktu Publikasi', description: 'Menganalisis distribusi artikel berdasarkan tahun terbit. Model membutuhkan data historis maupun terkini untuk memahami evolusi gaya bahasa.', vertical: false },
  
  { key: 'by_domain', title: 'Pemetaan Kredibilitas Domain', description: 'Klik pada grafik batang atau nama domain (Politics, Business, dll) di sebelah kiri untuk melihat langsung sampel datasetnya.', vertical: true },
  
  // Teks deskripsi diupdate agar user tahu ini juga bisa diklik
  { key: 'by_language', title: 'Distribusi Linguistik', description: 'Klik pada batang warna atau nama bahasa (English, Indonesia) untuk melihat sampel data berdasarkan bahasa tersebut.', vertical: true },
  
  { key: 'by_source_dataset', title: 'Repositori Sumber Data', description: 'Melacak jejak dataset penelitian asli yang digabungkan untuk membangun korpus pengetahuan sistem klasifikasi ini.', vertical: true },
]

// --- KOMPONEN UTAMA DASHBOARD ---
export default function Dashboard() {
  // State untuk mengontrol pop-up dan tipe filter data
  const [modalConfig, setModalConfig] = useState({ isOpen: false, filterType: 'All', filterValue: 'All' });

  const labelData = Object.entries(stats.label_counts || {}).map(([k, v]) => ({
    label: displayLabel(k),
    count: v,
  }))
  const countOf = (name) => labelData.find((d) => d.label === name)?.count ?? 0

  const validGroups = GROUPS.filter((group) => {
    const block = stats[group.key]
    return block?.categories?.length > 0
  })

  // Fungsi dinamis pembuka modal
  const openDatasetPreview = (type, value = 'All') => {
    setModalConfig({ isOpen: true, filterType: type, filterValue: value });
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50 selection:bg-zinc-200">
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 lg:px-12 py-20 lg:py-24">
        
        {/* Header Section */}
        <header className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-zinc-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-zinc-800 animate-pulse"></span>
            Metrik Pembelajaran Mesin
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-zinc-900 mb-6 leading-tight tracking-tight">
            Dasbor <span className="text-zinc-400 italic">Analisis Korpus</span>
          </h1>
          <p className="text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto mb-10">
            Transparansi penuh terhadap anatomi data. Membedah parameter, anomali, dan distribusi informasi yang menjadi tulang punggung kecerdasan buatan platform kami.
          </p>

          <button 
            onClick={() => openDatasetPreview('All')}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-zinc-900 text-white rounded-2xl font-semibold shadow-[0_8px_20px_rgb(0,0,0,0.15)] hover:bg-zinc-800 hover:shadow-[0_10px_25px_rgb(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 ring-1 ring-zinc-800"
          >
            <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Eksplorasi Seluruh Dataset
          </button>
        </header>

        {stats._placeholder && (
          <div className="mb-12 flex items-start gap-4 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl text-sm text-zinc-300">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <div className="pt-0.5 leading-relaxed">
              <strong className="text-white block mb-1 text-base tracking-wide">Mode Simulasi Aktif</strong>
              Visualisasi saat ini dirender menggunakan <span className="text-rose-300 font-medium">data sampel (placeholder)</span>. Untuk memuat analitik proyek Anda, ganti file <code className="bg-zinc-800 px-2 py-0.5 rounded font-mono text-xs border border-zinc-700 text-zinc-300">src/data/datasetStats.json</code> dengan output kalkulasi JSON dari Python/Colab Anda.
            </div>
          </div>
        )}

        {/* Top Stat Cards (INTERAKTIF) */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          <StatCard 
            label="Volume Korpus (Lihat Semua)" 
            value={Number(stats.total || 0).toLocaleString('id-ID')} 
            bgGlow="bg-zinc-400"
            description="Klik untuk melihat keseluruhan entri artikel yang dianotasi sebagai referensi algoritma."
            onClick={() => openDatasetPreview('All')}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            }
          />
          <StatCard 
            label="Kebenaran Faktual (Filter Real)" 
            value={countOf('Real').toLocaleString('id-ID')} 
            color="text-emerald-600" 
            bgGlow="bg-emerald-400"
            description="Klik untuk memfilter dan melihat sampel berita yang telah terverifikasi kredibilitasnya."
            onClick={() => openDatasetPreview('Label', 'Real')}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
            }
          />
          <StatCard 
            label="Manipulasi/Hoaks (Filter Fake)" 
            value={countOf('Fake').toLocaleString('id-ID')} 
            color="text-rose-600"
            bgGlow="bg-rose-400"
            description="Klik untuk memfilter entri misinformasi berlabel yang melatih logika pendeteksian palsu."
            onClick={() => openDatasetPreview('Label', 'Fake')}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
          />
        </div>

        <OverviewBar data={labelData} />

        <ChartPanel 
          title="Proporsi Kelas (Label Pie)"
          description="Visualisasi melingkar margin dominasi label dalam dataset. Semakin mendekati rasio 50:50, semakin optimal performa sistem dalam mengenali kedua kelas tanpa memihak."
        >
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center mt-2">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie data={labelData} dataKey="count" nameKey="label" innerRadius={90} outerRadius={140} paddingAngle={4}>
                  {labelData.map((d) => (
                    <Cell key={d.label} fill={COLORS[d.label] || '#a1a1aa'} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', padding: '16px 20px' }}
                  itemStyle={{ fontWeight: 600, color: '#18181b' }}
                  formatter={(v) => v.toLocaleString('id-ID')} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full max-w-sm mx-auto lg:mx-0">
              <ProportionLegend data={labelData} />
            </div>
          </div>
        </ChartPanel>

        <div className="grid xl:grid-cols-2 gap-8 lg:gap-10 mt-8 lg:mt-10">
          {validGroups.map(({ key, title, description, vertical }, index) => {
            const block = stats[key]
            const rows = toRows(block)
            const series = [...new Set(block.labels.map(displayLabel))]
            const height = vertical ? Math.max(280, 100 + rows.length * 45) : 340
            
            const isLastOddItem = (validGroups.length % 2 !== 0) && (index === validGroups.length - 1)
            
            // LOGIKA FILTER CHART (Mengecek Grafik Domain dan Language)
            const filterTypeMap = {
              'by_domain': 'Domain',
              'by_language': 'Language' // Menambahkan deteksi Language
            };
            const chartFilterType = filterTypeMap[key];
            const isClickableChart = !!chartFilterType; // true jika chart ini adalah Domain atau Language
            
            return (
              <ChartPanel key={key} title={title} description={description} className={isLastOddItem ? "xl:col-span-2" : ""}>
                <LegendChips series={series} />
                <div className="mt-2 -ml-4">
                  <ResponsiveContainer width="100%" height={height}>
                    <BarChart data={rows} layout={vertical ? 'vertical' : 'horizontal'} margin={{ left: 10, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" horizontal={!vertical} vertical={vertical} />
                      {vertical ? (
                        <>
                          <XAxis type="number" tick={AXIS_STYLE} axisLine={false} tickLine={false} />
                          <YAxis 
                            type="category" 
                            dataKey="name" 
                            width={140} 
                            tick={
                              <CategoryTick 
                                isClickable={isClickableChart} 
                                onClick={(labelName) => openDatasetPreview(chartFilterType, labelName)} 
                              />
                            } 
                            axisLine={false} 
                            tickLine={false} 
                          />
                        </>
                      ) : (
                        <>
                          <XAxis dataKey="name" tick={AXIS_STYLE} axisLine={false} tickLine={false} dy={12} />
                          <YAxis tick={AXIS_STYLE} axisLine={false} tickLine={false} dx={-10} />
                        </>
                      )}
                      <Tooltip 
                        cursor={{ fill: '#fafafa' }}
                        contentStyle={{ borderRadius: '16px', border: '1px solid #f4f4f5', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px 20px' }}
                        itemStyle={{ fontWeight: 600 }}
                      />
                      {series.map((s) => (
                        <Bar 
                          key={s} 
                          dataKey={s} 
                          stackId="a" 
                          fill={COLORS[s] || '#a1a1aa'} 
                          radius={vertical ? [0, 6, 6, 0] : [6, 6, 0, 0]} 
                          maxBarSize={32} 
                          
                          onClick={(data) => {
                            if (isClickableChart) openDatasetPreview(chartFilterType, data.name)
                          }}
                          className={isClickableChart ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartPanel>
            )
          })}
        </div>
        
      </main>

      <DatasetModal 
        isOpen={modalConfig.isOpen} 
        filterType={modalConfig.filterType} 
        filterValue={modalConfig.filterValue}
        onClose={() => setModalConfig({ isOpen: false, filterType: 'All', filterValue: 'All' })} 
      />

      <Footer />
      
    </div>
  )
}