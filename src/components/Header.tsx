"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";
import { LangToggle } from "./LangToggle";
import { useLang } from "./LangProvider";
import { Search } from "./Search";
import { SoundToggle } from "./Sound";
import { sectionIds as ids } from "./SideNav";

export function Header() {
  const { t } = useLang();
  const links = ids.map((id, i) => ({ href: `#${id}`, label: t.nav[id], n: `0${i + 1}` }));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="whitespace-nowrap font-mono text-sm font-medium tracking-tight">
          <span className="text-accent">~/</span>
          <span className="hidden sm:inline">{site.name.toLowerCase().replace(" ", "-")}</span>
          <span className="sm:hidden">se</span>
        </a>

        <nav aria-label="Main" className="hidden">
          <ul className="flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg">
                  <span className="text-accent opacity-70 group-hover:opacity-100">{l.n}</span> {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={site.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center rounded-full border border-line px-4 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent sm:inline-flex lg:hidden"
          >
            {t.nav.cv} <span aria-hidden="true" className="ml-1">↗</span>
          </a>
          <Search />
          <SoundToggle labels={t.sound} />
          <LangToggle />
          <ThemeToggle />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden"
            aria-label={open ? t.menuClose : t.menuOpen}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span className={`absolute left-0 h-px w-4 bg-current transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-px w-4 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-px w-4 bg-current transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line lg:hidden">
          <ul className="mx-auto max-w-6xl px-5 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="flex items-baseline gap-3 border-b border-line py-4 text-2xl font-semibold tracking-tight">
                  <span className="font-mono text-xs text-accent">{l.n}</span>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={site.cv} target="_blank" rel="noopener noreferrer" className="flex items-baseline gap-3 py-4 text-2xl font-semibold tracking-tight">
                <span className="font-mono text-xs text-accent">↗</span>
                {t.nav.cv}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
