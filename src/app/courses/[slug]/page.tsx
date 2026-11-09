import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courses } from "@/content/site";
import { CourseView } from "@/views/Pages";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = courses.find((x) => x.slug === slug);
  return c ? { title: c.title.en, description: c.promise.en, alternates: { canonical: `/courses/${c.slug}` } } : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!courses.some((c) => c.slug === slug)) notFound();
  return <CourseView slug={slug} />;
}
