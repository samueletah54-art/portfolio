import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/content/site";
import { BlogView } from "@/views/Pages";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = categories.find((x) => x.slug === slug);
  return c ? { title: c.name.en, description: c.blurb.en, alternates: { canonical: `/category/${c.slug}` } } : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!categories.some((c) => c.slug === slug)) notFound();
  return <BlogView category={slug} />;
}
