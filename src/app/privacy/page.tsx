import type { Metadata } from "next";
import { PrivacyView } from "@/views/Pages";

export const metadata: Metadata = { title: "Privacy", description: "How this site handles your data.", alternates: { canonical: "/privacy" } };
export default function Page() {
  return <PrivacyView />;
}
