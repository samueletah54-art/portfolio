import type { Metadata } from "next";
import { ServicesView } from "@/views/Pages";

export const metadata: Metadata = { title: "Services", description: "Web development, website redesign, security audits and video editing.", alternates: { canonical: "/services" } };
export default function Page() {
  return <ServicesView />;
}
