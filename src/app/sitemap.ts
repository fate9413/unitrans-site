import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://unitrans.bg";

// Blog is hidden pre-launch at the client's request — excluded here.
const PAGES = ["", "/about", "/services", "/cargo", "/ports", "/contact", "/nominate"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const page of PAGES) {
    for (const lang of ["en", "bg"]) {
      entries.push({
        url: `${SITE_URL}/${lang}${page}`,
        lastModified: now,
        alternates: {
          languages: {
            en: `${SITE_URL}/en${page}`,
            bg: `${SITE_URL}/bg${page}`,
          },
        },
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
