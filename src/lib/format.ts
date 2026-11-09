import type { Lang } from "@/content/site";

export const fmtDate = (d: string, lang: Lang) =>
  new Date(d).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
