import React from 'react';
import Footer from '../components/Footer'; // Memanggil Footer global

const Terms = () => {
  return (
    /* Wrapper Utama: Memastikan Footer selalu terdorong ke bawah layar */
    <div className="min-h-screen flex flex-col bg-white selection:bg-zinc-200">
      
      {/* Konten Utama */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-6 lg:px-12 py-20">
        
        {/* Bagian Header (Senada dengan halaman About) */}
        <header className="mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-600 text-xs font-medium tracking-wide uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
            Dokumen Legal
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-medium text-zinc-900 mb-6 leading-tight tracking-tight">
            Ketentuan <span className="text-zinc-400">Layanan</span>
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl leading-relaxed">
            Dengan mengakses dan menggunakan platform pengecek berita ini, Anda secara otomatis menyetujui seluruh syarat, ketentuan, dan batasan operasional yang berlaku.
          </p>
        </header>

        {/* List Klausul - Desain Kartu Monokromatik Minimalis */}
        <div className="flex flex-col gap-6">
          
          {/* Pasal 1: Tujuan Penggunaan */}
          <div className="p-8 md:p-10 bg-white rounded-3xl border border-zinc-200 hover:border-zinc-300 transition-colors group">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-zinc-400 tracking-widest uppercase mb-2">Klausul 01</div>
                <h3 className="text-xl font-serif font-medium text-zinc-900 mb-3">Tujuan Penggunaan (Purpose of Use)</h3>
                <p className="text-zinc-600 leading-relaxed text-[15px]">
                  Layanan ini disediakan semata-mata untuk tujuan informasi, riset akademis, edukasi, dan sebagai inisiatif sosial untuk meningkatkan literasi digital masyarakat. Penggunaan platform ini untuk tujuan komersial tanpa izin tertulis dilarang keras.
                </p>
              </div>
            </div>
          </div>

          {/* Pasal 2: Batasan Tanggung Jawab */}
          <div className="p-8 md:p-10 bg-white rounded-3xl border border-zinc-200 hover:border-zinc-300 transition-colors group">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-zinc-400 tracking-widest uppercase mb-2">Klausul 02</div>
                <h3 className="text-xl font-serif font-medium text-zinc-900 mb-3">Batasan Tanggung Jawab (Disclaimer)</h3>
                <p className="text-zinc-600 leading-relaxed text-[15px]">
                  Analisis probabilitas kebenaran yang diberikan oleh sistem kami beroperasi murni berdasarkan algoritma kecerdasan buatan dan dataset yang dilatih. Sistem ini <strong>sama sekali tidak menggantikan</strong> penilaian kritis manusia. Pengembang tidak bertanggung jawab secara hukum atas keputusan, kerugian finansial, reputasi, maupun dampak yang timbul dari penggunaan hasil klasifikasi platform ini.
                </p>
              </div>
            </div>
          </div>

          {/* Pasal 3: Penggunaan yang Dilarang */}
          <div className="p-8 md:p-10 bg-white rounded-3xl border border-zinc-200 hover:border-zinc-300 transition-colors group">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-zinc-400 tracking-widest uppercase mb-2">Klausul 03</div>
                <h3 className="text-xl font-serif font-medium text-zinc-900 mb-3">Larangan Sistem (Prohibited Use)</h3>
                <p className="text-zinc-600 leading-relaxed text-[15px]">
                  Pengguna secara tegas dilarang memanipulasi celah keamanan sistem, melakukan injeksi <em>prompt</em>, serangan siber (seperti eksploitasi API, <em>spamming</em>, atau <em>scraping</em> data massal), merekayasa balik algoritma deteksi, serta menggunakan layanan ini untuk aktivitas yang melanggar hukum perundang-undangan di Indonesia.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Tanggal Pembaruan */}
        <div className="mt-16 pt-8 border-t border-zinc-100 text-center text-sm text-zinc-400 font-medium">
          Dokumen ini terakhir diperbarui pada: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>

      </main>

      {/* Render komponen Footer Global di bagian paling bawah */}
      <Footer />
      
    </div>
  );
};

export default Terms;