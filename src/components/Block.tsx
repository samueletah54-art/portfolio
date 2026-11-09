import { Reveal } from "./Reveal";

// A section in the right-hand column. On phones its small label sticks to the top while you scroll.
export function Block({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-label={label} className="mb-24 scroll-mt-24 md:mb-32 lg:scroll-mt-24">
      <div className="sticky top-16 z-20 -mx-5 mb-6 bg-bg/80 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8 lg:sr-only lg:relative lg:top-auto lg:mx-0 lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-fg">{label}</h2>
      </div>
      <Reveal>{children}</Reveal>
    </section>
  );
}
