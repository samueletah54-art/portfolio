"use client";

import { useRef, useState } from "react";
import { site } from "@/content/site";
import { useLang } from "./LangProvider";

// Newsletter sign-up. With NEXT_PUBLIC_NEWSLETTER_ENDPOINT set (e.g. a Formspree or Buttondown form URL),
// it posts there; without it, it opens the visitor's email app with the request ready.
const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;
type Status = "idle" | "sending" | "ok" | "mail" | "error";

export function Newsletter({ variant = "footer" }: { variant?: "footer" | "inline" }) {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const opened = useRef(Date.now());

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("company")) return; // honeypot
    if (Date.now() - opened.current < 2000) return setStatus("error");
    const email = String(data.get("email") || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setStatus("error");
    if (!endpoint) {
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent("Newsletter")}&body=${encodeURIComponent(`Please add ${email} to your newsletter.`)}`;
      return setStatus("mail");
    }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json" }, body: data });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) e.currentTarget?.reset();
    } catch {
      setStatus("error");
    }
  }

  const inline = variant === "inline";
  return (
    <div className={inline ? "my-10 rounded-2xl border border-accent/30 bg-accent-soft p-5 sm:p-6" : ""}>
      <p className={`font-display font-extrabold ${inline ? "text-xl" : "text-2xl text-white"}`}>{t.newsletter.title}</p>
      <p className={`mt-1.5 ${inline ? "text-muted" : "text-white/85"}`}>{t.newsletter.text}</p>
      <form onSubmit={submit} className="mt-4 flex flex-col gap-2.5 sm:flex-row" noValidate>
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <label className="sr-only" htmlFor={`nl-${variant}`}>
          Email
        </label>
        <input
          id={`nl-${variant}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t.newsletter.placeholder}
          className={`min-h-12 flex-1 rounded-full px-5 text-base outline-none ring-yellow focus:ring-2 ${
            inline ? "border border-line bg-bg text-fg" : "bg-white/95 text-[#1e2129] placeholder:text-[#5b6472]"
          }`}
        />
        <button type="submit" disabled={status === "sending"} className="btn btn-yellow press disabled:opacity-60">
          {status === "sending" ? t.newsletter.sending : t.newsletter.button}
        </button>
      </form>
      <p role="status" aria-live="polite" className={`mt-2 min-h-5 text-sm ${inline ? "" : "text-white"}`}>
        {status === "ok" && t.newsletter.success}
        {status === "mail" && t.newsletter.mailFallback}
        {status === "error" && t.newsletter.error}
      </p>
    </div>
  );
}
