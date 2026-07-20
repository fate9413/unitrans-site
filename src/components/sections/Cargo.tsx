"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/content";

export function Cargo({ dict }: { dict: Dictionary }) {
  const { cargo } = dict;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: false,
  });
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    setProgress(Math.max(0, Math.min(1, emblaApi.scrollProgress())));
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on("scroll", onScroll).on("select", onScroll).on("reInit", onScroll);
  }, [emblaApi, onScroll]);

  return (
    <section id="cargo" className="border-t border-line">
      <div className="container-x section-pad-t pb-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHead
              num={cargo.num}
              kicker={cargo.kicker}
              title={cargo.title}
            />
            <p className="text-lede mt-8 max-w-2xl text-slate">{cargo.intro}</p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="micro mb-4 text-steel">{cargo.agriTitle}</p>
            <div className="flex flex-wrap gap-2">
              {cargo.agri.map((c) => (
                <span
                  key={c}
                  className="cursor-default border border-line px-4 py-2.5 text-[0.9375rem] font-medium transition-colors duration-300 hover:border-green hover:bg-green hover:text-white"
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="micro mb-4 mt-8 text-steel">{cargo.addTitle}</p>
            <div className="flex flex-wrap gap-2">
              {cargo.add.map((c) => (
                <span
                  key={c}
                  className="cursor-default border border-line px-4 py-2.5 text-[0.9375rem] font-medium text-slate transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-10 border-l-2 border-green pl-5 text-[0.9375rem] leading-relaxed text-slate">
              {cargo.note}
            </p>
            {cargo.moreLink && (
              <a
                href={`/${dict.locale}/cargo`}
                className="link-slide micro mt-8 inline-block text-navy"
              >
                {cargo.moreLink} →
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="section-pad-b">
        <div
          className="cursor-grab overflow-hidden active:cursor-grabbing"
          ref={emblaRef}
        >
          <div className="flex touch-pan-y gap-5 pl-[clamp(1.25rem,5vw,5rem)]">
            {cargo.slides.map((s, i) => (
              <figure
                key={i}
                className="relative min-w-0 flex-[0_0_82%] sm:flex-[0_0_58%] lg:flex-[0_0_44%]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                  <Image
                    src={s.src}
                    alt={s.caption}
                    fill
                    sizes="(min-width: 1024px) 44vw, 82vw"
                    className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="micro mt-3 flex items-baseline gap-3 text-slate">
                  <span className="tabular-nums text-steel">
                    0{i + 1}
                  </span>
                  {s.caption}
                </figcaption>
              </figure>
            ))}
            <div className="flex-[0_0_2rem]" aria-hidden />
          </div>
        </div>

        <div className="container-x mt-10 flex items-center justify-between gap-6">
          <div className="h-px flex-1 bg-line">
            <div
              className="h-[2px] -translate-y-px bg-ink transition-transform duration-150"
              style={{ transform: `scaleX(${progress})`, transformOrigin: "left" }}
            />
          </div>
          <span className="micro text-steel">{cargo.dragHint}</span>
          <div className="flex gap-px">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className={cn(
                "flex h-11 w-11 items-center justify-center border border-line transition-colors duration-300",
                canPrev ? "text-ink hover:border-ink hover:bg-ink hover:text-white" : "text-line"
              )}
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className={cn(
                "-ml-px flex h-11 w-11 items-center justify-center border border-line transition-colors duration-300",
                canNext ? "text-ink hover:border-ink hover:bg-ink hover:text-white" : "text-line"
              )}
            >
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
