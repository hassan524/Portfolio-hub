// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaHeart } from "react-icons/fa";

interface NavbarProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const WeddingWebsite1Navbar: React.FC<NavbarProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [menuOpen, setMenuOpen] = useState(false);

  const bg = theme.bg || "#FFF5F7";
  const ink = theme.ink || "#361D24";
  const accent = theme.accent || "#F472B6";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <header className="w-full sticky top-0 z-50 transition-all duration-300">
      {/* Top Animated Announcement Ribbon Ticker */}
      <div
        className="w-full py-1.5 px-4 text-center overflow-hidden border-b border-pink-200/60 font-sans text-[11px] font-bold tracking-wider uppercase text-pink-900 flex items-center justify-center gap-3"
        style={{ backgroundColor: "#FFE4E9" }}
      >
        <motion.div
          animate={{ x: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping inline-block" />
          <span>
            <Editable
              value={p.tickerText || "✿ HANDMADE IN SMALL BATCHES • BESPOKE CARDS, FAVORS & GIFTS • WORLDWIDE TRACKED DISPATCH ✿"}
              onChange={(v) => handleUpdate("tickerText", v)}
            />
          </span>
        </motion.div>
      </div>

      {/* Main Curved Floating Header */}
      <div
        className="backdrop-blur-md border-b"
        style={{
          backgroundColor: `${bg}F2`,
          borderColor: "rgba(244, 114, 182, 0.25)",
          color: ink,
        }}
      >
        <div className="max-w-[1700px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between gap-4">
          
          {/* Brand with Adorable Animated Mascot Emblem */}
          <div className="flex items-center gap-3.5">
            <motion.div
              whileHover={{ scale: 1.12, rotate: [0, -8, 8, 0] }}
              animate={{ y: [0, -3, 0] }}
              transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm cursor-pointer border-2"
              style={{ backgroundColor: "#FFE4E9", borderColor: accent }}
            >
              {/* Cute Teddy Bear & Craft Mascot SVG */}
              <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8">
                {/* Ears */}
                <circle cx="9" cy="9" r="4.5" fill="#D98A72" />
                <circle cx="9" cy="9" r="2.5" fill="#FFCCD5" />
                <circle cx="27" cy="9" r="4.5" fill="#D98A72" />
                <circle cx="27" cy="9" r="2.5" fill="#FFCCD5" />
                {/* Head */}
                <ellipse cx="18" cy="18" rx="10.5" ry="9.5" fill="#E8A590" />
                {/* Muzzle */}
                <ellipse cx="18" cy="20.5" rx="4.5" ry="3.5" fill="#FFF0F3" />
                {/* Eyes */}
                <circle cx="14" cy="16" r="1.3" fill="#361D24" />
                <circle cx="22" cy="16" r="1.3" fill="#361D24" />
                <circle cx="14.4" cy="15.6" r="0.4" fill="#FFFFFF" />
                <circle cx="22.4" cy="15.6" r="0.4" fill="#FFFFFF" />
                {/* Nose */}
                <ellipse cx="18" cy="19.5" rx="1.6" ry="1.2" fill="#361D24" />
                {/* Mouth */}
                <path d="M18 20.8v1.6m-2-0.4c0.7 0.8 1.3 0.8 2 0 0.7 0.8 1.3 0.8 2 0" stroke="#361D24" strokeWidth="0.9" strokeLinecap="round" />
                {/* Cheek Blushes */}
                <circle cx="11.5" cy="19" r="1.8" fill="#F472B6" opacity="0.7" />
                <circle cx="24.5" cy="19" r="1.8" fill="#F472B6" opacity="0.7" />
                {/* Ribbon Bow */}
                <path d="M15 27.5c-2-1.5-2.5-3.5 0-3.5 1.5 0 2.5 1.5 3 2 0.5-0.5 1.5-2 3-2 2.5 0 2 2 0 3.5-1.5 1-2.5 0.5-3-0.5-0.5 1-1.5 1.5-3 0.5z" fill="#E11D48" />
              </svg>
            </motion.div>

            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight leading-tight flex items-center gap-1.5 font-serif text-pink-950">
                <Editable
                  value={p.studioName || "Petite Craft Studio"}
                  onChange={(v) => handleUpdate("studioName", v)}
                />
                <span className="text-xs text-pink-400">✿</span>
              </span>
              <span className="text-[11px] font-sans font-medium text-pink-700/80 tracking-wide">
                <Editable
                  value={p.studioSub || "Handmade Wedding Cards, Favors & Treats"}
                  onChange={(v) => handleUpdate("studioSub", v)}
                />
              </span>
            </div>
          </div>

          {/* Center Pill Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-white/90 border border-pink-200 px-5 py-2 rounded-full shadow-xs text-xs font-bold tracking-wide">
            <a
              href="#about"
              className="px-3.5 py-1.5 rounded-full text-pink-950/80 hover:text-pink-600 hover:bg-pink-50 transition-colors"
            >
              <Editable value={p.link1 || "About Maker"} onChange={(v) => handleUpdate("link1", v)} />
            </a>
            <a
              href="#projects"
              className="px-3.5 py-1.5 rounded-full text-pink-950/80 hover:text-pink-600 hover:bg-pink-50 transition-colors"
            >
              <Editable value={p.link2 || "Work Samples & Menu"} onChange={(v) => handleUpdate("link2", v)} />
            </a>
            <a
              href="#testimonials"
              className="px-3.5 py-1.5 rounded-full text-pink-950/80 hover:text-pink-600 hover:bg-pink-50 transition-colors"
            >
              <Editable value={p.link3 || "Client Love Notes"} onChange={(v) => handleUpdate("link3", v)} />
            </a>
            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded-full text-pink-950/80 hover:text-pink-600 hover:bg-pink-50 transition-colors"
            >
              <Editable value={p.link4 || "Order Calculator"} onChange={(v) => handleUpdate("link4", v)} />
            </a>
          </nav>

          {/* Right Action: Direct Order Pill */}
          <div className="flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold shadow-md transition-all text-white"
              style={{
                backgroundColor: accent,
                boxShadow: "0 4px 15px rgba(244, 114, 182, 0.4)",
              }}
            >
              <FaWhatsapp className="text-sm" />
              <span>
                <Editable
                  value={p.ctaText || "Order Online"}
                  onChange={(v) => handleUpdate("ctaText", v)}
                />
              </span>
            </motion.a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-800 text-sm font-bold border border-pink-200"
            >
              {menuOpen ? "✕" : "✿"}
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
              className="lg:hidden border-t px-6 py-6 space-y-4 bg-white/95"
              style={{ borderColor: "rgba(244, 114, 182, 0.2)" }}
            >
              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="block text-base font-bold text-pink-950 hover:text-pink-600"
              >
                About The Maker
              </a>
              <a
                href="#projects"
                onClick={() => setMenuOpen(false)}
                className="block text-base font-bold text-pink-950 hover:text-pink-600"
              >
                Work Samples & Product Menu
              </a>
              <a
                href="#testimonials"
                onClick={() => setMenuOpen(false)}
                className="block text-base font-bold text-pink-950 hover:text-pink-600"
              >
                Bride & Client Reviews
              </a>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="block text-base font-bold text-pink-600"
              >
                Direct Inquiry & Pricing
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default WeddingWebsite1Navbar;
