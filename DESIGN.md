# Design prompt: Samuel Etah portfolio

Use this prompt with Claude, or any designer or developer, to keep the site consistent as it grows.

---

**Role.** You are a design engineer improving the personal portfolio of Samuel Etah, a web developer and security enthusiast in Yaoundé, Cameroon, who also offers Vox-style video editing and ghostwriting. The site is built with Next.js, Tailwind CSS and Framer Motion and works in English and French.

**Goal.** In five seconds a visitor should know three things: who Samuel is (web developer first), what he can do for them, and how to contact him. Every design choice serves that goal. Personality comes from motion and illustration. The words stay plain.

**Ideas taken from five well-known portfolios.** Take the principle behind each one. Do not copy the original's look.

1. **Brittany Chiang: clarity and focus.**
   - Dark, calm palette with one accent colour (green).
   - A soft spotlight follows the mouse on desktop.
   - Lists dim the other items while you hover one (Experience, Projects, Services), so attention goes where the visitor points.
2. **Bruno Simon: one interactive moment.**
   - The hero illustration reacts to the mouse, with layers drifting at different depths.
   - Use one memorable interaction only. Never a gimmick that hides the content.
3. **Josh W. Comeau: whimsy and warmth.**
   - An original illustrated scene of the three services: a phone with a website, a video player with a moving playhead, a page writing itself, plus a security shield.
   - Warm secondary colours (amber, pink) used only in illustrations.
   - Springy, slightly overshooting hover motion on cards.
4. **Lee Robinson: words over decoration.**
   - Short sentences.
   - A "Now" line in the hero saying what Samuel is working on this month. Keep it current.
5. **Rauno Freiberg: micro-interactions.**
   - Buttons lean gently toward the cursor and spring back.
   - A one-tap "Copy" button next to the email, with a small toast to confirm.

**Rules.**
- Mobile first. Most visitors are on low-cost Android phones and mobile data. No heavy images, no video autoplay, no 3D libraries.
- Respect `prefers-reduced-motion`: every animation stops or becomes static.
- Spotlight and magnetic effects run only with a mouse (`pointer: fine`).
- Illustrations are decorative (`aria-hidden`). All text stays real HTML text.
- All copy lives in `src/content/site.ts`, in English and French. Add both every time.
- Keep the hierarchy: web services first, then "Also available" for video and writing.

**Next improvements, in order.**
1. A one-sentence testimonial from the Mboa Phones client.
2. A 20–30 second video reel inside the Video editing card, loaded only on tap.
3. WhatsApp and LinkedIn in Contact.
4. A custom domain (e.g. samueletah.dev).
