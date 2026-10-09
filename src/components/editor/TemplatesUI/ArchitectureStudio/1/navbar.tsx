// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";
import { Menu, X, ArrowUpRight, Compass } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";

const mix = (c: string = "#111417", p: number = 50) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function ArchitectureStudio1Navbar({ props = {}, theme, onChange }: BlockComponentProps<any>) {
  const [isOpen, setIsOpen] = useState(false);
  const bg = theme?.bg || "#E8EEEB";
  const ink = theme?.ink || "#111417";
  const accent = theme?.accent || "#D92335";
  const fontHeading = theme?.fontHeading || "Cormorant Garamond";
  const fontBody = theme?.fontBody || "DM Sans";

  const navLinks = [
    { num: "01", label: "Work", href: "#projects" },
    { num: "02", label: "Studio", href: "#about" },
    { num: "03", label: "Services", href: "#services" },
    { num: "04", label: "Words", href: "#testimonials" },
    { num: "05", label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className="relative z-40 w-full transition-colors border-b py-6 md:py-7 px-6 md:px-12 lg:px-16"
      style={{
        backgroundColor: bg,
        borderColor: mix(ink, 14),
        color: ink,
        fontFamily: fontBody,
      }}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Clean Logo */}
        <a
          href="#top"
          className="flex items-center gap-2.5 text-2xl sm:text-3xl font-medium tracking-tight whitespace-nowrap transition-opacity hover:opacity-80 shrink-0"
          style={{ color: ink, fontFamily: fontHeading }}
        >
          <div className="w-2.5 h-2.5 rotate-45 shrink-0" style={{ backgroundColor: accent }} />
          <Editable value={props?.logoText || "Sagent"} onChange={(v) => onChange?.({ logoText: v })} />
        </a>

        {/* Minimal Nav Links in Center */}
        <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] font-medium list-none m-0 p-0">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:opacity-100 relative py-1 group"
              style={{ color: mix(ink, 75) }}
            >
              <Editable value={link.label} />
              <span
                className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: accent }}
              />
            </a>
          ))}
        </nav>

        {/* Clean Action on Right */}
        <div className="hidden sm:flex items-center shrink-0">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-semibold text-white transition-transform hover:-translate-y-0.5 cursor-pointer shadow-xs"
            style={{ backgroundColor: accent }}
          >
            <Editable value="Inquire" />
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Mobile Toggle with data-preview-chrome to ensure clicks aren't intercepted in preview */}
        <button
          type="button"
          data-preview-chrome
          data-blend-ignore
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className="md:hidden h-10 w-10 flex items-center justify-center border transition-all hover:opacity-70 cursor-pointer select-none"
          style={{ borderColor: mix(ink, 22), color: ink }}
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer with data-preview-chrome and Atelier styling */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-preview-chrome
            data-blend-ignore
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="absolute top-full left-0 right-0 px-6 py-8 flex flex-col gap-6 shadow-2xl md:hidden z-50 border-b"
            style={{ backgroundColor: bg, borderColor: mix(ink, 14), color: ink }}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: mix(ink, 10) }}>
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold opacity-60">
                Atelier Navigation
              </span>
              <span className="text-[10px] uppercase tracking-widest font-mono opacity-50">
                London • Milan • Kyoto
              </span>
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="py-3 border-b flex items-center justify-between transition-colors hover:pl-2 group"
                  style={{ borderColor: mix(ink, 8), color: ink }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10px] font-mono opacity-40">{link.num}</span>
                    <span className="text-xl sm:text-2xl font-medium tracking-tight" style={{ fontFamily: fontHeading }}>
                      {link.label}
                    </span>
                  </div>
                  <ArrowUpRight size={16} className="opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: accent }} />
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
                className="py-3.5 px-6 text-center text-xs uppercase tracking-[0.18em] font-semibold text-white flex items-center justify-center gap-2 shadow-sm"
                style={{ backgroundColor: accent }}
              >
                <span>Initiate Atelier Dialogue</span>
                <ArrowUpRight size={14} />
              </a>

              <div className="text-center">
                <span className="text-[10px] uppercase tracking-widest opacity-60">
                  Direct Wire: commissions@sagent.studio
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export const Navbar = ArchitectureStudio1Navbar;
export default ArchitectureStudio1Navbar;