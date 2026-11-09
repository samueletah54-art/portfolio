"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, categories } from "@/content/site";
import { useLang } from "./LangProvider";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LangToggle } from "./LangToggle";
import { Search } from "./Search";
import { SoundToggle } from "./Sound";
import { Icon } from "./Icons";

export function Header() {
  const { lang, t } = useLang();
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cats, setCats] = useState(false);
  const catsRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation, Escape or an outside click.
  useEffect(() => {
    setOpen(false);
    setCats(false);
  }, [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setCats(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (catsRef.current && !catsRef.current.contains(e.target as Node)) setCats(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = [
    { href: "/courses", label: t.nav.courses },
    { href: "/projects", label: t.nav.projects },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];
  const active = (href: string) => path === href || path.startsWith(`${href}/`);

  return (
    <>
    <header
      className={`no-print sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open ? "border-b border-line bg-bg/90 shadow-[0_8px_30px_-20px_rgb(0_0_0/0.6)] backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1100px] items-center justify-between gap-3 px-4 transition-[height] duration-300 sm:px-6 lg:px-8 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <div className="flex items-center gap-3">
          <Logo small={scrolled} />
          {site.availableForWork && (
            <Link
              href="/contact"
              className="hidden items-center gap-2 whitespace-nowrap rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent min-[1360px]:inline-flex"
            >
              <span className="pulse-dot relative inline-block h-2 w-2 rounded-full bg-accent text-accent" aria-hidden="true" />
              {t.available}
            </Link>
          )}
        </div>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <li ref={catsRef} className="relative">
              <button
                type="button"
                aria-expanded={cats}
                aria-haspopup="true"
                onClick={() => setCats((c) => !c)}
                className="inline-flex min-h-11 items-center gap-1 rounded-full px-2.5 font-semibold xl:px-3.5 transition-colors hover:text-accent"
              >
                {t.nav.categories}
                <Icon name="chevron" size={16} className={`transition-transform ${cats ? "rotate-180" : ""}`} />
              </button>
              {cats && (
                <div className="pop-in absolute left-0 top-full mt-2 w-72 rounded-2xl border border-line bg-bg-3 p-2 shadow-[var(--shadow)]">
                  {categories.map((c) => (
                    <Link key={c.slug} href={`/category/${c.slug}`} className="block rounded-xl px-3 py-2.5 hover:bg-accent-soft">
                      <span className="block font-semibold">{c.name[lang]}</span>
                      <span className="block text-sm text-muted">{c.blurb[lang]}</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active(l.href) ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-full px-3.5 font-semibold transition-colors hover:text-accent ${active(l.href) ? "text-accent" : ""}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <Search />
          <div className="hidden items-center gap-1.5 sm:flex">
            <SoundToggle labels={{ on: t.icons.soundOn, off: t.icons.soundOff }} />
            <ThemeToggle />
            <a href="/rss.xml" className="icon-btn boop lg:max-xl:hidden" aria-label={t.icons.rss} title={t.icons.rss}>
              <Icon name="rss" size={18} />
            </a>
            <LangToggle />
          </div>
          <button
            type="button"
            className="icon-btn boop lg:hidden"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>
    </header>

      {/* Mobile: full-screen slide-in menu, icons in a row at the bottom */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`no-print fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-bg px-5 pb-6 pt-4 transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        // inert keeps the hidden menu out of the tab order
        {...(!open ? { inert: true } : {})}
      >
        <nav aria-label="Mobile" className="flex-1">
          <ul className="space-y-1">
            {[{ href: "/", label: t.nav.home }, { href: "/blog", label: t.nav.blog }, ...links, { href: "/services", label: t.nav.services }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="flex min-h-12 items-center border-b border-line font-display text-2xl font-extrabold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-bold uppercase tracking-widest text-muted">{t.nav.categories}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-semibold">
                  {c.name[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 flex items-center justify-between gap-2 border-t border-line pt-4">
          <SoundToggle labels={{ on: t.icons.soundOn, off: t.icons.soundOff }} />
          <ThemeToggle />
          <a href="/rss.xml" className="icon-btn" aria-label={t.icons.rss}>
            <Icon name="rss" size={18} />
          </a>
          <LangToggle />
        </div>
      </div>
    </>
  );
}
