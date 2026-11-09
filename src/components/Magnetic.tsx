"use client";

import { LazyMotion, domAnimation, m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// Wraps a button or link so it leans gently toward the pointer and springs back when released.
export function Magnetic({ children, strength = 0.25 }: { children: React.ReactNode; strength?: number }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 16, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 16, mass: 0.6 });

  if (reduce) return <>{children}</>;

  return (
    <LazyMotion features={domAnimation} strict>
      <m.span
        className="inline-flex"
        style={{ x: sx, y: sy }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - (r.left + r.width / 2)) * strength);
          y.set((e.clientY - (r.top + r.height / 2)) * strength);
        }}
        onPointerLeave={() => {
          x.set(0);
          y.set(0);
        }}
        whileTap={{ scale: 0.96 }}
      >
        {children}
      </m.span>
    </LazyMotion>
  );
}
