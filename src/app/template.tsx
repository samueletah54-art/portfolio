"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

// Smooth page transition: each page fades and rises in.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}>
        {children}
      </m.div>
    </LazyMotion>
  );
}
