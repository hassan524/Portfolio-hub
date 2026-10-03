// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";

export function ArchitectureStudio1Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const fontHeading = theme?.fontHeading || "Cormorant Garamond";
  const fontBody = theme?.fontBody || "DM Sans";

  return (
    <section
      id="testimonials"
      className="px-6 md:px-14 lg:px-20 py-24 md:py-32 transition-colors text-center w-full"
      style={{ backgroundColor: bgSecond, color: ink, fontFamily: fontBody }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <span
          className="text-[10px] font-bold uppercase tracking-widest block mb-4"
          style={{ color: accent }}
        >
          <Editable value="WORDS FROM OUR CLIENTS" />
        </span>

        <div
          className="text-7xl md:text-8xl leading-none select-none my-2"
          style={{ color: accent, fontFamily: fontHeading }}
        >
          “
        </div>

        <Editable
          as="blockquote"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.2] max-w-3xl mb-10 tracking-tight font-serif"
          style={{ color: ink, fontFamily: fontHeading }}
          value={
            props?.quote ||
            "“Sagent understood the character of our neighbourhood and created something that feels entirely of its place.”"
          }
          onChange={(v) => onChange?.({ quote: v })}
        />

        <div className="flex items-center gap-3 text-xs">
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs"
            style={{ backgroundColor: surface, color: accent }}
          >
            ●
          </span>
          <div className="text-left">
            <Editable as="p" className="font-semibold" style={{ color: ink }} value="Maya Chen" />
            <Editable as="p" className="opacity-60 text-[11px]" style={{ color: inkSecond }} value="Development Partner" />
          </div>
        </div>
      </div>
    </section>
  );
}

export const Testimonials = ArchitectureStudio1Testimonials;
export default ArchitectureStudio1Testimonials;
