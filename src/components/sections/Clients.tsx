import Image from "next/image";
import { SectionHead } from "@/components/ui/SectionHead";
import type { Dictionary } from "@/content";

export function Clients({ dict }: { dict: Dictionary }) {
  const { clients } = dict;
  return (
    <section id="clients" className="border-t border-line">
      <div className="container-x section-pad">
        <SectionHead
          num={clients.num}
          kicker={clients.kicker}
          title={clients.title}
          sub={clients.sub}
        />
        <div className="mt-16 grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-6">
          {clients.logos.map((l) => (
            <div
              key={l.src}
              className="group flex aspect-[4/3] flex-col items-center justify-center gap-3 border-b border-r border-line p-6 transition-colors duration-300 hover:bg-mist"
            >
              <Image
                src={l.src}
                alt={l.name}
                width={140}
                height={56}
                className="h-10 w-auto max-w-[7.5rem] object-contain opacity-55 grayscale transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <span className="micro text-center text-steel opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {l.name}
              </span>
            </div>
          ))}
          {/* filler cell to complete the 6-col grid (17 logos -> 18 cells) */}
          <div className="hidden aspect-[4/3] items-center justify-center border-b border-r border-line bg-ink lg:flex">
            <span className="micro px-4 text-center text-white/60">
              {dict.marquee.label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
