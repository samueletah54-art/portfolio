import type { Metadata } from "next";
import { CoursesView } from "@/views/Pages";

export const metadata: Metadata = { title: "Courses", description: "Practical courses on HTML, CSS, JavaScript, web security and video editing. Coming soon.", alternates: { canonical: "/courses" } };
export default function Page() {
  return <CoursesView />;
}
