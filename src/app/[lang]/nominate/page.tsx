import type { Metadata } from "next";
import { ArrowRight, FileDown } from "lucide-react";
import { getDictionary, getPages, LANGS } from "@/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { NominationForm } from "@/components/pages/NominationForm";

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
    title: `${p.nominate.hero.title} — Unitrans & Uniagent`,
    description: p.nominate.hero.intro,
    alternates: {
      canonical: `/${lang}/nominate`,
      languages: { en: "/en/nominate", bg: "/bg/nominate", "x-default": "/en/nominate" },
    },
  };
}

export default async function NominatePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const pages = getPages(lang);
  const p = pages.nominate;

  return (
    <>
      <Header dict={dict} lang={lang} />
      <main className="bg-mist/60">
        <PageHero {...p.hero} image="/images/hero.webp" compact />

        <div className="container-x section-pad">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <NominationForm dict={dict} pages={pages} lang={lang} />
              <p className="mt-6 text-[0.9375rem] text-slate">
                {p.form.freeFormNote}{" "}
                <a
                  href={`/${lang}/contact`}
                  className="link-slide font-medium text-navy"
                >
                  {p.form.freeFormCta} →
                </a>
              </p>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="border border-line bg-paper p-8">
                <p className="micro flex items-center gap-2 text-slate">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute h-full w-full animate-ping bg-green opacity-60" />
                    <span className="relative h-2 w-2 bg-green" />
                  </span>
                  {p.aside.dutyLabel}
                </p>
                <h2 className="font-display mt-5 text-h4">{p.aside.title}</h2>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-slate">{p.aside.text}</p>
                <dl className="mt-6 space-y-2 border-t border-line pt-5 text-[0.9375rem]">
                  <div>
                    <a
                      href={`mailto:${dict.contact.info.email}`}
                      className="link-slide font-medium text-ink"
                    >
                      {dict.contact.info.email}
                    </a>
                  </div>
                  <div>
                    <a
                      href={`tel:${dict.contact.info.phoneHref}`}
                      className="link-slide font-medium text-ink"
                    >
                      {dict.contact.info.phone}
                    </a>
                  </div>
                </dl>
              </div>

              <a
                href="/downloads/Unitrans-Uniagent-Presentation.pdf"
                download
                className="group mt-6 flex items-start gap-4 border border-line bg-paper p-6 transition-colors duration-300 hover:bg-ink hover:text-white"
              >
                <FileDown className="mt-1 h-5 w-5 shrink-0 text-navy transition-colors duration-300 group-hover:text-white" strokeWidth={1.8} />
                <span>
                  <span className="font-display block text-[0.9375rem] font-semibold">
                    {pages.downloads.presentationLabel}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] leading-relaxed text-slate transition-colors duration-300 group-hover:text-white/70">
                    {pages.downloads.presentationNote}
                  </span>
                </span>
                <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-steel transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" strokeWidth={2} />
              </a>
            </aside>
          </div>
        </div>
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
