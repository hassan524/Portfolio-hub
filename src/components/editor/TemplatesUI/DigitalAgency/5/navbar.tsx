// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency5Navbar({ props = {}, theme, onChange }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bg = theme?.bg || "#0B26E8";
  const bgSecond = theme?.["bg-second"] || "#061385";
  const ink = theme?.ink || "#FFFFFF";
  const inkSecond = theme?.["ink-second"] || "rgba(255, 255, 255, 0.75)";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.12)";
  const accent = theme?.accent || "#FFFFFF";

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#projects" },
    { label: "Cases", href: "#projects" },
    { label: "Contact", href: "#contact" },
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
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full transition-colors backdrop-blur-xl border-b"
      style={{
        backgroundColor: `${bg}e6`,
        borderColor: surface,
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo matching Image 1: ✕ AURYX */}
        <a
          href="#home"
          onClick={(e) => handleSmoothScroll(e, "#home")}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm tracking-tighter transition-transform group-hover:scale-105"
            style={{
              backgroundColor: surface,
              color: ink,
              border: `1px solid ${surface}`,
            }}
          >
            ✕
          </div>
          <span
            className="text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase font-mono"
            style={{ color: ink }}
          >
            <Editable
              value={props?.brandName || "AURYX"}
              onChange={(v) => onChange?.({ brandName: v })}
            />
          </span>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="relative text-xs uppercase tracking-[0.16em] font-medium transition-colors hover:opacity-100 py-1 cursor-pointer"
              style={{ color: inkSecond }}
              whileHover={{ color: ink, scale: 1.05 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Right Action: White Pill "Let's Talk →" matching Image 1 */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] transition-all shadow-lg cursor-pointer"
            style={{
              backgroundColor: "#FFFFFF",
              color: bg,
            }}
          >
            <span>Let's Talk</span>
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: bg }}
            >
              <ArrowUpRight size={12} />
            </span>
          </motion.a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full border cursor-pointer"
            style={{ backgroundColor: surface, borderColor: surface, color: ink }}
            aria-label="Toggle Navigation"
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
            className="md:hidden border-t px-6 py-6 space-y-4"
            style={{ backgroundColor: bgSecond, borderColor: surface }}
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="block text-sm uppercase tracking-[0.18em] font-medium py-2 cursor-pointer"
                style={{ color: ink }}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default DigitalAgency5Navbar;
