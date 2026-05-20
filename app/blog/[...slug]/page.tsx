import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";

import Navbar from "@/app/components/Navbar";
import { ArticleLayout } from "@/app/components/ArticleLayout";
import { getPostBySlug } from "@/lib/posts";

export default async function BlogPostPage({
                                             params,
                                           }: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug.join("/"));

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#252324]">
      <Navbar />

      <ArticleLayout
        title={post.title}
        description={post.description}
        date={post.date}
        readingTime={post.readingTime}
        tags={post.tags}
      >
        <div
          className="prose prose-invert max-w-none prose-headings:text-[#F2E8DC] prose-p:text-[#BEB6AD] prose-a:text-[#8C86AA] prose-strong:text-[#F2E8DC] prose-code:text-[#EAE0D5]"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </ArticleLayout>
    </main>
  );
}