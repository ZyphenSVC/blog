import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { glob } from "fast-glob";

const POSTS_PATH = path.join(process.cwd(), "content", "posts");

export type Post = {
  title: string;
  date: string;
  description: string;
  slug: string;
  tags: string[];
  readingTime: string;
  content: string;
};

export async function getAllPosts(): Promise<Post[]> {
  const files = await glob("**/index.mdx", {
    cwd: POSTS_PATH,
    onlyFiles: true,
  });

  const posts = files.map((file) => {
    const fullPath = path.join(POSTS_PATH, file);
    const source = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(source);

    const slug = file.replace(/\/index\.mdx$/, "");

    return {
      title: data.title ?? "Untitled",
      date: data.date ?? "",
      description: data.description ?? "",
      slug,
      tags: data.tags ?? [],
      readingTime: readingTime(content).text,
      content,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}