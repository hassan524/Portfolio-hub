// @ts-nocheck
import { useState } from "react";
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, Menu, X } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";

export function ArchitectureStudio2Navbar({ props = {}, theme, onChange }: BlockComponentProps<any>) {
  const [isOpen, setIsOpen] = useState(false);
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#EB5837";

  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Studio", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Notes", href: "#testimonials" },
  ];

  return (
    <nav
      className="relative z-20 flex items-center justify-between gap-6 px-6 md:px-12 lg:px-16 py-5 backdrop-blur-md border-b transition-colors w-full h-full min-h-[76px]"
      style={{
        backgroundColor: `${bg}F2`,
        borderColor: `${ink}1A`,
        color: ink,
        fontFamily: '"DM Sans", Arial, sans-serif',
      }}
    >
      {/* Logo — wrapped in div so [&_nav>div] applies block-bg to full navbar */}
      <div className="flex items-center min-w-0 shrink-0">
        <a
          href="#top"
          className="flex items-center gap-3 text-[35px] font-semibold italic leading-none tracking-tight whitespace-nowrap transition-opacity hover:opacity-80 font-serif"
          style={{ color: ink, fontFamily: '"Cormorant Garamond", Georgia, serif' }}
        >
          {props?.logo ? (
            <img
              src={props.logo}
              alt="Logo"
              className="h-9 w-auto max-w-[180px] shrink-0 object-contain"
            />
          ) : (
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 14 14" fill="none">
              <rect x="7" y="0.5" width="9" height="9" transform="rotate(45 7 0.5)" fill={accent} style={{ fill: accent }} />
            </svg>
          )}
          <Editable value={props?.logoText || "Cúbiq"} onChange={(v) => onChange?.({ logoText: v })} />
        </a>
      </div>

      {/* Links — div instead of nav so [&_nav>div] applies block-bg */}
      <div className="hidden md:flex items-center gap-8 text-[12px] font-semibold uppercase tracking-wider">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="transition-opacity hover:opacity-60"
            style={{ color: ink }}
          >
            <Editable value={link.label} />
          </a>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-5">
        <span
          className="flex items-center gap-2 text-[9px] font-bold tracking-wider uppercase border rounded-full px-2.5 py-1.5 whitespace-nowrap"
          style={{ borderColor: `${ink}26`, color: ink }}
        >
          <svg className="w-1.5 h-1.5 shrink-0" viewBox="0 0 6 6">
            <circle cx="3" cy="3" r="3" fill={accent} style={{ fill: accent }} />
          </svg>
          <Editable value="OPEN FOR COLLABORATION" />
        </span>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 rounded-none h-10 px-[18px] text-[10px] font-bold tracking-wider uppercase shadow-none cursor-pointer transition-transform hover:-translate-y-0.5 bg-[var(--accent)] text-white"
          style={{ backgroundColor: accent, color: "#ffffff", "--accent": accent }}
        >
          <Editable value="LET’S TALK" />
          <ArrowUpRight size={14} />
        </a>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden h-9 w-9 rounded-md flex items-center justify-center transition-opacity hover:opacity-80"
        style={{ backgroundColor: surface, color: ink }}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 p-6 shadow-2xl md:hidden flex flex-col gap-4 border-b z-40 backdrop-blur-lg"
          style={{
            backgroundColor: bg,
            borderColor: `${ink}1A`,
            color: ink,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold uppercase tracking-wider py-1 transition-opacity hover:opacity-60"
              style={{ color: ink }}
            >
              <Editable value={link.label} />
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold uppercase tracking-wider py-1 transition-opacity hover:opacity-60"
            style={{ color: accent }}
          >
            <Editable value="Contact" />
          </a>
        </div>
      )}
    </nav>
  );
}

export const Navbar = ArchitectureStudio2Navbar;
export default ArchitectureStudio2Navbar;
