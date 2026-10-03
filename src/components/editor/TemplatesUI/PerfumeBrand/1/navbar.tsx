// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, ArrowUpRight, Compass } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PerfumeBrand1Navbar({ props = {}, theme, onChange }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bg = theme?.bg || "#EED8C9";
  const bgSecond = theme?.["bg-second"] || "#E5C8B4";
  const ink = theme?.ink || "#2D1D18";
  const inkSecond = theme?.["ink-second"] || "#7A5E54";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.45)";
  const accent = theme?.accent || "#9E4A28";

  const navLinks = [
    { label: "Creations", href: "#collection" },
    { label: "The Atelier", href: "#story" },
    { label: "Critics", href: "#critics" },
    { label: "Consultation", href: "#consultation" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full transition-colors backdrop-blur-xl border-b"
      style={{
        backgroundColor: `${bg}e6`,
        borderColor: "rgba(158, 74, 40, 0.12)",
        color: ink,
      }}
    >
      {/* Top micro announcement bar */}
      <div
        className="w-full py-1.5 px-4 text-center text-[11px] font-medium tracking-[0.2em] uppercase flex items-center justify-center gap-2 border-b"
        style={{
          backgroundColor: "rgba(158, 74, 40, 0.08)",
          borderColor: "rgba(158, 74, 40, 0.08)",
          color: accent,
        }}
      >
        <Sparkles size={11} className="animate-spin text-accent" style={{ animationDuration: "6s" }} />
        <span>Grasse Haute Parfumerie • Private Harvest Distillations</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "#home")}
            className="group flex flex-col items-start cursor-pointer select-none"
          >
            <span
              className="text-2xl sm:text-3xl font-serif tracking-[0.32em] uppercase font-light transition-transform duration-300 group-hover:scale-[1.02]"
              style={{ color: ink, fontFamily: "Cinzel, Cormorant Garamond, serif" }}
            >
              <Editable
                value={props?.brandName || "LUMIERE"}
                onChange={(v) => onChange?.({ brandName: v })}
              />
            </span>
            <span
              className="text-[9px] tracking-[0.45em] uppercase font-mono -mt-1 opacity-70"
              style={{ color: inkSecond }}
            >
              Haute Parfumerie
            </span>
          </a>
        </div>

        {/* Center Navigation Links - In-Page Smooth Scroll */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="relative text-xs uppercase tracking-[0.22em] font-medium transition-colors hover:opacity-100 py-1 cursor-pointer"
              style={{ color: inkSecond }}
              whileHover={{ scale: 1.05, color: ink }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Right side Showcase CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          <motion.a
            href="#consultation"
            onClick={(e) => handleSmoothScroll(e, "#consultation")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] uppercase tracking-[0.18em] font-semibold transition-all shadow-sm cursor-pointer"
            style={{
              backgroundColor: ink,
              color: "#FFF5EE",
            }}
          >
            <span>Book Consultation</span>
            <ArrowUpRight size={13} />
          </motion.a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full cursor-pointer"
            style={{ backgroundColor: surface, color: ink }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t px-6 py-6 space-y-4"
            style={{ backgroundColor: bg, borderColor: "rgba(158, 74, 40, 0.15)" }}
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="block text-sm uppercase tracking-[0.2em] font-medium py-2 cursor-pointer"
                style={{ color: ink }}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t flex flex-col gap-3" style={{ borderColor: "rgba(158, 74, 40, 0.1)" }}>
              <a
                href="#consultation"
                onClick={(e) => handleSmoothScroll(e, "#consultation")}
                className="w-full text-center py-2.5 rounded-full text-xs uppercase tracking-[0.18em] font-semibold text-white shadow-md cursor-pointer"
                style={{ backgroundColor: accent }}
              >
                Book Scent Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default PerfumeBrand1Navbar;
