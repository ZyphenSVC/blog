import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/app/components/PostCard";

export const metadata: Metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <main id="main-content" className="reading-container page-content">
      <header className="page-heading">
        <h1 className="reveal-text">Posts.</h1>
        <p>Research, technical writing, and things I’ve learned along the way.</p>
      </header>
      <div className="post-list">
        {posts.map((post) => <PostCard key={post.slug} {...post} href={"/blog/" + post.slug} headingLevel={2} />)}
      </div>
    </main>
  );
}
