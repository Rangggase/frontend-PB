export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center gap-2 mt-5 text-slate-500 text-sm">
      <span className="h-4 w-4 rounded-full border-2 border-slate-300 border-t-indigo-600 animate-spin" />
      Memeriksa berita ke server...
    </div>
  )
}
