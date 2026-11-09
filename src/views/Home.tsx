"use client";

import Image from "next/image";
import Link from "next/link";
import { about, now, projects, services } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { useLang } from "@/components/LangProvider";
import { AvatarArt, GreenBackdrop, Intro } from "@/components/Hero";
import { usePosts } from "@/components/PostIndex";
import { socials } from "@/components/Footer";
import { CategoryPills } from "@/components/Blog";
import { fmtMonth } from "@/lib/format";
import { Icon } from "@/components/Icons";

export function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="font-display text-2xl font-black sm:text-3xl">
      {children}
    </h2>
  );
}

export function ProjectCard({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const p = projects.find((x) => x.slug === slug)!;
  return (
    <article className="lift group h-full overflow-hidden rounded-2xl border border-line bg-bg-2">
      <Link href={`/projects/${p.slug}`} className="block" tabIndex={-1} aria-hidden="true">
        <Image src={p.image} alt="" width={1200} height={750} sizes="(min-width: 1024px) 360px, 100vw" className="aspect-[16/10] h-auto w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
      </Link>
      <div className="p-5">
        <p className="text-sm font-semibold text-muted">
          {p.kind[lang]} · {p.year}
        </p>
        <h3 className="mt-1 text-xl font-extrabold">
          <Link href={`/projects/${p.slug}`} className="hover:text-accent">
            {p.name}
          </Link>
        </h3>
        <p className="mt-2 text-muted">{p.summary[lang]}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={t.projects.stack}>
          {p.stack.map((s) => (
            <li key={s} className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
          {p.live ? (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-accent hover:underline">
              {t.projects.live} <Icon name="arrowUpRight" size={16} />
            </a>
          ) : (
            <span className="inline-flex min-h-11 items-center text-muted">{t.projects.soon}</span>
          )}
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 hover:text-accent">
              {t.projects.github} <Icon name="arrowUpRight" size={16} />
            </a>
          )}
          <Link href={`/projects/${p.slug}`} className="inline-flex min-h-11 items-center gap-1 hover:text-accent">
            {t.projects.caseStudy} <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ServiceIcon({ name }: { name: string }) {
  return (
    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent">
      <Icon name={name} size={24} />
    </span>
  );
}

export function Testimonials() {
  const { lang, t } = useLang();
  if (testimonials.length === 0) return null;
  return (
    <section className="mx-auto mt-24 max-w-[1100px] px-5 sm:px-6 lg:px-8" aria-labelledby="testi-title">
      <SectionTitle id="testi-title">{t.home.testimonials}</SectionTitle>
      <ul className="mt-6 grid gap-5 md:grid-cols-2">
        {testimonials.map((q) => (
          <li key={q.name} className="rounded-2xl border border-line bg-bg-2 p-6">
            <blockquote className="text-lg leading-relaxed">“{q.quote[lang]}”</blockquote>
            <p className="mt-4 font-bold">{q.name}</p>
            <p className="text-sm text-muted">{q.role[lang]}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// A sticky note with what I'm working on this month. Real and dated, so it has to be kept current.
function NowNote() {
  const { lang, t } = useLang();
  return (
    <aside className="mt-10 max-w-sm -rotate-1 rounded-sm border border-line bg-bg-2 p-5 shadow-[var(--shadow)] lg:mt-12">
      <p className="font-hand text-2xl text-accent">{t.home.nowNote}</p>
      <ul className="mt-2 space-y-1.5 text-[15px] leading-snug text-muted">
        {now.items[lang].slice(0, 3).map((x) => (
          <li key={x} className="flex gap-2">
            <span aria-hidden="true" className="text-accent">–</span>
            {x}
          </li>
        ))}
      </ul>
      <p className="mt-3 flex items-baseline justify-between gap-3 text-xs text-muted">
        <time dateTime={now.updated}>{fmtMonth(now.updated, lang)}</time>
        <Link href="/now" className="font-hand text-lg text-fg hover:text-accent">
          {t.home.nowMore} →
        </Link>
      </p>
    </aside>
  );
}

// Section heading in plain words, written the way I'd say it.
function MobileHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-6 font-display text-2xl font-black sm:text-3xl">{children}</h2>;
}

const listCls = "space-y-4";
const rowCls = "";
const cardCls = "lift relative block rounded-2xl border border-transparent p-4 -mx-4 hover:border-line hover:bg-bg-2/70 sm:p-5 sm:-mx-5";

export function HomeView() {
  const { lang, t } = useLang();
  const posts = usePosts().slice(0, 4);
  return (
    <div className="relative isolate">
      <GreenBackdrop />
      <div className="mx-auto max-w-[1100px] px-5 sm:px-6 lg:flex lg:gap-14 lg:px-8">
        {/* Left: stays in place while the right side scrolls */}
        <div className="pt-10 lg:sticky lg:top-20 lg:flex lg:h-[calc(100vh-5rem)] lg:w-[46%] lg:shrink-0 lg:flex-col lg:justify-between lg:py-14">
          <div>
            <Intro />
            <NowNote />
          </div>
          <ul className="mt-8 flex gap-2" aria-label={t.about.social}>
            {socials().map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="icon-btn boop">
                  <Icon name={s.icon} size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: the scrolling content */}
        <div className="pb-10 pt-6 lg:w-[54%] lg:py-14">
          <section id="about" aria-label={t.home.sAbout} className="scroll-mt-24">
            <AvatarArt className="mx-auto w-full max-w-[420px] lg:max-w-[460px]" />
            <MobileHeading>{t.home.hAbout}</MobileHeading>
            <div className="space-y-4 text-muted">
              {about.bio[lang].map((para) => (
                <p key={para.slice(0, 20)}>{para}</p>
              ))}
              <p className="font-hand -rotate-2 pt-1 text-3xl text-accent">— Samuel</p>
            </div>
          </section>

          <section id="experience" aria-label={t.home.sExperience} className="mt-24 scroll-mt-24">
            <MobileHeading>{t.home.hExperience}</MobileHeading>
            <ol className={listCls}>
              {about.timeline.map((x) => (
                <li key={x.year + x.title.en} className={rowCls}>
                  <div className={`${cardCls} grid gap-1 sm:grid-cols-[90px_1fr] sm:gap-6`}>
                    <p className="t-meta pt-1 uppercase text-muted">{x.year}</p>
                    <div>
                      <h3 className="font-display text-lg font-extrabold">{x.title[lang]}</h3>
                      <p className="mt-1 text-muted">{x.text[lang]}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/about" className="group mt-8 inline-flex min-h-11 items-center gap-1.5 font-bold">
              <span className="sweep">{t.home.fullStory}</span>
              <Icon name="arrow" size={18} className="text-accent transition-transform group-hover:translate-x-1" />
            </Link>
          </section>

          <section id="projects" aria-label={t.home.sProjects} className="mt-24 scroll-mt-24">
            <MobileHeading>{t.home.hProjects}</MobileHeading>
            <ul className={listCls}>
              {projects.map((p, i) => (
                <li key={p.slug} className={rowCls}>
                  {/* The first project gets room to breathe; the rest stay compact */}
                  <div className={`${cardCls} group grid gap-4 ${i === 0 ? "" : "sm:grid-cols-[150px_1fr] sm:gap-6"}`}>
                    <Image src={p.image} alt="" width={1200} height={750} sizes={i === 0 ? "(min-width: 1024px) 560px, 100vw" : "150px"} className={`aspect-[16/10] h-auto w-full rounded-lg border border-line object-cover object-top ${i === 0 ? "" : "order-2 max-w-[220px] sm:order-1"}`} />
                    <div className={i === 0 ? "" : "order-1 sm:order-2"}>
                      <p className="t-meta text-muted">
                        {p.kind[lang]} · {p.year}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-extrabold leading-snug">
                        <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 after:rounded-2xl after:content-['']">
                          <span className="sweep">{p.name}</span>
                        </Link>
                      </h3>
                      <p className="mt-1.5 text-muted">{p.summary[lang]}</p>
                      <p className="mt-2 font-mono text-[13px] text-muted">
                        <span className="sr-only">{t.projects.stack}: </span>
                        {p.stack.join(" · ")}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/projects" className="group mt-8 inline-flex min-h-11 items-center gap-1.5 font-bold">
              <span className="sweep">{t.home.allProjects}</span>
              <Icon name="arrow" size={18} className="text-accent transition-transform group-hover:translate-x-1" />
            </Link>

            <h3 className="mt-16 font-display text-xl font-black">{t.home.hServices}</h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {services.map((x) => (
                <li key={x.slug}>
                  <Link href={`/services#${x.slug}`} className="lift flex h-full gap-4 rounded-2xl border border-line bg-bg-2/70 p-4 hover:border-accent/50">
                    <ServiceIcon name={x.icon} />
                    <span>
                      <span className="block font-display font-extrabold">{x.title[lang]}</span>
                      <span className="mt-1 block text-sm text-muted">{x.text[lang]}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="writing" aria-label={t.home.sWriting} className="mt-24 scroll-mt-24">
            <MobileHeading>{t.home.hWriting}</MobileHeading>
            {/* Simple list, like a notebook index: date, title, one line */}
            <ul className={listCls}>
              {posts.map((p) => (
                <li key={p.slug} className={rowCls}>
                  <div className={`${cardCls} group grid gap-1 sm:grid-cols-[90px_1fr] sm:gap-6`}>
                    <p className="t-meta pt-1.5 text-muted">
                      <time dateTime={p.date}>{fmtMonth(p.date, lang)}</time>
                    </p>
                    <div>
                      <h3 className="font-display text-lg font-extrabold leading-snug">
                        <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0 after:rounded-2xl after:content-['']">
                          <span className="sweep">{p[lang].title}</span>
                        </Link>
                      </h3>
                      <p className="mt-1 line-clamp-2 text-muted">{p[lang].excerpt}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/blog" className="group mt-8 inline-flex min-h-11 items-center gap-1.5 font-bold">
              <span className="sweep">{t.hero.ctaPrimary}</span>
              <Icon name="arrow" size={18} className="text-accent transition-transform group-hover:translate-x-1" />
            </Link>
            <h3 className="mt-14 font-display text-xl font-black">{t.home.categories}</h3>
            <div className="mt-4">
              <CategoryPills />
            </div>
          </section>
        </div>
      </div>
      <Testimonials />
    </div>
  );
}
