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
    <nav className="sticky top-0 z-50 flex h-16 w-full min-w-0 items-center justify-between gap-4 border-b border-[#575253] bg-[#2F2D2E] px-4 sm:px-6">
      <Logo />

      <div className="hidden items-center gap-12 lg:flex">
        {navigationItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`font-mono text-xs font-bold uppercase tracking-[0.18em] transition ${
                active && item.href === "/"
                  ? "ml-4 text-[#8C86AA]"
                  : active
                    ? "text-[#8C86AA]"
                    : "text-[#C8C0B6]/85 hover:text-[#EAE0D5]"
              }`}
            >
              {active ? `<${item.label}>` : `${item.label}/`}
            </Link>
          );
        })}
      </div>
      <div className="shrink-0 lg:hidden">
        <MobileNavbar />
      </div>
    </nav>
  );
}
