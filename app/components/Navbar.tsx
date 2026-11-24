"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/app/components/Logo";
import ThemeToggle from "@/app/components/ThemeToggle";

const navigation = [
  ["Home", "/"], ["Blog", "/blog"], ["Notes", "/notes"],
  ["Research", "/research"], ["Projects", "/projects"], ["Contact", "/contact"],
];

export default function Navbar() {
  const pathname = usePathname();
  const menu = useRef<HTMLDivElement>(null);
  const links = navigation.map(([label, href]) => {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
    return (
      <Link key={href} href={href} aria-current={active ? "page" : undefined}
        onClick={() => menu.current?.hidePopover?.()}>
        {label}
      </Link>
    );
  });

  return (
    <header className="site-header site-container">
      <nav className="site-nav" aria-label="Main navigation">
        <Logo />
        <div className="desktop-links nav-links">{links}</div>
        <ThemeToggle />
        <button className="menu-trigger" type="button" popoverTarget="site-menu">Menu</button>
        <div id="site-menu" className="mobile-links nav-links" popover="auto" ref={menu}>{links}</div>
      </nav>
    </header>
  );
}
