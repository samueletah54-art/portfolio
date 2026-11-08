"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { copy, type Copy, type Lang } from "@/content/site";

type Ctx = { lang: Lang; t: Copy; setLang: (l: Lang) => void };

const LangContext = createContext<Ctx>({ lang: "en", t: copy.en, setLang: () => {} });

// English on first paint (good for search engines). After load: the visitor's saved choice,
// otherwise French if their browser is set to French.
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("lang");
    } catch {}
    const initial: Lang = saved === "fr" || saved === "en" ? saved : navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
    setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(l: Lang) {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  }

  return <LangContext.Provider value={{ lang, t: copy[lang], setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
