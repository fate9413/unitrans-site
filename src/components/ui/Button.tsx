"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

type Variant = "primary" | "outline" | "white" | "ghost-light";

export function Button({
  children,
  href,
  variant = "primary",
  className,
  arrow = true,
  onClick,
  type,
  disabled,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // magnetic pull toward the cursor
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    setOffset({
      x: (e.clientX - r.left - r.width / 2) * 0.12,
      y: (e.clientY - r.top - r.height / 2) * 0.22,
    });
  };
  const onLeave = () => setOffset({ x: 0, y: 0 });

  const styles: Record<Variant, string> = {
    primary: "bg-ink text-paper hover:bg-navy",
    outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
    white: "bg-paper text-ink hover:bg-mist",
    "ghost-light": "border border-white/30 text-white hover:bg-white hover:text-ink",
  };

  const cls = cn(
    "group inline-flex select-none items-center justify-center gap-3 px-7 py-4",
    "text-[0.9375rem] font-semibold tracking-[-0.01em] whitespace-nowrap",
    "transition-[background-color,border-color,color] duration-300",
    "disabled:pointer-events-none disabled:opacity-50",
    styles[variant],
    className
  );

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
          strokeWidth={2.2}
        />
      )}
    </>
  );

  const motionStyle = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: offset.x === 0 && offset.y === 0 ? "transform 0.5s cubic-bezier(0.16,1,0.3,1)" : "transform 0.1s linear",
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={cls}
        style={motionStyle}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type ?? "button"}
      className={cls}
      style={motionStyle}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      disabled={disabled}
    >
      {inner}
    </button>
  );
}
