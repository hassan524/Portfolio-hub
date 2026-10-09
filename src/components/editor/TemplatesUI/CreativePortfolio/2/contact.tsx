// @ts-nocheck
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio2Contact({ props = {}, theme, onChange }: any) {
  const bgSecond = theme?.["bg-second"] || "#F9DDE8";
  const ink = theme?.ink || "#2B1720";
  const surface = theme?.surface || "rgba(83, 29, 51, 0.14)";
  const accent = theme?.accent || "#F03D87";

  return (
    <section
      id="contact"
      className="border-b px-5 py-24 sm:px-8 lg:px-12 transition-colors font-serif"
      style={{
        backgroundColor: bgSecond,
        color: ink,
        borderColor: surface,
      }}
    >
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: accent }}>
            05 / Want to know more?
          </p>
          <h2 className="text-[clamp(3rem,8vw,7rem)] font-bold tracking-tight leading-[0.9]">
            Let’s make<br />
            something <em style={{ color: accent }}>useful.</em>
          </h2>
        </div>

        <a
          href="mailto:hello@liza.design"
          className="inline-flex items-center gap-4 text-2xl sm:text-3xl font-bold font-mono tracking-tight pb-3 border-b-2 transition-all hover:scale-105"
          style={{ borderColor: accent, color: accent }}
        >
          <Editable
            value={props?.email || "hello@liza.design"}
            onChange={(v) => onChange?.({ email: v })}
          />
          <ArrowUpRight size={26} />
        </a>
      </div>
    </section>
  );
}
