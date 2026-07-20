import type { Metadata } from "next";
import { getDictionary, getPages, LANGS } from "@/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { SectionHead } from "@/components/ui/SectionHead";
import { CommodityExplorer } from "@/components/pages/CommodityExplorer";

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
    title: `${p.cargo.hero.title} — Unitrans & Uniagent`,
    description: p.cargo.hero.intro,
    alternates: { canonical: `/${lang}/cargo`, languages: { en: "/en/cargo", bg: "/bg/cargo", "x-default": "/en/cargo" } },
  };
}

export default async function CargoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const pages = getPages(lang);
  const p = pages.cargo;

  return (
    <>
      <Header dict={dict} lang={lang} />
      <main>
        <PageHero {...p.hero} image="/images/cargo.webp" />

        {/* Commodity explorer */}
        <section className="container-x section-pad">
          <SectionHead num="01" kicker={p.explorerKicker} title={p.explorerTitle} />
          <div className="mt-16">
            <CommodityExplorer items={p.commodities} hint={p.explorerHint} />
          </div>
        </section>

        {/* Additional cargo */}
        <section className="border-t border-line bg-mist/50">
          <div className="container-x section-pad">
            <SectionHead num="02" kicker={p.additionalKicker} title={p.additionalTitle} />
            <div className="mt-14 border-t border-line">
              {p.additional.map((a, i) => (
                <div
                  key={a.name}
                  className="group grid gap-2 border-b border-line py-6 transition-colors duration-300 hover:bg-paper sm:grid-cols-12 sm:items-baseline"
                >
                  <p className="micro tabular-nums text-steel sm:col-span-1 sm:pl-2">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-h4 sm:col-span-4">{a.name}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-slate sm:col-span-7">
                    {a.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ops note */}
        <section className="container-x section-pad">
          <div className="max-w-4xl border-l-2 border-green pl-8 sm:pl-12">
            <p className="micro text-steel">{p.opsNoteTitle}</p>
            <p className="font-display mt-6 text-h3 leading-[1.3]">{p.opsNote}</p>
          </div>
        </section>

        <CtaBand content={pages.ctaBand} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
