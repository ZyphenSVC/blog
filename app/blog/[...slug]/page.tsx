import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";
import { ArticleLayout } from "@/app/components/ArticleLayout";
import { getPostBySlug } from "@/lib/posts";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug.join("/"));
  if (!post) notFound();

  return (
    <main id="main-content">
      <ArticleLayout title={post.title} description={post.description} date={post.date} readingTime={post.readingTime} tags={post.tags}>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </ArticleLayout>
    </main>
  );
}
