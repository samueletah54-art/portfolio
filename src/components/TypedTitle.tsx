"use client";

import { useEffect, useState } from "react";

// Types the title once, like a terminal command. Screen readers get the full text straight away,
// and visitors who prefer reduced motion see it complete.
export function TypedTitle({ text, startDelay = 600, speed = 45 }: { text: string; startDelay?: number; speed?: number }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text.length);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        i += 1;
        setShown(i);
        if (i >= text.length && timer) clearInterval(timer);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      if (timer) clearInterval(timer);
    };
  }, [text, startDelay, speed]);

  return (
    <p className="mt-6 min-h-[1.6em] font-mono text-base text-fg sm:text-xl">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        <span className="text-accent">$ </span>
        {text.slice(0, shown)}
        <span className="caret" />
      </span>
    </p>
  );
}
