import { getAllPosts, type Post } from "./posts";
import { courses } from "./courses";
import { getCourseNotes } from "./notes";

export type FeedEntry = Post & { href: string; type?: string };

export async function getWritingFeed(): Promise<FeedEntry[]> {
  const posts = await getAllPosts();
  const entries: FeedEntry[] = [
    ...posts.filter((post) => post.html.trim()).map((post) => ({ ...post, href: `/blog/${post.slug}` })),
    ...courses.flatMap((course) => getCourseNotes(course.slug).map((note) => ({
      ...note,
      href: `/notes/${course.slug}/${note.slug}`,
      type: `${course.title} · Lecture notes`,
    }))),
  ];
  return entries.sort((a, b) => Date.parse(b.date) - Date.parse(a.date) || a.href.localeCompare(b.href));
}
