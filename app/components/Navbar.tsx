"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/app/components/Logo";
import ThemeToggle from "@/app/components/ThemeToggle";
import { Icon, type IconName } from "@/app/components/Icon";

const navigationItems: { label: string; href: string; icon: IconName }[] = [
  { label: "home", href: "/", icon: "home" },
  { label: "blog", href: "/blog", icon: "pen" },
  { label: "notes", href: "/notes", icon: "book" },
  { label: "research", href: "/research", icon: "research" },
  { label: "projects", href: "/projects", icon: "code" },
  { label: "contact", href: "/contact", icon: "mail" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="site-header site-container">
      <nav className="site-nav" aria-label="Main navigation">
        <Logo />
        <div className="nav-links">
          {navigationItems.map((item) => {
            const active = pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href + "/"));
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>
                <Icon name={item.icon} />/{item.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
