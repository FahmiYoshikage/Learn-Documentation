# 📖 Linux x64 System Call Reference

Referensi lengkap untuk System Call di arsitektur Linux 64-bit (x86_64). Dokumen ini mencakup nomor syscall, nama fungsi, dan parameter yang diperlukan untuk exploitation dan reverse engineering.

## 🔍 Penjelasan Singkat

**System Call** adalah cara program user-space meminta layanan dari kernel Linux. Dalam arsitektur x64, parameter dikirimkan melalui register dengan urutan:

1. **%rdi** → Argumen pertama
2. **%rsi** → Argumen kedua
3. **%rdx** → Argumen ketiga
4. **%r10** → Argumen keempat
5. **%r8** → Argumen kelima
6. **%r9** → Argumen keenam

### Cara Melakukan System Call

```asm
mov rax, 59          ; Nomor syscall (execve)
mov rdi, bin_sh_ptr  ; Argumen 1: pointer ke "/bin/sh"
xor rsi, rsi         ; Argumen 2: NULL (argv)
xor rdx, rdx         ; Argumen 3: NULL (envp)
syscall              ; Panggil kernel
```

**Return Value**: Hasil syscall dikembalikan di register **%rax**. Jika error, nilai negatif (errno).

---

## 📋 Syscall yang Sering Digunakan dalam Exploitation

| Syscall          | Nomor | Kegunaan                          | Contoh Penggunaan                         |
| ---------------- | ----- | --------------------------------- | ----------------------------------------- |
| **sys_read**     | 0     | Membaca data dari file descriptor | Membaca input dari stdin (fd=0)           |
| **sys_write**    | 1     | Menulis data ke file descriptor   | Menulis output ke stdout (fd=1)           |
| **sys_open**     | 2     | Membuka file                      | Membuka `/etc/passwd` untuk dibaca        |
| **sys_execve**   | 59    | Menjalankan program baru          | **Spawn shell `/bin/sh`** 🚀              |
| **sys_exit**     | 60    | Keluar dari program               | Mengakhiri proses dengan exit code        |
| **sys_mprotect** | 10    | Mengubah proteksi memori          | Membuat stack executable                  |
| **sys_dup2**     | 33    | Duplikasi file descriptor         | Redirect stdin/stdout untuk reverse shell |

---

## 📊 Tabel Lengkap System Call Linux x64

### File Operations (0-20)

| %rax | System call  | %rdi                  | %rsi                     | %rdx                | %r10       | %r8 | %r9 |
| ---- | ------------ | --------------------- | ------------------------ | ------------------- | ---------- | --- | --- |
| 0    | sys_read     | unsigned int fd       | char \*buf               | size_t count        | -          | -   | -   |
| 1    | sys_write    | unsigned int fd       | const char \*buf         | size_t count        | -          | -   | -   |
| 2    | sys_open     | const char \*filename | int flags                | int mode            | -          | -   | -   |
| 3    | sys_close    | unsigned int fd       | -                        | -                   | -          | -   | -   |
| 4    | sys_stat     | const char \*filename | struct stat \*statbuf    | -                   | -          | -   | -   |
| 5    | sys_fstat    | unsigned int fd       | struct stat \*statbuf    | -                   | -          | -   | -   |
| 6    | sys_lstat    | const char \*filename | struct stat \*statbuf    | -                   | -          | -   | -   |
| 7    | sys_poll     | struct poll_fd \*ufds | unsigned int nfds        | long timeout_msecs  | -          | -   | -   |
| 8    | sys_lseek    | unsigned int fd       | off_t offset             | unsigned int origin | -          | -   | -   |
| 17   | sys_pread64  | unsigned long fd      | char \*buf               | size_t count        | loff_t pos | -   | -   |
| 18   | sys_pwrite64 | unsigned int fd       | const char \*buf         | size_t count        | loff_t pos | -   | -   |
| 19   | sys_readv    | unsigned long fd      | const struct iovec \*vec | unsigned long vlen  | -          | -   | -   |
| 20   | sys_writev   | unsigned long fd      | const struct iovec \*vec | unsigned long vlen  | -          | -   | -   |

### Memory Management (9-12, 25-28)

| %rax | System call  | %rdi                | %rsi                  | %rdx                  | %r10                | %r8                    | %r9               |
| ---- | ------------ | ------------------- | --------------------- | --------------------- | ------------------- | ---------------------- | ----------------- |
| 9    | sys_mmap     | unsigned long addr  | unsigned long len     | unsigned long prot    | unsigned long flags | unsigned long fd       | unsigned long off |
| 10   | sys_mprotect | unsigned long start | size_t len            | unsigned long prot    | -                   | -                      | -                 |
| 11   | sys_munmap   | unsigned long addr  | size_t len            | -                     | -                   | -                      | -                 |
| 12   | sys_brk      | unsigned long brk   | -                     | -                     | -                   | -                      | -                 |
| 25   | sys_mremap   | unsigned long addr  | unsigned long old_len | unsigned long new_len | unsigned long flags | unsigned long new_addr | -                 |
| 26   | sys_msync    | unsigned long start | size_t len            | int flags             | -                   | -                      | -                 |
| 27   | sys_mincore  | unsigned long start | size_t len            | unsigned char \*vec   | -                   | -                      | -                 |
| 28   | sys_madvise  | unsigned long start | size_t len_in         | int behavior          | -                   | -                      | -                 |

### Process Management (39, 56-62)

| %rax | System call | %rdi                      | %rsi                      | %rdx                      | %r10               | %r8              | %r9 |
| ---- | ----------- | ------------------------- | ------------------------- | ------------------------- | ------------------ | ---------------- | --- |
| 39   | sys_getpid  | -                         | -                         | -                         | -                  | -                | -   |
| 56   | sys_clone   | unsigned long clone_flags | unsigned long newsp       | void \*parent_tid         | void \*child_tid   | unsigned int tid | -   |
| 57   | sys_fork    | -                         | -                         | -                         | -                  | -                | -   |
| 58   | sys_vfork   | -                         | -                         | -                         | -                  | -                | -   |
| 59   | sys_execve  | const char \*filename     | const char \*const argv[] | const char \*const envp[] | -                  | -                | -   |
| 60   | sys_exit    | int error_code            | -                         | -                         | -                  | -                | -   |
| 61   | sys_wait4   | pid_t upid                | int \*stat_addr           | int options               | struct rusage \*ru | -                | -   |
| 62   | sys_kill    | pid_t pid                 | int sig                   | -                         | -                  | -                | -   |

### File Descriptor Operations (21-23, 32-33, 72-78)

| %rax | System call   | %rdi                  | %rsi               | %rdx              | %r10 | %r8 | %r9 |
| ---- | ------------- | --------------------- | ------------------ | ----------------- | ---- | --- | --- |
| 21   | sys_access    | const char \*filename | int mode           | -                 | -    | -   | -   |
| 22   | sys_pipe      | int \*filedes         | -                  | -                 | -    | -   | -   |
| 32   | sys_dup       | unsigned int fildes   | -                  | -                 | -    | -   | -   |
| 33   | sys_dup2      | unsigned int oldfd    | unsigned int newfd | -                 | -    | -   | -   |
| 72   | sys_fcntl     | unsigned int fd       | unsigned int cmd   | unsigned long arg | -    | -   | -   |
| 73   | sys_flock     | unsigned int fd       | unsigned int cmd   | -                 | -    | -   | -   |
| 74   | sys_fsync     | unsigned int fd       | -                  | -                 | -    | -   | -   |
| 75   | sys_fdatasync | unsigned int fd       | -                  | -                 | -    | -   | -   |

### Directory & File Operations (79-98)

| %rax | System call  | %rdi                  | %rsi                 | %rdx        | %r10 | %r8 | %r9 |
| ---- | ------------ | --------------------- | -------------------- | ----------- | ---- | --- | --- |
| 79   | sys_getcwd   | char \*buf            | unsigned long size   | -           | -    | -   | -   |
| 80   | sys_chdir    | const char \*filename | -                    | -           | -    | -   | -   |
| 81   | sys_fchdir   | unsigned int fd       | -                    | -           | -    | -   | -   |
| 82   | sys_rename   | const char \*oldname  | const char \*newname | -           | -    | -   | -   |
| 83   | sys_mkdir    | const char \*pathname | int mode             | -           | -    | -   | -   |
| 84   | sys_rmdir    | const char \*pathname | -                    | -           | -    | -   | -   |
| 85   | sys_creat    | const char \*pathname | int mode             | -           | -    | -   | -   |
| 86   | sys_link     | const char \*oldname  | const char \*newname | -           | -    | -   | -   |
| 87   | sys_unlink   | const char \*pathname | -                    | -           | -    | -   | -   |
| 88   | sys_symlink  | const char \*oldname  | const char \*newname | -           | -    | -   | -   |
| 89   | sys_readlink | const char \*path     | char \*buf           | int bufsiz  | -    | -   | -   |
| 90   | sys_chmod    | const char \*filename | mode_t mode          | -           | -    | -   | -   |
| 91   | sys_fchmod   | unsigned int fd       | mode_t mode          | -           | -    | -   | -   |
| 92   | sys_chown    | const char \*filename | uid_t user           | gid_t group | -    | -   | -   |
| 93   | sys_fchown   | unsigned int fd       | uid_t user           | gid_t group | -    | -   | -   |
| 94   | sys_lchown   | const char \*filename | uid_t user           | gid_t group | -    | -   | -   |

### Network Operations (41-55)

| %rax | System call     | %rdi       | %rsi                             | %rdx                | %r10           | %r8                    | %r9            |
| ---- | --------------- | ---------- | -------------------------------- | ------------------- | -------------- | ---------------------- | -------------- |
| 41   | sys_socket      | int family | int type                         | int protocol        | -              | -                      | -              |
| 42   | sys_connect     | int fd     | struct sockaddr \*uservaddr      | int addrlen         | -              | -                      | -              |
| 43   | sys_accept      | int fd     | struct sockaddr \*upeer_sockaddr | int \*upeer_addrlen | -              | -                      | -              |
| 44   | sys_sendto      | int fd     | void \*buff                      | size_t len          | unsigned flags | struct sockaddr \*addr | int addr_len   |
| 45   | sys_recvfrom    | int fd     | void \*ubuf                      | size_t size         | unsigned flags | struct sockaddr \*addr | int \*addr_len |
| 46   | sys_sendmsg     | int fd     | struct msghdr \*msg              | unsigned flags      | -              | -                      | -              |
| 47   | sys_recvmsg     | int fd     | struct msghdr \*msg              | unsigned int flags  | -              | -                      | -              |
| 48   | sys_shutdown    | int fd     | int how                          | -                   | -              | -                      | -              |
| 49   | sys_bind        | int fd     | struct sockaddr \*umyaddr        | int addrlen         | -              | -                      | -              |
| 50   | sys_listen      | int fd     | int backlog                      | -                   | -              | -                      | -              |
| 51   | sys_getsockname | int fd     | struct sockaddr \*usockaddr      | int \*usockaddr_len | -              | -                      | -              |
| 52   | sys_getpeername | int fd     | struct sockaddr \*usockaddr      | int \*usockaddr_len | -              | -                      | -              |
| 53   | sys_socketpair  | int family | int type                         | int protocol        | int \*usockvec | -                      | -              |
| 54   | sys_setsockopt  | int fd     | int level                        | int optname         | char \*optval  | int optlen             | -              |
| 55   | sys_getsockopt  | int fd     | int level                        | int optname         | char \*optval  | int \*optlen           | -              |

### Signal Handling (13-15, 62, 127-131)

| %rax | System call         | %rdi                     | %rsi                         | %rdx                        | %r10              | %r8 | %r9 |
| ---- | ------------------- | ------------------------ | ---------------------------- | --------------------------- | ----------------- | --- | --- |
| 13   | sys_rt_sigaction    | int sig                  | const struct sigaction \*act | struct sigaction \*oact     | size_t sigsetsize | -   | -   |
| 14   | sys_rt_sigprocmask  | int how                  | sigset_t \*nset              | sigset_t \*oset             | size_t sigsetsize | -   | -   |
| 15   | sys_rt_sigreturn    | unsigned long \_\_unused | -                            | -                           | -                 | -   | -   |
| 127  | sys_rt_sigpending   | sigset_t \*set           | size_t sigsetsize            | -                           | -                 | -   | -   |
| 128  | sys_rt_sigtimedwait | const sigset_t \*uthese  | siginfo_t \*uinfo            | const struct timespec \*uts | size_t sigsetsize | -   | -   |
| 129  | sys_rt_sigqueueinfo | pid_t pid                | int sig                      | siginfo_t \*uinfo           | -                 | -   | -   |
| 130  | sys_rt_sigsuspend   | sigset_t \*unewset       | size_t sigsetsize            | -                           | -                 | -   | -   |
| 131  | sys_sigaltstack     | const stack_t \*uss      | stack_t \*uoss               | -                           | -                 | -   | -   |

### System Information (63, 95-104, 110-112, 186)

| %rax | System call      | %rdi                      | %rsi                 | %rdx | %r10 | %r8 | %r9 |
| ---- | ---------------- | ------------------------- | -------------------- | ---- | ---- | --- | --- |
| 63   | sys_uname        | struct old_utsname \*name | -                    | -    | -    | -   | -   |
| 95   | sys_umask        | int mask                  | -                    | -    | -    | -   | -   |
| 96   | sys_gettimeofday | struct timeval \*tv       | struct timezone \*tz | -    | -    | -   | -   |
| 97   | sys_getrlimit    | unsigned int resource     | struct rlimit \*rlim | -    | -    | -   | -   |
| 98   | sys_getrusage    | int who                   | struct rusage \*ru   | -    | -    | -   | -   |
| 99   | sys_sysinfo      | struct sysinfo \*info     | -                    | -    | -    | -   | -   |
| 100  | sys_times        | struct tms \*tbuf         | -                    | -    | -    | -   | -   |
| 102  | sys_getuid       | -                         | -                    | -    | -    | -   | -   |
| 104  | sys_getgid       | -                         | -                    | -    | -    | -   | -   |
| 107  | sys_geteuid      | -                         | -                    | -    | -    | -   | -   |
| 108  | sys_getegid      | -                         | -                    | -    | -    | -   | -   |
| 110  | sys_getppid      | -                         | -                    | -    | -    | -   | -   |
| 111  | sys_getpgrp      | -                         | -                    | -    | -    | -   | -   |
| 112  | sys_setsid       | -                         | -                    | -    | -    | -   | -   |
| 186  | sys_gettid       | -                         | -                    | -    | -    | -   | -   |

### User/Group Operations (102-126)

| %rax | System call   | %rdi           | %rsi              | %rdx         | %r10 | %r8 | %r9 |
| ---- | ------------- | -------------- | ----------------- | ------------ | ---- | --- | --- |
| 105  | sys_setuid    | uid_t uid      | -                 | -            | -    | -   | -   |
| 106  | sys_setgid    | gid_t gid      | -                 | -            | -    | -   | -   |
| 109  | sys_setpgid   | pid_t pid      | pid_t pgid        | -            | -    | -   | -   |
| 113  | sys_setreuid  | uid_t ruid     | uid_t euid        | -            | -    | -   | -   |
| 114  | sys_setregid  | gid_t rgid     | gid_t egid        | -            | -    | -   | -   |
| 115  | sys_getgroups | int gidsetsize | gid_t \*grouplist | -            | -    | -   | -   |
| 116  | sys_setgroups | int gidsetsize | gid_t \*grouplist | -            | -    | -   | -   |
| 117  | sys_setresuid | uid_t \*ruid   | uid_t \*euid      | uid_t \*suid | -    | -   | -   |
| 118  | sys_getresuid | uid_t \*ruid   | uid_t \*euid      | uid_t \*suid | -    | -   | -   |
| 119  | sys_setresgid | gid_t rgid     | gid_t egid        | gid_t sgid   | -    | -   | -   |
| 120  | sys_getresgid | gid_t \*rgid   | gid_t \*egid      | gid_t \*sgid | -    | -   | -   |
| 121  | sys_getpgid   | pid_t pid      | -                 | -            | -    | -   | -   |
| 122  | sys_setfsuid  | uid_t uid      | -                 | -            | -    | -   | -   |
| 123  | sys_setfsgid  | gid_t gid      | -                 | -            | -    | -   | -   |
| 124  | sys_getsid    | pid_t pid      | -                 | -            | -    | -   | -   |

### Extended Attributes (188-199)

| %rax | System call      | %rdi                  | %rsi              | %rdx               | %r10        | %r8       | %r9 |
| ---- | ---------------- | --------------------- | ----------------- | ------------------ | ----------- | --------- | --- |
| 188  | sys_setxattr     | const char \*pathname | const char \*name | const void \*value | size_t size | int flags | -   |
| 189  | sys_lsetxattr    | const char \*pathname | const char \*name | const void \*value | size_t size | int flags | -   |
| 190  | sys_fsetxattr    | int fd                | const char \*name | const void \*value | size_t size | int flags | -   |
| 191  | sys_getxattr     | const char \*pathname | const char \*name | void \*value       | size_t size | -         | -   |
| 192  | sys_lgetxattr    | const char \*pathname | const char \*name | void \*value       | size_t size | -         | -   |
| 193  | sys_fgetxattr    | int fd                | const char \*name | void \*value       | size_t size | -         | -   |
| 194  | sys_listxattr    | const char \*pathname | char \*list       | size_t size        | -           | -         | -   |
| 195  | sys_llistxattr   | const char \*pathname | char \*list       | size_t size        | -           | -         | -   |
| 196  | sys_flistxattr   | int fd                | char \*list       | size_t size        | -           | -         | -   |
| 197  | sys_removexattr  | const char \*pathname | const char \*name | -                  | -           | -         | -   |
| 198  | sys_lremovexattr | const char \*pathname | const char \*name | -                  | -           | -         | -   |
| 199  | sys_fremovexattr | int fd                | const char \*name | -                  | -           | -         | -   |

### Timer & Clock Operations (35-38, 222-230)

| %rax | System call          | %rdi                        | %rsi                               | %rdx                                  | %r10                            | %r8 | %r9 |
| ---- | -------------------- | --------------------------- | ---------------------------------- | ------------------------------------- | ------------------------------- | --- | --- |
| 35   | sys_nanosleep        | struct timespec \*rqtp      | struct timespec \*rmtp             | -                                     | -                               | -   | -   |
| 36   | sys_getitimer        | int which                   | struct itimerval \*value           | -                                     | -                               | -   | -   |
| 37   | sys_alarm            | unsigned int seconds        | -                                  | -                                     | -                               | -   | -   |
| 38   | sys_setitimer        | int which                   | struct itimerval \*value           | struct itimerval \*ovalue             | -                               | -   | -   |
| 222  | sys_timer_create     | const clockid_t which_clock | struct sigevent \*timer_event_spec | timer_t \*created_timer_id            | -                               | -   | -   |
| 223  | sys_timer_settime    | timer_t timer_id            | int flags                          | const struct itimerspec \*new_setting | struct itimerspec \*old_setting | -   | -   |
| 224  | sys_timer_gettime    | timer_t timer_id            | struct itimerspec \*setting        | -                                     | -                               | -   | -   |
| 225  | sys_timer_getoverrun | timer_t timer_id            | -                                  | -                                     | -                               | -   | -   |
| 226  | sys_timer_delete     | timer_t timer_id            | -                                  | -                                     | -                               | -   | -   |
| 227  | sys_clock_settime    | const clockid_t which_clock | const struct timespec \*tp         | -                                     | -                               | -   | -   |
| 228  | sys_clock_gettime    | const clockid_t which_clock | struct timespec \*tp               | -                                     | -                               | -   | -   |
| 229  | sys_clock_getres     | const clockid_t which_clock | struct timespec \*tp               | -                                     | -                               | -   | -   |
| 230  | sys_clock_nanosleep  | const clockid_t which_clock | int flags                          | const struct timespec \*rqtp          | struct timespec \*rmtp          | -   | -   |

### Advanced File Operations (257-269)

| %rax | System call    | %rdi                 | %rsi                  | %rdx                    | %r10                 | %r8       | %r9 |
| ---- | -------------- | -------------------- | --------------------- | ----------------------- | -------------------- | --------- | --- |
| 257  | sys_openat     | int dfd              | const char \*filename | int flags               | int mode             | -         | -   |
| 258  | sys_mkdirat    | int dfd              | const char \*pathname | int mode                | -                    | -         | -   |
| 259  | sys_mknodat    | int dfd              | const char \*filename | int mode                | unsigned dev         | -         | -   |
| 260  | sys_fchownat   | int dfd              | const char \*filename | uid_t user              | gid_t group          | int flag  | -   |
| 261  | sys_futimesat  | int dfd              | const char \*filename | struct timeval \*utimes | -                    | -         | -   |
| 262  | sys_newfstatat | int dfd              | const char \*filename | struct stat \*statbuf   | int flag             | -         | -   |
| 263  | sys_unlinkat   | int dfd              | const char \*pathname | int flag                | -                    | -         | -   |
| 264  | sys_renameat   | int oldfd            | const char \*oldname  | int newfd               | const char \*newname | -         | -   |
| 265  | sys_linkat     | int oldfd            | const char \*oldname  | int newfd               | const char \*newname | int flags | -   |
| 266  | sys_symlinkat  | const char \*oldname | int newfd             | const char \*newname    | -                    | -         | -   |
| 267  | sys_readlinkat | int dfd              | const char \*pathname | char \*buf              | int bufsiz           | -         | -   |
| 268  | sys_fchmodat   | int dfd              | const char \*filename | mode_t mode             | -                    | -         | -   |
| 269  | sys_faccessat  | int dfd              | const char \*filename | int mode                | -                    | -         | -   |

### Epoll Operations (213, 232-233, 281, 291)

| %rax | System call       | %rdi      | %rsi                        | %rdx          | %r10                       | %r8                      | %r9               |
| ---- | ----------------- | --------- | --------------------------- | ------------- | -------------------------- | ------------------------ | ----------------- |
| 213  | sys_epoll_create  | int size  | -                           | -             | -                          | -                        | -                 |
| 232  | sys_epoll_wait    | int epfd  | struct epoll_event \*events | int maxevents | int timeout                | -                        | -                 |
| 233  | sys_epoll_ctl     | int epfd  | int op                      | int fd        | struct epoll_event \*event | -                        | -                 |
| 281  | sys_epoll_pwait   | int epfd  | struct epoll_event \*events | int maxevents | int timeout                | const sigset_t \*sigmask | size_t sigsetsize |
| 291  | sys_epoll_create1 | int flags | -                           | -             | -                          | -                        | -                 |

### Miscellaneous Operations

| %rax | System call         | %rdi                  | %rsi                             | %rdx                | %r10               | %r8 | %r9 |
| ---- | ------------------- | --------------------- | -------------------------------- | ------------------- | ------------------ | --- | --- |
| 16   | sys_ioctl           | unsigned int fd       | unsigned int cmd                 | unsigned long arg   | -                  | -   | -   |
| 34   | sys_pause           | -                     | -                                | -                   | -                  | -   | -   |
| 40   | sys_sendfile        | int out_fd            | int in_fd                        | off_t \*offset      | size_t count       | -   | -   |
| 76   | sys_truncate        | const char \*path     | long length                      | -                   | -                  | -   | -   |
| 77   | sys_ftruncate       | unsigned int fd       | unsigned long length             | -                   | -                  | -   | -   |
| 78   | sys_getdents        | unsigned int fd       | struct linux_dirent \*dirent     | unsigned int count  | -                  | -   | -   |
| 101  | sys_ptrace          | long request          | long pid                         | unsigned long addr  | unsigned long data | -   | -   |
| 103  | sys_syslog          | int type              | char \*buf                       | int len             | -                  | -   | -   |
| 132  | sys_utime           | char \*filename       | struct utimbuf \*times           | -                   | -                  | -   | -   |
| 133  | sys_mknod           | const char \*filename | umode_t mode                     | unsigned dev        | -                  | -   | -   |
| 159  | sys_adjtimex        | struct timex \*txc_p  | -                                | -                   | -                  | -   | -   |
| 160  | sys_setrlimit       | unsigned int resource | struct rlimit \*rlim             | -                   | -                  | -   | -   |
| 161  | sys_chroot          | const char \*filename | -                                | -                   | -                  | -   | -   |
| 162  | sys_sync            | -                     | -                                | -                   | -                  | -   | -   |
| 163  | sys_acct            | const char \*name     | -                                | -                   | -                  | -   | -   |
| 164  | sys_settimeofday    | struct timeval \*tv   | struct timezone \*tz             | -                   | -                  | -   | -   |
| 187  | sys_readahead       | int fd                | loff_t offset                    | size_t count        | -                  | -   | -   |
| 200  | sys_tkill           | pid_t pid             | int sig                          | -                   | -                  | -   | -   |
| 201  | sys_time            | time_t \*tloc         | -                                | -                   | -                  | -   | -   |
| 217  | sys_getdents64      | unsigned int fd       | struct linux_dirent64 \*dirent   | unsigned int count  | -                  | -   | -   |
| 218  | sys_set_tid_address | int \*tidptr          | -                                | -                   | -                  | -   | -   |
| 219  | sys_restart_syscall | -                     | -                                | -                   | -                  | -   | -   |
| 231  | sys_exit_group      | int error_code        | -                                | -                   | -                  | -   | -   |
| 234  | sys_tgkill          | pid_t tgid            | pid_t pid                        | int sig             | -                  | -   | -   |
| 235  | sys_utimes          | char \*filename       | struct timeval \*utimes          | -                   | -                  | -   | -   |
| 284  | sys_eventfd         | unsigned int count    | -                                | -                   | -                  | -   | -   |
| 285  | sys_fallocate       | long fd               | long mode                        | loff_t offset       | loff_t len         | -   | -   |
| 288  | sys_accept4         | int fd                | struct sockaddr \*upeer_sockaddr | int \*upeer_addrlen | int flags          | -   | -   |
| 290  | sys_eventfd2        | unsigned int count    | int flags                        | -                   | -                  | -   | -   |
| 292  | sys_dup3            | unsigned int oldfd    | unsigned int newfd               | int flags           | -                  | -   | -   |
| 293  | sys_pipe2           | int \*filedes         | int flags                        | -                   | -                  | -   | -   |
| 294  | sys_inotify_init1   | int flags             | -                                | -                   | -                  | -   | -   |

---

## 💡 Tips & Catatan Penting

### Untuk Shellcode Development

1. **Hindari Null Bytes** (`\x00`) - Gunakan XOR untuk membuat nilai 0:

    ```asm
    xor rsi, rsi    ; Sama dengan mov rsi, 0, tapi tanpa null byte
    ```

2. **Syscall Minimal untuk Shell**:

    ```asm
    ; execve("/bin/sh", NULL, NULL)
    mov rax, 59
    lea rdi, [rel binsh]
    xor rsi, rsi
    xor rdx, rdx
    syscall

    binsh: db "/bin/sh", 0
    ```

3. **Return Value**:
    - Sukses: `rax >= 0`
    - Error: `rax < 0` (nilai negatif errno)

### Untuk Ret2Libc/ROP

1. **sys_execve (59)** adalah target utama untuk spawn shell
2. **sys_dup2 (33)** berguna untuk redirect file descriptor (reverse shell)
3. **sys_mprotect (10)** dapat mengubah proteksi memori (NX bypass)

### Syscall yang Deprecated/Removed

| Nomor   | Syscall                                                                              | Status                           |
| ------- | ------------------------------------------------------------------------------------ | -------------------------------- |
| 134     | sys_uselib                                                                           | NOT IMPLEMENTED                  |
| 174     | sys_create_module                                                                    | REMOVED IN Linux 2.6             |
| 177     | sys_get_kernel_syms                                                                  | REMOVED IN Linux 2.6             |
| 178     | sys_query_module                                                                     | REMOVED IN Linux 2.6             |
| 180-185 | sys_nfsservctl, sys_getpmsg, sys_putpmsg, sys_afs_syscall, sys_tuxcall, sys_security | NOT IMPLEMENTED                  |
| 205     | sys_set_thread_area                                                                  | NOT IMPLEMENTED (Use arch_prctl) |
| 211     | sys_get_thread_area                                                                  | NOT IMPLEMENTED (Use arch_prctl) |
| 214-215 | sys_epoll_ctl_old, sys_epoll_wait_old                                                | NOT IMPLEMENTED                  |
| 236     | sys_vserver                                                                          | NOT IMPLEMENTED                  |

---

## 📚 Referensi

- [Linux Syscall Reference](https://filippo.io/linux-syscall-table/)
- [Linux Kernel Source - syscall_64.tbl](https://github.com/torvalds/linux/blob/master/arch/x86/entry/syscalls/syscall_64.tbl)
- [Calling Convention x64](https://en.wikipedia.org/wiki/X86_calling_conventions#System_V_AMD64_ABI)
- [Shell-Storm Shellcode Database](http://shell-storm.org/shellcode/)

---

**Catatan**: Tabel ini mencakup syscall hingga nomor ~300. Untuk daftar lengkap dan versi terbaru, lihat kernel source code.
