"use client";

import { useEffect } from "react";
import { LazyMotion, domAnimation, m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

// Full-width opening scene: a sunset over layered hills, with Mount Cameroon's silhouette at the back.
// Clouds drift, birds glide, stars twinkle, the sun breathes; the layers shift with the mouse and the
// scroll at different depths. The front hill is the page colour, so the scene melts into the page.
// Decorative only (aria-hidden); everything stops for visitors who prefer reduced motion.

function Hill({ d, fill, depth, px, scrollY }: { d: string; fill: string; depth: number; px: MotionValue<number>; scrollY: MotionValue<number> }) {
  const x = useTransform(px, (v) => v * depth * -18);
  const y = useTransform(scrollY, (v) => v * depth * 0.12);
  return <m.path d={d} fill={fill} style={{ x, y }} />;
}

const cloud = "M0 40 C 10 15, 45 10, 60 25 C 70 5, 110 0, 125 22 C 140 12, 170 18, 172 40 Z";

export function Banner() {
  const reduce = useReducedMotion();
  const raw = useMotionValue(0);
  const px = useSpring(raw, { stiffness: 50, damping: 16 });
  const { scrollY } = useScroll();
  const sunY = useTransform(scrollY, (v) => v * 0.25);
  const snowX = useTransform(px, (v) => v * 0.25 * -18);

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => raw.set((e.clientX / window.innerWidth) * 2 - 1);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, raw]);

  return (
    <LazyMotion features={domAnimation} strict>
      <div aria-hidden="true" className="banner relative h-[300px] w-full overflow-hidden sm:h-[380px] lg:h-[440px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 440" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="bn-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--sky-1)" />
              <stop offset="55%" stopColor="var(--sky-2)" />
              <stop offset="100%" stopColor="var(--sky-3)" />
            </linearGradient>
            <radialGradient id="bn-sun" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff7e6" />
              <stop offset="45%" stopColor="var(--sun)" />
              <stop offset="100%" stopColor="var(--sun)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="bn-snow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width="1440" height="440" fill="url(#bn-sky)" />

          {/* Stars (dark mode only, via CSS) */}
          <g className="bn-stars">
            {[
              [120, 60], [260, 34], [410, 82], [560, 40], [720, 70], [880, 30], [1010, 64], [1160, 42], [1300, 76], [1390, 28], [190, 120], [980, 118],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.8 : 1.2} fill="#fff" className="bn-twinkle" style={{ animationDelay: `${(i * 0.37) % 3}s` }} />
            ))}
          </g>

          {/* Sun */}
          <m.g style={{ y: sunY }}>
            <circle cx="1040" cy="250" r="150" fill="url(#bn-sun)" opacity="0.55" className="bn-breathe" />
            <circle cx="1040" cy="250" r="58" fill="var(--sun)" />
            <circle cx="1040" cy="250" r="58" fill="#fff" opacity="0.18" />
          </m.g>

          {/* Clouds drifting */}
          <g className="bn-drift" style={{ animationDuration: "90s" }}>
            <path d={cloud} transform="translate(180 70) scale(1.4)" fill="var(--cloud)" />
            <path d={cloud} transform="translate(1620 70) scale(1.4)" fill="var(--cloud)" />
          </g>
          <g className="bn-drift" style={{ animationDuration: "140s", animationDelay: "-40s" }}>
            <path d={cloud} transform="translate(640 120) scale(0.9)" fill="var(--cloud)" opacity="0.7" />
            <path d={cloud} transform="translate(2080 120) scale(0.9)" fill="var(--cloud)" opacity="0.7" />
          </g>
          <g className="bn-drift" style={{ animationDuration: "110s", animationDelay: "-70s" }}>
            <path d={cloud} transform="translate(1100 40) scale(1.1)" fill="var(--cloud)" opacity="0.85" />
            <path d={cloud} transform="translate(2540 40) scale(1.1)" fill="var(--cloud)" opacity="0.85" />
          </g>

          {/* Birds gliding */}
          <g className="bn-birds">
            <path d="M0 0 q 7 -7 14 0 q 7 -7 14 0" fill="none" stroke="var(--bird)" strokeWidth="2.2" strokeLinecap="round" className="bn-flap" />
            <path d="M34 12 q 5 -5 10 0 q 5 -5 10 0" fill="none" stroke="var(--bird)" strokeWidth="1.8" strokeLinecap="round" className="bn-flap" style={{ animationDelay: "-0.3s" }} />
            <path d="M-26 16 q 5 -5 10 0 q 5 -5 10 0" fill="none" stroke="var(--bird)" strokeWidth="1.8" strokeLinecap="round" className="bn-flap" style={{ animationDelay: "-0.6s" }} />
          </g>

          {/* Mount Cameroon, far back */}
          <Hill
            depth={0.25}
            px={px}
            scrollY={scrollY}
            fill="var(--hill-1)"
            d="M-60 330 L180 300 C 300 290, 420 230, 520 180 C 560 160, 600 150, 640 150 C 690 150, 740 175, 800 210 C 900 265, 1060 280, 1200 290 L1500 300 L1500 440 L-60 440 Z"
          />
          <m.path d="M600 158 C 620 151, 660 150, 690 160 L 668 176 L 640 166 L 618 178 Z" fill="url(#bn-snow)" style={{ x: snowX }} />
          <Hill
            depth={0.5}
            px={px}
            scrollY={scrollY}
            fill="var(--hill-2)"
            d="M-60 360 C 120 300, 260 290, 400 320 C 520 345, 640 300, 760 290 C 900 278, 1000 330, 1120 320 C 1240 310, 1340 270, 1500 300 L1500 440 L-60 440 Z"
          />
          <Hill
            depth={0.8}
            px={px}
            scrollY={scrollY}
            fill="var(--hill-3)"
            d="M-60 395 C 100 350, 230 345, 360 372 C 500 400, 620 360, 780 352 C 940 344, 1060 392, 1200 386 C 1320 380, 1400 350, 1500 360 L1500 440 L-60 440 Z"
          />
          {/* Front: the page colour, so the scene flows into the content */}
          <Hill
            depth={1.1}
            px={px}
            scrollY={scrollY}
            fill="var(--bg)"
            d="M-60 425 C 160 398, 380 400, 560 418 C 760 438, 960 405, 1160 408 C 1300 410, 1400 420, 1500 415 L1500 470 L-60 470 Z"
          />
        </svg>
      </div>
    </LazyMotion>
  );
}
