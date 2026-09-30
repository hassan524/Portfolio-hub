// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import heroImage from "./public/ambitious-building.jpg";

export function ArchitectureStudio3Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  return (
    <section
      id="top"
      className="relative flex items-center min-h-[620px] overflow-hidden transition-colors w-full"
      style={{
        backgroundColor: bg,
        color: ink,
        fontFamily: '"DM Sans", Arial, sans-serif',
        "--accent": accent,
        "--ink": ink,
        "--bg": bg,
      }}
    >
      <div className="absolute inset-0 md:left-[38%] z-0">
        <img
          src={heroImage}
          alt="Curved modern glass architectural facade"
          className="w-full h-full object-cover object-[center_50%]"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, ${bg} 0%, transparent 45%)`,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-14 lg:px-20">
        <div
          className="flex items-center gap-3 mb-5 text-[10px] font-bold uppercase tracking-wider"
          style={{ color: accent }}
        >
          <Editable value="INDEPENDENT ARCHITECTURE STUDIO" />
        </div>

        <Editable
          as="h1"
          className="text-[54px] sm:text-[70px] md:text-[86px] lg:text-[104px] font-medium leading-[0.92] max-w-2xl mb-6 tracking-tight font-sans"
          style={{ color: ink, fontFamily: '"DM Sans", Arial, sans-serif' }}
          value={props?.headline || "Ambitious by design."}
          onChange={(v) => onChange?.({ headline: v })}
        />

        <Editable
          as="p"
          className="max-w-[400px] text-[15px] leading-[1.75] mb-8 opacity-80"
          style={{ color: inkSecond }}
          value={
            props?.subheadline ||
            "Architecture that moves beyond the expected. Thoughtful spaces for the ways we live tomorrow."
          }
          onChange={(v) => onChange?.({ subheadline: v })}
        />

        <div className="flex flex-wrap items-center gap-6">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-none h-10 px-5 text-[10px] font-bold tracking-wider uppercase shadow-none cursor-pointer hover:-translate-y-0.5 transition-transform bg-[#292929] text-white"
            style={{ backgroundColor: accent, color: "#ffffff" }}
          >
            <Editable value="VIEW PROJECTS" />
            <ArrowUpRight size={16} />
          </a>

          <a
            href="#about"
            className="inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-wider transition-opacity hover:opacity-70"
            style={{ color: ink }}
          >
            <Editable value="ABOUT US" />
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-6 left-6 right-6 md:left-14 md:right-14 lg:left-20 lg:right-20 z-10 flex justify-between text-[10px] font-bold uppercase tracking-wider opacity-75"
        style={{ color: ink }}
      >
        <Editable value="01 / 03" />
        <Editable value="SCROLL TO EXPLORE ↓" />
      </div>
    </section>
  );
}

export const Hero = ArchitectureStudio3Hero;
export default ArchitectureStudio3Hero;
