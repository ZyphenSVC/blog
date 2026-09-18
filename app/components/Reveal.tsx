"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Content stays visible without JavaScript or when reduced motion is enabled. */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    element.dataset.revealed = "false";
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.dataset.revealed = "true";
        observer.disconnect();
      }
    }, { rootMargin: "0px 0px -24px 0px", threshold: 0 });
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`scroll-reveal ${className}`}>{children}</div>;
}
