import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper border-t-4 border-accent mt-auto">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-10 lg:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Bagian Kiri: Logo & Info Kampus */}
          <div className="flex items-center gap-4">
            <img 
                src="/unesa.png" 
                alt="Logo Universitas Negeri Surabaya" 
                className="w-12 h-12 object-contain drop-shadow-md bg-white/10 rounded-full p-1"
            />
            <div>
              <h3 className="font-serif font-bold text-paper text-lg tracking-wide">
                Periksa<span className="text-accent-soft opacity-70">Berita</span>
              </h3>
              <p className="text-sm text-paper/60 font-medium">Proyek Capstone • Universitas Negeri Surabaya</p>
            </div>
          </div>

          {/* Bagian Kanan: Tautan Halaman */}
          <div className="flex flex-wrap gap-6 text-sm font-medium text-paper/70">
            <Link to="/" className="hover:text-paper transition-colors">Beranda</Link>
            <Link to="/dashboard" className="hover:text-paper transition-colors">Dashboard</Link>
            <Link to="/tentang" className="hover:text-paper transition-colors">Tentang</Link>
            <Link to="/kode-etik" className="hover:text-paper transition-colors">Kode Etik</Link>
          </div>
        </div>

        {/* Garis Pemisah & Copyright */}
        <hr className="border-paper/10 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-paper/50">
          <p>&copy; {new Date().getFullYear()} PeriksaBerita. Hak cipta dilindungi.</p>
          <div className="flex gap-4">
            <Link to="/ketentuan-layanan" className="hover:text-paper transition-colors">Ketentuan Layanan</Link>
            <span>•</span>
            <Link to="/kebijakan-koreksi" className="hover:text-paper transition-colors">Kebijakan Koreksi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}