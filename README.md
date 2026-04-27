# samikshakature.xyz — v2

Personal portfolio of Samiksha Kature. Built with Next.js 15 App Router + TypeScript.

**Live:** [samikshakature.xyz](https://samikshakature.xyz)  
**Branch:** `v2-build` (preview) → `main` (production)

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Animation | Framer Motion |
| MDX | next-mdx-remote + rehype-pretty-code + remark-gfm |
| Command palette | cmdk |
| Analytics | Vercel Analytics + Speed Insights |
| OG images | @vercel/og (edge) |
| Fonts | next/font/google — Cormorant Garamond, DM Sans, JetBrains Mono |
| Hosting | Vercel |

---

## Repo structure

```
app/                    Next.js App Router
  layout.tsx            Root layout (fonts, metadata, Analytics)
  template.tsx          Page transition wrapper (AnimatePresence)
  page.tsx              Home page
  now/page.tsx          /now — current status MDX page
  projects/
    page.tsx            /projects index
    [slug]/page.tsx     /projects/[slug] case study
  notes/
    page.tsx            /notes index
    [slug]/page.tsx     /notes/[slug] post
  api/og/route.tsx      Dynamic OG image (edge function)
  sitemap.ts            Auto-generated sitemap
  robots.ts             robots.txt
  globals.css           Design tokens, utilities, prose styles

components/
  Nav.tsx               Sticky nav with IntersectionObserver, ⌘K chip
  Footer.tsx            Three-column footer with build date
  LayoutShell.tsx       Client shell (PaletteProvider + lazy components)
  HomePageShell.tsx     Slots Hero into home page with palette context
  PaletteContext.tsx    Shared open/close state for CommandPalette
  Hero.tsx              Home hero with typed animation, mouse effects
  About.tsx             Bio + Beyond Work + Currently sections
  Experience.tsx        Timeline with scroll-driven accent line
  Education.tsx         Three blocks: degrees, honors, certs
  Skills.tsx            TierDots pills, competencies, research interests
  Projects.tsx          Featured Pixel card + 2-col grid
  NotesPreview.tsx      3 most recent notes (server component)
  Press.tsx             Press/publications (hidden until visible=true)
  Contact.tsx           Contact CTAs
  IntroScreen.tsx       First-visit overlay with typed animation
  CommandPalette.tsx    ⌘K palette (cmdk)
  CustomCursor.tsx      Custom cursor for desktop
  SectionCounter.tsx    Fixed 04/08 pill on home page
  mdx/MdxContent.tsx    Shared MDX renderer

content/
  now.mdx               /now page content
  projects/*.mdx        Case study content (one per project)
  notes/*.mdx           Blog posts

lib/
  mdx.ts                getMdx, getMdxFile, listMdx, readTime
  motion.ts             Shared Framer Motion tokens (ease, dur, fadeUp…)

content/
  site.ts               Typed source of truth for all site data
```

---

## Dev

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # ESLint
```

**Node:** ≥ 18.18.0 (runs on 25.x)  
**npm:** ≥ 10

---

## Content

### Updating /now
Edit `content/now.mdx` and update the `updatedAt` frontmatter field.

### Adding a project case study
1. Add an MDX file to `content/projects/<slug>.mdx` with frontmatter:
   ```yaml
   title: "..."
   slug: <slug>
   summary: "..."
   tags: [...]
   status: live | in-progress | archived
   year: 2025
   metrics:
     - { label: "...", value: "..." }
   ```
2. Add a matching entry to `site.projects` in `content/site.ts`.

### Adding a note
Create `content/notes/<date>-<slug>.mdx` with frontmatter:
```yaml
title: "..."
date: "YYYY-MM-DD"
tldr: "One-line summary."
tags: [...]
```

### Setting skill tiers
Edit `content/site.ts` → `skills.technical`. Change `tier: 2` (Working) to `1` (Daily) or `3` (Familiar) per item.

---

## Deployment

Deployed on Vercel via git push. The `NEXT_PUBLIC_BUILD_DATE` env var is injected at build time via `next.config.mjs`.

Push `v2-build` → open a preview URL → verify → merge to `main`.
