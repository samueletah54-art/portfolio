"use client";

import { useRef, useState } from "react";
import { site } from "@/content/site";
import { useLang } from "./LangProvider";

// Sends through Formspree when NEXT_PUBLIC_FORMSPREE_ID is set (free plan is enough).
// Without it, it opens the visitor's email app with the message filled in.
// Spam protection: a hidden honeypot field, a minimum fill time, and one send per 30 seconds.
const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
type Status = "idle" | "sending" | "sent" | "mail" | "error" | "slow";

export function ContactForm() {
  const { t } = useLang();
  const c = t.contact;
  const [status, setStatus] = useState<Status>("idle");
  const opened = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // bots fill hidden fields
    if (Date.now() - opened.current < 3000) return setStatus("slow");
    try {
      const last = Number(localStorage.getItem("contact:last") || 0);
      if (Date.now() - last < 30_000) return setStatus("slow");
      localStorage.setItem("contact:last", String(Date.now()));
    } catch {}

    const subject = `${data.get("subject") || "Website enquiry"} — ${data.get("name")}`;
    if (!formId) {
      const body = `${data.get("message")}\n\n${data.get("name")} (${data.get("email")})`;
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return setStatus("mail");
    }
    setStatus("sending");
    data.set("_subject", subject);
    data.delete("website");
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-2 w-full min-h-12 rounded-xl border border-line bg-bg-2 px-4 py-3 text-base text-fg placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none";
  const label = "block text-sm font-bold";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-line bg-bg-3/40 p-5 sm:p-7">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>
          {c.name}
          <input name="name" required maxLength={80} autoComplete="name" className={field} />
        </label>
        <label className={label}>
          {c.email}
          <input name="email" type="email" required maxLength={120} autoComplete="email" className={field} />
        </label>
      </div>
      <label className={label}>
        {c.subject}
        <select name="subject" className={field} defaultValue={t.nav.services}>
          {[t.services.title, t.courses.title, "Video", t.nav.about].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className={label}>
        {c.message}
        <textarea name="message" required rows={6} maxLength={4000} placeholder={c.placeholder} className={`${field} resize-y`} />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
          {status === "sending" ? c.sending : c.send}
        </button>
        <p role="status" aria-live="polite" className="text-sm">
          {status === "sent" && <span className="text-accent">{c.sent}</span>}
          {status === "mail" && c.sentMail}
          {status === "slow" && c.tooFast}
          {status === "error" && (
            <>
              {c.error}{" "}
              <a className="text-accent underline" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            </>
          )}
        </p>
      </div>
    </form>
  );
}
