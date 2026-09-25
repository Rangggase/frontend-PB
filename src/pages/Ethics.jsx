import React from 'react';
import Footer from '../components/Footer'; // Memanggil Footer global

const Ethics = () => {
  return (
    /* Wrapper Utama: Memastikan Footer selalu terdorong ke bawah layar */
    <div className="min-h-screen flex flex-col bg-white selection:bg-zinc-200">
      
      {/* Konten Utama */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 lg:px-12 py-20">
        
        {/* Bagian Header */}
        <header className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-600 text-xs font-medium tracking-wide uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
            Standar Keredaksian & Sistem
          </div>
          
          <h1 className="font-serif text-4xl lg:text-5xl font-medium text-zinc-900 mb-6 leading-tight tracking-tight">
            Kode Etik & <span className="text-zinc-400">Prinsip Integritas</span>
          </h1>
          
          <p className="text-lg text-zinc-600 leading-relaxed">
            Landasan kerja kami dalam membangun ekosistem informasi yang sehat, akurat, dan dapat dipercaya. Kepercayaan Anda adalah prioritas utama platform ini.
          </p>
        </header>

        {/* Grid Cards - Desain Monokromatik Minimalis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          
          {/* Card 1: Objektivitas */}
          <div className="p-8 md:p-10 bg-white rounded-3xl border border-zinc-200 hover:border-zinc-300 transition-colors group">
            {/* Ikon Timbangan */}
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300 mb-8">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v18" />
                <path d="M3 7h18" />
                <path d="M5 7l2 8a5 5 0 0 0 10 0l2-8" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            
            <h3 className="text-xl font-serif font-medium text-zinc-900 mb-4">
              Ketidakberpihakan Absolut
            </h3>
            <p className="text-zinc-600 leading-relaxed text-[15px]">
              Kami memegang teguh prinsip netralitas. Setiap evaluasi informasi murni bersandar pada fakta dan parameter data, sepenuhnya terisolasi dari afiliasi politik, bias ideologi, maupun intervensi komersial.
            </p>
          </div>

          {/* Card 2: Transparansi Sumber */}
          <div className="p-8 md:p-10 bg-white rounded-3xl border border-zinc-200 hover:border-zinc-300 transition-colors group">
            {/* Ikon Dokumen Kredensial */}
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300 mb-8">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
              </svg>
            </div>
            
            <h3 className="text-xl font-serif font-medium text-zinc-900 mb-4">
              Keterlacakan Sumber
            </h3>
            <p className="text-zinc-600 leading-relaxed text-[15px]">
              Akuntabilitas adalah fondasi kami. Setiap kesimpulan analisis merujuk pada referensi yang kredibel dan dapat dilacak jejak digitalnya, mengundang Anda untuk melakukan verifikasi silang secara mandiri.
            </p>
          </div>

          {/* Card 3: Metodologi */}
          <div className="p-8 md:p-10 bg-white rounded-3xl border border-zinc-200 hover:border-zinc-300 transition-colors group">
            {/* Ikon Metodologi AI */}
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300 mb-8">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M9 3v18" />
                <path d="M15 3v18" />
                <path d="M3 9h18" />
                <path d="M3 15h18" />
              </svg>
            </div>
            
            <h3 className="text-xl font-serif font-medium text-zinc-900 mb-4">
              Keterbukaan Algoritma
            </h3>
            <p className="text-zinc-600 leading-relaxed text-[15px]">
              Sistem klasifikasi kami didukung oleh arsitektur pembelajaran mesin yang menganalisis linguistik secara komprehensif. Kami secara proaktif mempublikasikan kapabilitas dan limitasi dari teknologi ini.
            </p>
          </div>

        </div>
      </main>

      {/* Render komponen Footer Global di bagian paling bawah */}
      <Footer />
      
    </div>
  );
};

export default Ethics;