import type { Metadata } from "next";
import { getWritingFeed } from "@/lib/feed";
import { BlogSearch } from "@/app/components/BlogSearch";

export const metadata: Metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await getWritingFeed();
  return (
    <main id="main-content" className="reading-container page-content">
      <header className="page-heading">
        <h1 className="reveal-text">Posts.</h1>
        <p>Research, technical writing, and things I’ve learned along the way.</p>
      </header>
      <BlogSearch posts={posts.map(({ title, description, date, tags, href, readingTime, type }) => ({
        title, description, date, tags, href, readingTime, type,
      }))} />
    </main>
  );
}
