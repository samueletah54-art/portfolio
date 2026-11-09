"use client";

import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Projects } from "@/components/Projects";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LangProvider";
import { CursorGlow } from "@/components/CursorGlow";
import { CopyEmail } from "@/components/CopyEmail";

// Titles are stored as [plain, highlighted, plain?] so translations can place the accent word anywhere.
const title = (parts: string[]) => (
  <>
    {parts[0]}
    <span className="text-accent">{parts[1]}</span>
    {parts[2] ?? ""}
  </>
);

export default function Home() {
  const { t } = useLang();
  const { contact } = site;
  const channels = [
    { label: t.form.email, value: contact.email, href: `mailto:${contact.email}` },
    contact.whatsapp && { label: "WhatsApp", value: contact.whatsapp, href: `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}` },
    contact.github && { label: "GitHub", value: contact.github.replace("https://", ""), href: contact.github },
    contact.linkedin && { label: "LinkedIn", value: contact.linkedin.replace("https://www.", ""), href: contact.linkedin },
  ].filter(Boolean) as { label: string; value: string; href: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title.en,
    url: site.url,
    email: `mailto:${contact.email}`,
    knowsLanguage: ["en", "fr", "de"],
    address: { "@type": "PostalAddress", addressLocality: "Yaoundé", addressCountry: "CM" },
    sameAs: [contact.github, contact.linkedin].filter(Boolean),
  };

  return (
    <>
      <CursorGlow />
      <Header />
      <main id="main" className="relative z-10">
        <Hero />

        <Section id="about" number="01" label={t.nav.about} title={title(t.aboutTitle)}>
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="space-y-5 text-lg leading-relaxed text-muted md:col-span-7">
              {t.about.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-5">
              <dl className="border-t border-line">
                {t.facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4">
                    <dt className="pt-0.5 font-mono text-xs uppercase tracking-[0.14em] text-muted">{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <h3 className="mt-10 font-mono text-xs uppercase tracking-[0.16em] text-accent">{t.experienceTitle}</h3>
              <ol className="dim-list mt-4 border-t border-line">
                {t.experience.map((e) => (
                  <li key={e.role} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4">
                    <span className="pt-0.5 font-mono text-xs text-muted">{e.year}</span>
                    <span>
                      <span className="block font-medium">{e.role}</span>
                      <span className="text-sm text-muted">{e.org}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-16">
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
              {t.proof.map((p) => (
                <li key={p.label} className="bg-bg p-6 sm:p-8">
                  <span className="block text-4xl font-semibold tracking-tight sm:text-5xl">
                    {p.n}
                  </span>
                  <span className="mt-2 block font-mono text-xs uppercase tracking-[0.14em] text-muted">{p.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        <Section id="work" number="02" label={t.nav.work} title={title(t.workTitle)}>
          <Projects />
        </Section>

        <Section id="skills" number="03" label={t.nav.skills} title={title(t.skillsTitle)}>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {t.skills.map((s, i) => (
              <Reveal key={s.group} delay={i * 0.06} className="bg-bg p-6 sm:p-7">
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{s.group}</h3>
                <ul className="mt-5 space-y-2.5">
                  {s.items.map((it) => (
                    <li key={it} className="text-lg leading-snug">
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="services" number="04" label={t.nav.services} title={title(t.servicesTitle)}>
          <ol className="dim-list grid gap-6 md:grid-cols-3">
            {t.services.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-line bg-bg-2/60 p-7 transition-[transform,border-color] duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-1.5 hover:rotate-[-0.6deg] hover:border-accent/60">
                  <span className="font-mono text-sm text-accent">0{i + 1}</span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-14">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              <span className="text-accent">+</span> {t.alsoTitle}
            </p>
          </Reveal>
          <ul className="dim-list mt-6 grid gap-6 md:grid-cols-2">
            {t.also.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-dashed border-line p-7 transition-colors duration-300 hover:border-accent/60">
                  <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Section>

        <Section id="contact" number="05" label={t.nav.contact} title={title(t.contactTitle)}>
          <div className="grid gap-14 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <p className="text-lg leading-relaxed text-muted">{t.contactIntro}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm">{site.contact.email}</span>
                <CopyEmail />
              </div>
              <ul className="mt-8 border-t border-line">
                {channels.map((c) => (
                  <li key={c.href} className="border-b border-line">
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
                    >
                      <span>
                        <span className="block font-mono text-xs uppercase tracking-[0.14em] text-muted">{c.label}</span>
                        <span className="break-all">{c.value}</span>
                      </span>
                      <span aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
                <li className="border-b border-line">
                  <a
                    href={site.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
                  >
                    <span>
                      <span className="block font-mono text-xs uppercase tracking-[0.14em] text-muted">{t.nav.cv}</span>
                      <span>Curriculum vitae</span>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-7">
              <ContactForm />
            </Reveal>
          </div>
        </Section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.location}
          </p>
          <p>{t.builtWith}</p>
          <a href="#top" className="hover:text-accent">
            {t.toTop} ↑
          </a>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
