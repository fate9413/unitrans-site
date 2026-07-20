"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({
  value,
  plain = false,
  suffix = "",
  className,
}: {
  value: number;
  plain?: boolean;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (plain || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, plain]);

  return (
    <span ref={ref} className={className}>
      {plain ? `${value}${suffix}` : `0${suffix}`}
    </span>
  );
}
