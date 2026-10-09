// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, Menu, X, Radio } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";

export function ArchitectureStudio3Navbar({ props = {}, theme, onChange }: BlockComponentProps<any>) {
  const [isOpen, setIsOpen] = useState(false);
  const bg = theme?.bg || "#09090B";
  const ink = theme?.ink || "#FFFFFF";
  const accent = theme?.accent || "#FFFFFF";
  const fontBody = theme?.fontBody || "DM Sans";

  const navLinks = [
    { num: "01", label: "Selected Works", href: "#projects" },
    { num: "02", label: "The Practice", href: "#about" },
    { num: "03", label: "Disciplines", href: "#services" },
    { num: "04", label: "Monographs", href: "#testimonials" },
    { num: "05", label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-40 w-full transition-colors border-b py-6 md:py-7 px-6 md:px-12 lg:px-16"
      style={{
        backgroundColor: bg,
        borderColor: "rgba(255, 255, 255, 0.14)",
        color: ink,
        fontFamily: fontBody,
      }}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Brand: Minimal Monochrome Monogram + Title */}
        <div className="flex items-center gap-6 shrink-0">
          <a
            href="#top"
            className="flex items-center gap-3 text-xl md:text-2xl font-bold tracking-tight whitespace-nowrap transition-opacity hover:opacity-85"
            style={{ color: ink }}
          >
            {props?.logo ? (
              <img src={props.logo} alt="Logo" className="h-8 w-auto max-w-[160px] shrink-0 object-contain" />
            ) : (
              <div className="w-7 h-7 bg-white text-black flex items-center justify-center font-mono font-bold text-xs">
                A
              </div>
            )}
            <span className="uppercase tracking-[0.08em] font-sans">
              <Editable value={props?.logoText || "AMB·TIOUS"} onChange={(v) => onChange?.({ logoText: v })} />
            </span>
          </a>
        </div>

        {/* Minimal High-Contrast Links */}
        <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/75 hover:text-white transition-colors relative py-1 group"
            >
              <Editable value={link.label} />
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Inverted White Button */}
        <div className="hidden sm:flex items-center shrink-0">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-bold bg-white text-black transition-all hover:bg-white/90 hover:scale-[1.02] shadow-sm cursor-pointer"
          >
            <Editable value="Commission Brief" />
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
          className="md:hidden h-10 w-10 border border-white/25 flex items-center justify-center text-white cursor-pointer select-none"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Curtain Drawer with Brutalist Styling */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-preview-chrome
            data-blend-ignore
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="md:hidden absolute top-full left-0 right-0 border-b border-white/14 px-6 py-8 flex flex-col gap-6 shadow-2xl z-50 font-mono"
            style={{ backgroundColor: "#09090B" }}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] uppercase tracking-widest text-white/50">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>MONOLITHIC TERMINAL</span>
              </div>
              <span>OSLO // NY // TOKYO</span>
            </div>

            <div className="flex flex-col gap-1 font-sans">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="py-3 border-b border-white/10 flex items-center justify-between text-white/80 hover:text-white hover:pl-2 transition-all group"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10px] font-mono text-white/40">{link.num}</span>
                    <span className="text-xl font-bold uppercase tracking-wider text-white">
                      <Editable value={link.label} />
                    </span>
                  </div>
                  <ArrowUpRight size={16} className="text-white/40 group-hover:text-white" />
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-3 font-sans">
              <a
                href="#contact"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="w-full py-4 text-center text-xs uppercase tracking-widest font-bold bg-white text-black flex items-center justify-center gap-2 hover:bg-white/90 shadow-md"
              >
                <span>Dispatch Commission Brief</span>
                <ArrowUpRight size={14} />
              </a>

              <div className="text-center font-mono text-[10px] text-white/50">
                DIRECT TELEMETRY: commissions@ambitious.studio
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export const Navbar = ArchitectureStudio3Navbar;
export default ArchitectureStudio3Navbar;
