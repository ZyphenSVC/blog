'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/app/components/Logo"
import { MobileNavbar } from "@/app/components/MobileNavbar"

type NavItem = {
  label: string;
  href: string;
};

const navigationItems: NavItem[] = [
  { label: "contact", href: "/contact" },
  { label: "blog", href: "/blog" },
  { label: "notes", href: "/notes" },
  { label: "research", href: "/research" },
  { label: "projects", href: "/projects" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#575253] bg-[#2F2D2E] px-6">
      <Logo />

      <div className="hidden items-center gap-12 lg:flex">
        {navigationItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-sm font-semibold uppercase tracking-[0.16em] transition"
            >
              <span className={active ? "text-[#8C86AA]" : "text-[#C8C0B6] hover:text-[#EAE0D5]"}>
                {active ? `<${item.label}>` : `${item.label}/`}
              </span>
            </Link>
          );
        })}
      </div>
      <MobileNavbar />
    </nav>
  );
}