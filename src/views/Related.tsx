"use client";

import type { PostMeta } from "@/lib/posts";
import { useLang } from "@/components/LangProvider";
import { PostCard } from "@/components/Blog";

export function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  const { t } = useLang();
  if (posts.length === 0) return null;
  return (
    <section className="mt-14" aria-labelledby="related-title">
      <h2 id="related-title" className="text-sm font-black uppercase tracking-[0.18em] text-accent">
        {t.post.related}
      </h2>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2">
        {posts.map((p) => (
          <li key={p.slug}>
            <PostCard p={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
