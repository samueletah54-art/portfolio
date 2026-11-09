"use client";

import { createContext, useContext } from "react";
import type { PostMeta } from "@/lib/posts";

// Post titles and summaries, handed down from the server so client parts (search, lists) can use them.
const Ctx = createContext<PostMeta[]>([]);
export const PostIndexProvider = ({ posts, children }: { posts: PostMeta[]; children: React.ReactNode }) => (
  <Ctx.Provider value={posts}>{children}</Ctx.Provider>
);
export const usePosts = () => useContext(Ctx);
