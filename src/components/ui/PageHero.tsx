import Image from "next/image";
import { cn } from "@/lib/utils";

export function PageHero({
  kicker,
  title,
  intro,
  image,
  compact = false,
}: {
  kicker: string;
  title: string;
  intro: string;
  image?: string;
  compact?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-deep text-white">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/55 to-ink-deep/35" />
        </>
      )}
      <div
        className={cn(
          "container-x relative z-10 pb-16 sm:pb-20",
          compact ? "pt-36" : "pt-44 sm:pt-52"
        )}
      >
        <p className="animate-fade-in micro text-white/55" style={{ animationDelay: "0.35s" }}>
          {kicker}
        </p>
        <h1 className="mt-6 max-w-4xl overflow-hidden text-display">
          <span className="animate-rise block" style={{ animationDelay: "0.1s" }}>
            {title}
          </span>
        </h1>
        <p
          className="animate-fade-in text-lede mt-7 max-w-2xl text-white/70"
          style={{ animationDelay: "0.45s" }}
        >
          {intro}
        </p>
      </div>
    </section>
  );
}
