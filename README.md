This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

In development, the server watches blog posts and lecture notes and refreshes the browser when their generated content changes.

## Production HTTP security

Cloudflare serves assets directly and sends application requests to the OpenNext Worker. The global rule in `public/_headers` protects both paths. The custom `worker.js` entry imports the global rule, issues a random nonce per request and forwards the policy to Next.js before rendering. The theme and homepage intro explicitly receive that nonce. Keep deploying the OpenNext build using the repository’s Wrangler configuration. [Workers Static Assets headers](https://developers.cloudflare.com/workers/static-assets/headers/) · [OpenNext custom Worker](https://opennext.js.org/cloudflare/howtos/custom-worker)

HTML and React Server Component responses use private, no-store caching. This trades full-page caching for a fresh nonce on every load, including individual blog and lecture URLs. Fonts, JavaScript, CSS, PDFs and images retain asset caching. Next.js development mode uses its own runtime. Use the Workers preview to test production headers. [Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy)

The document policy allows same-origin scripts plus explicitly nonced inline scripts. External images, scripts, fonts, frames, form submissions and inline event handlers are blocked. The style-attribute exception permits KaTeX’s generated dimensions and alignment and Next.js image styles. Local stylesheets and fonts provide the typography. External links, including research sites, work as normal navigations. Review resource changes and any Cloudflare features that inject client-side JavaScript in report-only mode before release.

### Verify locally

1. Run `pnpm install --frozen-lockfile` and `pnpm exec opennextjs-cloudflare build`.
2. Run `pnpm exec wrangler dev --local --var CSP_MODE:report-only`. In another terminal run `pnpm run security:verify --base-url http://localhost:8787 --report-only`, using the port printed by Wrangler.
3. Check the browser console on the homepage, blog and a lecture with equations. Exercise theme persistence, normal and hard reload, blog search and the mobile menu. CSP reports stay in browser developer tools.
4. Stop the preview and restart with `pnpm exec wrangler dev --local`. Repeat the browser checks and run `pnpm run security:verify --base-url http://localhost:8787`. The versioned default is enforcement.
5. After publishing, run `pnpm run security:verify` against https://zyphensvc.com. The production check also verifies the existing HTTP-to-HTTPS redirects for the apex and www, preserving host, path and query.

### Edge settings and disclosure contact

- Review HSTS under **SSL/TLS → Edge Certificates**. The app leaves it to the zone owner. For an approved host-only rollout, start with a short max-age, verify HTTPS, then increase it. Leave includeSubDomains and preload off. Use `pnpm run security:verify --require-hsts` to require positive host-only HSTS on each checked response. [Cloudflare HSTS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/)
- Review DNSSEC under **DNS → Settings → DNSSEC**. Use `dig DS zyphensvc.com` and `delv zyphensvc.com A` to check the parent delegation and validating chain. Coordinate registrar DS records with Cloudflare if keys change. [Cloudflare DNSSEC](https://developers.cloudflare.com/dns/dnssec/)
- Keep edge cache rules consistent with origin no-store for HTML and RSC responses. Review analytics or HTML rewriting on a preview before enabling it. Keep external-account changes separate from the application patch.
- The RFC 9116 file at `public/.well-known/security.txt` uses the portfolio’s published contact. Check the inbox and renew the UTC expiry before November 1, 2027, and at least annually thereafter. Each new expiry should be less than a year away.
