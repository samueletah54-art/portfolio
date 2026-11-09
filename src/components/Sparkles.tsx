"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

// <Sparkles>highlighted words</Sparkles>
// Small stars pop in around the words on a spring, twist, and pop out again. Reusable anywhere,
// including inside blog posts (MDX). Decorative only: screen readers just read the words.
// Visitors who prefer reduced motion see the words without stars.

type Star = { id: string; x: number; y: number; size: number; color: string; turn: number };

const PALETTE = ["var(--accent)", "var(--accent-2)", "var(--yellow)"];

function star(colors: string[]): Star {
  return {
    id: Math.random().toString(36).slice(2),
    // Mostly around the edges, a little over the text
    x: -6 + Math.random() * 112,
    y: -10 + Math.random() * 120,
    size: 9 + Math.random() * 11,
    color: colors[Math.floor(Math.random() * colors.length)],
    turn: Math.random() > 0.5 ? 90 : -90,
  };
}

const PATH =
  "M80 0C80 0 84.28 41.29 101.5 58.5 118.71 75.72 160 80 160 80 160 80 118.71 84.28 101.5 101.5 84.28 118.71 80 160 80 160 80 160 75.72 118.71 58.5 101.5 41.29 84.28 0 80 0 80 0 80 41.29 75.72 58.5 58.5 75.72 41.29 80 0 80 0Z";

export function Sparkles({
  children,
  colors = PALETTE,
  every = 420,
  max = 5,
}: {
  children: React.ReactNode;
  colors?: string[];
  /** Milliseconds between new stars */
  every?: number;
  /** Stars visible at once */
  max?: number;
}) {
  const reduce = useReducedMotion();
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setStars((s) => [...s.slice(-(max - 1)), star(colors)]), every);
    return () => clearInterval(id);
  }, [reduce, every, max, colors]);

  return (
    <LazyMotion features={domAnimation} strict>
      <span className="relative inline-block">
        <AnimatePresence>
          {stars.map((s) => (
            <m.svg
              key={s.id}
              aria-hidden="true"
              viewBox="0 0 160 160"
              className="pointer-events-none absolute z-10"
              style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, color: s.color, translateX: "-50%", translateY: "-50%" }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: s.turn }}
              exit={{ scale: 0, rotate: s.turn * 2, transition: { type: "spring", stiffness: 260, damping: 20 } }}
              transition={{ type: "spring", stiffness: 380, damping: 14 }}
            >
              <path d={PATH} fill="currentColor" />
            </m.svg>
          ))}
        </AnimatePresence>
        <span className="relative">{children}</span>
      </span>
    </LazyMotion>
  );
}
