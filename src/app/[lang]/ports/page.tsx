import type { Metadata } from "next";
import { getDictionary, getPages, LANGS } from "@/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { PortsMap } from "@/components/sections/PortsMap";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const p = getPages(lang);
  return {
    title: `${p.ports.hero.title} — Unitrans & Uniagent`,
    description: p.ports.hero.intro,
    alternates: { canonical: `/${lang}/ports`, languages: { en: "/en/ports", bg: "/bg/ports", "x-default": "/en/ports" } },
  };
}

export default async function PortsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const pages = getPages(lang);
  const p = pages.ports;

  return (
    <>
      <Header dict={dict} lang={lang} />
      <main>
        <PageHero {...p.hero} image="/images/cta.webp" />

        {/* Interactive port map — the page's single focus, per client brief */}
        <PortsMap dict={dict} />

        <CtaBand content={pages.ctaBand} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
