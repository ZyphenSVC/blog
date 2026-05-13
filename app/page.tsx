import Navbar from "@/app/components/Navbar"
import Link from "next/link"
import Image from "next/image"
import { ExperienceSection } from "@/app/components/ExperienceSection"
import { PostSection } from "@/app/components/PostSection"
import { CompetitiveHistory } from "@/app/components/CompetitiveHistorySection"

export default function Home() {

  return (
    <main className="min-h-screen bg-[#252324]">
      <Navbar />
      <section className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <aside className="flex flex-col justify-start border-[#575253] px-8 py-14 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:border-r lg:px-10 lg:pt-14">
          <div className="mb-8 h-44 w-44 overflow-hidden rounded-full">
            <Image
              src="/media/face.jpg"
              alt="ProfessionalPicture"
              width={220}
              height={220}
              priority
              className="h-full w-full scale-125 object-cover translate-x-[24px]"
            />
          </div>

          <p className="max-w-[420px] mb-6 font-mono text-sm font-bold uppercase tracking-[0.22em] text-[#8C86AA]">
            Cryptography / Math / Systems
          </p>

          <h1 className="font-mono text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-[#EAE0D5] sm:text-6xl xl:text-7xl max-w-[520px]">
            Sriaditya
            <br />
            Vedantam
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-[#C8C0B6]">
            Technical writing, research notes, and implementation work across
            cryptography, mathematics, systems engineering, and full-stack web
            development.
          </p>

          <div className="mt-10 flex flex-wrap gap-6 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C8C0B6]">
            <Link href="/contact" className="hover:text-[#EAE0D5]">
              Contact
            </Link>
            <Link href="/blog" className="hover:text-[#EAE0D5]">
              Blog
            </Link>
            <Link href="/research" className="hover:text-[#EAE0D5]">
              Research
            </Link>
            <Link href="/notes" className="hover:text-[#EAE0D5]">
              Notes
            </Link>
            <Link href="/projects" className="hover:text-[#EAE0D5]">
              Projects
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/media/resume.pdf"
              className="border border-[#8C86AA] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#EAE0D5] transition hover:bg-[#8C86AA] hover:text-[#252324]"
            >
              Resume
            </Link>

            <Link
              href="/media/cv.pdf"
              className="border border-[#575253] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C8C0B6] transition hover:border-[#EAE0D5] hover:text-[#EAE0D5]"
            >
              CV
            </Link>
          </div>
        </aside>

        <section className="min-w-0 px-8 pt-6 pb-20 lg:px-14 lg:pt-8">
          <ExperienceSection
            titleTop="Education"
            titleBottom="Background"
            items={[
              {
                org: "University of Georgia",
                role: "B.S. Computer Science",
                date: "May 2026",
                location: "Athens, GA",
                description:
                  "Graduated with Bachelor of Science in Computer Science with academic focus" +
                  " areas across theoretical computer science, cybersecurity, and" +
                  " systems-oriented computing.",
                tags: [
                  "#computer-science",
                  "#theoretical-cs",
                  "#cybersecurity",
                ],
              },
              {
                org: "University of Georgia",
                role: "B.S. Mathematics",
                date: "May 2026",
                location: "Athens, GA",
                description:
                  "Graduated with Bachelor of Science degrees in" +
                  " Mathematics, with academic focus areas across pure mathematics, algebraic" +
                  " geometry, and cryptography",
                tags: [
                  "#mathematics",
                  "#algebra",
                  "#geometry",
                  "#cryptography",
                  "#pure-math",
                ],
              },
            ]}
          />

          <PostSection
            titleTop="Recent"
            titleBottom="Posts"
            href="/blog"
            linkLabel="View All"
            items={[
              {
                date: "May 2026",
                type: "Research",
                title: "Building a Research Professional Portfolio v.2",
                description:
                  "Design notes on building a fast Next.js and Cloudflare Pages blog for research writing, course notes, and project documentation.",
                tags: ["#nextjs", "#cloudflare", "#systems"],
              },
              {
                date: "May 2026",
                type: "Cryptography",
                title: "Notes on Privacy-Preserving Computation",
                description:
                  "A working collection of notes on applied cryptography, FHE, and research directions in secure computation.",
                tags: ["#math", "#cryptography", "#fhe", "#research"],
              },
              {
                date: "May 2026",
                type: "Cryptography",
                title: "Researching Graph Theory Optimization Utilizing Networks",
                description:
                  "Looking into graph theory implementation when mapping networks and nodes with Active Directory.",
                tags: ["#graphtheory", "#activedirectory", "#cybersecurity", "#research"],
              },
            ]}
          />

          <ExperienceSection
            titleTop="Research"
            titleBottom="Experience"
            href="/research"
            linkLabel="View Research"
            items={[
              {
                org: "Small Satellite Research Lab",
                role: "Data Science Team Lead Researcher",
                date: "August 2024 — Present",
                location: "Athens, GA",
                description:
                  "Designed and optimized ML/data pipelines for satellite imaging systems, including NeRF and computer vision pipelines, with attention to scalability and heterogeneous GPU/CPU environments.",
                tags: ["#nerf", "#mlcv", "#satellite-imaging", "#gpu-systems"],
              },
              {
                org: "Directed Reading Program",
                role: "Researcher",
                date: "January 2023 — May 2025",
                location: "Athens, GA",
                description:
                  "Reading and presenting on elliptic curves, the Birch and Swinnerton-Dyer conjecture, discrete logarithms, Kähler manifolds, complex geometry, and cryptographic applications.",
                tags: ["#elliptic-curves", "#cryptography", "#complex-geometry"],
              },
              {
                org: "University of Georgia — Mathematics Department",
                role: "Undergraduate Researcher",
                date: "August 2024 — December 2025",
                location: "Athens, GA",
                description:
                  "Studying exceptional Lie algebras, Coxeter-Dynkin diagrams, algebraic geometry, and research-level mathematical exposition.",
                tags: ["#algebraic-geometry", "#lie-algebras", "#coxeter-dynkin"],
              },
              {
                org: "ImaginaryCTF",
                role: "Board Member",
                date: "November 2020 — May 2023",
                location: "Leuven, Belgium",
                description:
                  "Designed cryptography challenges grounded in current research, coordinated international CTF operations, and worked with sponsors across security and infrastructure.",
                tags: ["#ctf", "#iacr", "#cryptography", "#security"],
              },
              {
                org: "Georgia Institute of Technology — Mathematics Department",
                role: "Research Project Developer",
                date: "August 2021 — December 2021",
                location: "Atlanta, GA",
                description:
                  "Built a graph theory route-mapping application in Java using Dijkstra’s algorithm, Eulerian circuit logic, and Open Maps API calls for real-world pathfinding and traversal modeling.",
                tags: ["#graph-theory", "#dijkstra", "#java", "#pathfinding"],
              },
            ]}
          />

          <ExperienceSection
            titleTop="Leadership"
            titleBottom="Experience"
            items={[
              {
                org: "Small Satellite Research Laboratory",
                role: "Data Science Team Lead",
                date: "August 2024 — Present",
                location: "University of Georgia",
                description:
                  "Led a research engineering team of 12 members by defining technical milestones, coordinating cross-functional development, and translating research requirements into deployable ML/CV systems for satellite imaging work.",
                tags: ["#research-leadership", "#mlcv", "#team-lead", "#systems"],
              },
              {
                org: "Hats On Cybersecurity",
                role: "Founder & President",
                date: "Fall 2022 — Fall 2023",
                location: "University of Georgia",
                description:
                  "Founded and led a cybersecurity club focused on teaching competition-based cybersecurity to students across experience levels, emphasizing deeper technical training than typical introductory club programming.",
                tags: ["#cybersecurity", "#leadership", "#education", "#ctf"],
              },
              {
                org: "Egg Heads Cyber Team",
                role: "Team Captain",
                date: "High School",
                location: "Georgia",
                description:
                  "Led cybersecurity competition teams through state and national events, including repeated first-place Georgia finishes in CyberPatriot competitions.",
                tags: ["#cyberpatriot", "#team-captain", "#competition", "#cybersecurity"],
              },
              {
                org: "ImaginaryCTF",
                role: "Board Member & Infrastructure Contributor",
                date: "Nov 2020 — May 2023",
                location: "International",
                description:
                  "Helped host international cybersecurity events, handled support and incidents, deployed new services, and contributed to uptime, stability, and challenge quality for a global CTF platform.",
                tags: ["#imaginaryctf", "#infrastructure", "#ctf", "#operations"],
              },
              {
                org: "CyberAvengers",
                role: "Vice President & Team Captain",
                date: "High School",
                location: "Georgia",
                description:
                  "Served in leadership roles across four years, organizing cybersecurity events, mentoring students, and leading workshops on competition-based cybersecurity.",
                tags: ["#mentorship", "#workshops", "#cybersecurity", "#leadership"],
              },
              {
                org: "Ducksociety / TeamlessCTF",
                role: "Competitive Team Member",
                date: "2020 — 2022",
                location: "International",
                description:
                  "Participated with competitive CTF teams that placed highly in international events, contributing to cybersecurity problem-solving across cryptography, systems, and exploitation challenges.",
                tags: ["#ctf", "#ducksociety", "#teamlessctf", "#competition"],
              },
            ]}
          />

          <ExperienceSection
            titleTop="Certifications"
            titleBottom="In Progress"
            items={[
              {
                org: "Amazon Web Services",
                role: "AWS Solutions Architect — Associate",
                date: "In Progress",
                location: "Cloud Certification",
                description:
                  "Currently preparing for AWS Solutions Architect Associate certification with focus on cloud architecture, deployment models, networking, storage, security, and resilient system design.",
                tags: ["#aws", "#cloud-architecture", "#solutions-architect"],
              },
              {
                org: "Amazon Web Services",
                role: "AWS Security Specialty",
                date: "Planned",
                location: "Cloud Security",
                description:
                  "Planned certification path focused on cloud security architecture, identity and access management, logging, monitoring, encryption, and incident response.",
                tags: ["#aws", "#cloud-security", "#iam", "#security"],
              },
              {
                org: "MongoDB",
                role: "MongoDB Certifications",
                date: "Planned",
                location: "Database Systems",
                description:
                  "Planned certification path focused on document databases, schema design, indexing, aggregation, application integration, and production database practices.",
                tags: ["#mongodb", "#databases", "#backend", "#nosql"],
              },
              {
                org: "CompTIA",
                role: "Security+",
                date: "Expired",
                location: "Cybersecurity",
                description:
                  "Previously held Security+ certification, supporting foundational knowledge in cybersecurity, networking, risk, and secure systems practices.",
                tags: ["#security-plus", "#cybersecurity", "#networking"],
              },
              {
                org: "Microsoft",
                role: "MTA Software Development & Networking",
                date: "Expired",
                location: "Technical Foundations",
                description:
                  "Previously held Microsoft Technology Associate certifications in software development and networking fundamentals.",
                tags: ["#microsoft", "#software-development", "#networking"],
              },
            ]}
          />

          <ExperienceSection
            titleTop="Work"
            titleBottom="Experience"
            items={[
              {
                org: "University of Georgia",
                role: "Parking Operations Representative",
                date: "March 2024 — Present",
                location: "Athens, GA",
                description:
                  "Engineered Selenium automation workflows executing 40,000+ system tasks, eliminating a 6-month backlog while improving reporting reliability and operational efficiency.",
                tags: ["#automation", "#selenium", "#operations", "#secure-design"],
              },
              {
                org: "Cornerstone Entertainment Company",
                role: "Community Specialist Manager",
                date: "Spring 2021 — Fall 2021",
                location: "Raleigh, NC",
                description:
                  "Managed community operations for a network of 200 users, improving retention, staffing stability, and customer satisfaction through coordination with developers.",
                tags: ["#operations", "#community", "#platform-reliability"],
              },
            ]}
          />

          <ExperienceSection
            titleTop="Teaching"
            titleBottom="Experience"
            items={[
              {
                org: "University of Georgia — Department of Academic Enhancement",
                role: "Peer Learning Assistant",
                date: "Spring 2023 — Fall 2023",
                location: "Athens, GA",
                description:
                  "Supported Calculus II and III instruction through discussion facilitation, homework review, individual student support, and weekly office hours.",
                tags: ["#calculus", "#teaching", "#mathematics", "#student-support"],
              },
            ]}
          />

          <ExperienceSection
            titleTop="Awards /"
            titleBottom="Honors"
            items={[
              {
                org: "Kossack Exam",
                role: "Third Place Award",
                date: "2023",
                location: "University of Georgia",
                description:
                  "Placed third in a mathematics competition with roughly 50 participants.",
                tags: ["#mathematics", "#competition", "#award"],
              },
              {
                org: "CyberPatriot XII - XIV",
                role: "First Place Georgia",
                date: "2020 - 2022",
                location: "Georgia",
                description:
                  "Finished first in Georgia and Top 30 nationally as a Platinum Division semifinalist.",
                tags: ["#cybersecurity", "#cyberpatriot", "#competition"],
              },
              {
                org: "National Cyber Scholarship Foundation",
                role: "National Cyber Scholar",
                date: "2021",
                location: "United States",
                description:
                  "Ranked 51st among more than 3,000 qualifiers and more than 10,000 competitors; awarded a $3,000 scholarship.",
                tags: ["#cybersecurity", "#scholarship", "#national-cyber-scholar"],
              },
              {
                org: "FBLA National Leadership Conference",
                role: "National Finalist — Management Information Systems",
                date: "2021, 2022",
                location: "United States",
                description:
                  "Placed seventh nationally while representing Georgia in a case study competition.",
                tags: ["#mis", "#case-study", "#national-finalist"],
              },
            ]}
          />

        </section>
      </section>

      <CompetitiveHistory />
    </main>
  );
}
