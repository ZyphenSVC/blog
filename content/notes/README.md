# Lecture notes

The navigation is **Notes → Isogeny Reading Group → dated lecture entry**. Course notes use the same Markdown and KaTeX rendering as blog posts, but stay separate from the main blog feed.

## Publish a lecture

1. Create `content/notes/isogeny-reading-group/lecture-1/index.md`.
2. Copy the contents of `isogeny-reading-group/lecture-template.md.example` into it.
3. Replace the title, date (`YYYY-MM-DD`), description, and body. Use the actual lecture date. Set `draft: false` or remove the draft field when ready to publish.
4. Run `pnpm dev` to preview, or `pnpm run build` to check the production build. While `pnpm dev` is running, saving, adding, or deleting lecture files automatically regenerates the index and refreshes the browser. Invalid edits are reported in the terminal; the last valid notes stay available until you fix and save the file.
5. Commit and push the source file when ready. Generated JSON is ignored and rebuilt automatically.

The lecture will appear at `/notes/isogeny-reading-group/lecture-1`. Subsequent notes use their own folders, such as `lecture-2`. Entries are listed newest first, with the title, lecture date, description, and reading time. Keep slugs stable after sharing links.

Both `index.md` and `index.mdx` are supported, but use only one per lecture. As with the blog, these are processed as Markdown; JSX components and raw HTML are not rendered. Standard Markdown links, code blocks, tables, inline `$math$`, display `$$math$$`, and the academic blocks below are supported. Images and PDFs can be placed in `public/media/notes/isogeny-reading-group/` and linked using `/media/notes/isogeny-reading-group/filename.pdf`.

Files marked `draft: true` and the `.example` template do not appear on the site. Publication requires a non-empty title, description, body, and valid date. No sample lectures are published by default.

## Add another course

Add its slug, title, description, and topics in `lib/courses.ts`, then create notes under `content/notes/<course-slug>/<lecture-slug>/index.md`. It will automatically appear on the Notes page.

## Definitions, theorems, and proofs

Use the same structured blocks as Learn (ported from commit `1dcb059`). Names are optional; each block closes with its own `:::` line. The correct keyword is `definition`.

```markdown
:::definition Group
A group is a set $G$ with an associative binary operation, an identity,
and an inverse for every element.
:::

:::theorem Uniqueness of the identity
A group has exactly one identity element.
:::proof
If $e$ and $e'$ are identities, then $e = ee' = e'$.
:::
:::
```

Supported types: `axiom`, `definition`, `assumption`, `theorem`, `lemma`,
`proposition`, `corollary`, `construction`, `example`, `remark`, `observation`,
`problem`, `exercise`, `studyexercise`, `proof`, `solution`, `question`,
`paperclaim`, `background`, `interpretation`, `openquestion`, and `source`.

Blocks support Markdown, equations, nested blocks, and linkable anchors. Numbered
blocks share a counter per document; exercises use a separate counter. Proofs,
solutions, source notes, paper claims, background, interpretations, and open
questions are unnumbered. Numbers are generated locally, not copied from a paper.

The same syntax works in blog posts. It is rendered during content generation;
you keep editing Markdown in your editor. No browser editor is added.

## Math notation and TeX snippets

Optionally set `mathProfile: general`, `mathProfile: cryptography`, or
`mathProfile: analysis` in the frontmatter. These reuse Learn’s notation sets;
for example, `general` includes `$\N$`, `$\Z$`, `$\F$`, and `$\Hom(G,H)$`.
Structured blocks default to `general`. An ordinary Markdown document without
this field retains the existing math configuration. Profiles are separate because
some macro names have different meanings. Definitions are not shared across documents.

The structured reader also accepts Learn’s supported TeX snippets, such as
`\begin{definition}[Group] ... \end{definition}`, section headings, lists, and
math environments. It is not a full LaTeX compiler. Packages and file-loading
commands are not executed. Unknown or unclosed blocks remain visible as source
with a notice, so a typo does not silently discard your notes. Nesting is bounded.

Use fenced code blocks when you want to show the literal syntax. Keep reference
link definitions with the Markdown fragment that uses them when mixing structured
blocks with ordinary Markdown.
