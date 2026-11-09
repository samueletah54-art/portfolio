"use client";

import { useState } from "react";
import Link from "next/link";
import { categories } from "@/content/site";
import { fmtDate } from "@/lib/format";
import type { PostMeta } from "@/lib/posts";
import { useLang } from "./LangProvider";
import { usePosts } from "./PostIndex";
import { Icon } from "./Icons";


export function CategoryPills({ active }: { active?: string }) {
  const { lang, t } = useLang();
  return (
    <nav aria-label={t.home.categories}>
      <ul className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/category/${c.slug}`}
              aria-current={active === c.slug ? "page" : undefined}
              className={`lift inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-bold ${
                active === c.slug ? "border-accent bg-accent text-accent-fg" : "border-line bg-bg-2 hover:border-accent hover:text-accent"
              }`}
            >
              {c.name[lang]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function PostCard({ p }: { p: PostMeta }) {
  const { lang, t } = useLang();
  const cat = categories.find((c) => c.slug === p.category);
  const L = p[lang];
  return (
    // Whole card is clickable (the title link stretches over it); it lifts on a spring on hover
    // and an accent underline sweeps under the title.
    <article className="lift group relative flex h-full flex-col rounded-3xl border border-line bg-bg-2/70 p-6 hover:border-accent/50 sm:p-7">
      <p className="t-meta text-muted">
        <Link href={`/category/${p.category}`} className="relative z-10 text-accent hover:underline">
          {cat?.name[lang]}
        </Link>
        <span aria-hidden="true"> · </span>
        {fmtDate(p.date, lang)} · {L.minutes} {t.post.minRead}
      </p>
      <h3 className="t-card mt-3">
        <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0 after:rounded-3xl after:content-['']">
          <span className="sweep">{L.title}</span>
        </Link>
      </h3>
      <p className="mt-3 line-clamp-3 text-muted">{L.excerpt}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-bold text-accent" aria-hidden="true">
        {t.home.readMore}
        <Icon name="arrow" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </article>
  );
}

// "Popular content" only appears when it adds something: at least 5 posts in total,
// and only posts that are NOT already visible in the main list next to it.
export const POPULAR_MIN_POSTS = 5;
export function popularFor(all: PostMeta[], shown: Set<string>) {
  if (all.length < POPULAR_MIN_POSTS) return [];
  return [...all.filter((p) => p.popular), ...all.filter((p) => !p.popular)].filter((p) => !shown.has(p.slug)).slice(0, 5);
}

function Popular({ list }: { list: PostMeta[] }) {
  const { lang, t } = useLang();
  return (
    <aside aria-labelledby="popular-title" className="lg:sticky lg:top-24 lg:self-start">
      <h2 id="popular-title" className="text-sm font-black uppercase tracking-widest text-accent">
        {t.home.popular}
      </h2>
      <ul className="mt-4 space-y-1">
        {list.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group flex min-h-11 items-start gap-2.5 rounded-xl px-2 py-2 font-semibold hover:bg-accent-soft">
              <Icon name="arrow" size={18} className="mt-1 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
              <span>{p[lang].title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// Post list (6 at a time, "Show more") with the Popular sidebar when it has something new to show.
// Without the sidebar, cards use the full width in two columns so there's no empty space.
export function PostFeed({ category }: { category?: string }) {
  const { t } = useLang();
  const all = usePosts();
  const list = all.filter((p) => !category || p.category === category);
  const [count, setCount] = useState(6);
  const shown = list.slice(0, count);
  const popular = popularFor(all, new Set(shown.map((p) => p.slug)));

  if (list.length === 0) return <p className="rounded-3xl border border-dashed border-line p-8 text-center text-muted">{t.home.noPosts}</p>;

  const cards = (
    <div>
      <ul className={`grid gap-6 ${popular.length ? "" : "md:grid-cols-2"}`}>
        {shown.map((p) => (
          <li key={p.slug}>
            <PostCard p={p} />
          </li>
        ))}
      </ul>
      {count < list.length && (
        <button type="button" onClick={() => setCount((c) => c + 6)} className="btn btn-ghost mt-10">
          {t.home.showMore}
        </button>
      )}
    </div>
  );

  return popular.length ? (
    <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_280px]">
      {cards}
      <Popular list={popular} />
    </div>
  ) : (
    cards
  );
}
