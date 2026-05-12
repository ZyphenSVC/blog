import Link from "next/link";
import { PostCard } from "@/app/components/PostCard";

type PostItem = {
  date: string;
  type: string;
  title: string;
  description: string;
  tags: string[];
};

type PostSectionProps = {
  titleTop: string;
  titleBottom: string;
  href?: string;
  linkLabel?: string;
  items: PostItem[];
};

export function PostSection({
                              titleTop,
                              titleBottom,
                              href,
                              linkLabel,
                              items,
                            }: PostSectionProps) {
  return (
    <section>
      <div className="mb-10 rounded-sm border border-[#575253] bg-[#2F2D2E] px-5 py-5 sm:flex sm:items-end sm:justify-between">
        <h2 className="font-mono text-2xl font-bold uppercase leading-tight tracking-[0.14em] text-[#EAE0D5] sm:text-3xl">
          {titleTop}
          <br />
          {titleBottom}
        </h2>

        {href && linkLabel && (
          <Link
            href={href}
            className="mt-4 block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#8C86AA] hover:text-[#EAE0D5] sm:mt-0"
          >
            {linkLabel} →
          </Link>
        )}
      </div>

      <div className="space-y-10">
        {items.map((item) => (
          <PostCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}