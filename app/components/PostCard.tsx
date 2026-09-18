import Link from "next/link";

export type PostCardProps = {
  date: string;
  type?: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  readingTime?: string;
  headingLevel?: 2 | 3;
};

export function PostCard({ date, type, title, description, tags, href, readingTime, headingLevel = 3 }: PostCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="post-card">
      <Heading><Link href={href}>{title}</Link></Heading>
      <div className="post-meta">
        <time dateTime={date}>{date.slice(0, 10)}</time>
        {readingTime && <span>• {readingTime}</span>}
        {type && <span>• {type}</span>}
      </div>
      <p>{description}</p>
      {tags.length > 0 && <div className="tags">{tags.map((tag) => <span key={tag}>#{tag.replace(/^#/, "")}</span>)}</div>}
    </article>
  );
}
