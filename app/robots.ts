import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/config/site";

// Blocks everything except the launched production site (config/site.ts INDEXABLE).
export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
