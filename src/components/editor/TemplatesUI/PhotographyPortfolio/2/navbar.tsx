// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Compass, Sun } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PhotographyPortfolio2Navbar({ props = {}, theme, onChange }: any) {
  const [open, setOpen] = useState(false);
  const bg = theme?.bg || "#F7F6F2";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#EDEDE6";
  const ink = theme?.text || theme?.ink || "#242922";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#636A60";
  const accent = theme?.accent || "#2D5A3E";
  const onAccent = theme?.["on-accent"] || "#FFFFFF";

  const brand = props.brandName || "SOLIS STUDIO";
  const links = props.navLinks || [
    { label: "Galleries", href: "#projects" },
    { label: "Print Store", href: "#services" },
    { label: "Artist Statement", href: "#about" },
    { label: "Exhibitions", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const go = (e: any, href: string) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full pt-3 px-4 sm:px-6 pointer-events-none">
      <div
        className="max-w-6xl mx-auto h-16 rounded-full px-6 flex items-center justify-between pointer-events-auto border shadow-lg backdrop-blur-xl transition-all"
        style={{ background: `${bg}e0`, borderColor: `${ink}15` }}
      >
        {/* Brand with minimalist geometric leaf mark */}
        <a href="#home" onClick={(e) => go(e, "#home")} className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: accent }} />
          <span className="text-base sm:text-lg font-mono tracking-tight font-semibold uppercase" style={{ color: ink }}>
            <Editable value={brand} onChange={(v) => onChange?.({ brandName: v })} />
          </span>
          <span className="hidden sm:inline text-[10px] font-mono opacity-50 pl-2 border-l" style={{ borderColor: `${ink}20` }}>
            ARCHITECTURAL & FINE ART
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono tracking-wider">
          {links.map((l: any) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className="transition-colors hover:opacity-100 opacity-70"
              style={{ color: ink }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-transform hover:scale-105 active:scale-95"
            style={{ background: accent, color: onAccent }}
          >
            <span><Editable value={props.navCta || "Inquire"} onChange={(v) => onChange?.({ navCta: v })} /></span>
            <ArrowUpRight size={13} />
          </a>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
            style={{ background: bgSecond, color: ink }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden max-w-6xl mx-auto mt-2 rounded-3xl p-6 border shadow-xl pointer-events-auto backdrop-blur-xl"
            style={{ background: bg, borderColor: `${ink}15` }}
          >
            <div className="space-y-3 font-mono text-sm">
              {links.map((l: any) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="block py-2 border-b border-black/5"
                  style={{ color: ink }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => go(e, "#contact")}
                className="mt-3 w-full py-3 rounded-full text-xs font-mono font-medium text-center uppercase block"
                style={{ background: accent, color: onAccent }}
              >
                {props.navCta || "Commission / Print Store"}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default PhotographyPortfolio2Navbar;
