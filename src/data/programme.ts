/**
 * ==========================================================================
 *  KANDUNGAN BUKU PROGRAM DIGITAL — FAIL BERPUSAT
 * ==========================================================================
 *  Semua teks, tarikh, nama, aturcara, jawatankuasa dan rujukan imej
 *  diurus dari fail ini sahaja. Untuk pelanggan sebenar, kemas kini
 *  maklumat di sini dan gantikan imej di folder /public/images.
 *
 *  ⚠ PERHATIAN: Semua maklumat di bawah adalah KANDUNGAN DEMO REKAAN.
 *  Ia bukan maklumat sekolah atau majlis sebenar.
 * ==========================================================================
 */

export type Person = {
  name: string;
  role: string;
  photo?: string;
};

export type ScheduleItem = {
  time: string;
  title: string;
  description?: string;
  highlight?: boolean;
};

export type CommitteeGroup = {
  title: string;
  members: string[];
};

export type AwardCategory = {
  title: string;
  description: string;
  icon: "medal" | "calendar" | "heart" | "trophy" | "crown";
  recipients: { name: string; className: string; note?: string }[];
  featured?: boolean;
};

export type GalleryItem = {
  src: string;
  caption: string;
  year: string;
};

export type AppreciationGroup = {
  title: string;
  icon: "teachers" | "parents" | "sponsors" | "organisations";
  items: string[];
};

export type PageMeta = {
  number: number;
  title: string;
  subtitle: string;
};

export const DEMO_NOTICE =
  "Kandungan demo rekaan — bukan maklumat sekolah atau majlis sebenar.";

export const school = {
  shortName: "SK Seri Gemilang",
  fullName: "Sekolah Kebangsaan Seri Gemilang",
  motto: "Ilmu • Budi • Bakti",
  tagline: "Sekolah Penyayang, Murid Cemerlang",
  logo: "/images/logo.svg",
  address: ["Jalan Pendidikan 1, Taman Seri Gemilang,", "00000 Bandar Contoh, Malaysia"],
  phone: "03-0000 0000 (demo)",
  email: "pentadbiran@skserigemilang.demo",
  website: "www.skserigemilang.demo",
  social: "@skserigemilang.demo",
};

export const programme = {
  bookLabel: "Buku Program",
  title: "Majlis Apresiasi Kecemerlangan Murid",
  year: "2026",
  fullTitle: "Majlis Apresiasi Kecemerlangan Murid 2026",
  theme: "Melakar Kecemerlangan, Mencipta Kegemilangan",
  day: "Sabtu",
  date: "28 November 2026",
  time: "8.00 pagi – 12.30 tengah hari",
  venue: "Dewan Seri Gemilang",
  organiser: "SK Seri Gemilang",
  heroImage: "/images/cover-hero.svg",
  ornament: "/images/ornament-corner.svg",
};

export const assets = {
  music: "/audio/background-music.mp3",
  flipSound: "/audio/page-flip.mp3",
};

/* ------------------------------------------------------------------ */
/* Senarai halaman (untuk Isi Kandungan & penunjuk halaman)            */
/* ------------------------------------------------------------------ */
export const pages: PageMeta[] = [
  { number: 1, title: "Kulit Hadapan", subtitle: "Majlis Apresiasi 2026" },
  { number: 2, title: "Kata Alu-aluan", subtitle: "Guru Besar" },
  { number: 3, title: "Ucapan Yang Dipertua PIBG", subtitle: "Persatuan Ibu Bapa dan Guru" },
  { number: 4, title: "Pengenalan Program", subtitle: "Latar belakang & tujuan" },
  { number: 5, title: "Objektif & Tema", subtitle: "Hala tuju majlis" },
  { number: 6, title: "Aturcara Majlis", subtitle: "Jadual acara" },
  { number: 7, title: "Barisan Pentadbir", subtitle: "Pentadbiran sekolah" },
  { number: 8, title: "Jawatankuasa Pelaksana", subtitle: "Organisasi majlis" },
  { number: 9, title: "Penerima Anugerah", subtitle: "Kategori & penerima" },
  { number: 10, title: "Penghargaan", subtitle: "Terima kasih kepada semua" },
  { number: 11, title: "Galeri Kenangan", subtitle: "Detik-detik bermakna" },
  { number: 12, title: "Kulit Belakang", subtitle: "Terima kasih" },
];

/* ------------------------------------------------------------------ */
/* Halaman 2 — Kata Alu-aluan Guru Besar                               */
/* ------------------------------------------------------------------ */
export const principalMessage = {
  kicker: "Kata Alu-aluan",
  heading: "Guru Besar",
  person: {
    name: "Puan Hajah Noraini binti Abdul Rahman",
    role: "Guru Besar, SK Seri Gemilang",
    photo: "/images/portrait-female-1.svg",
  } satisfies Person,
  greeting: "Assalamualaikum warahmatullahi wabarakatuh dan Salam Sejahtera.",
  paragraphs: [
    "Alhamdulillah, syukur ke hadrat Ilahi kerana dengan izin-Nya, Majlis Apresiasi Kecemerlangan Murid 2026 dapat dilaksanakan dengan jayanya. Majlis ini merupakan detik istimewa untuk kita meraikan usaha, ketekunan dan kejayaan anak-anak kita sepanjang tahun ini.",
    "Setiap anugerah yang disampaikan hari ini bukan sekadar pengiktirafan, tetapi bukti bahawa kejayaan lahir daripada disiplin, sokongan guru dan doa ibu bapa. Terima kasih kepada barisan guru, PIBG dan semua pihak yang membimbing murid kita.",
    "Kepada para murid, teruskan melakar impian kalian. Jadikan kejayaan hari ini sebagai pemangkin untuk mencipta kegemilangan yang lebih besar.",
  ],
  closing: "Sekian, terima kasih.",
  signature: "Noraini",
};

/* ------------------------------------------------------------------ */
/* Halaman 3 — Ucapan Yang Dipertua PIBG                               */
/* ------------------------------------------------------------------ */
export const pibgMessage = {
  kicker: "Ucapan",
  heading: "Yang Dipertua PIBG",
  person: {
    name: "Encik Mohd Hafiz bin Ismail",
    role: "Yang Dipertua PIBG SK Seri Gemilang",
    photo: "/images/portrait-male-1.svg",
  } satisfies Person,
  greeting: "Assalamualaikum dan Salam Sejahtera.",
  paragraphs: [
    "Bagi pihak Persatuan Ibu Bapa dan Guru (PIBG), saya mengucapkan tahniah kepada semua murid yang menerima anugerah pada hari ini. Kejayaan kalian adalah kebanggaan seluruh warga sekolah dan komuniti.",
    "PIBG akan terus menjadi rakan strategik sekolah dalam menyokong program akademik, sahsiah dan kokurikulum. Jalinan erat antara ibu bapa dan guru inilah yang menjadi asas kepada kecemerlangan murid.",
  ],
  quote: "Kejayaan anak-anak adalah hasil sentuhan bersama — rumah, sekolah dan komuniti.",
  closing: "Selamat maju jaya.",
  signature: "M. Hafiz",
};

/* ------------------------------------------------------------------ */
/* Halaman 4 — Pengenalan Program                                      */
/* ------------------------------------------------------------------ */
export const introduction = {
  kicker: "Pengenalan Program",
  heading: "Meraikan Setiap Langkah Kejayaan",
  paragraphs: [
    "Majlis Apresiasi Kecemerlangan Murid merupakan acara tahunan SK Seri Gemilang yang diadakan pada penghujung sesi persekolahan. Majlis ini menghimpunkan murid, ibu bapa, guru dan komuniti dalam satu suasana penuh kesyukuran.",
    "Latar belakang penganjuran majlis ini berakar daripada hasrat sekolah untuk menghargai pencapaian murid secara menyeluruh — merangkumi akademik, sahsiah, kehadiran dan kokurikulum — selaras dengan aspirasi pendidikan negara.",
    "Tujuan utama majlis ini adalah untuk memberi pengiktirafan, menyuntik semangat dan membina budaya menghargai dalam kalangan warga sekolah.",
  ],
  stats: [
    { value: "120+", label: "Penerima anugerah" },
    { value: "5", label: "Kategori utama" },
    { value: "850", label: "Murid sekolah" },
  ],
};

/* ------------------------------------------------------------------ */
/* Halaman 5 — Objektif & Tema                                         */
/* ------------------------------------------------------------------ */
export const objectivesTheme = {
  kicker: "Objektif & Tema",
  heading: "Hala Tuju Majlis",
  themeLabel: "Tema 2026",
  themeExplanation:
    "Tema ini menggambarkan perjalanan murid yang melakar impian melalui usaha berterusan, lalu mencipta kegemilangan untuk diri, keluarga dan sekolah.",
  objectives: [
    "Menghargai pencapaian murid dalam bidang akademik, sahsiah dan kokurikulum.",
    "Memupuk budaya cemerlang dan semangat bersaing secara sihat.",
    "Mengeratkan hubungan antara sekolah, ibu bapa dan komuniti.",
    "Memberi motivasi kepada murid untuk terus mencapai kejayaan.",
  ],
  outcomesHeading: "Hasil yang Diharapkan",
  outcomes: [
    "Murid lebih bermotivasi dan yakin diri.",
    "Ibu bapa lebih terlibat dalam pendidikan anak.",
    "Budaya menghargai subur dalam warga sekolah.",
  ],
};

/* ------------------------------------------------------------------ */
/* Halaman 6 — Aturcara Majlis                                         */
/* ------------------------------------------------------------------ */
export const schedule: { kicker: string; heading: string; items: ScheduleItem[]; note: string } = {
  kicker: "Aturcara Majlis",
  heading: "Jadual Acara",
  items: [
    { time: "8.00 pagi", title: "Ketibaan tetamu", description: "Pendaftaran ibu bapa, murid dan tetamu jemputan." },
    { time: "8.30 pagi", title: "Nyanyian lagu rasmi", description: "Negaraku, lagu negeri dan lagu sekolah." },
    { time: "8.45 pagi", title: "Bacaan doa", description: "Dipimpin oleh Ustaz sekolah." },
    { time: "9.00 pagi", title: "Ucapan Guru Besar", description: "Kata aluan dan perasmian majlis." },
    { time: "9.30 pagi", title: "Penyampaian anugerah", description: "Mengikut kategori anugerah.", highlight: true },
    { time: "11.30 pagi", title: "Persembahan murid", description: "Koir, tarian dan sajak berkumpulan." },
    { time: "12.00 tgh", title: "Jamuan", description: "Jamuan ringan di ruang legar dewan." },
    { time: "12.30 tgh", title: "Majlis bersurai" },
  ],
  note: "* Aturcara tertakluk kepada perubahan.",
};

/* ------------------------------------------------------------------ */
/* Halaman 7 — Barisan Pentadbir                                       */
/* ------------------------------------------------------------------ */
export const administration: { kicker: string; heading: string; intro: string; people: Person[] } = {
  kicker: "Pentadbiran Sekolah",
  heading: "Barisan Pentadbir",
  intro: "Teraju kepimpinan yang komited membimbing warga SK Seri Gemilang ke arah kecemerlangan.",
  people: [
    { name: "Puan Hajah Noraini binti Abdul Rahman", role: "Guru Besar", photo: "/images/portrait-female-1.svg" },
    { name: "Encik Ahmad Faizal bin Kamarudin", role: "Penolong Kanan Pentadbiran", photo: "/images/portrait-male-1.svg" },
    { name: "Puan Siti Khadijah binti Omar", role: "Penolong Kanan HEM", photo: "/images/portrait-female-2.svg" },
    { name: "Encik Rajendran a/l Muthusamy", role: "Penolong Kanan Kokurikulum", photo: "/images/portrait-male-2.svg" },
  ],
};

/* ------------------------------------------------------------------ */
/* Halaman 8 — Jawatankuasa Pelaksana                                  */
/* ------------------------------------------------------------------ */
export const committee = {
  kicker: "Organisasi Majlis",
  heading: "Jawatankuasa Pelaksana",
  advisor: { role: "Penasihat", name: "Puan Hajah Noraini binti Abdul Rahman" },
  core: [
    { role: "Pengarah Program", name: "Encik Ahmad Faizal bin Kamarudin" },
    { role: "Timbalan Pengarah", name: "Puan Siti Khadijah binti Omar" },
    { role: "Setiausaha", name: "Cik Nurul Aina binti Zakaria" },
    { role: "Bendahari", name: "Puan Tan Mei Ling" },
  ],
  groups: [
    { title: "AJK Protokol", members: ["Puan Kavitha a/p Subramaniam", "Encik Zulkifli bin Hassan"] },
    { title: "AJK Teknikal", members: ["Encik Mohd Rizal bin Yusof", "Encik Lim Wei Jie"] },
    { title: "AJK Multimedia", members: ["Cik Farah Adibah binti Rosli", "Encik Haziq bin Abd Rahim"] },
    { title: "AJK Jamuan", members: ["Puan Rohana binti Salleh", "Puan Norhayati binti Ali"] },
  ] satisfies CommitteeGroup[],
};

/* ------------------------------------------------------------------ */
/* Halaman 9 — Penerima Anugerah (NAMA MURID ADALAH REKAAN)            */
/* ------------------------------------------------------------------ */
export const awards: { kicker: string; heading: string; demoNote: string; categories: AwardCategory[] } = {
  kicker: "Penerima Anugerah",
  heading: "Barisan Bintang 2026",
  demoNote: "Nama murid adalah contoh rekaan untuk tujuan demo.",
  categories: [
    {
      title: "Anugerah Murid Cemerlang",
      description: "Pencapaian akademik terbaik PBD",
      icon: "medal",
      recipients: [
        { name: "Nur Aisyah Humaira binti Azman", className: "6 Bestari" },
        { name: "Tan Jia Xin", className: "5 Cemerlang" },
      ],
    },
    {
      title: "Anugerah Kehadiran Terbaik",
      description: "Kehadiran 100% sepanjang tahun",
      icon: "calendar",
      recipients: [
        { name: "Ahmad Luqman Hakim bin Zainal", className: "4 Dedikasi" },
        { name: "Sharvin a/l Ganesan", className: "3 Gigih" },
      ],
    },
    {
      title: "Anugerah Sahsiah Terpuji",
      description: "Akhlak mulia & teladan rakan",
      icon: "heart",
      recipients: [
        { name: "Siti Nur Insyirah binti Hamdan", className: "6 Cemerlang" },
        { name: "Adam Rayyan bin Firdaus", className: "2 Bestari" },
      ],
    },
    {
      title: "Anugerah Kokurikulum",
      description: "Pencapaian sukan, kelab & unit beruniform",
      icon: "trophy",
      recipients: [
        { name: "Muhammad Irfan bin Shahril", className: "5 Dedikasi" },
        { name: "Priya a/p Ramesh", className: "6 Gigih" },
      ],
    },
    {
      title: "Anugerah Khas Guru Besar",
      description: "Murid serba boleh & inspirasi sekolah",
      icon: "crown",
      featured: true,
      recipients: [
        {
          name: "Muhammad Danish Iskandar bin Roslan",
          className: "6 Bestari",
          note: "Johan Pidato Daerah, Ketua Pengawas & pencapaian akademik cemerlang.",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Halaman 10 — Penghargaan                                            */
/* ------------------------------------------------------------------ */
export const appreciation: { kicker: string; heading: string; message: string; groups: AppreciationGroup[] } = {
  kicker: "Penghargaan",
  heading: "Jutaan Terima Kasih",
  message:
    "Jawatankuasa pelaksana merakamkan setinggi-tinggi penghargaan kepada semua pihak yang telah menyumbang tenaga, idea, masa dan sokongan sehingga majlis ini berjaya dilaksanakan.",
  groups: [
    { title: "Guru & Staf", icon: "teachers", items: ["Barisan guru SK Seri Gemilang", "Staf sokongan & pejabat"] },
    { title: "Ibu Bapa", icon: "parents", items: ["Ibu bapa & penjaga murid", "AJK PIBG sesi 2026"] },
    { title: "Penaja", icon: "sponsors", items: ["Kedai Buku Ilmu Jaya (demo)", "Cahaya Murni Sdn. Bhd. (demo)"] },
    { title: "Organisasi Sokongan", icon: "organisations", items: ["Persatuan Alumni Sekolah (demo)", "Komuniti Taman Seri Gemilang"] },
  ],
};

/* ------------------------------------------------------------------ */
/* Halaman 11 — Galeri Kenangan                                        */
/* ------------------------------------------------------------------ */
export const gallery: { kicker: string; heading: string; note: string; items: GalleryItem[] } = {
  kicker: "Galeri Kenangan",
  heading: "Detik Bermakna",
  note: "Ilustrasi sebagai pemegang tempat foto sebenar.",
  items: [
    { src: "/images/gallery/anugerah.svg", caption: "Majlis Anugerah 2025", year: "2025" },
    { src: "/images/gallery/sukan.svg", caption: "Sukan Tahunan", year: "2026" },
    { src: "/images/gallery/sains.svg", caption: "Karnival Sains", year: "2026" },
    { src: "/images/gallery/perhimpunan.svg", caption: "Perhimpunan Mingguan", year: "2026" },
    { src: "/images/gallery/perpustakaan.svg", caption: "Program NILAM", year: "2026" },
    { src: "/images/gallery/seni.svg", caption: "Pertandingan Seni", year: "2026" },
    { src: "/images/gallery/kokurikulum.svg", caption: "Perkhemahan Unit Beruniform", year: "2026" },
    { src: "/images/gallery/hari-guru.svg", caption: "Sambutan Hari Guru", year: "2026" },
  ],
};

/* ------------------------------------------------------------------ */
/* Halaman 12 — Kulit Belakang                                         */
/* ------------------------------------------------------------------ */
export const backCover = {
  heading: "Terima Kasih",
  message:
    "Atas kehadiran dan sokongan anda. Semoga kejayaan hari ini menjadi inspirasi untuk kita terus melakar kecemerlangan bersama.",
  closingLine: "Jumpa lagi pada majlis akan datang!",
};

/* ------------------------------------------------------------------ */
/* Teks antara muka (UI)                                               */
/* ------------------------------------------------------------------ */
export const ui = {
  startReading: "Mula Membaca",
  welcomeTitle: "Selamat Datang",
  welcomeSubtitle: "Buku Program Digital",
  welcomeHint: "Sila hidupkan bunyi untuk pengalaman terbaik",
  loading: "Menyediakan buku program…",
  hintDesktop: "Klik halaman atau seret bucu untuk menyelak",
  hintMobile: "Leret atau ketik tepi halaman untuk menyelak",
  previous: "Sebelum",
  next: "Seterusnya",
  cover: "Kulit hadapan",
  contents: "Isi Kandungan",
  fullscreen: "Skrin penuh",
  exitFullscreen: "Keluar skrin penuh",
  music: "Muzik latar",
  mute: "Senyapkan muzik",
  unmute: "Hidupkan muzik",
  volume: "Kelantangan",
  flipSound: "Bunyi selak halaman",
  page: "Halaman",
  goToPage: "Pergi ke halaman",
  close: "Tutup",
  musicMissing:
    "Fail muzik belum tersedia. Letakkan fail di public/audio/background-music.mp3 untuk mengaktifkan muzik latar.",
  musicCredit: "Muzik instrumental asli (demo) — bebas hak cipta.",
};
