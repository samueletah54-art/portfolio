import Link from "next/link";

// My mark: a hand-drawn "S" on a pebble shape, with a yellow full stop (Samuel.).
// Drawn as one pen stroke on purpose, so it looks made by a person, not a font.
export function Mark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" className={`logo-mark shrink-0 ${className}`}>
      <path d="M32 4C50 3 61 14 60 32C59 50 48 61 31 60C14 59 3 48 4 31C5 14 15 5 32 4Z" fill="#166534" />
      <path d="M41.5 21.5C37.5 15 24.5 15.5 23.5 23.5C22.5 31 41 29.5 41 40C41 49 26.5 50.5 21 43" fill="none" stroke="#bbf7d0" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="48" cy="46.5" r="4" fill="#ffe14d" />
    </svg>
  );
}

// Mark + "Samuel ETAH". The mark tilts a little on hover.
export function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link href="/" className="logo group inline-flex shrink-0 items-center gap-2 whitespace-nowrap font-display font-extrabold tracking-tight" aria-label="Samuel ETAH, home">
      <Mark size={small ? 26 : 32} className="transition-transform duration-300 group-hover:-rotate-12" />
      <span className={`whitespace-nowrap ${small ? "text-lg" : "text-xl"}`}>
        Samuel <span className="text-accent">ETAH</span>
      </span>
    </Link>
  );
}
