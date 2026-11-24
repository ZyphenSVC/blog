import Image from "next/image";

export type ExperienceCardProps = {
  org: string;
  href?: string;
  role: string;
  date: string;
  location: string;
  description: string;
  tags: string[];
  highlights?: string[];
  image?: { src: string; alt: string; width: number; height: number };
};

export function ExperienceCard({ org, href, role, date, location, description, tags, highlights, image }: ExperienceCardProps) {
  const header = (
    <>
      <div className="experience-meta"><span>{date}</span><span>{location}</span></div>
      <div className="experience-heading">
        <div><h3>{role}</h3><p className="experience-org">{href ? <a href={href}>{org}</a> : org}</p></div>
        {image && <Image {...image} alt={image.alt} className="experience-image" sizes="80px" />}
      </div>
      <p className="experience-description">{description}</p>
      <div className="tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </>
  );

  if (!highlights?.length) {
    return <article className="surface-card experience-card">{header}</article>;
  }

  return (
    <details className="surface-card experience-card experience-disclosure">
      <summary aria-label={`${role} at ${org}`}>{header}</summary>
      <div className="experience-highlights">
        <ul>{highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
      </div>
    </details>
  );
}
