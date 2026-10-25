import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { glob } from "fast-glob";
import { getCourse } from "./courses";
import { markdownToHtml, mathProfile } from "./markdown";
import type { LectureNote } from "./note-types";

async function main() {
  const root = path.join(process.cwd(), "content", "notes");
  const files = await glob("*/*/index.{md,mdx}", { cwd: root, onlyFiles: true });
  const notes: LectureNote[] = [];
  const seen = new Set<string>();

  for (const file of files) {
    const { data, content } = matter(await fs.readFile(path.join(root, file), "utf8"));
    if (data.draft === true) continue;
    const [course, slug] = file.split("/");
    const fail = (message: string): never => { throw new Error(`${file}: ${message}`); };
    if (!getCourse(course)) fail(`Unknown course "${course}".`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail("Use a lowercase, hyphenated lecture folder name.");
    if (seen.has(`${course}/${slug}`)) fail("Duplicate lecture slug (keep only one index.md or index.mdx).");
    seen.add(`${course}/${slug}`);
    for (const field of ["title", "description"]) {
      if (typeof data[field] !== "string" || !data[field].trim()) fail(`A non-empty ${field} is required.`);
    }
    const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date;
    if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) {
      fail("A valid date in YYYY-MM-DD format is required.");
    }
    if (data.tags !== undefined && (!Array.isArray(data.tags) || data.tags.some((tag: unknown) => typeof tag !== "string"))) {
      fail("Tags must be a list of strings.");
    }
    if (!content.trim()) fail("Lecture content is required (or set draft: true).");
    notes.push({
      course, slug, title: data.title.trim(), date, description: data.description.trim(),
      tags: data.tags ?? [], readingTime: readingTime(content).text,
      html: await markdownToHtml(content, mathProfile(data.mathProfile)),
    });
  }

  notes.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug, "en", { numeric: true }));
  await fs.writeFile(path.join(process.cwd(), "lib", "generated-notes.json"), JSON.stringify(notes, null, 2));
  console.log(`Generated ${notes.length} lecture notes.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
