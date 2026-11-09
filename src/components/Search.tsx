"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { site, posts } from "@/content/site";
import { useLang } from "./LangProvider";
import { useSound } from "./Sound";
import { sectionIds } from "./SideNav";

type Item = { group: string; label: string; hint: string; go: string; external?: boolean };

// Search button + Ctrl/Cmd+K palette: jump to any section, project, post or contact link.
export function Search() {
  const { lang, t } = useLang();
  const { play } = useSound();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(() => {
    const c = site.contact;
    return [
      ...sectionIds.map((id) => ({ group: t.search.sections, label: t.nav[id], hint: `#${id}`, go: `/#${id}` })),
      ...site.projects.map((p) => ({ group: t.search.projects, label: p.name, hint: p.kind[lang], go: p.live ?? "/#work", external: !!p.live })),
      ...posts.map((p) => ({ group: t.search.writing, label: p.title[lang], hint: p.date, go: `/writing/${p.slug}` })),
      ...[
        c.whatsapp && { group: t.search.links, label: "WhatsApp", hint: c.whatsapp, go: `https://wa.me/${c.whatsapp.replace(/\D/g, "")}`, external: true },
        { group: t.search.links, label: t.form.email, hint: c.email, go: `mailto:${c.email}`, external: true },
        { group: t.search.links, label: t.nav.cv, hint: "PDF / web", go: site.cv, external: true },
        { group: t.search.links, label: "GitHub", hint: "github.com", go: c.github, external: true },
        c.instagram && { group: t.search.links, label: "Instagram", hint: "@samuelisco22", go: c.instagram, external: true },
        c.x && { group: t.search.links, label: "X", hint: "@samuel_izko", go: c.x, external: true },
      ].filter(Boolean) as Item[],
    ];
  }, [lang, t]);

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? items.filter((i) => `${i.label} ${i.hint} ${i.group}`.toLowerCase().includes(s)) : items;
  }, [items, q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      play("open");
      setQ("");
      setSel(0);
      setTimeout(() => input.current?.focus(), 10);
    }
  }, [open, play]);

  function go(i: Item | undefined) {
    if (!i) return;
    setOpen(false);
    if (i.external) window.open(i.go, i.go.startsWith("mailto:") ? "_self" : "_blank", "noopener");
    else router.push(i.go);
  }

  let lastGroup = "";
  return (
    <>
      <button
        type="button"
        data-no-sound
        onClick={() => setOpen(true)}
        aria-label={t.search.button}
        title={`${t.search.button} (Ctrl K)`}
        className="boop grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center bg-bg/70 px-4 pt-[12vh] backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.search.button}
            onClick={(e) => e.stopPropagation()}
            className="search-pop w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-bg-2 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.5)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-accent" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
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
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
              {shown.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">{t.search.none}</li>}
              {shown.map((i, n) => {
                const head = i.group !== lastGroup ? i.group : null;
                lastGroup = i.group;
                return (
                  <li key={`${i.group}-${i.label}`} role="option" aria-selected={n === sel}>
                    {head && <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{head}</p>}
                    <button
                      type="button"
                      onMouseEnter={() => setSel(n)}
                      onClick={() => go(i)}
                      className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${n === sel ? "bg-accent/15 text-fg" : "text-muted"}`}
                    >
                      <span className="truncate">{i.label}</span>
                      <span className="shrink-0 font-mono text-[11px] text-muted">{i.external ? "↗" : i.hint.startsWith("#") ? i.hint : "→"}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
