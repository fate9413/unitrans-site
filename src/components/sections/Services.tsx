"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn, EASE_OUT_EXPO, SPRING_SNAPPY } from "@/lib/utils";
import type { Dictionary } from "@/content";

export function Services({ dict }: { dict: Dictionary }) {
  const { services } = dict;
  const [activeIdx, setActiveIdx] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const active = services.items[activeIdx];

  return (
    <section id="services" className="border-t border-line">
      <div className="container-x section-pad">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            num={services.num}
            kicker={services.kicker}
            title={services.title}
            sub={services.sub}
          />
          {services.moreLink && (
            <a
              href={`/${dict.locale}/services`}
              className="link-slide micro mb-1 shrink-0 text-navy"
            >
              {services.moreLink} →
            </a>
          )}
        </div>

        {/* Desktop explorer */}
        <div className="mt-16 hidden gap-14 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="micro mb-6 text-steel">{services.hint}</p>
            <ul>
              {services.items.map((item, i) => {
                const isActive = i === activeIdx;
                return (
                  <li key={item.id} className="relative border-b border-line first:border-t">
                    {isActive && (
                      <motion.span
                        layoutId="service-indicator"
                        transition={SPRING_SNAPPY}
                        className="absolute left-0 top-0 h-full w-[3px] bg-navy"
                      />
                    )}
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIdx(i)}
                      onFocus={() => setActiveIdx(i)}
                      onClick={() => setActiveIdx(i)}
                      className={cn(
                        "flex w-full items-baseline gap-6 py-7 pl-6 pr-2 text-left transition-colors duration-300",
                        isActive ? "text-ink" : "text-steel hover:text-slate"
                      )}
                    >
                      <span className="micro tabular-nums">0{i + 1}</span>
                      <span className="flex-1">
                        <span className="font-display block text-h3">{item.name}</span>
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.span
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                              className="block overflow-hidden"
                            >
                              <span className="mt-2 block text-[0.9375rem] text-slate">
                                {item.short}
                              </span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                      <span
                        className={cn(
                          "h-2 w-2 shrink-0 self-center transition-colors duration-300",
                          item.company === "unitrans" ? "bg-green" : "bg-plum",
                          isActive ? "opacity-100" : "opacity-30"
                        )}
                        aria-hidden
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Panel */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/9] overflow-hidden bg-mist">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={active.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                >
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.ul
                key={active.id}
                className="mt-8 grid grid-cols-2 gap-x-10 gap-y-0"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  show: { transition: { staggerChildren: 0.035 } },
                  hidden: {},
                }}
              >
                {active.points.map((p) => (
                  <motion.li
                    key={p}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
                    }}
                    className="flex items-center gap-3 border-b border-line py-3"
                  >
                    <Plus className="h-3.5 w-3.5 shrink-0 text-navy" strokeWidth={2.5} />
                    <span className="text-[0.9375rem]">{p}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile accordion */}
        <div className="mt-12 lg:hidden">
          {services.items.map((item, i) => {
            const isOpen = openMobile === i;
            return (
              <div key={item.id} className="border-b border-line first:border-t">
                <button
                  type="button"
                  onClick={() => setOpenMobile(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-5 py-6 text-left"
                >
                  <span className="micro tabular-nums text-steel">0{i + 1}</span>
                  <span className="font-display flex-1 text-h4">{item.name}</span>
                  <Plus
                    className={cn(
                      "h-5 w-5 text-slate transition-transform duration-300",
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
                      <div className="pb-8">
                        <div className="relative mb-6 aspect-[16/9] overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="100vw"
                            className="object-cover"
                          />
                        </div>
                        <p className="mb-4 text-[0.9375rem] text-slate">{item.short}</p>
                        <ul className="space-y-2">
                          {item.points.map((p) => (
                            <li key={p} className="flex items-center gap-3">
                              <Plus className="h-3 w-3 shrink-0 text-navy" strokeWidth={2.5} />
                              <span className="text-[0.9375rem]">{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
