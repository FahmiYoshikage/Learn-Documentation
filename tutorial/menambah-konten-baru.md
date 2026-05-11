# Panduan Menambah Konten & Folder Baru

Dokumen ini adalah **Standar Operasional (SOP)** untuk menambahkan catatan (tutorial) baru atau membuat kategori (folder) baru di dalam repositori Knowledge Base ini agar tampil secara otomatis dan sesuai dengan struktur VitePress yang digunakan.

---

## 1. Menambah Tutorial Baru di Folder yang Sudah Ada

Misalkan Anda ingin menambahkan tutorial baru tentang "Docker Compose" ke dalam folder `docker`.

### Langkah-langkah:
1. **Buat file Markdown baru** di dalam folder tersebut. 
   Contoh: buat file `docker/docker-compose.md`.
2. **Tulis konten Anda** dengan format Markdown standar. Disarankan menambahkan *Frontmatter* di baris paling atas file untuk metadata:
   ```markdown
   ---
   title: Panduan Docker Compose
   description: Cara menggunakan docker compose untuk multi-container
   ---
   
   # Panduan Docker Compose
   
   Konten tutorial Anda di sini...
   ```
3. **Daftarkan file ke Sidebar**. Agar file tersebut muncul di menu samping (sidebar) saat user membuka kategori Docker, Anda **wajib** mengubah file `.vitepress/config.mts`.
   - Buka `.vitepress/config.mts`
   - Cari bagian `sidebar: { ... }`
   - Temukan rute folder Anda (misal `'/docker/': [...]`)
   - Tambahkan link baru ke dalam array `items`:

   **Sebelum:**
   ```typescript
   '/docker/': [
       {
           text: 'Docker',
           items: [
               { text: 'Overview', link: '/docker/' },
               { text: 'Perintah Dasar', link: '/docker/basics' },
           ],
       },
   ],
   ```

   **Sesudah:**
   ```typescript
   '/docker/': [
       {
           text: 'Docker',
           items: [
               { text: 'Overview', link: '/docker/' },
               { text: 'Perintah Dasar', link: '/docker/basics' },
               { text: 'Docker Compose', link: '/docker/docker-compose' }, // <-- BARU
           ],
       },
   ],
   ```

---

## 2. Menambah Folder (Kategori) Baru

Misalkan Anda ingin membuat kategori baru untuk belajar "Linux" dan ingin memunculkannya di Taskbar atas (Navbar).

### Langkah-langkah:
1. **Buat folder baru** di root project, misalnya folder `linux`.
2. **Buat file `index.md`** di dalam folder tersebut sebagai halaman pendaratan (landing page) untuk kategori Linux.
   - Lokasi: `linux/index.md`
   - Isi dengan pengantar mengenai apa yang akan dipelajari di Linux.
3. **Tambahkan ke Navbar (Taskbar Atas)**.
   - Buka `.vitepress/config.mts`
   - Cari bagian `nav: [ ... ]`
   - Tambahkan menu baru agar muncul di atas:
   ```typescript
   nav: [
       { text: 'Home', link: '/' },
       { text: 'RE & Binex', link: '/RE-Binex/' },
       { text: 'Docker', link: '/docker/' },
       { text: 'CTF Writeups', link: '/writeup/' },
       { text: 'Linux', link: '/linux/' }, // <-- BARU
   ],
   ```
4. **Buat Sidebar Khusus untuk Folder Baru**.
   - Masih di dalam `.vitepress/config.mts`
   - Cari bagian `sidebar: { ... }`
   - Buat *key* rute baru untuk `'/linux/'` dan definisikan menu sidebar-nya:
   ```typescript
   sidebar: {
       '/docker/': [ ... ],
       // --- TAMBAHAN BARU ---
       '/linux/': [
           {
               text: 'Belajar Linux',
               items: [
                   { text: 'Pengenalan', link: '/linux/' },
               ]
           }
       ]
   }
   ```
5. *(Opsional tapi Disarankan)* **Tambahkan ke Homepage**.
   - Buka file `index.md` yang ada di root direktori (halaman depan website).
   - Tambahkan kategori "Linux" ke bagian fitur (features) atau Quick Links (Hero actions) agar pengunjung bisa dengan mudah melihat direktori baru Anda dari halaman utama.

## Ringkasan Standar Saat Ini
- **Setiap tambah `.md` baru:** Wajib update `sidebar` di `.vitepress/config.mts`.
- **Setiap tambah folder baru:** Wajib buat `index.md` di dalamnya, lalu update `nav` dan buat konfigurasi `sidebar` baru untuk folder tersebut di `.vitepress/config.mts`.
