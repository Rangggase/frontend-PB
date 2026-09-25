import React from 'react';
import Footer from '../components/Footer';

const Corrections = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-zinc-200">
      
      <main className="flex-grow max-w-6xl w-full mx-auto px-6 lg:px-12 py-20 lg:py-28">
        
        {/* Layout Grid Asimetris */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* Kolom Kiri: Header & Kutipan Editorial (Sticky) */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-600 text-xs font-medium tracking-wide uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                Transparansi & Akurasi
              </div>
              
              <h1 className="font-serif text-4xl lg:text-5xl font-medium text-zinc-900 mb-6 leading-tight tracking-tight">
                Kebijakan <br className="hidden lg:block"/>
                <span className="text-zinc-400 italic">Koreksi Data</span>
              </h1>
              
              <p className="text-lg text-zinc-600 leading-relaxed mb-12">
                Kami menyadari bahwa informasi dan konteks berita terus berkembang. Berikut adalah komitmen tegas dan proses sistematis kami dalam memelihara akurasi analisis platform ini.
              </p>

              {/* Aksen Pengganti Tombol: Kutipan Keredaksian yang Elegan */}
              <div className="pl-6 border-l-2 border-zinc-900 relative">
                <div className="absolute -left-[1.1rem] top-0 text-3xl text-zinc-300 font-serif">"</div>
                <p className="font-serif text-xl md:text-2xl italic text-zinc-800 mb-3 leading-snug">
                  Integritas bukanlah ketiadaan kesalahan, melainkan kecepatan dan transparansi dalam memperbaikinya.
                </p>
                <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                  — Standar Operasional
                </span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Timeline Proses Koreksi dengan Efek Premium */}
          <div className="lg:col-span-7 lg:pl-10">
            <div className="flex flex-col">
              
              {/* Langkah 01 */}
              <div className="relative pl-10 md:pl-16 pb-12 md:pb-16 group cursor-default">
                {/* Garis vertikal penghubung */}
                <div className="absolute left-[1.15rem] md:left-[1.9rem] top-12 bottom-0 w-px bg-zinc-200 group-hover:bg-zinc-800 transition-colors duration-500"></div>
                
                {/* Lingkaran Angka - Akan berubah solid hitam saat di-hover */}
                <div className="absolute left-0 md:left-3 top-0 w-10 h-10 md:w-12 md:h-12 bg-white border-2 border-zinc-200 text-zinc-300 rounded-full flex items-center justify-center font-serif text-lg md:text-xl font-medium group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-500 z-10">
                  1
                </div>

                <div className="pt-1.5 md:pt-2">
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-zinc-900 mb-4 group-hover:translate-x-2 transition-transform duration-300">
                    Komitmen pada Pembaruan
                  </h3>
                  <div className="p-6 md:p-8 bg-white rounded-2xl border border-zinc-200 text-zinc-600 leading-relaxed text-[15px] shadow-sm group-hover:shadow-xl group-hover:border-zinc-300 transition-all duration-500">
                    Jika terdapat bukti baru yang valid, perubahan konteks faktual, atau anomali deteksi pada sistem algoritma kami, kami berkomitmen penuh untuk segera memperbarui basis data dan mengevaluasi ulang metrik analisis terkait guna memastikan akurasi model tetap terjaga pada standar tertinggi.
                  </div>
                </div>
              </div>

              {/* Langkah 02 */}
              <div className="relative pl-10 md:pl-16 pb-12 md:pb-16 group cursor-default">
                <div className="absolute left-[1.15rem] md:left-[1.9rem] top-12 bottom-0 w-px bg-zinc-200 group-hover:bg-zinc-800 transition-colors duration-500"></div>
                
                <div className="absolute left-0 md:left-3 top-0 w-10 h-10 md:w-12 md:h-12 bg-white border-2 border-zinc-200 text-zinc-300 rounded-full flex items-center justify-center font-serif text-lg md:text-xl font-medium group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-500 z-10">
                  2
                </div>

                <div className="pt-1.5 md:pt-2">
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-zinc-900 mb-4 group-hover:translate-x-2 transition-transform duration-300">
                    Mekanisme Pelaporan Sistem
                  </h3>
                  <div className="p-6 md:p-8 bg-white rounded-2xl border border-zinc-200 text-zinc-600 leading-relaxed text-[15px] shadow-sm group-hover:shadow-xl group-hover:border-zinc-300 transition-all duration-500">
                    Pengguna yang menemukan hasil klasifikasi berita yang dinilai keliru atau tidak akurat dapat menghubungi tim kami. Kami mewajibkan pelapor untuk menyertakan tautan referensi pembanding (<em>counter-reference</em>) dari institusi berita yang kredibel guna memfasilitasi proses investigasi.
                  </div>
                </div>
              </div>

              {/* Langkah 03 */}
              <div className="relative pl-10 md:pl-16 group cursor-default">
                {/* Garis dihilangkan untuk item terakhir */}
                <div className="absolute left-[1.15rem] md:left-[1.9rem] top-12 bottom-0 w-px bg-transparent"></div>
                
                <div className="absolute left-0 md:left-3 top-0 w-10 h-10 md:w-12 md:h-12 bg-zinc-900 border-2 border-zinc-900 text-white rounded-full flex items-center justify-center font-serif text-lg md:text-xl font-medium shadow-md z-10 transition-transform duration-500 group-hover:scale-110">
                  3
                </div>

                <div className="pt-1.5 md:pt-2">
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-zinc-900 mb-4 group-hover:translate-x-2 transition-transform duration-300">
                    Proses Tinjauan & Kalibrasi
                  </h3>
                  <div className="p-6 md:p-8 bg-zinc-900 rounded-2xl border border-zinc-800 text-zinc-300 leading-relaxed text-[15px] shadow-lg">
                    Setiap laporan yang masuk akan dievaluasi secara independen. Jika terbukti terdapat kekeliruan struktural, kalibrasi algoritma pembelajaran mesin atau perbaikan label sistem akan segera diimplementasikan untuk meningkatkan performa deteksi di masa mendatang.
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
      
    </div>
  );
};

export default Corrections;