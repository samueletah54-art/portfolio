import type { Metadata, Viewport } from "next";
import { Nunito, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/content/site";
import { en } from "@/i18n/en";
import { getAllMeta } from "@/lib/posts";
import { LangProvider } from "@/components/LangProvider";
import { SoundProvider } from "@/components/Sound";
import { PostIndexProvider } from "@/components/PostIndex";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HireMe, WhatsAppFloat } from "@/components/Extras";
import { ServiceWorker } from "@/components/ServiceWorker";
import { Springs } from "@/components/Springs";
import "./globals.css";

const heading = Nunito({ variable: "--font-heading", subsets: ["latin"], weight: ["700", "800", "900"], display: "swap" });
const body = Inter_Tight({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const code = JetBrains_Mono({ variable: "--font-code", subsets: ["latin"], display: "swap" });

const description =
  "Samuel ETAH, web developer in Yaoundé, Cameroon. Fast, secure websites, articles about the web, and Vox-style video editing.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${en.tagline}`, template: `%s | ${site.name}` },
  description,
  applicationName: site.name,
  authors: [{ name: site.fullName, url: site.url }],
  alternates: { canonical: "/", types: { "application/rss+xml": "/rss.xml" } },
  openGraph: { type: "website", url: site.url, siteName: site.name, title: `${site.name} | ${en.tagline}`, description, locale: "en_GB", alternateLocale: ["fr_FR"] },
  twitter: { card: "summary_large_image", title: `${site.name} | ${en.tagline}`, description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1e2129" },
    { media: "(prefers-color-scheme: light)", color: "#f7faf6" },
  ],
};

// Runs before paint: saved theme first, then the system setting; dark when neither says light. No flash.
const themeScript = `try{var s=localStorage.getItem('theme');var l=s?s==='light':matchMedia('(prefers-color-scheme: light)').matches;if(l)document.documentElement.classList.remove('dark');var g=localStorage.getItem('lang');if(g==='fr')document.documentElement.lang='fr'}catch(e){}`;

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  alternateName: site.name,
  jobTitle: "Web developer",
  url: site.url,
  email: `mailto:${site.contact.email}`,
  telephone: site.contact.whatsapp,
  address: { "@type": "PostalAddress", addressLocality: "Yaoundé", addressCountry: "CM" },
  knowsLanguage: ["en", "fr", "de"],
  sameAs: [site.contact.github, site.contact.instagram, site.contact.x, site.contact.linkedin].filter(Boolean),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body className={`${heading.variable} ${body.variable} ${code.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-yellow focus:px-5 focus:py-3 focus:font-bold focus:text-yellow-fg"
        >
          {en.skip}
        </a>
        <LangProvider>
          <SoundProvider>
            <PostIndexProvider posts={getAllMeta()}>
              <Header />
              <main id="main" tabIndex={-1} className="outline-none">
                {children}
              </main>
              <HireMe />
              <Footer />
              <WhatsAppFloat />
            </PostIndexProvider>
          </SoundProvider>
        </LangProvider>
        <ServiceWorker />
        <Springs />
        <Analytics />
      </body>
    </html>
  );
}
