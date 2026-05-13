// app/blog/page.tsx

import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import Navbar from "@/app/components/Navbar";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-[#252324] text-[#EAE0D5]">
      <Navbar />

      <section className="mx-auto max-w-5xl px-8 py-16 lg:px-14">
        <div className="mb-12 border-b border-[#575253] pb-6">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#8C86AA]">
            Archive
          </p>

          <h1 className="mt-3 font-mono text-4xl font-bold uppercase tracking-[0.18em]">
            Blog
          </h1>
        </div>

        <div className="space-y-10">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-[#575253] pb-10">
              <div className="mb-4 flex justify-between gap-6 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#8C86AA]/80">
                <span>{post.date}</span>
                <span>{post.readingTime}</span>
              </div>

              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold leading-snug text-[#F2E8DC] hover:text-[#8C86AA]">
                  {post.title}
                </h2>
              </Link>

              <p className="mt-3 max-w-3xl text-base leading-8 text-[#BEB6AD]">
                {post.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}