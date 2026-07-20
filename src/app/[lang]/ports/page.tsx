import type { Metadata } from "next";
import { Anchor, ExternalLink, Radio } from "lucide-react";
import { getDictionary, getPages, LANGS } from "@/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { SectionHead } from "@/components/ui/SectionHead";
import { PortsMap } from "@/components/sections/PortsMap";
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
    title: `${p.ports.hero.title} — Unitrans & Uniagent`,
    description: p.ports.hero.intro,
    alternates: { canonical: `/${lang}/ports`, languages: { en: "/en/ports", bg: "/bg/ports", "x-default": "/en/ports" } },
  };
}

// AIS map centred between Varna and Burgas, covering Bulgarian territorial waters.
const AIS_EMBED = "https://www.vesselfinder.com/aismap?zoom=8&lat=42.85&lon=28.4&names=true";
const AIS_FULL = "https://www.vesselfinder.com/?zoom=8&lat=42.85&lon=28.4";

export default async function PortsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const pages = getPages(lang);
  const p = pages.ports;
  const sea = dict.ports.ports.filter((x) => x.type === "sea");
  const river = dict.ports.ports.filter((x) => x.type === "river");

  return (
    <>
      <Header dict={dict} lang={lang} />
      <main>
        <PageHero {...p.hero} image="/images/cta.webp" />

        {/* Interactive map (reused flagship component) */}
        <PortsMap dict={dict} />

        {/* Directory */}
        <section className="border-t border-line">
          <div className="container-x section-pad">
            <SectionHead num="02" kicker={p.directoryKicker} title={p.directoryTitle} />
            <div className="mt-16 grid gap-16 lg:grid-cols-2">
              {[
                { title: p.seaTitle, list: sea, accent: "text-navy", accentBg: "bg-navy" },
                { title: p.riverTitle, list: river, accent: "text-green", accentBg: "bg-green" },
              ].map((group) => (
                <div key={group.title}>
                  <p className={cn("micro mb-6 flex items-center gap-3", group.accent)}>
                    <Anchor className="h-4 w-4" strokeWidth={2} />
                    {group.title}
                  </p>
                  <div className="border-t border-line">
                    {group.list.map((port) => (
                      <article key={port.id} className="border-b border-line py-6">
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="font-display text-h4">
                            {port.name}
                            {port.id === "varna" && (
                              <span className="micro ml-3 bg-ink px-2 py-1 align-middle text-paper">
                                {dict.ports.hqBadge}
                              </span>
                            )}
                          </h3>
                          <span className={cn("h-2 w-2 shrink-0", group.accentBg)} aria-hidden />
                        </div>
                        <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-slate">
                          {port.desc}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {port.tags.map((t) => (
                            <span
                              key={t}
                              className="micro border border-line px-2.5 py-1.5 text-slate"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live vessel tracking */}
        <section className="bg-ink-deep text-white">
          <div className="container-x section-pad">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead num="03" kicker={p.tracking.kicker} title={p.tracking.title} dark />
                <p className="mt-7 text-[1.0625rem] leading-[1.7] text-white/65">
                  {p.tracking.intro}
                </p>
                <ul className="mt-8 space-y-4">
                  {p.tracking.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[0.9375rem] text-white/80">
                      <Radio className="mt-0.5 h-4 w-4 shrink-0 text-green" strokeWidth={2} />
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href={AIS_FULL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-slide micro mt-10 inline-flex items-center gap-2 text-white/70 hover:text-white"
                >
                  {p.tracking.openFull}
                  <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                </a>
              </div>
              <div className="lg:col-span-8">
                <div className="flex items-center justify-between border border-b-0 border-white/15 px-5 py-3">
                  <span className="micro text-white/55">{p.tracking.mapLabel}</span>
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute h-full w-full animate-ping bg-green opacity-60" />
                      <span className="relative h-2 w-2 bg-green" />
                    </span>
                    <span className="micro text-white/55">LIVE</span>
                  </span>
                </div>
                <iframe
                  src={AIS_EMBED}
                  title={p.tracking.mapLabel}
                  loading="lazy"
                  className="block h-[32rem] w-full border border-white/15 bg-[#0e1526]"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <p className="micro mt-4 max-w-3xl leading-relaxed text-white/40">
                  {p.tracking.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </section>

        <CtaBand content={pages.ctaBand} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
