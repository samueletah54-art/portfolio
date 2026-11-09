// <Callout> in a post: a highlighted note. <Callout type="warn"> for a warning.
export function Callout({ children, type = "note", title }: { children: React.ReactNode; type?: "note" | "warn"; title?: string }) {
  return (
    <aside className={`callout not-prose ${type === "warn" ? "callout-warn" : ""}`}>
      {title && <p className="font-display text-lg font-extrabold">{title}</p>}
      {children}
    </aside>
  );
}
