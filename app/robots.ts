import type { MetadataRoute } from "next";
import { LAUNCHED, SITE_URL } from "@/config/site";

// Blocks everything until launch (config/site.ts LAUNCHED).
export default function robots(): MetadataRoute.Robots {
  if (!LAUNCHED) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
