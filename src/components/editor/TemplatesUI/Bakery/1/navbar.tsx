// @ts-nocheck
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";

export function Bakery1Navbar({ props = {}, theme, onChange }: any) {
  const [open, setOpen] = useState(false);
  const bg = theme?.bg || "#faf9f6";
  const ink = theme?.ink || "#1a1a1a";
  const surface = theme?.surface || "#dcdbd8";
  const accent = theme?.accent || "#e85d3d";
  const fontHeading = theme?.fontHeading || "Fraunces";
  const fontBody = theme?.fontBody || "Inter";
  const links = ["Work", "Services", "About", "Team", "Contact"];

  return (
    <nav
      className="relative z-50 w-full backdrop-blur-md bg-opacity-95 transition-all shadow-sm"
      style={{ backgroundColor: bg, color: ink, borderBottom: `1px solid ${surface}` }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-3">
          {props?.logo ? (
            <img src={props.logo} alt="Logo" className="h-10 w-auto max-w-[160px] object-contain" />
          ) : (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill={accent}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          )}
          <Editable
            value={props?.logoText || "The Pantry"}
            onChange={(v) => onChange?.({ logoText: v })}
            className="text-2xl font-light tracking-tight"
            style={{ fontFamily: fontHeading, color: ink }}
          />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm font-medium transition-all hover:opacity-60 relative py-1"
              style={{ color: ink }}
            >
              {l}
            </a>
          ))}
        </div>

        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          href="#contact"
          className="hidden md:inline-flex items-center px-6 py-2.5 text-sm font-semibold rounded-full transition-all shadow-sm"
          style={{ backgroundColor: accent, color: "#fff" }}
        >
          Visit Us
        </motion.a>

        <button
          type="button"
          data-preview-chrome
          data-blend-ignore
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
          className="md:hidden p-2.5 rounded-xl cursor-pointer select-none"
          style={{ color: ink, backgroundColor: surface }}
          aria-label="Toggle Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-preview-chrome
            data-blend-ignore
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full shadow-2xl md:hidden z-50 border-b"
            style={{ backgroundColor: bg, borderColor: surface }}
          >
            <div className="flex flex-col gap-2 px-6 py-6">
              {links.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                  }}
                  className="py-3 text-lg font-medium border-b border-black/5 flex items-center justify-between"
                  style={{ color: ink }}
                >
                  <span>{l}</span>
                  <span className="text-xs opacity-40">→</span>
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                className="mt-4 text-center py-3.5 rounded-full text-white font-semibold shadow-md cursor-pointer"
                style={{ backgroundColor: accent }}
              >
                Visit Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export const Navbar = Bakery1Navbar;
export default Bakery1Navbar;