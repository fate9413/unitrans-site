import { cn } from "@/lib/utils";

export function SectionHead({
  num,
  kicker,
  title,
  sub,
  dark = false,
  className,
}: {
  num: string;
  kicker: string;
  title: string;
  sub?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-4xl", className)}>
      <div
        className={cn(
          "micro mb-6 flex items-baseline gap-4",
          dark ? "text-white/50" : "text-slate"
        )}
      >
        <span className={dark ? "text-white/35" : "text-steel"}>{num}</span>
        <span className={cn("h-px w-10 self-center", dark ? "bg-white/25" : "bg-line")} />
        <span>{kicker}</span>
      </div>
      <h2 className={cn("text-h2", dark ? "text-white" : "text-ink")}>{title}</h2>
      {sub && (
        <p
          className={cn(
            "text-lede mt-6 max-w-2xl",
            dark ? "text-white/65" : "text-slate"
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
