import { Footer } from "@/components/footer";
import { Frame } from "@/components/frame";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/sections/about";
import { Join } from "@/components/sections/join";
import { Mission } from "@/components/sections/mission";
import { Pillars } from "@/components/sections/pillars";
import { Programs } from "@/components/sections/programs";
import { Vision } from "@/components/sections/vision";
import type { Metadata } from "next";
import { CONTACT_EMAIL, INSTAGRAM, LINKEDIN, PARENT_URL, SITE_URL } from "@/config/site";
import { brand, seo, ui } from "@/content/site";

// Self-referencing canonical. metadataBase (app/layout.tsx) resolves it to
// https://be-major.com/ on every deployment, matching og:url.
export const metadata: Metadata = { alternates: { canonical: "/" } };

// Organization only, never an NGO type (brand language rule).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo-dark.png`,
  slogan: brand.tagline,
  description: seo.description,
  email: CONTACT_EMAIL,
  sameAs: [INSTAGRAM.url, LINKEDIN.url],
  parentOrganization: { "@type": "Organization", name: brand.parent, ...(PARENT_URL ? { url: PARENT_URL } : {}) },
};

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 bg-[var(--color-white)] px-5 py-3 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:inline-flex focus:min-h-11 focus:items-center"
      >
        {ui.skipToContent}
      </a>
      <Header />
      <Frame />
      <main id="main">
        <Hero />
        <Vision />
        <Mission />
        <Pillars />
        <Programs />
        <About />
        <Join />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
