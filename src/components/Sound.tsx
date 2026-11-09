"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

// Small, soft interface sounds made on the fly with the Web Audio API (no audio files to download).
// On by default; the speaker button in the header turns them off, and the choice is remembered.
type SoundName = "pop" | "on" | "off" | "open";
type Ctx = { enabled: boolean; toggle: () => void; play: (s: SoundName) => void };

const SoundContext = createContext<Ctx>({ enabled: false, toggle: () => {}, play: () => {} });

const recipes: Record<SoundName, { from: number; to: number; ms: number; type: OscillatorType; gain: number }> = {
  pop: { from: 520, to: 260, ms: 70, type: "sine", gain: 0.08 },
  on: { from: 440, to: 880, ms: 110, type: "triangle", gain: 0.07 },
  off: { from: 660, to: 330, ms: 110, type: "triangle", gain: 0.07 },
  open: { from: 300, to: 600, ms: 140, type: "sine", gain: 0.06 },
};

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sound");
      if (saved === "off" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setEnabled(false);
        enabledRef.current = false;
      }
    } catch {}
  }, []);

  const tone = useCallback((name: SoundName) => {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      const ctx = ctxRef.current ?? (ctxRef.current = new AC());
      if (ctx.state === "suspended") ctx.resume();
      const r = recipes[name];
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = r.type;
      osc.frequency.setValueAtTime(r.from, t);
      osc.frequency.exponentialRampToValueAtTime(r.to, t + r.ms / 1000);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(r.gain, t + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t + r.ms / 1000);
      osc.connect(g).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + r.ms / 1000 + 0.02);
    } catch {}
  }, []);

  const play = useCallback((name: SoundName) => {
    if (enabledRef.current) tone(name);
  }, [tone]);

  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);
    tone(next ? "on" : "off");
    try {
      localStorage.setItem("sound", next ? "on" : "off");
    } catch {}
  }, [tone]);

  // A soft pop for every button and link click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest("a, button");
      if (!el || el.hasAttribute("data-no-sound")) return;
      play("pop");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [play]);

  return <SoundContext.Provider value={{ enabled, toggle, play }}>{children}</SoundContext.Provider>;
}

export const useSound = () => useContext(SoundContext);

export function SoundToggle({ labels }: { labels: { on: string; off: string } }) {
  const { enabled, toggle } = useSound();
  return (
    <button
      type="button"
      data-no-sound
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? labels.off : labels.on}
      title={enabled ? labels.off : labels.on}
      className="boop grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" />
        {enabled ? (
          <>
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </>
        ) : (
          <path d="m16 9 6 6m0-6-6 6" />
        )}
      </svg>
    </button>
  );
}
