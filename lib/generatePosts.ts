import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { glob } from "fast-glob";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";

const POSTS_PATH = path.join(process.cwd(), "content", "posts");
const OUTPUT_PATH = path.join(process.cwd(), "lib", "generated-posts.json");

async function markdownToHtml(content: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(content);

  return result.toString();
}

async function main() {
  const files = await glob("**/index.mdx", {
    cwd: POSTS_PATH,
    onlyFiles: true,
  });

  const posts = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(POSTS_PATH, file);
      const source = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(source);

      const slug = file.replace(/\/index\.mdx$/, "");
      const html = await markdownToHtml(content);

      return {
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        description: data.description ?? "",
        slug,
        tags: data.tags ?? [],
        readingTime: readingTime(content).text,
        html,
      };
    })
  );

  posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(posts, null, 2));
  console.log(`Generated ${posts.length} posts.`);
}

main();