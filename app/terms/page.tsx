import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { brand, seo, terms } from "@/content/site";

export const metadata: Metadata = {
  title: terms.title,
  description: terms.description,
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: `${terms.title} — ${brand.name}`,
    description: terms.description,
    url: "/terms",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: seo.ogAlt }],
  },
};

export default function Page() {
  return <LegalPage page={terms} />;
}
