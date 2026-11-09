# Samuel ETAH — portfolio and blog

Hand-coded with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion and MDX. Hosted on Vercel.
Brand: "Code. Secure. Create." Dark by default (#1e2129) with green (#4ade80), yellow (#ffe14d) and a blue footer.

## Edit the content

| What | Where |
| --- | --- |
| Profile, links, projects, services, courses, /uses, /now, CV | `src/content/site.ts` |
| "Available for work" badge on/off | `availableForWork` in `src/content/site.ts` |
| Testimonials (stay hidden while empty; add only real ones) | `src/content/testimonials.ts` |
| Interface text, English and French | `src/i18n/en.ts`, `src/i18n/fr.ts` (same keys; a test checks this) |
| Blog posts | `content/posts/<slug>/en.mdx` and `fr.mdx` |
| Avatar images | `public/avatar/` (hero-sitting, footer-peek, wave, 404) |
| Project screenshots | `public/projects/` (1200×750 WebP) |

### Write a post

Create `content/posts/my-new-post/en.mdx` (and `fr.mdx` for French):

```mdx
---
title: "Your title"
subtitle: "One line under the title"
excerpt: "Two lines shown in the article list"
date: "2026-11-20"
category: "web-development"   # a slug from categories in site.ts
popular: false                # true shows it under Popular content
---

## A heading (appears in the table of contents)

Your text. Code blocks get highlighting and a Copy button.
Wrap a phrase in <Sparkles>like this</Sparkles> to make little stars pop around it.
```

## Environment variables (Vercel → Project → Settings → Environment Variables)

All optional. Without them the forms open the visitor's email app instead.

| Name | What for | Where to get it |
| --- | --- | --- |
| `NEXT_PUBLIC_FORMSPREE_ID` | Contact form | Create a form at formspree.io; the ID is the part after `/f/` |
| `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` | Newsletter signup | A form endpoint that accepts an `email` field (e.g. a second Formspree form, or Buttondown's embed URL) |

These values are public by design (they are form addresses, not secrets). Never put private keys in a `NEXT_PUBLIC_` variable.

## Security

- Security headers on every page (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy) in `next.config.ts`
- `/.well-known/security.txt` in `public/`
- Forms: hidden honeypot field plus Formspree's own spam and rate limiting

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npx vitest run     # tests
```

## Keyboard shortcuts

`/` or Ctrl/Cmd+K: search · `T`: switch theme · click the hero avatar 5 times for a surprise.

## Still to do (phase 2: course platform)

Payments (card + Mobile Money), student accounts, lesson player, certificates. Needs accounts for Supabase, a payment provider and video hosting first.
