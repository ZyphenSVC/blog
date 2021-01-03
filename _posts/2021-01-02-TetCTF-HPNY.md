---
title: "2021 TetCTF HPNY Writeup"
date: "2021-01-02"
layout: single
tags:
- ALL
categories:
- CTFs
---

I participated in this capture the flag with a new team called ducks0ci3ty. You may join our discord using the link below.

> <https://discord.gg/ujC3F7zfUw>

# HPNY

[Web]

> Get some lucky word or number for your new year!
>
> <http://192.46.227.32/?roll=get_lucky_word>

To be honest, by the time I woke up three of my teammates were working on this so I decided to give it a try as they seemed to hit a step. But let's look at it from a fresh point of view. Upon loading, you are generated random words every refresh. 

<code><img src="https://zyphen.is-inside.me/Vh1WcrrN.png"></code>

And it seemed a bit odd. I decided to go to the home directory to see if there is any linkage or if it will redirect to the home page, I guess there was linkage! Things we can write down at this point is that `get_lucky_word` is a function as I believed, and it chooses out of a selection, while there are also other functions. 

```php
<!-- Let''s pray for new year lucky things <3 -->

<?php

function get_lucky_word() {
    $words = array("Chuc mung nam moi", "gongxifacai", "happy new year!", "bonne année", "Akemashite omedeto gozaimasu", "Seh heh bok mahn ee bahd euh sae yo", "kimochi", "Feliz Año Nuevo", "S novim godom", "Gelukkig Nieuwjaar", "selamat tahun baru", "iniya puthandu nal Vazhthukkal");
    return $words[array_rand($words)];
}

function get_lucky_number() {
    $numb = rand(0,100);
    return strval($numb);
}


if(!isset($_GET["roll"])) {
    show_source(__FILE__);
}
else
{
    $wl = preg_match('/^[a-z\(\)\_\.]+$/i', $_GET["roll"]);

    if($wl === 0 || strlen($_GET["roll"]) > 50) {
        die("bumbadum badum");
    }
    eval("echo ".$_GET["roll"]."();");
}

?>
```

Let's take note at the bottom. There appears to be a cap at 50 characters, which is another things my teammates pointed out with the roll tag. It will normally execute fine, except when it does not... 

Jibe pointed out that you could check defined functions as to see all the functions that we do not see in that source file, with a little php magic. However, it is a mess.

> <http://192.46.227.32/?roll=var_dump(get_defined_functions())>

<code><img src="https://zyphen.is-inside.me/iA5pnZBf.png"></code>

So let's clean this one up by looking at the source using `CTRL+U OR CMD+U`

<code> <img src="https://zyphen.is-inside.me/9oDkFjOy.png"> </code>

There, a lot more legible. Using the same technique, we can read the current directory. 

> <http://192.46.227.32/?roll=var_dump(scandir(getcwd()))/>

We now have visibility for two files, `index.php` and `fl4g_here_but_can_you_get_it_hohoho.php`, however if we navigate to the flag directory, it contains nothing. 

> <https://www.php.net/manual/en/function.readfile>

Comparing the defined functions we do have access to, out of the one I chose `readfile`, it seems that it looks for a file name. Now the problem is, how are we going to get a file name if we have all of these arguments and arrays. I tried to insert the path name of this file into the command, but it was already too large, somehow. 

At this point I was about to give up, I tried to search up php functions that can print file path contents, and then I realized you can search on the PHP website.

> <https://www.php.net/manual-lookup.php?pattern=path&scope=quickref>

Manually going through each of the ones that look reasonable, our choices being, `realpath, realpath_cache_get, domxpath, eio_realpath, gzpassthru, pack, get_include_path`. I might be able to use realpath_cache_get to print out our array and get a value from.

> <https://www.php.net/manual/en/function.realpath-cache-get.php>

<code> <img src="https://zyphen.is-inside.me/gHTGJbow.png"> </code>

Now let's setup a payload. If realpath_cache_get does work, then we have to get the last element, meaning we can use the `end()` function for arrays. Now this alone was the same as trying to print the flag alone. Was a little dissapointing but let's see some more array functions.

> <https://www.php.net/manual-lookup.php?pattern=arrray&scope=quickref>

A matter of trial and error and we get the flag with `array_keys`, a function that prints all contents of the keys in an array. 

> <https://www.php.net/manual/en/function.array-keys.php>

This is our payload.

> <http://192.46.227.32/?roll=readfile(end(array_keys(realpath_cache_get())))>

<code><img src="https://zyphen.is-inside.me/BOaCbKU4.png"></code>

This is the flag.

> TetCTF{lixi_50k_<3\_vina\_\*100\*25926415724382#}

