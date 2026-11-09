import type { Metadata } from "next";
import { StatusView } from "@/views/Pages";

export const metadata: Metadata = { title: "Offline", robots: { index: false } };
export default function Page() {
  return <StatusView kind="offline" />;
}
