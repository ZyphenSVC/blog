import { academicTalks, serviceRoles, skillGroups, languages, coursework } from "@/lib/cv";
import { Icon } from "@/app/components/Icon";
import { Reveal } from "@/app/components/Reveal";

export function AcademicTalks() {
  return (
    <section className="portfolio-section" id="talks" aria-labelledby="talks-title">
      <Reveal>
        <div className="section-heading">
          <h2 className="section-title" id="talks-title"><Icon name="microphone" />Academic talks & invited lectures</h2>
        </div>
        <div className="academic-list">
          {academicTalks.map((talk) => (
            <article key={talk.startDate} className="surface-card talk-card">
              <div className="talk-meta">
                <time dateTime={talk.startDate}>{talk.date}</time>
                <span>{talk.format}</span>
                {talk.status && <span className="status-badge">{talk.status}</span>}
              </div>
              <div>
                <h3>{talk.title}</h3>
                <p className="talk-venue">{talk.venue}</p>
                <p className="talk-location">{talk.location}</p>
                {talk.programUrl && <a href={talk.programUrl}>Directed Reading Program ↗</a>}
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function ServiceSection() {
  return (
    <section className="portfolio-section" id="service" aria-labelledby="service-title">
      <Reveal>
        <div className="section-heading">
          <h2 className="section-title" id="service-title"><Icon name="users" />Service & campus involvement</h2>
        </div>
        <div className="experience-list experience-columns-3">
          {serviceRoles.map((service) => (
            <article key={service.organization} className="surface-card service-card">
              <p className="experience-meta">{service.date}</p>
              <h3>{service.role}</h3>
              <p className="experience-org">{service.organization}</p>
              {service.note && <p className="experience-description">{service.note}</p>}
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section className="portfolio-section" id="skills" aria-labelledby="skills-title">
      <Reveal>
        <div className="section-heading">
          <h2 className="section-title" id="skills-title"><Icon name="code" />Skills & languages</h2>
        </div>
        <div className="card-grid">
          {skillGroups.map((group) => (
            <article key={group.title} className="surface-card skill-card">
              <h3>{group.title}</h3>
              <ul className="skill-list">{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
          <article className="surface-card skill-card">
            <h3>Languages</h3>
            <dl className="language-list">
              {languages.map((language) => (
                <div key={language.name}><dt>{language.name}</dt><dd>{language.proficiency}</dd></div>
              ))}
            </dl>
          </article>
        </div>
      </Reveal>
    </section>
  );
}

export function CourseworkSection() {
  const terms = [...new Set(coursework.map((course) => course.term))].reverse();
  return (
    <section className="portfolio-section" id="coursework" aria-labelledby="coursework-title">
      <Reveal>
        <div className="section-heading">
          <h2 className="section-title" id="coursework-title"><Icon name="book" />Coursework</h2>
          <span className="section-count">{coursework.length} courses · 2022–2026</span>
        </div>
      </Reveal>
      <div className="coursework-grid">
        {terms.map((term) => (
          <Reveal key={term}>
            <section className="course-term" aria-label={term}>
              <h3>{term}</h3>
              <ul>
                {coursework.filter((course) => course.term === term).map((course) => (
                  <li key={course.code} className="course-entry">
                    <span className="course-code">{course.code}</span>
                    <span>{course.title}{course.audited && <span className="audit-badge">Audit</span>}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
