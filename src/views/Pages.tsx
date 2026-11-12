"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { site, categories, projects, services, courses, about, uses, now, whatsappLink, prettyPhone } from "@/content/site";
import { useLang } from "@/components/LangProvider";
import { CategoryPills, PostFeed } from "@/components/Blog";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icons";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmail } from "@/components/CopyEmail";
import { socials } from "@/components/Footer";
import { fmtDate } from "@/lib/format";
import { ProjectCard, ServiceIcon, SectionTitle } from "./Home";

export function PageHead({ title, intro, children }: { title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <header className="mx-auto max-w-[1100px] px-5 pb-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
      <h1 className="t-title">{title}</h1>
      {intro && <p className="t-lead mt-4 max-w-2xl text-muted">{intro}</p>}
      {children}
    </header>
  );
}

const Wrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-[1100px] px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

/* ---------- Blog index and categories ---------- */
export function BlogView({ category }: { category?: string }) {
  const { lang, t } = useLang();
  const cat = categories.find((c) => c.slug === category);
  return (
    <>
      <PageHead title={cat ? cat.name[lang] : t.home.latest} intro={cat ? cat.blurb[lang] : t.home.blogIntro}>
        <div className="mt-6">
          <CategoryPills active={category} />
        </div>
      </PageHead>
      <Wrap className="mt-10">
        <PostFeed category={category} />
      </Wrap>
    </>
  );
}

/* ---------- Projects ---------- */
export function ProjectsView() {
  const { t } = useLang();
  return (
    <>
      <PageHead title={t.projects.title} intro={t.projects.intro} />
      <Wrap className="mt-8">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p.slug}>
              <Reveal className="h-full">
                <ProjectCard slug={p.slug} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Wrap>
    </>
  );
}

export function CaseStudyView({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const p = projects.find((x) => x.slug === slug)!;
  return (
    <>
      <PageHead title={p.name} intro={p.summary[lang]}>
        <div className="mt-6 flex flex-wrap gap-3">
          {p.live ? (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {t.projects.live} <Icon name="arrowUpRight" size={18} />
            </a>
          ) : (
            <span className="btn btn-ghost cursor-default">{t.projects.soon}</span>
          )}
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Icon name="github" size={18} /> {t.projects.github}
            </a>
          )}
        </div>
      </PageHead>
      <Wrap className="mt-10">
        <Image src={p.image} alt={p.imageAlt[lang]} width={1200} height={750} priority sizes="(min-width: 1152px) 1100px, 100vw" className="h-auto w-full rounded-2xl border border-line" />
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <section>
            <SectionTitle>{t.projects.problem}</SectionTitle>
            <p className="mt-3 text-lg leading-relaxed">{p.problem[lang]}</p>
          </section>
          <section>
            <SectionTitle>{t.projects.built}</SectionTitle>
            <ul className="mt-3 space-y-2">
              {p.built[lang].map((b) => (
                <li key={b} className="flex gap-2.5 text-lg">
                  <Icon name="check" size={22} className="mt-0.5 shrink-0 text-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <SectionTitle>{t.projects.stack}</SectionTitle>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s} className="rounded-full bg-accent-soft px-3 py-1.5 text-sm font-bold text-accent">
                  {s}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <SectionTitle>{t.projects.result}</SectionTitle>
            <p className="mt-3 text-lg leading-relaxed">{p.result[lang]}</p>
          </section>
        </div>
        {p.beforeAfter && (
          <section className="mt-12">
            <SectionTitle>{t.projects.beforeAfter}</SectionTitle>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {(["before", "after"] as const).map((k) => (
                <figure key={k}>
                  <Image src={p.beforeAfter![k]} alt={`${p.name}: ${t.projects[k]}`} width={1200} height={750} className="h-auto w-full rounded-xl border border-line" />
                  <figcaption className="mt-2 text-sm font-bold text-muted">{t.projects[k]}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
      </Wrap>
    </>
  );
}

/* ---------- Services ---------- */
export function ServicesView() {
  const { lang, t } = useLang();
  return (
    <>
      <PageHead title={t.services.title} intro={t.services.intro} />
      <Wrap className="mt-8">
        <ul className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug} id={s.slug} className="scroll-mt-28">
              <Reveal className="h-full">
                <article className="lift flex h-full flex-col rounded-2xl border border-line bg-bg-2 p-6">
                  <ServiceIcon name={s.icon} />
                  <h2 className="mt-4 text-2xl font-extrabold">{s.title[lang]}</h2>
                  <p className="mt-2 text-muted">{s.text[lang]}</p>
                  <p className="mt-5 text-sm font-black uppercase tracking-widest text-accent">{t.services.included}</p>
                  <ul className="mt-2 flex-1 space-y-1.5">
                    {s.included[lang].map((i) => (
                      <li key={i} className="flex gap-2">
                        <Icon name="check" size={18} className="mt-1 shrink-0 text-accent" />
                        {i}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm">
                    <span className="font-bold">{t.services.timeline}:</span> {s.timeline[lang]}
                  </p>
                  <a href={whatsappLink(`${t.services.quote}: ${s.title[lang]}`)} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5 self-start">
                    {t.services.quote} <Icon name="arrow" size={18} />
                  </a>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Wrap>
    </>
  );
}

/* ---------- Courses ---------- */
function CourseCover({ slug, big = false }: { slug: string; big?: boolean }) {
  const c = courses.find((x) => x.slug === slug)!;
  return (
    <div
      aria-hidden="true"
      className={`relative grid place-items-center overflow-hidden ${big ? "aspect-[16/9] rounded-2xl" : "aspect-[16/9]"}`}
      style={{ background: `linear-gradient(135deg, ${c.colors[0]}, ${c.colors[1]})` }}
    >
      <span className="font-display text-6xl font-black text-white/90 drop-shadow">{c.icon}</span>
      <span className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/15" />
      <span className="absolute -left-6 -top-6 h-20 w-20 rounded-full bg-white/10" />
    </div>
  );
}

export function CoursesView() {
  const { lang, t } = useLang();
  return (
    <>
      <PageHead title={t.courses.title} intro={t.courses.intro} />
      <Wrap className="mt-8">
        <ul className="grid gap-6 sm:grid-cols-2">
          {courses.map((c) => (
            <li key={c.slug}>
              <Reveal className="h-full">
                <article className="lift flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-bg-2">
                  <CourseCover slug={c.slug} />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                      <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">
                        {t.courses.level}: {c.level[lang]}
                      </span>
                      {c.status === "soon" && <span className="rounded-full bg-yellow px-2.5 py-1 text-yellow-fg">{t.courses.soon}</span>}
                    </div>
                    <h2 className="mt-3 text-xl font-extrabold">{c.title[lang]}</h2>
                    <p className="mt-1.5 flex-1 text-muted">{c.promise[lang]}</p>
                    <Link href={`/courses/${c.slug}`} className="btn btn-primary mt-5 self-start">
                      {c.status === "soon" ? t.courses.waitlist : t.courses.start} <Icon name="arrow" size={18} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Wrap>
    </>
  );
}

export function CourseView({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const c = courses.find((x) => x.slug === slug)!;
  const [open, setOpen] = useState<number | null>(0);
  const total = c.modules.reduce((n, m) => n + m.lessons[lang].length, 0);
  return (
    <>
      <Wrap className="grid items-center gap-10 pt-10 sm:pt-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">
              {t.courses.level}: {c.level[lang]}
            </span>
            {c.status === "soon" && <span className="rounded-full bg-yellow px-2.5 py-1 text-yellow-fg">{t.courses.soon}</span>}
          </div>
          <h1 className="t-title mt-4">{c.title[lang]}</h1>
          <p className="mt-4 text-xl leading-relaxed text-muted">{c.promise[lang]}</p>
          <div id="waitlist" className="mt-7 rounded-2xl border border-line bg-bg-2 p-5">
            <p className="font-bold">{t.courses.waitlist}</p>
            <p className="mt-1 text-sm text-muted">{t.courses.waitlistText}</p>
            <a
              href={`mailto:${site.contact.email}?subject=${encodeURIComponent(`Waitlist: ${c.title.en}`)}`}
              className="btn btn-yellow mt-4"
            >
              {t.courses.waitlist}
            </a>
          </div>
        </div>
        <div className="relative">
          <CourseCover slug={c.slug} big />
          <Image src="/avatar/wave.png" alt="" width={361} height={760} className="absolute -bottom-6 right-4 h-auto w-[26%] drop-shadow-xl" />
        </div>
      </Wrap>
      <Wrap className="mt-16 grid gap-10 md:grid-cols-3">
        <section>
          <SectionTitle>{t.courses.learn}</SectionTitle>
          <ul className="mt-3 space-y-2">
            {c.learn[lang].map((x) => (
              <li key={x} className="flex gap-2">
                <Icon name="check" size={18} className="mt-1 shrink-0 text-accent" />
                {x}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <SectionTitle>{t.courses.forWho}</SectionTitle>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            {c.forWho[lang].map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
        <section>
          <SectionTitle>{t.courses.notFor}</SectionTitle>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted">
            {c.notFor[lang].map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
      </Wrap>
      <Wrap className="mt-14">
        <SectionTitle>
          {t.courses.curriculum} · {total} {t.courses.lessons}
        </SectionTitle>
        <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {c.modules.map((m, i) => (
            <li key={i}>
              <button
                type="button"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
                className="flex min-h-14 w-full items-center justify-between gap-3 bg-bg-2 px-5 text-left font-bold"
              >
                <span>
                  {i + 1}. {m.title[lang]}
                </span>
                <Icon name="chevron" size={18} className={`shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <ul className="space-y-2 px-5 py-4">
                  {m.lessons[lang].map((l) => (
                    <li key={l} className="flex items-center gap-2 text-muted">
                      <Icon name="video" size={16} className="text-accent" /> {l}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Wrap>
    </>
  );
}

/* ---------- About ---------- */
export function AboutView() {
  const { lang, t } = useLang();
  return (
    <>
      <Wrap className="grid items-center gap-10 pt-10 sm:pt-14 md:grid-cols-[1.3fr_1fr]">
        <div>
          <h1 className="t-title">{t.about.title}</h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed">
            {about.bio[lang].map((p, i) => (
              <p key={i} className={i ? "text-muted" : ""}>
                {p}
              </p>
            ))}
          </div>
          <p className="mt-4 text-muted">{about.languages[lang]}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/cv" className="btn btn-primary">
              <Icon name="file" size={18} /> {t.about.downloadCv}
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              {t.nav.contact}
            </Link>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[300px]">
          <div className="absolute inset-x-6 bottom-0 top-16 rounded-[40%] bg-gradient-to-b from-accent/30 to-[var(--accent-2)]/10 blur-2xl" aria-hidden="true" />
          <Image src="/avatar/wave.png" alt={t.about.waveAlt} width={361} height={760} priority className="relative h-auto w-full" />
        </div>
      </Wrap>
      <Wrap className="mt-16 grid gap-12 lg:grid-cols-2">
        <section>
          <SectionTitle>{t.about.skills}</SectionTitle>
          <div className="mt-4 space-y-5">
            {about.skills.map((g) => (
              <div key={g.group.en}>
                <h2 className="font-extrabold">{g.group[lang]}</h2>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="rounded-full border border-line bg-bg-2 px-3 py-1.5 text-sm font-semibold">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <section>
          <SectionTitle>{t.about.timeline}</SectionTitle>
          <ol className="relative mt-4 space-y-6 border-l-2 border-accent/40 pl-6">
            {about.timeline.map((e) => (
              <li key={e.title.en} className="relative">
                <span className="absolute -left-[33px] top-1.5 h-4 w-4 rounded-full border-4 border-bg bg-accent" aria-hidden="true" />
                <p className="text-sm font-black text-accent">{e.year}</p>
                <p className="font-extrabold">{e.title[lang]}</p>
                <p className="text-muted">{e.text[lang]}</p>
              </li>
            ))}
          </ol>
        </section>
      </Wrap>
      <Wrap className="mt-14">
        <SectionTitle>{t.about.social}</SectionTitle>
        <ul className="mt-4 flex flex-wrap gap-3">
          {socials().map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Icon name={s.icon} size={18} /> {s.name}
              </a>
            </li>
          ))}
        </ul>
      </Wrap>
    </>
  );
}

/* ---------- Contact ---------- */
export function ContactView() {
  const { t } = useLang();
  return (
    <>
      <PageHead title={t.contact.title} intro={t.contact.intro} />
      <Wrap className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <Icon name="whatsapp" size={20} /> {t.hire.whatsapp}
          </a>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href={`mailto:${site.contact.email}`} className="font-semibold hover:text-accent">
              {site.contact.email}
            </a>
            <CopyEmail />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            {[site.contact.whatsapp, site.contact.whatsapp2].map((n) => (
              <a key={n} href={whatsappLink(undefined, n)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold hover:text-accent">
                <Icon name="whatsapp" size={18} /> {prettyPhone(n)}
              </a>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {socials().map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="icon-btn boop">
                  <Icon name={s.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </Wrap>
    </>
  );
}

/* ---------- Uses and Now ---------- */
export function UsesView() {
  const { lang, t } = useLang();
  return (
    <>
      <PageHead title={t.uses.title} intro={t.uses.intro} />
      <Wrap className="mt-8 grid gap-10 md:grid-cols-3">
        {uses.map((g) => (
          <section key={g.group.en}>
            <SectionTitle>{g.group[lang]}</SectionTitle>
            <ul className="mt-4 space-y-3">
              {g.items.map((i) => (
                <li key={i.name}>
                  <p className="font-extrabold">{i.name}</p>
                  <p className="text-muted">{i.note[lang]}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Wrap>
    </>
  );
}

export function NowView() {
  const { lang, t } = useLang();
  return (
    <>
      <PageHead title={t.now.title} intro={t.now.intro} />
      <Wrap className="mt-8 max-w-3xl">
        <ul className="space-y-3">
          {now.items[lang].map((i) => (
            <li key={i} className="flex gap-3 rounded-2xl border border-line bg-bg-2 p-4 text-lg">
              <span className="text-accent" aria-hidden="true">
                ●
              </span>
              {i}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          {t.now.updated}: {fmtDate(now.updated, lang)}
        </p>
      </Wrap>
    </>
  );
}

/* ---------- Printable CV ---------- */
export function CvView() {
  const { lang, t } = useLang();
  return (
    <Wrap className="max-w-3xl pt-10 print:pt-0">
      <div className="no-print mb-8 flex justify-end">
        <button type="button" onClick={() => window.print()} className="btn btn-primary">
          <Icon name="file" size={18} /> {t.cv.print}
        </button>
      </div>
      <article className="rounded-2xl border border-line bg-bg-2 p-6 sm:p-10 print:border-0 print:p-0">
        <h1 className="text-4xl font-black tracking-tight">{site.fullName}</h1>
        <p className="mt-1 text-lg font-bold text-accent">{lang === "fr" ? "Développeur web · Sécurité · Montage vidéo" : "Web developer · Security · Video editing"}</p>
        <p className="mt-2 text-sm text-muted">
          {site.location} · {site.contact.email} · {prettyPhone(site.contact.whatsapp)} / {prettyPhone(site.contact.whatsapp2)} · {site.url.replace("https://", "")}
        </p>
        <section className="mt-8">
          <h2 className="border-b border-line pb-1 text-sm font-black uppercase tracking-widest">{lang === "fr" ? "Profil" : "Profile"}</h2>
          <p className="mt-3 leading-relaxed">{about.bio[lang][0]}</p>
        </section>
        <section className="mt-6">
          <h2 className="border-b border-line pb-1 text-sm font-black uppercase tracking-widest">{lang === "fr" ? "Expérience" : "Experience"}</h2>
          <ul className="mt-3 space-y-3">
            {about.timeline.map((e) => (
              <li key={e.title.en} className="grid grid-cols-[4.5rem_1fr] gap-3">
                <span className="font-bold text-accent">{e.year}</span>
                <span>
                  <b>{e.title[lang]}</b> — {e.text[lang]}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-6">
          <h2 className="border-b border-line pb-1 text-sm font-black uppercase tracking-widest">{lang === "fr" ? "Projets" : "Projects"}</h2>
          <ul className="mt-3 space-y-2">
            {projects.map((p) => (
              <li key={p.slug}>
                <b>{p.name}</b> ({p.year}) — {p.summary[lang]} <span className="text-muted">{p.stack.join(", ")}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-6">
          <h2 className="border-b border-line pb-1 text-sm font-black uppercase tracking-widest">{t.about.skills}</h2>
          <ul className="mt-3 space-y-1">
            {about.skills.map((g) => (
              <li key={g.group.en}>
                <b>{g.group[lang]}:</b> {g.items.join(", ")}
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-6">
          <h2 className="border-b border-line pb-1 text-sm font-black uppercase tracking-widest">{lang === "fr" ? "Langues" : "Languages"}</h2>
          <p className="mt-3">{about.languages[lang]}</p>
        </section>
      </article>
    </Wrap>
  );
}

/* ---------- Privacy, offline, 404 ---------- */
export function PrivacyView() {
  const { lang } = useLang();
  const fr = lang === "fr";
  return (
    <>
      <PageHead title={fr ? "Confidentialité" : "Privacy"} />
      <Wrap className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed">
        <p>{fr ? "Ce site n'utilise pas de cookies de suivi et n'affiche pas de publicité." : "This site uses no tracking cookies and shows no ads."}</p>
        <p>
          {fr
            ? "Les statistiques de visite (Vercel Analytics) sont anonymes : aucune donnée personnelle, aucun cookie."
            : "Visit statistics (Vercel Analytics) are anonymous: no personal data and no cookies."}
        </p>
        <p>
          {fr
            ? "Votre thème, votre langue et vos préférences de son sont enregistrés uniquement dans votre navigateur."
            : "Your theme, language and sound preferences are stored only in your browser."}
        </p>
        <p>
          {fr
            ? "Si vous m'écrivez ou vous abonnez, votre e-mail sert uniquement à vous répondre ou à vous envoyer les articles. Demandez sa suppression à tout moment : "
            : "If you write to me or subscribe, your email is used only to reply or send you articles. Ask me to delete it at any time: "}
          <a className="text-accent underline" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>
        </p>
      </Wrap>
    </>
  );
}

export function StatusView({ kind }: { kind: "404" | "offline" }) {
  const { t } = useLang();
  const c = kind === "404" ? t.notFound : t.offline;
  return (
    <Wrap className="grid min-h-[60vh] items-center gap-8 pt-10 md:grid-cols-[1fr_1.2fr]">
      <Image src="/avatar/404.png" alt={t.notFound.alt} width={494} height={700} priority className="mx-auto h-auto w-[60%] max-w-[260px] md:w-full" />
      <div>
        {kind === "404" && <p className="font-display text-7xl font-black text-accent">404</p>}
        <h1 className="mt-2 text-4xl font-black tracking-tight">{c.title}</h1>
        <p className="mt-3 text-lg text-muted">{c.text}</p>
        <Link href="/" className="btn btn-primary mt-6">
          {t.notFound.home}
        </Link>
      </div>
    </Wrap>
  );
}
