"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";
import type { Dictionary } from "@/content";

type Status = "idle" | "sending" | "success" | "error";

const inputCls = cn(
  "w-full border-b border-line bg-transparent py-3.5 text-[1rem] text-ink",
  "placeholder:text-steel focus:border-ink focus:outline-none",
  "transition-colors duration-300"
);

export function Contact({ dict }: { dict: Dictionary }) {
  const { contact } = dict;
  const [status, setStatus] = useState<Status>("idle");
  const [topic, setTopic] = useState(contact.form.topics[0]);
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      topic,
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      setStatus(json.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="border-t border-line bg-mist/60">
      <div className="container-x section-pad">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Left: heading + info */}
          <div className="lg:col-span-5">
            <div className="micro mb-6 flex items-baseline gap-4 text-slate">
              <span className="text-steel">{contact.num}</span>
              <span className="h-px w-10 self-center bg-line" />
              <span>{contact.kicker}</span>
            </div>
            <h2 className="text-h2">{contact.title}</h2>
            <p className="text-lede mt-6 max-w-md text-slate">{contact.sub}</p>

            <dl className="mt-12 space-y-6">
              <div>
                <dt className="micro text-steel">{contact.info.emailLabel}</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${contact.info.email}`}
                    className="link-slide font-display text-h4 text-ink"
                  >
                    {contact.info.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="micro text-steel">{contact.info.phoneLabel}</dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${contact.info.phoneHref}`}
                    className="link-slide font-display text-h4 text-ink"
                  >
                    {contact.info.phone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-14">
                <div>
                  <dt className="micro text-steel">{contact.info.addressLabel}</dt>
                  <dd className="mt-1 text-[0.9375rem] text-slate">{contact.info.address}</dd>
                </div>
                <div>
                  <dt className="micro text-steel">{contact.info.dutyLabel}</dt>
                  <dd className="mt-1 flex items-center gap-2 text-[0.9375rem] text-slate">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute h-full w-full animate-ping bg-green opacity-60" />
                      <span className="relative h-2 w-2 bg-green" />
                    </span>
                    {contact.info.duty}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:gap-10">
              <Image
                src="/logos/unitrans-color.png"
                alt="Unitrans Ltd."
                width={170}
                height={44}
                className="h-9 w-auto object-contain object-left"
              />
              <Image
                src="/logos/uniagent-color.png"
                alt="Uniagent Varna Ltd."
                width={170}
                height={44}
                className="h-9 w-auto object-contain object-left"
              />
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="relative border border-line bg-paper p-8 sm:p-12">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                    className="flex min-h-[24rem] flex-col items-start justify-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center bg-green text-white">
                      <Check className="h-7 w-7" strokeWidth={2.5} />
                    </span>
                    <p className="font-display mt-8 text-h3">{contact.form.success}</p>
                    <p className="mt-3 text-slate">{contact.form.successNote}</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={onSubmit}
                    initial={false}
                    className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2"
                  >
                    {/* Honeypot */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden
                    />
                    <div>
                      <label htmlFor="cf-name" className="micro text-slate">
                        {contact.form.name} *
                      </label>
                      <input id="cf-name" name="name" required className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="cf-company" className="micro text-slate">
                        {contact.form.company}
                      </label>
                      <input id="cf-company" name="company" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="cf-email" className="micro text-slate">
                        {contact.form.email} *
                      </label>
                      <input id="cf-email" name="email" type="email" required className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="cf-phone" className="micro text-slate">
                        {contact.form.phone}
                      </label>
                      <input id="cf-phone" name="phone" type="tel" className={inputCls} />
                    </div>
                    <fieldset className="sm:col-span-2">
                      <legend className="micro mb-3 text-slate">{contact.form.topic}</legend>
                      <div className="flex flex-wrap gap-2">
                        {contact.form.topics.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTopic(t)}
                            aria-pressed={topic === t}
                            className={cn(
                              "border px-4 py-2.5 text-[0.875rem] font-medium transition-colors duration-300",
                              topic === t
                                ? "border-navy bg-navy text-white"
                                : "border-line text-slate hover:border-ink hover:text-ink"
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                    <div className="sm:col-span-2">
                      <label htmlFor="cf-message" className="micro text-slate">
                        {contact.form.message} *
                      </label>
                      <textarea
                        id="cf-message"
                        name="message"
                        required
                        rows={5}
                        className={cn(inputCls, "resize-none")}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Button
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full sm:w-auto"
                      >
                        {status === "sending" ? contact.form.sending : contact.form.submit}
                      </Button>
                      {status === "error" && (
                        <p className="mt-4 text-[0.875rem] text-[#b4232a]">
                          {contact.form.error}
                        </p>
                      )}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
