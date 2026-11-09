import Link from "next/link";

// "Samuel ETAH" wordmark with a little green squiggle that wiggles on hover.
export function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link href="/" className="logo group inline-flex items-center gap-1.5 whitespace-nowrap font-display font-extrabold tracking-tight" aria-label="Samuel ETAH, home">
      <span className={small ? "text-lg" : "text-xl"}>Samuel</span>
      <svg viewBox="0 0 28 16" width={small ? 20 : 24} height={small ? 12 : 14} aria-hidden="true" className="logo-squiggle text-accent">
        <path d="M2 10c3-6 6-6 8 0s5 6 8 0 6-6 8 0" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      </svg>
      <span className={`${small ? "text-lg" : "text-xl"} text-accent`}>ETAH</span>
    </Link>
  );
}
