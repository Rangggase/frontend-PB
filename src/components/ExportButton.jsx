import { useState } from 'react'
// html2canvas-pro = html2canvas yang mendukung warna modern (oklch) yang dipakai Tailwind v4.
// html2canvas biasa gagal dengan error: unsupported color function "oklch".
import html2canvas from 'html2canvas-pro'
import { jsPDF } from 'jspdf'
import { pageSlices } from '../lib/result'

// format: 'png' | 'pdf'
export default function ExportButton({ targetRef, fileName = 'hasil-analisis', format = 'png' }) {
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    if (!targetRef.current) return
    setExporting(true)
    try {
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: '#faf9f6',
        scale: 2,
        useCORS: true,
      })

      if (format === 'pdf') {
        const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
        const pw = pdf.internal.pageSize.getWidth()
        const ph = pdf.internal.pageSize.getHeight()
        const margin = 28
        pageSlices(canvas.width, canvas.height, pw, ph, margin).forEach((s, i) => {
          if (i > 0) pdf.addPage()
          const part = document.createElement('canvas')
          part.width = canvas.width
          part.height = s.sh
          part.getContext('2d').drawImage(canvas, 0, s.sy, canvas.width, s.sh, 0, 0, canvas.width, s.sh)
          pdf.addImage(part.toDataURL('image/png'), 'PNG', margin, margin, s.dw, s.dh)
        })
        pdf.save(`${fileName}.pdf`)
      } else {
        const link = document.createElement('a')
        link.download = `${fileName}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
      }
    } catch (err) {
      console.error('Gagal export:', err)
      alert('Gagal membuat file: ' + (err?.message || 'kesalahan tidak diketahui'))
    } finally {
      setExporting(false)
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="text-ink-muted hover:text-ink underline decoration-rule-strong underline-offset-2 disabled:opacity-50"
    >
      {exporting ? 'Menyimpan…' : format === 'pdf' ? 'Unduh PDF' : 'Unduh gambar'}
    </button>
  )
}
