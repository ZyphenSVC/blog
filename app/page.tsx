import Navbar from "@/app/components/Navbar"
import Link from "next/link"
import Image from "next/image"
import { ExperienceSection } from "@/app/components/ExperienceSection"
import { PostSection } from "@/app/components/PostSection"

export default function Home() {

  return (
    <main className="min-h-screen bg-[#252324]">
      <Navbar />
      <section className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <aside className="flex flex-col justify-start border-[#575253] px-8 py-14 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:border-r lg:px-14 lg:pt-20">
          <div className="mb-10 h-44 w-44 overflow-hidden rounded-full">
            <Image
              src="/media/face.jpg"
              alt="ProfessionalPicture"
              width={220}
              height={220}
              priority
              className="h-full w-full scale-125 object-cover translate-x-[24px]"
            />
          </div>

          <p className="mb-6 font-mono text-sm font-bold uppercase tracking-[0.32em] text-[#8C86AA]">
            Cryptography / Math / Systems
          </p>

          <h1 className="font-mono text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-[#EAE0D5] sm:text-6xl xl:text-7xl">
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
            <Link href="/projects" className="text-[#8C86AA] hover:text-[#EAE0D5]">
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

        <section className="min-w-0 px-8 py-20 lg:px-14">
          <PostSection
            title="Recent Posts"
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
                location: "University of Georgia",
                description:
                  "Designed and optimized ML/data pipelines for satellite imaging systems, including NeRF and computer vision pipelines, with attention to scalability and heterogeneous GPU/CPU environments.",
                tags: ["#nerf", "#mlcv", "#satellite-imaging", "#gpu-systems"],
              },
              {
                org: "Directed Reading Program",
                role: "Researcher",
                date: "January 2023 — May 2025",
                location: "University of Georgia",
                description:
                  "Reading and presenting on elliptic curves, the Birch and Swinnerton-Dyer conjecture, discrete logarithms, Kähler manifolds, complex geometry, and cryptographic applications.",
                tags: ["#elliptic-curves", "#cryptography", "#complex-geometry"],
              },
              {
                org: "Mathematics Department",
                role: "Undergraduate Researcher",
                date: "August 2024 — December 2025",
                location: "University of Georgia",
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
                org: "Mathematics Department",
                role: "Research Project Developer",
                date: "August 2021 — December 2021",
                location: "Georgia Institute of Technology",
                description:
                  "Built a graph theory route-mapping application in Java using Dijkstra’s algorithm, Eulerian circuit logic, and Open Maps API calls for real-world pathfinding and traversal modeling.",
                tags: ["#graph-theory", "#dijkstra", "#java", "#pathfinding"],
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
                org: "Mathematics Department",
                role: "Peer Learning Assistant",
                date: "Spring 2023 — Fall 2023",
                location: "University of Georgia",
                description:
                  "Supported Calculus II and III instruction through discussion facilitation, homework review, individual student support, and weekly office hours.",
                tags: ["#calculus", "#teaching", "#mathematics", "#student-support"],
              },
            ]}
          />
        </section>
      </section>
    </main>
  );
}
