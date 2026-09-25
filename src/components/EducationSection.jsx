const TYPES = [
  {
    title: 'Misinformasi',
    desc: 'Informasi salah yang disebarkan tanpa niat menipu, misalnya meneruskan kabar yang dikira benar.',
  },
  {
    title: 'Disinformasi',
    desc: 'Informasi salah yang sengaja dibuat atau disebarkan untuk menyesatkan, demi keuntungan atau pengaruh.',
  },
  {
    title: 'Malinformasi',
    desc: 'Informasi berdasar fakta, tetapi dipakai di luar konteks atau dibuka untuk merugikan pihak tertentu.',
  },
]

const TIPS = [
  {
    title: 'Periksa sumbernya',
    desc: 'Cek apakah berita berasal dari media resmi dan terpercaya, bukan sekadar akun media sosial anonim.',
  },
  {
    title: 'Cek tanggal publikasi',
    desc: 'Berita lama kadang disebarkan ulang seolah baru terjadi untuk menyesatkan pembaca.',
  },
  {
    title: 'Waspada judul sensasional',
    desc: 'Judul yang provokatif atau bombastis sering dipakai untuk memancing klik, bukan menyampaikan fakta.',
  },
  {
    title: 'Bandingkan dengan sumber lain',
    desc: 'Cek apakah media lain yang kredibel juga memberitakan hal yang sama.',
  },
  {
    title: 'Hati-hati pesan "segera bagikan"',
    desc: 'Pesan yang mendesak disebar ke banyak grup, atau mengklaim "media menyembunyikan ini", patut dicurigai.',
  },
  {
    title: 'Curigai foto dan video lama',
    desc: 'Foto atau video lama sering dipakai ulang untuk peristiwa yang berbeda.',
  },
]

const STEPS = [
  'Baca isi berita, bukan hanya judulnya.',
  'Periksa sumber, penulis, dan tanggal terbitnya.',
  'Cari berita yang sama di beberapa media tepercaya.',
  'Cek di situs cek fakta, misalnya TurnBackHoax (Mafindo) atau CekFakta.com.',
  'Ragu? Jangan bagikan dulu.',
]

export default function EducationSection() {
  return (
    <section>
      <div className="grid lg:grid-cols-[380px_1fr] gap-12 mb-14">
        <div>
          <h2 className="font-serif text-3xl font-semibold text-ink leading-tight">
            Kenali fake news
          </h2>
          <p className="mt-3 text-ink-muted leading-relaxed">
            Tidak semua informasi keliru itu sama. Membedakannya membantu kita menanggapinya
            dengan tepat — apakah cukup diabaikan, diluruskan, atau dilaporkan.
          </p>
        </div>

        <dl className="grid sm:grid-cols-3 gap-8">
          {TYPES.map((t) => (
            <div key={t.title} className="border-t-2 border-accent pt-3">
              <dt className="font-serif text-lg font-semibold text-ink">{t.title}</dt>
              <dd className="text-sm text-ink-muted mt-1.5 leading-relaxed">{t.desc}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid lg:grid-cols-[380px_1fr] gap-12 mb-14">
        <h3 className="font-serif text-xl font-semibold text-ink self-start">
          Ciri-ciri yang patut dicurigai
        </h3>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-6">
          {TIPS.map((tip) => (
            <div key={tip.title} className="border-l-2 border-rule-strong pl-4">
              <p className="text-sm font-medium text-ink">{tip.title}</p>
              <p className="text-sm text-ink-muted mt-1 leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[380px_1fr] gap-12">
        <h3 className="font-serif text-xl font-semibold text-ink self-start">
          5 langkah verifikasi
        </h3>
        <ol className="max-w-xl space-y-3">
          {STEPS.map((s, i) => (
            <li key={s} className="flex gap-4 text-[15px] text-ink-muted items-baseline">
              <span className="font-serif text-xl text-accent shrink-0 w-5">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
