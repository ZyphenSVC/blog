import Navbar from "@/app/components/Navbar";
import Link from "next/link";

const researchAreas = [
  {
    title: "Cryptography",
    description:
      "Applied cryptography, elliptic curves, post-quantum systems, privacy-preserving computation, and secure protocol design.",
    tags: ["#ecc", "#pqc", "#fhe", "#privacy"],
  },
  {
    title: "Mathematics",
    description:
      "Algebraic geometry, Lie algebras, Coxeter-Dynkin systems, analysis, and mathematical exposition.",
    tags: ["#algebraic-geometry", "#lie-theory", "#analysis"],
  },
  {
    title: "Systems Engineering",
    description:
      "GPU systems, distributed compute, scalable infrastructure, and performance-oriented backend systems.",
    tags: ["#systems", "#gpu", "#infrastructure"],
  },
  {
    title: "Machine Learning & Vision",
    description:
      "NeRF pipelines, satellite imaging systems, ML/CV workflows, and geometric data processing.",
    tags: ["#nerf", "#mlcv", "#satellite-imaging"],
  },
];

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-[#252324] text-[#EAE0D5]">
      <Navbar />

      <section className="border-b border-[#575253] px-8 py-20 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#8C86AA]">
            Research Archive
          </p>

          <h1 className="max-w-5xl font-mono text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-[#EAE0D5] md:text-7xl">
            Research,
            <br />
            Technical Writing,
            <br />
            and Computational Work
          </h1>

          <p className="mt-10 max-w-3xl text-lg leading-8 text-[#BEB6AD]">
            A collection of ongoing research directions, technical notes,
            mathematical exposition, systems work, and implementation-focused
            projects spanning cryptography, mathematics, machine learning, and
            computing infrastructure.
          </p>
        </div>
      </section>

      <section className="px-8 py-20 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between border-b border-[#575253] pb-4">
            <h2 className="font-mono text-3xl font-bold uppercase tracking-[0.16em] text-[#EAE0D5]">
              Research Domains
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {researchAreas.map((area) => (
              <article
                key={area.title}
                className="rounded-sm border border-[#575253] bg-[#2F2D2E] p-8"
              >
                <h3 className="text-2xl font-semibold text-[#F2E8DC]">
                  {area.title}
                </h3>

                <p className="mt-4 leading-8 text-[#BEB6AD]">
                  {area.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.12em] text-[#8C86AA]/70">
                  {area.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#575253] px-8 py-20 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between border-b border-[#575253] pb-4">
            <h2 className="font-mono text-3xl font-bold uppercase tracking-[0.16em] text-[#EAE0D5]">
              Active Projects
            </h2>
          </div>

          <div className="space-y-10">
            {[
              {
                title: "Privacy-Preserving Computation Notes",
                type: "Cryptography",
                description:
                  "Research notes and implementation studies on FHE, elliptic curves, and secure computation systems.",
              },
              {
                title: "NeRF Infrastructure Research",
                type: "ML / Systems",
                description:
                  "Pipeline optimization and distributed compute considerations for NeRF and CV systems.",
              },
              {
                title: "Mathematical Exposition Archive",
                type: "Mathematics",
                description:
                  "Lecture-style notes and proofs across algebraic geometry, analysis, and abstract algebra.",
              },
            ].map((project) => (
              <article
                key={project.title}
                className="border-b border-[#575253] pb-10"
              >
                <div className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#8C86AA]">
                  {project.type}
                </div>

                <h3 className="text-2xl font-semibold text-[#F2E8DC]">
                  {project.title}
                </h3>

                <p className="mt-4 max-w-4xl leading-8 text-[#BEB6AD]">
                  {project.description}
                </p>

                <Link
                  href="/blog"
                  className="mt-6 inline-block font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#8C86AA] hover:text-[#EAE0D5]"
                >
                  Explore →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}