import Link from "next/link"
import Image from "next/image"
import { ExperienceSection } from "@/app/components/ExperienceSection"
import { PostSection } from "@/app/components/PostSection"
import { CompetitiveHistory } from "@/app/components/CompetitiveHistorySection"
import { getAllPosts } from "@/lib/posts"
import { Icon } from "@/app/components/Icon"

export default async function Home() {

  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 2).map((post) => ({
    date: post.date,
    type: post.tags?.[0] ?? "Writing",
    title: post.title,
    description: post.description,
    tags: post.tags ?? [],
    href: `/blog/${post.slug}`,
  }));

  return (
    <main id="main-content">
      <section className="intro content-container" aria-labelledby="intro-title">
        <div className="intro-grid">
          <div className="intro-copy fade-in">
            <h1 id="intro-title" className="reveal-text">Hi, I’m Sriaditya.<br />I research things.</h1>
            <p>I’m Sriaditya Vedantam, a security researcher working across cryptography, mathematics, and systems engineering.</p>
            <p>Interested in algebraic geometry, post-quantum cryptography, and homomorphic encryption.</p>
            <p>I write about research, build software, and study privacy-preserving machine learning at the University of Georgia.</p>
            <div className="intro-links">
              <Link href="/media/resume.pdf"><Icon name="download" />Resume</Link>
              <Link href="/media/cv.pdf"><Icon name="document" />Curriculum Vitae</Link>
              <Link href="/contact"><Icon name="mail" />Get in touch</Link>
              <a href="#competitions"><Icon name="trophy" />Competitions</a>
            </div>
          </div>
          <Image
            src="/media/optimized/face_circ.webp"
            alt="Sriaditya Vedantam"
            width={270}
            height={270}
            priority
            className="portrait fade-in"
          />
        </div>
        {posts[0] && (
          <aside className="latest-post surface-card fade-in" aria-labelledby="latest-post-title">
            <h2 id="latest-post-title" className="icon-heading"><Icon name="pen" />Latest post</h2>
            <h3><Link href={`/blog/${posts[0].slug}`}>{posts[0].title}</Link></h3>
            <p>{posts[0].description}</p>
            <Link href="/blog" className="all-posts">All posts →</Link>
          </aside>
        )}
      </section>
      <div className="content-container">
          <ExperienceSection
            titleTop="Education"
            icon="education"
            columns={3}
            titleBottom="Background"
            items={[
	      {
                org: "University of Georgia",
                role: "M.S. Cybersecurity and Privacy (Thesis)",
                date: "Expected May 2028",
                location: "Athens, GA",
                description:
                  "Emphasis on cryptography: Homomorphic Encryption and Privacy Preserving Machine Learning.",
                tags: [
                  "#cryptography",
		  "#privacy-preserving",
		  "#machine-learning"
                ],
              },
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
            items={recentPosts}
          />

          <ExperienceSection
            titleTop="Research"
            icon="research"
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
            icon="users"
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
                image: { src: "/media/classic/cyberdog.webp", alt: "Hats On Cybersecurity logo", width: 900, height: 885 },
                date: "Fall 2022 — Fall 2023",
                location: "University of Georgia",
                description:
                  "Founded and led a cybersecurity club focused on teaching competition-based cybersecurity to students across experience levels, emphasizing deeper technical training than typical introductory club programming.",
                tags: ["#cybersecurity", "#leadership", "#education", "#ctf"],
              },
              {
                org: "Egg Heads Cyber Team",
                role: "Team Captain",
                image: { src: "/media/classic/cypatxiii.webp", alt: "Egg Heads CyberPatriot team", width: 900, height: 675 },
                date: "High School",
                location: "Georgia",
                description:
                  "Led cybersecurity competition teams through state and national events, including repeated first-place Georgia finishes in CyberPatriot competitions.",
                tags: ["#cyberpatriot", "#team-captain", "#competition", "#cybersecurity"],
              },
              {
                org: "ImaginaryCTF",
                role: "Board Member & Infrastructure Contributor",
                image: { src: "/media/classic/ictf.webp", alt: "ImaginaryCTF logo", width: 300, height: 300 },
                date: "Nov 2020 — May 2023",
                location: "International",
                description:
                  "Helped host international cybersecurity events, handled support and incidents, deployed new services, and contributed to uptime, stability, and challenge quality for a global CTF platform.",
                tags: ["#imaginaryctf", "#infrastructure", "#ctf", "#operations"],
              },
              {
                org: "CyberAvengers",
                role: "Vice President & Team Captain",
                image: { src: "/media/classic/cypatxiv.webp", alt: "CyberAvengers team", width: 900, height: 504 },
                date: "High School",
                location: "Georgia",
                description:
                  "Served in leadership roles across four years, organizing cybersecurity events, mentoring students, and leading workshops on competition-based cybersecurity.",
                tags: ["#mentorship", "#workshops", "#cybersecurity", "#leadership"],
              },
              {
                org: "Ducksociety / TeamlessCTF",
                role: "Competitive Team Member",
                image: { src: "/media/classic/ducks0ci3ty.webp", alt: "Ducksociety logo", width: 300, height: 300 },
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
            icon="shield"
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
            icon="briefcase"
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
            icon="book"
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
            icon="award"
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
                  "Placed seventh nationally in 2021 and eighth nationally in 2022 while representing Georgia in Management Information Systems case study competitions.",
                tags: ["#mis", "#case-study", "#national-finalist"],
              },
            ]}
          />

        <CompetitiveHistory />
      </div>
    </main>
  );
}
