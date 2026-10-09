// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUp, ArrowUpRight } from "lucide-react";

const mix = (c: string = "#1A1816", p: number = 50) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function ArchitectureStudio2Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F4F0EA";
  const ink = theme?.ink || "#1A1816";
  const inkSecond = theme?.["ink-second"] || "#5C5650";
  const accent = theme?.accent || "#C85A32";
  const fontHeading = theme?.fontHeading || "DM Sans";
  const fontBody = theme?.fontBody || "DM Sans";

  return (
    <footer
      className="w-full px-6 md:px-12 pt-20 pb-12 transition-colors font-mono"
      style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b" style={{ borderColor: mix(ink, 16) }}>
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <a
                href="#top"
                className="text-3xl font-bold tracking-tight uppercase leading-none block mb-4"
                style={{ color: ink }}
              >
                <Editable value={props?.logoText || "Cúbiq"} onChange={(v) => onChange?.({ logoText: v })} />
              </a>
              <p className="text-xs font-sans leading-relaxed max-w-sm opacity-80" style={{ color: inkSecond }}>
                An architectural and structural practice committed to raw materials, geometric clarity, and high-performance carbon-negative engineering.
              </p>
            </div>

            <div className="text-[11px] opacity-60 mt-6">
              ISO 9001 QUALITY · ISO 14001 ENVIRONMENTAL ACCREDITED
            </div>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-2">
            <span className="text-[10px] uppercase tracking-widest block mb-4 font-bold" style={{ color: accent }}>
              ARCHIVE
            </span>
            <div className="space-y-2.5 text-xs">
              <a href="#projects" className="block transition-opacity hover:opacity-60" style={{ color: ink }}>
                Work Catalog
              </a>
              <a href="#about" className="block transition-opacity hover:opacity-60" style={{ color: ink }}>
                Tectonic Principles
              </a>
              <a href="#services" className="block transition-opacity hover:opacity-60" style={{ color: ink }}>
                Methodology
              </a>
              <a href="#testimonials" className="block transition-opacity hover:opacity-60" style={{ color: ink }}>
                Evaluations
              </a>
            </div>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-2">
            <span className="text-[10px] uppercase tracking-widest block mb-4 font-bold" style={{ color: accent }}>
              STUDIOS
            </span>
            <div className="space-y-2.5 text-xs opacity-85">
              <p>Milano HQ</p>
              <p>Zürich Hub</p>
              <a href="#contact" className="block font-bold transition-opacity hover:opacity-60" style={{ color: accent }}>
                Commission Wire →
              </a>
            </div>
          </div>

          {/* Legal Coordinates */}
          <div className="md:col-span-3">
            <span className="text-[10px] uppercase tracking-widest block mb-4 font-bold" style={{ color: accent }}>
              SPECIFICATION
            </span>
            <p className="text-xs font-sans leading-relaxed opacity-75 mb-4" style={{ color: inkSecond }}>
              All documented drawings, structural models, and monograph texts are property of Cúbiq Studio S.r.l.
            </p>
            <div className="text-xs">
              <span>STATUS: </span>
              <span className="font-bold text-green-700">COMMISSIONS OPEN</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs opacity-75">
          <span>© 2026 CÚBIQ ARCHITECTURAL STUDIO. ALL RIGHTS RESERVED.</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-60 uppercase font-bold"
            style={{ color: ink }}
          >
            <span>RETURN TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export const Footer = ArchitectureStudio2Footer;
export default ArchitectureStudio2Footer;
