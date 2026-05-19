import Link from "next/link";

type PostCardProps = {
  date: string;
  type: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
};

export function PostCard({
                           date,
                           type,
                           title,
                           description,
                           tags,
                           href,
                         }: PostCardProps) {
  return (
    <article className="border-b border-[#575253]/70 pb-8">
      <div className="mb-4 flex justify-between gap-6 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8C86AA]/80">
        <span>{date}</span>
        <span>{type}</span>
      </div>

      <Link href={href}>
        <h3 className="max-w-3xl text-2xl font-semibold leading-snug text-[#F2E8DC] transition hover:text-[#8C86AA]">
          {title}
        </h3>
      </Link>

      <p className="mt-3 max-w-3xl text-base leading-7 text-[#BEB6AD]">
        {description}
      </p>

      <div className="mt-5 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[#8C86AA]/60">
        {tags.map((tag) => (
          <span key={tag}>#{tag.replace(/^#/, "")}</span>
        ))}
      </div>
    </article>
  );
}