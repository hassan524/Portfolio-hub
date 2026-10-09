// @ts-nocheck
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio3Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#160B2B";
  const ink = theme?.ink || "#FFF8FF";
  const surface = theme?.surface || "rgba(255, 248, 255, 0.16)";
  const accent = theme?.accent || "#C98CFF";

  return (
    <section
      id="contact"
      className="border-b px-5 py-28 sm:px-8 lg:px-12 transition-colors font-sans"
      style={{
        backgroundColor: bg,
        color: ink,
        borderColor: surface,
      }}
    >
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] block mb-4" style={{ color: accent }}>
            06 / Hire me
          </span>
          <h2 className="text-[clamp(3.2rem,8vw,7.5rem)] font-bold tracking-tight leading-[0.85]">
            <Editable
              value={props?.headline || "Let’s make it move."}
              onChange={(v) => onChange?.({ headline: v })}
            />
          </h2>
        </div>

        <a
          href="mailto:hello@hasansenjig.com"
          className="inline-flex items-center gap-3 text-2xl sm:text-3xl font-mono uppercase tracking-tight pb-3 border-b-2 transition-all hover:scale-105"
          style={{ borderColor: accent, color: accent }}
        >
          <Editable
            value={props?.email || "hello@hasansenjig.com"}
            onChange={(v) => onChange?.({ email: v })}
          />
          <ArrowUpRight size={26} />
        </a>
      </div>
    </section>
  );
}
