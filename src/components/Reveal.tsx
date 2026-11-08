"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

// Fades and slides content in once as it scrolls into view. Static when the visitor prefers reduced motion.
// LazyMotion + `m` ships only the animation features used here instead of the full Framer Motion bundle.
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const Tag = m[as];
  return (
    <LazyMotion features={domAnimation} strict>
      {reduce ? (
        <Tag className={className}>{children}</Tag>
      ) : (
        <Tag
          className={className}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {children}
        </Tag>
      )}
    </LazyMotion>
  );
}
