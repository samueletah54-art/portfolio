import { site } from "@/content/site";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = getAllPosts()
    .map(
      (p) => `    <item>
      <title>${esc(p.en.title)}</title>
      <link>${site.url}/blog/${p.slug}</link>
      <guid>${site.url}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${esc(p.en.subtitle || p.en.excerpt)}</description>
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.name}</title>
    <link>${site.url}</link>
    <description>Articles on web development, security, video editing and writing.</description>
    <language>en</language>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
