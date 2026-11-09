"use client";

import { useEffect, useState } from "react";

// Little stars that pop in and out around the wrapped words. Static for reduced motion.
type Star = { id: number; x: number; y: number; size: number; color: string };
const colors = ["var(--accent)", "var(--accent-2)", "var(--warm)"];

function makeStar(): Star {
  return {
    id: Math.random(),
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 8 + Math.random() * 10,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
}

export function Sparkles({ children }: { children: React.ReactNode }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setStars((s) => [...s.slice(-4), makeStar()]);
    }, 450);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-block">
      {stars.map((s) => (
        <svg
          key={s.id}
          className="sparkle pointer-events-none absolute z-10"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, color: s.color }}
          viewBox="0 0 160 160"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
          />
        </svg>
      ))}
      <span className="relative">{children}</span>
    </span>
  );
}
