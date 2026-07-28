"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";
import type { Dictionary } from "@/content";

function LogoLockup({ light, lang }: { light: boolean; lang: string }) {
  return (
    <a
      href={`/${lang}`}
      className="flex min-w-0 items-center gap-2.5 sm:gap-4"
      aria-label="Unitrans Ltd. & Uniagent Varna Ltd. — home"
    >
      <Image
        src={light ? "/logos/unitrans-white.png" : "/logos/unitrans-color.png"}
        alt="Unitrans Ltd."
        width={168}
        height={44}
        priority
        className="h-[1.375rem] w-auto sm:h-8"
      />
      <span
        className={cn("h-5 w-px shrink-0 sm:h-7", light ? "bg-white/25" : "bg-line")}
        aria-hidden
      />
      <Image
        src={light ? "/logos/uniagent-white.png" : "/logos/uniagent-color.png"}
        alt="Uniagent Varna Ltd."
        width={168}
        height={44}
        priority
        className="h-[1.375rem] w-auto sm:h-8"
      />
    </a>
  );
}

export function Header({ dict, lang }: { dict: Dictionary; lang: string }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const hasDarkHero = true; // every page opens with a dark hero

  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 40));

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  const light = hasDarkHero && !solid && !open;

  const isActive = (href: string) => pathname.startsWith(`/${lang}${href}`);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
          solid || open ? "border-b border-line bg-paper/95" : "border-b border-transparent"
        )}
      >
        <div className="container-x flex h-16 items-center justify-between gap-3 sm:h-[4.5rem]">
          <LogoLockup light={light} lang={lang} />

          <nav className="hidden items-center gap-7 xl:flex" aria-label="Main">
            {dict.nav.links.map((l) => (
              <a
                key={l.href}
                href={`/${lang}${l.href}`}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={cn(
                  "link-slide text-[0.875rem] font-medium tracking-[-0.005em] transition-colors duration-300",
                  light ? "text-white/85 hover:text-white" : "text-slate hover:text-ink",
                  isActive(l.href) && (light ? "text-white" : "text-ink")
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <a
              href={pathname.replace(/^\/(bg|en)(?=\/|$)/, dict.nav.langSwitch.href) || dict.nav.langSwitch.href}
              aria-label={dict.nav.langSwitch.label}
              className={cn(
                "micro border px-2.5 py-1.5 transition-colors duration-300 sm:px-3 sm:py-2",
                light
                  ? "border-white/30 text-white hover:bg-white hover:text-ink"
                  : "border-line text-slate hover:border-ink hover:text-ink"
              )}
            >
              {dict.nav.langSwitch.code}
            </a>
            <a
              href={`/${lang}/contact`}
              className={cn(
                "micro hidden px-4 py-2 transition-colors duration-300 xl:block",
                light
                  ? "bg-white text-ink hover:bg-white/85"
                  : "bg-ink text-paper hover:bg-navy"
              )}
            >
              {dict.nav.cta}
            </a>
          </div>
        </div>
      </header>

      {/* Floating menu button — bottom right, mobile/tablet only */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? dict.nav.menuClose : dict.nav.menuOpen}
        className={cn(
          "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center xl:hidden",
          "bg-ink text-white ring-1 ring-white/20",
          "shadow-[0_10px_30px_rgba(10,14,26,0.45)]",
          "transition-transform duration-300 active:scale-95",
          "mb-[env(safe-area-inset-bottom)]"
        )}
      >
        <span
          className={cn(
            "absolute h-[2px] w-6 bg-current transition-transform duration-300",
            open ? "rotate-45" : "-translate-y-[4px]"
          )}
        />
        <span
          className={cn(
            "absolute h-[2px] w-6 bg-current transition-transform duration-300",
            open ? "-rotate-45" : "translate-y-[4px]"
          )}
        />
      </button>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-paper xl:hidden"
          >
            <nav
              className="container-x flex min-h-full flex-col justify-center gap-1 py-24 pb-32"
              aria-label="Mobile"
            >
              {dict.nav.links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={`/${lang}${l.href}`}
                  onClick={() => setOpen(false)}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.5, ease: EASE_OUT_EXPO }}
                  className={cn(
                    "border-b border-line py-4 font-display text-h3",
                    isActive(l.href) ? "text-navy" : "text-ink"
                  )}
                >
                  <span className="micro mr-4 text-steel">0{i + 1}</span>
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href={`/${lang}/contact`}
                onClick={() => setOpen(false)}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.32, duration: 0.5, ease: EASE_OUT_EXPO }}
                className="micro mt-8 inline-block w-fit bg-ink px-6 py-4 text-paper"
              >
                {dict.nav.cta}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
