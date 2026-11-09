import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts } from "@/content/site";
import { PostView } from "@/components/PostView";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title.en,
    description: post.summary.en,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: { type: "article", title: post.title.en, description: post.summary.en, publishedTime: post.date },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  return <PostView slug={post.slug} />;
}
