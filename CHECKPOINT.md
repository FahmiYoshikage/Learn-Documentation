# Content Editor Connector

Connector ini merupakan perantara (CMS sederhana) yang berjalan secara lokal untuk membantu Anda fokus pada penulisan dokumentasi tanpa harus pusing memikirkan struktur VitePress atau mengetik Markdown di editor code yang kaku.

## Fitur

- **Manajemen File & Folder:** Memungkinkan Anda membuat file dan kategori/folder baru secara langsung.
- **Markdown Editor Nyaman:** Editor dilengakapi dengan preview Markdown secara Real-Time.
- **Git Sync:** Terdapat tombol untuk melakukan `git pull` secara langsung dari UI.

## Cara Menjalankan

1. Buka terminal dan masuk ke folder `connector`:
    ```bash
    cd connector
    ```
2. Install dependensi (hanya dilakukan sekali):
    ```bash
    npm install
    ```
3. Jalankan server lokal:
    ```bash
    node server.js
    ```
4. Buka browser dan pergi ke URL:
    ```
    http://localhost:3001
    ```

Sekarang Anda bisa menulis dokumentasi dengan nyaman, preview ter-render di sebelahnya, lalu menyimpannya yang akan otomatis mengubah struktur dari VitePress Anda!
