import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/cms";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://unitrans.bg";

const PAGES = ["", "/about", "/services", "/cargo", "/ports", "/blog", "/contact"];

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

  for (const post of getAllPosts()) {
    for (const lang of ["en", "bg"]) {
      entries.push({
        url: `${SITE_URL}/${lang}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        alternates: {
          languages: {
            en: `${SITE_URL}/en/blog/${post.slug}`,
            bg: `${SITE_URL}/bg/blog/${post.slug}`,
          },
        },
        priority: 0.6,
      });
    }
  }

  return entries;
}
