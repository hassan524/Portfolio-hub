// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, ArrowUpRight, Moon } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PerfumeBrand2Navbar({ props = {}, theme, onChange }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bg = theme?.bg || "#0A090D";
  const bgSecond = theme?.["bg-second"] || "#14121B";
  const ink = theme?.ink || "#F5F2EB";
  const inkSecond = theme?.["ink-second"] || "#9E96A6";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.06)";
  const accent = theme?.accent || "#D4AF37";

  const links = [
    { label: "The Vault", href: "#vault" },
    { label: "Night Pyramids", href: "#alchemy" },
    { label: "Register", href: "#critics" },
    { label: "Chamber", href: "#bespoke" },
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
      transition={{ duration: 0.7 }}
      className="sticky top-0 z-50 w-full transition-colors backdrop-blur-2xl border-b"
      style={{
        backgroundColor: `${bg}f2`,
        borderColor: "rgba(212, 175, 55, 0.15)",
        color: ink,
      }}
    >
      {/* Top Ribbon */}
      <div
        className="w-full py-1.5 px-4 text-center text-[10px] font-mono tracking-[0.3em] uppercase flex items-center justify-center gap-2 border-b"
        style={{
          backgroundColor: "rgba(212, 175, 55, 0.08)",
          borderColor: "rgba(212, 175, 55, 0.12)",
          color: accent,
        }}
      >
        <Moon size={11} className="text-amber-400" />
        <span>Atelier Obsidian • Nocturne Reserve No. 9 Private Showcase</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Monogram & Name */}
        <a
          href="#home"
          onClick={(e) => handleSmoothScroll(e, "#home")}
          className="group flex items-center gap-3 cursor-pointer"
        >
          <div
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-transform group-hover:scale-105"
            style={{
              borderColor: accent,
              backgroundColor: "rgba(212, 175, 55, 0.1)",
              color: accent,
            }}
          >
            <span className="font-serif text-sm font-light tracking-tighter">AO</span>
          </div>
          <div>
            <span
              className="text-xl sm:text-2xl font-serif tracking-[0.28em] uppercase font-light block"
              style={{ fontFamily: "Cinzel, serif", color: ink }}
            >
              <Editable
                value={props?.brandName || "ATELIER OBSIDIAN"}
                onChange={(v) => onChange?.({ brandName: v })}
              />
            </span>
            <span className="text-[8px] font-mono tracking-[0.4em] uppercase opacity-60 block -mt-0.5" style={{ color: accent }}>
              PARFUMS DE NUIT // PARIS
            </span>
          </div>
        </a>

        {/* Links - In-Page Smooth Scroll */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="relative text-xs uppercase tracking-[0.25em] font-medium transition-colors hover:opacity-100 cursor-pointer"
              style={{ color: inkSecond }}
              whileHover={{ color: accent, scale: 1.05 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Action Showcase CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#bespoke"
            onClick={(e) => handleSmoothScroll(e, "#bespoke")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold border transition-all hover:scale-105 shadow-lg cursor-pointer"
            style={{
              borderColor: accent,
              backgroundColor: "rgba(212, 175, 55, 0.15)",
              color: accent,
            }}
          >
            <span>The Black Chamber</span>
            <ArrowUpRight size={13} />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full border cursor-pointer"
            style={{ backgroundColor: surface, borderColor: "rgba(212, 175, 55, 0.2)", color: ink }}
            aria-label="Toggle navigation menu"
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
            style={{ backgroundColor: bgSecond, borderColor: "rgba(212, 175, 55, 0.15)" }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="block text-sm uppercase tracking-[0.22em] font-medium py-2 cursor-pointer"
                style={{ color: ink }}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t" style={{ borderColor: "rgba(212, 175, 55, 0.1)" }}>
              <a
                href="#bespoke"
                onClick={(e) => handleSmoothScroll(e, "#bespoke")}
                className="block w-full text-center py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold border cursor-pointer"
                style={{ borderColor: accent, color: accent, backgroundColor: "rgba(212, 175, 55, 0.1)" }}
              >
                Enter The Chamber
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default PerfumeBrand2Navbar;
