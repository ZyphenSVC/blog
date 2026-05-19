import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { glob } from "fast-glob";

const POSTS_PATH = path.join(process.cwd(), "content", "posts");
const OUTPUT_PATH = path.join(process.cwd(), "lib", "generatedPosts.json");

async function main() {
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

  posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(posts, null, 2));
}

main();