import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { watchContent } from "./watch-content.mjs";

const require = createRequire(import.meta.url);
let stopping = false;

async function watchGeneratedContent(directory, script, label, matches) {
  let generator;
  let pending = false;

  function regenerate() {
    pending = true;
    if (generator || stopping) return;
    pending = false;
    generator = spawn(process.execPath, ["--import", "tsx", script], { stdio: "inherit" });
    generator.on("error", (error) => console.error(`${label}:`, error));
    generator.on("close", (code) => {
      generator = undefined;
      if (code && !stopping) console.error(`${label} were not updated. Fix the error above and save again.`);
      if (pending && !stopping) regenerate();
    });
  }

  const watcher = await watchContent(directory, {
    matches,
    onChange: regenerate,
    onError: (error) => console.error(`${label} watcher could not read files; retrying:`, error),
  });

  // Catch edits made after prebuild but before the initial snapshot.
  regenerate();

  return {
    close() {
      watcher.close();
      generator?.kill("SIGTERM");
    },
  };
}

const watchers = await Promise.all([
  watchGeneratedContent("content/posts", "lib/generatePosts.ts", "Blog posts", (name) => name === "index.mdx"),
  watchGeneratedContent("content/notes", "lib/generateNotes.ts", "Lecture notes", (name) => /^index\.mdx?$/.test(name)),
]);

const server = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "dev", "--webpack", ...process.argv.slice(2)], { stdio: "inherit" });
console.log("Watching blog posts and lecture notes for changes (checking every 500ms).");

function stop(code) {
  if (stopping) return;
  stopping = true;
  watchers.forEach((watcher) => watcher.close());
  server.kill("SIGTERM");
  process.exitCode = code;
}

server.on("error", (error) => { console.error(error); stop(1); });
server.on("close", (code) => stop(code ?? 0));
process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
