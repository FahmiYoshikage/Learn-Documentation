# Kustomisasi Homepage VitePress

## Opsi Layout

### 1. Layout Home (Landing Page Style)

```markdown
---
layout: home

hero:
  name: "Nama Project"           # Judul utama (besar)
  text: "Subtitle"               # Subtitle
  tagline: "Deskripsi singkat"   # Tagline
  image:
    src: /logo.png               # Path ke gambar
    alt: Logo                    # Alt text
  actions:
    - theme: brand               # Tombol brand color
      text: Get Started
      link: /guide/
    - theme: alt                 # Tombol secondary
      text: View GitHub
      link: https://github.com/...

features:
  - icon: 🚀                     # Bisa emoji atau icon
    title: Fast
    details: Lightning fast development with Vite
  - icon: ⚡️
    title: Simple
    details: Easy to use and configure
  - icon: 🎨
    title: Customizable
    details: Fully customizable theme
---

<!-- Bisa tambah konten markdown di bawah -->
## Additional Content

Konten tambahan di bawah features...
```

### 2. Layout Doc (Documentation Style)

```markdown
---
layout: doc
title: Welcome
---

# Welcome to My Wiki

Konten markdown biasa dengan sidebar...
```

### 3. Layout Page (Clean Page)

```markdown
---
layout: page
---

# Simple Page

Halaman bersih tanpa sidebar, hanya konten.
```

### 4. No Layout (Minimal)

```markdown
# My Homepage

Konten markdown murni, minimal styling.
```

## Kustomisasi Hero Section

### Basic Hero

```markdown
hero:
  name: "My Wiki"
  text: "Personal Documentation"
  tagline: "Learning notes and technical references"
```

### Hero dengan Gambar

```markdown
hero:
  name: "FailDeGaskar's Wiki"
  text: "Catatan Teknis"
  tagline: "Dokumentasi pembelajaran programming"
  image:
    src: /logo.png              # atau /images/hero.png
    alt: Wiki Logo
```

### Hero dengan Background Gradient

```markdown
hero:
  name: "My Docs"
  text: "Technical Notes"
  tagline: "Learn. Build. Share."
  # Gradient otomatis dari brand color
```

### Multiple Action Buttons

```markdown
hero:
  actions:
    - theme: brand
      text: 🚀 Get Started
      link: /guide/introduction
    - theme: alt
      text: 📚 Learn More
      link: /guide/
    - theme: alt
      text: 📖 API Reference
      link: /api/
    - theme: alt
      text: View on GitHub →
      link: https://github.com/user/repo
```

## Kustomisasi Features

### Features dengan Emoji

```markdown
features:
  - icon: 🚀
    title: Fast & Performant
    details: Built on Vite for instant HMR and optimized builds
  - icon: 📝
    title: Markdown-Powered
    details: Write content in Markdown with extended syntax
  - icon: 🎨
    title: Beautiful Theme
    details: Clean, responsive design with dark mode
```

### Features dengan SVG Icon

```markdown
features:
  - icon:
      src: /icons/rocket.svg
    title: Lightning Fast
    details: Powered by Vite and Vue 3
```

### Features dengan Custom HTML

```markdown
features:
  - icon: |
      <svg>...</svg>
    title: Custom Icon
    details: Use custom SVG icons
```

### Link di Features

```markdown
features:
  - icon: 📚
    title: JavaScript Guide
    details: Comprehensive JavaScript tutorials and examples
    link: /javascript/
    linkText: Learn More →
  - icon: 🐍
    title: Python Notes
    details: Python programming fundamentals and advanced topics
    link: /python/
```

## Advanced: Custom Content

### Tambah Konten Setelah Features

```markdown
---
layout: home
hero:
  name: "My Wiki"
features:
  - icon: 🚀
    title: Feature 1
---

<!-- Semua yang di bawah frontmatter akan muncul di bawah features -->

## Welcome

Selamat datang di wiki pribadi saya! Ini adalah catatan pembelajaran programming.

## Quick Links

- [JavaScript Basics](/javascript/basics)
- [Python Guide](/python/)
- [Docker Commands](/docker/basics)

## Latest Updates

- **Dec 2025**: Added Docker documentation
- **Nov 2025**: Updated JavaScript guide
```

### Custom Sections dengan HTML

```markdown
---
layout: home
---

<div class="custom-section">
  <h2>Custom Section</h2>
  <p>You can add HTML here!</p>
</div>

## Markdown Section

Mix HTML and Markdown freely!
```

## Extreme Customization: Custom Theme

### Option 1: Custom CSS

Buat `.vitepress/theme/custom.css`:

```css
/* Custom homepage styles */
.VPHome {
  /* Customize layout */
}

.VPHero {
  /* Customize hero section */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.VPHero .name {
  /* Customize title */
  font-size: 5rem !important;
  background: linear-gradient(120deg, #bd34fe, #41d1ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.VPFeatures {
  /* Customize features grid */
  padding: 4rem 0;
}

.VPFeature {
  /* Customize individual feature */
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s;
}

.VPFeature:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}
```

Import di `.vitepress/theme/index.ts`:

```typescript
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default DefaultTheme
```

### Option 2: Custom Vue Component

Buat `.vitepress/theme/index.ts`:

```typescript
import DefaultTheme from 'vitepress/theme'
import CustomHome from './CustomHome.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CustomHome', CustomHome)
  }
}
```

Buat `.vitepress/theme/CustomHome.vue`:

```vue
<template>
  <div class="custom-home">
    <div class="hero">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <div class="actions">
        <a href="/guide/" class="action-button">Get Started</a>
      </div>
    </div>
    
    <div class="features">
      <!-- Custom features layout -->
    </div>
  </div>
</template>

<script setup>
const title = "My Custom Homepage"
const description = "Fully custom Vue component"
</script>

<style scoped>
/* Custom styles */
</style>
```

Gunakan di `index.md`:

```markdown
---
layout: false
---

<CustomHome />
```

## Real-World Examples

### Example 1: Minimalist

```markdown
---
layout: home

hero:
  name: "📚 My Wiki"
  tagline: "Personal knowledge base"
  actions:
    - theme: brand
      text: Start Reading
      link: /javascript/

features:
  - icon: 💻
    title: Programming
    details: JavaScript, Python, and more
    link: /javascript/
  - icon: 🐳
    title: DevOps
    details: Docker, CI/CD, deployment
    link: /docker/
  - icon: 📖
    title: Learning Notes
    details: Tutorials and references
---
```

### Example 2: Portfolio Style

```markdown
---
layout: home

hero:
  name: "Hi, I'm Fahmi 👋"
  text: "Full-Stack Developer"
  tagline: "Building web applications and documenting my journey"
  actions:
    - theme: brand
      text: View Projects
      link: /projects/
    - theme: alt
      text: Read Blog
      link: /blog/
    - theme: alt
      text: GitHub
      link: https://github.com/...

features:
  - icon: ⚛️
    title: Frontend
    details: React, Vue, Next.js
  - icon: 🔧
    title: Backend
    details: Node.js, Python, PostgreSQL
  - icon: ☁️
    title: Cloud
    details: Docker, AWS, Digital Ocean
  - icon: 📝
    title: Writing
    details: Technical documentation & tutorials
---

## About Me

Software developer passionate about building great products...

## Recent Posts

- [Building a REST API](/blog/rest-api)
- [Docker for Beginners](/docker/basics)
```

### Example 3: Documentation Hub

```markdown
---
layout: home

hero:
  name: "Developer Hub"
  text: "Complete Technical Reference"
  tagline: "Everything I know about software development"
  image:
    src: /logo.png
    alt: Hub Logo
  actions:
    - theme: brand
      text: Quick Start
      link: /guide/getting-started
    - theme: alt
      text: API Docs
      link: /api/

features:
  - icon: 📘
    title: Comprehensive Guides
    details: Step-by-step tutorials for all skill levels
    link: /guide/
  - icon: 🔍
    title: API Reference
    details: Detailed API documentation with examples
    link: /api/
  - icon: 💡
    title: Best Practices
    details: Industry standards and recommended patterns
    link: /best-practices/
  - icon: 🎯
    title: Real Examples
    details: Production-ready code samples
    link: /examples/
  - icon: 🚀
    title: Quick Deploy
    details: Deploy your app in minutes
    link: /deploy/
  - icon: 💬
    title: Community
    details: Join our Discord community
    link: https://discord.gg/...
---
```

## Tips & Tricks

### 1. Dynamic Content

Bisa pakai Vue template syntax:

```markdown
---
layout: home
---

<script setup>
const year = new Date().getFullYear()
</script>

Copyright © {{ year }}
```

### 2. Conditional Display

```markdown
<div v-if="isDev">
  This only shows in development
</div>
```

### 3. Import Components

```markdown
<script setup>
import MyComponent from './components/MyComponent.vue'
</script>

<MyComponent />
```

### 4. SEO Optimization

```markdown
---
layout: home
title: My Wiki - Programming Documentation
description: Comprehensive programming guides for JavaScript, Python, Docker and more
head:
  - - meta
    - name: keywords
      content: javascript, python, docker, programming, tutorial
  - - meta
    - property: og:title
      content: My Wiki
  - - meta
    - property: og:description
      content: Programming documentation and guides
---
```

## Kesimpulan

Homepage VitePress bisa dimodifikasi dari:
- ✅ **Simple**: Edit frontmatter (hero, features)
- ✅ **Medium**: Tambah markdown/HTML content
- ✅ **Advanced**: Custom CSS styling
- ✅ **Expert**: Custom Vue component (unlimited!)

Mau saya buatkan contoh homepage custom untuk Anda?
