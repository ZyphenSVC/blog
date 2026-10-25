import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";
import { ArticleLayout } from "@/app/components/ArticleLayout";
import { getCourse } from "@/lib/courses";
import { getLectureNote } from "@/lib/notes";

type Props = { params: Promise<{ course: string; lecture: string }> };

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { course, lecture } = await params;
  const note = getLectureNote(course, lecture);
  if (!getCourse(course) || !note) notFound();
  const inherited = await parent;
  const url = `/notes/${course}/${lecture}`;
  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article", siteName: "ZyphenSVC", title: note.title,
      description: note.description, url, publishedTime: note.date,
      images: inherited.openGraph?.images ?? [],
    },
    twitter: {
      card: "summary", title: note.title, description: note.description,
      images: inherited.twitter?.images ?? [],
    },
  };
}

export default async function LecturePage({ params }: Props) {
  const { course: slug, lecture } = await params;
  const course = getCourse(slug);
  const note = getLectureNote(slug, lecture);
  if (!course || !note) notFound();
  return (
    <main id="main-content">
      <ArticleLayout title={note.title} description={note.description} date={note.date}
        readingTime={note.readingTime} tags={note.tags}
        backHref={`/notes/${course.slug}`} backLabel={course.title}>
        <div dangerouslySetInnerHTML={{ __html: note.html }} />
      </ArticleLayout>
    </main>
  );
}
