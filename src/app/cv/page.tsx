import type { Metadata } from "next";
import { CvView } from "@/views/Pages";

export const metadata: Metadata = { title: "CV", description: "Curriculum vitae of Samuel Praise ETAH.", alternates: { canonical: "/cv" } };
export default function Page() {
  return <CvView />;
}
