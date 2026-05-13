import Navbar from "@/app/components/Navbar";
import Link from "next/link";

const projects = [
  {
    title: "ZyphenSVC Blog Platform",
    type: "Full-Stack / Web Infrastructure",
    status: "Active",
    description:
      "A static-first technical publication platform built with Next.js and Cloudflare Pages for research writing, math notes, projects, and personal technical documentation.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Cloudflare Pages"],
    href: "/blog",
  },
  {
    title: "Orchard",
    type: "Systems / Music Client",
    status: "In Development",
    description:
      "An experimental Apple Music client alternative exploring Rust-backed architecture, Linux-friendly workflows, and full-stack product design.",
    stack: ["Rust", "Next.js", "Tauri", "Apple Music API"],
    href: "/projects/orchard",
  },
  {
    title: "Satellite Imaging ML/CV Pipelines",
    type: "Research Engineering",
    status: "Research",
    description:
      "Machine learning and computer vision pipeline work for satellite imaging systems, including NeRF-oriented experimentation and heterogeneous GPU/CPU environments.",
    stack: ["Python", "PyTorch", "OpenCV", "NeRF", "GPU Systems"],
    href: "/research",
  },
  {
    title: "Selenium Operations Automation",
    type: "Automation / Backend Tooling",
    status: "Deployed",
    description:
      "An automation workflow that executed 40,000+ system tasks, eliminated a six-month operational backlog, and improved reporting reliability.",
    stack: ["Python", "Selenium", "Automation", "Secure Design"],
    href: "/projects/automation",
  },
  {
    title: "ECC & Cryptography Implementations",
    type: "Cryptography / Research",
    status: "Ongoing",
    description:
      "Implementation-focused studies of elliptic curve cryptography, discrete logarithms, post-quantum systems, and vulnerabilities in cryptographic proposals.",
    stack: ["Python", "SageMath", "ECC", "PQC", "Cryptography"],
    href: "/research",
  },
  {
    title: "Graph Theory Route Mapping",
    type: "Algorithms / Java",
    status: "Archived",
    description:
      "A Java route-mapping application using Dijkstra’s algorithm, Eulerian circuit logic, and Open Maps API calls for pathfinding and traversal modeling.",
    stack: ["Java", "Graph Theory", "Dijkstra", "Open Maps API"],
    href: "/projects/graph-theory",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#252324] text-[#EAE0D5]">
      <Navbar />

      <section className="border-b border-[#575253] px-8 py-20 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#8C86AA]">
            Project Archive
          </p>

          <h1 className="max-w-5xl font-mono text-5xl font-bold leading-[0.95] tracking-[-0.04em] md:text-7xl">
            Systems,
            <br />
            Research,
            <br />
            and Software Projects
          </h1>

          <p className="mt-10 max-w-3xl text-lg leading-8 text-[#BEB6AD]">
            A collection of engineering projects, research systems, automation
            workflows, cryptography implementations, and full-stack software
            work.
          </p>
        </div>
      </section>

      <section className="px-8 py-20 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between border-b border-[#575253] pb-4">
            <h2 className="font-mono text-3xl font-bold uppercase tracking-[0.16em]">
              Selected Projects
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="rounded-sm border border-[#575253] bg-[#2F2D2E] p-8 transition hover:border-[#8C86AA]"
              >
                <div className="mb-6 flex items-center justify-between gap-6 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#8C86AA]">
                  <span>{project.type}</span>
                  <span>{project.status}</span>
                </div>

                <h3 className="text-2xl font-semibold leading-snug text-[#F2E8DC]">
                  {project.title}
                </h3>

                <p className="mt-4 leading-8 text-[#BEB6AD]">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[#8C86AA]/70">
                  {project.stack.map((item) => (
                    <span key={item}>#{item.toLowerCase().replaceAll(" ", "-")}</span>
                  ))}
                </div>

                <Link
                  href={project.href}
                  className="mt-8 inline-block font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#8C86AA] hover:text-[#EAE0D5]"
                >
                  View Project →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}