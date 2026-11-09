import type { Metadata } from "next";
import { UsesView } from "@/views/Pages";

export const metadata: Metadata = { title: "Uses", description: "The tools, hardware and software Samuel uses.", alternates: { canonical: "/uses" } };
export default function Page() {
  return <UsesView />;
}
