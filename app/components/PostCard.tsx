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
    <article className="min-w-0 border-b border-[#575253]/70 pb-8">
      <div className="mb-4 flex flex-col gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8C86AA]/80 sm:flex-row sm:justify-between sm:gap-6 sm:tracking-[0.16em]">
        <span>{date}</span>
        <span>{type}</span>
      </div>

      <Link href={href}>
        <h3 className="max-w-3xl text-xl font-semibold leading-snug text-[#F2E8DC] transition hover:text-[#8C86AA] sm:text-2xl">
          {title}
        </h3>
      </Link>

      <p className="mt-3 max-w-3xl text-base leading-7 text-[#BEB6AD]">
        {description}
      </p>

      <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.10em] text-[#8C86AA]/60 sm:tracking-[0.12em]">
        {tags.map((tag) => (
          <span key={tag} className="break-words">#{tag.replace(/^#/, "")}</span>
        ))}
      </div>
    </article>
  );
}
