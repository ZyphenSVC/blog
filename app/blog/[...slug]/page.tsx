import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import Navbar from "@/app/components/Navbar";
import { ArticleLayout } from "@/app/components/ArticleLayout";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug.split("/"),
  }));
}

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
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [rehypeKatex],
            },
          }}
        />
      </ArticleLayout>
    </main>
  );
}