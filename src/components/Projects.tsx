"use client";

import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import { useLang } from "./LangProvider";

export function Projects() {
  const { lang, t } = useLang();
  return (
    <ul className="dim-list grid gap-16 sm:gap-20">
      {site.projects.map((p, i) => (
        <Reveal as="li" key={p.name}>
          <article className="group grid items-center gap-8 md:grid-cols-12 md:gap-12">
            <div className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
              <div className="overflow-hidden rounded-2xl border border-line bg-bg-2 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)] transition-transform duration-500 group-hover:-translate-y-1.5">
                <Image
                  src={p.image}
                  alt={p.imageAlt[lang]}
                  width={1200}
                  height={750}
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="aspect-[16/10] h-auto w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
            </div>
            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> · {p.kind[lang]} · {p.year}
              </p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{p.name}</h3>
              <p className="mt-4 leading-relaxed text-muted">{p.description[lang]}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={t.stack}>
                {p.stack.map((s) => (
                  <li key={s} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted">
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-5 font-mono text-sm">
                {p.live ? (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline">
                    {t.liveSite} ↗<span className="sr-only"> ({t.opens.replace("{name}", p.name)})</span>
                  </a>
                ) : (
                  <span className="text-muted">{t.soon}</span>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-fg underline-offset-4 hover:text-accent hover:underline">
                    GitHub ↗<span className="sr-only"> ({t.source.replace("{name}", p.name)})</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}
