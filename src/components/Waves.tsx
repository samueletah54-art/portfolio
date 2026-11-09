// Decorative purple and pink waves fixed to the bottom of the screen. Two layers drift slowly in
// opposite directions; they stop for visitors who prefer reduced motion.
const path =
  "M0 60 C 150 20 300 100 450 60 S 750 20 900 60 S 1200 100 1350 60 S 1650 20 1800 60 V 200 H 0 Z";

export function Waves() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[24vh] overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--wave-a), transparent 60%)" }} />
      <svg className="wave absolute bottom-0 left-0 h-[55%] w-[200%]" viewBox="0 0 1800 200" preserveAspectRatio="none">
        <path d={path} fill="var(--wave-a)" />
      </svg>
      <svg className="wave wave-2 absolute bottom-0 left-0 h-[40%] w-[200%]" viewBox="0 0 1800 200" preserveAspectRatio="none">
        <path d={path} fill="var(--wave-b)" />
      </svg>
    </div>
  );
}
