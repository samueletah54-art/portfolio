"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LangProvider";

export const sectionIds = ["about", "experience", "work", "craft", "skills", "services", "writing", "contact"] as const;

// Small uppercase section menu for the sticky left column. The line next to the current
// section grows and the label brightens as you scroll.
export function SideNav() {
  const { t } = useLang();
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <nav aria-label="Sections" className="hidden lg:block">
      <ul className="mt-10 w-max">
        {sectionIds.map((id) => {
          const on = active === id;
          return (
            <li key={id}>
              <a href={`#${id}`} aria-current={on ? "true" : undefined} className="group flex items-center py-2">
                <span
                  className={`mr-4 h-px transition-all duration-300 motion-reduce:transition-none ${
                    on ? "w-16 bg-accent" : "w-8 bg-muted/60 group-hover:w-16 group-hover:bg-fg"
                  }`}
                />
                <span
                  className={`font-mono text-xs font-medium uppercase tracking-[0.2em] transition-colors ${
                    on ? "text-fg" : "text-muted group-hover:text-fg"
                  }`}
                >
                  {t.nav[id]}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
