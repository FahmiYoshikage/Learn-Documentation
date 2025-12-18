# Best Practice: Navbar vs Sidebar

## 📋 Perbedaan Navbar dan Sidebar

### Navigation Bar (Navbar)

**Fungsi**: Menu utama untuk **navigasi antar section/kategori**

**Karakteristik**:

-   ✅ Selalu terlihat di semua halaman (sticky top)
-   ✅ Untuk high-level navigation
-   ✅ Horizontal layout (desktop)
-   ✅ Jumlah item terbatas (max 5-7 untuk UX terbaik)

### Sidebar

**Fungsi**: Menu detail untuk **navigasi dalam satu section**

**Karakteristik**:

-   ✅ Berubah sesuai section yang aktif
-   ✅ Untuk detailed navigation
-   ✅ Vertical layout
-   ✅ Bisa punya banyak items dan nested groups

---

## ✅ Best Practice: Kapan Taruh di Navbar?

### YA, taruh di Navbar jika:

1. **Major Topic/Section**

    ```typescript
    nav: [
        { text: 'JavaScript', link: '/javascript/' }, // ✅ Topic utama
        { text: 'Python', link: '/python/' }, // ✅ Topic utama
        { text: 'Docker', link: '/docker/' }, // ✅ Topic utama
    ];
    ```

2. **Kategori yang Sering Diakses**

    - Programming languages (JS, Python, Go)
    - Major technologies (Docker, Kubernetes, AWS)
    - Documentation sections (Guide, API, Examples)

3. **Independent Sections**
    - Sections yang punya banyak sub-halaman
    - Sections yang punya context/sidebar sendiri

### ❌ JANGAN taruh di Navbar jika:

1. **Sub-topic** (taruh di sidebar!)

    ```typescript
    // ❌ SALAH - terlalu detail untuk navbar
    nav: [
      { text: 'JavaScript Variables', link: '/javascript/variables' },
      { text: 'JavaScript Functions', link: '/javascript/functions' }
    ]

    // ✅ BENAR - detail di sidebar
    sidebar: {
      '/javascript/': [
        { text: 'Variables', link: '/javascript/variables' },
        { text: 'Functions', link: '/javascript/functions' }
      ]
    }
    ```

2. **Terlalu Banyak Items**

    - Navbar jadi penuh dan overwhelming
    - User bingung mau kemana

3. **Related Sub-pages**
    - Tutorial steps (Part 1, Part 2, Part 3)
    - API endpoints dalam satu service

---

## 📐 Struktur Ideal

### Contoh 1: Programming Wiki

```typescript
// NAVBAR - Major topics
nav: [
  { text: 'Home', link: '/' },
  { text: 'JavaScript', link: '/javascript/' },
  { text: 'Python', link: '/python/' },
  { text: 'Docker', link: '/docker/' },
  { text: 'Databases', link: '/databases/' }
]

// SIDEBAR - Detail per topic
sidebar: {
  '/javascript/': [
    {
      text: 'Fundamentals',
      items: [
        { text: 'Variables', link: '/javascript/variables' },
        { text: 'Functions', link: '/javascript/functions' },
        { text: 'Objects', link: '/javascript/objects' }
      ]
    },
    {
      text: 'Advanced',
      items: [
        { text: 'Closures', link: '/javascript/closures' },
        { text: 'Promises', link: '/javascript/promises' },
        { text: 'Async/Await', link: '/javascript/async-await' }
      ]
    }
  ]
}
```

### Contoh 2: Product Documentation

```typescript
// NAVBAR - Main sections
nav: [
  { text: 'Guide', link: '/guide/' },
  { text: 'API Reference', link: '/api/' },
  { text: 'Examples', link: '/examples/' },
  { text: 'Blog', link: '/blog/' }
]

// SIDEBAR - Detail per section
sidebar: {
  '/guide/': [
    {
      text: 'Getting Started',
      items: [
        { text: 'Introduction', link: '/guide/intro' },
        { text: 'Installation', link: '/guide/install' },
        { text: 'Quick Start', link: '/guide/quick-start' }
      ]
    },
    {
      text: 'Core Concepts',
      items: [
        { text: 'Configuration', link: '/guide/config' },
        { text: 'Routing', link: '/guide/routing' },
        { text: 'State Management', link: '/guide/state' }
      ]
    }
  ],

  '/api/': [
    {
      text: 'Core API',
      items: [
        { text: 'createApp()', link: '/api/create-app' },
        { text: 'useRouter()', link: '/api/use-router' }
      ]
    }
  ]
}
```

---

## 🎯 Workflow: Menambah Materi Baru

### Scenario 1: Materi Baru = Topic Baru

**Contoh**: Mau tambah materi tentang **Go Programming**

```bash
# 1. Buat folder struktur
mkdir go
touch go/index.md
touch go/basics.md
touch go/concurrency.md
```

```typescript
// 2. Tambah di NAVBAR
nav: [
  { text: 'JavaScript', link: '/javascript/' },
  { text: 'Python', link: '/python/' },
  { text: 'Docker', link: '/docker/' },
  { text: 'Go', link: '/go/' }  // ✨ NEW
]

// 3. Buat SIDEBAR untuk topic baru
sidebar: {
  '/go/': [
    {
      text: 'Go Programming',
      items: [
        { text: 'Overview', link: '/go/' },
        { text: 'Basics', link: '/go/basics' },
        { text: 'Concurrency', link: '/go/concurrency' }
      ]
    }
  ]
}
```

### Scenario 2: Materi Baru = Sub-topic dalam Topic Existing

**Contoh**: Mau tambah halaman tentang **Promises** di JavaScript

```bash
# 1. Buat file saja (folder sudah ada)
touch javascript/promises.md
```

```typescript
// 2. TIDAK perlu ubah navbar!

// 3. Cukup tambah di SIDEBAR yang sudah ada
sidebar: {
  '/javascript/': [
    {
      text: 'JavaScript',
      items: [
        { text: 'Overview', link: '/javascript/' },
        { text: 'Basics', link: '/javascript/basics' },
        { text: 'Array Methods', link: '/javascript/array-methods' },
        { text: 'Promises', link: '/javascript/promises' }  // ✨ NEW
      ]
    }
  ]
}
```

### Scenario 3: Terlalu Banyak Sub-topics (Perlu Grouping)

**Contoh**: JavaScript sudah punya 20+ halaman

```typescript
sidebar: {
  '/javascript/': [
    {
      text: 'Fundamentals',
      collapsed: false,  // Default terbuka
      items: [
        { text: 'Overview', link: '/javascript/' },
        { text: 'Variables', link: '/javascript/variables' },
        { text: 'Functions', link: '/javascript/functions' },
        { text: 'Objects', link: '/javascript/objects' }
      ]
    },
    {
      text: 'Arrays',
      collapsed: false,
      items: [
        { text: 'Array Basics', link: '/javascript/arrays' },
        { text: 'Array Methods', link: '/javascript/array-methods' },
        { text: 'Array Iteration', link: '/javascript/array-iteration' }
      ]
    },
    {
      text: 'Async Programming',
      collapsed: true,  // Default tertutup (advanced topic)
      items: [
        { text: 'Callbacks', link: '/javascript/callbacks' },
        { text: 'Promises', link: '/javascript/promises' },
        { text: 'Async/Await', link: '/javascript/async-await' }
      ]
    },
    {
      text: 'Advanced Topics',
      collapsed: true,
      items: [
        { text: 'Closures', link: '/javascript/closures' },
        { text: 'Prototypes', link: '/javascript/prototypes' },
        { text: 'Event Loop', link: '/javascript/event-loop' }
      ]
    }
  ]
}
```

---

## 🎨 Tips untuk UX yang Baik

### 1. Navbar - Keep It Simple

```typescript
// ✅ GOOD - Clear, limited items
nav: [
  { text: 'Home', link: '/' },
  { text: 'JavaScript', link: '/javascript/' },
  { text: 'Python', link: '/python/' },
  { text: 'Docker', link: '/docker/' },
  { text: 'More', items: [...] }  // Dropdown untuk extras
]

// ❌ BAD - Terlalu banyak!
nav: [
  { text: 'JavaScript Basics' },
  { text: 'JavaScript Advanced' },
  { text: 'JavaScript Arrays' },
  { text: 'JavaScript Objects' },
  { text: 'JavaScript Promises' },
  { text: 'Python Basics' },
  { text: 'Python Advanced' }
  // ... user overwhelmed!
]
```

### 2. Gunakan Dropdown untuk Related Items

```typescript
nav: [
    { text: 'Home', link: '/' },

    // Programming languages grouped
    {
        text: 'Languages',
        items: [
            { text: 'JavaScript', link: '/javascript/' },
            { text: 'Python', link: '/python/' },
            { text: 'Go', link: '/go/' },
        ],
    },

    // DevOps topics grouped
    {
        text: 'DevOps',
        items: [
            { text: 'Docker', link: '/docker/' },
            { text: 'Kubernetes', link: '/k8s/' },
            { text: 'CI/CD', link: '/cicd/' },
        ],
    },

    { text: 'Blog', link: '/blog/' },
];
```

### 3. Sidebar - Organize by Learning Path

```typescript
sidebar: {
  '/javascript/': [
    // Beginner section - always open
    {
      text: '🌱 Beginner',
      collapsed: false,
      items: [...]
    },

    // Intermediate section - default open
    {
      text: '🌿 Intermediate',
      collapsed: false,
      items: [...]
    },

    // Advanced section - default closed
    {
      text: '🌳 Advanced',
      collapsed: true,
      items: [...]
    }
  ]
}
```

### 4. Use Icons untuk Visual Cues

```typescript
sidebar: {
  '/guide/': [
    {
      text: '🚀 Getting Started',
      items: [...]
    },
    {
      text: '📚 Core Concepts',
      items: [...]
    },
    {
      text: '⚙️ Configuration',
      items: [...]
    },
    {
      text: '🎨 Customization',
      items: [...]
    }
  ]
}
```

---

## 📊 Perbandingan

| Aspek          | Navbar                   | Sidebar                   |
| -------------- | ------------------------ | ------------------------- |
| **Visibility** | Selalu terlihat          | Hanya di section relevan  |
| **Scope**      | Global/Site-wide         | Local/Section-specific    |
| **Content**    | High-level categories    | Detailed pages            |
| **Max Items**  | 5-7 (UX best)            | Unlimited (bisa group)    |
| **Hierarchy**  | 1-2 levels max           | Multiple levels OK        |
| **Purpose**    | "Kemana saya mau pergi?" | "Apa isi di section ini?" |

---

## ✅ Checklist: Struktur yang Baik

Saat menambah materi baru, tanya diri sendiri:

-   [ ] **Apakah ini topic/kategori utama?**

    -   Ya → Tambah di navbar
    -   Tidak → Tambah di sidebar

-   [ ] **Apakah terkait dengan topic yang sudah ada?**

    -   Ya → Tambah sebagai sub-page di sidebar existing
    -   Tidak → Buat section navbar baru

-   [ ] **Apakah navbar sudah punya > 6 items?**

    -   Ya → Pertimbangkan grouping dengan dropdown
    -   Tidak → OK tambah langsung

-   [ ] **Apakah sidebar section sudah punya > 10 items?**
    -   Ya → Group dengan collapsed sections
    -   Tidak → OK tambah langsung

---

## 🎯 Kesimpulan

### Navbar untuk:

-   ✅ Major topics (JavaScript, Python, Docker)
-   ✅ Main sections (Guide, API, Examples)
-   ✅ Independent categories

### Sidebar untuk:

-   ✅ Sub-pages dalam satu topic
-   ✅ Tutorial steps
-   ✅ Detailed content navigation
-   ✅ Related pages

**Golden Rule**:

> Navbar = "Where to go?" (Kemana?)  
> Sidebar = "What's inside?" (Apa isinya?)

Dengan struktur ini, wiki Anda akan mudah dinavigasi dan scalable untuk konten yang terus bertambah! 🚀
