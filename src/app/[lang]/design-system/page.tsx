import type { Metadata } from "next";
import Link from "next/link";
import { LANGS } from "@/content";

export const metadata: Metadata = {
  title: "Design System — Unitrans & Uniagent",
  robots: { index: false },
};

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

const colors = [
  { name: "ink", vaR: "--color-ink", hex: "#0B0D12", usage: "Text. All of it." },
  { name: "ink-deep", vaR: "--color-ink-deep", hex: "#0A0E1A", usage: "Dark sections, footer" },
  { name: "paper", vaR: "--color-paper", hex: "#FFFFFF", usage: "Background" },
  { name: "mist", vaR: "--color-mist", hex: "#F5F6F8", usage: "Subtle panels" },
  { name: "line", vaR: "--color-line", hex: "#E7E9EE", usage: "Hairlines, borders" },
  { name: "steel", vaR: "--color-steel", hex: "#9AA1AE", usage: "Tertiary text, numbers" },
  { name: "slate", vaR: "--color-slate", hex: "#5B6472", usage: "Secondary text" },
  { name: "navy", vaR: "--color-navy", hex: "#283668", usage: "Primary accent — CTA, active states, sea ports" },
  { name: "green", vaR: "--color-green", hex: "#2A7C40", usage: "Unitrans marker, river ports, success" },
  { name: "plum", vaR: "--color-plum", hex: "#884C80", usage: "Uniagent marker. Nothing else." },
];

const type = [
  { token: "text-display", size: "clamp(44 → 104px)", spec: "Inter Tight 700 · lh 0.98 · ls −0.04em", sample: "Aa Бб 09" },
  { token: "text-h2", size: "clamp(32 → 64px)", spec: "Inter Tight 650 · lh 1.04 · ls −0.035em", sample: "Aa Бб 09" },
  { token: "text-h3", size: "clamp(24 → 36px)", spec: "Inter Tight 600 · lh 1.12 · ls −0.025em", sample: "Aa Бб 09" },
  { token: "text-h4", size: "clamp(18 → 22px)", spec: "Inter Tight 600 · lh 1.25 · ls −0.015em", sample: "Aa Бб 09" },
  { token: "text-lede", size: "clamp(17 → 21px)", spec: "Inter 400 · lh 1.55", sample: "Aa Бб 09" },
  { token: "base", size: "16px", spec: "Inter 400 · lh 1.6", sample: "Aa Бб 09" },
  { token: "micro", size: "12px", spec: "Inter 550 · UPPERCASE · ls +0.14em", sample: "AA ББ 09" },
];

const space = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 176];

const motionTokens = [
  { name: "--ease-out-expo", value: "cubic-bezier(0.16, 1, 0.3, 1)", usage: "Everything that moves into place" },
  { name: "--ease-in-out-circ", value: "cubic-bezier(0.65, 0, 0.35, 1)", usage: "Symmetric transitions" },
  { name: "spring / panel", value: "stiffness 170 · damping 26", usage: "Panels, layout shifts" },
  { name: "spring / snappy", value: "stiffness 420 · damping 34", usage: "Indicators, small UI" },
  { name: "--duration-fast", value: "200ms", usage: "Hover states" },
  { name: "--duration-base", value: "450ms", usage: "Standard transitions" },
  { name: "--duration-slow", value: "800ms", usage: "Images, large surfaces" },
];

function SectionTitle({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <div className="micro mb-10 flex items-baseline gap-4 text-slate">
      <span className="text-steel">{num}</span>
      <span className="h-px w-10 self-center bg-line" />
      <span>{children}</span>
    </div>
  );
}

export default async function DesignSystemPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <main className="bg-paper text-ink">
      {/* Header */}
      <header className="border-b border-line">
        <div className="container-x flex h-[4.5rem] items-center justify-between">
          <Link href={`/${lang}`} className="micro link-slide text-slate">
            ← Unitrans & Uniagent
          </Link>
          <span className="micro text-steel">Design System · v2.0</span>
        </div>
      </header>

      <div className="container-x section-pad">
        <h1 className="text-display">Design<br />System.</h1>
        <p className="text-lede mt-8 max-w-2xl text-slate">
          {lang === "bg"
            ? "Токените, върху които е изграден сайтът: цвят, типография, спейсинг, грид и движение. Черно-бял текст, много бяло пространство, цветовете от двете лога — само като акценти."
            : "The tokens the site is built on: color, typography, spacing, grid and motion. Black-and-white text, generous whitespace, the two logo colors used strictly as accents."}
        </p>

        {/* 01 Color */}
        <section className="mt-28">
          <SectionTitle num="01">Color</SectionTitle>
          <div className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-5">
            {colors.map((c) => (
              <div key={c.name} className="border-b border-r border-line">
                <div className="h-28 border-b border-line" style={{ background: c.hex }} />
                <div className="p-4">
                  <p className="font-display text-[0.9375rem] font-semibold">{c.name}</p>
                  <p className="micro mt-1 text-steel">{c.hex}</p>
                  <p className="mt-2 text-[0.8125rem] leading-snug text-slate">{c.usage}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="micro mt-6 max-w-3xl text-slate">
            Rule: text is only ever ink / slate / steel on paper — or white on dark. Navy, green
            and plum never exceed ~5% of any viewport.
          </p>
        </section>

        {/* 02 Typography */}
        <section className="mt-28">
          <SectionTitle num="02">Typography — Inter Tight (display) · Inter (body)</SectionTitle>
          <div className="border-t border-line">
            {type.map((t) => (
              <div
                key={t.token}
                className="grid items-baseline gap-4 border-b border-line py-6 sm:grid-cols-12"
              >
                <div className="sm:col-span-3">
                  <p className="micro text-navy">{t.token}</p>
                  <p className="micro mt-1 text-steel">{t.size}</p>
                  <p className="micro mt-0.5 text-steel">{t.spec}</p>
                </div>
                <p
                  className={`sm:col-span-9 ${
                    t.token === "micro" ? "micro" : `text-${t.token.replace("text-", "")}`
                  }`}
                  style={t.token === "base" ? {} : undefined}
                >
                  {t.sample} — Вашият партньор в българските пристанища
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 03 Spacing */}
        <section className="mt-28">
          <SectionTitle num="03">Spacing — 4px base scale</SectionTitle>
          <div className="space-y-3">
            {space.map((s) => (
              <div key={s} className="flex items-center gap-6">
                <span className="micro w-12 tabular-nums text-steel">{s}</span>
                <div className="h-5 bg-navy/90" style={{ width: s }} />
              </div>
            ))}
          </div>
          <p className="micro mt-8 max-w-3xl text-slate">
            Section rhythm: clamp(96 → 176px). Container: max-width 1440px · inline padding
            clamp(20 → 80px).
          </p>
        </section>

        {/* 04 Grid */}
        <section className="mt-28">
          <SectionTitle num="04">Grid — 12 columns, fluid gutters</SectionTitle>
          <div className="grid grid-cols-4 gap-[clamp(0.75rem,1.5vw,2rem)] sm:grid-cols-8 lg:grid-cols-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`flex h-24 items-end justify-center bg-mist pb-2 ${
                  i >= 8 ? "hidden lg:flex" : i >= 4 ? "hidden sm:flex" : "flex"
                }`}
              >
                <span className="micro text-steel">{i + 1}</span>
              </div>
            ))}
          </div>
          <p className="micro mt-6 max-w-3xl text-slate">
            Breakpoints: 640 · 768 · 1024 · 1280 · 1536. Mobile 4 cols, tablet 8, desktop 12.
          </p>
        </section>

        {/* 05 Motion */}
        <section className="mt-28">
          <SectionTitle num="05">Motion</SectionTitle>
          <div className="border-t border-line">
            {motionTokens.map((m) => (
              <div key={m.name} className="grid gap-2 border-b border-line py-5 sm:grid-cols-12">
                <p className="micro text-navy sm:col-span-3">{m.name}</p>
                <p className="micro tabular-nums text-ink sm:col-span-4">{m.value}</p>
                <p className="micro text-slate sm:col-span-5">{m.usage}</p>
              </div>
            ))}
          </div>
          <p className="micro mt-6 max-w-3xl text-slate">
            Principle: no scroll-triggered fade-up reveals. Motion is earned — it responds to the
            user (hover, drag, click, scroll-scrub) or communicates state. prefers-reduced-motion
            is always respected.
          </p>
        </section>

        {/* 06 Components */}
        <section className="mt-28">
          <SectionTitle num="06">Core components</SectionTitle>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="border border-line p-8">
              <p className="micro mb-6 text-steel">Buttons</p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-3 bg-ink px-7 py-4 text-[0.9375rem] font-semibold text-paper">
                  Primary →
                </span>
                <span className="inline-flex items-center gap-3 border border-ink/25 px-7 py-4 text-[0.9375rem] font-semibold">
                  Outline →
                </span>
                <span className="micro border border-line px-3 py-2 text-slate">CHIP</span>
              </div>
              <p className="micro mt-6 text-slate">
                Square corners. Magnetic hover. Arrow slides on hover. Primary hovers to navy.
              </p>
            </div>
            <div className="border border-line p-8">
              <p className="micro mb-6 text-steel">Form fields</p>
              <div className="max-w-sm">
                <p className="micro text-slate">Label</p>
                <div className="border-b border-line py-3.5 text-steel">Placeholder value</div>
                <div className="mt-4 border-b-2 border-ink py-3.5">Focused value</div>
              </div>
              <p className="micro mt-6 text-slate">
                Underline fields. Focus = ink border. Errors in #B4232A only.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-28 border-t border-line pt-8">
          <Link href={`/${lang}`} className="micro link-slide text-slate">
            ← {lang === "bg" ? "Обратно към сайта" : "Back to the site"}
          </Link>
        </footer>
      </div>
    </main>
  );
}
