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

Local development watches lecture-note files for live updates and uses Webpack to avoid the observed Turbopack “Next.js package not found” panic. For better filesystem performance on Linux, keep the working copy and dependencies on a native Linux filesystem (such as ext4). Production builds retain their existing configuration.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses `next/font/local` to load the original portfolio’s Inconsolata variable font from `public/fonts`, without downloading fonts at build time. Shared styles and the dark/light palettes live in `app/globals.css`; the theme toggle remembers the reader’s preference.

The compact lavender layout includes heading wipes and scroll reveals inspired by [WhiteHoodHacker’s portfolio](https://github.com/WhiteHoodHacker/whitehoodhacker.net). Animations respect reduced-motion settings, and content remains readable without JavaScript. Icons are local SVG components in `app/components/Icon.tsx`.

Competition records live in `lib/competitions.ts`, reconciled from the original site at `960835f` and `public/media/cv.pdf` (September 2026, pages 3–4). The newer CV takes precedence where rankings differ; unknown field sizes remain unspecified.

The homepage also covers the CV’s academic talks, research, employment, teaching, service, skills, languages, and all 34 coursework entries. These records live in `lib/cv.ts`, with the added sections rendered by `app/components/CvSections.tsx`. Experience details expand in native HTML disclosures, and section links help navigate the longer page. The October 2026 lecture series is marked scheduled; audited courses and expired Security+ certification are labeled explicitly. The two 2023 seminar references describe the named academic talks and are consolidated into those entries, with Directed Reading Program links. Existing portfolio roles and planned certifications are preserved alongside the CV updates.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Lecture notes

Reading groups appear under `/notes`. To add an Isogeny Reading Group lecture, follow [the authoring guide](content/notes/README.md). Lecture files are compiled during `prebuild`, separate from the blog feed, with Markdown and KaTeX support.

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
