import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/site";
import { CaseStudyView } from "@/views/Pages";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.name}: case study`, description: p.summary.en, alternates: { canonical: `/projects/${p.slug}` } } : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!projects.some((p) => p.slug === slug)) notFound();
  return <CaseStudyView slug={slug} />;
}
