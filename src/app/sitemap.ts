import type { MetadataRoute } from "next";
import { site, posts } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...posts.map((p) => ({ url: `${site.url}/writing/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
