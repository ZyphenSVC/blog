type CompetitiveEvent = {
  placement: string;
  name: string;
  date: string;
  category?: string;
};

const competitiveHistory: Record<string, CompetitiveEvent[]> = {
  "2022": [
    {
      placement: "22nd",
      name: "picoCTF 2022",
      date: "2022",
      category: "CTF",
    },
    {
      placement: "23rd",
      name: "UTCTF 2022",
      date: "2022",
      category: "CTF",
    },
  ],
  "2021": [
    {
      placement: "48th",
      name: "NCL Fall 2021 Individual",
      date: "2021",
      category: "CTF",
    },
    {
      placement: "35th",
      name: "NCL Fall 2021 Team",
      date: "2021",
      category: "CTF",
    },
    {
      placement: "44th",
      name: "pbctf 2021",
      date: "2021",
      category: "CTF",
    },
    {
      placement: "4th",
      name: "DeconstruCT.F 2021",
      date: "2021",
      category: "CTF",
    },
    {
      placement: "37th",
      name: "H@cktivityCon 2021",
      date: "2021",
      category: "CTF",
    },
    {
      placement: "140th",
      name: "CSAW '21 Qualifiers",
      date: "2021",
      category: "CTF",
    },
    {
      placement: "140th",
      name: "HackTheBox Cyber Apocalypse 2021",
      date: "2021",
      category: "CTF",
    },
    {
      placement: "29th",
      name: "NCL Spring 2021 Individual",
      date: "2021",
      category: "CTF",
    },
    {
      placement: "22nd",
      name: "NCL Spring 2021 Team",
      date: "2021",
      category: "CTF",
    },
    {
      placement: "282nd",
      name: "DiceCTF 2021",
      date: "2021",
      category: "CTF",
    },
  ],
  "2020": [
    {
      placement: "3rd",
      name: "KSU ISA CTF",
      date: "2020",
      category: "CTF",
    },
    {
      placement: "9th",
      name: "X-MAS CTF 2020",
      date: "2020",
      category: "CTF",
    },
    {
      placement: "38th",
      name: "NCL Fall 2020 Individual",
      date: "2020",
      category: "CTF",
    },
    {
      placement: "27th",
      name: "NCL Fall 2020 Team",
      date: "2020",
      category: "CTF",
    },
    {
      placement: "76th",
      name: "Newark Academy CTF",
      date: "2020",
      category: "CTF",
    },
  ],
  "2019": [
    {
      placement: "65th",
      name: "TJCTF 2019",
      date: "2019",
      category: "CTF",
    },
    {
      placement: "71st",
      name: "ångstromCTF 2019",
      date: "2019",
      category: "CTF",
    },
    {
      placement: "33rd",
      name: "picoCTF 2019",
      date: "2019",
      category: "CTF",
    },
  ],
};

export function CompetitiveHistory() {
  return (
    <section className="overflow-x-clip border-t border-[#575253] bg-[#252324] px-5 pt-14 pb-24 text-[#EAE0D5] sm:px-8 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center sm:mb-24">
          <h2 className="font-mono text-4xl font-bold uppercase leading-tight tracking-[0.08em] text-[#EAE0D5] sm:text-5xl sm:tracking-[0.16em] md:text-6xl md:tracking-[0.20em]">
            Competitive
            <br />
            History
          </h2>
          <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#8C86AA] sm:text-sm sm:tracking-[0.22em]">
            CTFs / Cybersecurity / Honors
          </p>
        </div>

        <div className="space-y-20">
          {Object.entries(competitiveHistory)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([year, events]) => (
            <section key={year}>
              <div className="mb-8 flex items-end justify-between border-b border-[#575253] pb-4">
                <h3 className="font-mono text-4xl font-bold tracking-[0.16em] text-[#EAE0D5] sm:text-5xl sm:tracking-[0.28em]">
                  {year}
                </h3>

                <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#8C86AA]/80 sm:text-sm sm:tracking-[0.18em]">
                  {events.length} Events
                </p>
              </div>

              <div className="grid gap-x-16 gap-y-6 lg:grid-cols-2">
                {events.map((event) => (
                  <div
                    key={`${event.name}-${event.placement}`}
                    className="grid min-w-0 grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1 font-mono sm:grid-cols-[auto_1fr_auto] sm:gap-5"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#8C86AA] sm:tracking-[0.18em]">
                      [
                    </span>

                    <div className="flex min-w-0 items-center gap-4">
                      <span className="shrink-0 text-sm font-bold uppercase tracking-[0.08em] text-[#EAE0D5] sm:text-base sm:tracking-[0.10em]">
                        {event.placement}
                      </span>

                      <span className="min-w-0 truncate text-sm font-semibold text-[#C8C0B6] sm:text-base">
                        {event.name}
                      </span>

                      <span className="h-px flex-1 border-t border-dotted border-[#575253]" />
                    </div>

                    <span className="hidden text-sm font-bold uppercase tracking-[0.14em] text-[#8C86AA]/70 sm:inline">
                      {event.category}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
