type ExperienceCardProps = {
  org: string;
  role: string;
  date: string;
  location: string;
  description: string;
  tags: string[];
};

export function ExperienceCard({
                                                 org,
                                                 role,
                                                 date,
                                                 location,
                                                 description,
                                                 tags,
                                               }: ExperienceCardProps) {
  return (
    <article className="border-b border-[#575253]/70 pb-10">
      <div className="mb-5 flex justify-between gap-6 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8C86AA]/80">
        <span>{date}</span>
        <span className="text-right">{location}</span>
      </div>

      <h3 className="max-w-3xl text-2xl font-semibold leading-snug text-[#F2E8DC]">
        {role}
      </h3>

      <p className="mt-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#8C86AA]">
        {org}
      </p>

      <p className="mt-4 max-w-3xl text-base leading-8 text-[#BEB6AD]">
        {description}
      </p>

      <div className="mt-5 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[#8C86AA]/60">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}