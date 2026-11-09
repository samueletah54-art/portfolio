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
    <article className="group">
      <p className="text-sm font-semibold text-muted">
        <Link href={`/category/${p.category}`} className="text-accent hover:underline">
          {cat?.name[lang]}
        </Link>{" "}
        · {fmtDate(p.date, lang)} · {L.minutes} {t.post.minRead}
      </p>
      <h3 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight">
        <Link href={`/blog/${p.slug}`} className="transition-colors group-hover:text-accent">
          {L.title}
        </Link>
      </h3>
      {L.subtitle && <p className="mt-1.5 font-semibold text-fg/80">{L.subtitle}</p>}
      <p className="mt-2 line-clamp-3 leading-relaxed text-muted">{L.excerpt}</p>
      <Link href={`/blog/${p.slug}`} className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-bold text-accent">
        {t.home.readMore}
        <Icon name="arrow" size={18} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
}

// List of posts, 6 at a time, with a "Show more" button.
export function PostList({ category, exclude }: { category?: string; exclude?: string }) {
  const { t } = useLang();
  const all = usePosts().filter((p) => (!category || p.category === category) && p.slug !== exclude);
  const [count, setCount] = useState(6);
  if (all.length === 0) return <p className="rounded-2xl border border-dashed border-line p-8 text-center text-muted">{t.home.noPosts}</p>;
  return (
    <div>
      <ul className="space-y-12">
        {all.slice(0, count).map((p) => (
          <li key={p.slug}>
            <PostCard p={p} />
          </li>
        ))}
      </ul>
      {count < all.length && (
        <button type="button" onClick={() => setCount((c) => c + 6)} className="btn btn-ghost mt-10">
          {t.home.showMore}
        </button>
      )}
    </div>
  );
}

// "Popular content": arrow-icon links. Sidebar on desktop, below on phones.
export function Popular() {
  const { lang, t } = useLang();
  const posts = usePosts();
  const list = [...posts.filter((p) => p.popular), ...posts.filter((p) => !p.popular)].slice(0, 6);
  return (
    <aside aria-labelledby="popular-title">
      <h2 id="popular-title" className="text-sm font-black uppercase tracking-widest text-accent">
        {t.home.popular}
      </h2>
      <ul className="mt-4 space-y-1">
        {list.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group flex min-h-11 items-start gap-2.5 rounded-xl px-2 py-2 font-semibold hover:bg-accent-soft">
              <Icon name="arrow" size={18} className="mt-0.5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
              <span>{p[lang].title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
