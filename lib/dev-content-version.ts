/** Read completed generated content directly, independently of Webpack's cache. */
export async function getDevContentVersion(): Promise<string | null> {
  if (process.env.NODE_ENV !== "development") return null;

  const [{ readFile }, { createHash }] = await Promise.all([
    import("node:fs/promises"),
    import("node:crypto"),
  ]);
  const documents = await Promise.all(
    ["generated-posts.json", "generated-notes.json"].map((name) =>
      readFile(`${process.cwd()}/lib/${name}`, "utf8"),
    ),
  );
  const hash = createHash("sha256");
  for (const document of documents) {
    // A reader can catch a generator mid-write; retry on the next poll.
    JSON.parse(document);
    hash.update(document).update("\0");
  }
  return hash.digest("hex");
}
