# Chapter 5: Bypassing NX dengan Ret2Libc

## 📋 Pengenalan

Pada tahap ini, kita menghadapi proteksi **NX (No-Execute)**. Proteksi ini memastikan bahwa Stack hanya bisa digunakan untuk menyimpan data, bukan menjalankan kode. Artinya, Shellcode Injection dari Chapter 4 tidak akan berhasil.

## 🎯 Konsep Ret2Libc (Return to Libc)

Karena kita tidak bisa menyuntikkan kode baru, kita akan **meminjam fungsi yang sudah ada** di dalam library standar C (libc), yaitu fungsi `system()`.

**Tujuan**: Mengarahkan alur program (RIP) untuk melompat ke `system()` dengan argumen string `"/bin/sh"`.

## 🧩 Komponen ROP Chain x64

Dalam arsitektur x64, argumen fungsi tidak ditaruh di Stack, melainkan di **register**. Argumen pertama harus berada di register **RDI**. Oleh karena itu, kita membutuhkan:

1. **Offset**: Jarak dari buffer ke Return Address
2. **Gadget `pop rdi; ret`**: Instruksi kecil untuk mengambil alamat dari stack ke register RDI
3. **Alamat `/bin/sh`**: String yang ada di dalam memori libc
4. **Alamat `system()`**: Alamat fungsi di dalam libc
5. **Ret Gadget (Alignment)**: Satu instruksi `ret` tambahan untuk memenuhi syarat stack alignment 16-byte (menghindari crash MOVAPS)

## 🔧 Workflow Eksploitasi

### 1. Mencari Alamat di GDB

```bash
pwndbg> p system              # Cari alamat fungsi system
pwndbg> search "/bin/sh"      # Cari string /bin/sh di libc
pwndbg> rop --grep "pop rdi"  # Cari gadget pop rdi
```

### 2. Menyusun Payload Python

```python
offset = 120
payload = b"A" * offset
payload += p64(ret_gadget)    # Alignment 16-byte
payload += p64(pop_rdi)       # Masuk ke gadget
payload += p64(bin_sh_addr)   # Diambil oleh pop rdi
payload += p64(system_addr)   # Melompat ke system()
```

## 🛡️ Menghadapi ASLR

Karena alamat libc berubah-ubah setiap kali program dijalankan (ASLR), untuk tahap dasar ini kita menggunakan `setarch` untuk mematikan ASLR secara lokal agar alamat yang kita dapatkan di GDB tetap statis.

```bash
setarch $(uname -m) -R python3 exploit.py
```

## 📂 Attachment

- [Source Code: 5ret2libc.c](#)
- [Exploit Script: Ret2Libc](#)
