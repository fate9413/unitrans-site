"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";
import type { Dictionary } from "@/content";
import type { PagesDict } from "@/content/pages-types";

type Status = "idle" | "sending" | "success" | "error";

const inputCls = cn(
  "w-full border-b border-line bg-transparent py-3 text-[1rem] text-ink",
  "placeholder:text-steel focus:border-ink focus:outline-none",
  "transition-colors duration-300"
);

const labelCls = "micro text-slate";

export function NominationForm({
  dict,
  pages,
  lang,
}: {
  dict: Dictionary;
  pages: PagesDict;
  lang: string;
}) {
  const f = pages.nominate.form;
  const ports = dict.ports.ports;
  const [status, setStatus] = useState<Status>("idle");
  const [port, setPort] = useState(ports[0].name);
  const [operation, setOperation] = useState<"load" | "discharge">("load");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.currentTarget);
    const val = (k: string) => String(fd.get(k) ?? "").trim();

    const lines = [
      `${f.vessel}: ${val("vessel") || "—"}`,
      `${f.port}: ${port}`,
      `${f.operation}: ${f.operations[operation]}`,
      `${f.cargoType}: ${val("cargo")}`,
      `${f.quantity}: ${val("quantity")} ${f.quantityUnit}`,
      `Laycan: ${val("laycanFrom")} → ${val("laycanTo")}`,
      "",
      val("message"),
    ].join("\n");

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: val("name"),
          company: val("company"),
          email: val("email"),
          phone: val("phone"),
          topic: lang === "bg" ? "Номинация на кораб" : "Vessel nomination",
          message: lines,
          website: val("website"),
        }),
      });
      const json = await res.json();
      setStatus(json.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        className="flex min-h-[24rem] flex-col items-start justify-center border border-line bg-paper p-10"
      >
        <span className="flex h-14 w-14 items-center justify-center bg-green text-white">
          <Check className="h-7 w-7" strokeWidth={2.5} />
        </span>
        <p className="font-display mt-8 text-h3">{f.success}</p>
        <p className="mt-3 text-slate">{f.successNote}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-line bg-paper p-8 sm:p-12">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {/* Contact */}
      <p className="micro flex items-center gap-3 text-steel">
        <span className="h-px w-8 bg-line" /> {f.sectionContact}
      </p>
      <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label htmlFor="nf-company" className={labelCls}>{f.company} *</label>
          <input id="nf-company" name="company" required className={inputCls} />
        </div>
        <div>
          <label htmlFor="nf-name" className={labelCls}>{f.name} *</label>
          <input id="nf-name" name="name" required className={inputCls} />
        </div>
        <div>
          <label htmlFor="nf-email" className={labelCls}>{f.email} *</label>
          <input id="nf-email" name="email" type="email" required className={inputCls} />
        </div>
        <div>
          <label htmlFor="nf-phone" className={labelCls}>{f.phone}</label>
          <input id="nf-phone" name="phone" type="tel" className={inputCls} />
        </div>
      </div>

      {/* Vessel & port */}
      <p className="micro mt-12 flex items-center gap-3 text-steel">
        <span className="h-px w-8 bg-line" /> {f.sectionVessel}
      </p>
      <div className="mt-6 grid gap-x-8 gap-y-6">
        <div>
          <label htmlFor="nf-vessel" className={labelCls}>{f.vessel}</label>
          <input id="nf-vessel" name="vessel" placeholder={f.vesselHint} className={inputCls} />
        </div>
        <fieldset>
          <legend className={cn(labelCls, "mb-3")}>{f.port} *</legend>
          <div className="flex flex-wrap gap-2">
            {ports.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPort(p.name)}
                aria-pressed={port === p.name}
                className={cn(
                  "border px-3.5 py-2 text-[0.875rem] font-medium transition-colors duration-200",
                  port === p.name
                    ? p.type === "sea"
                      ? "border-navy bg-navy text-white"
                      : "border-green bg-green text-white"
                    : "border-line text-slate hover:border-ink hover:text-ink"
                )}
              >
                {p.name}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className={cn(labelCls, "mb-3")}>{f.operation} *</legend>
          <div className="flex gap-2">
            {(["load", "discharge"] as const).map((op) => (
              <button
                key={op}
                type="button"
                onClick={() => setOperation(op)}
                aria-pressed={operation === op}
                className={cn(
                  "border px-5 py-2.5 text-[0.875rem] font-medium transition-colors duration-200",
                  operation === op
                    ? "border-ink bg-ink text-white"
                    : "border-line text-slate hover:border-ink hover:text-ink"
                )}
              >
                {f.operations[op]}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Cargo & dates */}
      <p className="micro mt-12 flex items-center gap-3 text-steel">
        <span className="h-px w-8 bg-line" /> {f.sectionCargo}
      </p>
      <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label htmlFor="nf-cargo" className={labelCls}>{f.cargoType} *</label>
          <input id="nf-cargo" name="cargo" required placeholder={f.cargoPlaceholder} className={inputCls} />
        </div>
        <div>
          <label htmlFor="nf-quantity" className={labelCls}>
            {f.quantity} ({f.quantityUnit}) *
          </label>
          <input id="nf-quantity" name="quantity" type="number" min={1} required className={inputCls} />
        </div>
        <div>
          <label htmlFor="nf-from" className={labelCls}>{f.laycanFrom} *</label>
          <input id="nf-from" name="laycanFrom" type="date" required className={inputCls} />
        </div>
        <div>
          <label htmlFor="nf-to" className={labelCls}>{f.laycanTo} *</label>
          <input id="nf-to" name="laycanTo" type="date" required className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="nf-message" className={labelCls}>{f.message}</label>
          <textarea id="nf-message" name="message" rows={3} className={cn(inputCls, "resize-none")} />
        </div>
      </div>

      <div className="mt-10">
        <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
          {status === "sending" ? f.sending : f.submit}
        </Button>
        <p className="mt-4 text-[0.8125rem] leading-relaxed text-steel">
          {dict.contact.form.consent}{" "}
          <a
            href={`/${lang}/privacy`}
            className="underline decoration-line underline-offset-2 transition-colors hover:text-ink"
          >
            {dict.contact.form.consentLink}
          </a>
          .
        </p>
        {status === "error" && (
          <p className="mt-4 text-[0.875rem] text-[#b4232a]">{f.error}</p>
        )}
      </div>
    </form>
  );
}
