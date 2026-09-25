import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
// Import halaman baru (pastikan file Ethics.jsx, Terms.jsx, dan Corrections.jsx ada di dalam folder 'pages')
import Ethics from './pages/Ethics'
import Terms from './pages/Terms'
import Corrections from './pages/Corrections'

function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tentang" element={<About />} />
        {/* Tambahkan rute untuk halaman baru di bawah ini */}
        <Route path="/kode-etik" element={<Ethics />} />
        <Route path="/ketentuan-layanan" element={<Terms />} />
        <Route path="/kebijakan-koreksi" element={<Corrections />} />
      </Routes>
    </div>
  )
}

export default App