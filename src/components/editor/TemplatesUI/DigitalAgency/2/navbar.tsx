// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Search, User } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency2Navbar({ props = {}, theme, onChange }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic theme colors - strictly avoiding manual tailwind color classes
  const bg = theme?.bg || theme?.bgPrimary || "#0C0C0E";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#16161A";
  const text = theme?.text || theme?.ink || "#FFFFFF";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || theme?.textSecond || "#9CA3AF";
  const surface = theme?.surface || "#1F1F24";
  const accent = theme?.accent || "#CCFF00"; // high-energy lime accent from Image 1

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Causes", href: "#about" },
    { label: "Plans", href: "#services" },
    { label: "Our Story", href: "#projects" },
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
      className="sticky top-0 z-50 w-full backdrop-blur-xl transition-colors"
      style={{
        backgroundColor: `${bg}e6`,
        borderBottom: `1px solid ${textSecond}20`,
        color: text,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo matching Image 1: GrowthCatalysts */}
        <a
          href="#home"
          onClick={(e) => handleSmoothScroll(e, "#home")}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <span className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: text }}>
            <Editable
              value={props?.brandName || "GrowthCatalysts"}
              onChange={(v) => onChange?.({ brandName: v })}
            />
          </span>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
        </a>

        {/* Center Nav Links matching Image 1 */}
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
              style={{ color: textSecond }}
              whileHover={{ color: text, scale: 1.05 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Right Action Icons matching Image 1 */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors"
            style={{ backgroundColor: surface, color: textSecond }}
            title="Search"
          >
            <Search size={15} />
          </div>

          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer"
            style={{
              backgroundColor: text,
              color: bg,
            }}
          >
            <span>User / Support</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl cursor-pointer"
            style={{ backgroundColor: surface, color: text }}
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
            className="md:hidden px-6 py-6 space-y-4"
            style={{
              backgroundColor: bgSecond,
              borderTop: `1px solid ${textSecond}20`,
            }}
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="block text-sm font-semibold py-2 cursor-pointer"
                style={{ color: text }}
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

export default DigitalAgency2Navbar;
