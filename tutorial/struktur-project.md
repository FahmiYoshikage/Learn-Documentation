# Struktur Project VitePress

## Struktur Folder yang Sudah Dibuat

```
my-docs/
├── .vitepress/
│   ├── config.mts              # ⚙️ Konfigurasi utama
│   └── dist/                   # 📦 Hasil build (generated)
│
├── javascript/                 # 📁 Section JavaScript
│   ├── index.md               # 📄 /javascript/ (overview)
│   ├── basics.md              # 📄 /javascript/basics
│   └── array-methods.md       # 📄 /javascript/array-methods
│
├── python/                    # 📁 Section Python
│   ├── index.md              # 📄 /python/ (overview)
│   └── basics.md             # 📄 /python/basics
│
├── docker/                   # 📁 Section Docker
│   ├── index.md             # 📄 /docker/ (overview)
│   └── basics.md            # 📄 /docker/basics
│
├── index.md                 # 🏠 Homepage (/)
├── vitepress-syntax.md      # 📖 Panduan syntax
├── panduan-vitepress.md     # 📖 Panduan umum
└── package.json             # 📦 Dependencies
```

## Cara Kerja Routing

| File Path              | URL Route            | Keterangan             |
| ---------------------- | -------------------- | ---------------------- |
| `index.md`             | `/`                  | Homepage               |
| `javascript/index.md`  | `/javascript/`       | JavaScript overview    |
| `javascript/basics.md` | `/javascript/basics` | JavaScript basics page |
| `python/basics.md`     | `/python/basics`     | Python basics page     |
| `vitepress-syntax.md`  | `/vitepress-syntax`  | Panduan syntax         |

## Cara Menambah Halaman Baru

### 1. Tambah File Markdown

Contoh: Buat halaman tentang async/await di JavaScript

```bash
# Buat file baru
touch javascript/async-await.md
```

Isi file:

```markdown
# Async/Await

Penjelasan tentang async/await...
```

Otomatis bisa diakses di: `/javascript/async-await`

### 2. Update Sidebar

Edit `.vitepress/config.mts`:

```typescript
'/javascript/': [
  {
    text: 'JavaScript',
    items: [
      { text: 'Overview', link: '/javascript/' },
      { text: 'Dasar JavaScript', link: '/javascript/basics' },
      { text: 'Array Methods', link: '/javascript/array-methods' },
      { text: 'Async/Await', link: '/javascript/async-await' } // ✨ Tambah ini
    ]
  }
]
```

### 3. Selesai!

Halaman baru langsung muncul di sidebar dan bisa diakses.

## Menambah Section Baru

Contoh: Buat section untuk Git

### Step 1: Buat Folder & Files

```bash
mkdir git
touch git/index.md
touch git/basics.md
touch git/branching.md
```

### Step 2: Isi index.md

```markdown
# Git

Dokumentasi tentang Git version control.

## Topik

-   [Dasar Git](./basics)
-   [Branching](./branching)
```

### Step 3: Update Navigation Bar

Tambah di `config.mts`:

```typescript
nav: [
    { text: 'Home', link: '/' },
    { text: 'JavaScript', link: '/javascript/' },
    { text: 'Python', link: '/python/' },
    { text: 'Docker', link: '/docker/' },
    { text: 'Git', link: '/git/' }, // ✨ Tambah ini
    { text: 'Panduan', link: '/panduan-vitepress' },
];
```

### Step 4: Update Sidebar

```typescript
sidebar: {
  '/javascript/': [...],
  '/python/': [...],
  '/docker/': [...],

  // ✨ Tambah section baru
  '/git/': [
    {
      text: 'Git',
      items: [
        { text: 'Overview', link: '/git/' },
        { text: 'Dasar Git', link: '/git/basics' },
        { text: 'Branching', link: '/git/branching' }
      ]
    }
  ]
}
```

## Multiple Sidebar Groups

Bisa buat nested/grouped sidebar:

```typescript
'/javascript/': [
  {
    text: 'Dasar',
    collapsed: false,
    items: [
      { text: 'Variables', link: '/javascript/variables' },
      { text: 'Functions', link: '/javascript/functions' }
    ]
  },
  {
    text: 'Advanced',
    collapsed: true,  // Default tertutup
    items: [
      { text: 'Closures', link: '/javascript/closures' },
      { text: 'Promises', link: '/javascript/promises' }
    ]
  },
  {
    text: 'Array',
    items: [
      { text: 'Methods', link: '/javascript/array-methods' },
      { text: 'Iteration', link: '/javascript/array-iteration' }
    ]
  }
]
```

## Nested Folder Structure

Untuk organisasi lebih kompleks:

```
javascript/
├── index.md
├── basics/
│   ├── index.md
│   ├── variables.md
│   └── functions.md
├── advanced/
│   ├── index.md
│   ├── closures.md
│   └── async.md
└── arrays/
    ├── index.md
    └── methods.md
```

Route yang terbentuk:

-   `/javascript/basics/` → `javascript/basics/index.md`
-   `/javascript/basics/variables` → `javascript/basics/variables.md`
-   `/javascript/advanced/closures` → `javascript/advanced/closures.md`

Config sidebar:

```typescript
'/javascript/': [
  {
    text: 'Basics',
    items: [
      { text: 'Overview', link: '/javascript/basics/' },
      { text: 'Variables', link: '/javascript/basics/variables' },
      { text: 'Functions', link: '/javascript/basics/functions' }
    ]
  },
  {
    text: 'Advanced',
    items: [
      { text: 'Overview', link: '/javascript/advanced/' },
      { text: 'Closures', link: '/javascript/advanced/closures' },
      { text: 'Async', link: '/javascript/advanced/async' }
    ]
  }
]
```

## Template untuk Halaman Baru

### Halaman Teknis (dengan code)

```markdown
---
title: Judul Halaman
description: Deskripsi singkat
outline: deep
---

# Judul Halaman

Penjelasan singkat tentang topik.

## Subtopik 1

Penjelasan...

\`\`\`javascript
// Code example
const example = 'code';
\`\`\`

::: tip
Tips atau best practice
:::

## Subtopik 2

Lebih banyak konten...

## Resources

-   [Link 1](url)
-   [Link 2](url)
```

### Halaman Overview/Index

```markdown
# Nama Section

Penjelasan singkat tentang section ini.

## Topik yang Dibahas

-   [Topik 1](./topic-1)
-   [Topik 2](./topic-2)
-   [Topik 3](./topic-3)

## Kenapa Penting?

Penjelasan kenapa section ini berguna...
```

## Workflow Menambah Konten

1. **Buat file `.md`** di folder yang sesuai
2. **Tulis konten** dengan markdown
3. **Update `config.mts`** kalau perlu (navbar/sidebar)
4. **Save** - hot reload otomatis refresh browser
5. **Commit & push** ke Git

::: tip Quick Add
Tidak perlu restart dev server saat tambah file baru!
:::

## Rekomendasi Organisasi

### By Technology/Language

```
docs/
├── javascript/
├── python/
├── docker/
└── git/
```

✅ Bagus untuk wiki/reference

### By Learning Path

```
docs/
├── beginner/
├── intermediate/
├── advanced/
└── projects/
```

✅ Bagus untuk tutorial

### By Topic

```
docs/
├── web-development/
├── databases/
├── devops/
└── algorithms/
```

✅ Bagus untuk comprehensive docs

## Next Steps

1. ✅ Jalankan `npm run docs:dev`
2. ✅ Buka `http://localhost:5173`
3. ✅ Explore struktur yang sudah dibuat
4. ✅ Coba tambah halaman baru
5. ✅ Customize sesuai kebutuhan

Struktur sudah siap pakai! Tinggal isi dengan konten pembelajaran Anda. 🚀
