# Panduan Menggunakan VitePress

## Apa itu VitePress?

VitePress adalah generator situs statis yang dibuat dengan Vite dan Vue.js. Sangat cocok untuk membuat dokumentasi teknis yang cepat dan modern.

## Struktur Project

```
my-docs/
├── .vitepress/
│   └── config.mts          # Konfigurasi utama
├── index.md                # Homepage
├── markdown-examples.md    # Contoh halaman
├── api-examples.md        # Contoh halaman lainnya
└── package.json
```

## Perintah Dasar

### 1. Menjalankan Development Server

```bash
npm run docs:dev
```

Server akan berjalan di `http://localhost:5173`

### 2. Build untuk Production

```bash
npm run docs:build
```

Hasil build akan ada di folder `.vitepress/dist`

### 3. Preview Build Production

```bash
npm run docs:preview
```

## Membuat Halaman Baru

### Cara 1: File Markdown Sederhana

Buat file baru dengan ekstensi `.md` di root folder:

```markdown
# Judul Halaman

Ini adalah konten halaman saya.

## Sub Judul

-   List item 1
-   List item 2
```

### Cara 2: Dengan Frontmatter

Frontmatter memberikan kontrol lebih pada halaman:

```markdown
---
title: Judul Halaman
description: Deskripsi halaman
layout: doc
---

# Konten Halaman
```

## Mengatur Navigasi

### Navigation Bar (Navbar)

Edit `.vitepress/config.mts`:

```typescript
nav: [
    { text: 'Home', link: '/' },
    { text: 'Tutorial', link: '/tutorial' },
    { text: 'Catatan', link: '/notes' },
];
```

### Sidebar

```typescript
sidebar: [
    {
        text: 'Mulai',
        items: [
            { text: 'Pengenalan', link: '/intro' },
            { text: 'Instalasi', link: '/install' },
        ],
    },
    {
        text: 'Tutorial',
        items: [
            { text: 'Tutorial 1', link: '/tutorial/01' },
            { text: 'Tutorial 2', link: '/tutorial/02' },
        ],
    },
];
```

## Fitur Markdown VitePress

### Code Blocks dengan Syntax Highlighting

\`\`\`javascript
function hello() {
console.log('Hello VitePress!')
}
\`\`\`

### Line Highlighting

\`\`\`js{2,4-5}
function hello() {
console.log('Baris ini di-highlight')
console.log('Baris biasa')
console.log('Baris ini juga di-highlight')
console.log('Dan baris ini')
}
\`\`\`

### Custom Containers

```markdown
::: info
Ini adalah info box
:::

::: tip
Ini adalah tips box
:::

::: warning
Ini adalah warning box
:::

::: danger
Ini adalah danger box
:::
```

### Table of Contents

VitePress otomatis membuat TOC dari heading. Anda bisa customize di frontmatter:

```markdown
---
outline: deep # Menampilkan semua level heading
---
```

## Deploy ke Digital Ocean

### Persiapan

1. Build project:

```bash
npm run docs:build
```

2. Hasil build ada di `.vitepress/dist/`

### Opsi 1: Digital Ocean App Platform

1. Push code ke GitHub
2. Di Digital Ocean, pilih "App Platform"
3. Connect repository GitHub Anda
4. Atur build command: `npm run docs:build`
5. Atur output directory: `.vitepress/dist`
6. Deploy!

App Platform Digital Ocean punya **free tier** untuk static sites.

### Opsi 2: Digital Ocean Spaces (Static Hosting)

1. Build project
2. Upload folder `.vitepress/dist` ke Spaces
3. Aktifkan CDN dan static website hosting

## Tips & Trik

### 1. Organisasi Konten

Buat folder untuk mengelompokkan konten:

```
my-docs/
├── tutorial/
│   ├── index.md
│   ├── 01-basic.md
│   └── 02-advanced.md
├── notes/
│   ├── javascript.md
│   └── python.md
└── index.md
```

### 2. Search Functionality

VitePress punya search bawaan. Untuk aktifkan:

```typescript
// .vitepress/config.mts
export default defineConfig({
    themeConfig: {
        search: {
            provider: 'local',
        },
    },
});
```

### 3. Dark Mode

Dark mode sudah built-in, tidak perlu konfigurasi tambahan!

### 4. Custom CSS

Buat file `.vitepress/theme/custom.css`:

```css
:root {
    --vp-c-brand: #646cff;
    --vp-c-brand-light: #747bff;
}
```

## Contoh Konfigurasi Lengkap

```typescript
import { defineConfig } from 'vitepress';

export default defineConfig({
    title: 'Dokumentasi Saya',
    description: 'Catatan pembelajaran programming',

    // Base URL jika deploy di subdomain/subfolder
    // base: '/my-docs/',

    themeConfig: {
        logo: '/logo.svg',

        nav: [
            { text: 'Home', link: '/' },
            { text: 'Tutorial', link: '/tutorial/' },
            { text: 'Blog', link: '/blog/' },
        ],

        sidebar: {
            '/tutorial/': [
                {
                    text: 'Dasar',
                    items: [
                        { text: 'Pengenalan', link: '/tutorial/intro' },
                        { text: 'Instalasi', link: '/tutorial/install' },
                    ],
                },
            ],
            '/blog/': [
                {
                    text: 'Posts',
                    items: [{ text: 'Post 1', link: '/blog/post-1' }],
                },
            ],
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/yourusername' },
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2025',
        },

        search: {
            provider: 'local',
        },
    },
});
```

## Resources

-   📖 [Dokumentasi Official VitePress](https://vitepress.dev/)
-   🎨 [Default Theme Config](https://vitepress.dev/reference/default-theme-config)
-   🚀 [Deployment Guide](https://vitepress.dev/guide/deploy)
-   💎 [Markdown Extensions](https://vitepress.dev/guide/markdown)

## Next Steps

1. ✅ Jalankan `npm run docs:dev` untuk mulai development
2. ✅ Edit `index.md` untuk customize homepage
3. ✅ Buat halaman-halaman baru di folder yang terorganisir
4. ✅ Update navigasi di `.vitepress/config.mts`
5. ✅ Push ke GitHub
6. ✅ Deploy ke Digital Ocean App Platform (gratis!)

Selamat membuat dokumentasi! 🎉
