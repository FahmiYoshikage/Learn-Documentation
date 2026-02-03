---
title: 'Chapter 1: Dasar C & Kompilasi'
description: 'Memahami fundamental C programming dan proses kompilasi'
prev:
    text: 'Kembali ke Index'
    link: '/RE-Binex/'
next:
    text: 'Chapter 2: Buffer Overflow'
    link: '/RE-Binex/Chapter2-Buffer_Overflow'
---

# Chapter 1: Dasar C & Kompilasi

::: tip 🎯 Tujuan Chapter
Sebelum masuk ke hacking, kita perlu memahami bagaimana kode C bekerja dan bagaimana ia diterjemahkan menjadi bahasa mesin.
:::

## 📝 Struktur Program C

Program C paling sederhana terdiri dari header, fungsi main, dan nilai kembalian (return).

```c
#include <stdio.h>  // Library I/O

int main() {
    printf("Halo, Reverse Engineer!\n");
    return 0;  // Exit code 0 (Sukses)
}
```

## 🔨 Memasak Kode (Kompilasi)

::: warning ⚠️ Penting untuk Reverse Engineer
Sebagai Reverse Engineer, kita harus paham argumen compiler GCC karena ini mempengaruhi seberapa mudah program dibaca (di-reverse).
:::

### 1. Standard Compile

```bash
gcc program.c -o program
```

- ✅ Menghasilkan binary standar dengan Symbol Table
- ✅ Nama fungsi dan variabel masih terbaca
- 📊 **Best for**: Pembelajaran dan debugging

### 2. Debugging Info (`-g`)

```bash
gcc -g program.c -o program_debug
```

- ✅ Menyertakan Source Code asli di dalam binary
- ✅ Sangat membantu saat belajar dengan GDB
- ❌ Berbahaya jika dirilis ke publik
- 📊 **Best for**: Development dan learning

### 3. Stripped Binary (`-s`)

```bash
gcc -s program.c -o program_stripped
```

- ✅ Menghapus Symbol Table
- ✅ Ukuran file lebih kecil
- ❌ Sangat sulit dibaca (nama fungsi seperti `main` hilang)
- 📊 **Best for**: Production release

## 🧠 Memory Layout Dasar

::: info 💡 Key Concept
Pemahaman memori adalah kunci eksploitasi.
:::

```
┌─────────────────┐ ← High Address (0x7fff...)
│      Stack      │ ← Variabel lokal, return addresses
│        ↓        │   (Tumbuh ke bawah)
├─────────────────┤
│       ...       │
├─────────────────┤
│      Heap       │ ← malloc(), dynamic allocation
│        ↑        │   (Tumbuh ke atas)
├─────────────────┤
│    Data/BSS     │ ← Global & static variables
├─────────────────┤
│      Text       │ ← Program instructions (Read-Only)
└─────────────────┘ ← Low Address (0x0040...)
```

### Segmen Memory:

| Segmen       | Fungsi                    | Growth Direction |
| ------------ | ------------------------- | ---------------- |
| **Stack**    | Variabel lokal sementara  | 🔽 High → Low    |
| **Heap**     | Memori dinamis (`malloc`) | 🔼 Low → High    |
| **Data/BSS** | Variabel global           | -                |
| **Text**     | Instruksi program         | -                |

## 🧪 Hands-on Practice

### Membuat Program Test

```c
// test.c
#include <stdio.h>

int global_var = 42;  // Akan masuk ke Data segment

int main() {
    int local_var = 100;  // Akan masuk ke Stack
    printf("Global: %d, Local: %d\n", global_var, local_var);
    return 0;
}
```

### Compile & Test

```bash
# Standard compile
gcc test.c -o test

# With debug info
gcc -g test.c -o test_debug

# Stripped version
gcc -s test.c -o test_stripped

# Compare file sizes
ls -la test*
```

## 🎯 Checkpoint

::: details ✅ Apa yang sudah dipelajari?

- [x] Struktur dasar program C
- [x] Berbagai mode kompilasi GCC
- [x] Memory layout fundamental
- [x] Perbedaan antara Stack, Heap, Data, dan Text segment
      :::

---

::: tip 📚 Next Steps
Sekarang kita sudah memahami dasar-dasar C dan memory layout. Selanjutnya kita akan belajar bagaimana memory ini bisa **dieksploitasi** melalui Buffer Overflow.

👉 [Lanjut ke Chapter 2: Buffer Overflow](/RE-Binex/Chapter2-Buffer_Overflow)
:::
