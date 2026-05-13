"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
};

const navigationItems: NavItem[] = [
  { label: "home", href: "/" },
  { label: "contact", href: "/contact" },
  { label: "blog", href: "/blog" },
  { label: "notes", href: "/notes" },
  { label: "research", href: "/research" },
  { label: "projects", href: "/projects" },
];

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden font-mono text-2xl text-[#EAE0D5] opacity-90"
        aria-label="Open navigation"
      >
        ☰
      </button>

      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[90] bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-[100] h-screen w-80 border-l border-[#575253] bg-[#2F2D2E] px-8 py-8 shadow-2xl transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-12 flex items-center justify-between border-b border-[#575253] pb-5">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#8C86AA]">
            Menu
          </span>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="font-mono text-3xl leading-none text-[#EAE0D5]"
            aria-label="Close navigation"
          >
            ×
          </button>
        </div>

        <nav className="flex flex-col gap-7">
          {navigationItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-mono text-lg font-bold uppercase tracking-[0.18em] transition"
              >
                <span
                  className={
                    active
                      ? "text-[#8C86AA]"
                      : "text-[#C8C0B6]/85 hover:text-[#EAE0D5]"
                  }
                >
                  {active ? `<${item.label}>` : `${item.label}/`}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}