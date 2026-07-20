"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Anchor } from "lucide-react";
import { SectionHead } from "@/components/ui/SectionHead";
import { BG_DOTS, MAP_ASPECT, PORT_POS } from "@/lib/map-data";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";
import type { Dictionary } from "@/content";

const VB_W = 1000;
const VB_H = Math.round(VB_W * MAP_ASPECT);

export function PortsMap({ dict }: { dict: Dictionary }) {
  const { ports } = dict;
  const [selectedId, setSelectedId] = useState("varna");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const selected = ports.ports.find((p) => p.id === selectedId)!;

  return (
    <section id="ports" className="border-t border-line bg-mist/60">
      <div className="container-x section-pad">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Left: info */}
          <div className="flex flex-col lg:col-span-4">
            <SectionHead
              num={ports.num}
              kicker={ports.kicker}
              title={ports.title}
              sub={ports.sub}
            />
            <div className="micro mt-10 flex flex-col gap-3 text-slate">
              <span className="flex items-center gap-3">
                <span className="h-3 w-3 bg-navy" /> {ports.legendSea}
              </span>
              <span className="flex items-center gap-3">
                <span className="h-3 w-3 bg-green" /> {ports.legendRiver}
              </span>
            </div>

            {/* Selected port panel */}
            <div className="relative mt-10 min-h-[16rem] flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  className="border border-line bg-paper p-8"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-h3">{selected.name}</h3>
                    <Anchor
                      className={cn(
                        "h-5 w-5",
                        selected.type === "sea" ? "text-navy" : "text-green"
                      )}
                      strokeWidth={2}
                    />
                  </div>
                  <div className="micro mt-2 flex items-center gap-3">
                    <span className={selected.type === "sea" ? "text-navy" : "text-green"}>
                      {selected.type === "sea" ? ports.legendSea : ports.legendRiver}
                    </span>
                    {selected.id === "varna" && (
                      <span className="bg-ink px-2 py-1 text-paper">{ports.hqBadge}</span>
                    )}
                  </div>
                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-slate">
                    {selected.desc}
                  </p>
                  <p className="micro mb-3 mt-6 text-steel">{ports.servicesLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.tags.map((t) => (
                      <span key={t} className="micro border border-line px-2.5 py-1.5 text-slate">
                        {t}
                      </span>
                    ))}
                  </div>
                  {ports.moreLink && (
                    <a
                      href={`/${dict.locale}/ports`}
                      className="link-slide micro mt-6 inline-block text-navy"
                    >
                      {ports.moreLink} →
                    </a>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: map */}
          <div className="lg:col-span-8">
            <p className="micro mb-6 text-steel">{ports.hint}</p>
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H + 40}`}
              className="w-full select-none"
              role="group"
              aria-label="Map of Bulgarian ports"
            >
              {/* dot matrix */}
              {BG_DOTS.map(([nx, ny], i) => (
                <circle
                  key={i}
                  cx={nx * VB_W}
                  cy={ny * VB_H + 20}
                  r={2.4}
                  className="fill-[#c9cede]"
                  style={{
                    animation: `dot-in 0.6s both`,
                    animationDelay: `${((i * 7) % 97) / 97 * 0.9}s`,
                  }}
                />
              ))}
              {/* pins */}
              {ports.ports.map((p) => {
                const pos = PORT_POS[p.id];
                if (!pos) return null;
                const cx = pos[0] * VB_W;
                const cy = pos[1] * VB_H + 20;
                const isSea = p.type === "sea";
                const isActive = selectedId === p.id;
                const isHover = hoverId === p.id;
                const color = isSea ? "#283668" : "#2a7c40";
                return (
                  <g
                    key={p.id}
                    transform={`translate(${cx}, ${cy})`}
                    className="cursor-pointer"
                    onClick={() => setSelectedId(p.id)}
                    onMouseEnter={() => setHoverId(p.id)}
                    onMouseLeave={() => setHoverId(null)}
                    role="button"
                    aria-label={p.name}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setSelectedId(p.id);
                    }}
                  >
                    {/* generous hit area */}
                    <circle r={26} fill="transparent" />
                    {/* pulse */}
                    {isActive && (
                      <circle
                        r={11}
                        fill={color}
                        style={{ animation: "pin-pulse 2s cubic-bezier(0.16,1,0.3,1) infinite" }}
                      />
                    )}
                    <circle
                      r={isActive ? 11 : isHover ? 9.5 : 7.5}
                      fill={isActive || isHover ? color : "#ffffff"}
                      stroke={color}
                      strokeWidth={2.5}
                      style={{ transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)" }}
                    />
                    <text
                      y={isSea ? 5 : -18}
                      x={isSea ? -24 : 0}
                      textAnchor={isSea ? "end" : "middle"}
                      className={cn(
                        "font-display uppercase",
                        isActive || isHover ? "fill-ink" : "fill-[#5b6472]"
                      )}
                      style={{
                        fontSize: isSea ? 26 : 19,
                        fontWeight: isActive ? 700 : 600,
                        letterSpacing: "0.06em",
                        transition: "fill 0.3s",
                      }}
                    >
                      {p.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Mobile-friendly quick selector */}
            <div className="mt-8 flex flex-wrap gap-2 lg:hidden">
              {ports.ports.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedId(p.id)}
                  className={cn(
                    "micro border px-3 py-2 transition-colors duration-200",
                    selectedId === p.id
                      ? "border-ink bg-ink text-paper"
                      : "border-line text-slate"
                  )}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
