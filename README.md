# KŌPĪ — Landing Page

Tech-based coffee brand landing page. Built with **HTML + Tailwind CSS + Vanilla JS**. No framework, no build step, deploy-ready.

---

## Struktur File

```
kopi-landing/
├── index.html      → Markup utama (semua 8 sections)
├── style.css       → Custom CSS (animations, components, variables)
├── main.js         → Interaksi: navbar scroll, reveal, timer, burger menu
├── vercel.json     → Konfigurasi deployment Vercel
└── README.md       → Dokumentasi ini
```

---

## Sections

| # | Section          | ID              |
|---|-----------------|-----------------|
| 1 | Hero            | `#hero`         |
| 2 | Value Props     | `#value`        |
| 3 | Menu Showcase   | `#menu`         |
| 4 | How It Works    | `#cara-order`   |
| 5 | Testimonials    | `#ulasan`       |
| 6 | App Download    | `#download`     |
| 7 | Coverage / Map  | `#lokasi`       |
| 8 | Final CTA       | `#final-cta`    |

---

## Deploy ke Vercel

### Opsi A — Via GitHub (Recommended)

1. Buat repo baru di GitHub
2. Push semua file ke repo:
   ```bash
   git init
   git add .
   git commit -m "feat: initial landing page"
   git remote add origin https://github.com/USERNAME/kopi-landing.git
   git push -u origin main
   ```
3. Buka [vercel.com](https://vercel.com), klik **"Import Project"**
4. Pilih repo → Framework Preset: **Other** → Deploy ✓

### Opsi B — Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## Kustomisasi

### Ganti Nama Brand
Search `KŌPĪ` di `index.html` → replace dengan nama brand kamu.

### Ganti Warna
Edit CSS variables di `:root` dalam `style.css`:
```css
:root {
  --gold:    #C8A96E;   /* accent utama */
  --sage:    #5A6B52;   /* accent hijau */
  --ink:     #0D0D0D;   /* background gelap */
  --linen:   #F0EDE8;   /* teks terang */
}
```

### Ganti Menu / Produk
Edit section `#menu` di `index.html` — tiap product card ada di dalam `.menu-card`.

### Ganti Link Store
Cari `href="#"` pada tombol App Store / Play Store → ganti dengan URL aplikasimu.

---

## Tech Stack

- **HTML5** semantic markup
- **Tailwind CSS** via CDN (v3)
- **Google Fonts** — Cormorant Garamond + Syne
- **Vanilla JS** (ES6+) — no dependencies
- **IntersectionObserver** untuk scroll reveals
- **CSS animations** untuk float, ticker, pulse

---

## Browser Support

Chrome 80+ · Firefox 78+ · Safari 14+ · Edge 80+

---

## License

MIT — bebas dipakai untuk project komersial.
