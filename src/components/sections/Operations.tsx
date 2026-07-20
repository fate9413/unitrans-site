"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { EASE_OUT_EXPO } from "@/lib/utils";
import type { Dictionary } from "@/content";

function Clock({ label, sub }: { label: string; sub: string }) {
  const [time, setTime] = useState<string | null>(null);
  const [date, setDate] = useState("");
  useEffect(() => {
    const tFmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Europe/Sofia",
    });
    const dFmt = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      timeZone: "Europe/Sofia",
    });
    const tick = () => {
      const now = new Date();
      setTime(tFmt.format(now));
      setDate(dFmt.format(now));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border border-white/15 p-8 sm:p-10">
      <p className="micro text-white/50">{label}</p>
      <p className="font-display mt-4 text-[clamp(3rem,6vw,4.5rem)] font-bold leading-none tracking-[-0.03em] tabular-nums">
        {time ?? "--:--:--"}
      </p>
      <p className="micro mt-3 text-white/40">{date}</p>
      <p className="mt-6 flex items-center gap-3 text-[0.9375rem] text-white/75">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping bg-green opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 bg-green" />
        </span>
        {sub}
      </p>
    </div>
  );
}

function CheckItem({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <li ref={ref} className="flex items-start gap-4 border-b border-white/10 py-4">
      <svg
        viewBox="0 0 20 20"
        className="mt-0.5 h-5 w-5 shrink-0"
        fill="none"
        aria-hidden
      >
        <motion.path
          d="M4 10.5 8.5 15 16 5.5"
          stroke="#2a7c40"
          strokeWidth="2.4"
          strokeLinecap="square"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: EASE_OUT_EXPO }}
        />
      </svg>
      <span className="text-[0.9375rem] text-white/80">{text}</span>
    </li>
  );
}

export function Operations({ dict }: { dict: Dictionary }) {
  const { ops } = dict;
  return (
    <section id="operations" className="relative overflow-hidden bg-ink-deep text-white">
      <Image
        src="/images/operations.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.14]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ink-deep via-transparent to-ink-deep/60" />
      <div className="container-x section-pad relative z-10">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead num={ops.num} kicker={ops.kicker} title={ops.title} dark />
            <p className="text-lede mt-8 text-white/70">{ops.p1}</p>
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-white/55">{ops.p2}</p>
            <p
              className="font-display mt-14 select-none text-[clamp(5rem,12vw,10rem)] font-bold leading-none tracking-[-0.05em] text-transparent"
              style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.22)" }}
              aria-hidden
            >
              24/7
            </p>
          </div>
          <div className="flex flex-col gap-10 lg:col-span-5 lg:col-start-8">
            <Clock label={ops.clockLabel} sub={ops.clockSub} />
            <div>
              <p className="micro mb-4 text-white/50">{ops.listTitle}</p>
              <ul>
                {ops.items.map((item, i) => (
                  <CheckItem key={item} text={item} index={i} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
