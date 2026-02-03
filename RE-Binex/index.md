---
layout: home
title: Low-Level Programming
description: Journey to Binary Exploitation
---

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from 'vitepress/theme'
</script>

# C Reverse Engineering

## Journey to Binary Exploitation

::: tip 🎯 Tentang Dokumentasi
Dokumentasi ini dibuat sebagai arsip pembelajaran pribadi dalam mendalami keamanan siber, khususnya di bidang **Binary Exploitation (Pwn)**.
:::

## 📖 Daftar Materi

### Bagian 1: Fundamental

- [Chapter 1: Dasar C & Kompilasi](/RE-Binex/Chapter1-Dasar_C)
- [Chapter 2: Buffer Overflow](/RE-Binex/Chapter2-Buffer_Overflow)

### Bagian 2: Exploitation

- [Chapter 3: Return Address Overwrite (Ret2Win)](/RE-Binex/Chapter3_Ret2Win)
- [Chapter 4: Shellcode Injection](/RE-Binex/Chapter4-Shellcode)
- [Chapter 5: Ret2Libc (Bypassing NX)](/RE-Binex/Chapter5-Ret5Libc)

### Bagian 3: Referensi

- [📋 Glosarium Istilah Exploitation](/RE-Binex/GlosariumExploit)
- [🐚 Shellcode Reference (execve)](/RE-Binex/Shellcode)
- [⚙️ System Call Linux x64](/RE-Binex/systemCallLinux64bit)

## ⭐ Fitur Pembelajaran

::: info 🔧 C Programming
Memahami struktur bahasa C, pointer, dan manajemen memori manual.
:::

::: warning 🔍 Reverse Engineering  
Membedah binary, membaca Assembly, dan memahami alur program level mesin.
:::

::: danger 💥 Binary Exploitation
Teknik Stack Buffer Overflow, Ret2Win, hingga Shellcode Injection.
:::

## 🛠️ Prasyarat Tools

```bash
# Environment Setup
sudo apt update && sudo apt install -y \
    build-essential \
    gdb \
    python3 \
    python3-pip \
    nasm

# Install Pwntools
pip3 install pwntools

# Install Pwndbg
git clone https://github.com/pwndbg/pwndbg
cd pwndbg
./setup.sh
```

## 🎓 Target Pembelajaran

Setelah menyelesaikan materi ini, Anda akan mampu:

- ✅ Memahami konsep memory layout dan stack
- ✅ Melakukan buffer overflow attack
- ✅ Mengeksploitasi return address hijacking
- ✅ Membuat dan menginjeksikan shellcode
- ✅ Menggunakan tools debugging dan exploitation

---

::: details 📋 Progress Tracking

- [ ] Chapter 1: Dasar C & Kompilasi
- [ ] Chapter 2: Buffer Overflow
- [ ] Chapter 3: Return Address Overwrite
- [ ] Chapter 4: Shellcode Injection
- [ ] Chapter 5: Ret2Libc (Bypassing NX)
      :::
