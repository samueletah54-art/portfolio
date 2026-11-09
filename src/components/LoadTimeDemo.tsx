"use client";

import { useEffect, useRef, useState } from "react";

// Interactive widget for the "fast websites" post: pick an image and a connection,
// press Load and watch how long a visitor would wait, and how much of their data it costs.
// Numbers are rough averages, meant to show the difference, not to be exact.

const IMAGES = [
  { kb: 3200, en: "Phone photo, straight from the camera (JPEG, 4000px)", fr: "Photo du téléphone, telle quelle (JPEG, 4000 px)" },
  { kb: 310, en: "Resized to 1200px (JPEG)", fr: "Redimensionnée à 1200 px (JPEG)" },
  { kb: 120, en: "Resized to 1200px (WebP)", fr: "Redimensionnée à 1200 px (WebP)" },
];
const NETS = [
  { mbps: 0.4, latency: 0.6, en: "Weak 3G", fr: "3G faible" },
  { mbps: 1.6, latency: 0.3, en: "Slow 4G", fr: "4G lente" },
  { mbps: 30, latency: 0.03, en: "Office Wi-Fi", fr: "Wi-Fi de bureau" },
];

const L = {
  en: { image: "The image", net: "The connection", load: "Load the image", again: "Load again", wait: "Waiting time", data: "Data used", note: "Animation sped up for long waits.", s: "s" },
  fr: { image: "L'image", net: "La connexion", load: "Charger l'image", again: "Recharger", wait: "Temps d'attente", data: "Données utilisées", note: "Animation accélérée pour les longues attentes.", s: " s" },
};

export function LoadTimeDemo({ lang = "en" }: { lang?: "en" | "fr" }) {
  const t = L[lang];
  const [img, setImg] = useState(0);
  const [net, setNet] = useState(1);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const raf = useRef(0);

  const seconds = NETS[net].latency + (IMAGES[img].kb * 8) / 1000 / NETS[net].mbps;
  const playFor = Math.min(seconds, 5); // never make the reader wait more than 5 s
  const fast = seconds > 5;

  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  useEffect(() => {
    cancelAnimationFrame(raf.current);
    setRunning(false);
    setProgress(0);
  }, [img, net]);

  function run() {
    cancelAnimationFrame(raf.current);
    setProgress(0);
    setRunning(true);
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1000 / playFor);
      setProgress(p);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setRunning(false);
    };
    raf.current = requestAnimationFrame(tick);
  }

  const shown = (progress * seconds).toFixed(1);
  const mb = (IMAGES[img].kb / 1000).toFixed(2);

  return (
    <figure className="not-prose my-8 rounded-2xl border border-line bg-bg-2 p-5 sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <fieldset>
          <legend className="t-meta text-muted">{t.image}</legend>
          <div className="mt-2 space-y-1.5">
            {IMAGES.map((x, i) => (
              <label key={x.kb} className={`flex cursor-pointer items-start gap-2.5 rounded-xl px-3 py-2 text-[15px] ${img === i ? "bg-accent-soft font-semibold" : "hover:bg-bg-3"}`}>
                <input type="radio" name="ltd-img" checked={img === i} onChange={() => setImg(i)} className="mt-1.5 accent-[var(--accent)]" />
                <span>
                  {x[lang]} <span className="text-muted">· {x.kb >= 1000 ? `${(x.kb / 1000).toFixed(1)} MB` : `${x.kb} KB`}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="t-meta text-muted">{t.net}</legend>
          <div className="mt-2 space-y-1.5">
            {NETS.map((x, i) => (
              <label key={x.en} className={`flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-[15px] ${net === i ? "bg-accent-soft font-semibold" : "hover:bg-bg-3"}`}>
                <input type="radio" name="ltd-net" checked={net === i} onChange={() => setNet(i)} className="accent-[var(--accent)]" />
                {x[lang]}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* The "phone screen" filling in like a slow image does */}
      <div className="mt-6 overflow-hidden rounded-xl border border-line bg-bg">
        <div
          className="h-28 bg-gradient-to-br from-accent/70 via-[var(--accent-2)]/60 to-[var(--yellow)]/50"
          style={{ clipPath: `inset(0 0 ${100 - progress * 100}% 0)` }}
          aria-hidden="true"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <button type="button" className="btn btn-primary" onClick={run} disabled={running}>
          {progress === 1 ? t.again : t.load}
        </button>
        <dl className="flex gap-6 text-right" aria-live="polite">
          <div>
            <dt className="t-meta text-muted">{t.wait}</dt>
            <dd className="font-display text-2xl font-black tabular-nums">
              {progress === 0 ? seconds.toFixed(1) : shown}
              {t.s}
            </dd>
          </div>
          <div>
            <dt className="t-meta text-muted">{t.data}</dt>
            <dd className="font-display text-2xl font-black tabular-nums">{mb} MB</dd>
          </div>
        </dl>
      </div>
      {fast && <figcaption className="mt-3 text-sm text-muted">{t.note}</figcaption>}
    </figure>
  );
}
