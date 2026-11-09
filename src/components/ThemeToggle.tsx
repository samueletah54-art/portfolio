"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LangProvider";

const typing = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName));

export function toggleTheme() {
  const next = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", next);
  try {
    localStorage.setItem("theme", next ? "dark" : "light");
  } catch {}
  window.dispatchEvent(new Event("themechange"));
}

// Sun/moon button. Press T anywhere (outside a text field) to switch too.
export function ThemeToggle() {
  const { t } = useLang();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const sync = () => setDark(document.documentElement.classList.contains("dark"));
    sync();
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "t" && !e.ctrlKey && !e.metaKey && !e.altKey && !typing(e.target)) toggleTheme();
    };
    window.addEventListener("themechange", sync);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("themechange", sync);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? t.icons.light : t.icons.dark}
      title={`${dark ? t.icons.light : t.icons.dark} (T)`}
      className="icon-btn boop"
    >
      {dark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}

export { typing };
