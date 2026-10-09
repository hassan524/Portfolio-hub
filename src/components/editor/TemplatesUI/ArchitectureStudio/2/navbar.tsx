// @ts-nocheck
import { useState } from "react";
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, Menu, X, Cpu, Compass } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";

const mix = (c: string = "#1A1816", p: number = 50) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function ArchitectureStudio2Navbar({ props = {}, theme, onChange }: BlockComponentProps<any>) {
  const [isOpen, setIsOpen] = useState(false);
  const bg = theme?.bg || "#F4F0EA";
  const ink = theme?.ink || "#1A1816";
  const accent = theme?.accent || "#C85A32";
  const fontBody = theme?.fontBody || "DM Sans";

  const navLinks = [
    { idx: "01/05", label: "Works", href: "#projects" },
    { idx: "02/05", label: "Studio", href: "#about" },
    { idx: "03/05", label: "Method", href: "#services" },
    { idx: "04/05", label: "Reviews", href: "#testimonials" },
    { idx: "05/05", label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className="relative z-40 w-full transition-colors border-b py-6 md:py-7 px-6 md:px-12"
      style={{
        backgroundColor: bg,
        borderColor: mix(ink, 16),
        color: ink,
        fontFamily: fontBody,
      }}
    >
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between gap-8">
        {/* Brand: Monogram + Studio Name */}
        <a
          href="#top"
          className="flex items-center gap-3.5 transition-opacity hover:opacity-85 shrink-0"
          style={{ color: ink }}
        >
          {props?.logo ? (
            <img src={props.logo} alt="Logo" className="h-8 w-auto max-w-[160px] shrink-0 object-contain" />
          ) : (
            <div
              className="w-8 h-8 flex items-center justify-center border font-mono font-bold text-xs shrink-0"
              style={{ borderColor: ink, backgroundColor: mix(accent, 12), color: accent }}
            >
              C³
            </div>
          )}
          <span className="text-xl font-bold tracking-tight uppercase leading-none font-sans">
            <Editable value={props?.logoText || "Cúbiq Architecture"} onChange={(v) => onChange?.({ logoText: v })} />
          </span>
        </a>

        {/* Clean, Decongested Center Links */}
        <nav className="hidden md:flex items-center gap-10 text-xs font-mono uppercase tracking-[0.2em] font-semibold">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="py-1 relative transition-colors hover:opacity-100 group"
              style={{ color: mix(ink, 75) }}
            >
              <Editable value={link.label} />
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full"
                style={{ backgroundColor: accent }}
              />
            </a>
          ))}
        </nav>

        {/* Right CTA with comfortable height */}
        <div className="hidden sm:flex items-center shrink-0">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-mono uppercase tracking-widest font-bold text-white transition-transform hover:-translate-y-0.5 cursor-pointer shadow-xs"
            style={{ backgroundColor: accent }}
          >
            <Editable value="Start Project" />
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Mobile Hamburger with data-preview-chrome and click protection */}
        <button
          type="button"
          data-preview-chrome
          data-blend-ignore
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className="md:hidden h-10 w-10 border flex items-center justify-center transition-colors cursor-pointer select-none"
          style={{ borderColor: mix(ink, 22), color: ink }}
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer with Swiss Technical Architecture styling */}
      {isOpen && (
        <div
          data-preview-chrome
          data-blend-ignore
          className="md:hidden absolute top-full left-0 right-0 border-b px-6 py-6 flex flex-col gap-5 shadow-2xl z-50 font-mono"
          style={{ backgroundColor: bg, borderColor: mix(ink, 16), color: ink }}
        >
          <div className="flex items-center justify-between pb-3 border-b text-[10px] uppercase tracking-widest" style={{ borderColor: mix(ink, 12) }}>
            <span className="font-bold" style={{ color: accent }}>SYS.NAV // SPECIFICATION</span>
            <span className="opacity-60">ZÜRICH • MILANO</span>
          </div>

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="py-3 px-3 border border-transparent hover:border-black/20 flex items-center justify-between transition-colors bg-black/[0.02]"
                style={{ borderColor: mix(ink, 8) }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] opacity-40 font-bold">{link.idx}</span>
                  <span className="text-sm uppercase tracking-wider font-bold">{link.label}</span>
                </div>
                <ArrowUpRight size={15} style={{ color: accent }} />
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="w-full py-3.5 text-center text-xs uppercase tracking-widest font-bold text-white flex items-center justify-center gap-2 shadow-xs"
              style={{ backgroundColor: accent }}
            >
              <span>Initiate Project RFQ</span>
              <ArrowUpRight size={14} />
            </a>

            <div className="text-center text-[10px] opacity-60">
              DIRECT DISPATCH: commissions@cubiq.studio
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export const Navbar = ArchitectureStudio2Navbar;
export default ArchitectureStudio2Navbar;
