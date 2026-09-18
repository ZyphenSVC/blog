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
    <main id="main-content" className="content-container page-content">
      <header className="page-heading">
        <h1 className="reveal-text">Things I’m researching.</h1>
        <p>Ongoing research, technical notes, and implementation work spanning cryptography, mathematics, machine learning, and computing infrastructure.</p>
      </header>
      <section className="page-section">
        <div className="section-heading"><h2>Research interests.</h2></div>
        <div className="card-grid">
          {researchAreas.map((area) => (
            <article key={area.title} className="surface-card detail-card">
              <h3>{area.title}</h3>
              <p>{area.description}</p>
              <div className="tags">{area.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>
      <section className="page-section">
        <div className="section-heading"><h2>Active projects.</h2></div>
        <div className="card-list">
          {[
            {
              title: "Privacy-Preserving Computation Notes",
              type: "Cryptography",
              description: "Research notes and implementation studies on FHE, elliptic curves, and secure computation systems.",
            },
            {
              title: "NeRF Infrastructure Research",
              type: "ML / Systems",
              description: "Pipeline optimization and distributed compute considerations for NeRF and CV systems.",
            },
            {
              title: "Mathematical Exposition Archive",
              type: "Mathematics",
              description: "Lecture-style notes and proofs across algebraic geometry, analysis, and abstract algebra.",
            },
          ].map((project) => (
            <article key={project.title} className="surface-card detail-card">
              <div className="card-meta">{project.type}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <Link href="/blog" className="card-link">Explore →</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
