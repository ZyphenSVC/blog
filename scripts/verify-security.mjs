import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { parseArgs } from "node:util";

const { parse } = createRequire(import.meta.url)("next/dist/compiled/node-html-parser");
const { values } = parseArgs({ options: {
  "base-url": { type: "string", default: "https://zyphensvc.com" },
  "report-only": { type: "boolean" },
  "require-hsts": { type: "boolean" },
}});
const base = new URL(values["base-url"]).origin;
const file = name => readFileSync(new URL("../public/" + name, import.meta.url), "utf8");
const baseline = new Headers(file("_headers").split("\n\n")[0].split("\n")
  .filter(line => /^  [\w-]+: /.test(line)).map(line => line.trim().split(": ")));
const assets = new Set(["/media/optimized/face.webp", "/media/resume.pdf", "/media/cv.pdf"]);
const nonces = new Set();

async function get(path, status = 200) {
  const res = await fetch(base + path, { redirect: "manual", signal: AbortSignal.timeout(20000),
    headers: { Origin: "https://example.org", Accept: "text/html, */*;q=0.8" } });
  assert.equal(res.status, status, path);
  for (const [key, value] of baseline) {
    if (key !== "content-security-policy") assert.equal(res.headers.get(key), value, path + " " + key);
  }
  assert.equal(res.headers.has("Access-Control-Allow-Origin"), false, path + " CORS");
  if (values["require-hsts"]) {
    assert.match(res.headers.get("Strict-Transport-Security") ?? "", /^max-age=[1-9]\d*$/i, path + " host-only HSTS");
  }
  return res;
}

for (const path of ["/", "/", "/projects", "/research", "/contact", "/blog", "/notes",
  "/blog/2026/09/13", "/notes/isogeny-reading-group", "/notes/isogeny-reading-group/lecture-1",
  "/__portfolio_missing__"]) {
  const res = await get(path, path === "/__portfolio_missing__" ? 404 : 200);
  assert.match(res.headers.get("Content-Type") ?? "", /^text\/html/);
  assert.match(res.headers.get("Cache-Control") ?? "", /\bno-store\b/);
  const policyHeader = "Content-Security-Policy";
  const policy = res.headers.get(values["report-only"] ? policyHeader + "-Report-Only" : policyHeader) ?? "";
  if (values["report-only"]) assert.equal(res.headers.get(policyHeader), "frame-ancestors 'none'");
  const directives = new Map(policy.split(/;\s*/).map(part => {
    const [key, ...sources] = part.trim().split(/\s+/);
    return [key, sources.join(" ")];
  }));
  const script = directives.get("script-src") ?? "";
  const nonce = script.match(/^'self' 'nonce-([A-Za-z0-9+/]{24})'$/)?.[1];
  assert.ok(nonce && !nonces.has(nonce), path + " missing or reused nonce");
  nonces.add(nonce);
  for (const key of ["default-src","base-uri","object-src","worker-src","form-action","frame-ancestors","script-src-attr"]) {
    assert.equal(directives.get(key), "'none'", path + " " + key);
  }
  for (const key of ["img-src","font-src","connect-src"]) assert.equal(directives.get(key), "'self'");
  assert.equal(directives.get("style-src"), "'self' 'nonce-" + nonce + "'");
  assert.equal(directives.get("style-src-attr"), "'unsafe-inline'");
  const html = parse(await res.text());
  assert.ok(html.querySelector("main"), path);
  for (const scriptTag of html.querySelectorAll("script")) {
    const src = scriptTag.getAttribute("src");
    if (src) {
      const url = new URL(src, base);
      assert.equal(url.origin, base, path + " external script");
      assets.add(url.pathname);
    } else if (scriptTag.rawText.trim()) {
      assert.equal(scriptTag.getAttribute("nonce"), nonce, path + " inline script");
    }
  }
  for (const link of html.querySelectorAll('link[rel="stylesheet"], link[as="font"]')) {
    const url = new URL(link.getAttribute("href"), base);
    assert.equal(url.origin, base);
    assets.add(url.pathname);
  }
  console.log("PASS", path);
}

for (const path of [...assets, "/.well-known/security.txt"]) {
  const res = await get(path);
  assert.equal(res.headers.get("content-security-policy"), baseline.get("content-security-policy"), path);
  if (path.endsWith("/security.txt")) {
    assert.match(res.headers.get("content-type"), /^text\/plain;\s*charset=utf-8$/i);
    const source = file(".well-known/security.txt");
    assert.equal(await res.text(), source);
    assert.match(source, /^Contact: mailto:svedantam@zyphensvc\.com$/m);
    assert.match(source, /^Canonical: https:\/\/zyphensvc\.com\/\.well-known\/security\.txt$/m);
    assert.match(source, /^Preferred-Languages: en$/m);
    const expiry = Date.parse(source.match(/^Expires: (.+)$/m)?.[1]);
    assert.ok(expiry > Date.now() && expiry < Date.now() + 365 * 86400000, "renew security.txt");
  } else {
    await res.body?.cancel();
  }
  console.log("PASS", path);
}
if (base === "https://zyphensvc.com") {
  const path = "/research?ref=security-check";
  for (const host of ["zyphensvc.com", "www.zyphensvc.com"]) {
    const response = await fetch("http://" + host + path, { redirect: "manual", method: "HEAD" });
    assert.ok([301, 308].includes(response.status));
    assert.equal(response.headers.get("location"), "https://" + host + path);
  }
  console.log("PASS HTTP to HTTPS redirects");
}
