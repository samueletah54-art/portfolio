"use client";

import Link from "next/link";
import { site, posts } from "@/content/site";
import { Header } from "@/components/Header";
import { ContactForm } from "@/components/ContactForm";
import { Projects } from "@/components/Projects";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LangProvider";
import { CursorGlow } from "@/components/CursorGlow";
import { CopyEmail } from "@/components/CopyEmail";
import { SideNav } from "@/components/SideNav";
import { Block } from "@/components/Block";
import { TypedTitle } from "@/components/TypedTitle";
import { Waves } from "@/components/Waves";
import { Magnetic } from "@/components/Magnetic";

const icon = {
  github: "M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z",
  mail: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2.2V18h18V7.2l-9 6.1-9-6.1ZM19.4 7H4.6L12 12l7.4-5Z",
  cv: "M6 2h9l5 5v15H6V2Zm8 1.5V8h4.5L14 3.5ZM9 12h8v1.5H9V12Zm0 3.5h8V17H9v-1.5Z",
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2Zm0 4.6a5.2 5.2 0 1 0 0 10.4 5.2 5.2 0 0 0 0-10.4Zm0 8.6a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 0 1 0 6.8Zm5.4-9.9a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z",
  x: "M17.8 2.5h3.3l-7.2 8.2 8.5 11.3h-6.6l-5.2-6.8-6 6.8H1.3l7.7-8.8L.9 2.5h6.8l4.7 6.2 5.4-6.2Zm-1.2 17.5h1.8L6.9 4.4H5l11.6 15.6Z",
  threads:
    "M17.2 11.1c-.1 0-.2-.1-.3-.1-.2-3-1.8-4.7-4.6-4.7h-.1c-1.6 0-3 .7-3.9 2l1.5 1c.7-1 1.7-1.2 2.4-1.2 1 0 1.7.3 2.2.9.3.4.6 1 .7 1.7-.8-.1-1.6-.2-2.5-.1-2.5.1-4.1 1.6-4 3.6.1 1 .6 1.9 1.4 2.4.7.5 1.6.7 2.6.6 1.3-.1 2.3-.6 3-1.4.5-.7.9-1.5 1-2.6.6.4 1.1.9 1.4 1.5.5 1.1.5 2.8-.9 4.2-1.2 1.2-2.7 1.8-5 1.8-2.5 0-4.4-.8-5.6-2.4-1.2-1.5-1.8-3.6-1.8-6.3s.6-4.8 1.8-6.3C7.6 4.8 9.5 4 12 4c2.5 0 4.4.8 5.7 2.4.6.8 1.1 1.7 1.4 2.8l1.8-.5c-.4-1.4-1-2.6-1.8-3.6C17.5 3 15.1 2 12 2 8.9 2 6.5 3 4.9 5 3.5 6.8 2.7 9.1 2.7 12s.8 5.2 2.2 7c1.6 2 4 3 7.1 3 2.8 0 4.7-.7 6.3-2.3 2.1-2.1 2-4.7 1.4-6.2-.5-1.1-1.4-1.9-2.5-2.4Zm-4.4 4.3c-1.1.1-2.2-.4-2.3-1.4 0-.8.6-1.6 2.3-1.7h.6c.6 0 1.2.1 1.7.2-.2 2.3-1.3 2.8-2.3 2.9Z",
};

export default function Home() {
  const { lang, t } = useLang();
  const { contact } = site;
  const fmt = (d: string) => new Date(d).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "short", year: "numeric" });

  const socials = [
    { label: "GitHub", href: contact.github, d: icon.github },
    { label: t.form.email, href: `mailto:${contact.email}`, d: icon.mail },
    contact.instagram && { label: "Instagram", href: contact.instagram, d: icon.instagram },
    contact.x && { label: "X", href: contact.x, d: icon.x },
    contact.threads && { label: "Threads", href: contact.threads, d: icon.threads },
    { label: t.nav.cv, href: site.cv, d: icon.cv },
  ].filter(Boolean) as { label: string; href: string; d: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title.en,
    url: site.url,
    email: `mailto:${contact.email}`,
    knowsLanguage: ["en", "fr", "de"],
    address: { "@type": "PostalAddress", addressLocality: "Yaoundé", addressCountry: "CM" },
    sameAs: [contact.github, contact.linkedin, contact.instagram, contact.x, contact.threads].filter(Boolean),
  };

  return (
    <>
      <Waves />
      <CursorGlow />
      <Header />
      <div className="relative z-10 mx-auto min-h-screen max-w-6xl px-5 sm:px-8 lg:flex lg:justify-between lg:gap-12 lg:px-12">
        {/* Left: who I am, sticky on large screens */}
        <header id="top" className="pt-28 lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
          <div>
            <p className="hero-in flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {t.availability}
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              <a href="#top">
                {site.name}
                <span className="text-gradient">.</span>
              </a>
            </h1>
            <TypedTitle key={lang} text={site.title[lang]} />
            <p className="mt-4 max-w-sm leading-relaxed text-muted">{site.pitch[lang]}</p>
            <p className="mt-2 max-w-sm text-sm text-muted/90">{site.alsoLine[lang]}</p>

            <div className="hero-in mt-7 flex flex-wrap gap-3" style={{ animationDelay: "0.3s" }}>
              <Magnetic>
                <a
                  href="#contact"
                  className="bg-gradient inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium shadow-[0_10px_30px_-10px_var(--accent)] transition-transform hover:-translate-y-0.5"
                >
                  {t.contactBtn} <span aria-hidden="true">→</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={site.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  {t.nav.cv} <span aria-hidden="true">↗</span>
                </a>
              </Magnetic>
            </div>

            <SideNav />
          </div>

          <div className="mt-10 lg:mt-8">
            <p className="flex max-w-sm items-start gap-3 border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{t.nowLabel}</span>
              <span>{t.now}</span>
            </p>
            <ul className="mt-6 flex items-center gap-5" aria-label="Links">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block text-muted transition-colors hover:text-accent"
                    title={s.label}
                  >
                    <span className="sr-only">{s.label}</span>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                      <path d={s.d} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* Right: what I've done, scrolls */}
        <main id="main" className="pt-16 lg:w-[54%] lg:py-24">
          <Block id="about" label={t.nav.about}>
            <div className="space-y-4 leading-relaxed text-muted">
              {t.about.map((p, i) => (
                <p key={i} className={i === 0 ? "text-lg text-fg" : undefined}>
                  {p}
                </p>
              ))}
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
              {t.proof.map((p) => (
                <li key={p.label} className="bg-bg p-4">
                  <span className="text-gradient block text-2xl font-semibold tracking-tight">{p.n}</span>
                  <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{p.label}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="experience" label={t.nav.experience}>
            <ol className="dim-list grid gap-2">
              {t.experience.map((e) => (
                <li key={e.role}>
                  <div className="grid grid-cols-[6.5rem_1fr] gap-4 rounded-xl p-4 transition-colors duration-300 hover:bg-bg-2/80 lg:-mx-4">
                    <span className="pt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted">{e.year}</span>
                    <span>
                      <span className="block font-medium">{e.role}</span>
                      <span className="text-sm text-muted">{e.org}</span>
                    </span>
                  </div>
                </li>
              ))}
            </ol>
            <a href={site.cv} target="_blank" rel="noopener noreferrer" className="group mt-6 inline-flex items-center gap-1 font-medium hover:text-accent">
              {t.form.cvFull}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </Block>

          <Block id="work" label={t.nav.work}>
            <Projects />
          </Block>

          <Block id="skills" label={t.nav.skills}>
            <div className="grid gap-6 sm:grid-cols-2">
              {t.skills.map((s) => (
                <div key={s.group}>
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{s.group}</h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <li key={it} className="rounded-full border border-line px-3 py-1 text-sm">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>

          <Block id="services" label={t.nav.services}>
            <ol className="dim-list grid gap-4">
              {t.services.map((s, i) => (
                <li key={s.title}>
                  <div className="rounded-xl border border-line bg-bg-2/50 p-5 transition-[transform,border-color] duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-1 hover:border-accent/60">
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              <span className="text-accent">+</span> {t.alsoTitle}
            </p>
            <ul className="dim-list mt-4 grid gap-4 sm:grid-cols-2">
              {t.also.map((s) => (
                <li key={s.title}>
                  <div className="h-full rounded-xl border border-dashed border-line p-5 transition-colors hover:border-accent/60">
                    <h3 className="font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="writing" label={t.nav.writing}>
            <p className="text-muted">{t.writingIntro}</p>
            <ul className="dim-list mt-6 grid gap-2">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/writing/${p.slug}`} className="group block rounded-xl p-4 transition-colors duration-300 hover:bg-bg-2/80 lg:-mx-4">
                    <time dateTime={p.date} className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                      {fmt(p.date)}
                    </time>
                    <h3 className="mt-1 text-lg font-medium leading-snug group-hover:text-accent">
                      {p.title[lang]} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.summary[lang]}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="contact" label={t.nav.contact}>
            <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.contactTitle[0]}
              <span className="text-gradient">{t.contactTitle[1]}</span>
            </h3>
            <p className="mt-3 leading-relaxed text-muted">{t.contactIntro}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a href={`mailto:${contact.email}`} className="font-mono text-sm hover:text-accent">
                {contact.email}
              </a>
              <CopyEmail />
            </div>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Block>

          <Reveal>
            <footer className="border-t border-line pb-16 pt-8 font-mono text-xs leading-relaxed text-muted">
              <p>
                © {new Date().getFullYear()} {site.name} · {site.location}. {t.builtWith}.
              </p>
            </footer>
          </Reveal>
        </main>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
