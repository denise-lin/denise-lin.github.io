# Denise Lin — personal site

A small, static, deploy-anywhere site with two routes:

- **`/`** — a calm, professional landing page (bio, sustainability / program
  work, education). Timeless and neutral; no resume download, no job-seeking
  language.
- **`/anduril`** — an **unlisted** application page for a corporate-finance /
  FP&A role. Written so the load-bearing prose is Denise's own words (lifted from
  her resume and her Ford research report), and anchored by two **live embedded
  spreadsheets** (a Ford forecast and a Dropbox share-buyback model).

## Stack & why

- **[Astro](https://astro.build)** — static-first, ships **zero client JS** by
  default, file-based routing for exactly two pages, and a sitemap integration
  that makes it trivial to **exclude `/anduril`** from the sitemap. Output is a
  plain static `dist/` deployable to any host.
- **Hand-written CSS with custom properties** (`src/styles/global.css`) for the
  design tokens — Berkeley navy + California gold. No CSS framework.
- **No external runtime calls.** Type is a refined system font stack (Palatino-class
  serif for headings, system sans for body), so there are no web-font network
  requests at view time. The only third-party requests are the two OneDrive
  spreadsheet iframes on `/anduril`, which are intentional.

## Run & build

```bash
npm install      # one-time
npm run dev      # local dev server (prints the URL, usually http://localhost:4321)
npm run build    # static output → dist/
npm run preview  # serve the built dist/ locally
```

`dist/` is a static bundle — drop it on any static host. **No DNS, TLS, nginx,
or server runtime is configured here** (out of scope by design).

## Deploy to root@net.vedantk.com

```
npm run build
rsync -avz --delete dist/ root@net.vedantk.com:/var/www/denise-lin.com/html/
```

## Where the copy lives

- Landing page: `src/pages/index.astro`
- Anduril page: `src/pages/anduril.astro` — the `fit` array near the top holds
  the competency → quote pairs; the prose below it is the Ford / Dropbox
  narration.
- Shared `<head>`, skip-link, and the `noindex` toggle: `src/layouts/Base.astro`
  (the Anduril page passes `noindex={true}`).
- Spreadsheet embed wrapper: `src/components/SheetEmbed.astro`. The iframe `src`
  values are pasted verbatim from the source brief — **do not edit the query
  params**; they control the active cell and hidden gridlines/headers.

## Unlisted-ness of `/anduril`

This is obscurity, not security — a static host serves the file to anyone who
requests the path. The page is kept out of:

- **navigation** (it is linked from nowhere),
- the **sitemap** (`astro.config.mjs` filters it out),
- **search indexes** (`<meta name="robots" content="noindex,nofollow">` via the
  layout, plus `Disallow: /anduril` in `public/robots.txt`).

There is deliberately **no fake auth**. Reachable only by typing the URL.

## Things to update before deploying

- **`site:`** in `astro.config.mjs` (and the `Sitemap:` line in
  `public/robots.txt`) — set to the real domain so the sitemap emits correct
  absolute URLs.
- Contact links on `/` (email + LinkedIn) are quiet by design; remove in
  `index.astro` if Denise prefers none.

## Source materials

`resources/` holds the documents the Anduril copy is drawn from (resume, Ford
research report, the two workbooks, and the iframe snippets). They are **not**
part of the published build — Astro only ships `src/` and `public/`.

## What's intentionally absent

No resume download link anywhere. No "open to work" / job-seeking language. The
resume is not recreated — the Anduril page frames one portfolio project, in
Denise's voice, rather than restating a CV.
