"use client";

import { useEffect } from "react";
import { animate } from "framer-motion";

// One place that gives the whole site its "physical" feel, using real spring physics (Framer Motion).
// It listens once on the document instead of wrapping every component:
//   .btn       lifts on hover, squishes on press, bounces back on release
//   .lift      cards rise gently on hover, dip slightly on press
//   .icon-btn  / .boop  the icon inside wiggles on hover and squishes on press
// Nothing runs for visitors who prefer reduced motion.

type Kind = "btn" | "lift" | "icon";

const SPRING = {
  hover: { type: "spring", stiffness: 420, damping: 22 },
  press: { type: "spring", stiffness: 700, damping: 26 },
  release: { type: "spring", stiffness: 520, damping: 12 },
  wiggle: { type: "spring", stiffness: 650, damping: 7, mass: 0.6 },
} as const;

function find(target: EventTarget | null): { el: HTMLElement; kind: Kind } | null {
  const el = (target as HTMLElement | null)?.closest?.(".btn, .lift, .icon-btn, .boop") as HTMLElement | null;
  if (!el || el.hasAttribute("disabled")) return null;
  if (el.classList.contains("btn")) return { el, kind: "btn" };
  if (el.classList.contains("lift")) return { el, kind: "lift" };
  return { el, kind: "icon" };
}

const raised = { btn: -3, lift: -6, icon: 0 };

export function Springs() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hovered = new WeakSet<HTMLElement>();

    const over = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const hit = find(e.target);
      if (!hit || hovered.has(hit.el)) return;
      hovered.add(hit.el);
      if (hit.kind === "icon") {
        const svg = hit.el.querySelector("svg");
        if (svg) animate(svg, { rotate: [-16, 0] }, SPRING.wiggle);
      } else {
        animate(hit.el, { y: raised[hit.kind] }, SPRING.hover);
      }
    };

    const out = (e: PointerEvent) => {
      const hit = find(e.target);
      if (!hit || !hovered.has(hit.el)) return;
      // Still inside the same element (moved onto a child)?
      if (e.relatedTarget instanceof Node && hit.el.contains(e.relatedTarget)) return;
      hovered.delete(hit.el);
      if (hit.kind !== "icon") animate(hit.el, { y: 0, scaleX: 1, scaleY: 1 }, SPRING.hover);
    };

    const down = (e: PointerEvent) => {
      const hit = find(e.target);
      if (!hit) return;
      if (hit.kind === "btn") animate(hit.el, { scaleX: 1.05, scaleY: 0.9 }, SPRING.press);
      else if (hit.kind === "lift") animate(hit.el, { scale: 0.985 }, SPRING.press);
      else animate(hit.el, { scale: 0.86 }, SPRING.press);
    };

    const up = (e: PointerEvent) => {
      const hit = find(e.target);
      if (!hit) return;
      if (hit.kind === "btn") animate(hit.el, { scaleX: 1, scaleY: 1 }, SPRING.release);
      else animate(hit.el, { scale: 1 }, SPRING.release);
    };

    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    document.addEventListener("pointerdown", down);
    document.addEventListener("pointerup", up);
    document.addEventListener("pointercancel", up);
    return () => {
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", up);
    };
  }, []);

  return null;
}
