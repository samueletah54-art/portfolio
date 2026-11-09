import { getAllPosts, getPost } from "@/lib/posts";
import { categories } from "@/content/site";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Article by Samuel ETAH";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  const cat = categories.find((c) => c.slug === p?.category);
  return ogImage({ kicker: cat?.name.en ?? "Blog", title: p?.en.title ?? "Samuel ETAH", sub: p?.en.subtitle, pose: "hero-sitting" });
}
