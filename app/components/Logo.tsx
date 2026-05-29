'use client';

import Link from "next/link"
import Image from "next/image"

export function Logo() {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
      <Image
        src="/media/optimized/logo.webp"
        alt="logo"
        width={128}
        height={128}
        priority
        className="h-7 w-7 shrink-0 sm:h-8 sm:w-8"
      />
      <span className="shrink-0 font-mono text-xl font-bold tracking-[0.10em] text-[#8C86AA] sm:text-2xl sm:tracking-[0.16em]">[</span>
        <span className="min-w-0 font-mono text-xl font-bold tracking-[0.10em] text-[#EAE0D5] sm:text-2xl sm:tracking-[0.16em]">
          zyphensvc
        </span>
      <span className="shrink-0 font-mono text-xl font-bold tracking-[0.10em] text-[#8C86AA] sm:text-2xl sm:tracking-[0.16em]">]</span>
    </Link>
  );
}
