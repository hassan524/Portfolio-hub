// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUp } from "lucide-react";

export function ArchitectureStudio3Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  return (
    <footer
      className="px-6 md:px-14 lg:px-20 pt-16 pb-8 transition-colors w-full"
      style={{ backgroundColor: bgSecond, color: ink }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_45px] gap-8 md:gap-10 pb-16">
          <a
            href="#top"
            className="text-3xl md:text-4xl font-sans font-bold leading-none transition-opacity hover:opacity-80"
            style={{ color: ink }}
          >
            <Editable value={props?.logoText || "AMB·TIOUS"} onChange={(v) => onChange?.({ logoText: v })} />
          </a>

          <div className="flex flex-col items-start gap-3 text-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-50 mb-1">
              <Editable value="EXPLORE" />
            </span>
            <a href="#projects" className="transition-opacity hover:opacity-60">
              <Editable value="Projects" />
            </a>
            <a href="#about" className="transition-opacity hover:opacity-60">
              <Editable value="Studio" />
            </a>
            <a href="#services" className="transition-opacity hover:opacity-60">
              <Editable value="Services" />
            </a>
          </div>

          <div className="flex flex-col items-start gap-3 text-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-50 mb-1">
              <Editable value="CONNECT" />
            </span>
            <a href="#testimonials" className="transition-opacity hover:opacity-60">
              <Editable value="Notes" />
            </a>
            <a href="#contact" className="transition-opacity hover:opacity-60">
              <Editable value="Contact" />
            </a>
            <a href="mailto:hello@ambitious.studio" className="transition-opacity hover:opacity-60">
              <Editable value="Email us" />
            </a>
          </div>

          <a
            href="#top"
            className="w-10 h-10 border flex items-center justify-center transition-transform hover:-translate-y-1 self-start"
            style={{ borderColor: `${ink}33`, color: ink }}
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </a>
        </div>

        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase font-bold tracking-wider opacity-60"
          style={{ borderColor: `${ink}1A`, color: ink }}
        >
          <Editable value="© 2026 AMB·TIOUS. All rights reserved." />
          <span className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: accent }}
            />
            <Editable value="STUDIO OPEN" />
          </span>
        </div>
      </div>
    </footer>
  );
}

export const Footer = ArchitectureStudio3Footer;
export default ArchitectureStudio3Footer;
