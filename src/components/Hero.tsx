"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { useLang } from "./LangProvider";
import { useSound } from "./Sound";
import { Sparkles } from "./Sparkles";

const GREENS = ["#14532d", "#16a34a", "#4ade80", "#2dd4bf", "#a7f3d0"];

// Rounded bars fanning out from behind the avatar. They spring up one after another on load and
// wobble when you point at them. Phones get fewer bars.
function Stripes({ count, wobble }: { count: number; wobble: boolean }) {
  const reduce = useReducedMotion();
  const bars = Array.from({ length: count }, (_, i) => {
    const angle = -78 + (156 / (count - 1)) * i;
    const len = 250 + ((i * 47) % 90) + (Math.abs(angle) < 30 ? 30 : 0);
    return { angle, len, color: GREENS[i % GREENS.length] };
  });
  return (
    <LazyMotion features={domAnimation} strict>
      <g transform="translate(300 430)">
        {bars.map((b, i) => (
          <g key={i} transform={`rotate(${b.angle})`}>
            <m.rect
              x={-17}
              y={-b.len}
              width={34}
              height={b.len}
              rx={17}
              fill={b.color}
              style={{ transformBox: "fill-box", originX: 0.5, originY: 1 }}
              initial={reduce ? false : { scaleY: 0 }}
              animate={{ scaleY: 1, rotate: wobble && !reduce ? (i % 2 ? 4 : -4) : 0 }}
              transition={{
                scaleY: { type: "spring", stiffness: 140, damping: 13, delay: 0.15 + i * 0.06 },
                rotate: { type: "spring", stiffness: 260, damping: 7 },
              }}
            />
          </g>
        ))}
      </g>
    </LazyMotion>
  );
}

// The avatar sitting on its hill with the green bars fanning out behind it.
// Click it 5 times quickly for a surprise.
export function AvatarArt({ className = "" }: { className?: string }) {
  const { t } = useLang();
  const { play } = useSound();
  const [wobble, setWobble] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [egg, setEgg] = useState(false);
  const clicks = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const set = () => setMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  function poke() {
    clicks.current += 1;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => (clicks.current = 0), 1500);
    if (clicks.current >= 5) {
      clicks.current = 0;
      setEgg(true);
      play("on");
      setTimeout(() => setEgg(false), 2600);
    }
  }

  return (
    <div className={`relative ${className}`} onPointerEnter={() => setWobble(true)} onPointerLeave={() => setWobble(false)}>
      <svg viewBox="0 0 600 500" className="block h-auto w-full" aria-hidden="true">
        <Stripes key={mobile ? "m" : "d"} count={mobile ? 7 : 13} wobble={wobble} />
        <path d="M30 500 C 60 440, 150 408, 230 414 C 290 418, 320 400, 380 402 C 470 405, 545 445, 570 500 Z" fill="var(--hill)" />
        <path d="M30 500 C 60 440, 150 408, 230 414 C 290 418, 320 400, 380 402 C 470 405, 545 445, 570 500" fill="none" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div className="absolute bottom-[6%] left-1/2 w-[38%] -translate-x-1/2">
        <button type="button" onClick={poke} aria-label={t.hero.avatarAlt} className={`block w-full ${egg ? "spin-wave" : ""}`} style={{ transformOrigin: "50% 60%" }}>
          <Image
            src={egg ? "/avatar/wave.png" : "/avatar/hero-sitting.png"}
            alt={t.hero.avatarAlt}
            width={463}
            height={760}
            priority
            sizes="(min-width: 1024px) 220px, 38vw"
            className="h-auto w-full drop-shadow-[0_18px_22px_rgb(0_0_0/0.45)]"
          />
        </button>
      </div>
      {/* Handwritten note pointing at the avatar */}
      <p aria-hidden="true" className="font-hand pointer-events-none absolute left-[2%] top-[14%] -rotate-6 text-2xl text-accent sm:text-3xl">
        {t.hero.thatsMe}
        <svg viewBox="0 0 90 60" className="ml-6 mt-1 block h-10 w-16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 6 C 14 30, 34 44, 72 46" />
          <path d="M60 36 L 73 46 L 59 54" />
        </svg>
      </p>
      {egg && (
        <p role="status" className="pop-in absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-full bg-yellow px-4 py-2 text-sm font-bold text-yellow-fg">
          {t.egg}
        </p>
      )}
    </div>
  );
}

// Green background layer for the top of the home page: drifting blobs over a green gradient.
export function GreenBackdrop() {
  return (
    <div aria-hidden="true" className="hero-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grain absolute inset-0" />
    </div>
  );
}

// Name, tagline, intro and buttons (used in the sticky left column of the home page).
export function Intro() {
  const { t } = useLang();
  return (
    <div>
      <p className="font-display text-lg font-bold text-muted">{t.hero.hello}</p>
      <h1 id="hero-title" className="mt-1 text-[clamp(2.8rem,7vw,4.6rem)] font-black leading-[0.95] tracking-tight">
        Samuel{" "}
        <Sparkles>
          <span className="text-accent">ETAH</span>
        </Sparkles>
      </h1>
      <p className="mt-4 font-display text-2xl font-extrabold">
        <span className="text-accent">Code.</span> <span className="text-[color:var(--accent-2)]">Secure.</span> <span className="text-yellow-text">Create.</span>
      </p>
      <p className="t-lead mt-4 max-w-md text-muted">{t.hero.intro}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/blog" className="btn btn-primary">
          {t.hero.ctaPrimary}
        </Link>
        <Link href="/contact" className="btn btn-ghost">
          {t.hero.ctaSecondary}
        </Link>
      </div>
      {site.availableForWork && (
        <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent min-[1360px]:hidden">
          <span className="pulse-dot relative inline-block h-2 w-2 rounded-full bg-accent text-accent" aria-hidden="true" />
          {t.available}
        </p>
      )}
    </div>
  );
}
