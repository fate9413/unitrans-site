"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";
import type { Dictionary } from "@/content";

export function Faq({ dict }: { dict: Dictionary }) {
  const { faq } = dict;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-line">
      <div className="container-x section-pad">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead num={faq.num} kicker={faq.kicker} title={faq.title} />
          </div>
          <div className="lg:col-span-8">
            {faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-b border-line first:border-t">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="micro tabular-nums text-steel">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "font-display text-h4 transition-colors duration-300",
                          isOpen ? "text-ink" : "text-slate group-hover:text-ink"
                        )}
                      >
                        {item.q}
                      </span>
                    </span>
                    <Plus
                      className={cn(
                        "mt-1 h-5 w-5 shrink-0 text-slate transition-transform duration-400 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
                        isOpen && "rotate-45"
                      )}
                      strokeWidth={2}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 pl-[3.1rem] text-[0.9375rem] leading-[1.7] text-slate">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
