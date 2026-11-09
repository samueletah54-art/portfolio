import type { Metadata } from "next";
import { BlogView } from "@/views/Pages";

export const metadata: Metadata = { title: "Blog", description: "Articles and tutorials on web development, security, video editing and writing.", alternates: { canonical: "/blog" } };
export default function Page() {
  return <BlogView />;
}
