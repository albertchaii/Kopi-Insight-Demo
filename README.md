# Kopi Insight — Website Demo

Website multi-cabang untuk Kopi Insight by Delapan Belas Coffee. React + TypeScript + Vite + Tailwind.
Spesifikasi desain: [design.md](design.md).

## Menjalankan

```bash
cd web
npm install
npm run dev
```

## Mengubah konten

Semua konten ada di `web/src/data/`:

| File | Isi |
| --- | --- |
| `brand.json` | Nama brand, WhatsApp pusat, media sosial, judul hero, jam buka default |
| `branches.json` | Data tiap cabang (`id` = URL, mis. `/soreang`) |
| `menu.json`, `promos.json`, `events.json`, `careers.json` | Konten; isi `"branches": ["soreang"]` untuk membatasi ke cabang tertentu |

Nilai bertanda `[ISI]` dan nomor WhatsApp masih contoh. Foto di `web/public/images/` adalah foto stok dari Unsplash.

## Deploy (Vercel)

Import repo ini di Vercel dan set **Root Directory** ke `web`. Framework otomatis terdeteksi sebagai Vite.
