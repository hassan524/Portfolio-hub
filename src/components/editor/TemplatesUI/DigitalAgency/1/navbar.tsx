// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency1Navbar({ props = {}, theme, onChange }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bg = theme?.bg || "#F9FAFC";
  const bgSecond = theme?.["bg-second"] || "#FFFFFF";
  const ink = theme?.ink || "#111827";
  const inkSecond = theme?.["ink-second"] || "#6B7280";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#84CC16";

  const navLinks = [
    { label: "Community", href: "#home" },
    { label: "Company", href: "#about" },
    { label: "Works", href: "#projects" },
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
        backgroundColor: `${bg}f2`,
        borderColor: "rgba(0, 0, 0, 0.06)",
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo matching Image 2: DesignSource */}
        <a
          href="#home"
          onClick={(e) => handleSmoothScroll(e, "#home")}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <span
            className="text-xl sm:text-2xl font-bold tracking-tight font-sans"
            style={{ color: ink }}
          >
            <Editable
              value={props?.brandName || "DesignSource"}
              onChange={(v) => onChange?.({ brandName: v })}
            />
          </span>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
        </a>

        {/* Center Nav Links matching Image 2 */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="text-sm font-medium transition-colors hover:opacity-100 py-1 cursor-pointer"
              style={{ color: inkSecond }}
              whileHover={{ color: ink, scale: 1.05 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Right CTA Buttons matching Image 2 */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider px-3 py-2 cursor-pointer transition-colors"
            style={{ color: inkSecond }}
          >
            Inquire
          </motion.a>

          <motion.a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all shadow-sm cursor-pointer"
            style={{
              backgroundColor: ink,
              color: "#FFFFFF",
            }}
          >
            <span>Let's Create</span>
            <ArrowUpRight size={13} style={{ color: accent }} />
          </motion.a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full border cursor-pointer"
            style={{ backgroundColor: surface, borderColor: "rgba(0,0,0,0.1)", color: ink }}
            aria-label="Toggle Navigation"
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
                className="block text-sm font-medium py-2 cursor-pointer"
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

export default DigitalAgency1Navbar;
