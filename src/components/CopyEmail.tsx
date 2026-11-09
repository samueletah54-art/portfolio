"use client";

import { useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { site } from "@/content/site";
import { useLang } from "./LangProvider";

// Copies the email address in one tap and confirms with a small toast.
export function CopyEmail() {
  const { t } = useLang();
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.contact.email);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      window.location.href = `mailto:${site.contact.email}`;
    }
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <span className="relative inline-flex">
        <button
          type="button"
          onClick={copy}
          className="rounded-full border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:border-accent hover:text-accent"
        >
          {t.copy}
        </button>
        <AnimatePresence>
          {done && (
            <m.span
              role="status"
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: -2, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3 py-1.5 font-mono text-xs text-accent-fg"
            >
              {t.copied}
            </m.span>
          )}
        </AnimatePresence>
      </span>
    </LazyMotion>
  );
}
