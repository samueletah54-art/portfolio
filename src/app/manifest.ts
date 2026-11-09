import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Samuel ETAH",
    short_name: "Samuel ETAH",
    description: "Code. Secure. Create. Web development, security and video editing from Yaoundé.",
    start_url: "/",
    display: "standalone",
    background_color: "#1e2129",
    theme_color: "#1e2129",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
