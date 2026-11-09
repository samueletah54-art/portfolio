import type { Metadata } from "next";
import { ContactView } from "@/views/Pages";

export const metadata: Metadata = { title: "Contact", description: "Hire Samuel ETAH: WhatsApp, email or the contact form.", alternates: { canonical: "/contact" } };
export default function Page() {
  return <ContactView />;
}
