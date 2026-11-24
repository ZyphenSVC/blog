import nextWorker from "./.open-next/worker.js";
export * from "./.open-next/worker.js";
import assetRules from "./public/_headers";

// Reuse only the global asset rule. Path-specific asset rules follow a blank line.
const defaults = new Headers();
for (const line of assetRules.split("\n\n")[0].split("\n")) {
  const match = line.match(/^  ([\w-]+): (.+)$/);
  if (match) defaults.set(match[1], match[2]);
}

export default {
  async fetch(request, env, ctx) {
    const bytes = crypto.getRandomValues(new Uint8Array(18));
    const nonce = btoa(String.fromCharCode(...bytes));
    const policy = [
      defaults.get("Content-Security-Policy"),
      "object-src 'none'", "worker-src 'none'",
      `script-src 'self' 'nonce-${nonce}'`,
      "script-src-attr 'none'",
      `style-src 'self' 'nonce-${nonce}'`,
      // Server-rendered KaTeX uses inline dimensions and vertical alignment.
      "style-src-attr 'unsafe-inline'",
      "img-src 'self'", "font-src 'self'", "connect-src 'self'",
    ].join("; ");

    const upstream = new Request(request);
    upstream.headers.set("x-portfolio-nonce", nonce);
    upstream.headers.set("Content-Security-Policy", policy);
    const response = await nextWorker.fetch(upstream, env, ctx);
    const result = new Response(response.body, response);
    for (const [name, value] of defaults) result.headers.set(name, value);
    result.headers.delete("Access-Control-Allow-Origin");

    const type = result.headers.get("Content-Type") ?? "";
    if (type.startsWith("text/html")) {
      if (env.CSP_MODE === "report-only") {
        result.headers.set("Content-Security-Policy", "frame-ancestors 'none'");
        result.headers.set("Content-Security-Policy-Report-Only", policy);
      } else {
        result.headers.set("Content-Security-Policy", policy);
      }
    }
    if (type.startsWith("text/html") || type.startsWith("text/x-component")) {
      result.headers.set("Cache-Control", "private, no-store");
      result.headers.delete("ETag");
    }
    return result;
  },
};
