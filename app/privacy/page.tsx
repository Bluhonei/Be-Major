import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legal } from "@/content/site";

export const metadata: Metadata = { title: legal.privacy.title, alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return <LegalPage {...legal.privacy} />;
}
