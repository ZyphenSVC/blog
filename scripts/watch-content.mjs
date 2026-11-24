import { readdir, stat } from "node:fs/promises";
import path from "node:path";

async function snapshot(directory, matches) {
  const files = [];
  async function walk(folder) {
    try {
      const entries = await readdir(folder, { withFileTypes: true });
      await Promise.all(entries.map(async (entry) => {
        const file = path.join(folder, entry.name);
        if (entry.isDirectory()) return walk(file);
        if (!entry.isFile() || !matches(entry.name)) return;
        try {
          const info = await stat(file, { bigint: true });
          files.push(`${file}:${info.ino}:${info.size}:${info.mtimeNs}:${info.ctimeNs}`);
        } catch (error) {
          // An editor can replace a file between readdir and stat.
          if (error.code !== "ENOENT") throw error;
        }
      }));
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  await walk(directory);
  return files.sort().join("\n");
}

/** Poll metadata so atomic saves cannot leave us watching an old inode. */
export async function watchContent(directory, { matches, onChange, onError, intervalMs = 500 }) {
  let previous = await snapshot(directory, matches);
  let closed = false;
  let timer;

  async function poll() {
    try {
      const current = await snapshot(directory, matches);
      if (!closed && current !== previous) {
        previous = current;
        await onChange();
      }
    } catch (error) {
      if (!closed) onError(error);
    } finally {
      // Slow filesystems must not cause overlapping scans.
      if (!closed) timer = setTimeout(poll, intervalMs);
    }
  }

  timer = setTimeout(poll, intervalMs);
  return {
    close() {
      closed = true;
      clearTimeout(timer);
    },
  };
}
