"use client";

import { langs } from "@/content/site";
import { useLang } from "./LangProvider";

export function LangToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div role="group" aria-label={t.langLabel} className="flex h-10 items-center rounded-full border border-line p-1 font-mono text-xs">
      {langs.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`h-8 rounded-full px-2.5 uppercase tracking-[0.12em] transition-colors ${
            lang === l ? "bg-fg text-bg" : "text-muted hover:text-fg"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
