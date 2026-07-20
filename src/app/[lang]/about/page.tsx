import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary, getPages, LANGS } from "@/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Counter } from "@/components/ui/Counter";
import { SectionHead } from "@/components/ui/SectionHead";
import { TimelineSlider } from "@/components/pages/TimelineSlider";
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
    title: `${p.about.hero.title} — Unitrans & Uniagent`,
    description: p.about.hero.intro,
    alternates: { canonical: `/${lang}/about`, languages: { en: "/en/about", bg: "/bg/about", "x-default": "/en/about" } },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const p = getPages(lang).about;

  return (
    <>
      <Header dict={dict} lang={lang} />
      <main>
        <PageHero {...p.hero} image="/images/about.webp" />

        {/* Statement */}
        <section className="container-x section-pad">
          <p className="font-display max-w-5xl text-h2">
            <span className="text-steel">—</span> {p.statement}
          </p>
        </section>

        {/* Timeline slider */}
        <section className="border-t border-line bg-mist/50 py-20 sm:py-28">
          <div className="container-x mb-14">
            <SectionHead num="01" kicker={p.timelineKicker} title={p.timelineTitle} />
          </div>
          <TimelineSlider items={p.timeline} dragHint={p.dragHint} />
        </section>

        {/* Two companies */}
        <section className="container-x section-pad">
          <SectionHead
            num="02"
            kicker={p.companiesKicker}
            title={p.companiesTitle}
            sub={p.companiesIntro}
          />
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {p.companies.map((c) => {
              const isUnitrans = c.id === "unitrans";
              return (
                <article
                  key={c.id}
                  className={cn(
                    "relative border border-line p-8 sm:p-12",
                    "transition-colors duration-300 hover:bg-mist/50"
                  )}
                >
                  <span
                    className={cn(
                      "absolute left-0 top-0 h-full w-1",
                      isUnitrans ? "bg-green" : "bg-plum"
                    )}
                  />
                  <Image
                    src={isUnitrans ? "/logos/unitrans-color.png" : "/logos/uniagent-color.png"}
                    alt={c.name}
                    width={220}
                    height={58}
                    className="h-11 w-auto"
                  />
                  <p className="mt-8 text-[1.0625rem] leading-[1.7] text-slate">{c.desc}</p>
                  <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {c.roles.map((r, i) => (
                      <li
                        key={r}
                        className="flex items-center gap-4 border-b border-line pb-3"
                      >
                        <span
                          className={cn(
                            "micro tabular-nums",
                            isUnitrans ? "text-green" : "text-plum"
                          )}
                        >
                          0{i + 1}
                        </span>
                        <span className="text-[0.9375rem] font-medium">{r}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        {/* Numbers band */}
        <section className="bg-ink-deep text-white">
          <div className="container-x section-pad">
            <SectionHead num="03" kicker={p.numbersKicker} title={p.numbersTitle} dark />
            <div className="mt-16 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
              {p.numbers.map((n, i) => (
                <div key={i} className="bg-ink-deep p-6 sm:p-8">
                  <p className="font-display text-[clamp(2rem,3.5vw,3rem)] font-bold leading-none tracking-[-0.03em] tabular-nums">
                    <Counter value={n.value} suffix={n.suffix ?? ""} plain={n.plain} />
                  </p>
                  <p className="micro mt-3 text-white/50">{n.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strengths */}
        <section className="container-x section-pad">
          <SectionHead num="04" kicker={p.strengthsKicker} title={p.strengthsTitle} />
          <div className="mt-16 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {p.strengths.map((s, i) => (
              <div
                key={s.title}
                className="group border-b border-r border-line p-7 transition-colors duration-300 hover:bg-ink hover:text-white"
              >
                <p className="micro tabular-nums text-steel transition-colors duration-300 group-hover:text-white/50">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-6 text-h4">{s.title}</h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-slate transition-colors duration-300 group-hover:text-white/70">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <CtaBand content={getPages(lang).ctaBand} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
