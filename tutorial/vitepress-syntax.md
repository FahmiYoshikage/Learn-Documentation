# Syntax & Fitur VitePress

Guide lengkap tentang fitur-fitur VitePress yang bisa Anda gunakan.

## Table of Contents

[[toc]]

## Struktur Multi-Halaman

### Organisasi Folder

```
my-docs/
├── .vitepress/
│   └── config.mts          # Konfigurasi
├── javascript/             # Section JavaScript
│   ├── index.md           # /javascript/
│   ├── basics.md          # /javascript/basics
│   └── array-methods.md   # /javascript/array-methods
├── python/                # Section Python
│   ├── index.md           # /python/
│   └── basics.md          # /python/basics
├── docker/                # Section Docker
│   ├── index.md
│   └── basics.md
└── index.md               # Homepage /
```

### Routing

File `.md` otomatis jadi route:

-   `index.md` → `/`
-   `javascript/index.md` → `/javascript/`
-   `javascript/basics.md` → `/javascript/basics`

## Frontmatter

Metadata di awal file `.md`:

```markdown
---
title: Judul Halaman
description: Deskripsi untuk SEO
layout: doc
outline: deep
---
```

### Layout Options

```markdown
---
layout: doc       # Default, dengan sidebar
layout: home      # Homepage layout
layout: page      # Simple page tanpa sidebar
---
```

### Outline (Table of Contents)

```markdown
---
outline: deep     # Semua heading levels
outline: [2, 3]   # Hanya h2 dan h3
outline: false    # Disable TOC
---
```

## Markdown Extensions

### Custom Containers

```markdown
::: info
Ini adalah info box
:::

::: tip
Ini adalah tips box - untuk best practices
:::

::: warning
Ini adalah warning box - hati-hati!
:::

::: danger
Ini adalah danger box - jangan lakukan ini!
:::

::: details Klik untuk expand
Konten yang bisa di-collapse
:::
```

::: info Hasilnya
Ini adalah info box
:::

::: tip
Ini adalah tips box - untuk best practices
:::

::: warning
Ini adalah warning box - hati-hati!
:::

::: danger
Ini adalah danger box - jangan lakukan ini!
:::

### Code Blocks

#### Basic Code Block

```javascript
function hello() {
    console.log('Hello World!');
}
```

#### Dengan Line Numbers

```javascript:line-numbers
function hello() {
  console.log('Hello World!');
}
```

#### Line Highlighting

```javascript{2,4-6}
function calculate() {
  const a = 10;          // Highlighted
  const b = 20;
  const sum = a + b;     // Highlighted
  const product = a * b; // Highlighted
  const division = a / b;// Highlighted
  return sum;
}
```

#### Focus Mode

```javascript
function hello() {
    console.log('Normal');
    console.log('Normal');
    console.log('Normal'); // [!code focus]
    console.log('Normal');
}
```

#### Diff Mode

```javascript
function hello() {
    console.log('Old line'); // [!code --]
    console.log('New line'); // [!code ++]
}
```

#### Error/Warning Highlighting

```javascript
function hello() {
    console.log('Error line'); // [!code error]
    console.log('Warning line'); // [!code warning]
}
```

#### Code Groups (Tabs)

::: code-group

```javascript [JavaScript]
function hello() {
    console.log('Hello from JS!');
}
```

```python [Python]
def hello():
    print('Hello from Python!')
```

```go [Go]
func hello() {
    fmt.Println("Hello from Go!")
}
```

:::

Syntax-nya:

````markdown
::: code-group

```javascript [JavaScript]
// code here
```

```python [Python]
# code here
```

:::
````

### Links

#### Internal Links

```markdown
[Link ke halaman lain](./basics)
[Link ke section](./basics#variables)
[Link absolute](/javascript/basics)
```

#### External Links

```markdown
[MDN Docs](https://developer.mozilla.org/)
```

External links otomatis dapat icon ↗

### Images

```markdown
![Alt text](./images/screenshot.png)
![Alt text](/public/logo.png)
```

### Tables

```markdown
| Syntax | Description |
| ------ | ----------- |
| Header | Title       |
| List   | More info   |
```

| Syntax | Description |
| ------ | ----------- |
| Header | Title       |
| List   | More info   |

### Emoji

```markdown
:tada: :rocket: :100:
```

:tada: :rocket: :100:

### Badges

```markdown
<Badge type="info" text="info badge" />
<Badge type="tip" text="tip badge" />
<Badge type="warning" text="warning badge" />
<Badge type="danger" text="danger badge" />
```

<Badge type="info" text="info badge" />
<Badge type="tip" text="tip badge" />
<Badge type="warning" text="warning badge" />
<Badge type="danger" text="danger badge" />

### Table of Contents

```markdown
[[toc]]
```

Otomatis generate TOC dari headings.

## Navigation & Sidebar

### Navigation Bar (Top)

Edit `.vitepress/config.mts`:

```typescript
nav: [
    { text: 'Home', link: '/' },
    { text: 'Guide', link: '/guide/' },

    // Dropdown menu
    {
        text: 'Dropdown',
        items: [
            { text: 'Item A', link: '/item-a' },
            { text: 'Item B', link: '/item-b' },
        ],
    },
];
```

### Sidebar

#### Single Sidebar (untuk semua halaman)

```typescript
sidebar: [
    {
        text: 'Guide',
        items: [
            { text: 'Introduction', link: '/intro' },
            { text: 'Getting Started', link: '/getting-started' },
        ],
    },
];
```

#### Multiple Sidebars (berbeda per section)

```typescript
sidebar: {
  // Sidebar untuk /javascript/*
  '/javascript/': [
    {
      text: 'JavaScript',
      items: [
        { text: 'Basics', link: '/javascript/basics' },
        { text: 'Advanced', link: '/javascript/advanced' }
      ]
    }
  ],

  // Sidebar untuk /python/*
  '/python/': [
    {
      text: 'Python',
      items: [
        { text: 'Basics', link: '/python/basics' }
      ]
    }
  ]
}
```

#### Collapsible Sidebar Groups

```typescript
sidebar: [
  {
    text: 'Section A',
    collapsed: false,  // Default expanded
    items: [...]
  },
  {
    text: 'Section B',
    collapsed: true,   // Default collapsed
    items: [...]
  }
]
```

## Search

### Local Search (Built-in)

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

### Algolia Search

```typescript
search: {
  provider: 'algolia',
  options: {
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_API_KEY',
    indexName: 'YOUR_INDEX_NAME'
  }
}
```

## Homepage Layout

```markdown
---
layout: home

hero:
    name: Project Name
    text: Tagline
    tagline: Description
    image:
        src: /logo.png
        alt: Logo
    actions:
        - theme: brand
          text: Get Started
          link: /guide/
        - theme: alt
          text: View on GitHub
          link: https://github.com/...

features:
    - icon: ⚡️
      title: Feature 1
      details: Description of feature 1
    - icon: 🎨
      title: Feature 2
      details: Description of feature 2
---
```

## Custom CSS

Buat file `.vitepress/theme/custom.css`:

```css
:root {
    /* Brand colors */
    --vp-c-brand: #646cff;
    --vp-c-brand-light: #747bff;
    --vp-c-brand-dark: #535bf2;

    /* Background colors */
    --vp-c-bg: #ffffff;
    --vp-c-bg-soft: #f6f6f7;
}

.dark {
    --vp-c-bg: #1b1b1f;
    --vp-c-bg-soft: #252529;
}
```

Lalu import di `.vitepress/theme/index.ts`:

```typescript
import DefaultTheme from 'vitepress/theme';
import './custom.css';

export default DefaultTheme;
```

## Konfigurasi Lengkap

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  // Site metadata
  title: "My Docs",
  description: "My documentation site",
  base: '/',  // Base URL, gunakan '/repo-name/' jika deploy di GitHub Pages

  // Language
  lang: 'id-ID',

  // Head tags
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  // Markdown config
  markdown: {
    lineNumbers: true,  // Show line numbers di semua code blocks
    theme: 'material-theme-palenight'  // Code syntax theme
  },

  themeConfig: {
    logo: '/logo.png',

    nav: [...],
    sidebar: {...},

    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/...' },
      { icon: 'twitter', link: 'https://twitter.com/...' },
      { icon: 'discord', link: 'https://discord.gg/...' }
    ],

    // Edit link
    editLink: {
      pattern: 'https://github.com/user/repo/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    // Footer
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present'
    },

    // Previous/Next links
    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },

    // Outline (TOC) settings
    outline: {
      level: [2, 3],  // h2 dan h3 saja
      label: 'On this page'
    },

    // Search
    search: {
      provider: 'local'
    }
  }
})
```

## Best Practices

### 1. Struktur Folder

```
docs/
├── guide/              # Tutorial step-by-step
├── api/               # API reference
├── examples/          # Code examples
└── blog/             # Blog posts (optional)
```

### 2. Naming Convention

-   Gunakan lowercase dan dash: `my-page.md`
-   Index file untuk overview: `index.md`
-   Descriptive names: `installation.md` bukan `install.md`

### 3. Internal Links

```markdown
<!-- Relative (recommended) -->

[Link](./basics)

<!-- Absolute -->

[Link](/javascript/basics)
```

### 4. Code Examples

-   Gunakan syntax highlighting
-   Highlight penting dengan `{line}`
-   Tambah comments untuk explain
-   Gunakan code groups untuk multi-language

### 5. SEO

```markdown
---
title: Clear, descriptive title
description: Brief description (150-160 chars)
head:
    - - meta
      - name: keywords
        content: keyword1, keyword2
---
```

## Tips & Trik

1. **Hot Reload**: Perubahan langsung terlihat di browser saat dev
2. **Markdown Preview**: Gunakan extension VSCode untuk preview
3. **Component**: Bisa import Vue component di markdown!
4. **Math**: Support KaTeX untuk equation
5. **Mermaid**: Support diagram dengan mermaid.js

## Resources

-   📖 [VitePress Docs](https://vitepress.dev/)
-   🎨 [Default Theme Config](https://vitepress.dev/reference/default-theme-config)
-   📝 [Markdown Extensions](https://vitepress.dev/guide/markdown)
-   🚀 [Deployment Guide](https://vitepress.dev/guide/deploy)
