import Link from "next/link";

type ArticleLayoutProps = {
  title: string;
  description?: string;
  date: string;
  readingTime?: string;
  tags?: string[];
  backHref?: string;
  backLabel?: string;
  children: React.ReactNode;
};

export function ArticleLayout({ title, description, date, readingTime, tags = [], backHref = "/blog", backLabel = "Back to blog", children }: ArticleLayoutProps) {
  return (
    <article className="reading-container page-content">
      <Link href={backHref}>← {backLabel}</Link>
      <header className="article-header">
        <h1 className="reveal-text">{title}</h1>
        <div className="post-meta">
          <time dateTime={date}>{date.slice(0, 10)}</time>
          {readingTime && <span>• {readingTime}</span>}
        </div>
        {description && <p>{description}</p>}
        {tags.length > 0 && <div className="tags">{tags.map((tag) => <span key={tag}>#{tag.replace(/^#/, "")}</span>)}</div>}
      </header>
      <div className="prose article-body">{children}</div>
    </article>
  );
}
