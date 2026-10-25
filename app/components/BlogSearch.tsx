"use client";

import { useState } from "react";
import { PostCard, type PostCardProps } from "./PostCard";

type SearchPost = Omit<PostCardProps, "headingLevel">;

export function BlogSearch({ posts }: { posts: SearchPost[] }) {
  const [query, setQuery] = useState("");
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const filtered = posts.filter((post) => terms.every((term) => {
    const tagOnly = term.startsWith("#");
    const search = tagOnly ? term.slice(1) : term;
    return (!tagOnly && post.title.toLowerCase().includes(search)) ||
      post.tags.some((tag) => tag.replace(/^#/, "").toLowerCase().includes(search));
  }));

  return (
    <>
      <section className="blog-search" aria-label="Filter posts">
        <label htmlFor="blog-search">Search titles or tags</label>
        <div className="blog-search-controls">
          <input id="blog-search" type="search" value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try isogenies, algebra, or #cryptography"
            aria-controls="blog-results" />
          {query && <button type="button" onClick={() => setQuery("")}>Clear</button>}
        </div>
        <p className="section-count" role="status" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "entry" : "entries"}{terms.length > 0 ? ` found · ${posts.length} total` : ""}
        </p>
      </section>
      <div id="blog-results" className="post-list">
        {filtered.map((post) => <PostCard key={post.href} {...post} headingLevel={2} />)}
        {filtered.length === 0 && <p>No posts match your search. Try another title or tag.</p>}
      </div>
    </>
  );
}
