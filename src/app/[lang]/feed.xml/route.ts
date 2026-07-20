import { getAllPosts } from "@/lib/cms";
import { LANGS } from "@/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://unitrans.bg";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;
  const loc = lang === "bg" ? "bg" : "en";
  const posts = getAllPosts();

  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p[loc].title)}</title>
      <link>${SITE_URL}/${lang}/blog/${p.slug}</link>
      <guid>${SITE_URL}/${lang}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${esc(p[loc].excerpt)}</description>
    </item>`
    )
    .join("\n");

  const title =
    loc === "bg"
      ? "Юнитранс и Униагент — блог"
      : "Unitrans & Uniagent — blog";
  const desc =
    loc === "bg"
      ? "Практични материали за операциите в българските пристанища."
      : "Practical notes on Bulgarian port operations.";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(title)}</title>
    <link>${SITE_URL}/${lang}/blog</link>
    <description>${esc(desc)}</description>
    <language>${loc === "bg" ? "bg" : "en"}</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
