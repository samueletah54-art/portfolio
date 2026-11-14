import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "Samuel Etah — web developer, video editor, ghostwriter";
const description =
  "I build websites for small businesses, cut Vox-style explainer videos and write words people actually read. Based in Yaoundé, working with anyone.";

export const metadata: Metadata = {
  metadataBase: new URL("https://samuel-etah-portfolio.vercel.app"),
  title,
  description,
  openGraph: { title, description, type: "website", url: "/" },
  twitter: { card: "summary_large_image", site: "@samuel_izko", title, description },
};

export const viewport: Viewport = { themeColor: "#5E80B8" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;800;900&family=Rammetto+One&family=Fredoka:wght@600&family=La+Belle+Aurore&family=Caveat:wght@500;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
