import Link from "next/link";

// My mark: "SE" (Samuel ETAH) drawn as pen lines, with a yellow full stop.
// The lines are slightly uneven on purpose, like handwriting. They draw themselves when the page
// loads and again when you hover the logo.
export function Mark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="2 4 38 26" width={size * 1.4} height={size} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={`logo-mark shrink-0 ${className}`}>
      <path pathLength={1} d="M15.5 8.6C13 6.2 6.3 6.4 6.2 11.2C6.1 16.4 16.2 14.9 16 21.3C15.8 27.1 8.3 27.9 4.6 24.3" />
      <path pathLength={1} d="M33.5 7.8C29.6 7.2 25.4 7.4 22.9 8.3C22 14 22.1 19.8 23.1 25.6C26.6 26.4 30.1 26.3 33.4 25.5" />
      <path pathLength={1} d="M22.6 16.6C25.3 16.2 28 16.3 30.4 16.9" />
      <circle cx="37.6" cy="25.2" r="1.9" fill="var(--yellow)" stroke="none" className="logo-dot" />
    </svg>
  );
}

// Mark + "Samuel ETAH". The mark tilts a little on hover.
export function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link href="/" className="logo group inline-flex shrink-0 items-center gap-2 whitespace-nowrap font-display font-extrabold tracking-tight" aria-label="Samuel ETAH, home">
      <Mark size={small ? 26 : 32} className="text-fg" />
      <span className={`whitespace-nowrap ${small ? "text-lg" : "text-xl"}`}>
        Samuel <span className="text-accent">ETAH</span>
      </span>
    </Link>
  );
}
