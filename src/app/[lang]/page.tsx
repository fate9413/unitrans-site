import { getDictionary, getPages } from "@/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Operations } from "@/components/sections/Operations";
import { CtaBand } from "@/components/ui/CtaBand";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const pages = getPages(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": "https://unitrans.bg/#org",
        name: "Unitrans Ltd. & Uniagent Varna Ltd.",
        alternateName: ["Unitrans", "Uniagent Varna", "Юнитранс", "Униагент Варна"],
        url: "https://unitrans.bg",
        logo: "https://unitrans.bg/og.png",
        image: "https://unitrans.bg/og.png",
        email: dict.contact.info.email,
        telephone: dict.contact.info.phone,
        foundingDate: "1993",
        address: {
          "@type": "PostalAddress",
          streetAddress: "1, Vardar Str.",
          postalCode: "9000",
          addressLocality: "Varna",
          addressCountry: "BG",
        },
        areaServed: [
          "Varna", "Burgas", "Balchik", "Ruse", "Lom", "Svishtov",
          "Vidin", "Silistra", "Tutrakan", "Oryahovo", "Bulgaria",
        ],
        knowsLanguage: ["bg", "en"],
        openingHours: "Mo-Su 00:00-24:00",
        slogan: "Your trusted partner in Bulgarian ports",
        description: dict.meta.description,
        makesOffer: dict.services.items.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.short },
        })),
      },
      {
        "@type": "WebSite",
        "@id": "https://unitrans.bg/#website",
        url: "https://unitrans.bg",
        name: "Unitrans & Uniagent Varna",
        publisher: { "@id": "https://unitrans.bg/#org" },
        inLanguage: [lang === "bg" ? "bg" : "en"],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header dict={dict} lang={lang} />
      <main>
        <Hero dict={dict} />
        <About dict={dict} />
        <Services dict={dict} />
        <Operations dict={dict} />
        <CtaBand content={pages.ctaBand} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
