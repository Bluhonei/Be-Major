import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { brand, seo, privacy } from "@/content/site";

export const metadata: Metadata = {
  title: privacy.title,
  description: privacy.description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: `${privacy.title} — ${brand.name}`,
    description: privacy.description,
    url: "/privacy",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: seo.ogAlt }],
  },
};

export default function Page() {
  return <LegalPage page={privacy} />;
}
