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
    <article className="min-w-0 border-b border-[#575253]/70 pb-10">
      <div className="mb-5 flex flex-col gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8C86AA]/80 sm:flex-row sm:justify-between sm:gap-6 sm:tracking-[0.16em]">
        <span>{date}</span>
        <span className="sm:text-right">{location}</span>
      </div>

      <h3 className="max-w-3xl text-xl font-semibold leading-snug text-[#F2E8DC] sm:text-2xl">
        {role}
      </h3>

      <p className="mt-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#8C86AA] sm:tracking-[0.14em]">
        {org}
      </p>

      <p className="mt-4 max-w-3xl text-base leading-8 text-[#BEB6AD]">
        {description}
      </p>

      <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.10em] text-[#8C86AA]/60 sm:tracking-[0.12em]">
        {tags.map((tag) => (
          <span key={tag} className="break-words">{tag}</span>
        ))}
      </div>
    </article>
  );
}
