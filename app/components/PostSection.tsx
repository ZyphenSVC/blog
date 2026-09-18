import Link from "next/link";
import { PostCard, type PostCardProps } from "@/app/components/PostCard";
import { Icon } from "@/app/components/Icon";
import { Reveal } from "@/app/components/Reveal";

type PostSectionProps = {
  titleTop: string;
  titleBottom: string;
  href?: string;
  linkLabel?: string;
  items: PostCardProps[];
};

export function PostSection({ titleTop, titleBottom, href, linkLabel, items }: PostSectionProps) {
  return (
    <section className="portfolio-section">
      <Reveal>
      <div className="section-heading">
        <h2 className="section-title"><Icon name="pen" />{titleTop} {titleBottom}</h2>
        {href && linkLabel && <Link href={href}>{linkLabel} →</Link>}
      </div>
      <div className="post-list">{items.map((item) => <PostCard key={item.href} {...item} />)}</div>
      </Reveal>
    </section>
  );
}
