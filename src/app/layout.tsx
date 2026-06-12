import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import { FloatingContact } from "@/components/floating-contact";
import { JsonLd } from "@/components/shared";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { SITE, SITE_URL } from "@/lib/config";
import "./globals.css";

/** Prevent stale prerendered HTML on Vercel CDN after deploys — Header must match on every route. */
export const dynamic = "force-dynamic";
export const revalidate = 0;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: SITE.tagline,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <head>
        <link rel="alternate" type="text/markdown" href={`${SITE_URL}/agents.md`} title="Agent Instructions" />
        <link rel="alternate" type="text/plain" href={`${SITE_URL}/llms.txt`} title="LLM Site Summary" />
        <link rel="describedby" href={`${SITE_URL}/.well-known/ai-site.json`} />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
