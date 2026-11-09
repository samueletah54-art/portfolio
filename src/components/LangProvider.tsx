"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "@/content/site";
import { en, type Dict } from "@/i18n/en";
import { fr } from "@/i18n/fr";

const dicts: Record<Lang, Dict> = { en, fr };
type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: "en", t: en, setLang: () => {} });

// English is the default (and what search engines see). A visitor's choice is remembered.
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "fr" || saved === "en") setLangState(saved);
    } catch {}
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

  return <LangContext.Provider value={{ lang, t: dicts[lang], setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
