"use client";

import Image from "next/image";
import Link from "next/link";
import { whatsappLink } from "@/content/site";
import { useLang } from "./LangProvider";
import { Icon } from "./Icons";
import { Reveal } from "./Reveal";

// Round WhatsApp button, bottom right on every page (hidden while the phone menu is open).
export function WhatsAppFloat() {
  const { t } = useLang();
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.hire.whatsapp}
      title={t.hire.whatsapp}
      className="wa-float no-print fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_30px_-8px_rgb(37_211_102/0.7)] transition-[transform,opacity] duration-300 hover:scale-110"
    >
      <Icon name="whatsapp" size={28} />
    </a>
  );
}

// One-click "Hire me" call to action at the end of every page.
export function HireMe() {
  const { t } = useLang();
  return (
    <section className="no-print mx-auto mt-24 max-w-[1100px] px-5 sm:px-6 lg:px-8" aria-labelledby="hire-title">
      <Reveal className="relative">
        {/* The avatar hangs upside down from under the card; the card covers the top of the image. */}
        <div className="pointer-events-none absolute -bottom-[96px] right-8 z-0 w-[80px] sm:-bottom-[120px] sm:right-16 sm:w-[100px]" aria-hidden="true">
          <Image src="/avatar/footer-peek.png" alt="" width={469} height={640} className="hang h-auto w-full drop-shadow-[0_10px_14px_rgb(0_0_0/0.35)]" />
        </div>
        <div className="relative z-10 overflow-hidden rounded-3xl border border-accent/30 bg-bg-2 p-7 sm:p-10">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
          <h2 id="hire-title" className="relative text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t.hire.title}
          </h2>
          <p className="relative mt-3 max-w-xl text-lg text-muted">{t.hire.text}</p>
          <div className="relative mt-6 flex flex-wrap gap-3">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Icon name="whatsapp" size={20} /> {t.hire.whatsapp}
            </a>
            <Link href="/contact" className="btn btn-ghost">
              {t.hire.quote} <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
