import type { Metadata } from "next";
import { getDictionary, getPages, LANGS } from "@/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
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

const MAP_EMBED =
  "https://www.google.com/maps?q=1%20Vardar%20Street%2C%209000%20Varna%2C%20Bulgaria&output=embed&z=15";

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

        {/* How it starts */}
        <section className="container-x section-pad-t pb-20">
          <SectionHead num="01" kicker={p.stepsKicker} title={p.stepsTitle} />
          <ol className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-3">
            {p.steps.map((s, i) => (
              <li key={s.title} className="bg-paper p-8">
                <p className="font-display text-[2.5rem] font-bold leading-none tracking-[-0.03em] text-line">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-6 text-h4">{s.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Nomination banner */}
        <section className="container-x pb-16">
          <a
            href={`/${lang}/nominate`}
            className="group flex flex-col items-start justify-between gap-4 border border-navy bg-navy p-8 text-white transition-colors duration-300 hover:bg-navy-deep sm:flex-row sm:items-center"
          >
            <p className="text-lede max-w-2xl">{p.nominateBanner}</p>
            <span className="micro inline-flex shrink-0 items-center gap-2 bg-white px-5 py-3 text-ink">
              {p.nominateBannerCta}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </a>
        </section>

        {/* Form + info (flagship section reused) */}
        <Contact dict={dict} />

        {/* Office map */}
        <section className="border-t border-line">
          <div className="container-x section-pad">
            <SectionHead num="03" kicker={p.mapKicker} title={p.mapTitle} sub={p.mapAddress} />
            <iframe
              src={MAP_EMBED}
              title={p.mapTitle}
              loading="lazy"
              className="mt-12 block h-[26rem] w-full border border-line grayscale transition-[filter] duration-500 hover:grayscale-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
