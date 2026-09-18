import Link from "next/link";
import { ExperienceCard, type ExperienceCardProps } from "@/app/components/ExperienceCard";
import { Icon, type IconName } from "@/app/components/Icon";
import { Reveal } from "@/app/components/Reveal";

type ExperienceSectionProps = {
  titleTop: string;
  titleBottom: string;
  href?: string;
  linkLabel?: string;
  items: ExperienceCardProps[];
  icon?: IconName;
  columns?: 2 | 3;
  id?: string;
};

export function ExperienceSection({ titleTop, titleBottom, href, linkLabel, items, icon = "briefcase", columns = 2, id }: ExperienceSectionProps) {
  return (
    <section className="portfolio-section" id={id} aria-labelledby={id ? `${id}-title` : undefined}>
      <Reveal>
      <div className="section-heading">
        <h2 className="section-title" id={id ? `${id}-title` : undefined}><Icon name={icon} />{titleTop} {titleBottom}</h2>
        {href && linkLabel && <Link href={href}>{linkLabel} →</Link>}
      </div>
      <div className={`experience-list experience-columns-${columns}`}>
        {items.map((item) => <ExperienceCard key={item.org + "-" + item.role} {...item} />)}
      </div>
      </Reveal>
    </section>
  );
}
