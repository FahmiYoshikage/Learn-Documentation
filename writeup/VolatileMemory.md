---
title: Volatile Memory - CTF Writeup
description: Reverse Engineering challenge featuring self-modifying code and XOR encryption
tags: [CTF, Reverse Engineering, Binary Exploitation, GDB, Self-Modifying Code]
difficulty: Medium
author: Your Name
date: 2024-01-30
---

# Volatile Memory - CTF Writeup

## Challenge Information

**Category:** Reverse Engineering  
**Author:** FailDeGaskar  
**Flag Format:** `LKS{...}`

### Deskripsi Challenge

Kami berhasil menyita sebuah program biner dari server sindikat kriminal. Tim forensik kami mencoba menganalisis kodenya menggunakan disassembler, tetapi mereka bingung karena isinya terlihat seperti sampah data acak (gibberish).

Anehnya, saat program dijalankan, ia berfungsi normal dan meminta password. Sepertinya program ini memiliki mekanisme pertahanan diri yang menyembunyikan logika aslinya.

---

## Initial Analysis

Dari deskripsi challenge, kita mendapat beberapa petunjuk penting:

- Program berjalan normal tapi disassembler menunjukkan data acak
- Ada mekanisme pertahanan diri yang menyembunyikan logika
- Kemungkinan besar menggunakan **enkripsi** atau **obfuscation**

### File Analysis

Mari kita mulai dengan menganalisa file yang diberikan:

```bash
❯ file chall
chall: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked,
interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=d31165c01592f4cbd8feed8ace1ae4684135cf32,
for GNU/Linux 3.2.0, not stripped
```

::: tip Key Observations

- ELF 64-bit executable
- Dynamically linked
- **Not stripped** - function names masih ada!
  :::

### Running the Binary

```bash
❯ ./chall
Gunakan: ./chall <flag>

❯ ./chall LKS{TEST}
Memeriksa flag...
Wrong!
```

Program menerima flag sebagai **argument**, bukan input interaktif.

### String Analysis

```bash
❯ strings chall
Gunakan: %s <flag>
Gagal alokasi memory
gagal mprotect
Memeriksa flag...
Correct!
Wrong!
```

::: warning Red Flags Detected
Ditemukan string `gagal mprotect` dan `Gagal alokasi memory` yang mengindikasikan:

- Penggunaan `malloc` untuk alokasi memori
- Penggunaan `mprotect` untuk mengubah permission memori
- Kemungkinan **Self-Modifying Code**!
  :::

---

## Dynamic Analysis dengan GDB

### Listing Functions

```bash
pwndbg> info functions
```

```asm
Non-debugging symbols:
0x000000000040033c  _init
0x0000000000400370  puts@plt
0x0000000000400380  mmap@plt
0x0000000000400390  printf@plt
0x00000000004003a0  memcpy@plt
0x00000000004003b0  munmap@plt
0x00000000004003c0  mprotect@plt
0x00000000004003d0  perror@plt
0x00000000004003e0  _start
0x0000000000400410  _dl_relocate_static_pie
0x0000000000400420  deregister_tm_clones
0x0000000000400450  register_tm_clones
0x0000000000400490  __do_global_dtors_aux
0x00000000004004c0  frame_dummy
0x00000000004004c6  main
0x0000000000400630  _fini
```

Fungsi-fungsi manipulasi memori terdeteksi: `mmap`, `memcpy`, `mprotect`, `munmap`

### Disassembly Main Function

```bash
pwndbg> disas main
```

<details>
<summary>Klik untuk melihat assembly lengkap</summary>

```asm
Dump of assembler code for function main:
   0x00000000004004c6 <+0>:     push   rbp
   0x00000000004004c7 <+1>:     mov    rbp,rsp
   0x00000000004004ca <+4>:     sub    rsp,0x40
   0x00000000004004ce <+8>:     mov    DWORD PTR [rbp-0x34],edi
   0x00000000004004d1 <+11>:    mov    QWORD PTR [rbp-0x40],rsi
   0x00000000004004d5 <+15>:    cmp    DWORD PTR [rbp-0x34],0x1
   0x00000000004004d9 <+19>:    jg     0x4004fe <main+56>
   # ... (argument check)

   0x00000000004004fe <+56>:    mov    QWORD PTR [rbp-0x10],0x21f
   0x0000000000400506 <+64>:    mov    rax,QWORD PTR [rbp-0x10]
   # ... (mmap setup)

   0x0000000000400528 <+98>:    call   0x400380 <mmap@plt>
   # ... (memory allocation)

   0x000000000040055c <+150>:   call   0x4003a0 <memcpy@plt>
   # ... (copy encrypted data)

   0x0000000000400572 <+172>:   movzx  edx,BYTE PTR [rax]
   0x000000000040058f <+201>:   xor    edx,0xffffffaa
   0x0000000000400592 <+204>:   mov    BYTE PTR [rax],dl
   # ... (XOR decryption loop)

   0x00000000004005b6 <+240>:   call   0x4003c0 <mprotect@plt>
   # ... (change memory to executable)

   0x00000000004005f5 <+303>:   call   rdx
   # ... (execute decrypted code)

End of assembler dump.
```

</details>

---

## Understanding the Mechanism

### Alur Kerja Program

```mermaid
graph TD
    A[Start] --> B[Allocate Memory with mmap]
    B --> C[Copy Encrypted Data from 0x403060]
    C --> D[Decrypt with XOR 0xAA Loop]
    D --> E[Change Memory Permission to READ|EXECUTE]
    E --> F[Execute Decrypted Code]
    F --> G[Cleanup with munmap]
    G --> H[End]
```

### Breakdown Instruksi Penting

| Address             | Instruction     | Purpose                                              |
| ------------------- | --------------- | ---------------------------------------------------- |
| `<+82>` - `<+98>`   | `mmap` call     | Alokasi memori dengan permission READ\|WRITE (`0x3`) |
| `<+142>` - `<+150>` | `memcpy` call   | Salin data terenkripsi dari `0x403060`               |
| `<+170>` - `<+219>` | XOR loop        | Dekripsi setiap byte dengan `XOR 0xAA`               |
| `<+240>`            | `mprotect` call | Ubah permission ke READ\|EXECUTE (`0x5`)             |
| `<+303>`            | `call rdx`      | **Execute decrypted shellcode!**                     |

::: info Kesimpulan
Program ini adalah **self-decrypting loader**:

1. Membawa payload terenkripsi (XOR 0xAA)
2. Membuka enkripsi di memori runtime
3. Mengubah memori menjadi executable
4. Menjalankan payload yang sudah didekripsi
   :::

---

## Exploitation Strategy

### Setting Breakpoint

Kita akan intercept eksekusi tepat sebelum shellcode dijalankan:

```bash
pwndbg> break *0x4005f5
Breakpoint 1 at 0x4005f5

pwndbg> run LKS{TEST}
```

Program akan berhenti di:

```
Memeriksa flag...
```

Pada titik ini, payload sudah **didekripsi** di memori!

### Inspecting Decrypted Code

```bash
pwndbg> x/200i $rdx
```

<details>
<summary>Klik untuk melihat disassembly shellcode</summary>

```asm
   0x7ffff7fbe000:      push   rbp
   0x7ffff7fbe001:      mov    rbp,rsp
   0x7ffff7fbe004:      mov    QWORD PTR [rbp-0x8],rdi

   # Check offset 0: 'L'
   0x7ffff7fbe008:      mov    rax,QWORD PTR [rbp-0x8]
   0x7ffff7fbe00c:      movzx  eax,BYTE PTR [rax]
   0x7ffff7fbe00f:      cmp    al,0x4c
   0x7ffff7fbe011:      je     0x7ffff7fbe01d

   # Check offset 1: 'K'
   0x7ffff7fbe01d:      mov    rax,QWORD PTR [rbp-0x8]
   0x7ffff7fbe021:      add    rax,0x1
   0x7ffff7fbe025:      movzx  eax,BYTE PTR [rax]
   0x7ffff7fbe028:      cmp    al,0x4b

   # ... continues checking each character
```

</details>

### Manual Flag Extraction

Shellcode melakukan character-by-character comparison:

| Index | Hex    | ASCII  | Instruksi     |
| ----- | ------ | ------ | ------------- |
| 0     | `0x4c` | **L**  | `cmp al,0x4c` |
| 1     | `0x4b` | **K**  | `cmp al,0x4b` |
| 2     | `0x53` | **S**  | `cmp al,0x53` |
| 3     | `0x7b` | **{**  | `cmp al,0x7b` |
| 4     | `0x68` | **h**  | `cmp al,0x68` |
| 5     | `0x31` | **1**  | `cmp al,0x31` |
| 6     | `0x64` | **d**  | `cmp al,0x64` |
| 7     | `0x64` | **d**  | `cmp al,0x64` |
| 8     | `0x33` | **3**  | `cmp al,0x33` |
| 9     | `0x6e` | **n**  | `cmp al,0x6e` |
| 10    | `0x5f` | **\_** | `cmp al,0x5f` |
| 11    | `0x31` | **1**  | `cmp al,0x31` |
| 12    | `0x6e` | **n**  | `cmp al,0x6e` |
| 13    | `0x5f` | **\_** | `cmp al,0x5f` |
| 14    | `0x72` | **r**  | `cmp al,0x72` |
| 15    | `0x34` | **4**  | `cmp al,0x34` |
| 16    | `0x6d` | **m**  | `cmp al,0x6d` |
| 17    | `0x5f` | **\_** | `cmp al,0x5f` |
| 18    | `0x36` | **6**  | `cmp al,0x36` |
| 19    | `0x37` | **7**  | `cmp al,0x37` |
| 20    | `0x7d` | **}**  | `cmp al,0x7d` |
| 21    | `0x00` | (null) | `test al,al`  |

::: tip Flag Found!
**LKS{h1dd3n_1n_r4m_67}**
:::

---

## Automated Solution

Hacker sejati mengautomasi tugasnya! Berikut solver script Python:

```python
#!/usr/bin/env python3
"""
Solver untuk challenge binary dengan self-decrypting code
Binary menggunakan XOR 0xAA untuk menyembunyikan logika verifikasi flag
"""

import sys
import re
from pathlib import Path

def get_section_info(binary_path):
    """Parse ELF header untuk mendapatkan info section .data"""
    with open(binary_path, 'rb') as f:
        data = f.read()

    # ELF header parsing sederhana
    if data[:4] != b'\x7fELF':
        raise ValueError("Bukan file ELF valid")

    is_64bit = data[4] == 2
    if not is_64bit:
        raise ValueError("Hanya support ELF 64-bit")

    # Section header offset dan info
    e_shoff = int.from_bytes(data[0x28:0x30], 'little')
    e_shentsize = int.from_bytes(data[0x3a:0x3c], 'little')
    e_shnum = int.from_bytes(data[0x3c:0x3e], 'little')
    e_shstrndx = int.from_bytes(data[0x3e:0x40], 'little')

    # String table section
    shstr_offset = e_shoff + e_shstrndx * e_shentsize
    shstr_sh_offset = int.from_bytes(data[shstr_offset+0x18:shstr_offset+0x20], 'little')

    # Cari section .data
    for i in range(e_shnum):
        sh_offset = e_shoff + i * e_shentsize
        sh_name_idx = int.from_bytes(data[sh_offset:sh_offset+4], 'little')

        # Baca nama section
        name_end = data.find(b'\x00', shstr_sh_offset + sh_name_idx)
        name = data[shstr_sh_offset + sh_name_idx:name_end].decode('ascii')

        if name == '.data':
            sh_addr = int.from_bytes(data[sh_offset+0x10:sh_offset+0x18], 'little')
            sh_offset_file = int.from_bytes(data[sh_offset+0x18:sh_offset+0x20], 'little')
            sh_size = int.from_bytes(data[sh_offset+0x20:sh_offset+0x28], 'little')
            return {
                'vaddr': sh_addr,
                'offset': sh_offset_file,
                'size': sh_size
            }

    raise ValueError("Section .data tidak ditemukan")

def find_encrypted_code_params(binary_path):
    """Cari parameter encrypted code dari disassembly main()"""
    with open(binary_path, 'rb') as f:
        data = f.read()

    # Pattern untuk mencari: movq $size, -0x10(%rbp) dan mov $addr, %esi (memcpy source)
    # Kita cari pattern XOR key juga: xor $0xNN, %edx

    # Cari XOR key - pattern: 83 f2 XX (xor $XX, %edx)
    xor_pattern = re.compile(rb'\x83\xf2(.)', re.DOTALL)
    xor_match = xor_pattern.search(data)
    xor_key = xor_match.group(1)[0] if xor_match else 0xAA

    # Cari size - pattern: 48 c7 45 f0 XX XX 00 00 (movq $size, -0x10(%rbp))
    size_pattern = re.compile(rb'\x48\xc7\x45\xf0(....)' , re.DOTALL)
    size_match = size_pattern.search(data)
    size = int.from_bytes(size_match.group(1), 'little') if size_match else 0x21f

    # Cari source address untuk memcpy - pattern: be XX XX XX XX (mov $addr, %esi)
    # Biasanya setelah mov -0x10(%rbp), %rdx
    memcpy_pattern = re.compile(rb'\xbe(....)\x48\x89\xc7\xe8', re.DOTALL)
    memcpy_match = memcpy_pattern.search(data)
    src_addr = int.from_bytes(memcpy_match.group(1), 'little') if memcpy_match else 0x403060

    return {
        'src_addr': src_addr,
        'size': size,
        'xor_key': xor_key
    }

def decrypt_shellcode(binary_path):
    """Dekripsi shellcode dari binary"""
    with open(binary_path, 'rb') as f:
        binary_data = f.read()

    # Dapatkan info
    section_info = get_section_info(binary_path)
    params = find_encrypted_code_params(binary_path)

    # Hitung file offset dari virtual address
    file_offset = section_info['offset'] + (params['src_addr'] - section_info['vaddr'])

    # Ekstrak dan dekripsi
    encrypted = binary_data[file_offset:file_offset + params['size']]
    decrypted = bytes([b ^ params['xor_key'] for b in encrypted])

    return decrypted, params

def extract_flag_from_shellcode(shellcode):
    """Ekstrak flag dari shellcode dengan parsing instruksi CMP"""
    flag_chars = []
    i = 0

    while i < len(shellcode) - 2:
        # Pattern: 3c XX (cmp $XX, %al)
        if shellcode[i] == 0x3c:
            char_val = shellcode[i + 1]
            # Skip jika bukan printable ASCII
            if 0x20 <= char_val <= 0x7e:
                flag_chars.append(chr(char_val))
            i += 2
        # Pattern: 84 c0 (test %al, %al) - null terminator check
        elif shellcode[i:i+2] == b'\x84\xc0':
            break
        else:
            i += 1

    return ''.join(flag_chars)

def solve(binary_path):
    """Main solver function"""
    print(f"[*] Analyzing: {binary_path}")

    # Dekripsi shellcode
    shellcode, params = decrypt_shellcode(binary_path)
    print(f"[+] Found encrypted code at 0x{params['src_addr']:x}")
    print(f"[+] Size: {params['size']} bytes")
    print(f"[+] XOR key: 0x{params['xor_key']:02x}")

    # Ekstrak flag
    flag = extract_flag_from_shellcode(shellcode)
    print(f"\n[✓] FLAG: {flag}")

    return flag

if __name__ == "__main__":
    binary = sys.argv[1] if len(sys.argv) > 1 else "chall"

    if not Path(binary).exists():
        print(f"[-] File tidak ditemukan: {binary}")
        sys.exit(1)

    solve(binary)
```

### Running the Solver

```bash
❯ python3 solver.py chall
[*] Analyzing: chall
[+] Found encrypted code at 0x403060
[+] Size: 543 bytes
[+] XOR key: 0xaa

[✓] FLAG: LKS{h1dd3n_1n_r4m_67}
```

---

## Verification

```bash
❯ ./chall LKS{h1dd3n_1n_r4m_67}
Memeriksa flag...
Correct!
```

::: success Flag Captured! 🎉
**LKS{h1dd3n_1n_r4m_67}**
:::

---

## Key Takeaways

### Teknik yang Dipelajari

1. **Self-Modifying Code Detection**
    - Identifikasi melalui string analysis (`mprotect`, memory allocation)
    - Understanding memory permission changes

2. **Dynamic Analysis dengan GDB**
    - Setting strategic breakpoints
    - Inspecting runtime memory
    - Reading decrypted assembly code

3. **XOR Decryption**
    - Simple but effective obfuscation
    - Reversible dengan key yang sama

4. **Binary Parsing**
    - ELF header structure
    - Section parsing (.data section)
    - Pattern matching dalam binary data

### Tools Used

- `file` - Binary identification
- `strings` - String extraction
- `GDB/pwndbg` - Dynamic analysis
- `Python` - Automated solving

---

## References

- [ELF Format Specification](https://refspecs.linuxfoundation.org/elf/elf.pdf)
- [Linux System Calls - mmap, mprotect](https://man7.org/linux/man-pages/man2/mmap.2.html)
- [x86-64 Assembly Reference](https://www.felixcloutier.com/x86/)

---

<div style="text-align: center; margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px;">
  <h3 style="color: white; margin: 0;">Challenge Solved! 🚀</h3>
  <p style="color: rgba(255,255,255,0.9); margin: 0.5rem 0 0 0;">Happy Hacking!</p>
</div>
