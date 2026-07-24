import type { Metadata } from "next";
import { getDictionary, getPages, LANGS } from "@/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Contact } from "@/components/sections/Contact";

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
    title: `${p.contact.hero.title} — Unitrans & Uniagent`,
    description: p.contact.hero.intro,
    alternates: {
      canonical: `/${lang}/contact`,
      languages: { en: "/en/contact", bg: "/bg/contact", "x-default": "/en/contact" },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const p = getPages(lang).contact;

  return (
    <>
      <Header dict={dict} lang={lang} />
      <main>
        <PageHero {...p.hero} image="/images/operations.webp" compact />

        {/* Contact form + details — the page's single focus, per client brief */}
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
