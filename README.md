# 📚 My Documentation Wiki

> A modern, beautiful documentation site built with VitePress — featuring animated hero sections, multiple tech stacks, and comprehensive guides.

[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-646CFF?style=flat&logo=vite)](https://vitepress.dev)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.4+-4FC08D?style=flat&logo=vue.js)](https://vuejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](#)

## ✨ Features

- 🎨 **Modern Design** — Custom hero section with animated SVG illustrations
- 📖 **Multi-Section Structure** — Organized documentation for JavaScript, Python, and Docker
- 🔍 **Built-in Search** — Fast local search powered by VitePress
- 🌙 **Dark Mode** — Beautiful dark theme support out of the box
- ⚡ **Lightning Fast** — Static site generation with optimized performance
- 📱 **Responsive** — Mobile-friendly design that works everywhere
- 🎯 **Easy Navigation** — Smart navbar and dynamic sidebars per section

## 🚀 Tech Stack

- **[VitePress](https://vitepress.dev)** - Vue-powered static site generator
- **[Vue 3](https://vuejs.org)** - Progressive JavaScript framework
- **SVG Animations** - Custom animated hero illustrations
- **Markdown** - Simple content authoring

## 🛠️ Installation & Usage

### Prerequisites

- Node.js 18+ and npm

### Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd my-docs

# Install dependencies
npm install

# Start development server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

The dev server will start at `http://localhost:5173`

## 📁 Project Structure

```
my-docs/
├── .vitepress/
│   └── config.mts          # VitePress configuration
├── public/
│   ├── favicon.svg         # Site favicon
│   ├── favicon.png         # Favicon fallback
│   └── hero-animation.svg  # Animated hero illustration
├── javascript/             # JavaScript documentation
│   ├── index.md
│   ├── basics.md
│   └── array-methods.md
├── python/                 # Python documentation
│   ├── index.md
│   └── basics.md
├── docker/                 # Docker documentation
│   ├── index.md
│   └── basics.md
├── panduan-vitepress.md    # VitePress guide
├── vitepress-syntax.md     # Syntax reference
├── homepage-customization.md
├── navbar-vs-sidebar.md
├── struktur-project.md
└── index.md                # Homepage
```

## 🎯 Documentation Sections

- **JavaScript** - Core concepts, ES6+ features, array methods, and more
- **Python** - Python basics, functions, data structures, and best practices
- **Docker** - Container basics, Dockerfile guide, and Docker Compose
- **VitePress Guides** - Meta-documentation about using VitePress

## 🎨 Customization

The site features a custom homepage with:

- Animated SVG hero illustration with rotating code snippets
- Feature cards with links to different sections
- Statistics showcase
- Quick navigation cards
- Custom CSS animations and transitions

Edit `index.md` to customize the homepage content and styling.

## 📝 Adding Content

1. Create a new `.md` file in the appropriate section folder
2. Add frontmatter for page metadata:
    ```yaml
    ---
    title: Your Page Title
    description: Page description
    ---
    ```
3. Update `.vitepress/config.mts` to add the page to navigation/sidebar
4. Write your content using Markdown

## 🚀 Deployment

This site can be deployed to various platforms:

- **GitHub Pages** - Free hosting for GitHub repositories
- **Netlify** - Automatic deployments from Git
- **Vercel** - Zero-config deployments
- **Digital Ocean App Platform** - Free tier available

Build command: `npm run docs:build`  
Output directory: `.vitepress/dist`

## 📄 License

MIT License - feel free to use this project for your own documentation needs!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

<div align="center">
  <sub>Built with ❤️ using VitePress</sub>
</div>
