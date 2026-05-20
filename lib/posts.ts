import posts from "@/lib/generated-posts.json";

export type Post = {
  title: string;
  date: string;
  description: string;
  slug: string;
  tags: string[];
  readingTime: string;
  html: string;
};

export async function getAllPosts(): Promise<Post[]> {
  return posts as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return (posts as Post[]).find((post) => post.slug === slug) ?? null;
}