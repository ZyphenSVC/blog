import Link from "next/link";
import { ExperienceCard } from "@/app/components/ExperienceCard";

type ExperienceItem = {
  org: string;
  role: string;
  date: string;
  location: string;
  description: string;
  tags: string[];
};

type ExperienceSectionProps = {
  titleTop: string;
  titleBottom: string;
  href?: string;
  linkLabel?: string;
  items: ExperienceItem[];
};

export function ExperienceSection({
                                    titleTop,
                                    titleBottom,
                                    href,
                                    linkLabel,
                                    items,
                                  }: ExperienceSectionProps) {
  return (
    <section className="mt-12 min-w-0">
      <div className="mb-10 rounded-sm border border-[#575253] bg-[#2F2D2E] px-5 py-5 sm:flex sm:items-end sm:justify-between">
        <h2 className="font-mono text-xl font-bold uppercase leading-tight tracking-[0.10em] text-[#EAE0D5] sm:text-3xl sm:tracking-[0.14em]">
          {titleTop}
          <br />
          {titleBottom}
        </h2>

        {href && linkLabel && (
          <Link
            href={href}
            className="mt-4 block font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#8C86AA] hover:text-[#EAE0D5] sm:mt-0 sm:tracking-[0.16em]"
          >
            {linkLabel} →
          </Link>
        )}
      </div>

      <div className="space-y-10">
        {items.map((item) => (
          <ExperienceCard key={`${item.org}-${item.role}`} {...item} />
        ))}
      </div>
    </section>
  );
}
