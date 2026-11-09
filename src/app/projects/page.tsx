import type { Metadata } from "next";
import { ProjectsView } from "@/views/Pages";

export const metadata: Metadata = { title: "Projects", description: "Websites and platforms built by Samuel ETAH.", alternates: { canonical: "/projects" } };
export default function Page() {
  return <ProjectsView />;
}
