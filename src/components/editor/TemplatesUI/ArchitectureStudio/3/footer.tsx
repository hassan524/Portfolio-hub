// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUp, ArrowRight } from "lucide-react";

export function ArchitectureStudio3Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#09090B";
  const ink = theme?.ink || "#FFFFFF";
  const fontBody = theme?.fontBody || "DM Sans";

  return (
    <footer
      className="w-full px-6 md:px-12 lg:px-16 pt-20 pb-12 transition-colors border-t border-white/12 font-mono"
      style={{
        backgroundColor: bg,
        color: ink,
        fontFamily: fontBody,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/12">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <a
                href="#top"
                className="text-2xl md:text-3xl font-bold uppercase tracking-tight block mb-4 text-white"
              >
                <Editable value={props?.logoText || "AMB·TIOUS"} onChange={(v) => onChange?.({ logoText: v })} />
              </a>
              <p className="text-xs font-sans leading-relaxed max-w-sm text-white/70 font-light">
                An experimental Nordic architectural atelier dedicated to monolithic civic spaces, net-negative carbon engineering, and radical spatial purity.
              </p>
            </div>

            <div className="text-[11px] text-white/50 mt-6">
              HELSINKI // COPENHAGEN // BERLIN · ISO 14001 CERTIFIED
            </div>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-2">
            <span className="text-[10px] uppercase tracking-widest block mb-4 text-white font-bold">
              PORTFOLIO
            </span>
            <div className="space-y-3 text-xs text-white/75">
              <a href="#projects" className="block hover:text-white transition-colors">
                Built Works
              </a>
              <a href="#about" className="block hover:text-white transition-colors">
                The Practice
              </a>
              <a href="#services" className="block hover:text-white transition-colors">
                Capabilities
              </a>
              <a href="#testimonials" className="block hover:text-white transition-colors">
                Critical Appraisal
              </a>
            </div>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-2">
            <span className="text-[10px] uppercase tracking-widest block mb-4 text-white font-bold">
              STUDIOS
            </span>
            <div className="space-y-3 text-xs text-white/75">
              <p>Helsinki Central</p>
              <p>Copenhagen Lab</p>
              <p>Berlin Atelier</p>
              <a href="#contact" className="block text-white font-bold underline hover:text-white/80">
                Direct Wire →
              </a>
            </div>
          </div>

          {/* Monograph Dispatch */}
          <div className="md:col-span-3">
            <span className="text-[10px] uppercase tracking-widest block mb-4 text-white font-bold">
              MONOGRAPH DISPATCH
            </span>
            <p className="text-xs font-sans leading-relaxed text-white/70 mb-4 font-light">
              Receive our annual published documentation of structural models, essays, and built commissions.
            </p>
            <div className="flex border border-white/20">
              <input
                type="email"
                placeholder="patron@domain.com"
                className="w-full px-3 py-2 text-xs bg-transparent text-white outline-none"
              />
              <button
                type="button"
                className="px-3 bg-white text-black flex items-center justify-center hover:bg-white/90 transition-colors cursor-pointer"
                aria-label="Subscribe"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/60">
          <span>© 2026 AMB·TIOUS ARCHITECTURAL LABORATORY. ALL RIGHTS RESERVED.</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 cursor-pointer hover:text-white transition-colors uppercase font-bold"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export const Footer = ArchitectureStudio3Footer;
export default ArchitectureStudio3Footer;
