"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn, EASE_OUT_EXPO, SPRING_SNAPPY } from "@/lib/utils";
import type { Dictionary } from "@/content";

export function About({ dict }: { dict: Dictionary }) {
  const { about } = dict;
  const [activeId, setActiveId] = useState<"unitrans" | "uniagent">("unitrans");
  const company = about.companies.find((c) => c.id === activeId)!;
  const accent = activeId === "unitrans" ? "bg-green" : "bg-plum";
  const accentText = activeId === "unitrans" ? "text-green" : "text-plum";
  const logo = activeId === "unitrans" ? "/logos/unitrans-color.png" : "/logos/uniagent-color.png";

  return (
    <section id="about" className="container-x section-pad">
      <div className="grid gap-14 lg:grid-cols-12">
        {/* Left: statement */}
        <div className="lg:col-span-5">
          <div className="micro mb-6 flex items-baseline gap-4 text-slate">
            <span className="text-steel">{about.num}</span>
            <span className="h-px w-10 self-center bg-line" />
            <span>{about.kicker}</span>
          </div>
          <h2 className="text-h2">{about.statement}</h2>
          <div className="mt-10 flex flex-wrap gap-2">
            {about.glance.map((g) => (
              <span key={g} className="micro border border-line px-3 py-2 text-slate">
                {g}
              </span>
            ))}
          </div>
          {about.moreLink && (
            <a
              href={`/${dict.locale}/about`}
              className="link-slide micro mt-8 inline-block text-navy"
            >
              {about.moreLink} →
            </a>
          )}
        </div>

        {/* Right: copy */}
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-lede text-ink">{about.p1}</p>
          <p className="mt-6 text-[1.0625rem] leading-[1.7] text-slate">{about.p2}</p>
        </div>
      </div>

      {/* Company switcher */}
      <div className="mt-20 border-t border-line pt-14">
        <p className="micro mb-8 text-slate">{about.switchHint}</p>
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Segmented control */}
          <div className="flex flex-col gap-px lg:col-span-5">
            {about.companies.map((c) => {
              const isActive = c.id === activeId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    "group relative flex items-center justify-between border border-line px-6 py-6 text-left transition-colors duration-300",
                    isActive ? "border-ink bg-ink text-paper" : "hover:border-ink"
                  )}
                >
                  <span className="relative z-10">
                    <span className="font-display text-h4 block">{c.name}</span>
                    <span
                      className={cn(
                        "micro mt-1 block",
                        isActive ? "text-white/55" : "text-steel"
                      )}
                    >
                      {c.roles[0]} · {c.roles[1]}
                    </span>
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="company-dot"
                      transition={SPRING_SNAPPY}
                      className={cn("relative z-10 h-3 w-3", accent)}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active company panel */}
          <div className="relative min-h-[18rem] overflow-hidden border border-line lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                className="flex h-full flex-col justify-between gap-8 p-8 sm:p-10"
              >
                <div className="flex items-start justify-between gap-6">
                  <p className={cn("font-display text-h3", "text-ink")}>
                    {company.tagline}
                  </p>
                  <Image
                    src={logo}
                    alt={company.name}
                    width={180}
                    height={48}
                    className="hidden h-10 w-auto sm:block"
                  />
                </div>
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {company.roles.map((r, i) => (
                    <li key={r} className="flex items-center gap-4 border-b border-line pb-3">
                      <span className={cn("micro tabular-nums", accentText)}>
                        0{i + 1}
                      </span>
                      <span className="text-[0.9375rem] font-medium">{r}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            {/* accent edge */}
            <motion.span
              layout
              transition={SPRING_SNAPPY}
              className={cn("absolute left-0 top-0 h-full w-1", accent)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
