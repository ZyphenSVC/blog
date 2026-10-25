// Adapted from the owner’s Learn repository, commit 1dcb059.
/** A deliberately bounded reader for Markdown and the user's lecture-note subset.
 * Parsing never changes saved source and never loads files or executes TeX. */
export const noteBlockNames = {
  axiom: "Axiom",
  definition: "Definition",
  assumption: "Assumption",
  theorem: "Theorem",
  proposition: "Proposition",
  lemma: "Lemma",
  corollary: "Corollary",
  example: "Example",
  remark: "Remark",
  observation: "Observation",
  construction: "Construction",
  problem: "Problem",
  exercise: "Exercise",
  studyexercise: "Exercise",
  proof: "Proof",
  solution: "Solution",
  question: "Question",
  paperclaim: "Paper claim",
  background: "Background",
  interpretation: "My interpretation",
  openquestion: "Open question",
  source: "Source",
} as const;
export type NoteBlockName = keyof typeof noteBlockNames;
export type NoteNode =
  | { kind: "markdown"; body: string }
  | { kind: "source"; body: string; reason: string }
  | { kind: "heading"; title: string; level: number; id: string }
  | { kind: "list"; ordered: boolean; items: NoteNode[][] }
  | {
      kind: "block";
      type: NoteBlockName;
      title: string;
      number: number | null;
      id: string;
      children: NoteNode[];
      statement?: NoteNode[];
    };
export interface NoteDocument {
  nodes: NoteNode[];
  contents: { id: string; title: string; level: number }[];
  warnings: string[];
}
const named = (value: string): value is NoteBlockName =>
  Object.hasOwn(noteBlockNames, value);
const proofTypes = new Set([
  "theorem",
  "proposition",
  "lemma",
  "corollary",
  "problem",
]);
const unnumbered = new Set([
  "proof",
  "solution",
  "source",
  "paperclaim",
  "background",
  "interpretation",
  "openquestion",
]);
function group(
  text: string,
  start: number,
  open = "{",
  close = "}",
): { body: string; end: number } | null {
  if (text[start] !== open) return null;
  let depth = 1;
  for (let i = start + 1; i < text.length; i++) {
    if (text[i] === "\\") {
      i++;
      continue;
    }
    if (text[i] === open) depth++;
    if (text[i] === close && --depth === 0)
      return { body: text.slice(start + 1, i), end: i + 1 };
  }
  return null;
}
/** Normalize supported math helpers only inside math, leaving code and source alone. */
export function normalizeNoteMath(body: string): string {
  let result = body.replace(
    /\\(abs|norm|floor|ceil|round|inner|angled|set)\*/g,
    "\\$1",
  );
  for (const command of ["colvec", "rowvec"]) {
    let from = 0;
    while (true) {
      const start = result.indexOf(`\\${command}{`, from);
      if (start < 0) break;
      const parsed = group(result, start + command.length + 1);
      if (!parsed) break;
      let depth = 0;
      const entries: string[] = [];
      let part = "";
      for (const ch of parsed.body) {
        if (ch === "{") depth++;
        if (ch === "}") depth--;
        if (ch === "," && depth === 0) {
          entries.push(part);
          part = "";
        } else part += ch;
      }
      entries.push(part);
      const replacement = `\\begin{bmatrix}${entries.join(command === "colvec" ? "\\\\" : "&")}\\end{bmatrix}`;
      result = result.slice(0, start) + replacement + result.slice(parsed.end);
      from = start + replacement.length;
    }
  }
  return result;
}
/** Inline TeX formatting is recognized only outside math and Markdown code. */
export function noteMarkdown(source: string, depth = 0): string {
  if (depth > 24) return source.replaceAll("\\", "\\\\");
  let out = "";
  let i = 0;
  while (i < source.length) {
    const rest = source.slice(i);
    const fence = rest.match(/^(`{3,}|~{3,})[^\n]*\n/);
    if (fence && (i === 0 || source[i - 1] === "\n")) {
      const end = source.indexOf(`\n${fence[1]}`, i + fence[0].length);
      const stop = end < 0 ? source.length : end + 1 + fence[1].length;
      out += source.slice(i, stop);
      i = stop;
      continue;
    }
    if (source[i] === "`") {
      const n = rest.match(/^`+/)![0];
      const end = source.indexOf(n, i + n.length);
      if (end >= 0) {
        out += source.slice(i, end + n.length);
        i = end + n.length;
        continue;
      }
    }
    const delimiter = rest.startsWith("\\[")
      ? "\\["
      : rest.startsWith("\\(")
        ? "\\("
        : rest.startsWith("$$")
          ? "$$"
          : rest.startsWith("$")
            ? "$"
            : null;
    if (delimiter) {
      const closer =
        delimiter === "\\[" ? "\\]" : delimiter === "\\(" ? "\\)" : delimiter;
      let end = source.indexOf(closer, i + delimiter.length);
      while (end > 0 && source[end - 1] === "\\" && closer.startsWith("$"))
        end = source.indexOf(closer, end + closer.length);
      if (end >= 0) {
        const display = delimiter === "\\[" || delimiter === "$$";
        const body = normalizeNoteMath(source.slice(i + delimiter.length, end));
        out += display ? `\n\n$$\n${body.trim()}\n$$\n\n` : `$${body}$`;
        i = end + closer.length;
        continue;
      }
    }
    const mathEnv = rest.match(
      /^\\begin\{(align\*?|gather\*?|equation\*?|multline\*?)\}/,
    );
    if (mathEnv) {
      const end = source.indexOf(`\\end{${mathEnv[1]}}`, i + mathEnv[0].length);
      if (end >= 0) {
        const env = mathEnv[1].startsWith("align")
          ? "aligned"
          : mathEnv[1].startsWith("gather") || mathEnv[1].startsWith("multline")
            ? "gathered"
            : null;
        const body = normalizeNoteMath(
          source.slice(i + mathEnv[0].length, end),
        );
        out += `\n\n$$\n${env ? `\\begin{${env}}` : ""}${body}${env ? `\\end{${env}}` : ""}\n$$\n\n`;
        i = end + `\\end{${mathEnv[1]}}`.length;
        continue;
      }
    }
    const command = rest.match(
      /^\\(textbf|textit|emph|textnormal|vocab|source|paperref|href|url)\{/,
    );
    if (command) {
      const first = group(source, i + command[0].length - 1);
      if (first) {
        const inner = noteMarkdown(first.body, depth + 1);
        let value = inner;
        let end = first.end;
        if (["textbf", "vocab"].includes(command[1])) value = `**${inner}**`;
        if (["textit", "emph"].includes(command[1])) value = `*${inner}*`;
        if (command[1] === "source") value = `\n\n*Source: ${inner}*\n\n`;
        if (command[1] === "paperref" || command[1] === "href") {
          const second = group(source, end);
          if (!second) {
            out += source[i++];
            continue;
          }
          end = second.end;
          value =
            command[1] === "paperref"
              ? `[${inner}, ${noteMarkdown(second.body, depth + 1)}]`
              : `[${noteMarkdown(second.body, depth + 1)}](${first.body})`;
        }
        if (command[1] === "url") value = `<${first.body}>`;
        out += value;
        i = end;
        continue;
      }
    }
    // Preserve unknown TeX literally: Markdown must not consume its backslashes.
    if (source[i] === "\\" && /[A-Za-z]/.test(source[i + 1] ?? "")) out += "\\";
    out += source[i++];
  }
  return out;
}
// Environment delimiters inside literal code must not close surrounding blocks.
function maskCode(source: string): string {
  let fence = "";
  return source
    .split("\n")
    .map((line) => {
      const mark = line.trimStart().match(/^(`{3,}|~{3,})/);
      if (fence) {
        if (mark && mark[1][0] === fence[0] && mark[1].length >= fence.length)
          fence = "";
        return " ".repeat(line.length);
      }
      if (mark) {
        fence = mark[1];
        return " ".repeat(line.length);
      }
      return line.replace(/(`+)(.*?)\1/g, (match) => " ".repeat(match.length));
    })
    .join("\n");
}
export function parseStudyNotes(source: string): NoteDocument {
  let serial = 0,
    exercise = 0,
    anchors = 0;
  const contents: NoteDocument["contents"] = [],
    warnings: string[] = [];
  const id = () => `note-${++anchors}`;
  const raw = (body: string, reason: string): NoteNode => {
    if (!warnings.includes(reason)) warnings.push(reason);
    return { kind: "source", body, reason };
  };
  const parse = (text: string, depth = 0): NoteNode[] => {
    if (depth > 16)
      return [
        raw(
          text,
          "Nested blocks exceed the reading limit; source is preserved.",
        ),
      ];
    const nodes: NoteNode[] = [];
    const lines = text.split("\n");
    let buffer: string[] = [];
    const flush = () => {
      if (buffer.length) {
        nodes.push({ kind: "markdown", body: noteMarkdown(buffer.join("\n")) });
        buffer = [];
      }
    };
    const block = (
      type: NoteBlockName,
      title: string,
      body: string,
      statement?: string,
    ) => {
      const anchor = id();
      const number = unnumbered.has(type)
        ? null
        : ["exercise", "studyexercise"].includes(type)
          ? ++exercise
          : ++serial;
      contents.push({
        id: anchor,
        title: `${noteBlockNames[type]}${number ? ` ${number}` : ""}${title ? `: ${title}` : ""}`,
        level: 3,
      });
      nodes.push({
        kind: "block",
        type,
        title,
        number,
        id: anchor,
        ...(statement !== undefined
          ? { statement: parse(statement, depth + 1) }
          : {}),
        children: parse(body, depth + 1),
      });
    };
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      const fence = trimmed.match(/^(`{3,}|~{3,})/);
      if (fence) {
        buffer.push(line);
        while (++i < lines.length) {
          buffer.push(lines[i]);
          if (lines[i].trim().startsWith(fence[1])) break;
        }
        continue;
      }
      if (
        trimmed.startsWith("$$") ||
        trimmed.startsWith("\\[") ||
        /^\\begin\{(align\*?|gather\*?|equation\*?|multline\*?)\}/.test(trimmed)
      ) {
        const close = trimmed.startsWith("$$")
          ? "$$"
          : trimmed.startsWith("\\[")
            ? "\\]"
            : `\\end{${trimmed.match(/^\\begin\{([^}]+)\}/)![1]}}`;
        buffer.push(line);
        if (!trimmed.slice(close === "$$" ? 2 : 2).includes(close))
          while (++i < lines.length) {
            buffer.push(lines[i]);
            if (lines[i].includes(close)) break;
          }
        continue;
      }
      const heading = line.match(/^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);
      const texHeading = trimmed.match(
        /^\\(chapter|section|subsection|subsubsection|pset)\*?\{/,
      );
      const lesson = trimmed.startsWith("\\lesson{");
      if (heading || texHeading || lesson) {
        flush();
        let title = heading?.[2] ?? "",
          // Blog articles already supply their own title; preserve Markdown levels.
          level = heading ? heading[1].length : 2;
        if (texHeading) {
          const g = group(trimmed, texHeading[0].length - 1);
          if (!g || trimmed.slice(g.end).trim()) {
            nodes.push(
              raw(line, "Unsupported heading syntax; source is preserved."),
            );
            continue;
          }
          title = g.body;
          level =
            texHeading[1] === "subsection"
              ? 3
              : texHeading[1] === "subsubsection"
                ? 4
                : 2;
        }
        if (lesson) {
          const a = group(trimmed, 7),
            b = a && group(trimmed, a.end),
            c = b && group(trimmed, b.end);
          if (!a || !b || !c || trimmed.slice(c.end).trim()) {
            nodes.push(
              raw(line, "Incomplete lesson heading; source is preserved."),
            );
            continue;
          }
          title = `Lesson ${a.body}${c.body ? `: ${c.body}` : ""}${b.body ? ` — ${b.body}` : ""}`;
          level = 3;
        }
        const anchor = id();
        contents.push({ id: anchor, title, level });
        nodes.push({
          kind: "heading",
          title: noteMarkdown(title),
          level,
          id: anchor,
        });
        continue;
      }
      const directive = trimmed.match(/^:::(\w+)(?:\s+(.*))?$/);
      if (directive) {
        flush();
        let nesting = 1,
          j = i + 1;
        const visible = maskCode(lines.join("\n")).split("\n");
        for (; j < lines.length; j++) {
          if (/^:::\w+/.test(visible[j].trim())) nesting++;
          if (visible[j].trim() === ":::" && --nesting === 0) break;
        }
        if (j === lines.length) {
          nodes.push(
            raw(
              lines.slice(i).join("\n"),
              "Unclosed note block; source is preserved.",
            ),
          );
          break;
        }
        if (named(directive[1]))
          block(
            directive[1],
            directive[2] ?? "",
            lines.slice(i + 1, j).join("\n"),
          );
        else
          nodes.push(
            raw(
              lines.slice(i, j + 1).join("\n"),
              "Unknown note block; source is preserved.",
            ),
          );
        i = j;
        continue;
      }
      const begin = trimmed.match(/^\\begin\{([a-zA-Z*]+)\}/);
      if (begin) {
        flush();
        const name = begin[1];
        let nesting = 1,
          j = i,
          tail = "";
        let found = false;
        const chunk = lines.slice(i).join("\n");
        const tokens = /\\(begin|end)\{([a-zA-Z*]+)\}/g;
        const bodyStart = chunk.indexOf(begin[0]) + begin[0].length;
        tokens.lastIndex = bodyStart;
        let token: RegExpExecArray | null;
        const visible = maskCode(chunk);
        while ((token = tokens.exec(visible))) {
          if (token[2] === name) {
            nesting += token[1] === "begin" ? 1 : -1;
            if (nesting === 0) {
              tail = chunk.slice(bodyStart, token.index);
              j = i + chunk.slice(0, tokens.lastIndex).split("\n").length - 1;
              found = true;
              break;
            }
          }
        }
        if (!found) {
          nodes.push(
            raw(
              lines.slice(i).join("\n"),
              "Unclosed LaTeX environment; source is preserved.",
            ),
          );
          break;
        }
        const trailing = chunk.slice(tokens.lastIndex).split("\n")[0];
        if (trailing.trim()) {
          nodes.push(
            raw(
              lines.slice(i, j + 1).join("\n"),
              "Text after an environment boundary is shown as source.",
            ),
          );
          i = j;
          continue;
        }
        if (named(name)) {
          let rest = tail.trimStart(),
            title = "",
            statement: string | undefined;
          const option = group(rest, 0, "[", "]");
          if (option) {
            title = option.body;
            rest = rest.slice(option.end).trimStart();
          }
          if (name === "studyexercise") {
            const g = group(rest, 0);
            if (g) {
              title = g.body;
              rest = rest.slice(g.end);
            }
          } else if (proofTypes.has(name)) {
            const g = group(rest, 0);
            if (g) {
              statement = g.body;
              rest = rest.slice(g.end);
            }
          }
          block(name, title, rest, statement);
        } else if (name === "itemize" || name === "enumerate") {
          const items: string[] = [];
          const marks = /\\(begin|end)\{[^}]+\}|\\item\b/g;
          let nesting = 0,
            from = 0,
            seen = false,
            match: RegExpExecArray | null;
          while ((match = marks.exec(tail))) {
            if (match[1] === "begin") nesting++;
            else if (match[1] === "end") nesting--;
            else if (nesting === 0) {
              if (seen || tail.slice(from, match.index).trim())
                items.push(tail.slice(from, match.index));
              from = marks.lastIndex;
              seen = true;
            }
          }
          if (tail.slice(from).trim()) items.push(tail.slice(from));
          nodes.push({
            kind: "list",
            ordered: name === "enumerate",
            items: items.map((item) => parse(item.trim(), depth + 1)),
          });
        } else if (name === "displayquote")
          nodes.push({
            kind: "markdown",
            body: noteMarkdown(tail.trim())
              .split("\n")
              .map((x) => `> ${x}`)
              .join("\n"),
          });
        else
          nodes.push(
            raw(
              lines.slice(i, j + 1).join("\n"),
              `Unsupported LaTeX environment (${name}); source is preserved.`,
            ),
          );
        i = j;
        continue;
      }
      if (
        /^\s*\\(?:input|include|subfile|usepackage|documentclass|newcommand|renewcommand|newenvironment|NewDocument|def\b|newgeometry|restoregeometry|maketitle|tableofcontents|newpage|clearpage)/.test(
          line,
        )
      ) {
        flush();
        nodes.push(
          raw(line, "Document commands are shown as source, not executed."),
        );
        continue;
      }
      buffer.push(line);
    }
    flush();
    return nodes;
  };
  return { nodes: parse(source), contents, warnings };
}
