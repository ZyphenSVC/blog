import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import "katex/dist/katex.min.css";
import { ArticleLayout } from "@/app/components/ArticleLayout";
import { getPostBySlug } from "@/lib/posts";

type BlogPostProps = { params: Promise<{ slug: string[] }> };

export async function generateMetadata(
  { params }: BlogPostProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug.join("/"));
  if (!post) notFound();

  const inherited = await parent;
  const url = `/blog/${post.slug.split("/").map(encodeURIComponent).join("/")}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: "ZyphenSVC",
      title: post.title,
      description: post.description,
      url,
      tags: post.tags,
      images: inherited.openGraph?.images ?? [],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
      images: inherited.twitter?.images ?? [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
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
