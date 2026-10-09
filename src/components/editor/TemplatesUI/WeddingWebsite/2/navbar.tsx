// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

interface NavbarProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const WeddingWebsite2Navbar: React.FC<NavbarProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [menuOpen, setMenuOpen] = useState(false);

  const bg = theme.bg || "#FAF7FD";
  const ink = theme.ink || "#201235";
  const accent = theme.accent || "#8B5CF6";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-purple-200/80 transition-all duration-300">
      
      {/* Top Architectural Coordinate Strip */}
      <div className="w-full border-b border-purple-100 py-1.5 px-6 md:px-12 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-purple-900/70">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
          <span>PARIS 48.8566° N • PROVENCE ATELIER</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>NOW COMMISIONING 2026/2027</span>
          <span>•</span>
          <span>WORLDWIDE COURIER DISPATCH</span>
        </div>
      </div>

      {/* Main Luxury Header Row */}
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between gap-6">
        
        {/* Left Side: Editorial Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-purple-950/80">
          <a
            href="#about"
            className="hover:text-purple-600 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-purple-600 after:transition-all"
          >
            <Editable value={p.nav1 || "The Atelier"} onChange={(v) => handleUpdate("nav1", v)} />
          </a>
          <a
            href="#projects"
            className="hover:text-purple-600 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-purple-600 after:transition-all"
          >
            <Editable value={p.nav2 || "Bespoke Portfolio"} onChange={(v) => handleUpdate("nav2", v)} />
          </a>
          <a
            href="#testimonials"
            className="hover:text-purple-600 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-purple-600 after:transition-all"
          >
            <Editable value={p.nav3 || "Press & Reviews"} onChange={(v) => handleUpdate("nav3", v)} />
          </a>
        </nav>

        {/* Center: Majestic Spaced Serif Brand Wordmark */}
        <div className="flex flex-col items-center text-center">
          <a href="#" className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-serif font-bold tracking-[0.25em] text-purple-950 uppercase">
              <Editable value={p.brandName || "Maison Violette"} onChange={(v) => handleUpdate("brandName", v)} />
            </span>
          </a>
          <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-purple-600/80 mt-0.5">
            <Editable value={p.brandSub || "Papeterie & Confections de Mariage"} onChange={(v) => handleUpdate("brandSub", v)} />
          </span>
        </div>

        {/* Right Side: Haute Couture Concierge Triggers */}
        <div className="flex items-center gap-4">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border border-purple-300 text-purple-950 hover:bg-purple-100 transition-all shadow-xs"
          >
            <FaWhatsapp className="text-emerald-600 text-sm" />
            <span>
              <Editable value={p.ctaText || "Direct Inquiry"} onChange={(v) => handleUpdate("ctaText", v)} />
            </span>
          </motion.a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all"
            style={{ backgroundColor: accent }}
          >
            <span>Commission</span>
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 rounded-full border border-purple-200 flex items-center justify-center text-purple-950 text-sm font-serif"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-purple-100 px-6 py-6 space-y-4 bg-white"
          >
            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="block text-base font-serif font-bold text-purple-950 hover:text-purple-600 uppercase tracking-wider"
            >
              The Atelier & Craft
            </a>
            <a
              href="#projects"
              onClick={() => setMenuOpen(false)}
              className="block text-base font-serif font-bold text-purple-950 hover:text-purple-600 uppercase tracking-wider"
            >
              Bespoke Portfolio & Cards
            </a>
            <a
              href="#testimonials"
              onClick={() => setMenuOpen(false)}
              className="block text-base font-serif font-bold text-purple-950 hover:text-purple-600 uppercase tracking-wider"
            >
              Press & Client Acclaim
            </a>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="block text-base font-serif font-bold text-purple-600 uppercase tracking-wider"
            >
              Direct Studio Commission
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default WeddingWebsite2Navbar;
