import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legal } from "@/content/site";

export const metadata: Metadata = { title: legal.terms.title, alternates: { canonical: "/terms" } };

export default function Terms() {
  return <LegalPage {...legal.terms} />;
}
