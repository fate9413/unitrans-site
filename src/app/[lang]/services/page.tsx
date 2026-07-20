import type { Metadata } from "next";
import Image from "next/image";
import { Plus } from "lucide-react";
import { getDictionary, getPages, LANGS } from "@/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/utils";

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
    title: `${p.services.hero.title} — Unitrans & Uniagent`,
    description: p.services.hero.intro,
    alternates: {
      canonical: `/${lang}/services`,
      languages: { en: "/en/services", bg: "/bg/services", "x-default": "/en/services" },
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const pages = getPages(lang);
  const p = pages.services;

  // Bullet points come from the homepage dictionary (same source of truth).
  const pointsFor = (id: string) =>
    dict.services.items.find((s) => s.id === id)?.points ?? [];

  return (
    <>
      <Header dict={dict} lang={lang} />
      <main>
        <PageHero {...p.hero} image="/images/services.webp" />

        {/* In-page nav */}
        <nav
          className="sticky top-[4.5rem] z-30 border-b border-line bg-paper/95"
          aria-label={p.navLabel}
        >
          <div className="container-x flex items-center gap-6 overflow-x-auto py-4">
            <span className="micro hidden shrink-0 text-steel sm:block">{p.navLabel}</span>
            {p.items.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="link-slide micro shrink-0 text-slate hover:text-ink"
              >
                <span className="mr-2 text-steel">0{i + 1}</span>
                {item.name}
              </a>
            ))}
          </div>
        </nav>

        {/* Service blocks */}
        {p.items.map((item, i) => {
          const even = i % 2 === 0;
          const accent = item.company === "unitrans" ? "text-green" : "text-plum";
          const accentBg = item.company === "unitrans" ? "bg-green" : "bg-plum";
          return (
            <section
              key={item.id}
              id={item.id}
              className={cn(
                "scroll-mt-32 border-t border-line",
                even ? "" : "bg-mist/50"
              )}
            >
              <div className="container-x section-pad">
                <div className="grid items-start gap-12 lg:grid-cols-12">
                  {/* Text */}
                  <div className={cn("lg:col-span-6", even ? "" : "lg:order-2 lg:col-start-7")}>
                    <p
                      className="font-display select-none text-[clamp(4rem,8vw,7rem)] font-bold leading-none tracking-[-0.05em] text-transparent"
                      style={{ WebkitTextStroke: "1.5px #e7e9ee" }}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className={cn("micro -mt-4 flex items-center gap-3", accent)}>
                      <span className={cn("h-2 w-2", accentBg)} />
                      {item.companyLabel}
                    </p>
                    <h2 className="mt-5 text-h2">{item.name}</h2>
                    <p className="text-lede mt-5 text-ink">{item.lead}</p>
                    <p className="mt-6 text-[1.0625rem] leading-[1.7] text-slate">{item.p1}</p>
                    <p className="mt-4 text-[1.0625rem] leading-[1.7] text-slate">{item.p2}</p>
                  </div>

                  {/* Image + points */}
                  <div className={cn("lg:col-span-5", even ? "lg:col-start-8" : "lg:col-start-1")}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="micro mb-4 mt-8 text-steel">{item.pointsTitle}</p>
                    <ul>
                      {pointsFor(item.id).map((pt) => (
                        <li
                          key={pt}
                          className="flex items-center gap-3 border-b border-line py-3"
                        >
                          <Plus className="h-3.5 w-3.5 shrink-0 text-navy" strokeWidth={2.5} />
                          <span className="text-[0.9375rem]">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Compact process strip */}
        <section className="border-t border-line">
          <div className="container-x section-pad">
            <SectionHead num="05" kicker={p.processKicker} title={p.processTitle} />
            <ol className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-7">
              {dict.process.steps.map((s, i) => (
                <li key={s.name} className="bg-paper p-5">
                  <p className="micro tabular-nums text-navy">{String(i + 1).padStart(2, "0")}</p>
                  <p className="font-display mt-3 text-[0.9375rem] font-semibold leading-snug">
                    {s.name}
                  </p>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-slate">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <CtaBand content={pages.ctaBand} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
