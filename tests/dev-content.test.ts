import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { runInNewContext } from "node:vm";
import { getDevContentVersion } from "../lib/dev-content-version";
import { devContentRefreshScript } from "../lib/dev-content-refresh";

test("content version detects posts and notes, ignores unchanged output, and rejects incomplete writes", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "blog-content-version-"));
  const previousCwd = process.cwd();
  const previousEnvironment = process.env.NODE_ENV;
  try {
    await mkdir(path.join(root, "lib"));
    const posts = path.join(root, "lib/generated-posts.json");
    const notes = path.join(root, "lib/generated-notes.json");
    await writeFile(posts, "[]");
    await writeFile(notes, "[]");
    process.chdir(root);
    Object.assign(process.env, { NODE_ENV: "development" });
    const initial = await getDevContentVersion();
    assert.match(initial!, /^[a-f0-9]{64}$/);
    await writeFile(posts, "[]");
    assert.equal(await getDevContentVersion(), initial);
    await writeFile(posts, '[{"html":"New post"}]');
    const updated = await getDevContentVersion();
    assert.notEqual(updated, initial);
    await writeFile(notes, '[{"html":"New lecture"}]');
    const withLecture = await getDevContentVersion();
    assert.notEqual(withLecture, updated);
    await writeFile(posts, "[{\"html\":");
    await assert.rejects(getDevContentVersion());
    await writeFile(posts, '[{"html":"New post"}]');
    assert.equal(await getDevContentVersion(), withLecture);
    Object.assign(process.env, { NODE_ENV: "production" });
    await rm(path.join(root, "lib"), { recursive: true });
    assert.equal(await getDevContentVersion(), null);
  } finally {
    process.chdir(previousCwd);
    if (previousEnvironment === undefined) delete process.env.NODE_ENV;
    else Object.assign(process.env, { NODE_ENV: previousEnvironment });
    await rm(root, { recursive: true, force: true });
  }
});

test("refresh script reloads changed content without React and retries failed requests", async () => {
  const pending: Array<() => Promise<void>> = [];
  let reloads = 0;
  let response: { ok: boolean; version?: string } = { ok: true, version: "initial" };
  const context = {
    window: { location: { reload: () => { reloads++; } } },
    fetch: async () => ({ ok: response.ok, json: async () => ({ version: response.version }) }),
    setTimeout: (callback: () => Promise<void>) => pending.push(callback),
  };
  runInNewContext(devContentRefreshScript("initial"), context);
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(reloads, 0);
  assert.equal(pending.length, 1);
  response = { ok: false };
  await pending.shift()!();
  assert.equal(reloads, 0);
  assert.equal(pending.length, 1);
  response = { ok: true, version: "updated" };
  await pending.shift()!();
  assert.equal(reloads, 1);
  assert.equal(pending.length, 0);
  // Re-executing the script during a dev render must not add a second poller.
  runInNewContext(devContentRefreshScript("initial"), context);
  assert.equal(pending.length, 0);
});
