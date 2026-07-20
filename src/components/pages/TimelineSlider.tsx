"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function TimelineSlider({
  items,
  dragHint,
}: {
  items: { year: string; title: string; text: string }[];
  dragHint: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
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
    <div>
      <div className="cursor-grab overflow-hidden active:cursor-grabbing" ref={emblaRef}>
        <div className="flex touch-pan-y gap-5 pl-[clamp(1.25rem,5vw,5rem)]">
          {items.map((item, i) => (
            <article
              key={item.year}
              className="relative min-w-0 flex-[0_0_78%] border border-line bg-paper p-8 sm:flex-[0_0_44%] sm:p-10 lg:flex-[0_0_30%]"
            >
              <p className="font-display text-[3.5rem] font-bold leading-none tracking-[-0.04em] text-line">
                {item.year}
              </p>
              <div className="mt-6 h-px w-10 bg-navy" />
              <h3 className="font-display mt-6 text-h4">{item.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">{item.text}</p>
              <span className="micro absolute right-8 top-8 text-steel">
                {String(i + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
          <div className="flex-[0_0_2rem]" aria-hidden />
        </div>
      </div>

      <div className="container-x mt-10 flex items-center justify-between gap-6">
        <div className="h-px flex-1 bg-line">
          <div
            className="h-[2px] -translate-y-px bg-navy transition-transform duration-150"
            style={{ transform: `scaleX(${progress})`, transformOrigin: "left" }}
          />
        </div>
        <span className="micro text-steel">{dragHint}</span>
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
  );
}
