# Markdown Cheatsheet Lengkap

Panduan lengkap semua format Markdown yang bisa digunakan.

## 📝 Heading (Judul)

```markdown
# H1 - Heading Level 1
## H2 - Heading Level 2
### H3 - Heading Level 3
#### H4 - Heading Level 4
##### H5 - Heading Level 5
###### H6 - Heading Level 6
```

## 🔤 Text Formatting (Format Teks)

```markdown
**Bold Text** atau __Bold Text__
*Italic Text* atau _Italic Text_
***Bold dan Italic*** atau ___Bold dan Italic___
~~Strikethrough~~ (text tercoret)
`Inline Code`
<u>Underline</u> (HTML)
<mark>Highlighted Text</mark> (HTML)
```

**Hasil:**
- **Bold Text**
- *Italic Text*
- ***Bold dan Italic***
- ~~Strikethrough~~
- `Inline Code`

## 📋 Lists (Daftar)

### Unordered List (Bullet Points)

```markdown
- Item 1
- Item 2
  - Sub item 2.1
  - Sub item 2.2
    - Sub-sub item 2.2.1
- Item 3

* Item A
* Item B
* Item C

+ Item X
+ Item Y
+ Item Z
```

### Ordered List (Numbered)

```markdown
1. First item
2. Second item
3. Third item
   1. Sub item 3.1
   2. Sub item 3.2
4. Fourth item
```

### Task List (Checklist)

```markdown
- [x] Task completed
- [ ] Task pending
- [ ] Another task
```

**Hasil:**
- [x] Task completed
- [ ] Task pending
- [ ] Another task

## 🔗 Links (Tautan)

```markdown
[Link Text](https://example.com)
[Link dengan Title](https://example.com "Hover untuk lihat title")
<https://example.com>
[Link ke file lokal](./file.md)
[Link ke heading](#heading-id)
```

**Reference-style links:**
```markdown
[Link text][reference]
[Another link][ref2]

[reference]: https://example.com
[ref2]: https://example.com "Optional title"
```

## 🖼️ Images (Gambar)

```markdown
![Alt text](path/to/image.jpg)
![Alt text](path/to/image.jpg "Image title")

<!-- Image dengan link -->
[![Alt text](image.jpg)](https://example.com)

<!-- Reference-style image -->
![Alt text][image-ref]

[image-ref]: path/to/image.jpg "Optional title"
```

**HTML untuk kontrol lebih:**
```html
<img src="image.jpg" alt="Alt text" width="300" height="200">
```

## 💬 Blockquotes (Kutipan)

```markdown
> Ini adalah blockquote
> Baris kedua dari quote

> Multi-level quote
>> Nested quote
>>> Deeply nested
```

**Hasil:**
> Ini adalah blockquote
> Baris kedua dari quote

## 💻 Code (Kode)

### Inline Code

```markdown
Gunakan `variable` untuk inline code
```

### Code Block

````markdown
```
Code tanpa syntax highlighting
```

```javascript
// JavaScript code
function hello() {
  console.log("Hello World");
}
```

```python
# Python code
def hello():
    print("Hello World")
```

```bash
# Bash commands
npm install
git commit -m "message"
```
````

**Supported languages:** javascript, python, java, c, cpp, csharp, php, ruby, go, rust, swift, kotlin, typescript, html, css, scss, json, yaml, xml, sql, bash, shell, powershell, dockerfile, markdown, dan banyak lagi.

## 📊 Tables (Tabel)

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

<!-- Alignment -->
| Left | Center | Right |
|:-----|:------:|------:|
| L1   | C1     | R1    |
| L2   | C2     | R2    |
```

**Hasil:**
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

## ➖ Horizontal Rules (Garis Horizontal)

```markdown
---
***
___
```

**Hasil:**

---

## 🔢 Footnotes (Catatan Kaki)

```markdown
Ini adalah text dengan footnote[^1].
Ini adalah footnote lainnya[^2].

[^1]: Ini adalah isi footnote pertama.
[^2]: Ini adalah isi footnote kedua dengan **formatting**.
```

## ⚠️ Alerts (VitePress/GitHub)

```markdown
::: info
Ini adalah info box
:::

::: tip
Ini adalah tip box
:::

::: warning
Ini adalah warning box
:::

::: danger
Ini adalah danger box
:::

::: details Klik untuk expand
Konten yang tersembunyi
:::
```

## ✅ Emoji

```markdown
:smile: :heart: :thumbsup: :fire: :rocket:
:sparkles: :tada: :book: :bulb: :warning:

<!-- Atau gunakan emoji langsung -->
😀 ❤️ 👍 🔥 🚀 ✨ 🎉 📚 💡 ⚠️
```

## 🔤 Escaping Characters

```markdown
\* Asterisk tidak menjadi italic
\_ Underscore tidak menjadi italic
\# Tidak menjadi heading
\- Tidak menjadi bullet
\` Tidak menjadi code
\! Tidak menjadi image
```

## 📐 Math Equations (LaTeX)

**Inline math:**
```markdown
$E = mc^2$
```

**Block math:**
```markdown
$$
\frac{n!}{k!(n-k)!} = \binom{n}{k}
$$
```

## 🎨 HTML dalam Markdown

```markdown
<div style="color: red;">
  Ini text berwarna merah
</div>

<details>
<summary>Klik untuk expand</summary>

Konten yang tersembunyi di dalam details tag.

</details>

<kbd>Ctrl</kbd> + <kbd>C</kbd>

<sup>superscript</sup> dan <sub>subscript</sub>
```

**Hasil:**
<kbd>Ctrl</kbd> + <kbd>C</kbd>

## 📦 Definition Lists

```markdown
Term 1
: Definition 1

Term 2
: Definition 2a
: Definition 2b
```

## 🔗 Auto-linking

```markdown
https://example.com (otomatis jadi link)
email@example.com (otomatis jadi link)
```

## 📝 Line Breaks

```markdown
Baris pertama  
Baris kedua (2 spasi di akhir baris pertama)

Baris pertama<br>
Baris kedua (menggunakan HTML)
```

## 🎯 Badges (Shields.io)

```markdown
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
```

**Hasil:**
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Build](https://img.shields.io/badge/build-passing-brightgreen)

## 📌 Anchors & IDs

```markdown
### Heading dengan ID {#custom-id}

Link ke heading: [Klik di sini](#custom-id)
```

## 🌈 Colored Text (HTML)

```html
<span style="color: red">Red text</span>
<span style="color: #0000FF">Blue text</span>
<span style="background-color: yellow">Highlighted</span>
```

## 📋 Abbreviations

```markdown
*[HTML]: Hyper Text Markup Language
*[CSS]: Cascading Style Sheets

Gunakan HTML dan CSS dalam project Anda.
(Hover pada HTML/CSS untuk lihat kepanjangan)
```

## 🎭 Comments

```markdown
<!-- Ini adalah comment, tidak akan terlihat -->

[//]: # (Ini juga comment)
[comment]: # (Alternative comment syntax)
```

## 🔄 Combining Elements

```markdown
### 📚 Project Features

> **Note:** This is important information
> 
> - Feature 1: **Bold** and *italic*
> - Feature 2: `code` and [links](https://example.com)
> - Feature 3: ~~deprecated~~
>
> ```javascript
> console.log("Code inside blockquote");
> ```

| Feature | Status | Priority |
|---------|:------:|:--------:|
| Auth    | ✅     | 🔥 High  |
| UI      | 🚧     | ⚠️ Medium|
| Tests   | ❌     | 💚 Low   |
```

**Hasil:**

### 📚 Project Features

> **Note:** This is important information
> 
> - Feature 1: **Bold** and *italic*
> - Feature 2: `code` and [links](https://example.com)
> - Feature 3: ~~deprecated~~
>
> ```javascript
> console.log("Code inside blockquote");
> ```

## 🎓 Best Practices

### ✅ DO (Recommended)

```markdown
<!-- Spasi setelah # untuk heading -->
# Good Heading

<!-- Blank line sebelum dan sesudah heading -->
Text before

## Heading

Text after

<!-- Consistent list markers -->
- Item 1
- Item 2
- Item 3
```

### ❌ DON'T (Avoid)

```markdown
<!-- Tidak ada spasi -->
#Bad Heading

<!-- Tidak ada blank line -->
Text before
## Heading
Text after

<!-- Mixed list markers -->
- Item 1
* Item 2
+ Item 3
```

## 🛠️ Tools & Resources

### Online Markdown Editors
- [StackEdit](https://stackedit.io/)
- [Dillinger](https://dillinger.io/)
- [HackMD](https://hackmd.io/)

### VS Code Extensions
- Markdown All in One
- Markdown Preview Enhanced
- markdownlint

### Reference
- [CommonMark Spec](https://commonmark.org/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)
- [VitePress Markdown](https://vitepress.dev/guide/markdown)

---

## 📚 Contoh Lengkap

```markdown
# 🚀 My Awesome Project

> A modern, fast, and scalable application built with ❤️

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](#)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](#)

## ✨ Features

- [x] **Authentication** - Secure user login
- [x] **Dashboard** - Real-time analytics
- [ ] **API** - RESTful endpoints
- [ ] **Mobile App** - iOS & Android

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)

## 🛠️ Installation

```bash
# Clone repository
git clone https://github.com/user/repo.git

# Install dependencies
npm install

# Run development server
npm run dev
```

## 📖 Usage

```javascript
import { createApp } from './app';

const app = createApp({
  port: 3000,
  debug: true
});

app.listen();
```

## 📊 Performance

| Metric | Score | Status |
|--------|:-----:|:------:|
| Speed  | 95    | ✅     |
| SEO    | 100   | ✅     |
| PWA    | 92    | ✅     |

## ⚠️ Important Notes

::: warning
This is still in **beta**. Use with caution in production.
:::

::: tip
Check out our [documentation](https://docs.example.com) for more details.
:::

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md).

## 📄 License

MIT © 2025 Your Name

---

Made with ❤️ by [Your Name](https://github.com/username)
```

---

**💡 Tips:**
- Preview markdown saat menulis dengan VS Code (`Ctrl+Shift+V`)
- Gunakan linter seperti `markdownlint` untuk konsistensi
- Test preview di platform yang akan digunakan (GitHub, GitLab, VitePress, dll)
- Simpan cheatsheet ini sebagai referensi cepat!
