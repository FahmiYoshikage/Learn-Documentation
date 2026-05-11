# Tutorial: Setup Wildcard Certificate Nginx Proxy Manager (NPM) dengan Cloudflare

Tutorial ini akan memandu Anda cara mendapatkan dan mengonfigurasi *wildcard certificate* (`*.domainanda.com`) di Nginx Proxy Manager menggunakan metode DNS Challenge dari Cloudflare.

## Prasyarat
1. Nginx Proxy Manager (NPM) sudah terinstall dan dapat diakses.
2. Memiliki domain aktif yang DNS/Nameserver-nya sudah di-manage oleh Cloudflare.
3. Akses ke dashboard Cloudflare.

---

## Langkah 1: Membuat API Token Cloudflare

Untuk menggunakan DNS Challenge, NPM memerlukan akses ke DNS Cloudflare Anda untuk melakukan verifikasi kepemilikan domain secara otomatis tanpa perlu membuka port 80.

1. Login ke dashboard [Cloudflare](https://dash.cloudflare.com/).
2. Klik ikon profil Anda di sudut kanan atas, lalu pilih **My Profile**.
3. Di menu sebelah kiri, navigasikan ke **API Tokens**.
4. Klik tombol **Create Token**.
5. Cari template **Edit zone DNS**, lalu klik tombol **Use template** di sebelahnya.
6. Pada bagian **Zone Resources**, atur konfigurasinya menjadi:
   - `Include` -> `Specific zone` -> `[Pilih domain Anda dari dropdown]`
7. (Opsional) Pada bagian *Client IP Address Filtering* dan *TTL*, biarkan saja default jika Anda tidak ingin memberikan batasan spesifik.
8. Klik tombol **Continue to summary** di bagian bawah, lalu klik **Create Token**.
9. **PENTING:** Salin dan simpan API Token yang ditampilkan di tempat yang aman. Token ini **hanya akan ditampilkan satu kali**.

---

## Langkah 2: Request Wildcard Certificate di NPM

Setelah mendapatkan API Token dari Cloudflare, langkah selanjutnya adalah melakukan request sertifikat Let's Encrypt di NPM.

1. Buka dashboard Nginx Proxy Manager Anda (secara default di port `81`).
2. Login menggunakan akun Anda.
3. Buka menu **SSL Certificates** di bar navigasi atas.
4. Klik tombol **Add SSL Certificate** di sebelah kanan atas, lalu pilih **Let's Encrypt**.
5. Isi form dengan konfigurasi berikut:
   - **Domain Names:** Masukkan `*.domainanda.com, domainanda.com` 
     *(Catatan: Ganti `domainanda.com` dengan domain Anda yang sebenarnya. Memasukkan dua nilai ini sekaligus akan mengamankan baik subdomain apapun maupun domain utama itu sendiri)*. Tekan `Enter` setelah mengetik.
   - **Email Address for Let's Encrypt:** Masukkan alamat email Anda (digunakan untuk notifikasi perpanjangan jika ada kendala).
   - **Use a DNS Challenge:** Aktifkan (centang) opsi ini.
   - **DNS Provider:** Pilih `Cloudflare`.
   - **Credentials File Content:** Hapus seluruh isi default-nya dan ganti dengan:
     ```ini
     dns_cloudflare_api_token=MASUKKAN_API_TOKEN_ANDA_DI_SINI
     ```
     *(Ganti teks MASUKKAN_API_TOKEN_ANDA_DI_SINI dengan token yang Anda salin di Langkah 1)*.
   - **Propagation Seconds:** Kosongkan atau biarkan default. Jika saat proses *save* nanti Anda mengalami error timeout, coba isi nilai ini dengan `120` atau `300`.
   - **I Agree to the Let's Encrypt Terms of Service:** Centang opsi ini.
6. Klik tombol **Save**.
7. Tunggu beberapa saat. Proses ini mungkin memakan waktu hingga satu atau dua menit karena NPM sedang berkomunikasi dengan Cloudflare untuk membuat TXT record DNS dan memverifikasinya.

Jika berhasil, jendela form akan tertutup dan sertifikat baru akan muncul di daftar **SSL Certificates** Anda.

---

## Langkah 3: Menggunakan Wildcard Certificate

Sertifikat yang baru dibuat sekarang sudah siap digunakan untuk mengamankan berbagai proxy host Anda.

1. Buka menu **Proxy Hosts**.
2. Klik **Add Proxy Host** (atau klik titik tiga > *Edit* pada host yang sudah ada).
3. Isi tab **Details** seperti biasa (Domain Names, Scheme, Forward Hostname / IP, Forward Port).
4. Pindah ke tab **SSL**.
5. Pada dropdown **SSL Certificate**, klik dan pilih sertifikat wildcard yang baru saja Anda buat (biasanya bernama `*.domainanda.com, domainanda.com`).
6. Sangat disarankan untuk mencentang opsi **Force SSL**, **HTTP/2 Support**, dan **HSTS Enabled**.
7. Klik **Save**.

## Kesimpulan
Selesai! Dengan *wildcard certificate*, Anda tidak perlu lagi repot melakukan request sertifikat SSL Let's Encrypt baru satu per satu setiap kali Anda menambahkan layanan/subdomain baru (misalnya `app.domainanda.com`, `api.domainanda.com`). Anda cukup memilih sertifikat wildcard yang sama untuk semua subdomain Anda di Nginx Proxy Manager.
