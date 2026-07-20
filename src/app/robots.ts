import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://unitrans.bg";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/cms/", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
