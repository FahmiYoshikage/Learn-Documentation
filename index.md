---
layout: home

hero:
    name: FailDeGaskar
    text: Personal Knowledge Base
    tagline: 'Catatan pembelajaran programming: dari konsep dasar hingga praktik production-ready'
    image:
        src: /hero-animation.svg
        alt: Coding Animation
    actions:
        - theme: brand
          text: 🐳 Explore Docker
          link: /docker/
        - theme: alt
          text: 📇 RE & Binex
          link: /RE-Binex/
        - theme: alt
          text: 📖 Baca Panduan
          link: /tutorial/panduan-vitepress

features:
    - icon: 📚
      title: Anything & Everything
      details: Random notes, tips, and tricks. Termasuk setup NPM, Cloudflare, dan dokumentasi lain-lain yang bermanfaat.
      link: /anything/wildcard-certificate
      linkText: Explore More →
    - icon: 📇
      title: RE & Binary Exploitation
      details: Journey to Binary Exploitation! C programming, memory layout, buffer overflow, ret2win, hingga shellcode injection.
      link: /RE-Binex/
      linkText: Hack The Stack →
    - icon: 🐳
      title: Docker & DevOps
      details: Containerization, CI/CD workflows, deployment strategies. Dari basic commands hingga orchestration dengan Docker Compose.
      link: /docker/
      linkText: Start Learning →
    - icon: 🏴‍☠️
      title: CTF Writeups
      details: Solutions dan write-ups untuk challenge CTF, teknik exploitation, dan analysis tools untuk cybersecurity competitions.
      link: /writeup/
      linkText: Read Writeups →
    - icon: 📖
      title: VitePress Docs
      details: Meta-documentation! Panduan lengkap membuat wiki seperti ini dengan VitePress, hosting gratis, dan best practices.
      link: /tutorial/panduan-vitepress
      linkText: Lihat Panduan →
---

<style>
.custom-welcome {
  text-align: center;
  padding: 2rem 1.5rem;
  max-width: 900px;
  margin: 0 auto 4rem;
}

.welcome-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-subtitle {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 3rem 0;
}

.stat-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem 1rem;
  text-align: center;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  border-color: var(--vp-c-brand-1);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.quick-link-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.2s;
}

.quick-link-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateX(4px);
}

.quick-link-card a {
  text-decoration: none;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quick-link-icon {
  font-size: 1.5rem;
}

.quick-link-text {
  flex: 1;
}

.quick-link-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.quick-link-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.cta-section {
  background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, var(--vp-c-bg-soft) 100%);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 2rem;
  margin: 3rem 0;
  text-align: center;
}

.cta-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.cta-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand-1);
  color: #ffffff !important;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
  border: none;
}

.cta-button:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  color: #ffffff !important;
}

.cta-button.secondary {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1) !important;
  border: 2px solid var(--vp-c-brand-1);
}

.cta-button.secondary:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1) !important;
}

@media (max-width: 640px) {
  .welcome-title {
    font-size: 1.5rem;
  }
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

<div class="custom-welcome">
  <div class="welcome-title">
    👋 Welcome to the Knowledge Hub
  </div>
  <div class="welcome-subtitle">
    Repository pembelajaran programming yang disusun dari pengalaman hands-on. Dari fundamental concepts hingga production-ready practices. Dibuat dengan ❤️ untuk developer yang ingin terus belajar dan berbagi.
  </div>

  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-number">5+</div>
      <div class="stat-label">Core Categories</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">15+</div>
      <div class="stat-label">Topics Covered</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">∞</div>
      <div class="stat-label">Learning Journey</div>
    </div>
  </div>
</div>

## 🚀 Quick Start

<div class="quick-links">
  <div class="quick-link-card">
    <a href="/RE-Binex/">
      <span class="quick-link-icon">📇</span>
      <div class="quick-link-text">
        <div class="quick-link-title">RE & Binex</div>
        <div class="quick-link-desc">Reverse Engineering basics</div>
      </div>
    </a>
  </div>
  <div class="quick-link-card">
    <a href="/docker/">
      <span class="quick-link-icon">🐳</span>
      <div class="quick-link-text">
        <div class="quick-link-title">Docker Basics</div>
        <div class="quick-link-desc">Essential container operations</div>
      </div>
    </a>
  </div>
  <div class="quick-link-card">
    <a href="/writeup/">
      <span class="quick-link-icon">🏴‍☠️</span>
      <div class="quick-link-text">
        <div class="quick-link-title">CTF Writeups</div>
        <div class="quick-link-desc">Security challenges solutions</div>
      </div>
    </a>
  </div>
  <div class="quick-link-card">
    <a href="/anything/wildcard-certificate">
      <span class="quick-link-icon">🌐</span>
      <div class="quick-link-text">
        <div class="quick-link-title">NPM Setup</div>
        <div class="quick-link-desc">Wildcard certs via Cloudflare</div>
      </div>
    </a>
  </div>
</div>

## 💡 Kenapa Wiki Ini Ada?

::: tip Dokumentasi Pribadi
Menulis adalah cara terbaik untuk benar-benar memahami sesuatu. Wiki ini bukan cuma copy-paste dari tutorial, tapi hasil learning journey yang sebenarnya.
:::

::: info Referensi Cepat
Ketika coding dan lupa syntax tertentu, lebih cepat buka wiki sendiri daripada googling ulang. Semua sudah dikurasi sesuai kebutuhan.
:::

::: details Berbagi Pengetahuan
Kalau catatan ini bisa membantu orang lain yang sedang belajar, why not? Open knowledge untuk semua.
:::

## 🎯 Cara Navigasi

1. **🔍 Search First** - Tekan `Ctrl/Cmd + K` untuk search cepat
2. **📑 Browse by Topic** - Pilih RE-Binex, Docker, atau Writeups di navbar
3. **📋 Use Sidebar** - Di setiap section, sidebar menunjukkan semua halaman available
4. **🌙 Dark Mode** - Toggle dark/light mode di pojok kanan atas
5. **🔗 Follow Links** - Setiap halaman punya links ke topik terkait

<div class="cta-section">
  <div class="cta-title">🚀 Ready to Start Learning?</div>
  <p style="color: var(--vp-c-text-2); margin-bottom: 0;">Pilih topik yang ingin kamu pelajari dan mulai eksplorasi!</p>
  <div class="cta-buttons">
    <a href="/RE-Binex/" class="cta-button" style="color: white !important;">Explore RE & Binex</a>
    <a href="/docker/" class="cta-button" style="color: white !important;">Explore Docker</a>
    <a href="/writeup/" class="cta-button" style="color: white !important;">Explore Writeups</a>
    <a href="/tutorial/panduan-vitepress" class="cta-button secondary" style="color: var(--vp-c-brand-1) !important;">Baca Panduan</a>
  </div>
</div>

---

<div style="text-align: center; color: var(--vp-c-text-3); font-size: 0.9rem; margin-top: 3rem;">
  <p>💻 Built with <a href="https://vitepress.dev" target="_blank">VitePress</a> • Hosted on Digital Ocean • Updated regularly</p>
  <p style="margin-top: 0.5rem;">Found something helpful? Star ⭐ on GitHub or share with others!</p>
</div>
