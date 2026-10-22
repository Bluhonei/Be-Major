import type { Metadata, Viewport } from "next";
import { INDEXABLE, SITE_URL } from "@/config/site";
import { brand, seo } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: seo.title, template: `%s — ${brand.name}` },
  description: seo.description,
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: seo.title,
    description: seo.description,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: seo.ogAlt }],
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: ["/og.png"] },
  robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#4a80cf" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Reveal styles only apply with JS, so no-JS visitors see everything. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
