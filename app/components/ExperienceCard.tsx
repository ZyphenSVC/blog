import Image from "next/image";

export type ExperienceCardProps = {
  org: string;
  role: string;
  date: string;
  location: string;
  description: string;
  tags: string[];
  highlights?: string[];
  image?: { src: string; alt: string; width: number; height: number };
};

export function ExperienceCard({ org, role, date, location, description, tags, highlights, image }: ExperienceCardProps) {
  return (
    <article className="surface-card experience-card">
        <div className="experience-meta"><span>{date}</span><span>{location}</span></div>
        <div className="experience-heading">
          <div><h3>{role}</h3><p className="experience-org">{org}</p></div>
          {image && <Image {...image} alt={image.alt} className="experience-image" sizes="80px" />}
        </div>
        <p className="experience-description">{description}</p>
        {highlights && highlights.length > 0 && (
          <details className="experience-details">
            <summary>Experience details<span className="sr-only">: {role} at {org}</span></summary>
            <ul>{highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
          </details>
        )}
        <div className="tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </article>
  );
}
