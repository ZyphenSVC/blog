import Link from "next/link";
import Navbar from "@/app/components/Navbar";

const courses = [
  {
    code: "MATH 4000/6000",
    slug: "math-6000",
    title: "Modern Algebra I",
    term: "Fall 2023",
    description:
      "Abstract algebra through arithmetic and congruence in the integers, modular arithmetic," +
      " rings, polynomial rings, ideals, quotient rings, groups, normal subgroups, and quotient" +
      " groups.",
    topics: ["#algebra", "#rings", "#fields", "#geometry", "#polynomials"],
    pdf: "/AbstractAlgebra.pdf",
  },
  {
    code: "MATH 4010/6010",
    slug: "math-6010",
    title: "Modern Algebra II",
    term: "Spring 2024",
    description:
      "More advanced abstract algebraic structures and concepts. Further study of group theory," +
      " including finite abelian groups and the Sylow theorems. Field extensions. Further" +
      " applications of group theory, including Galois theory and geometric constructions." +
      " Arithmetic in integral domains. Additional topics such as public key cryptography or" +
      " algebraic coding theory, as time permits groups.",
    topics: ["#algebra", "#groups", "#galois", "#sylow", "#extensions"],
    pdf: "/AbstractAlgebra.pdf",
  },
  {
    code: "MATH 4100/6100",
    slug: "math-6100",
    title: "Real Analysis",
    term: "Fall 2025",
    description:
      "Metric spaces and continuity; differentiable and integrable functions of one variable; numerical sequences and series; and sequences and series of functions.",
    topics: ["#analysis", "#metric-spaces", "#continuity", "#series"],
    pdf: "/RealAnalysis.pdf",
  },
  {
    code: "MATH 8300",
    slug: "math-8300",
    title: "Introduction to Algebraic Geometry",
    term: "Fall 2024",
    description:
      "Affine and projective varieties, regular and rational maps, Nullstellensatz, Veronese and Segre varieties, Grassmannians, algebraic groups, quadrics, smoothness, tangent spaces, singularities, and tangent cones.",
    topics: ["#algebraic-geometry", "#varieties", "#nullstellensatz", "#schemes"],
    pdf: "AlgebraicGeometry.pdf",
  },
];

export default function NotesPage() {
  return (
    <main className="min-h-screen bg-[#252324] text-[#EAE0D5]">
      <Navbar />

      <section className="mx-auto max-w-7xl px-8 py-16 lg:px-14">
        <header className="mb-14 border-b border-[#575253] pb-8">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#8C86AA]">
            Course Archive
          </p>

          <h1 className="mt-4 font-mono text-4xl font-bold uppercase tracking-[0.18em] text-[#EAE0D5] md:text-5xl">
            Notes
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#BEB6AD]">
            Course notes, proof writeups, implementation notes, and technical
            summaries from mathematics and computer science coursework.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <Link
              key={course.slug}
              href={`/media/notes/${course.pdf}`}
              className="group border border-[#575253] bg-[#2F2D2E] p-6 transition hover:border-[#8C86AA]"
            >
              <div className="mb-6 flex items-start justify-between gap-6 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#8C86AA]">
                <span>{course.code}</span>
                <span className="text-right text-[#8C86AA]/70">
                  {course.term}
                </span>
              </div>

              <h2 className="text-2xl font-semibold leading-snug text-[#F2E8DC] group-hover:text-[#8C86AA]">
                {course.title}
              </h2>

              <p className="mt-4 text-base leading-8 text-[#BEB6AD]">
                {course.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[#8C86AA]/70">
                {course.topics.map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}