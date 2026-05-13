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
        className="font-mono text-2xl text-[#EAE0D5] lg:hidden"
        aria-label="Open navigation menu"
      >
        ☰
      </button>

      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={[
          "fixed right-0 top-0 z-50 h-screen w-72 border-l border-[#575253] bg-[#2F2D2E] p-8 transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="mb-12 flex items-center justify-between">
          <span className="font-mono text-sm uppercase tracking-[0.28em] text-[#8C86AA]">
            MENU
          </span>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="font-mono text-2xl text-[#EAE0D5]"
            aria-label="Close navigation menu"
          >
            ×
          </button>
        </div>

        <nav className="flex flex-col gap-8">
          {navigationItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-mono text-lg font-semibold uppercase tracking-[0.16em] transition"
              >
                <span
                  className={
                    active
                      ? "text-[#8C86AA]"
                      : "text-[#C8C0B6] hover:text-[#EAE0D5]"
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