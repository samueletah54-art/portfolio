"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/content/site";
import { useLang } from "./LangProvider";
import { useSound } from "./Sound";
import { usePosts } from "./PostIndex";
import { typing } from "./ThemeToggle";
import { Icon } from "./Icons";

type Item = { group: string; label: string; sub?: string; go: string };

// Search button + command palette. Opens with the button, Ctrl/Cmd+K, or "/".
export function Search() {
  const { lang, t } = useLang();
  const { play } = useSound();
  const posts = usePosts();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(
    () => [
      ...posts.map((p) => ({ group: t.search.posts, label: p[lang].title, sub: p[lang].subtitle, go: `/blog/${p.slug}` })),
      ...projects.map((p) => ({ group: t.search.projects, label: p.name, sub: p.kind[lang], go: `/projects/${p.slug}` })),
      ...[
        ["/", t.nav.home],
        ["/blog", t.nav.blog],
        ["/courses", t.nav.courses],
        ["/projects", t.nav.projects],
        ["/services", t.nav.services],
        ["/about", t.nav.about],
        ["/contact", t.nav.contact],
        ["/uses", t.nav.uses],
        ["/now", t.nav.now],
        ["/cv", t.nav.cv],
      ].map(([go, label]) => ({ group: t.search.pages, label, go })),
    ],
    [posts, lang, t],
  );

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? items.filter((i) => `${i.label} ${i.sub ?? ""}`.toLowerCase().includes(s)) : items;
  }, [items, q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !typing(e.target)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    play("open");
    setQ("");
    setSel(0);
    const id = setTimeout(() => input.current?.focus(), 10);
    return () => clearTimeout(id);
  }, [open, play]);

  function go(i?: Item) {
    if (!i) return;
    setOpen(false);
    router.push(i.go);
  }

  let last = "";
  return (
    <>
      <button type="button" data-no-sound onClick={() => setOpen(true)} aria-label={t.icons.search} title={`${t.icons.search} (/ or Ctrl K)`} className="icon-btn boop">
        <Icon name="search" size={18} />
      </button>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center bg-black/50 px-4 pt-[10vh] backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.icons.search}
            onClick={(e) => e.stopPropagation()}
            className="pop-in w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-bg-3 shadow-[var(--shadow)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Icon name="search" size={18} className="text-accent" />
              <input
                ref={input}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSel(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSel((s) => Math.min(s + 1, shown.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSel((s) => Math.max(s - 1, 0));
                  } else if (e.key === "Enter") go(shown[sel]);
                }}
                placeholder={t.search.placeholder}
                aria-label={t.search.placeholder}
                className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted"
              />
              <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">ESC</kbd>
            </div>
            <ul className="max-h-[55vh] overflow-y-auto p-2" role="listbox" aria-label={t.icons.search}>
              {shown.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">{t.search.none}</li>}
              {shown.map((i, n) => {
                const head = i.group !== last ? i.group : null;
                last = i.group;
                return (
                  <li key={`${i.go}-${i.label}`} role="option" aria-selected={n === sel}>
                    {head && <p className="px-3 pb-1 pt-3 text-[11px] font-bold uppercase tracking-widest text-muted">{head}</p>}
                    <button
                      type="button"
                      onMouseEnter={() => setSel(n)}
                      onClick={() => go(i)}
                      className={`flex w-full min-h-11 flex-col justify-center rounded-xl px-3 py-2 text-left ${n === sel ? "bg-accent-soft" : ""}`}
                    >
                      <span className="font-semibold">{i.label}</span>
                      {i.sub && <span className="line-clamp-1 text-sm text-muted">{i.sub}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="border-t border-line px-4 py-2.5 text-xs text-muted">{t.search.hint}</p>
          </div>
        </div>
      )}
    </>
  );
}
