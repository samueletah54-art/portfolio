"use client";

import { langs } from "@/content/site";
import { useLang } from "./LangProvider";

// EN / FR switch. English is the default.
export function LangToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div role="group" aria-label={t.icons.language} className="flex h-11 items-center rounded-full border border-line p-1 text-xs font-bold">
      {langs.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          lang={l}
          className={`h-9 min-w-9 rounded-full px-2.5 uppercase tracking-wider transition-colors ${
            lang === l ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
