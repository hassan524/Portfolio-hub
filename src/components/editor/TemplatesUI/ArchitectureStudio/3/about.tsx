// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, Plus } from "lucide-react";

export function ArchitectureStudio3About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  return (
    <section
      id="about"
      className="px-6 md:px-14 lg:px-20 py-24 md:py-32 transition-colors w-full"
      style={{ backgroundColor: bgSecond, color: ink }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        <div>
          <span
            className="text-[10px] font-bold uppercase tracking-widest block mb-4"
            style={{ color: accent }}
          >
            <Editable value="THE STUDIO / 01" />
          </span>
          <Editable
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.02] font-sans max-w-md tracking-tight"
            style={{ color: ink }}
            value={props?.title || "Built on curiosity."}
            onChange={(v) => onChange?.({ title: v })}
          />
        </div>

        <div className="pt-0 md:pt-16 grid grid-cols-1 sm:grid-cols-[90px_1fr] gap-6 md:gap-8 items-start">
          <div
            className="w-[90px] h-[90px] border flex items-center justify-center shrink-0"
            style={{ borderColor: accent, color: accent }}
          >
            <Plus size={50} strokeWidth={1} />
          </div>

          <div>
            <Editable
              as="p"
              className="text-base md:text-[17px] leading-[1.8] mb-8 opacity-85 max-w-lg"
              style={{ color: inkSecond }}
              value={
                props?.description ||
                "We are an independent architecture practice working at the intersection of space, material and human experience. Our approach is considered, collaborative and never ordinary."
              }
              onChange={(v) => onChange?.({ description: v })}
            />

            <a
              href="#services"
              className="inline-flex items-center gap-6 pb-2 border-b text-[10px] font-bold uppercase tracking-wider transition-opacity hover:opacity-60"
              style={{ borderColor: ink, color: ink }}
            >
              <Editable value="HOW WE WORK" />
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export const About = ArchitectureStudio3About;
export default ArchitectureStudio3About;
