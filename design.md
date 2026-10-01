# design.md — Website Kopi Insight Bandung

Spesifikasi desain untuk implementasi website Kopi Insight by Delapan Belas Coffee (cabang Soreang, Kab. Bandung) dengan React. Semua nilai di bawah diambil dari desain awal di kanvas (artboard **Beranda – Desktop** 1440 px dan **Beranda – HP** 390 px).

---

## 1. Prinsip desain

1. **Gelap dan tegas.** Mengikuti identitas Instagram: latar hampir hitam, teks putih hangat, judul besar kondensat seperti logo.
2. **Satu aksen.** Amber `#F2A33A` hanya untuk aksi utama (Reservasi), promo dan penanda penting. Jangan dipakai sebagai dekorasi.
3. **Mobile-first.** Mayoritas pengunjung datang dari Instagram di HP. Tombol Reservasi dan WhatsApp selalu bisa dijangkau.
4. **Foto asli, bukan stok.** Suasana malam, minuman dan DJ dari kafe sendiri.
5. **Bahasa santai.** Kalimat pendek, akrab, boleh sapaan Sunda ringan.

---

## 2. Design tokens

### 2.1 Warna

| Token | Hex | Pemakaian |
| --- | --- | --- |
| `bg` | `#0F0E0D` | Latar halaman |
| `bg-alt` | `#161412` | Latar section selang-seling (Event, Cabang) |
| `surface` | `#1A1816` | Kartu, form, panel lokasi |
| `placeholder` | `#1D1A17` | Area foto sebelum gambar dimuat |
| `line` | `#2A2622` | Garis pemisah header, section |
| `line-strong` | `#2E2A26` | Border kartu, baris event |
| `border-input` | `#3A352F` | Border input, pill tidak aktif |
| `text` | `#F5F1EB` | Teks utama |
| `text-soft` | `#C9C1B6` | Paragraf pendukung, label form |
| `text-muted` | `#B5ADA3` | Caption, meta (jam, kota) |
| `accent` | `#F2A33A` | CTA utama, promo, angka tanggal |
| `accent-hover` | `#FFC170` | Hover link aksen |
| `on-accent` | `#1A1208` | Teks di atas latar amber |
| `badge-bg` | `#2A2219` | Latar badge BEST SELLER / BARU |
| `status-open` | `#5BC27A` | Titik indikator "Buka hari ini" |

Aturan kontras: teks di atas `accent` selalu `on-accent`, bukan putih. `text-muted` hanya untuk teks ≥ 13 px.

### 2.2 Tipografi

| Peran | Font | Fallback |
| --- | --- | --- |
| Display (judul, angka besar, logo teks) | **Anton** 400 | `'Arial Narrow', sans-serif` |
| Body (semua teks lain) | **Plus Jakarta Sans** 400 / 500 / 600 / 700 | `system-ui, sans-serif` |

Import Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Skala (desktop → HP):

| Token | Desktop | HP | Font | Catatan |
| --- | --- | --- | --- | --- |
| `display-xl` (H1 hero) | 84 / 0.98 | 46 / 1.0 | Anton, uppercase | letter-spacing 0.5px |
| `display-l` (H2 section) | 52 / 1.02 | 30–34 / 1.02 | Anton, uppercase | |
| `display-promo` | 72 / 1 | 48 / 1 | Anton | Angka promo |
| `display-m` | 36–48 | 22–30 | Anton | Judul kartu, tanggal event |
| `body-l` | 18 / 1.55 | 15 / 1.5 | Jakarta 400 | Lead paragraph |
| `body` | 16 / 1.55 | 15 / 1.5 | Jakarta 400 | |
| `label` | 15 | 14 | Jakarta 500–600 | Nav, tombol |
| `eyebrow` | 13, uppercase, ls 1.5px | 12 | Jakarta 700 | Warna `accent` |
| `caption` | 13–14 | 13 | Jakarta 400 | `text-muted` |

### 2.3 Spasi, radius, ukuran

- **Skala spasi (px):** 4, 6, 8, 12, 16, 18, 20, 24, 28, 32, 40, 56, 72, 88.
- **Padding section vertikal:** desktop 88, HP 32.
- **Container:** `max-width: 1200px`, padding samping 32 (desktop) / 20 (HP).
- **Gap grid:** 20–24 untuk kartu, 56 untuk kolom dua sisi.

| Radius | Nilai | Pemakaian |
| --- | --- | --- |
| `radius-pill` | 999px | Semua tombol, pill, badge |
| `radius-xl` | 24px | Kartu besar, foto hero, form |
| `radius-l` | 18–20px | Kartu menu, kartu cabang |
| `radius-m` | 16px | Foto di HP |
| `radius-s` | 10–12px | Input, tombol ikon |

- **Target sentuh minimum:** 44 px. Tombol CTA 48–52 px.

---

## 3. Breakpoints dan layout

| Nama | Lebar | Perubahan utama |
| --- | --- | --- |
| `sm` | < 640 | Satu kolom, nav jadi tombol hamburger, bottom bar Reservasi + WhatsApp muncul |
| `md` | 640–1023 | Grid menu 2 kolom, hero tetap satu kolom |
| `lg` | ≥ 1024 | Layout desktop penuh: hero 2 kolom, menu 4 kolom, cabang 4 kolom |

Header desktop `position: sticky; top: 0`. Bottom bar HP `position: fixed; bottom: 0` dengan `padding-bottom: env(safe-area-inset-bottom)`; beri `padding-bottom` ±120 px pada footer agar konten tidak tertutup.

---

## 4. Komponen

### Button
| Varian | Gaya |
| --- | --- |
| `primary` | bg `accent`, teks `on-accent` 700, pill, padding 16×28 (hero) / 12×22 (header) |
| `outline` | border 1px `text`, teks `text` 600, pill |
| `light` | bg `text`, teks `bg` 700 (Petunjuk arah, Lihat lowongan) |
| `link` | teks `accent` 600, diakhiri "→" |
| `icon` | 44×44, border `border-input`, radius 12, wajib `aria-label` |

### Pill / tab kategori
Aktif: bg `text`, teks `bg` 600. Tidak aktif: transparan, border `border-input`. Tinggi 44.

### StatusBadge ("Buka hari ini")
Pill border `border-input`, titik 8 px `status-open`, teks 13 `text-soft`. Status dihitung dari jam operasional; saat tutup, titik abu dan teks "Tutup · buka [jam]".

### Badge menu
`BEST SELLER` / `BARU` / `HABIS`: bg `badge-bg`, teks `accent` 12/700, pill. `HABIS` memakai teks `text-muted` dan foto diberi opacity 0.5.

### MenuCard
Foto 1:1 radius 18 → badge (opsional) → nama 18/600 → harga `text-soft`. Di HP: lebar 160, scroll horizontal.

### PromoCard
- `featured`: bg `accent`, eyebrow, angka `display-promo`, keterangan 20/600, S&K 14 di bawah.
- `default`: bg `surface`, border `line-strong`, eyebrow aksen, judul `display-m`, link di bawah.
Tinggi minimum 260 (desktop). Promo yang lewat tanggal berakhir tidak dirender.

### EventRow
Tanggal (Anton 28, `accent`, lebar 72) · nama 18/600 + waktu 14 `text-muted` · link Reservasi. Dipisah border-top `line-strong`.

### ReservationForm
Kartu `surface` radius 24, padding 32, grid 2 kolom. Field: Nama, No. WhatsApp, Tanggal, Jam, Jumlah orang, Area (Indoor/Outdoor), Catatan. Input: bg `bg`, border `border-input`, radius 10, tinggi min 48, font 15. Tombol submit `primary` lebar penuh: **Kirim via WhatsApp**.

Perilaku submit: validasi → susun pesan → buka `https://wa.me/<NOMOR>?text=<encoded>`:

```
Halo Kopi Insight, saya mau reservasi:
Nama: {nama}
Tanggal: {tanggal}, jam {jam}
Jumlah: {jumlah} orang ({area})
Catatan: {catatan}
```

### BranchCard
Border `line-strong` radius 18, nama 18/700 + kota `text-muted`. Cabang yang sedang dilihat: border 2px `accent` + label "KAMU DI SINI".

### StepList
Lingkaran 40 px border `accent`, angka 700 `accent`, teks di kanan.

### ImagePlaceholder
Dipakai selama foto belum ada / sedang dimuat: bg `placeholder`, garis diagonal tipis, border dashed `border-input`, label tengah `#9C948A`.

### Header, Footer, MobileBottomBar
- Header: logo teks "#KOPI INSIGHT" (Anton 28) + "by Delapan Belas Coffee" 12; nav Menu, Promo, Event, Lokasi, Cabang; tombol primary Reservasi Meja.
- Footer: logo, © tahun, link Instagram, Threads, GrabFood.
- MobileBottomBar: tombol primary Reservasi Meja (flex-grow) + tombol ikon WhatsApp 50 px.

Ikon: stroke 1.8–2 px, `currentColor` (disarankan `lucide-react`). Tanpa emoji.

---

## 5. Struktur halaman Beranda (urutan section)

| # | Section | id | Latar | Isi |
| --- | --- | --- | --- | --- |
| 1 | Header | — | `bg` | Logo, nav, CTA |
| 2 | Hero | `top` | `bg` | StatusBadge, H1, lead, 3 CTA (Reservasi, Lihat Menu, GrabFood), foto 4:5 |
| 3 | Info strip | — | `bg` + garis | Jam buka · Lokasi · Delivery |
| 4 | Promo | `promo` | `bg` | PromoCard featured + default |
| 5 | Menu favorit | `menu` | `bg` | Tab kategori, 4 MenuCard, tombol menu lengkap |
| 6 | Event | `event` | `bg-alt` | Foto 16:11, judul, 3 EventRow |
| 7 | Reservasi | `reservasi` | `bg` | Judul, StepList, ReservationForm |
| 8 | Lokasi | `lokasi` | `bg` | Peta (2/3) + panel alamat, jam, parkir, 2 tombol |
| 9 | Cabang | `cabang` | `bg-alt` | 4 BranchCard |
| 10 | Karier | — | `bg` | Banner lowongan + tombol |
| 11 | Footer | — | `bg` | |

Copy kunci:
- H1: "Ngopi, nongkrong, **dengar DJ** di Soreang." (kata "dengar DJ" berwarna `accent`)
- Promo: "Diskon 25% — Semua menu, pukul 10.00–14.00"
- Paket: "Bukber & rombongan — Mulai Rp45–55 ribu per orang"
- Reservasi: "Amankan mejamu sebelum penuh"
- Alamat: Dekat Jl. Raya Soreang – Banjaran 10-319, Soreang, Kec. Soreang, Kabupaten Bandung, Jawa Barat 40911

---

## 6. Implementasi React

### Stack yang disarankan
- **Vite + React 18 + TypeScript**
- **Tailwind CSS** dengan token di bawah
- **React Router** (halaman Menu, Promo/Event, Karier terpisah dari Beranda)
- `lucide-react` untuk ikon, `react-hook-form` + `zod` untuk form
- Konten dari headless CMS (Sanity / Strapi) atau JSON sementara di `src/data/`

### `tailwind.config.ts`

```ts
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#0F0E0D", alt: "#161412" },
        surface: "#1A1816",
        placeholder: "#1D1A17",
        line: { DEFAULT: "#2A2622", strong: "#2E2A26", input: "#3A352F" },
        ink: { DEFAULT: "#F5F1EB", soft: "#C9C1B6", muted: "#B5ADA3" },
        accent: { DEFAULT: "#F2A33A", hover: "#FFC170", on: "#1A1208", badge: "#2A2219" },
        open: "#5BC27A",
      },
      fontFamily: {
        display: ["Anton", "Arial Narrow", "sans-serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["84px", { lineHeight: "0.98" }],
        "display-l": ["52px", { lineHeight: "1.02" }],
        "display-promo": ["72px", { lineHeight: "1" }],
      },
      borderRadius: { xl: "24px", lg: "18px", md: "10px" },
      maxWidth: { container: "1200px" },
    },
  },
};
```

### Struktur folder

```
src/
  components/
    ui/          Button.tsx, Pill.tsx, Badge.tsx, StatusBadge.tsx, ImagePlaceholder.tsx
    layout/      Header.tsx, Footer.tsx, MobileBottomBar.tsx, Container.tsx, Section.tsx
    menu/        MenuCard.tsx, CategoryTabs.tsx
    promo/       PromoCard.tsx
    event/       EventRow.tsx
    reservation/ ReservationForm.tsx, StepList.tsx
    branch/      BranchCard.tsx
  sections/      Hero.tsx, InfoStrip.tsx, Promo.tsx, MenuPreview.tsx, Events.tsx,
                 Reservation.tsx, Location.tsx, Branches.tsx, Careers.tsx
  pages/         Home.tsx, Menu.tsx, Events.tsx, Careers.tsx
  data/          menu.json, promos.json, events.json, branches.json, settings.json
  lib/           whatsapp.ts (buildReservationMessage), openingHours.ts (isOpenNow)
```

### Kontrak data (ringkas)

```ts
type MenuItem = { id: string; name: string; category: "kopi" | "non-kopi" | "makanan" | "snack";
  price: number; image: string; tags?: ("best-seller" | "baru")[]; soldOut?: boolean };
type Promo = { id: string; title: string; subtitle: string; startsAt: string; endsAt: string;
  featured?: boolean; terms?: string };
type Event = { id: string; name: string; date: string; time: string; image?: string };
type Branch = { id: string; name: string; city: string; mapsUrl: string; instagram?: string; current?: boolean };
```

---

## 7. Aksesibilitas dan performa

- Kontras teks ≥ 4.5:1 (sudah terpenuhi oleh token di atas pada latar `bg` / `surface`).
- Semua aksi memakai `<a>` atau `<button>` asli; tombol ikon wajib `aria-label`.
- Setiap input punya `<label>`; pesan error di bawah field, warna jangan jadi satu-satunya penanda.
- Fokus terlihat: `outline: 2px solid #F2A33A; outline-offset: 2px`.
- Gambar WebP, `loading="lazy"` kecuali foto hero, sertakan `width`/`height` untuk mencegah layout shift.
- Font dengan `display=swap`; target PageSpeed mobile ≥ 85.

---

## 8. Placeholder yang harus diisi klien

`[JAM BUKA]`, `[INFO PARKIR]`, nama & harga menu, foto (hero, menu, DJ, suasana), tanggal dan jam event, syarat promo, posisi lowongan, nomor WhatsApp admin, link toko GrabFood, link Maps tiap cabang, logo resolusi tinggi (SVG/PNG transparan).
