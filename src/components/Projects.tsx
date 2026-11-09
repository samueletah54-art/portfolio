"use client";

import Image from "next/image";
import { site } from "@/content/site";
import { useLang } from "./LangProvider";

// Compact project rows: small screenshot on the left, details on the right. The whole card
// lights up on hover while the others dim.
export function Projects() {
  const { lang, t } = useLang();
  return (
    <ul className="dim-list grid gap-4">
      {site.projects.map((p) => (
        <li key={p.name}>
          <article className="group relative grid gap-4 rounded-xl p-4 transition-colors duration-300 hover:bg-bg-2/80 sm:grid-cols-8 sm:gap-6 lg:-mx-4">
            <div className="self-start overflow-hidden rounded-md border border-line sm:order-1 sm:col-span-3">
              <Image
                src={p.image}
                alt={p.imageAlt[lang]}
                width={600}
                height={375}
                sizes="(min-width: 640px) 220px, 100vw"
                className="aspect-[16/10] h-auto w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="sm:order-2 sm:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {p.kind[lang]} · {p.year}
              </p>
              <h3 className="mt-1 text-lg font-medium leading-snug">
                {p.live ? (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-baseline gap-1 hover:text-accent">
                    <span className="absolute inset-0 rounded-xl" aria-hidden="true" />
                    {p.name}
                    <span aria-hidden="true" className="inline-block transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                      ↗
                    </span>
                    <span className="sr-only"> ({t.opens.replace("{name}", p.name)})</span>
                  </a>
                ) : (
                  p.name
                )}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.description[lang]}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={t.stack}>
                {p.stack.map((s) => (
                  <li key={s} className="rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[11px] text-accent">
                    {s}
                  </li>
                ))}
              </ul>
              <div className="relative z-10 mt-3 flex gap-4 font-mono text-xs">
                {!p.live && <span className="text-muted">{t.soon}</span>}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
                    GitHub ↗<span className="sr-only"> ({t.source.replace("{name}", p.name)})</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
