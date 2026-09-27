import React from 'react';
// Import komponen Footer dari folder components
import Footer from '../components/Footer'; 

const METRICS = {
  textOnly: '±64%',
  full: '±79%',
  indonesian: '±54%',
  tokens: '±126',
};

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-zinc-200">
      
      <main className="flex-grow max-w-5xl w-full mx-auto px-6 lg:px-12 py-20">
        
        {/* Bagian Header */}
        <header className="mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-600 text-xs font-medium tracking-wide uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
            Informasi Sistem
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-medium text-zinc-900 mb-6 leading-tight tracking-tight">
            Transparansi Model <br className="hidden md:block" />
            <span className="text-zinc-400">& Keterbatasan</span>
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl leading-relaxed">
            Supaya kamu tahu seberapa jauh hasilnya bisa dipercaya. Kami membuka cara kerja sistem ini agar kamu dapat menggunakannya sebagai alat bantu yang objektif.
          </p>
        </header>

        {/* Metrik Data */}
        <div className="mb-20">
          <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-widest mb-6">Tingkat Akurasi (Uji Internal)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden divide-y md:divide-y-0 md:divide-x divide-zinc-200">
            <div className="p-6 hover:bg-zinc-50 transition-colors">
              <div className="text-3xl font-serif text-zinc-900 mb-2">{METRICS.textOnly}</div>
              <div className="text-sm text-zinc-500">Hanya teks (Tanpa konteks)</div>
            </div>
            <div className="p-6 hover:bg-zinc-50 transition-colors">
              <div className="text-3xl font-serif text-zinc-900 mb-2">{METRICS.full}</div>
              <div className="text-sm text-zinc-500">Konteks lengkap</div>
            </div>
            <div className="p-6 hover:bg-zinc-50 transition-colors">
              <div className="text-3xl font-serif text-zinc-900 mb-2">{METRICS.indonesian}</div>
              <div className="text-sm text-zinc-500">Khusus Bahasa Indonesia</div>
            </div>
            <div className="p-6 hover:bg-zinc-50 transition-colors">
              <div className="text-3xl font-serif text-zinc-900 mb-2">{METRICS.tokens}</div>
              <div className="text-sm text-zinc-500">Batas maksimal token</div>
            </div>
          </div>
        </div>

        {/* Penjelasan & Keterbatasan */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 mb-20">
          <div className="lg:col-span-3">
            <h2 className="font-serif text-2xl font-medium text-zinc-900 mb-4">Mekanisme Analisis</h2>
            <div className="prose prose-zinc prose-p:leading-relaxed text-[15px] text-zinc-600">
              <p>
                Sistem ini menggunakan arsitektur <strong>Model Hibrida</strong> yang mengombinasikan beberapa modul spesifik:
              </p>
              <ul className="mt-4 space-y-2">
                <li><strong>MiniLM & TextCNN</strong> untuk memahami struktur kalimat.</li>
                <li><strong>Fuzzy Logic & CNN-BiLSTM</strong> mengenali pola manipulasi.</li>
                <li><strong>HFGNN</strong> menggabungkan sinyal antarmodul.</li>
              </ul>
              <p className="mt-4">
                Penjelasan hasil prediksi menggunakan metode analisis <em>Occlusion</em> (menghapus satu kalimat secara bergantian untuk melihat perubahannya).
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-100 h-full">
              <h2 className="font-serif text-xl font-medium text-zinc-900 mb-6">Catatan Sistem</h2>
              <ul className="space-y-4 text-[14px] text-zinc-600">
                <li className="flex gap-3">
                  <span className="text-zinc-400 mt-0.5">01</span>
                  <span><strong>Tautan belum didukung.</strong> Copy-paste isi berita manual.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-zinc-400 mt-0.5">02</span>
                  <span><strong>Keterbatasan bahasa.</strong> Akurasi bahasa Indonesia masih dikembangkan.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-zinc-400 mt-0.5">03</span>
                  <span><strong>Pemotongan teks.</strong> Teks melebihi {METRICS.tokens} token akan dipotong.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Peringatan */}
        <div className="bg-zinc-900 text-zinc-100 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div className="max-w-2xl">
            <h3 className="font-serif text-xl mb-2 text-white">Bukan Keputusan Final</h3>
            <p className="text-zinc-400 text-[15px] leading-relaxed">
              Hasil analisis dirancang sebagai <strong>alat bantu berpikir kritis</strong>. Selalu verifikasi klaim ke sumber tepercaya atau situs cek fakta independen.
            </p>
          </div>
        </div>
      </main>

      {/* Render komponen Footer Global */}
      <Footer />
      
    </div>
  );
}
