"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/content";

function VarnaClock({ label }: { label: string }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Europe/Sofia",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="micro text-white/40">
      {label} — <span className="tabular-nums text-white/70">{time}</span>
    </span>
  );
}

export function Footer({ dict, lang }: { dict: Dictionary; lang: string }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink-deep text-white">
      <div className="container-x section-pad-t pb-16">
        <p className="font-display text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.04em]">
          UNITRANS <span className="text-white/35">&</span> UNIAGENT
          <span className="mt-2 block text-[0.42em] font-medium tracking-[-0.02em] text-white/45">
            {dict.footer.tagline}
          </span>
        </p>

        <div className="mt-20 grid gap-12 border-t border-white/10 pt-14 md:grid-cols-3">
          <div>
            <p className="micro mb-6 text-white/40">{dict.footer.colNav}</p>
            <ul className="space-y-3">
              {dict.nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={`/${lang}${l.href}`}
                    className="link-slide text-[0.9375rem] text-white/75 hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="micro mb-6 text-white/40">{dict.footer.colContact}</p>
            <ul className="space-y-3 text-[0.9375rem] text-white/75">
              <li>
                <a href={`mailto:${dict.contact.info.email}`} className="link-slide hover:text-white">
                  {dict.contact.info.email}
                </a>
              </li>
              <li>
                <a href={`tel:${dict.contact.info.phoneHref}`} className="link-slide hover:text-white">
                  {dict.contact.info.phone}
                </a>
              </li>
              <li className="text-white/55">{dict.contact.info.address}</li>
            </ul>
          </div>
          <div>
            <p className="micro mb-6 text-white/40">{dict.footer.colCompanies}</p>
            <div className="space-y-6">
              <Image
                src="/logos/unitrans-white.png"
                alt="Unitrans Ltd."
                width={170}
                height={44}
                className="h-9 w-auto opacity-80"
              />
              <Image
                src="/logos/uniagent-white.png"
                alt="Uniagent Varna Ltd."
                width={170}
                height={44}
                className="h-9 w-auto opacity-80"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 lg:flex-row lg:items-center">
          <p className="micro text-white/40">
            © {year} Unitrans Ltd. & Uniagent Varna Ltd. {dict.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <a href={`/${lang}/privacy`} className="micro link-slide text-white/40 hover:text-white/70">
              {dict.footer.legal.privacy}
            </a>
            <a href={`/${lang}/cookies`} className="micro link-slide text-white/40 hover:text-white/70">
              {dict.footer.legal.cookies}
            </a>
            <a href={`/${lang}/terms`} className="micro link-slide text-white/40 hover:text-white/70">
              {dict.footer.legal.terms}
            </a>
            <VarnaClock label={dict.footer.localTime} />
            <a href={`/${lang}/design-system`} className="micro link-slide text-white/40 hover:text-white/70">
              {dict.footer.designSystem}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
