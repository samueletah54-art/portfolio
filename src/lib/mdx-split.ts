// Splits a post at the heading closest to its middle, so a newsletter box can sit mid-post.
export function splitInHalf(body: string): [string, string] {
  const lines = body.split("\n");
  let inCode = false;
  const heads: number[] = [];
  lines.forEach((l, i) => {
    if (l.startsWith("```")) inCode = !inCode;
    if (!inCode && /^##\s/.test(l)) heads.push(i);
  });
  if (heads.length < 3) return [body, ""];
  const mid = lines.length / 2;
  const at = heads.reduce((best, h) => (Math.abs(h - mid) < Math.abs(best - mid) ? h : best), heads[0]);
  return [lines.slice(0, at).join("\n"), lines.slice(at).join("\n")];
}
