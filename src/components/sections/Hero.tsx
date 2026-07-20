"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/content";

const SLIDE_MS = 6500;

export function Hero({ dict }: { dict: Dictionary }) {
  const { hero } = dict;
  const n = hero.slides.length;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setIndex((i) => (i + 1) % n), SLIDE_MS);
    return () => clearTimeout(id);
  }, [index, n]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink-deep text-white"
    >
      {/* Slides — all mounted, CSS crossfade (no rAF dependency) */}
      {hero.slides.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1100ms] ease-in-out",
            i === index ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn(
              "object-cover",
              i === index && "[animation:kenburns_8s_ease-out_forwards]"
            )}
          />
        </div>
      ))}

      {/* Scrim — flat veil + bottom gradient for legibility */}
      <div className="absolute inset-0 bg-ink-deep/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/20 to-transparent" />

      {/* Content */}
      <div className="container-x relative z-10 pb-10 pt-40">
        <p className="animate-fade-in micro mb-8 text-white/60" style={{ animationDelay: "0.5s" }}>
          {hero.kicker}
        </p>
        <h1 className="text-display max-w-5xl">
          {hero.titleLines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
              <span
                className="animate-rise block"
                style={{ animationDelay: `${0.12 + i * 0.09}s` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p
          className="animate-fade-in text-lede mt-8 max-w-xl text-white/75"
          style={{ animationDelay: "0.55s" }}
        >
          {hero.sub}
        </p>
        <div
          className="animate-fade-in mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "0.7s" }}
        >
          <Button href="#contact" variant="white">
            {hero.ctaPrimary}
          </Button>
          <Button href="#services" variant="ghost-light">
            {hero.ctaSecondary}
          </Button>
        </div>

        {/* Slider chrome */}
        <div
          className="animate-fade-in mt-16 flex items-end justify-between gap-6"
          style={{ animationDelay: "0.85s" }}
        >
          <div className="flex items-center gap-5">
            <span className="font-display text-sm font-semibold tabular-nums tracking-wide">
              0{index + 1}
              <span className="text-white/40"> / 0{n}</span>
            </span>
            <div className="hidden h-px w-40 overflow-hidden bg-white/25 sm:block">
              <div
                key={index}
                className="h-full origin-left bg-white"
                style={{ animation: `fillbar ${SLIDE_MS}ms linear forwards` }}
              />
            </div>
            <span key={`cap-${index}`} className="animate-fade-in micro text-white/55">
              {hero.slides[index].caption}
            </span>
          </div>
          <div className="flex gap-px">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => setIndex((i) => (i - 1 + n) % n)}
              className="flex h-12 w-12 items-center justify-center border border-white/25 text-white transition-colors duration-300 hover:bg-white hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => setIndex((i) => (i + 1) % n)}
              className="-ml-px flex h-12 w-12 items-center justify-center border border-white/25 text-white transition-colors duration-300 hover:bg-white hover:text-ink"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="relative z-10 border-t border-white/15 bg-ink-deep/70">
        <div className="container-x grid grid-cols-2 gap-y-6 py-7 sm:grid-cols-3 lg:grid-cols-5">
          {hero.stats.map((s, i) => (
            <div key={i} className="pr-6">
              <p className="font-display text-[1.75rem] font-bold leading-none tracking-[-0.02em] tabular-nums">
                <Counter value={s.value} suffix={s.suffix ?? ""} plain={s.plain} />
              </p>
              <p className="micro mt-2 text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
