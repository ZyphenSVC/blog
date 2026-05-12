---
title: "Learning Bin Exp from Scratch"
date: "2024-05-25T11:59:59.999Z"
description: "Reversing Basics"
author: "ZyphenSVC"
slug: "posts/binexp/2024-05-25-binexp"
---

> Forenote

I'm bored... Might as well become a god of binary exploitation.

This would not be possible if it wasnt for [Nightmare by guyinatuxedo](https://guyinatuxedo.github.io/index.html). This series is a compilation of my summarized notes and remarks done by me and me alone.

# Assembly

```c
#include <stdio.h>

void main(void)
{
    puts("Hello World!");
}
```

For this code we can get the following assembly code by running `objdump -D a.out -M intel | less`

```armasm
0000000000001149 <main>:
    1149:       f3 0f 1e fa             endbr64
    114d:       55                      push   rbp
    114e:       48 89 e5                mov    rbp,rsp
    1151:       48 8d 3d ac 0e 00 00    lea    rdi,[rip+0xeac]        # 2004 <_IO_stdin_used+0x4>
    1158:       e8 f3 fe ff ff          call   1050 <puts@plt>
    115d:       90                      nop
    115e:       5d                      pop    rbp
    115f:       c3                      ret
```

Note there are three pointers that the computer uses: 
 - 

```
rbp : Base Pointer
rsp : Stack Pointer
rip : Instruction Pointer
rdi:    First Argument
rsi:    Second Argument
rdx:    Third Argument
rcx:    Fourth Argument
r8:     Fifth Argument
r9:     Sixth Argument
```

With this in mind we have that rbp is pushed into the stack with the infromation in the first argument which is our "Hello World!". Then executed as `puts()`.

| 8 Byte Register | Lower 4 Bytes | Lower 2 Bytes | Lower Byte   |
|-----------------|---------------|---------------|--------------|
| rsp             |     ebp       |     bp        |     bpl      |
| rsp             | esp           | sp            | spl          |
| rip             | eip           | ax            | al           |
| rax             | eax           | bx            | bl           |
| rbx             | ebx           | cx            | cl           |
| rcx             | ecx           | dx            | dl           |
| rdx             | edx           | si            | sil          |
| rsi             | esi           | di            | dil          |
| rdi             | edi           | r8w           | r8b          |
| r8              | r8d           | r9w           | r9b          |
| r9              | r9d           | r10w          | r10b         |
| r10             | r10d          | r11w          | r11b         |
| r11             | r11d          | r12w          | r12b         |
| r12             | r12d          | r13w          | r13b         |
| r13             | r13d          | r14w          | r14b         |
| r14             | r14d          | r15w          | r15b         |
| r15             | r15d          |               |              |

With this in mind, we can use this to see how especially large variables of data are handled within the stack. For example a flag.

## Stack

Look at the following piece of code. We are going to show how variables are injected and accessed from the stack.

```c
#include <stdio.h>

void main(void)
{
    int x = 5;
    puts("hi");
}
```

```armasm
0000000000001149 <main>:
    1149:       f3 0f 1e fa             endbr64
    114d:       55                      push   rbp
    114e:       48 89 e5                mov    rbp,rsp
    1151:       48 83 ec 10             sub    rsp,0x10
    1155:       c7 45 fc 05 00 00 00    mov    DWORD PTR [rbp-0x4],0x5
    115c:       48 8d 3d a1 0e 00 00    lea    rdi,[rip+0xea1]        # 2004 <_IO_stdin_used+0x4>
    1163:       e8 e8 fe ff ff          call   1050 <puts@plt>
    1168:       90                      nop
    1169:       c9                      leave
    116a:       c3                      ret
    116b:       0f 1f 44 00 00          nop    DWORD PTR [rax+rax*1+0x0]
```

Note that a `word` is two bytes of data, `dword` is four, `qword` is eight.

Look and see that we moved four bytes of data onto the stack with a `base pointer - 0x4` at position `0x5`. 

Note that the bounds of the stack is between `rbp` and `rsp`. Think of `rbp` as the base of the stack, meaning bottom, and the `rsp` as ceiling (seiling), or top.

## Flags

```
00:     Carry Flag
01:     always 1
02:     Parity Flag
03:     always 0
04:     Adjust Flag
05:     always 0
06:     Zero Flag
07:     Sign Flag
08:     Trap Flag
09:     Interruption Flag     
10:     Direction Flag
11:     Overflow Flag
12:     I/O Privilege Field lower bit
13:     I/O Privilege Field higher bit
14:     Nested Task Flag
15:     Resume Flag
```

## Instructions

#### mov

Moves one register to another.

```armasm
mov rax, rdx
```

#### dereference

Dereferences the register within the brackets. Deals with pointers.

```armasm
mov rax, [rdx]
```

#### lea

Calcuates the address of the second operand and moves that address into the first.

```armasm
lea rdi, [rbx+0x10]
```

#### add

Adds two register values together in a sum. 

```armasm
add rax, rdx
```

#### sub

Subtracts two register values together.

```armasm
sub rsp, 0x10
```

#### xor

Xors and stores the result in the first operation.

```armasm
xor rdx, rax
```

#### push

Pushes instruction to stack, will make stack grow by 8 bytes for x64, or 4 for x86.

```armasm
push rax
```

#### pop

Pops the top instruction from the stack and shrinks stack by 8 bytes, or 4 for x86.

```armasm
pop rax
```

The top 8 bytes of the stack will end up in the rax register.

#### jmp

Jumps to the instruction address, used to redirect code execution.

```armasm
jmp 0x602010
```

#### call and ret

Call is similar to the jmp, but also pushes the values of rbp and rip onto the stack, then jumps to the addr. Return uses the pushed values of rbp and rip to continue execution as is.

```armasm
call 0x0
ret 0x0
```

#### cmp

Similar to sub, but doesnt storte the result in the first argument. Similar to boolean comparision in CLang. 

```armasm
cmp edx, eax
```

#### jnz and jz

"Jump if not zero" and "Jump if zero".

```armasm
xor rdx, rax
```

# Ghidra

For this first part, let's look at the [following crackme](https://crackmes.one/crackme/5b8a37a433c5d45fc286ad83).



## Windows

So first off, on a personal note always stay up to date on Ghidra. I learned from using a version 10 ghidra, it wouldn't recognize half as many ELF files as v11. 

Once imported a file and opened it, always analyze the file.

By clicking on the `window` menu on top, we can open the `bytes` window, which let's us view the hex in the chance that this may be needed. We can drag any window anywhere for it to be merged and navigated using the panels at the bottom.

If you want a seperate window, but not a merger, then drag the title bar until you see an arrow of where you want to place this new window. Or drag it out to make a standalone window!

Note that the main asm window is called the `listing` window. The disassembly window is called `decompile` window. The `.data`, `.bss` and `.text` can be found in the program trees. And finally the `symbol tree` window contains the list of our functions and labels.

## Decompilation Mechanics

We can rename the functions at the very top by right clicking and using `Edit Function Signature`.

If we use the following schematic for the function signature we can actually look at things in really similar CLang code.

```c
int main (int argc, char * * argv)
```

Note that I had to make a double pointer for argv to be considered an array.

```c
int main(int argc,char **argv)

{
  size_t sVar1;
  
  if (argc == 2) {
    sVar1 = strlen(argv[1]);
    if (sVar1 == 10) {
      if (argv[1][4] == '@') {
        puts("Nice Job!!");
        printf("flag{%s}\n",argv[1]);
      }
      else {
        usage(*argv);
      }
    }
    else {
      usage(*argv);
    }
  }
  else {
    usage(*argv);
  }
  return 0;
}
```

Our code in ghidra now looks like this! 😄

### Comments
```armasm
                             **************************************************************
                             * plate comment?                                             *
                             **************************************************************
                             precomment
        001011d3 83 7d fc 02     CMP        dword ptr [RBP + local_c],0x2                    eol comment
                             postcomment

```

We can add comments like this by right clicking a line of code and setting comments like this accordingly. We can only see the `precomment` in the actual decompile window though.

Inputting this flag into the crackme, we get the following flag

```bash
~$ ./rev50_linux64-bit abcd@efghi
Nice Job!!
flag{abcd@efghi}
```

## Windows Reversing

Now let's analyze a windows file. Same old opening up files and then we click `WindowsPE x86 Propogate External Parameters` in the analyze menu.

At this point I realized this is so much more useful for generic ghidra as well. 

We can view API References by opening up a `Symbol References` window which contains more references than the imports menu in the `Symbol Tree`.

If there is a symbolic constant, we can conver this to a more human-readable interpretation by using `Set Equate` and we can educatedly guess `CREATE_` and it should autocomplete with given strings (since most of Microsoft's process creation flags are starting the same).

We can check defined strings by opening the `Defined Strings` menu. If we want to see all references to the address, we can right click in the listing window, click on `references`, and click `Show References to Address`. 

We can even check a `function call graph` window!! Sooo many things I didnt know before that I feel like an amateur to my pro-mindset ego in HS.

If we click on the listing or decompile window with a function and press `g` key, then type the function name or addr. 

We can see a visual representation of decision points similar to IDA, which pay to win sucks btw, by opening a `Function Graph` window.

At this point, I felt like I knew nothing compared to now from my old competition days. I was only blinding guessing as a sheep.

# GDB

Now comes GDB, my favourite.

```armasm
gef➤  r
Starting program: /home/zyphen/a.out
Hello World!
[Inferior 1 (process 292) exited with code 015]
gef➤  b main
Breakpoint 1 at 0x8001149
gef➤  r
Starting program: /home/zyphen/a.out

Breakpoint 1, 0x0000000008001149 in main ()
[ Legend: Modified register | Code | Heap | Stack | String ]
───────────────────────────────────────────────────────────────────────────────────────────────────────── registers ────
$rax   : 0x0000000008001149  →  <main+0> endbr64
$rbx   : 0x0000000008001160  →  <__libc_csu_init+0> endbr64
$rcx   : 0x0000000008001160  →  <__libc_csu_init+0> endbr64
$rdx   : 0x00007ffffffed978  →  0x00007ffffffedbba  →  "SHELL=/bin/bash"
$rsp   : 0x00007ffffffed878  →  0x00007fffff5c70b3  →  <__libc_start_main+243> mov edi, eax
$rbp   : 0x0
$rsi   : 0x00007ffffffed968  →  0x00007ffffffedba7  →  "/home/zyphen/a.out"
$rdi   : 0x1
$rip   : 0x0000000008001149  →  <main+0> endbr64
$r8    : 0x0
$r9    : 0x00007fffff7c1d50  →   endbr64
$r10   : 0x00007fffff7ddf68  →  0x000000006ffffff0
$r11   : 0x00007fffff7ddf68  →  0x000000006ffffff0
$r12   : 0x0000000008001060  →  <_start+0> endbr64
$r13   : 0x00007ffffffed960  →  0x0000000000000001
$r14   : 0x0
$r15   : 0x0
$eflags: [ZERO carry PARITY adjust sign trap INTERRUPT direction overflow resume virtualx86 identification]
$cs: 0x0033 $ss: 0x002b $ds: 0x0000 $es: 0x0000 $fs: 0x0000 $gs: 0x0000
───────────────────────────────────────────────────────────────────────────────────────────────────────────── stack ────
0x00007ffffffed878│+0x0000: 0x00007fffff5c70b3  →  <__libc_start_main+243> mov edi, eax  ← $rsp
0x00007ffffffed880│+0x0008: 0x0000000000000071 ("q"?)
0x00007ffffffed888│+0x0010: 0x00007ffffffed968  →  0x00007ffffffedba7  →  "/home/zyphen/a.out"
0x00007ffffffed890│+0x0018: 0x00000001ff788618
0x00007ffffffed898│+0x0020: 0x0000000008001149  →  <main+0> endbr64
0x00007ffffffed8a0│+0x0028: 0x0000000008001160  →  <__libc_csu_init+0> endbr64
0x00007ffffffed8a8│+0x0030: 0x6c1bbc69e92afb5d
0x00007ffffffed8b0│+0x0038: 0x0000000008001060  →  <_start+0> endbr64
─────────────────────────────────────────────────────────────────────────────────────────────────────── code:x86:64 ────
    0x8001139 <__do_global_dtors_aux+57> nop    DWORD PTR [rax+0x0]
    0x8001140 <frame_dummy+0>  endbr64
    0x8001144 <frame_dummy+4>  jmp    0x80010c0 <register_tm_clones>
 →  0x8001149 <main+0>         endbr64
    0x800114d <main+4>         push   rbp
    0x800114e <main+5>         mov    rbp, rsp
    0x8001151 <main+8>         lea    rdi, [rip+0xeac]        # 0x8002004
    0x8001158 <main+15>        call   0x8001050 <puts@plt>
    0x800115d <main+20>        nop
─────────────────────────────────────────────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "a.out", stopped 0x8001149 in main (), reason: BREAKPOINT
───────────────────────────────────────────────────────────────────────────────────────────────────────────── trace ────
[#0] 0x8001149 → main()
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
[ Legend: Modified register | Code | Heap | Stack | String ]
───────────────────────────────────────────────────────────────────────────────────────────────────────── registers ────
$rax   : 0x0000000008001149  →  <main+0> endbr64
$rbx   : 0x0000000008001160  →  <__libc_csu_init+0> endbr64
$rcx   : 0x0000000008001160  →  <__libc_csu_init+0> endbr64
$rdx   : 0x00007ffffffed978  →  0x00007ffffffedbba  →  "SHELL=/bin/bash"
$rsp   : 0x00007ffffffed878  →  0x00007fffff5c70b3  →  <__libc_start_main+243> mov edi, eax
$rbp   : 0x0
$rsi   : 0x00007ffffffed968  →  0x00007ffffffedba7  →  "/home/zyphen/a.out"
$rdi   : 0x1
$rip   : 0x0000000008001149  →  <main+0> endbr64
$r8    : 0x0
$r9    : 0x00007fffff7c1d50  →   endbr64
$r10   : 0x00007fffff7ddf68  →  0x000000006ffffff0
$r11   : 0x00007fffff7ddf68  →  0x000000006ffffff0
$r12   : 0x0000000008001060  →  <_start+0> endbr64
$r13   : 0x00007ffffffed960  →  0x0000000000000001
$r14   : 0x0
$r15   : 0x0
$eflags: [ZERO carry PARITY adjust sign trap INTERRUPT direction overflow resume virtualx86 identification]
$cs: 0x0033 $ss: 0x002b $ds: 0x0000 $es: 0x0000 $fs: 0x0000 $gs: 0x0000
───────────────────────────────────────────────────────────────────────────────────────────────────────────── stack ────
0x00007ffffffed878│+0x0000: 0x00007fffff5c70b3  →  <__libc_start_main+243> mov edi, eax  ← $rsp
0x00007ffffffed880│+0x0008: 0x0000000000000071 ("q"?)
0x00007ffffffed888│+0x0010: 0x00007ffffffed968  →  0x00007ffffffedba7  →  "/home/zyphen/a.out"
0x00007ffffffed890│+0x0018: 0x00000001ff788618
0x00007ffffffed898│+0x0020: 0x0000000008001149  →  <main+0> endbr64
0x00007ffffffed8a0│+0x0028: 0x0000000008001160  →  <__libc_csu_init+0> endbr64
0x00007ffffffed8a8│+0x0030: 0x6c1bbc69e92afb5d
0x00007ffffffed8b0│+0x0038: 0x0000000008001060  →  <_start+0> endbr64
─────────────────────────────────────────────────────────────────────────────────────────────────────── code:x86:64 ────
    0x8001139 <__do_global_dtors_aux+57> nop    DWORD PTR [rax+0x0]
    0x8001140 <frame_dummy+0>  endbr64
    0x8001144 <frame_dummy+4>  jmp    0x80010c0 <register_tm_clones>
 →  0x8001149 <main+0>         endbr64
    0x800114d <main+4>         push   rbp
    0x800114e <main+5>         mov    rbp, rsp
    0x8001151 <main+8>         lea    rdi, [rip+0xeac]        # 0x8002004
    0x8001158 <main+15>        call   0x8001050 <puts@plt>
    0x800115d <main+20>        nop
─────────────────────────────────────────────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "a.out", stopped 0x8001149 in main (), reason: BREAKPOINT
───────────────────────────────────────────────────────────────────────────────────────────────────────────── trace ────
[#0] 0x8001149 → main()
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
gef➤
```

This is how gef looks! Its been a while since I have seen this menu. Brings tears of joy.

 - `next` takes you to the next line of code but will step over function calls.
 - `step` will take you to the next line of code but will go into function calls.
 - `stepi` will take you through one instruction at a time and also stepping into function calls.
 - `disas main` will disassemble main similar to objdump.
 - `info b` will show all breakpoints.
 - `delete 2` will delete the enumerated breakpoints.
 - `b *main` will breakpoint a function of any sort including `puts`.

Let us look at what outputs after a couple of `nexti` or `ni`'s:

```armasm
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
[ Legend: Modified register | Code | Heap | Stack | String ]
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── registers ────
$rax   : 0x0000000008001149  →  <main+0> endbr64
$rbx   : 0x0000000008001160  →  <__libc_csu_init+0> endbr64
$rcx   : 0x0000000008001160  →  <__libc_csu_init+0> endbr64
$rdx   : 0x00007ffffffed978  →  0x00007ffffffedbba  →  "SHELL=/bin/bash"
$rsp   : 0x00007ffffffed870  →  0x0000000000000000
$rbp   : 0x00007ffffffed870  →  0x0000000000000000
$rsi   : 0x00007ffffffed968  →  0x00007ffffffedba7  →  "/home/zyphen/a.out"
$rdi   : 0x0000000008002004  →  "Hello World!"
$rip   : 0x0000000008001158  →  <main+15> call 0x8001050 <puts@plt>
$r8    : 0x0
$r9    : 0x00007fffff7c1d50  →   endbr64
$r10   : 0x00007fffff7ddf68  →  0x000000006ffffff0
$r11   : 0x00007fffff7ddf68  →  0x000000006ffffff0
$r12   : 0x0000000008001060  →  <_start+0> endbr64
$r13   : 0x00007ffffffed960  →  0x0000000000000001
$r14   : 0x0
$r15   : 0x0
$eflags: [ZERO carry PARITY adjust sign trap INTERRUPT direction overflow resume virtualx86 identification]
$cs: 0x0033 $ss: 0x002b $ds: 0x0000 $es: 0x0000 $fs: 0x0000 $gs: 0x0000
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── stack ────
0x00007ffffffed870│+0x0000: 0x0000000000000000   ← $rsp, $rbp
0x00007ffffffed878│+0x0008: 0x00007fffff5c70b3  →  <__libc_start_main+243> mov edi, eax
0x00007ffffffed880│+0x0010: 0x0000000000000071 ("q"?)
0x00007ffffffed888│+0x0018: 0x00007ffffffed968  →  0x00007ffffffedba7  →  "/home/zyphen/a.out"
0x00007ffffffed890│+0x0020: 0x00000001ff788618
0x00007ffffffed898│+0x0028: 0x0000000008001149  →  <main+0> endbr64
0x00007ffffffed8a0│+0x0030: 0x0000000008001160  →  <__libc_csu_init+0> endbr64
0x00007ffffffed8a8│+0x0038: 0x6c1bbc69e92afb5d
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── code:x86:64 ────
    0x800114d <main+4>         push   rbp
    0x800114e <main+5>         mov    rbp, rsp
    0x8001151 <main+8>         lea    rdi, [rip+0xeac]        # 0x8002004
 →  0x8001158 <main+15>        call   0x8001050 <puts@plt>
   ↳   0x8001050 <puts@plt+0>     endbr64
       0x8001054 <puts@plt+4>     bnd    jmp QWORD PTR [rip+0x2f75]        # 0x8003fd0 <puts@got.plt>
       0x800105b <puts@plt+11>    nop    DWORD PTR [rax+rax*1+0x0]
       0x8001060 <_start+0>       endbr64
       0x8001064 <_start+4>       xor    ebp, ebp
       0x8001066 <_start+6>       mov    r9, rdx
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── arguments (guessed) ────
puts@plt (
   $rdi = 0x0000000008002004 → "Hello World!"
)
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "a.out", stopped 0x8001158 in main (), reason: SINGLE STEP
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── trace ────
[#0] 0x8001158 → main()
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
gef➤
```

Hey! Our `Hello World!` is there!

Let's look at the address at that `lea`:

```armasm
gef➤  x/10c 0x8002004
0x8002004:      0x48    0x65    0x6c    0x6c    0x6f    0x20    0x57    0x6f
0x800200c:      0x72    0x6c
gef➤  x/s 0x8002004
0x8002004:      "Hello World!"
gef➤
```

We can do `x/a` for an address, `x/10c` for 10 characters, `x/s` for a string, `x/g` for a qword, and `x/w` for a dword.

### Info Registers

```armasm
gef➤  i r
rax            0x8001149           0x8001149
rbx            0x8001160           0x8001160
rcx            0x8001160           0x8001160
rdx            0x7ffffffed978      0x7ffffffed978
rsi            0x7ffffffed968      0x7ffffffed968
rdi            0x8002004           0x8002004
rbp            0x7ffffffed870      0x7ffffffed870
rsp            0x7ffffffed870      0x7ffffffed870
r8             0x0                 0x0
r9             0x7fffff7c1d50      0x7fffff7c1d50
r10            0x7fffff7ddf68      0x7fffff7ddf68
r11            0x7fffff7ddf68      0x7fffff7ddf68
r12            0x8001060           0x8001060
r13            0x7ffffffed960      0x7ffffffed960
r14            0x0                 0x0
r15            0x0                 0x0
rip            0x8001158           0x8001158 <main+15>
eflags         0x246               [ PF ZF IF ]
cs             0x33                0x33
ss             0x2b                0x2b
ds             0x0                 0x0
es             0x0                 0x0
fs             0x0                 0x0
gs             0x0                 0x0
gef➤
```

### Info Frame

```armasm
gef➤  i f
Stack level 0, frame at 0x7ffffffed880:
 rip = 0x8001158 in main; saved rip = 0x7fffff5c70b3
 Arglist at 0x7ffffffed868, args:
 Locals at 0x7ffffffed868, Previous frame's sp is 0x7ffffffed880
 Saved registers:
  rbp at 0x7ffffffed870, rip at 0x7ffffffed878
```

If we run `disas main` now, we can actually see where we are in the code now:

```armasm
gef➤  disas main
Dump of assembler code for function main:
   0x0000000008001149 <+0>:     endbr64
   0x000000000800114d <+4>:     push   rbp
   0x000000000800114e <+5>:     mov    rbp,rsp
   0x0000000008001151 <+8>:     lea    rdi,[rip+0xeac]        # 0x8002004
=> 0x0000000008001158 <+15>:    call   0x8001050 <puts@plt>
   0x000000000800115d <+20>:    nop
   0x000000000800115e <+21>:    pop    rbp
   0x000000000800115f <+22>:    ret
End of assembler dump.
```

## Changing Values

As the name suggests, we can even change the name of variables and inputs. Suppose instead of `hello world!` we wanted `womp womp`. Let's go ahead and do that:

```armasm
gef➤  x/s 0x8002004
0x8002004:      "Hello World!"
gef➤  set {char [10]} 0x8002004 = "womp womp"
gef➤  x/s 0x8002004
0x8002004:      "womp womp"
```

Note that we want the amount of characters plus one for the size of the char array. Remember how Clang works please.

## Changing Addresses

We can also change addr by the following commands:

```armasm
gef➤  x/g 0x08048451
0x8048451 <__libc_csu_init+33>:	0xff08838d
gef➤  set *0x08048451 = 0xfacade
gef➤  x/g 0x08048451
0x8048451 <__libc_csu_init+33>:	0xfacade
```

Finally we can jump to an address by using

```armasm
gef➤  j *0x08048451
Continuing at 0x0x08048451.
```

# Python Script Kiddie No More

```python
from pwn import *

# target = remote("github.com", 9000)
target = process("./challenge")

gdb.attach(target)
gdb.attach(target, gdbscript='b *main')

target.send(x)
target.sendline(x)

print(target.recvline())
print(target.recvuntil(b"out"))

p64(x) # x64 qword
p32(x) # x32 dword
u64(x) # unpack qword
u32(x) # unpack dword

target.interactive()
```

# Challenges

## Helithumper RE

You can change data locations into strings in Ghidra by going to the pointed location and right clicking the listing window with `Data > TerminatedCString`.

This gets us this:

```c
bool main(void)

{
  int check;
  char *ptr;
  
  ptr = (char *)calloc(0x32,1);
  puts(s_Welcome_to_the_Salty_Spitoon_,_H_00102008);
  scanf();
  check = validate(ptr);
  if (check == 0) {
    puts(s_Yeah_right._Back_to_Weenie_Hut_J_00102050);
  }
  else {
    puts("Right this way...");
  }
  return check == 0;
```

If we check the validate function, we get the following:

```c
int validate(char *string)

{
  int iVar1;
  size_t sVar1;
  long in_FS_OFFSET;
  int local_50;
  int check [4];
  undefined4 local_38;
  undefined4 local_34;
  undefined4 local_30;
  undefined4 local_2c;
  undefined4 local_28;
  undefined4 local_24;
  undefined4 local_20;
  undefined4 local_1c;
  undefined4 local_18;
  undefined4 local_14;
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  check[0] = 0x66;
  check[1] = 0x6c;
  check[2] = 0x61;
  check[3] = 0x67;
  local_38 = 0x7b;
  local_34 = 0x48;
  local_30 = 0x75;
  local_2c = 0x43;
  local_28 = 0x66;
  local_24 = 0x5f;
  local_20 = 0x6c;
  local_1c = 0x41;
  local_18 = 0x62;
  local_14 = 0x7d;
  sVar1 = strlen(string);
  local_50 = 0;
  do {
    if ((int)sVar1 <= local_50) {
      iVar1 = 1;
LAB_001012b7:
      if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    /* WARNING: Subroutine does not return */
        __stack_chk_fail();
      }
      return iVar1;
    }
    if ((int)string[local_50] != check[local_50]) {
      iVar1 = 0;
      goto LAB_001012b7;
    }
    local_50 = local_50 + 1;
  } while( true );
}
```
Convert the variable's hex to ascii:
```armasm
0x66 0x6C 0x61 0x67 0x7B 0x48 0x75 0x43 0x66 0x5F 0x6C 0x41 0x62 0x7D
```

We can now input the following

```bash
gef➤  r
Starting program: /mnt/e/downloads/rev ]
Welcome to the Salty Spitoon™, How tough are ya?
flag{HuCf_lAb}
Right this way...
[Inferior 1 (process 695) exited normally]
gef➤
```

## CSAW 2019: Beleaf

```c
int FUN_001008a1(void)

{
  size_t len;
  long output;
  long in_FS_OFFSET;
  ulong i;
  char check [136];
  long stack;
  
  stack = *(long *)(in_FS_OFFSET + 0x28);
  printf("Enter the flag\n>>> ");
  scanf();
  len = strlen(check);
  if (len < 0x21) {
    puts("Incorrect!");
                    /* WARNING: Subroutine does not return */
    exit(1);
  }
  for (i = 0; i < len; i = i + 1) {
    output = validate(check[i]);
    if (output != *(long *)(s__003014e0 + i * 8)) {
      puts("Incorrect!");
                    /* WARNING: Subroutine does not return */
      exit(1);
    }
  }
  puts("Correct!");
  if (stack != *(long *)(in_FS_OFFSET + 0x28)) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 0;
}
```

```c
long validate(char input)

{
  long i;
  
  i = 0;
  while ((i != -1 && ((int)input != *(int *)(alphabet + i * 4)))) {
    if ((int)input < *(int *)(alphabet + i * 4)) {
      i = i * 2 + 1;
    }
    else if (*(int *)(alphabet + i * 4) < (int)input) {
      i = (i + 1) * 2;
    }
  }
  return i;
}

```

Then we know that we have to take each hex value of the input and multiply to the location of the alphabet times 4. Which means `hex((0x00301020 + (4*9))) =
'0x301044'`.

Which is the location of `l`. Of course continuing down this list, we get the following:

```bash
$ ./beleaf
Enter the flag
>>> flag{we_beleaf_in_your_re_future}
Correct!
```

It's crazy for how unsuspectingly short alphabet can create a full flag.