import { AnimatePresence, motion } from 'framer-motion'

export default function Toast({ message, type = 'error', onClose }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 px-4 py-2.5 text-sm border-l-2 bg-paper shadow-sm ${
            type === 'error' ? 'border-fake text-fake' : 'border-real text-real'
          }`}
        >
          <span className="text-ink">{message}</span>
          <button onClick={onClose} className="text-ink-soft hover:text-ink" aria-label="Tutup notifikasi">
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
