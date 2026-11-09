import type { Metadata } from "next";
import { AboutView } from "@/views/Pages";

export const metadata: Metadata = { title: "About", description: "Who Samuel ETAH is: web developer in Yaoundé, Cameroon.", alternates: { canonical: "/about" } };
export default function Page() {
  return <AboutView />;
}
