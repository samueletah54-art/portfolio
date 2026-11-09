"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { useLang } from "./LangProvider";

function youtubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

// Reel player that loads YouTube only after a tap, so the page stays light on mobile data.
function Reel({ url, label, play }: { url: string; label: string; play: string }) {
  const [on, setOn] = useState(false);
  const id = youtubeId(url);
  if (!id) return null;
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-line bg-bg-2">
      {on ? (
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={label}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setOn(true)} className="group relative block aspect-video w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100" loading="lazy" />
          <span className="bg-gradient absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full shadow-lg transition-transform group-hover:scale-110">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="sr-only">{play}</span>
        </button>
      )}
    </div>
  );
}

function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span className="rounded-full border border-line px-3 py-1">
            <span className="mr-1.5 font-mono text-xs text-accent">{i + 1}</span>
            {s}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="text-muted">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2 text-sm">
          <span aria-hidden="true" className="text-gradient mt-px font-bold">
            ✦
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}

// The two side crafts: Vox-style motion and ghostwriting.
export function Craft() {
  const { t } = useLang();
  const c = t.craft;
  return (
    <div className="dim-list grid gap-6">
      <div>
        <article className="rounded-xl border border-line bg-bg-2/50 p-5 sm:p-6">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">01</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">{c.motionTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{c.motionIntro}</p>
          {site.reel && <Reel url={site.reel} label={c.reelLabel} play={c.reelPlay} />}
          <List items={c.motionMakes} />
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-muted">{c.processLabel}</p>
          <Steps steps={c.motionSteps} />
        </article>
      </div>
      <div>
        <article className="rounded-xl border border-line bg-bg-2/50 p-5 sm:p-6">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">02</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">{c.writingTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{c.writingIntro}</p>
          <List items={c.writingMakes} />
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-muted">{c.processLabel}</p>
          <Steps steps={c.writingSteps} />
          <p className="mt-6 flex items-start gap-2 rounded-lg bg-accent/10 p-3 text-sm leading-relaxed">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0 text-accent" aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <span>{c.confidential}</span>
          </p>
          <a
            href={`mailto:${site.contact.email}?subject=${encodeURIComponent(c.ask)}`}
            className="group mt-4 inline-flex items-center gap-1 text-sm font-medium hover:text-accent"
          >
            {c.ask}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </article>
      </div>
    </div>
  );
}
