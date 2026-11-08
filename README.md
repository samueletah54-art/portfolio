# Samuel Etah — portfolio

Personal portfolio for Samuel Etah, web developer and security enthusiast in Yaoundé, Cameroon.
Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion.

## Edit the content

All text, projects, skills, services and contact links live in **`src/content/site.ts`**.
Change it, commit, push: Vercel redeploys automatically. Setting a value to `null` hides it.

Project screenshots go in `public/projects/` (1200×750 WebP works best).

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, also runs lint and type checks
```

## Contact form

The form sends through [Web3Forms](https://web3forms.com) (free, no backend).
Get an access key there with your email, then in Vercel: **Project → Settings → Environment Variables**,
add `NEXT_PUBLIC_WEB3FORMS_KEY` and redeploy. Without a key the form opens the visitor's email app instead.

## Custom domain

Buy a domain (Vercel, Namecheap, etc.), then in Vercel: **Project → Settings → Domains → Add**.
Vercel shows the DNS records to add at your registrar; HTTPS is issued automatically.
Finally update `url` in `src/content/site.ts` so SEO tags and the sitemap use the new address.
