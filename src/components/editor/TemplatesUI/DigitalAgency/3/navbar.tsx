// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency3Navbar({ props = {}, theme, onChange }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Warm cream & editorial charcoal palette from Image 4
  const bg = theme?.bg || "#F9F7F2";
  const bgSecond = theme?.["bg-second"] || "#F3EFE6";
  const ink = theme?.ink || "#1C1917";
  const inkSecond = theme?.["ink-second"] || "#78716C";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#C2410C"; // terracotta / burnt orange

  const navLinks = [
    { label: "Overview", href: "#home" },
    { label: "Methodology", href: "#about" },
    { label: "Campaigns", href: "#projects" },
    { label: "Client Voices", href: "#testimonials" },
    { label: "Studio Desk", href: "#contact" },
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
      className="sticky top-0 z-50 w-full transition-colors backdrop-blur-md border-b"
      style={{
        backgroundColor: `${bg}f0`,
        borderColor: "rgba(28, 25, 23, 0.08)",
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Editorial Brand Logo matching Image 4 */}
        <a
          href="#home"
          onClick={(e) => handleSmoothScroll(e, "#home")}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <span className="text-xl sm:text-2xl font-serif font-black tracking-tight" style={{ color: ink }}>
            <Editable
              value={props?.brandName || "STUDIO EDITORIAL"}
              onChange={(v) => onChange?.({ brandName: v })}
            />
          </span>
          <span className="text-amber-500 font-sans text-xs">✦</span>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="text-xs uppercase font-medium tracking-widest transition-colors py-1 cursor-pointer"
              style={{ color: inkSecond }}
              whileHover={{ color: ink, scale: 1.05 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-4">
          <motion.a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            style={{
              backgroundColor: ink,
              color: "#FFFFFF",
            }}
          >
            <span>Start Campaign</span>
            <ArrowUpRight size={13} style={{ color: accent }} />
          </motion.a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full border cursor-pointer"
            style={{ borderColor: "rgba(0,0,0,0.1)", color: ink }}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t px-6 py-6 space-y-4"
            style={{ backgroundColor: bgSecond, borderColor: "rgba(0,0,0,0.08)" }}
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="block text-sm font-medium py-2 cursor-pointer uppercase tracking-wider"
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

export default DigitalAgency3Navbar;
