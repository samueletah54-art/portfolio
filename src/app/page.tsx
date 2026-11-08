import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Projects } from "@/components/Projects";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";

const em = (word: string) => <span className="text-accent">{word}</span>;

export default function Home() {
  const { contact } = site;
  const channels = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    contact.whatsapp && { label: "WhatsApp", value: contact.whatsapp, href: `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}` },
    contact.github && { label: "GitHub", value: contact.github.replace("https://", ""), href: contact.github },
    contact.linkedin && { label: "LinkedIn", value: contact.linkedin.replace("https://www.", ""), href: contact.linkedin },
  ].filter(Boolean) as { label: string; value: string; href: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    url: site.url,
    email: `mailto:${contact.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Yaoundé", addressCountry: "CM" },
    sameAs: [contact.github, contact.linkedin].filter(Boolean),
  };

  return (
    <>
      <Header />
      <main id="main">
        <Hero />

        <Section id="about" number="01" label="About" title={<>From International Relations to {em("building the web.")}</>}>
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="space-y-5 text-lg leading-relaxed text-muted md:col-span-7">
              {site.about.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-5">
              <dl className="border-t border-line">
                {site.facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4">
                    <dt className="pt-0.5 font-mono text-xs uppercase tracking-[0.14em] text-muted">{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Section>

        <Section id="work" number="02" label="Work" title={<>Selected projects, {em("live")} and in use.</>}>
          <Projects />
        </Section>

        <Section id="skills" number="03" label="Skills" title={<>The tools I {em("ship")} with.</>}>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {site.skills.map((s, i) => (
              <Reveal key={s.group} delay={i * 0.06} className="bg-bg p-6 sm:p-8">
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{s.group}</h3>
                <ul className="mt-5 space-y-2.5">
                  {s.items.map((it) => (
                    <li key={it} className="text-lg">
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="services" number="04" label="Services" title={<>What I can {em("build")} for you.</>}>
          <ol className="grid gap-6 md:grid-cols-3">
            {site.services.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-line bg-bg-2/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60">
                  <span className="font-mono text-sm text-accent">0{i + 1}</span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Section>

        <Section id="contact" number="05" label="Contact" title={<>Have a project? {em("Let's talk.")}</>}>
          <div className="grid gap-14 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <p className="text-lg leading-relaxed text-muted">
                Tell me what you need. I usually reply by email; for quick questions, use any channel below.
              </p>
              <ul className="mt-8 border-t border-line">
                {channels.map((c) => (
                  <li key={c.label} className="border-b border-line">
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
          <p>Built with Next.js, Tailwind CSS &amp; Framer Motion</p>
          <a href="#top" className="hover:text-accent">
            Back to top ↑
          </a>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
