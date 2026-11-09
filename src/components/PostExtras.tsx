"use client";

import { useEffect, useRef, useState } from "react";
import { site, whatsappLink } from "@/content/site";
import type { Heading } from "@/lib/posts";
import { useLang } from "./LangProvider";
import { useSound } from "./Sound";
import { Icon } from "./Icons";

// Thin green bar at the very top that fills as you read.
export function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? el.scrollTop / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div ref={bar} aria-hidden="true" className="progress-bar fixed inset-x-0 top-0 z-[60] h-1 bg-gradient-to-r from-accent to-[var(--accent-2)]" style={{ transform: "scaleX(0)" }} />;
}

// Table of contents: sticky on desktop, collapsible on phones. Highlights the section you're in.
export function Toc({ headings, mobile = false }: { headings: Heading[]; mobile?: boolean }) {
  const { t } = useLang();
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((e): e is HTMLElement => !!e && e.offsetParent !== null);
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, [headings]);
  if (headings.length === 0) return null;
  const list = (
    <ul className="mt-3 space-y-1 text-sm">
      {headings.map((h) => (
        <li key={h.id} className={h.depth === 3 ? "pl-4" : ""}>
          <a
            href={`#${h.id}`}
            className={`block rounded-lg px-2 py-1.5 transition-colors ${active === h.id ? "bg-accent-soft font-bold text-accent" : "text-muted hover:text-fg"}`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );
  if (mobile)
    return (
      <details className="rounded-2xl border border-line bg-bg-2 p-4 lg:hidden">
        <summary className="min-h-6 cursor-pointer font-bold">{t.post.contents}</summary>
        {list}
      </details>
    );
  return (
    <nav aria-label={t.post.contents} className="sticky top-24 hidden lg:block">
      <p className="text-sm font-black uppercase tracking-widest text-accent">{t.post.contents}</p>
      {list}
    </nav>
  );
}

// Copy button on every code block.
export function Pre(props: React.HTMLAttributes<HTMLPreElement>) {
  const ref = useRef<HTMLPreElement>(null);
  const [done, setDone] = useState(false);
  const { t } = useLang();
  return (
    <div className="group relative">
      <pre ref={ref} {...props} />
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(ref.current?.innerText ?? "");
            setDone(true);
            setTimeout(() => setDone(false), 1500);
          } catch {}
        }}
        className="absolute right-2.5 top-2.5 inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-2.5 text-xs font-bold text-white opacity-90 transition hover:bg-white/20 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
      >
        <Icon name={done ? "check" : "copy"} size={14} />
        {done ? t.post.copied : t.post.copyCode}
      </button>
    </div>
  );
}

// Share on X, WhatsApp, LinkedIn, or copy the link.
export function Share({ title, slug }: { title: string; slug: string }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const url = `${site.url}/blog/${slug}`;
  const e = encodeURIComponent;
  const links = [
    { name: "X", icon: "x", href: `https://x.com/intent/post?text=${e(title)}&url=${e(url)}` },
    { name: "WhatsApp", icon: "whatsapp", href: `https://wa.me/?text=${e(`${title} ${url}`)}` },
    { name: "LinkedIn", icon: "linkedin", href: `https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}` },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-bold">{t.post.share}</span>
      {links.map((l) => (
        <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`${t.post.share}: ${l.name}`} className="icon-btn boop">
          <Icon name={l.icon} size={18} />
        </a>
      ))}
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch {}
        }}
        className="btn btn-ghost min-h-11 px-4 text-sm"
      >
        <Icon name={copied ? "check" : "link"} size={16} /> {copied ? t.post.copied : t.post.copyLink}
      </button>
    </div>
  );
}

// Heart button with a playful pop. Remembers your like on this device.
// (A public like/view count needs a small database; see README "Phase 2".)
export function Like({ slug }: { slug: string }) {
  const { t } = useLang();
  const { play } = useSound();
  const [liked, setLiked] = useState(false);
  const [pop, setPop] = useState(0);
  useEffect(() => {
    try {
      setLiked(localStorage.getItem(`like:${slug}`) === "1");
    } catch {}
  }, [slug]);
  return (
    <button
      type="button"
      data-no-sound
      aria-pressed={liked}
      onClick={() => {
        const next = !liked;
        setLiked(next);
        setPop((p) => p + 1);
        play(next ? "on" : "off");
        try {
          localStorage.setItem(`like:${slug}`, next ? "1" : "0");
        } catch {}
      }}
      className={`btn press min-h-12 border-2 px-5 ${liked ? "border-[#f43f5e] bg-[#f43f5e]/10 text-[#f43f5e]" : "border-line"}`}
    >
      <span key={pop} className={pop ? "heart-pop inline-block" : "inline-block"}>
        <Icon name="heart" size={22} className={liked ? "text-[#f43f5e]" : "text-muted"} />
      </span>
      {t.post.like}
    </button>
  );
}

export { whatsappLink };
