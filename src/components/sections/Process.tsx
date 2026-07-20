"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/content";

export function Process({ dict }: { dict: Dictionary }) {
  const { process } = dict;
  const n = process.steps.length;

  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // horizontal shift of the track — driven purely by page scroll
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-62%"]);
  const lineScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(n - 1, Math.max(0, Math.floor(((v - 0.05) / 0.9) * n)));
    setActiveStep(idx);
  });

  return (
    <section id="process" className="border-t border-line">
      {/* Desktop: sticky scroll-scrub */}
      <div ref={outerRef} className="relative hidden h-[340vh] lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="container-x">
            <div className="flex items-end justify-between gap-8">
              <SectionHead
                num={process.num}
                kicker={process.kicker}
                title={process.title}
                sub={process.sub}
              />
              <p className="micro mb-2 shrink-0 text-steel">
                {String(activeStep + 1).padStart(2, "0")} /{" "}
                {String(n).padStart(2, "0")} — {process.scrollHint}
              </p>
            </div>
          </div>

          <div className="relative mt-20">
            {/* base line */}
            <div className="absolute left-0 right-0 top-[3.4rem] h-px bg-line" />
            {/* progress line */}
            <motion.div
              className="absolute left-0 right-0 top-[3.4rem] h-[2px] origin-left bg-navy"
              style={{ scaleX: lineScale }}
            />
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex w-max gap-[4.5rem] pl-[clamp(1.25rem,5vw,5rem)] pr-[40vw]"
            >
              {process.steps.map((s, i) => {
                const isActive = i === activeStep;
                const isPast = i < activeStep;
                return (
                  <div key={s.name} className="w-[19rem] shrink-0">
                    <p
                      className={cn(
                        "font-display text-[3.25rem] font-bold leading-none tracking-[-0.03em] tabular-nums transition-colors duration-500",
                        isActive ? "text-ink" : isPast ? "text-steel" : "text-line"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    {/* node on the line */}
                    <div className="relative mt-4 mb-8 flex h-4 items-center">
                      <span
                        className={cn(
                          "h-3 w-3 border-2 bg-paper transition-all duration-500",
                          isActive || isPast ? "border-navy" : "border-line",
                          isActive && "scale-125 bg-navy"
                        )}
                      />
                    </div>
                    <h3
                      className={cn(
                        "font-display text-h4 transition-colors duration-500",
                        isActive ? "text-ink" : "text-slate"
                      )}
                    >
                      {s.name}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-[0.9375rem] leading-relaxed transition-colors duration-500",
                        isActive ? "text-slate" : "text-steel"
                      )}
                    >
                      {s.desc}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <div className="container-x mt-16">
            <p className="micro max-w-md text-slate">{process.note}</p>
          </div>
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="container-x section-pad lg:hidden">
        <SectionHead
          num={process.num}
          kicker={process.kicker}
          title={process.title}
          sub={process.sub}
        />
        <ol className="relative mt-14 border-l border-line pl-8">
          {process.steps.map((s, i) => (
            <li key={s.name} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[2.42rem] top-1 h-3 w-3 border-2 border-navy bg-paper" />
              <p className="micro tabular-nums text-steel">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="font-display mt-1 text-h4">{s.name}</h3>
              <p className="mt-1 text-[0.9375rem] text-slate">{s.desc}</p>
            </li>
          ))}
        </ol>
        <p className="micro mt-12 max-w-md text-slate">{process.note}</p>
      </div>
    </section>
  );
}
