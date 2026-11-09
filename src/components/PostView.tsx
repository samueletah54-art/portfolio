"use client";

import Link from "next/link";
import { posts, site } from "@/content/site";
import { useLang } from "./LangProvider";
import { LangToggle } from "./LangToggle";
import { ThemeToggle } from "./ThemeToggle";
import { CursorGlow } from "./CursorGlow";
import { Waves } from "./Waves";

// A single blog post, in the visitor's chosen language, set for comfortable reading.
export function PostView({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const post = posts.find((p) => p.slug === slug)!;
  const words = post.body[lang].join(" ").split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  const date = new Date(post.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <Waves />
      <CursorGlow />
      <div className="relative z-10 mx-auto max-w-2xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="flex items-center justify-between gap-4">
          <Link href="/#writing" className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted hover:text-accent">
            <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            {site.name}
          </Link>
          <div className="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>

        <article className="mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            <time dateTime={post.date}>{date}</time> · {mins} {t.minRead}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">{post.title[lang]}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{post.summary[lang]}</p>
          <div className="mt-10 space-y-6 text-[1.075rem] leading-[1.8]">
            {post.body[lang].map((para, i) => (
              <p key={i} className={i === 0 ? "text-lg" : undefined}>
                {para}
              </p>
            ))}
          </div>
        </article>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
          <Link href="/#writing" className="font-mono text-sm hover:text-accent">
            ← {t.allPosts}
          </Link>
          <Link href="/#contact" className="bg-gradient inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium">
            {t.contactBtn} →
          </Link>
        </div>
      </div>
    </>
  );
}
