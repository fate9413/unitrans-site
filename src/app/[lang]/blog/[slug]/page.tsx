import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getDictionary, getPages, LANGS } from "@/content";
import { getAllPosts, getPostBySlug, type PostBlock } from "@/lib/cms";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/ui/CtaBand";

export function generateStaticParams() {
  return LANGS.flatMap((lang) => getAllPosts().map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const loc = lang === "bg" ? "bg" : "en";
  return {
    title: `${post[loc].title} — Unitrans & Uniagent`,
    description: post[loc].excerpt,
    alternates: {
      canonical: `/${lang}/blog/${slug}`,
      languages: {
        en: `/en/blog/${slug}`,
        bg: `/bg/blog/${slug}`,
        "x-default": `/en/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.cover, width: 1600, height: 1000, alt: post[loc].title }],
    },
  };
}

function Block({ block }: { block: PostBlock }) {
  switch (block.t) {
    case "h2":
      return <h2 className="mt-14 text-h3">{block.c}</h2>;
    case "p":
      return <p className="mt-6 text-[1.0625rem] leading-[1.8] text-slate">{block.c}</p>;
    case "ul":
      return (
        <ul className="mt-6 space-y-3">
          {block.c.map((li) => (
            <li key={li} className="flex items-start gap-4 text-[1.0625rem] leading-[1.7] text-slate">
              <span className="mt-[0.7em] h-[3px] w-5 shrink-0 bg-navy" aria-hidden />
              {li}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="font-display mt-10 border-l-2 border-navy pl-8 text-h4 leading-[1.4] text-ink">
          {block.c}
        </blockquote>
      );
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const dict = getDictionary(lang);
  const pages = getPages(lang);
  const p = pages.blog;
  const loc = lang === "bg" ? "bg" : "en";
  const fmt = new Intl.DateTimeFormat(lang === "bg" ? "bg-BG" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const others = getAllPosts().filter((x) => x.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post[loc].title,
        description: post[loc].excerpt,
        datePublished: post.date,
        image: `https://unitrans.bg${post.cover}`,
        inLanguage: lang === "bg" ? "bg" : "en",
        author: { "@type": "Organization", name: "Unitrans Ltd. & Uniagent Varna Ltd.", url: "https://unitrans.bg" },
        publisher: { "@id": "https://unitrans.bg/#org" },
        mainEntityOfPage: `https://unitrans.bg/${lang}/blog/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: pages.breadcrumbHome, item: `https://unitrans.bg/${lang}` },
          { "@type": "ListItem", position: 2, name: p.hero.kicker, item: `https://unitrans.bg/${lang}/blog` },
          { "@type": "ListItem", position: 3, name: post[loc].title },
        ],
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
      <main className="bg-paper">
        {/* Article header */}
        <div className="container-x pt-40 sm:pt-44">
          <a
            href={`/${lang}/blog`}
            className="link-slide micro inline-flex items-center gap-2 text-slate"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.2} />
            {p.back}
          </a>
          <div className="mx-auto mt-12 max-w-3xl">
            <p className="micro flex flex-wrap items-center gap-3 text-steel">
              <span className="border border-line px-2.5 py-1 text-navy">
                {p.categories[post.category]}
              </span>
              <span>{fmt.format(new Date(post.date))}</span>
              <span>· {post.minutes} {p.minRead}</span>
            </p>
            <h1 className="mt-6 text-h1 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              {post[loc].title}
            </h1>
            <p className="text-lede mt-6 text-slate">{post[loc].excerpt}</p>
          </div>
        </div>

        {/* Cover */}
        <div className="container-x mt-14">
          <div className="relative aspect-[21/9] overflow-hidden">
            <Image
              src={post.cover}
              alt={post[loc].title}
              fill
              priority
              sizes="90vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Body */}
        <article className="container-x pb-24 pt-4 sm:pb-32">
          <div className="mx-auto max-w-3xl">
            {post[loc].body.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </div>
        </article>

        {/* More articles */}
        <section className="border-t border-line">
          <div className="container-x py-20">
            <p className="micro mb-8 text-steel">{p.moreArticles}</p>
            <div className="grid gap-px border border-line bg-line sm:grid-cols-3">
              {others.map((o) => (
                <a
                  key={o.slug}
                  href={`/${lang}/blog/${o.slug}`}
                  className="group bg-paper p-7 transition-colors duration-300 hover:bg-mist/60"
                >
                  <p className="micro text-steel">{fmt.format(new Date(o.date))}</p>
                  <h3 className="font-display mt-4 text-h4 transition-colors duration-300 group-hover:text-navy">
                    {o[loc].title}
                  </h3>
                  <span className="micro mt-6 inline-flex items-center gap-2 text-navy">
                    {p.readMore}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.2} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <CtaBand content={pages.ctaBand} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
