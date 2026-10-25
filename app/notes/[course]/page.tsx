import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse } from "@/lib/courses";
import { getCourseNotes } from "@/lib/notes";
import { PostCard } from "@/app/components/PostCard";

type Props = { params: Promise<{ course: string }> };

export function generateStaticParams() {
  return courses.map((course) => ({ course: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = getCourse((await params).course);
  if (!course) notFound();
  return { title: course.title, description: course.description, alternates: { canonical: `/notes/${course.slug}` } };
}

export default async function CoursePage({ params }: Props) {
  const course = getCourse((await params).course);
  if (!course) notFound();
  const notes = getCourseNotes(course.slug);

  return (
    <main id="main-content" className="reading-container page-content">
      <Link href="/notes">← Back to notes</Link>
      <header className="article-header page-heading">
        <p className="eyebrow">Reading group</p>
        <h1 className="reveal-text">{course.title}</h1>
        <p>{course.description}</p>
      </header>
      <section aria-labelledby="lectures-title">
        <div className="section-heading">
          <h2 id="lectures-title">Lecture notes</h2>
          {notes.length > 0 && <span className="section-count">{notes.length} {notes.length === 1 ? "lecture" : "lectures"} · Newest first</span>}
        </div>
        {notes.length ? (
          <div className="post-list">
            {notes.map((note) => (
              <PostCard key={note.slug} {...note} href={`/notes/${course.slug}/${note.slug}`} headingLevel={3} />
            ))}
          </div>
        ) : <p>No lecture notes published yet. Notes will appear here as the reading group progresses.</p>}
      </section>
    </main>
  );
}
