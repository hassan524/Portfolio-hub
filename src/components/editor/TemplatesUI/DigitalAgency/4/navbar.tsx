// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Code2 } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency4Navbar({ props = {}, theme, onChange }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modern tech / IT agency palette from Image 5 (CoderEyes)
  const bg = theme?.bg || "#FFFFFF";
  const bgSecond = theme?.["bg-second"] || "#F8FAFC";
  const ink = theme?.ink || "#0A1128";
  const inkSecond = theme?.["ink-second"] || "#475569";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#2563EB"; // royal blue

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
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
      className="sticky top-0 z-50 w-full transition-colors backdrop-blur-md border-b"
      style={{
        backgroundColor: `${bg}f0`,
        borderColor: "rgba(10, 17, 40, 0.08)",
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo matching Image 5: CoderEyes */}
        <a
          href="#home"
          onClick={(e) => handleSmoothScroll(e, "#home")}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
            style={{ backgroundColor: accent }}
          >
            <Code2 size={20} strokeWidth={2.5} />
          </div>
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight" style={{ color: ink }}>
            <Editable
              value={props?.brandName || "CoderEyes"}
              onChange={(v) => onChange?.({ brandName: v })}
            />
          </span>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="text-xs sm:text-sm font-semibold transition-colors py-1 cursor-pointer"
              style={{ color: inkSecond }}
              whileHover={{ color: accent, scale: 1.05 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Right Action Button matching Image 5 */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer"
            style={{
              backgroundColor: accent,
              color: "#FFFFFF",
            }}
          >
            <span>Start a Project</span>
            <ArrowUpRight size={14} />
          </motion.a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border cursor-pointer"
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
                className="block text-sm font-semibold py-2 cursor-pointer"
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

export default DigitalAgency4Navbar;
