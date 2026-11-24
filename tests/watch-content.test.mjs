import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rename, unlink, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { watchContent } from "../scripts/watch-content.mjs";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), "blog-watch-test-"));
  let changes = 0;
  const errors = [];
  const watcher = await watchContent(root, {
    matches: (name) => /^index\.mdx?$/.test(name),
    intervalMs: 20,
    onChange: () => { changes++; },
    onError: (error) => errors.push(error),
  });
  t.after(async () => {
    watcher.close();
    await rm(root, { recursive: true, force: true });
    assert.deepEqual(errors, []);
  });
  return {
    root,
    watcher,
    count: () => changes,
    async change(action) {
      const before = changes;
      await action();
      const deadline = Date.now() + 3000;
      while (changes === before && Date.now() < deadline) await delay(10);
      assert.ok(changes > before, "A source change must be detected");
    },
  };
}

test("continues detecting edits after repeated atomic file replacements", async (t) => {
  const f = await fixture(t);
  const file = path.join(f.root, "index.mdx");
  await f.change(() => writeFile(file, "original"));
  for (let i = 0; i < 3; i++) {
    await f.change(async () => {
      await writeFile(file + ".tmp", `atomic ${i}`);
      await rename(file + ".tmp", file);
    });
    // Edits to the replacement inode were missed by fs.watch.
    await f.change(() => writeFile(file, `edited ${i}`));
  }
  await f.change(async () => {
    for (let i = 0; i < 5; i++) await writeFile(file, `rapid ${i}`);
  });
});

test("detects nested additions, renames, and deletions; ignores other files and stops cleanly", async (t) => {
  const f = await fixture(t);
  const folder = path.join(f.root, "2026", "10", "26");
  await mkdir(folder, { recursive: true });
  await writeFile(path.join(folder, "scratch.txt"), "Not a source file");
  await delay(100);
  assert.equal(f.count(), 0);
  await f.change(() => writeFile(path.join(folder, "index.md"), "Lecture"));
  const moved = path.join(f.root, "2026", "10", "27");
  await f.change(() => rename(folder, moved));
  await f.change(() => unlink(path.join(moved, "index.md")));
  f.watcher.close();
  const before = f.count();
  await writeFile(path.join(moved, "index.mdx"), "After closing");
  await delay(100);
  assert.equal(f.count(), before);
});
