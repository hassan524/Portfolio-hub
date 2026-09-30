// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import heroImage from "./public/cubiq-tower.jpg";

export function ArchitectureStudio2Hero({ props = {}, theme, onChange }: any) {
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
      }}
    >
      <div className="absolute inset-0 md:left-[43%] z-0">
        <img
          src={heroImage}
          alt="Sculptural terracotta residential building"
          className="w-full h-full object-cover object-[center_42%]"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, ${bg} 0%, transparent 42%)`,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-14 lg:px-20">
        <div
          className="flex items-center gap-3 mb-5 text-[10px] font-bold uppercase tracking-wider"
          style={{ color: accent }}
        >
          <Editable value="ARCHITECTURE WITH FEELING" />
        </div>

        <Editable
          as="h1"
          className="text-[54px] sm:text-[70px] md:text-[86px] lg:text-[104px] font-medium leading-[0.86] max-w-2xl mb-6 tracking-tight font-serif [&_span.italic]:italic"
          style={{ color: ink, fontFamily: '"Cormorant Garamond", Georgia, serif' }}
          value={props?.headline || 'Design with an<br /><span class="italic">aesthetic sense.</span>'}
          onChange={(v) => onChange?.({ headline: v })}
        />

        <Editable
          as="p"
          className="max-w-[400px] text-[15px] leading-[1.75] mb-8 opacity-80"
          style={{ color: inkSecond }}
          value={props?.subheadline || "Spaces that make you stop, feel, and imagine what comes next."}
          onChange={(v) => onChange?.({ subheadline: v })}
        />

        <div className="flex flex-wrap items-center gap-6">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-none h-10 px-5 text-[10px] font-bold tracking-wider uppercase shadow-none cursor-pointer hover:-translate-y-0.5 transition-transform bg-[var(--accent)] text-white"
            style={{ backgroundColor: accent, color: "#ffffff", "--accent": accent }}
          >
            <Editable value="EXPLORE PROJECTS" />
            <ArrowUpRight size={16} />
          </a>

          <a
            href="#about"
            className="inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-wider transition-opacity hover:opacity-70"
            style={{ color: ink }}
          >
            <Editable value="ABOUT OUR STUDIO" />
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-6 left-6 right-6 md:left-14 md:right-14 lg:left-20 lg:right-20 z-10 flex justify-between text-[10px] font-bold uppercase tracking-wider opacity-75"
        style={{ color: ink }}
      >
        <Editable value="INDEPENDENT ARCHITECTURE STUDIO" />
        <Editable value="SCROLL TO DISCOVER ↓" />
      </div>
    </section>
  );
}

export const Hero = ArchitectureStudio2Hero;
export default ArchitectureStudio2Hero;
