"use client";

import Link from "next/link";
import { site, categories, courses, whatsappLink } from "@/content/site";
import { useLang } from "./LangProvider";
import { Newsletter } from "./Newsletter";
import { Icon } from "./Icons";
import { Logo } from "./Logo";

export const socials = () =>
  [
    { name: "Instagram", icon: "instagram", href: site.contact.instagram },
    { name: "X", icon: "x", href: site.contact.x },
    { name: "GitHub", icon: "github", href: site.contact.github },
    site.contact.linkedin && { name: "LinkedIn", icon: "linkedin", href: site.contact.linkedin },
    { name: "WhatsApp", icon: "whatsapp", href: whatsappLink() },
  ].filter(Boolean) as { name: string; icon: string; href: string }[];

// Blue footer with a wavy cloud edge and the avatar peeking down over it.
export function Footer() {
  const { lang, t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="no-print relative mt-24 text-white">

      <svg className="relative block h-[70px] w-full sm:h-[90px]" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="ft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--footer-a)" />
            <stop offset="1" stopColor="var(--footer-b)" />
          </linearGradient>
        </defs>
        <path
          fill="url(#ft)"
          d="M0 60 C 40 20, 110 20, 150 50 C 180 10, 270 5, 300 45 C 340 15, 420 20, 450 55 C 500 10, 600 15, 630 50 C 670 20, 750 25, 780 55 C 830 5, 930 10, 960 45 C 1000 15, 1080 20, 1110 55 C 1160 10, 1250 15, 1280 50 C 1320 20, 1400 25, 1440 55 L 1440 90 L 0 90 Z"
        />
      </svg>

      <div className="relative z-0 -mt-px bg-gradient-to-r from-[var(--footer-a)] to-[var(--footer-b)]">
        <div className="mx-auto max-w-[1100px] px-5 pb-10 pt-6 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <Newsletter />
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <nav aria-label={t.footer.browse}>
                <p className="font-display font-extrabold">{t.footer.browse}</p>
                <ul className="mt-3 space-y-1.5 text-white/90">
                  {categories.slice(0, 6).map((c) => (
                    <li key={c.slug}>
                      <Link href={`/category/${c.slug}`} className="hover:underline">
                        {c.name[lang]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav aria-label={t.footer.courses}>
                <p className="font-display font-extrabold">{t.footer.courses}</p>
                <ul className="mt-3 space-y-1.5 text-white/90">
                  {courses.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/courses/${c.slug}`} className="hover:underline">
                        {c.title[lang]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav aria-label={t.footer.general}>
                <p className="font-display font-extrabold">{t.footer.general}</p>
                <ul className="mt-3 space-y-1.5 text-white/90">
                  {[
                    ["/about", t.nav.about],
                    ["/services", t.nav.services],
                    ["/contact", t.nav.contact],
                    ["/uses", t.nav.uses],
                    ["/now", t.nav.now],
                    ["/cv", t.nav.cv],
                    ["/privacy", t.footer.privacy],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <Link href={href} className="hover:underline">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-5 border-t border-white/25 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 [&_.logo_span]:text-white [&_.logo-squiggle]:text-yellow">
              <Logo small />
            </div>
            <ul className="flex flex-wrap gap-2" aria-label="Social">
              {socials().map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    title={s.name}
                    className="boop grid h-11 w-11 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
                  >
                    <Icon name={s.icon} size={19} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-sm text-white/80">
            © {year} {site.fullName}. {t.footer.rights} {t.footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
