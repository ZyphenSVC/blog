import test from "node:test";
import assert from "node:assert/strict";
import { markdownToHtml, mathProfile } from "../lib/markdown";
import { noteBlockNames } from "../lib/study-notes";

test("ordinary Markdown retains paragraphs, lists, math, and code", async () => {
  const html = await markdownToHtml("## Heading\n\nFirst.\n\nSecond.\n\n1. Item\n\n$x^2$\n\n```md\n:::definition Literal\n::: \n```");
  assert.match(html, /<p>First\.<\/p>/);
  assert.match(html, /<ol>/);
  assert.match(html, /class="katex"/);
  assert.match(html, /:::definition Literal/);
  assert.doesNotMatch(html, /class="note-block /);
});

test("named definitions include Markdown, equations and per-document numbering", async () => {
  const source = ":::definition Group\nA **group** $G$.\n:::\n\n:::example Integers\n$\\Z$ under addition.\n:::";
  const html = await markdownToHtml(source);
  assert.match(html, /Definition 1/);
  assert.match(html, /Example 2/);
  assert.match(html, /<strong>group<\/strong>/);
  assert.match(html, /class="katex"/);
  assert.doesNotMatch(html, /katex-error|#cc0000/g);
  assert.equal(await markdownToHtml(source), html);
});

test("nested theorem and proof have anchors and a QED marker", async () => {
  const html = await markdownToHtml(":::theorem Identity\nThe identity is unique.\n:::proof\nSince $e=ee'=e'$.\n:::\n:::");
  assert.match(html, /note-block-theorem/);
  assert.match(html, /note-block-proof/);
  assert.match(html, /End of proof or solution/);
  const ids = [...html.matchAll(/id="(note-\d+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, 2);
});

test("every Learn block type is supported and exercises have their own counter", async () => {
  const html = await markdownToHtml(Object.keys(noteBlockNames).map((name) => `:::${name}\nBody.\n:::`).join("\n\n"));
  for (const name of Object.keys(noteBlockNames)) assert.match(html, new RegExp(`note-block-${name}\\b`));
  assert.match(html, /Exercise 1/);
  assert.match(html, /Exercise 2/);
  assert.doesNotMatch(html, /<strong>Proof \d/);
});

test("unknown and unclosed blocks remain escaped visible source", async () => {
  for (const source of [":::defintion Name\n<script>alert(1)</script>\n:::", ":::definition Unclosed\nStill here"]) {
    const html = await markdownToHtml(source);
    assert.match(html, /note-source-fallback/);
    assert.doesNotMatch(html, /<script>/);
  }
});

test("literal code delimiters do not close an enclosing academic block", async () => {
  const html = await markdownToHtml(":::definition Code\n```md\n:::\n```\nStill in the definition.\n:::");
  assert.match(html, /Still in the definition/);
  assert.doesNotMatch(html, /note-source-fallback/);
});

test("supported TeX theorem snippets separate statements and proofs", async () => {
  const html = await markdownToHtml(String.raw`\begin{theorem}[Identity]{The identity is unique.}
Proof text with \(e=ee'=e'\).
\end{theorem}`);
  assert.match(html, /The identity is unique/);
  assert.match(html, /note-proof-label">Proof/);
  assert.match(html, /class="katex"/);
});

test("profiles render macros and helpers without leaking definitions", async () => {
  for (const [profile, source] of [["general", String.raw`$\Z\quad\norm*{v}\quad\colvec{a,b}$`], ["cryptography", String.raw`$\evk$`], ["analysis", String.raw`$\R$`]] as const) {
    const html = await markdownToHtml(source, profile);
    assert.match(html, /class="katex"/);
    assert.doesNotMatch(html, /katex-error|#cc0000/g);
  }
  await markdownToHtml(String.raw`$\gdef\privateTestMacro{secret}\privateTestMacro$`, "general");
  assert.match(await markdownToHtml(String.raw`$\privateTestMacro$`, "general"), /katex-error|#cc0000/g);
  assert.throws(() => mathProfile("typo"), /mathProfile/);
});

test("titles and raw HTML cannot inject markup through block wrappers", async () => {
  const html = await markdownToHtml(':::definition <img src=x onerror=alert(1)>\n<script>alert(1)</script>\nBody.\n:::');
  assert.doesNotMatch(html, /<img|<script|onerror=/);
});


test("academic syntax preserves Markdown heading levels", async () => {
  const html = await markdownToHtml("## Section\n\n:::definition Name\nBody.\n:::");
  assert.match(html, /<h2 id="note-1">Section<\/h2>/);
});


test("display math keeps its KaTeX wrapper inside academic blocks", async () => {
  const html = await markdownToHtml(String.raw`:::definition Binary Operation
$$
\mu : G \times G \longrightarrow G,\qquad (a,b)\longmapsto ab
$$
:::`);
  assert.match(html, /class="katex-display"/);
  assert.doesNotMatch(html, /<pre>|katex-error|#cc0000/);
  const plain = await markdownToHtml("$$\n\\colvec{a,b}\n$$", "general");
  assert.match(plain, /class="katex-display"/);
  assert.doesNotMatch(plain, /<pre>|katex-error|#cc0000/);
});
