import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readFileSync } from "fs";
import path from "path";
import { getDictionary, LANGS } from "@/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const DOCS = ["privacy", "cookies", "terms"] as const;
type Doc = (typeof DOCS)[number];

interface LegalDoc {
  title: string;
  updated: string;
  intro: string;
  sections: { h: string; p: string[] }[];
}

function loadLegal(lang: string, doc: Doc): LegalDoc {
  const file = path.join(process.cwd(), "content", `legal-${lang === "bg" ? "bg" : "en"}.json`);
  return JSON.parse(readFileSync(file, "utf-8"))[doc];
}

export function generateStaticParams() {
  return LANGS.flatMap((lang) => DOCS.map((doc) => ({ lang, doc })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; doc: string }>;
}): Promise<Metadata> {
  const { lang, doc } = await params;
  if (!DOCS.includes(doc as Doc)) return {};
  const d = loadLegal(lang, doc as Doc);
  return {
    title: `${d.title} — Unitrans & Uniagent`,
    description: d.intro.slice(0, 155),
    alternates: {
      canonical: `/${lang}/${doc}`,
      languages: { en: `/en/${doc}`, bg: `/bg/${doc}`, "x-default": `/en/${doc}` },
    },
    robots: { index: false },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ lang: string; doc: string }>;
}) {
  const { lang, doc } = await params;
  if (!DOCS.includes(doc as Doc)) notFound();
  const dict = getDictionary(lang);
  const d = loadLegal(lang, doc as Doc);

  return (
    <>
      <Header dict={dict} lang={lang} />
      <main className="bg-paper">
        <div className="container-x max-w-4xl pb-24 pt-40 sm:pt-44">
          <p className="micro text-steel">{d.updated}</p>
          <h1 className="font-display mt-4 text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            {d.title}
          </h1>
          <p className="text-lede mt-6 text-slate">{d.intro}</p>
          <div className="mt-12 border-t border-line">
            {d.sections.map((s) => (
              <section key={s.h} className="border-b border-line py-8">
                <h2 className="font-display text-h4">{s.h}</h2>
                {s.p.map((para, i) => (
                  <p key={i} className="mt-4 text-[0.9875rem] leading-[1.75] text-slate">
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
