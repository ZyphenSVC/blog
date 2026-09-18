// Source: public/media/cv.pdf, September 2026, pages 1–5.
// Existing portfolio-only roles and certification plans remain on the homepage.
export const academicTalks = [
  {
    title: "Crash Course on Competitive Cryptography",
    format: "Lecture series",
    date: "October 27–29, 2026",
    startDate: "2026-10-27",
    endDate: "2026-10-29",
    venue: "University of Georgia — The Hack Pack — Society for Cybersecurity",
    location: "Athens, GA",
    status: "Scheduled",
  },
  {
    title: "Rational Solutions to Pythagorean Triples",
    format: "Invited lecture",
    date: "November 29, 2023",
    startDate: "2023-11-29",
    venue: "University of Georgia — Mathematics Student Seminar",
    programUrl: "https://www.math.uga.edu/directed-reading-program",
    location: "Athens, GA",
  },
  {
    title: "Primes and Fakes, Carmichael and the Twisted Prime Omega Function",
    format: "Invited lecture",
    date: "April 27, 2023",
    startDate: "2023-04-27",
    venue: "University of Georgia — Mathematics Student Seminar",
    programUrl: "https://www.math.uga.edu/directed-reading-program",
    location: "Athens, GA",
  },
];

// The two 2023 seminar citations in the CV refer to the named talks above.
// Keep each presentation once, as confirmed by the portfolio owner.

export const researchExperience = [
  {
    org: "Small Satellite Research Lab, University of Georgia",
    role: "Data Science Team Lead Researcher",
    date: "August 2024 — May 2026",
    location: "Athens, GA",
    description: "Led a team of 12 researchers developing neural networks, NeRF, and computer vision pipelines for satellite and drone imaging.",
    highlights: [
      "Applied computational topology and tensor-based approaches to neural network implementation and optimization.",
      "Defined short-term milestones that increased departmental output by over 80%.",
      "Evaluated machine learning frameworks and selected PyTorch for the research pipelines.",
      "Studied space-to-ground data transmission, transmitter viability, and wavelength coverage over areas of less than 50 miles, with attention to image and video accuracy.",
      "Assessed project viability for grants exceeding $100,000 from NASA and the Air Force Association.",
    ],
    tags: ["#nerf", "#pytorch", "#computational-topology", "#satellite-imaging"],
  },
  {
    org: "Directed Reading Program",
    role: "Researcher",
    date: "January 2023 — May 2025",
    location: "Athens, GA",
    description: "Reading and presenting on elliptic curves, the Birch and Swinnerton-Dyer conjecture, discrete logarithms, Kähler manifolds, complex geometry, and cryptographic applications.",
    tags: ["#elliptic-curves", "#cryptography", "#complex-geometry"],
  },
  {
    org: "University of Georgia — Mathematics Department",
    role: "Undergraduate Researcher",
    date: "January 2024 — December 2025",
    location: "Athens, GA",
    description: "Studied exceptional Lie algebras, Coxeter-Dynkin diagrams, algebraic geometry, and applications of elliptic curves in cryptography.",
    highlights: [
      "Read research papers connecting algebraic geometry and Lie theory, building experience in mathematical research and exposition.",
      "Investigated the Birch and Swinnerton-Dyer conjecture, the discrete logarithm problem, and Fermat’s Little Theorem.",
      "Implemented early elliptic curve cryptography algorithms and studied weaknesses in proposed post-quantum isogeny-based systems, including SIKE.",
      "Explored Kähler manifolds and complex geometry.",
    ],
    tags: ["#algebraic-geometry", "#lie-algebras", "#elliptic-curves", "#cryptography"],
  },
  {
    org: "ImaginaryCTF",
    role: "Board Member",
    date: "November 2020 — May 2023",
    location: "Leuven, Belgium",
    description: "Helped host an international cybersecurity competition with 60,000 participants and designed research-based cryptography challenges.",
    highlights: [
      "Coordinated operations and prize logistics with Google, TryHackMe, OtterSec, and DigitalOcean.",
      "Used International Association for Cryptologic Research (IACR) publications to improve challenge quality and integrity.",
      "Oversaw teams and distributed systems supporting the platform’s projects and software.",
    ],
    tags: ["#ctf", "#iacr", "#cryptography", "#infrastructure"],
  },
  {
    org: "Georgia Institute of Technology — Mathematics Department",
    role: "Research Project Developer",
    date: "August 2021 — December 2021",
    location: "Atlanta, GA",
    description: "Built a graph theory route-mapping application in Java using Dijkstra’s algorithm, Eulerian circuit logic, and Open Maps API calls for real-world pathfinding and traversal modeling.",
    tags: ["#graph-theory", "#dijkstra", "#java", "#pathfinding"],
  },
];

export const workExperience = [
  {
    org: "Athens Micro",
    role: "Solutions Engineer",
    date: "July 2026 — Present",
    location: "Watkinsville, GA",
    description: "Build internal automation and API integrations across IT, dispatch, HR, and operations using PowerShell, TypeScript, SQL, n8n, and REST APIs.",
    highlights: [
      "Integrate ConnectWise Manage, NinjaOne, and the Claude API to streamline ticketing, reporting, and internal processes.",
      "Independently scope projects, assess feasibility, set priorities and deadlines, troubleshoot issues, and deliver solutions to stakeholders and clients.",
    ],
    tags: ["#automation", "#api-integrations", "#powershell", "#typescript", "#n8n"],
  },
  {
    org: "University of Georgia",
    role: "Parking Operations Representative",
    date: "March 2024 — July 2026",
    location: "Athens, GA",
    description: "Engineered a Selenium automation pipeline executing 40,000+ system tasks and eliminating a six-month operational backlog.",
    highlights: [
      "Improved reporting accuracy and system reliability through repeatable workflow design.",
      "Resolved bottlenecks for a 60% efficiency increase in operational and reporting processes.",
      "Maintained financial and operational data-handling compliance and applied secure design principles to automation workflows.",
    ],
    tags: ["#automation", "#selenium", "#operations", "#secure-design"],
  },
  {
    org: "Cornerstone Entertainment Company",
    role: "Community Specialist Manager",
    date: "January 2021 — December 2021",
    location: "Raleigh, NC",
    description: "Managed community operations for a network of 200 users, stabilizing staffing and improving retention and engagement.",
    highlights: ["Coordinated with developers on platform reliability, increasing customer satisfaction by 75%."],
    tags: ["#operations", "#community", "#platform-reliability"],
  },
];

export const teachingExperience = [
  {
    org: "University of Georgia — Mathematics Department",
    role: "Peer Learning Assistant",
    date: "January 2023 — December 2023",
    location: "Athens, GA",
    description: "Helped co-instruct Calculus II and III for Scientists and Engineers, working with a lead professor and presenting material curated by Dr. Jacob Hicks.",
    highlights: [
      "Provided individual support and reasoning through problems during class.",
      "Delivered lectures, reviewed homework and classwork, and facilitated student discussion.",
      "Held office hours weekly and by appointment.",
    ],
    tags: ["#calculus", "#teaching", "#mathematics", "#student-support"],
  },
];

export const serviceRoles = [
  { organization: "Math Club", role: "VP of Communications and Promotion", date: "Fall 2025 — Present" },
  { organization: "The Hack Pack", role: "Red Team", date: "Fall 2023 — Present" },
  { organization: "Hats On Cybersecurity", role: "President", date: "Fall 2022 — Fall 2023", note: "Merged into The Hack Pack." },
];

export const skillGroups = [
  { title: "Programming", items: ["C", "C++", "C#", "Java", "Python", "SQL"] },
  { title: "Research & computing", items: ["ML/CV frameworks", "SageMath", "JupyterLab", "Technical writing and reading"] },
  { title: "Engineering", items: ["Full-stack development", "Cloud infrastructure", "Database administration"] },
];

export const languages = [
  { name: "English", proficiency: "Native" },
  { name: "Telugu", proficiency: "Native" },
];

export type Course = { code: string; title: string; term: string; audited?: boolean };

export const coursework: Course[] = [
  {
    "code": "CSCI 1302",
    "title": "Software Development",
    "term": "Fall 2022"
  },
  {
    "code": "FYOS 1001",
    "title": "Effects of AI in the Modern Working World (Dr. Suchi Bhandarkar)",
    "term": "Fall 2022"
  },
  {
    "code": "MATH 2250",
    "title": "Calculus I for Scientists and Engineers",
    "term": "Fall 2022"
  },
  {
    "code": "CSCI 2610",
    "title": "Discrete Mathematics for Computer Science",
    "term": "Spring 2023"
  },
  {
    "code": "MATH 2260",
    "title": "Calculus II for Scientists and Engineers",
    "term": "Spring 2023"
  },
  {
    "code": "MATH 3200",
    "title": "Introduction to Mathematical Proofs",
    "term": "Spring 2023"
  },
  {
    "code": "MATH 2700",
    "title": "Elementary Differential Equations",
    "term": "Summer 2023"
  },
  {
    "code": "MATH 2500",
    "title": "Accelerated Calculus III for Engineers",
    "term": "Fall 2023"
  },
  {
    "code": "MATH 3100",
    "title": "Introduction to Mathematical Analysis (prev. Sequences and Series)",
    "term": "Fall 2023"
  },
  {
    "code": "MATH 6000",
    "title": "Abstract Algebra I (prev. Modern Algebra and Geometry I)",
    "term": "Fall 2023"
  },
  {
    "code": "CSCI 1730",
    "title": "Systems Programming",
    "term": "Fall 2023"
  },
  {
    "code": "MATH 3000",
    "title": "Introduction to Linear Algebra",
    "term": "Spring 2024"
  },
  {
    "code": "MATH 6010",
    "title": "Abstract Algebra II (prev. Modern Algebra and Geometry II)",
    "term": "Spring 2024"
  },
  {
    "code": "MATH 4950",
    "title": "Research in Mathematics",
    "term": "Spring 2024"
  },
  {
    "code": "CSCI 2720",
    "title": "Data Structures",
    "term": "Summer 2024"
  },
  {
    "code": "MATH 8300",
    "title": "Introduction to Algebraic Geometry",
    "term": "Fall 2024"
  },
  {
    "code": "CSCI 2670",
    "title": "Introduction to Theory of Computing",
    "term": "Spring 2025"
  },
  {
    "code": "CSCI 4370",
    "title": "Database Management",
    "term": "Spring 2025"
  },
  {
    "code": "MATH 8330",
    "title": "Hodge Theory",
    "term": "Spring 2025",
    "audited": true
  },
  {
    "code": "MATH 8200",
    "title": "Algebraic Topology",
    "term": "Spring 2025",
    "audited": true
  },
  {
    "code": "CSCI 4720",
    "title": "Computer Architecture and Organization",
    "term": "Summer 2025"
  },
  {
    "code": "CSCI 4760",
    "title": "Computer Networks",
    "term": "Summer 2025"
  },
  {
    "code": "CSCI 4380",
    "title": "Data Mining",
    "term": "Fall 2025"
  },
  {
    "code": "CSCI 4670",
    "title": "Combinatorics",
    "term": "Fall 2025"
  },
  {
    "code": "MATH 6100",
    "title": "Real Analysis",
    "term": "Fall 2025"
  },
  {
    "code": "MATH 8000",
    "title": "Algebra",
    "term": "Fall 2025",
    "audited": true
  },
  {
    "code": "CSCI 4470",
    "title": "Algorithms",
    "term": "Spring 2026"
  },
  {
    "code": "CSCI 4800",
    "title": "Human-Computer Interaction",
    "term": "Spring 2026"
  },
  {
    "code": "CSCI 4300",
    "title": "Web Programming",
    "term": "Spring 2026"
  },
  {
    "code": "CSCI 6730",
    "title": "Operating Systems",
    "term": "Fall 2026"
  },
  {
    "code": "CSCI 6760",
    "title": "Computer Networks",
    "term": "Fall 2026"
  },
  {
    "code": "CSCI 6950",
    "title": "Graduate Research",
    "term": "Fall 2026"
  },
  {
    "code": "CSCI 8000",
    "title": "Special Topics in Applied Cryptography",
    "term": "Fall 2026"
  },
  {
    "code": "CSCI 8960",
    "title": "Privacy Preserving Data Analysis / Machine Learning (Differential Privacy)",
    "term": "Fall 2026"
  }
];
