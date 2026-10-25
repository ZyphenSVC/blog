import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";

import { parseStudyNotes, noteBlockNames, normalizeNoteMath, type NoteNode } from "./study-notes";
import { noteMacros, noteMathProfiles, type NoteMathProfile } from "./note-macros";

export function mathProfile(value: unknown): NoteMathProfile | undefined {
  if (value === undefined) return undefined;
  if (!noteMathProfiles.includes(value as NoteMathProfile)) {
    throw new Error("mathProfile must be general, cryptography, or analysis.");
  }
  return value as NoteMathProfile;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
}

type MathNode = { type: string; value?: string; children?: MathNode[]; data?: { hChildren?: MathNode[] } };
function normalizeMath() {
  return function walk(node: MathNode) {
    if ((node.type === "math" || node.type === "inlineMath") && node.value) {
      node.value = normalizeNoteMath(node.value);
      // remark-math supplies HAST text as well as the MDAST value.
      if (node.data?.hChildren) {
        const updateText = (children: MathNode[]) => {
          for (const child of children) {
            if (child.type === "text") child.value = node.value;
            if (child.children) updateText(child.children);
          }
        };
        updateText(node.data.hChildren);
      }
    }
    node.children?.forEach(walk);
  };
}

async function renderMarkdown(content: string, profile?: NoteMathProfile) {
  const processor = unified().use(remarkParse).use(remarkGfm).use(remarkMath);
  if (profile) processor.use(normalizeMath);
  const result = await processor
    .use(remarkRehype)
    .use(rehypeKatex, { trust: false, maxExpand: 1000, ...(profile ? { macros: noteMacros(profile) } : {}) })
    .use(rehypeStringify)
    .process(content);

  return result.toString();
}


/** Compile academic blocks at build time; no editor or client-side parser needed. */
export async function markdownToHtml(content: string, profile?: NoteMathProfile): Promise<string> {
  // Preserve the ordinary blog pipeline unless extended note syntax is present.
  const extended = /^\s*(?::::\w+|\\(?:section|subsection|subsubsection|chapter|lesson|input|include|usepackage|documentclass)\b)/m.test(content);
  const texEnvironment = /^\s*\\begin\{(?!(?:align|aligned|alignat|gather|gathered|equation|multline|matrix|pmatrix|bmatrix|Bmatrix|vmatrix|Vmatrix|smallmatrix|cases|array|split)\*?\})/m.test(content);
  if (!extended && !texEnvironment) return renderMarkdown(content, profile);
  const document = parseStudyNotes(content);
  const notation = profile ?? "general";
  const inline = async (text: string) => (await renderMarkdown(text, notation)).replace(/^<p>([\s\S]*)<\/p>\s*$/, "$1");

  async function render(nodes: NoteNode[]): Promise<string> {
    const fragments: string[] = [];
    for (const node of nodes) {
      if (node.kind === "markdown") fragments.push(await renderMarkdown(node.body, notation));
      else if (node.kind === "source") {
        fragments.push(`<aside class="note-source-fallback"><p>${escapeHtml(node.reason)}</p><pre><code>${escapeHtml(node.body)}</code></pre></aside>`);
      } else if (node.kind === "heading") {
        fragments.push(`<h${node.level} id="${node.id}">${await inline(node.title)}</h${node.level}>`);
      } else if (node.kind === "list") {
        const tag = node.ordered ? "ol" : "ul";
        const items = await Promise.all(node.items.map(async (item) => `<li>${await render(item)}</li>`));
        fragments.push(`<${tag}>${items.join("")}</${tag}>`);
      } else {
        const label = `${noteBlockNames[node.type]}${node.number ? ` ${node.number}` : ""}`;
        const proof = node.statement && node.children.some((child) => child.kind !== "markdown" || child.body.trim());
        fragments.push(`<section class="note-block note-block-${node.type}" id="${node.id}" aria-label="${escapeHtml(label)}">`);
        fragments.push(`<div class="note-block-heading"><strong>${escapeHtml(label)}</strong>${node.title ? `<span class="note-block-title">${await inline(node.title)}</span>` : ""}<a class="note-anchor" href="#${node.id}" aria-label="Link to ${escapeHtml(label)}">#</a></div>`);
        if (node.statement) fragments.push(await render(node.statement));
        if (proof) fragments.push(`<p class="note-proof-label">${node.type === "problem" ? "Solution" : "Proof"}</p>`);
        fragments.push(await render(node.children));
        if (proof || node.type === "proof" || node.type === "solution") fragments.push('<div class="note-qed" aria-label="End of proof or solution">□</div>');
        fragments.push("</section>");
      }
    }
    return fragments.join("\n");
  }
  return render(document.nodes);
}
