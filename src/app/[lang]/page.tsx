import { getDictionary } from "@/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Operations } from "@/components/sections/Operations";
import { Cargo } from "@/components/sections/Cargo";
import { PortsMap } from "@/components/sections/PortsMap";
import { Clients } from "@/components/sections/Clients";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);

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
      {
        "@type": "FAQPage",
        mainEntity: dict.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
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
        <LogoMarquee dict={dict} />
        <About dict={dict} />
        <Services dict={dict} />
        <Process dict={dict} />
        <Operations dict={dict} />
        <Cargo dict={dict} />
        <PortsMap dict={dict} />
        <Clients dict={dict} />
        <Faq dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
