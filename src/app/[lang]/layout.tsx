import type { Metadata, Viewport } from "next";
import { redirect } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { getDictionary, LANGS } from "@/content";
import "../globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://unitrans.bg";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", bg: "/bg", "x-default": "/en" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${lang}`,
      siteName: "Unitrans & Uniagent Varna",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Unitrans & Uniagent — Your trusted partner in Bulgarian ports",
        },
      ],
      locale: lang === "bg" ? "bg_BG" : "en_US",
      alternateLocale: lang === "bg" ? "en_US" : "bg_BG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/og.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: { icon: "/icon.svg" },
    formatDetection: { telephone: true, email: true, address: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0b0d12",
  width: "device-width",
  initialScale: 1,
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  // Unknown top-level segments (e.g. /foo) land here as `lang` — send them home.
  if (!LANGS.includes(lang as (typeof LANGS)[number])) redirect("/en");
  return (
    <html lang={lang}>
      <head>
        <link
          rel="preload"
          href="/fonts/inter-tight-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-tight-cyrillic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
