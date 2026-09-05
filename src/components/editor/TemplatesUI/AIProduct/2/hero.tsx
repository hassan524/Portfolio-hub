// @ts-nocheck
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";


export function AIProduct2Hero({ props, theme, onChange }: any) {
  const { ink, bg, accent } = theme;

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-28 md:py-36 flex flex-col items-center text-center">
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full blur-[140px] pointer-events-none opacity-10"
        style={{ background: accent }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold tracking-wide shadow-sm" style={{ background: `${ink}04`, color: ink }}>
          <span className="h-2 w-2 rounded-full" style={{ background: accent }}></span>
          <Editable value="Available for select freelance projects" />
        </div>

        <Editable
          as="h1"
          value={props.headline || "Crafting exceptional digital products & experiences."}
          onChange={(v) => onChange({ headline: v })}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
          style={{ color: ink }}
        />

        <Editable
          as="p"
          value={props.subheadline || "Full-stack engineer & designer turning complex ideas into clean, scalable, and user-centric software."}
          onChange={(v) => onChange({ subheadline: v })}
          className="text-base sm:text-xl font-normal leading-relaxed mb-10 max-w-2xl opacity-75"
          style={{ color: ink }}
        />

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-md transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            style={{ background: accent, color: bg }}
          >
            <Editable value="Explore Work" />
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 hover:bg-black/5"
            style={{ background: `${ink}04`, color: ink }}
          >
            <Editable value="Let's Talk" />
          </a>
        </div>
      </div>
    </section>
  );
}