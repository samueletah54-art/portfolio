import type { MetadataRoute } from "next";
import { site, categories, projects, courses } from "@/content/site";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${site.url}${p}`;
  const pages = ["", "/blog", "/projects", "/services", "/courses", "/about", "/contact", "/uses", "/now", "/cv", "/privacy"];
  return [
    ...pages.map((p) => ({ url: u(p), changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...getAllPosts().map((p) => ({ url: u(`/blog/${p.slug}`), lastModified: new Date(p.date), priority: 0.8 })),
    ...categories.map((c) => ({ url: u(`/category/${c.slug}`), priority: 0.5 })),
    ...projects.map((p) => ({ url: u(`/projects/${p.slug}`), priority: 0.6 })),
    ...courses.map((c) => ({ url: u(`/courses/${c.slug}`), priority: 0.6 })),
  ];
}
