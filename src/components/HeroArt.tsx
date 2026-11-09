"use client";

import { useEffect } from "react";
import { LazyMotion, domAnimation, m, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";

// Original illustration of the three services: a phone with a website (web), a video card with a
// moving playhead (video) and a page writing itself (ghostwriting). Layers drift at different
// depths as the mouse moves, and float gently on their own. Decorative, so hidden from screen readers.
function Layer({ px, py, depth, children }: { px: MotionValue<number>; py: MotionValue<number>; depth: number; children: React.ReactNode }) {
  const x = useTransform(px, (v) => v * depth * 14);
  const y = useTransform(py, (v) => v * depth * 10);
  return <m.g style={{ x, y }}>{children}</m.g>;
}

export function HeroArt() {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const px = useSpring(rx, { stiffness: 70, damping: 18 });
  const py = useSpring(ry, { stiffness: 70, damping: 18 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      rx.set((e.clientX / window.innerWidth) * 2 - 1);
      ry.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, rx, ry]);

  return (
    <LazyMotion features={domAnimation} strict>
      <svg viewBox="0 0 480 500" className="hero-art h-auto w-full" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="ha-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ha-screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--bg-2)" />
            <stop offset="100%" stopColor="var(--bg)" />
          </linearGradient>
          {/* lit from the top left, like a soft 3D render */}
          <linearGradient id="ha-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="var(--fg)" />
            <stop offset="100%" stopColor="var(--muted)" />
          </linearGradient>
          <linearGradient id="ha-brand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
          <linearGradient id="ha-paper" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="var(--paper)" />
          </linearGradient>
          <linearGradient id="ha-gloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="ha-orb" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="35%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </radialGradient>
          <filter id="ha-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        {/* Soft halo */}
        <Layer px={px} py={py} depth={-0.6}>
          <circle cx="240" cy="250" r="210" fill="url(#ha-glow)" />
          <circle cx="240" cy="250" r="160" fill="none" stroke="var(--line)" strokeDasharray="2 8" />
          <ellipse cx="240" cy="468" rx="110" ry="12" fill="#000" opacity="0.28" filter="url(#ha-blur)" />
          <ellipse cx="118" cy="458" rx="80" ry="9" fill="#000" opacity="0.22" filter="url(#ha-blur)" />
          <ellipse cx="380" cy="240" rx="62" ry="8" fill="#000" opacity="0.16" filter="url(#ha-blur)" />
        </Layer>

        {/* Floating orb, a bit of whimsy */}
        <Layer px={px} py={py} depth={2.2}>
          <g className="ha-float" style={{ animationDelay: "-0.6s" }}>
            <circle cx="96" cy="150" r="26" fill="url(#ha-orb)" />
            <ellipse cx="88" cy="140" rx="9" ry="6" fill="#fff" opacity="0.6" />
          </g>
        </Layer>

        {/* Code bubble */}
        <Layer px={px} py={py} depth={1.9}>
          <g className="ha-float" style={{ animationDelay: "-2s" }}>
            <rect x="350" y="300" width="96" height="58" rx="18" fill="url(#ha-brand)" />
            <path d="M372 362 l10 14 l6 -16 z" fill="var(--accent-2)" />
            <text x="398" y="338" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="22" fontWeight="700" fill="var(--on-gradient)">
              {"</>"}
            </text>
            <rect x="358" y="304" width="80" height="14" rx="7" fill="url(#ha-gloss)" />
          </g>
        </Layer>

        {/* Ghostwriting: a page writing itself */}
        <Layer px={px} py={py} depth={1.3}>
          <g className="ha-float" style={{ animationDelay: "-1.2s" }}>
            <g transform="rotate(6 375 120)">
              <rect x="300" y="40" width="150" height="170" rx="14" fill="url(#ha-paper)" stroke="var(--line)" />
              <rect x="318" y="62" width="70" height="8" rx="4" fill="var(--warm)" />
              {[86, 104, 122, 140, 158].map((yy, i) => (
                <line
                  key={yy}
                  x1="318"
                  y1={yy}
                  x2={i === 4 ? 380 : 432}
                  y2={yy}
                  stroke="var(--ink)"
                  strokeOpacity="0.55"
                  strokeWidth="5"
                  strokeLinecap="round"
                  pathLength={1}
                  className="ha-write"
                  style={{ animationDelay: `${i * 0.45}s` }}
                />
              ))}
              {/* pen */}
              <g className="ha-pen">
                <rect x="408" y="150" width="12" height="56" rx="5" fill="var(--pink)" transform="rotate(35 414 178)" />
                <path d="M394 198 l8 -4 l-3 9 z" fill="var(--ink)" />
              </g>
            </g>
          </g>
        </Layer>

        {/* Web: a phone showing a website */}
        <Layer px={px} py={py} depth={0.8}>
          <g className="ha-float">
            <rect x="150" y="95" width="176" height="330" rx="30" fill="url(#ha-body)" />
            <rect x="146" y="150" width="6" height="36" rx="3" fill="var(--muted)" />
            <rect x="160" y="105" width="156" height="310" rx="22" fill="url(#ha-screen)" />
            <rect x="214" y="113" width="48" height="8" rx="4" fill="var(--fg)" />
            {/* site header */}
            <rect x="174" y="136" width="36" height="8" rx="4" fill="var(--accent)" />
            <rect x="262" y="136" width="40" height="8" rx="4" fill="var(--muted)" opacity="0.5" />
            {/* hero block */}
            <rect x="174" y="160" width="128" height="74" rx="10" fill="var(--accent)" opacity="0.16" />
            <rect x="186" y="176" width="86" height="11" rx="5" fill="var(--fg)" opacity="0.85" />
            <rect x="186" y="195" width="64" height="11" rx="5" fill="var(--fg)" opacity="0.85" />
            <rect x="186" y="214" width="44" height="10" rx="5" fill="var(--accent)" className="ha-pulse" />
            {/* cards */}
            <rect x="174" y="246" width="60" height="58" rx="8" fill="var(--bg-2)" stroke="var(--line)" />
            <rect x="242" y="246" width="60" height="58" rx="8" fill="var(--bg-2)" stroke="var(--line)" />
            <circle cx="190" cy="262" r="7" fill="var(--warm)" />
            <circle cx="258" cy="262" r="7" fill="var(--pink)" />
            <rect x="182" y="280" width="40" height="6" rx="3" fill="var(--muted)" opacity="0.6" />
            <rect x="250" y="280" width="40" height="6" rx="3" fill="var(--muted)" opacity="0.6" />
            {[318, 334, 350].map((yy, i) => (
              <rect key={yy} x="174" y={yy} width={[128, 104, 116][i]} height="7" rx="3.5" fill="var(--muted)" opacity="0.4" />
            ))}
            {/* WhatsApp-style order button */}
            <rect x="174" y="372" width="128" height="26" rx="13" fill="url(#ha-brand)" />
            <rect x="206" y="382" width="64" height="6" rx="3" fill="var(--accent-fg)" opacity="0.8" />
          </g>
        </Layer>

        {/* Security: a shield badge */}
        <Layer px={px} py={py} depth={2}>
          <g className="ha-float" style={{ animationDelay: "-2.4s" }}>
            <g transform="translate(300 300)">
              <circle r="30" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
              <path d="M0 -15 L13 -10 V1 C13 9 7 14 0 17 C-7 14 -13 9 -13 1 V-10 Z" fill="url(#ha-brand)" />
              <path d="M-6 0 L-1.5 5 L7 -5" fill="none" stroke="var(--accent-fg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        </Layer>

        {/* Video: a player with a moving playhead */}
        <Layer px={px} py={py} depth={1.7}>
          <g className="ha-float" style={{ animationDelay: "-3.1s" }}>
            <g transform="rotate(-5 110 360)">
              <rect x="20" y="300" width="190" height="128" rx="14" fill="var(--bg-2)" stroke="var(--line)" />
              <rect x="32" y="312" width="166" height="76" rx="8" fill="var(--accent-2)" opacity="0.18" />
              <path d="M30 388 L80 345 L112 370 L150 330 L198 388 Z" fill="url(#ha-brand)" opacity="0.55" />
              <circle cx="115" cy="350" r="19" fill="url(#ha-brand)" />
              <path d="M110 341 L124 350 L110 359 Z" fill="var(--bg)" />
              <rect x="32" y="402" width="166" height="5" rx="2.5" fill="var(--line)" />
              <rect x="32" y="402" width="166" height="5" rx="2.5" fill="var(--pink)" className="ha-progress" />
              {[56, 98, 150].map((xx) => (
                <rect key={xx} x={xx - 3} y="411" width="6" height="6" transform={`rotate(45 ${xx} 414)`} fill="var(--muted)" />
              ))}
            </g>
          </g>
        </Layer>

        {/* Twinkles */}
        <Layer px={px} py={py} depth={2.6}>
          {[
            [92, 118, "var(--warm)", 0],
            [438, 270, "var(--pink)", 0.8],
            [60, 236, "var(--accent)", 1.6],
            [262, 470, "var(--warm)", 2.2],
          ].map(([cx, cy, c, d]) => (
            <path
              key={`${cx}`}
              d={`M${cx} ${Number(cy) - 9} L${Number(cx) + 2.5} ${Number(cy) - 2.5} L${Number(cx) + 9} ${cy} L${Number(cx) + 2.5} ${Number(cy) + 2.5} L${cx} ${Number(cy) + 9} L${Number(cx) - 2.5} ${Number(cy) + 2.5} L${Number(cx) - 9} ${cy} L${Number(cx) - 2.5} ${Number(cy) - 2.5} Z`}
              fill={String(c)}
              className="ha-twinkle"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </Layer>
      </svg>
    </LazyMotion>
  );
}
