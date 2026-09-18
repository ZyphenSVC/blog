export type Competition = {
  name: string;
  year: number;
  placement: number | "Semifinalist";
  fieldSize?: number;
  team?: string;
  region?: string;
  detail?: string;
  category: "CTF" | "CyberPatriot" | "Scholarship" | "FBLA" | "Mathematics";
  source: "archive" | "cv";
};

// Archive: src/pages/index.js at 960835faffd09e5ff786ae96a6295df232b8f2b4.
// CV: public/media/cv.pdf, September 2026, pp. 3–4.
// The newer CV takes precedence for picoCTF 2022 (22nd vs. 27th),
// NCL Spring 2021 Team (22nd vs. 26th), and TJCTF 2019's solo attribution.
// Unknown field sizes in the archive are intentionally omitted.
export const competitions: Competition[] = [
  {
    "name": "PicoCTF 2019",
    "year": 2019,
    "placement": 33,
    "team": "Egg Heads (Solo)",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 60595
  },
  {
    "name": "NGA CTF 2019",
    "year": 2019,
    "placement": 35,
    "team": "Egg Heads",
    "category": "CTF",
    "source": "archive"
  },
  {
    "name": "ångstromCTF 2019",
    "year": 2019,
    "placement": 71,
    "team": "Egg Heads",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 1570
  },
  {
    "name": "TJCTF 2019",
    "year": 2019,
    "placement": 65,
    "team": "Egg Heads (Solo)",
    "category": "CTF",
    "source": "cv",
    "fieldSize": 483
  },
  {
    "name": "NeverLAN CTF 2020",
    "year": 2020,
    "placement": 114,
    "team": "Egg Heads",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 1158
  },
  {
    "name": "TJCTF 2020",
    "year": 2020,
    "placement": 298,
    "team": "Egg Heads",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 1205
  },
  {
    "name": "Newark Academy CTF 2020",
    "year": 2020,
    "placement": 76,
    "team": "Egg Heads",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 968
  },
  {
    "name": "NCL Fall 2020 Preseason",
    "year": 2020,
    "placement": 41,
    "team": "sriadityavedantam",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 6072
  },
  {
    "name": "NCL Fall 2020 Individual Game",
    "year": 2020,
    "placement": 38,
    "team": "sriadityavedantam",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 6013
  },
  {
    "name": "NCL Fall 2020 Team Game",
    "year": 2020,
    "placement": 27,
    "team": "Egg Heads",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 957
  },
  {
    "name": "X-MAS CTF 2020",
    "year": 2020,
    "placement": 9,
    "team": "ducks0ci3ty",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 1064
  },
  {
    "name": "KSU ISA CTF 2020",
    "year": 2020,
    "placement": 3,
    "team": "sriadityavedantam",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 12
  },
  {
    "name": "JustCTF 2020",
    "year": 2020,
    "placement": 189,
    "team": "ducks0ci3ty",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 804
  },
  {
    "name": "DiceCTF 2021",
    "year": 2021,
    "placement": 282,
    "team": "ducks0ci3ty",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 1059
  },
  {
    "name": "NGA CTF 2021",
    "year": 2021,
    "placement": 17,
    "team": "sriadityavedantam",
    "category": "CTF",
    "source": "archive"
  },
  {
    "name": "NCL Spring 2021 Preseason",
    "year": 2021,
    "placement": 93,
    "team": "sriadityavedantam",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 5794
  },
  {
    "name": "NCL Spring 2021 Individual Game",
    "year": 2021,
    "placement": 29,
    "team": "sriadityavedantam",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 4180
  },
  {
    "name": "NCL Spring 2021 Team Game",
    "year": 2021,
    "placement": 22,
    "team": "Egg Heads",
    "category": "CTF",
    "source": "cv",
    "fieldSize": 922
  },
  {
    "name": "National Cyber Scholarship Competition 2021",
    "year": 2021,
    "placement": 51,
    "team": "sriadityavedantam",
    "category": "Scholarship",
    "source": "archive",
    "fieldSize": 3277,
    "detail": "National Cyber Scholar · 2nd in Georgia · $3,000 scholarship"
  },
  {
    "name": "HackTheBox Cyber Apocalypse 2021",
    "year": 2021,
    "placement": 140,
    "team": "ducks0ci3ty",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 4740
  },
  {
    "name": "CSAW '21 Qualifiers",
    "year": 2021,
    "placement": 140,
    "team": "ducks0ci3ty",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 1216
  },
  {
    "name": "H@cktivityCon 2021 CTF",
    "year": 2021,
    "placement": 37,
    "team": "ducks0ci3ty",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 1721
  },
  {
    "name": "DownUnderCTF 2021",
    "year": 2021,
    "placement": 206,
    "team": "ducks0ci3ty",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 1594
  },
  {
    "name": "TamilCTF 2021",
    "year": 2021,
    "placement": 16,
    "team": "ducks0ci3ty",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 333
  },
  {
    "name": "DeconstruCT.F 2021",
    "year": 2021,
    "placement": 4,
    "team": "ducks0ci3ty",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 300
  },
  {
    "name": "pbctf 2021",
    "year": 2021,
    "placement": 44,
    "team": "The Teamless",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 210
  },
  {
    "name": "NCL Fall 2021 Preseason",
    "year": 2021,
    "placement": 56,
    "team": "sriadityavedantam",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 6455
  },
  {
    "name": "NCL Fall 2021 Individual",
    "year": 2021,
    "placement": 48,
    "team": "sriadityavedantam",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 6481
  },
  {
    "name": "NCL Fall 2021 Team",
    "year": 2021,
    "placement": 35,
    "team": "Egg Heads",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 3917
  },
  {
    "name": "UTCTF 2022",
    "year": 2022,
    "placement": 23,
    "team": "TAMU Cyber Club",
    "category": "CTF",
    "source": "archive",
    "fieldSize": 560
  },
  {
    "name": "picoCTF 2022",
    "year": 2022,
    "placement": 22,
    "team": "The Teamless A",
    "category": "CTF",
    "source": "cv",
    "fieldSize": 7794
  },
  {
    "name": "CyberPatriot X",
    "year": 2018,
    "placement": "Semifinalist",
    "region": "",
    "detail": "Middle School Division · Top 100 nationally",
    "category": "CyberPatriot",
    "source": "cv"
  },
  {
    "name": "CyberPatriot XI",
    "year": 2019,
    "placement": "Semifinalist",
    "region": "",
    "detail": "Gold Division · Top 100 nationally",
    "category": "CyberPatriot",
    "source": "cv"
  },
  {
    "name": "CyberPatriot XII",
    "year": 2020,
    "placement": 1,
    "region": "Georgia",
    "detail": "Platinum Division · Semifinalist · Top 30 nationally",
    "category": "CyberPatriot",
    "source": "cv"
  },
  {
    "name": "CyberPatriot XIII",
    "year": 2021,
    "placement": 1,
    "region": "Georgia",
    "detail": "Platinum Division · Semifinalist · Top 30 nationally",
    "category": "CyberPatriot",
    "source": "cv"
  },
  {
    "name": "CyberPatriot XIV",
    "year": 2022,
    "placement": 1,
    "region": "Georgia",
    "detail": "Platinum Division · Semifinalist · Top 30 nationally",
    "category": "CyberPatriot",
    "source": "cv"
  },
  {
    "name": "FBLA National Leadership Conference",
    "year": 2021,
    "placement": 7,
    "detail": "Management Information Systems · National finalist",
    "category": "FBLA",
    "source": "cv"
  },
  {
    "name": "FBLA National Leadership Conference",
    "year": 2022,
    "placement": 8,
    "detail": "Management Information Systems · National finalist",
    "category": "FBLA",
    "source": "cv"
  },
  {
    "name": "Kossack Exam",
    "year": 2023,
    "placement": 3,
    "fieldSize": 50,
    "detail": "University of Georgia",
    "category": "Mathematics",
    "source": "cv"
  }
];
