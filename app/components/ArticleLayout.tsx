import Link from "next/link";

type ArticleLayoutProps = {
  title: string;
  description?: string;
  date: string;
  readingTime?: string;
  tags?: string[];
  children: React.ReactNode;
};

export function ArticleLayout({
                                title,
                                description,
                                date,
                                readingTime,
                                tags = [],
                                children,
                              }: ArticleLayoutProps) {
  return (
    <article className="mx-auto max-w-3xl px-8 py-16 text-[#EAE0D5] lg:px-0">
      <Link
        href="/blog"
        className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#8C86AA] hover:text-[#EAE0D5]"
      >
        ← Back to Blog
      </Link>

      <header className="mt-10 border-b border-[#575253] pb-10">
        <div className="mb-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#8C86AA]/80">
          <span>{date}</span>
          {readingTime && <span>{readingTime}</span>}
        </div>

        <h1 className="text-4xl font-semibold leading-tight text-[#F2E8DC] md:text-5xl">
          {title}
        </h1>

        {description && (
          <p className="mt-5 text-lg leading-8 text-[#BEB6AD]">
            {description}
          </p>
        )}

        {tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.12em] text-[#8C86AA]/70">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-invert mt-12 max-w-none prose-headings:text-[#F2E8DC] prose-p:leading-8 prose-p:text-[#BEB6AD] prose-a:text-[#8C86AA] prose-strong:text-[#EAE0D5] prose-code:text-[#EAE0D5] prose-pre:border prose-pre:border-[#575253] prose-pre:bg-[#2F2D2E]">
        {children}
      </div>
    </article>
  );
}