import { describe, it, expect } from "vitest";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";
import { whatsappLink, categories, projects, courses } from "@/content/site";
import { getAllPosts, getPost, getRelated } from "@/lib/posts";
import { splitInHalf } from "@/lib/mdx-split";

const keys = (o: object, pre = ""): string[] =>
  Object.entries(o).flatMap(([k, v]) => (v && typeof v === "object" ? keys(v, `${pre}${k}.`) : [`${pre}${k}`]));

describe("translations", () => {
  it("French has every English key", () => {
    expect(keys(fr).sort()).toEqual(keys(en).sort());
  });
  it("no French string is left empty", () => {
    const empty = keys(fr).filter((k) => k.split(".").reduce((o: any, p) => o[p], fr) === "");
    expect(empty).toEqual([]);
  });
});

describe("content", () => {
  it("builds a clean WhatsApp link", () => {
    expect(whatsappLink()).toBe("https://wa.me/237671857479");
    expect(whatsappLink("Hi there")).toContain("?text=Hi%20there");
  });
  it("has unique slugs", () => {
    for (const list of [categories, projects, courses]) {
      const slugs = list.map((x) => x.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });
});

describe("blog posts", () => {
  const posts = getAllPosts();
  it("loads posts newest first, each in both languages", () => {
    expect(posts.length).toBeGreaterThan(0);
    for (const p of posts) {
      expect(p.en.title).toBeTruthy();
      expect(p.fr.title).toBeTruthy();
      expect(categories.some((c) => c.slug === p.category)).toBe(true);
    }
    const dates = posts.map((p) => p.date);
    expect([...dates].sort().reverse()).toEqual(dates);
  });
  it("extracts headings for the table of contents", () => {
    const p = getPost("fast-websites-cameroon")!;
    expect(p.en.headings.map((h) => h.id)).toContain("1-shrink-your-images");
    expect(p.en.minutes).toBeGreaterThanOrEqual(1);
  });
  it("finds related posts without the post itself", () => {
    const p = posts[0];
    expect(getRelated(p).some((r) => r.slug === p.slug)).toBe(false);
  });
  it("splits a long post at a heading near the middle", () => {
    const body = ["Intro", "## A", "a", "## B", "b", "## C", "c", "## D", "d"].join("\n");
    const [a, b] = splitInHalf(body);
    expect(b.startsWith("## ")).toBe(true);
    expect(a.length).toBeGreaterThan(0);
  });
});
