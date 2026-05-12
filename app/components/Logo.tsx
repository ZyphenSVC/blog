'use client';

import Link from "next/link"
import Image from "next/image"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/media/logo.png"
        alt="logo"
        width={128}
        height={128}
        priority
        className="h-8 w-8"
      />
      <span className="font-mono text-2xl font-bold tracking-[0.16em] text-[#8C86AA]">[</span>
        <span className="font-mono text-2xl font-bold tracking-[0.16em] text-[#EAE0D5]">
          zyphensvc
        </span>
      <span className="font-mono text-2xl font-bold tracking-[0.16em] text-[#8C86AA]">]</span>
    </Link>
  );
}