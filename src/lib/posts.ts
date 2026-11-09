import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import type { Lang } from "@/content/site";

// Posts live in content/posts/<slug>/en.mdx and fr.mdx. To publish, add a folder with both files.
const DIR = path.join(process.cwd(), "content", "posts");

export type Heading = { depth: 2 | 3; text: string; id: string };
export type PostLang = {
  title: string;
  subtitle: string;
  excerpt: string;
  minutes: number;
  headings: Heading[];
  body: string;
};
export type Post = {
  slug: string;
  date: string;
  category: string;
  popular: boolean;
  en: PostLang;
  fr: PostLang;
};
export type PostMeta = Omit<Post, "en" | "fr"> & Record<Lang, Omit<PostLang, "body" | "headings">>;

function readLang(slug: string, lang: Lang, fallback?: string) {
  const file = path.join(DIR, slug, `${lang}.mdx`);
  const raw = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : fallback;
  if (!raw) throw new Error(`Missing ${slug}/${lang}.mdx`);
  const { data, content } = matter(raw);
  const plain = content.replace(/```[\s\S]*?```/g, " ").replace(/[#>*_`[\]()!-]/g, " ");
  const words = plain.split(/\s+/).filter(Boolean).length;
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inCode = false;
  for (const line of content.split("\n")) {
    if (line.startsWith("```")) inCode = !inCode;
    const m = !inCode && line.match(/^(##|###)\s+(.+)$/);
    if (m) {
      const text = m[2].replace(/[*_`]/g, "").trim();
      headings.push({ depth: m[1].length as 2 | 3, text, id: slugger.slug(text) });
    }
  }
  const firstPara = content.split("\n\n").find((p) => p.trim() && !p.startsWith("#") && !p.startsWith("```")) ?? "";
  return {
    data,
    lang: {
      title: String(data.title),
      subtitle: String(data.subtitle ?? ""),
      excerpt: String(data.excerpt ?? firstPara.replace(/\s+/g, " ").slice(0, 220)),
      minutes: Math.max(1, Math.ceil(words / 200)),
      headings,
      body: content,
    } satisfies PostLang,
    raw,
  };
}

let cache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const slugs = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((d) => fs.statSync(path.join(DIR, d)).isDirectory()) : [];
  const posts = slugs.map((slug) => {
    const en = readLang(slug, "en");
    const fr = readLang(slug, "fr", en.raw);
    return {
      slug,
      date: String(en.data.date),
      category: String(en.data.category ?? "general"),
      popular: Boolean(en.data.popular),
      en: en.lang,
      fr: fr.lang,
    };
  });
  cache = posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return cache;
}

export function getPost(slug: string) {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

export function toMeta(p: Post): PostMeta {
  const strip = ({ title, subtitle, excerpt, minutes }: PostLang) => ({ title, subtitle, excerpt, minutes });
  return { slug: p.slug, date: p.date, category: p.category, popular: p.popular, en: strip(p.en), fr: strip(p.fr) };
}

export function getAllMeta(): PostMeta[] {
  return getAllPosts().map(toMeta);
}

export function getRelated(p: Post, n = 3): PostMeta[] {
  const others = getAllPosts().filter((o) => o.slug !== p.slug);
  return [...others.filter((o) => o.category === p.category), ...others.filter((o) => o.category !== p.category)].slice(0, n).map(toMeta);
}
