import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import { LangProvider } from "@/components/LangProvider";
import { SoundProvider } from "@/components/Sound";
import "./globals.css";

const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.title.en}`, template: `%s | ${site.name}` },
  description: `${site.pitch.en} ${site.alsoLine.en}`,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} | ${site.title.en}`,
    description: site.pitch.en,
    siteName: site.name,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title: `${site.name} | ${site.title.en}`, description: site.pitch.en },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#2b1231" },
    { media: "(prefers-color-scheme: light)", color: "#fff6f9" },
  ],
};

// Runs before paint so the saved theme applies without a flash. Dark is the default.
const themeScript = `try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.remove('dark')}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${interTight.variable} ${jetbrainsMono.variable} noise antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
        >
          Skip to content
        </a>
        <LangProvider>
          <SoundProvider>{children}</SoundProvider>
        </LangProvider>
      </body>
    </html>
  );
}
