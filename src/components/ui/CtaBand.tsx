import { ArrowRight } from "lucide-react";
import type { CtaBandContent } from "@/content/pages-types";

export function CtaBand({ content, lang }: { content: CtaBandContent; lang: string }) {
  return (
    <section className="bg-ink-deep text-white">
      <div className="container-x flex flex-col items-start justify-between gap-8 py-16 sm:py-20 lg:flex-row lg:items-center">
        <div>
          <p className="font-display text-h2">{content.title}</p>
          <p className="mt-3 max-w-xl text-white/60">{content.sub}</p>
        </div>
        <a
          href={`/${lang}/contact`}
          className="group inline-flex shrink-0 items-center gap-3 bg-white px-8 py-5 text-[0.9375rem] font-semibold text-ink transition-colors duration-300 hover:bg-mist"
        >
          {content.button}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
            strokeWidth={2.2}
          />
        </a>
      </div>
    </section>
  );
}
