import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getDictionary, getPages, LANGS } from "@/content";
import { getAllPosts } from "@/lib/cms";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";

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
    title: `${p.blog.hero.title} — Unitrans & Uniagent`,
    description: p.blog.hero.intro,
    alternates: { canonical: `/${lang}/blog`, languages: { en: "/en/blog", bg: "/bg/blog", "x-default": "/en/blog" } },
  };
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const pages = getPages(lang);
  const p = pages.blog;
  const loc = lang === "bg" ? "bg" : "en";
  const fmt = new Intl.DateTimeFormat(lang === "bg" ? "bg-BG" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [featured, ...rest] = getAllPosts();

  return (
    <>
      <Header dict={dict} lang={lang} />
      <main>
        <PageHero {...p.hero} compact />

        {/* Featured */}
        <section className="container-x section-pad-t pb-16">
          <a
            href={`/${lang}/blog/${featured.slug}`}
            className="group grid gap-10 border border-line transition-colors duration-300 hover:bg-mist/50 lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
              <Image
                src={featured.cover}
                alt={featured[loc].title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-between gap-10 p-8 sm:p-12">
              <div>
                <p className="micro flex flex-wrap items-center gap-3 text-steel">
                  <span className="border border-line px-2.5 py-1 text-navy">
                    {p.categories[featured.category]}
                  </span>
                  <span>{fmt.format(new Date(featured.date))}</span>
                  <span>· {featured.minutes} {p.minRead}</span>
                </p>
                <h2 className="mt-6 text-h2">{featured[loc].title}</h2>
                <p className="text-lede mt-5 text-slate">{featured[loc].excerpt}</p>
              </div>
              <span className="micro inline-flex items-center gap-2 text-navy">
                {p.readMore}
                <ArrowRight className="h-4 w-4 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5" strokeWidth={2.2} />
              </span>
            </div>
          </a>
        </section>

        {/* List */}
        <section className="container-x section-pad-b">
          <p className="micro mb-6 text-steel">{p.all}</p>
          <div className="border-t border-line">
            {rest.map((post) => (
              <a
                key={post.slug}
                href={`/${lang}/blog/${post.slug}`}
                className="group grid gap-4 border-b border-line py-8 transition-colors duration-300 hover:bg-mist/50 sm:grid-cols-12 sm:items-center sm:gap-8"
              >
                <p className="micro text-steel sm:col-span-2">
                  {fmt.format(new Date(post.date))}
                </p>
                <p className="micro sm:col-span-2">
                  <span className="border border-line px-2.5 py-1 text-navy">
                    {p.categories[post.category]}
                  </span>
                </p>
                <div className="sm:col-span-7">
                  <h3 className="font-display text-h4 transition-colors duration-300 group-hover:text-navy">
                    {post[loc].title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">
                    {post[loc].excerpt}
                  </p>
                </div>
                <ArrowRight
                  className="hidden h-5 w-5 justify-self-end text-steel transition-all duration-300 group-hover:translate-x-1 group-hover:text-navy sm:block"
                  strokeWidth={2}
                />
              </a>
            ))}
          </div>
        </section>

        <CtaBand content={pages.ctaBand} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
