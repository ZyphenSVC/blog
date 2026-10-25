import Link from "next/link";
import type { Metadata } from "next";
import { courses as readingGroups } from "@/lib/courses";

export const metadata: Metadata = { title: "Notes" };

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
    pdf: "AbstractAlgebra.pdf",
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
    pdf: "AbstractAlgebra.pdf",
  },
  {
    code: "MATH 4100/6100",
    slug: "math-6100",
    title: "Real Analysis",
    term: "Fall 2025",
    description:
      "Metric spaces and continuity; differentiable and integrable functions of one variable; numerical sequences and series; and sequences and series of functions.",
    topics: ["#analysis", "#metric-spaces", "#continuity", "#series"],
    pdf: "RealAnalysis.pdf",
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
    <main id="main-content" className="content-container page-content">
      <header className="page-heading">
        <h1 className="reveal-text">Notes from my studies.</h1>
        <p>Lecture notes, reading groups, and course notes in mathematics and computer science.</p>
      </header>
      <section className="portfolio-section" aria-labelledby="reading-groups-title">
        <div className="section-heading"><h2 id="reading-groups-title">Reading groups</h2></div>
        <div className="card-grid">
          {readingGroups.map((course) => (
            <Link key={course.slug} href={`/notes/${course.slug}`} className="surface-card detail-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="tags">{course.topics.map((topic) => <span key={topic}>#{topic}</span>)}</div>
              <span className="card-link contact-value">View lecture notes →</span>
            </Link>
          ))}
        </div>
      </section>
      <section aria-labelledby="course-notes-title">
        <div className="section-heading"><h2 id="course-notes-title">Course notes</h2></div>
        <div className="card-grid">
          {courses.map((course) => (
            <Link key={course.slug} href={"/media/notes/" + course.pdf} className="surface-card detail-card">
              <div className="card-meta"><span>{course.code}</span><span>{course.term}</span></div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="tags">{course.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
              <span className="card-link contact-value">Read notes (PDF) →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
