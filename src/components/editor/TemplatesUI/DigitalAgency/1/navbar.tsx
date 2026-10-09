// @ts-nocheck
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency1Navbar({ props = {}, theme, onChange }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");

  const bg = theme?.bg || "#F4F5EF";
  const bgSecond = theme?.["bg-second"] || "#FFFFFF";
  const ink = theme?.ink || "#111827";
  const inkSecond = theme?.["ink-second"] || "#5B6472";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#87D53C";

  const navLinks = props?.navLinks || [
    { label: "Community", href: "#home" },
    { label: "Company", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Works", href: "#projects" },
    { label: "Clients", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  // Highlight the link of the section currently in view
  useEffect(() => {
    const els = navLinks.map((l: any) => document.querySelector(l.href)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(`#${en.target.id}`)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el: any) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full backdrop-blur-xl border-b-2"
      style={{ backgroundColor: `${bg}f2`, borderColor: ink, color: ink }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-3">
        {/* Brand */}
        <a href="#home" onClick={(e) => handleSmoothScroll(e, "#home")} className="flex items-center gap-2 cursor-pointer select-none">
          <span className="text-xl sm:text-2xl font-black tracking-tighter">
            <Editable value={props?.brandName || "DesignSource"} onChange={(v) => onChange?.({ brandName: v })} />
          </span>
          <span className="w-3 h-3 rounded-full border-2" style={{ backgroundColor: accent, borderColor: ink }} />
        </a>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full border-2" style={{ backgroundColor: surface, borderColor: ink }}>
          {navLinks.map((item: any) => {
            const on = active === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="px-4 py-1.5 rounded-full text-sm font-bold transition-colors cursor-pointer"
                style={{ backgroundColor: on ? accent : "transparent", color: on ? "#111827" : inkSecond }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold border-2 cursor-pointer whitespace-nowrap"
            style={{ backgroundColor: ink, color: "#FFFFFF", borderColor: ink, boxShadow: `3px 3px 0 ${accent}` }}
          >
            <span><Editable value={props?.navCta || "Let's Create"} onChange={(v) => onChange?.({ navCta: v })} /></span>
            <ArrowUpRight size={14} style={{ color: accent }} />
          </motion.a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border-2 cursor-pointer"
            style={{ backgroundColor: surface, borderColor: ink, color: ink }}
            aria-label="Toggle Navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t-2"
            style={{ backgroundColor: bgSecond, borderColor: ink }}
          >
            <div className="px-4 sm:px-6 py-4 grid grid-cols-2 gap-2">
              {navLinks.map((item: any) => {
                const on = active === item.href;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="px-4 py-3 rounded-2xl border-2 text-sm font-bold cursor-pointer"
                    style={{ backgroundColor: on ? accent : surface, borderColor: ink, color: "#111827" }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default DigitalAgency1Navbar;