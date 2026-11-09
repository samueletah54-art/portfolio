"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { useLang } from "./LangProvider";

// Sends through Web3Forms (free, no backend) when NEXT_PUBLIC_WEB3FORMS_KEY is set.
// Without a key it opens the visitor's email app with the message filled in.
const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const { t } = useLang();
  const f = t.form;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return;

    if (!accessKey) {
      const subject = `${f.subject} ${data.get("name")}`;
      const body = `${data.get("message")}\n\n${data.get("name")} (${data.get("email")})`;
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    data.append("access_key", accessKey);
    data.append("subject", `${f.subject} ${data.get("name")}`);
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        form.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-2 w-full rounded-xl border border-line bg-bg-2 px-4 py-3 text-base text-fg placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate={false}>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {f.name}
          <input name="name" required maxLength={80} autoComplete="name" className={field} />
        </label>
        <label className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {f.email}
          <input name="email" type="email" required maxLength={120} autoComplete="email" className={field} />
        </label>
      </div>
      <label className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        {f.details}
        <textarea name="message" required rows={5} maxLength={4000} className={`${field} resize-y`} placeholder={f.placeholder} />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-gradient inline-flex h-12 items-center gap-2 rounded-full px-6 font-medium transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === "sending" ? f.sending : f.send} <span aria-hidden="true">→</span>
        </button>
        <p role="status" aria-live="polite" className="text-sm text-muted">
          {status === "sent" && (accessKey ? f.sent : f.sentMail)}
          {status === "error" && (
            <>
              {f.error}{" "}
              <a className="text-accent underline" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}
