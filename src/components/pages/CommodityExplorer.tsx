"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wheat } from "lucide-react";
import { cn, EASE_OUT_EXPO, SPRING_SNAPPY } from "@/lib/utils";

export function CommodityExplorer({
  items,
  hint,
}: {
  items: { name: string; season: string; desc: string }[];
  hint: string;
}) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      {/* List */}
      <div className="lg:col-span-5">
        <p className="micro mb-6 text-steel">{hint}</p>
        <ul>
          {items.map((c, i) => {
            const isActive = i === active;
            return (
              <li key={c.name} className="relative border-b border-line first:border-t">
                {isActive && (
                  <motion.span
                    layoutId="commodity-indicator"
                    transition={SPRING_SNAPPY}
                    className="absolute left-0 top-0 h-full w-[3px] bg-green"
                  />
                )}
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex w-full items-baseline justify-between gap-6 py-5 pl-6 pr-2 text-left transition-colors duration-300",
                    isActive ? "text-ink" : "text-steel hover:text-slate"
                  )}
                >
                  <span className="font-display text-h4">{c.name}</span>
                  <span className="micro shrink-0">{String(i + 1).padStart(2, "0")}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Detail panel */}
      <div className="relative min-h-[20rem] lg:col-span-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="flex h-full flex-col border border-line bg-mist/60 p-8 sm:p-12"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-display text-h3">{current.name}</p>
                <p className="micro mt-3 inline-block border border-green/40 px-3 py-1.5 text-green">
                  {current.season}
                </p>
              </div>
              <Wheat className="h-8 w-8 shrink-0 text-green/50" strokeWidth={1.5} />
            </div>
            <p className="mt-8 max-w-xl text-[1.0625rem] leading-[1.7] text-slate">
              {current.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
