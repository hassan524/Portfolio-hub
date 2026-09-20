// @ts-nocheck
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function AIProduct2Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  return (
    <section
      className="relative w-full px-6 py-28 md:py-36 flex flex-col items-center text-center transition-colors"
      style={{ backgroundColor: bg, color: ink }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{ background: accent }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold tracking-wide shadow-sm border"
          style={{ backgroundColor: surface, color: ink, borderColor: surface }}
        >
          <span className="h-2 w-2 rounded-full" style={{ background: accent }}></span>
          <Editable value="Available for select freelance projects" />
        </div>

        <Editable
          as="h1"
          value={props?.headline || "Crafting exceptional digital products & experiences."}
          onChange={(v) => onChange?.({ headline: v })}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
          style={{ color: ink }}
        />

        <Editable
          as="p"
          value={props?.subheadline || "Full-stack engineer & designer turning complex ideas into clean, scalable, and user-centric software."}
          onChange={(v) => onChange?.({ subheadline: v })}
          className="text-base sm:text-xl font-normal leading-relaxed mb-10 max-w-2xl"
          style={{ color: ink, opacity: 0.75 }}
        />

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-md transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            style={{ backgroundColor: accent, color: ink }}
          >
            <Editable value="Explore Work" />
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 hover:opacity-90 border"
            style={{ backgroundColor: surface, color: ink, borderColor: surface }}
          >
            <Editable value="Get in Touch" />
          </a>
        </div>
      </div>
    </section>
  );
}