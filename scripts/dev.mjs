import { watch } from "node:fs";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let generator;
let pending = false;
let timer;
let stopping = false;

function regenerate() {
  pending = true;
  if (generator || stopping) return;
  pending = false;
  generator = spawn(process.execPath, ["--import", "tsx", "lib/generateNotes.ts"], { stdio: "inherit" });
  generator.on("error", (error) => console.error("Lecture notes:", error));
  generator.on("close", (code) => {
    generator = undefined;
    if (code && !stopping) console.error("Lecture notes were not updated. Fix the error above and save again.");
    if (pending && !stopping) regenerate();
  });
}

const watcher = watch("content/notes", { recursive: true }, () => {
  clearTimeout(timer);
  timer = setTimeout(regenerate, 150);
});
watcher.on("error", (error) => {
  console.error("Lecture-note watcher failed:", error);
  stop(1);
});

const server = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "dev", "--webpack", ...process.argv.slice(2)], { stdio: "inherit" });
console.log("Watching lecture notes for changes.");

function stop(code) {
  if (stopping) return;
  stopping = true;
  clearTimeout(timer);
  watcher.close();
  generator?.kill("SIGTERM");
  server.kill("SIGTERM");
  process.exitCode = code;
}

server.on("error", (error) => { console.error(error); stop(1); });
server.on("close", (code) => stop(code ?? 0));
process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
