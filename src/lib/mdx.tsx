import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { Pre } from "@/components/PostExtras";
import { Sparkles } from "@/components/Sparkles";

// Turns a post's MDX text into React, with heading ids (for the contents list) and highlighted code.
export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: { pre: Pre, Sparkles },
    options: {
      mdxOptions: {
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: false }]],
      },
    },
  });
  return content;
}

export { splitInHalf } from "./mdx-split";
