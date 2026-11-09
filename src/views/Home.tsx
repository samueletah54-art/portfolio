"use client";

import Image from "next/image";
import Link from "next/link";
import { projects, services } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { useLang } from "@/components/LangProvider";
import { Hero } from "@/components/Hero";
import { CategoryPills, PostFeed } from "@/components/Blog";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icons";

export function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-sm font-black uppercase tracking-[0.18em] text-accent">
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

export function HomeView() {
  const { lang, t } = useLang();
  return (
    <>
      <Hero />

      <section className="mx-auto mt-10 max-w-[1100px] px-5 sm:px-6 lg:px-8" aria-labelledby="cat-title">
        <Reveal>
          <SectionTitle id="cat-title">{t.home.categories}</SectionTitle>
          <div className="mt-4">
            <CategoryPills />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-16 max-w-[1100px] px-5 sm:px-6 lg:px-8" aria-labelledby="latest-title">
        <SectionTitle id="latest-title">{t.home.latest}</SectionTitle>
        <div className="mt-8">
          <PostFeed />
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[1100px] px-5 sm:px-6 lg:px-8" aria-labelledby="work-title">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <SectionTitle id="work-title">{t.home.featured}</SectionTitle>
          <Link href="/projects" className="inline-flex min-h-11 items-center gap-1 font-bold text-accent">
            {t.home.allProjects} <Icon name="arrow" size={18} />
          </Link>
        </div>
        <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p.slug}>
              <Reveal className="h-full">
                <ProjectCard slug={p.slug} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-24 max-w-[1100px] px-5 sm:px-6 lg:px-8" aria-labelledby="svc-title">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <SectionTitle id="svc-title">{t.home.servicesTitle}</SectionTitle>
          <Link href="/services" className="inline-flex min-h-11 items-center gap-1 font-bold text-accent">
            {t.home.allServices} <Icon name="arrow" size={18} />
          </Link>
        </div>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services#${s.slug}`} className="lift block h-full rounded-2xl border border-line bg-bg-2 p-5 hover:border-accent">
                <ServiceIcon name={s.icon} />
                <h3 className="mt-4 text-lg font-extrabold">{s.title[lang]}</h3>
                <p className="mt-1.5 text-sm text-muted">{s.text[lang]}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Testimonials />
    </>
  );
}
