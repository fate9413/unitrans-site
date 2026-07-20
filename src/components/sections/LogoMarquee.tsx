import Image from "next/image";
import type { Dictionary } from "@/content";

export function LogoMarquee({ dict }: { dict: Dictionary }) {
  const logos = dict.clients.logos;
  const row = [...logos, ...logos];
  return (
    <section aria-label={dict.marquee.label} className="border-b border-line">
      <div className="flex items-center">
        <div className="micro hidden shrink-0 border-r border-line py-8 pl-[clamp(1.25rem,5vw,5rem)] pr-8 text-slate md:block">
          {dict.marquee.label}
        </div>
        <div className="relative flex-1 overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="animate-marquee flex w-max items-center gap-16 pr-16">
            {row.map((l, i) => (
              <Image
                key={`${l.src}-${i}`}
                src={l.src}
                alt={l.name}
                width={150}
                height={48}
                className="h-9 w-auto max-w-[9rem] object-contain opacity-45 grayscale transition-opacity duration-300 hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
