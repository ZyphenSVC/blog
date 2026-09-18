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
