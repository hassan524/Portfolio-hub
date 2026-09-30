// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, MapPin } from "lucide-react";

export function ArchitectureStudio3Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  return (
    <section
      id="contact"
      className="px-6 md:px-14 lg:px-20 py-28 md:py-36 transition-colors w-full"
      style={{ backgroundColor: bg, color: ink }}
    >
      <div className="max-w-6xl mx-auto">
        <span
          className="text-[10px] font-bold uppercase tracking-widest block mb-4"
          style={{ color: accent }}
        >
          <Editable value="HAVE A PROJECT IN MIND?" />
        </span>

        <Editable
          as="h2"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[92px] font-sans font-bold leading-[0.95] max-w-4xl mb-12 tracking-tight"
          style={{ color: ink }}
          value={props?.title || "Let’s create something together."}
          onChange={(v) => onChange?.({ title: v })}
        />

        <div>
          <a
            href="mailto:hello@ambitious.studio"
            className="inline-flex items-center gap-4 md:gap-8 pb-3 border-b-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-bold transition-opacity hover:opacity-75"
            style={{ borderColor: accent, color: ink }}
          >
            <Editable value="hello@ambitious.studio" />
            <ArrowUpRight className="w-6 h-6 md:w-10 md:h-10 shrink-0" />
          </a>
        </div>

        <div
          className="mt-24 md:mt-32 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-wider opacity-75"
          style={{ borderColor: `${ink}1A`, color: ink }}
        >
          <span className="flex items-center gap-2">
            <MapPin size={16} style={{ color: accent }} />
            <Editable value="Copenhagen · International" />
          </span>
          <span>
            <Editable value="NEW COLLABORATIONS WELCOME" />
          </span>
        </div>
      </div>
    </section>
  );
}

export const Contact = ArchitectureStudio3Contact;
export default ArchitectureStudio3Contact;
