# Buku Program Digital — Majlis Apresiasi Kecemerlangan Murid 2026

Buku program digital interaktif berbentuk **flipbook** (selak halaman realistik) untuk
**SK Seri Gemilang**. Dibina dengan Next.js, TypeScript, Tailwind CSS dan React PageFlip.

> ⚠️ **Semua kandungan adalah DEMO REKAAN** — nama sekolah, nama individu, nama murid,
> alamat dan nombor telefon bukan maklumat sebenar.

## Ciri-ciri

- 12 halaman lengkap dalam Bahasa Melayu (kulit hadapan → kulit belakang)
- Animasi selak halaman realistik dengan bayang, tulang buku (spine) dan ketebalan helaian
- **Desktop/tablet landskap:** dua halaman serentak, kulit tunggal
- **Telefon/tablet potret:** satu halaman, leret & ketik untuk menyelak
- Klik halaman kanan/kiri, seret bucu halaman, butang Sebelum/Seterusnya, kekunci anak panah
- Bar kawalan: kulit hadapan, sebelum, nombor halaman (pemilih halaman), seterusnya,
  muzik + kelantangan, mod bacaan (zum), skrin penuh, isi kandungan
- Muzik latar instrumental asli (bebas hak cipta), berulang, tidak bermula semula ketika menyelak,
  keadaan senyap diingati sepanjang sesi
- Paparan sambutan "MULA MEMBACA" jika pelayar menyekat autoplay
- Bunyi selak halaman (boleh dimatikan), galeri dengan paparan foto besar (lightbox)
- Skrin muat, animasi pembukaan, sokongan `prefers-reduced-motion`

### Pintasan papan kekunci

| Kekunci | Fungsi |
| --- | --- |
| `→` / `←` | Halaman seterusnya / sebelum |
| `Home` / `End` | Kulit hadapan / kulit belakang |
| `F` | Skrin penuh |
| `M` | Senyap / hidupkan muzik |
| `Esc` | Tutup panel |

## Menjalankan projek

```bash
npm install
```

```bash
npm run dev
```

Buka http://localhost:3000. Untuk build pengeluaran:

```bash
npm run build && npm start
```

## Mengemas kini kandungan untuk pelanggan sebenar

**Semua teks, tarikh, nama, aturcara, jawatankuasa dan rujukan imej berada dalam satu fail:**

```
src/data/programme.ts
```

| Perkara | Lokasi |
| --- | --- |
| Logo sekolah | `public/images/logo.svg` (atau tukar laluan `school.logo`) |
| Foto Guru Besar / pentadbir | `public/images/portrait-*.svg` → gantikan dengan `.jpg`/`.png` dan kemas kini laluan dalam `programme.ts` |
| Foto galeri | `public/images/gallery/` → kemas kini `gallery.items` |
| Ilustrasi kulit | `public/images/cover-hero.svg` |
| Muzik latar | `public/audio/background-music.mp3` |
| Bunyi selak | `public/audio/page-flip.mp3` |

Jika fail muzik tiada, butang muzik akan menunjukkan amaran dan mesej panduan dipaparkan dalam panel muzik —
buku tetap berfungsi seperti biasa.

**Tips foto:** gunakan nisbah potret 4:5 untuk foto individu dan 4:3 untuk galeri. Imej dipaparkan dengan
`object-cover` jadi tidak akan herot.

## Struktur projek

```
src/
  app/                 layout, gaya global, halaman utama
  components/
    audio/             AudioProvider (muzik & bunyi), MusicControl
    book/              FlipBook (StPageFlip), BookPage, konteks UI
    controls/          ControlBar, TableOfContents
    layout/            LoadingScreen, WelcomeOverlay, TopBar, Lightbox, ReaderModal
    pages/             12 komponen halaman + primitif reka letak (boleh guna semula)
    BookExperience.tsx orkestrasi keseluruhan pengalaman
  data/programme.ts    ← SEMUA kandungan
  hooks/               useBookSize (saiz responsif), useFullscreen
  lib/book.ts          pemalar saiz halaman & utiliti
public/
  images/  audio/  fonts/
```

Halaman direka pada saiz asas 360×512 px dan diskala secara automatik mengikut skrin, jadi komposisi
kekal sama pada semua peranti. Mod bacaan (ikon zum) memaparkan halaman lebih besar untuk telefon kecil.

## Kredit

- Muzik latar & bunyi selak: disintesis khas untuk demo ini (karya asli, bebas hak cipta).
- Ilustrasi: SVG asli dalam projek ini.
- Fon: Playfair Display & Poppins (Google Fonts, Lesen OFL).
