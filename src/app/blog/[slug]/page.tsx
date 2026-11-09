import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, site, langs } from "@/content/site";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";
import { getAllPosts, getPost, getRelated } from "@/lib/posts";
import { renderMdx, splitInHalf } from "@/lib/mdx";
import { fmtDate } from "@/lib/format";
import { ReadingProgress, Toc, Share, Like } from "@/components/PostExtras";
import { Newsletter } from "@/components/Newsletter";
import { RelatedPosts } from "@/views/Related";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.en.title,
    description: p.en.subtitle || p.en.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.en.title, description: p.en.subtitle, publishedTime: p.date, authors: [site.fullName] },
    twitter: { card: "summary_large_image", title: p.en.title, description: p.en.subtitle },
  };
}

const dict = { en, fr };

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const cat = categories.find((c) => c.slug === p.category);
  const bodies = await Promise.all(
    langs.map(async (l) => {
      const [a, b] = splitInHalf(p[l].body);
      return { l, a: await renderMdx(a), b: b ? await renderMdx(b) : null };
    }),
  );
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.en.title,
    description: p.en.subtitle,
    datePublished: p.date,
    inLanguage: ["en", "fr"],
    author: { "@type": "Person", name: site.fullName, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${p.slug}`,
    image: `${site.url}/blog/${p.slug}/opengraph-image`,
  };

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-6xl px-5 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <header className="max-w-3xl">
          {langs.map((l) => (
            <div key={l} data-l={l}>
              <p className="text-sm font-semibold text-muted">
                <Link href="/blog" className="hover:text-accent">
                  ← {dict[l].post.back}
                </Link>
              </p>
              <p className="mt-6 text-sm font-semibold text-muted">
                <Link href={`/category/${p.category}`} className="text-accent hover:underline">
                  {cat?.name[l]}
                </Link>{" "}
                · <time dateTime={p.date}>{fmtDate(p.date, l)}</time> · {p[l].minutes} {dict[l].post.minRead}
              </p>
              <h1 className="mt-3 text-[clamp(2.1rem,6vw,3.6rem)] font-black leading-[1.05] tracking-tight">{p[l].title}</h1>
              {p[l].subtitle && <p className="mt-4 text-xl leading-relaxed text-muted">{p[l].subtitle}</p>}
            </div>
          ))}
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="min-w-0 max-w-3xl">
            {bodies.map(({ l, a, b }) => (
              <div key={l} data-l={l}>
                <div className="mb-8">
                  <Toc headings={p[l].headings} mobile />
                </div>
                <div className="prose-post">{a}</div>
                {b && (
                  <>
                    <Newsletter variant="inline" />
                    <div className="prose-post">{b}</div>
                  </>
                )}
              </div>
            ))}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-line py-6">
              <Like slug={p.slug} />
              {langs.map((l) => (
                <div key={l} data-l={l}>
                  <Share title={p[l].title} slug={p.slug} />
                </div>
              ))}
            </div>
            <Newsletter variant="inline" />
            <RelatedPosts posts={getRelated(p)} />
          </div>
          <div className="hidden lg:block">
            {langs.map((l) => (
              <div key={l} data-l={l} className="h-full">
                <Toc headings={p[l].headings} />
              </div>
            ))}
          </div>
        </div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
