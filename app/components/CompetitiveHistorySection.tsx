import { competitions } from "@/lib/competitions";
import { Icon } from "@/app/components/Icon";
import { Reveal } from "@/app/components/Reveal";

function ordinal(rank: number) {
  const suffix = rank % 100 >= 11 && rank % 100 <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" }[rank % 10] ?? "th");
  return `${rank}${suffix}`;
}

export function CompetitiveHistory() {
  const years = [...new Set(competitions.map((event) => event.year))].sort((a, b) => b - a);
  return (
    <section className="portfolio-section" id="competitions" aria-labelledby="competitions-title">
      <Reveal>
        <div className="section-heading">
          <h2 id="competitions-title" className="section-title"><Icon name="trophy" />Competitive history</h2>
          <span className="section-count">{competitions.length} results · 2018–2023</span>
        </div>
      </Reveal>
      <div className="competition-years">
        {years.map((year) => (
          <Reveal key={year}>
            <section className="competition-year" aria-labelledby={`competitions-${year}`}>
              <h3 id={`competitions-${year}`}>{year}</h3>
              <ul className="competition-list">
                {competitions.filter((event) => event.year === year).map((event) => (
                  <li key={event.name} className="competition-event">
                    <div className="competition-info">
                      <span className="competition-name">{event.name}</span>
                      <span className="competition-detail">{[event.team, event.detail || event.category].filter(Boolean).join(" · ")}</span>
                    </div>
                    <div className="competition-result">
                      <span className="competition-place">{typeof event.placement === "number" ? ordinal(event.placement) : event.placement}</span>
                      {event.fieldSize && <span className="competition-field">/ {event.fieldSize.toLocaleString("en-US")}</span>}
                      {event.region && <span className="competition-field">{event.region}</span>}
                    </div>
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
