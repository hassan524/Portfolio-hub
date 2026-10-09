// @ts-nocheck
import { useState } from "react";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";

export function Bakery2Navbar({ props = {}, theme, onChange }: any) {
  const [open, setOpen] = useState(false);
  const bg = theme?.bg || "#ffffff";
  const ink = theme?.ink || "#242023";
  const surface = theme?.surface || "#ded7dc";
  const accent = theme?.accent || "#b23b68";
  const fontHeading = theme?.fontHeading || "Fraunces";
  const fontBody = theme?.fontBody || "Inter";

  const links = [
    { label: "Bakes", href: "#work" },
    { label: "Story", href: "#about" },
    { label: "Craft", href: "#services" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Atelier", href: "#contact" },
  ];

  return (
    <header
      className="relative z-50 w-full transition-colors border-b py-5 px-6 md:px-12"
      style={{
        backgroundColor: bg,
        borderColor: "rgba(0,0,0,0.06)",
        color: ink,
        fontFamily: fontBody,
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3 shrink-0 hover:opacity-85 transition-opacity">
          {props?.logo ? (
            <img src={props.logo} alt="Logo" className="h-9 w-auto max-w-[150px] object-contain" />
          ) : (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs"
              style={{ backgroundColor: `${accent}15`, color: accent }}
            >
              ✦
            </div>
          )}
          <span className="text-2xl font-light tracking-tight" style={{ fontFamily: fontHeading }}>
            <Editable
              value={props?.logoText || "Levain Atelier"}
              onChange={(v) => onChange?.({ logoText: v })}
            />
          </span>
        </a>

        {/* Center Pill Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-black/[0.03] p-1.5 rounded-full px-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-1.5 text-xs font-medium rounded-full transition-all hover:bg-white hover:shadow-xs"
              style={{ color: ink }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center shrink-0">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white rounded-full shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
            style={{ backgroundColor: accent }}
          >
            <span>Visit Atelier</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          data-preview-chrome
          data-blend-ignore
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
          className="md:hidden p-2.5 rounded-full border border-black/10 flex items-center justify-center cursor-pointer select-none"
          style={{ color: ink }}
          aria-label="Toggle Navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-preview-chrome
            data-blend-ignore
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 p-6 shadow-2xl md:hidden z-50 border-b"
            style={{ backgroundColor: bg, borderColor: "rgba(0,0,0,0.08)" }}
          >
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                  }}
                  className="py-3 text-base font-medium border-b border-black/5 flex items-center justify-between"
                  style={{ color: ink }}
                >
                  <span style={{ fontFamily: fontHeading }} className="text-lg">
                    {link.label}
                  </span>
                  <ArrowUpRight size={14} style={{ color: accent }} />
                </a>
              ))}

              <a
                href="#contact"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                className="mt-4 py-3.5 rounded-full text-center text-xs font-semibold uppercase tracking-wider text-white shadow-md"
                style={{ backgroundColor: accent }}
              >
                Visit Atelier
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export const Navbar = Bakery2Navbar;
export default Bakery2Navbar;
