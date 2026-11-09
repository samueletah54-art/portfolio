import type { Metadata } from "next";
import { NowView } from "@/views/Pages";

export const metadata: Metadata = { title: "Now", description: "What Samuel is working on this month.", alternates: { canonical: "/now" } };
export default function Page() {
  return <NowView />;
}
