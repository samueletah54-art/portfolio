"use client";

import { useEffect, useRef } from "react";

// A soft green glow that follows the mouse across the page (large screens with a mouse only).
// Off for visitors who prefer reduced motion.
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--x", `${e.clientX}px`);
        el.style.setProperty("--y", `${e.clientY}px`);
        el.style.opacity = "1";
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
    };
  }, []);
  return <div ref={ref} aria-hidden="true" className="spotlight pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-500" />;
}
