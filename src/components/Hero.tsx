"use client";

import { site } from "@/content/site";
import { TypedTitle } from "./TypedTitle";
import { useLang } from "./LangProvider";
import { HeroArt } from "./HeroArt";
import { Magnetic } from "./Magnetic";

// The name and pitch render on the server and paint immediately (they drive LCP);
// only the small label and the buttons fade in, with CSS.
export function Hero() {
  const { lang, t } = useLang();
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
        <p className="hero-in flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {t.availability} · {site.location}
        </p>

        <h1 className="mt-6 text-[clamp(3.2rem,11vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
          {site.name}
          <span className="text-accent">.</span>
        </h1>

        <TypedTitle key={lang} text={site.title[lang]} />

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          {site.pitch[lang]}
        </p>
        <p className="mt-3 max-w-xl text-base text-muted/90">{site.alsoLine[lang]}</p>

        <div className="hero-in mt-10 flex flex-wrap gap-3" style={{ animationDelay: "0.4s" }}>
          <Magnetic>
          <a
            href="#work"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-accent-fg transition-transform hover:-translate-y-0.5"
          >
            {t.viewWork} <span aria-hidden="true">↓</span>
          </a>
          </Magnetic>
          <Magnetic>
          <a
            href="#contact"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-6 font-medium transition-colors hover:border-accent hover:text-accent"
          >
            {t.contactBtn} <span aria-hidden="true">→</span>
          </a>
          </Magnetic>
        </div>

        <p className="hero-in mt-10 flex max-w-xl items-start gap-3 border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted" style={{ animationDelay: "0.6s" }}>
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{t.nowLabel}</span>
          <span>{t.now}</span>
        </p>
        </div>

        <div className="hero-in mx-auto w-full max-w-[420px] lg:max-w-none" style={{ animationDelay: "0.2s" }}>
          <HeroArt />
        </div>
      </div>
    </section>
  );
}
