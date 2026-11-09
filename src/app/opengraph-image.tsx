import { ogImage, ogSize } from "@/lib/og";

export const alt = "Samuel ETAH: Code. Secure. Create.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ kicker: "Web developer · Yaoundé, Cameroon", title: "Fast, secure websites, built for the phones people use.", pose: "wave" });
}
