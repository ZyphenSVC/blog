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
    <section className="border-t border-[#575253] bg-[#252324] px-8 pt-14 pb-24 text-[#EAE0D5] lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-24 text-center">
          <h2 className="font-mono text-5xl font-bold uppercase tracking-[0.24em] text-[#EAE0D5] md:text-6xl">
            Competitive History
          </h2>
          <p className="mt-5 font-mono text-sm font-bold uppercase tracking-[0.22em] text-[#8C86AA]">
            CTFs / Cybersecurity / Honors
          </p>
        </div>

        <div className="space-y-20">
          {Object.entries(competitiveHistory)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([year, events]) => (
            <section key={year}>
              <div className="mb-8 flex items-end justify-between border-b border-[#575253] pb-4">
                <h3 className="font-mono text-5xl font-bold tracking-[0.28em] text-[#EAE0D5]">
                  {year}
                </h3>

                <p className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-[#8C86AA]/80">
                  {events.length} Events
                </p>
              </div>

              <div className="grid gap-x-16 gap-y-6 lg:grid-cols-2">
                {events.map((event) => (
                  <div
                    key={`${event.name}-${event.placement}`}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-5 font-mono"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#8C86AA]">
                      [
                    </span>

                    <div className="flex min-w-0 items-center gap-4">
                      <span className="shrink-0 text-base font-bold uppercase tracking-[0.10em] text-[#EAE0D5]">
                        {event.placement}
                      </span>

                      <span className="truncate text-base font-semibold text-[#C8C0B6]">
                        {event.name}
                      </span>

                      <span className="h-px flex-1 border-t border-dotted border-[#575253]" />
                    </div>

                    <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#8C86AA]/70">
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