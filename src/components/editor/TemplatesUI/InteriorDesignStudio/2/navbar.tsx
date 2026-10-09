// @ts-nocheck
import React, { useEffect, useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

const SERIF = "'Instrument Serif', 'Cormorant Garamond', Georgia, serif";

export const InteriorDesignStudio2Navbar: React.FC<NavbarProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const bg = theme.bg || "#F2EEE6";
  const ink = theme.ink || "#17201B";
  const accent = theme.accent || "#2F5D46";

  useEffect(() => {
    const onScroll = () => {
      if (typeof window !== "undefined") {
        setScrolled(window.scrollY > 30);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const links = [
    { href: "#projects", key: "nav1", label: "Work" },
    { href: "#about", key: "nav2", label: "Studio" },
    { href: "#testimonials", key: "nav3", label: "Words" },
    { href: "#contact", key: "nav4", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? `${bg}F2` : "rgba(12, 18, 15, 0.88)",
        color: scrolled ? ink : "#FFFFFF",
        borderColor: scrolled ? "rgba(23, 32, 27, 0.12)" : "rgba(255, 255, 255, 0.15)",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');`}</style>

      <div className="h-20 px-6 md:px-12 lg:px-16 grid grid-cols-3 items-center">
        {/* Left links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wide">
          {links.slice(0, 2).map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="hover:opacity-75 transition-opacity"
              style={{ color: scrolled ? ink : "#FFFFFF" }}
            >
              <Editable value={p[l.key] || l.label} onChange={(v) => handleUpdate(l.key, v)} />
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden justify-self-start text-[13px] tracking-wide font-medium cursor-pointer"
          style={{ color: scrolled ? ink : "#FFFFFF" }}
        >
          {open ? "Close" : "Menu"}
        </button>

        {/* Center Logo */}
        <a
          href="#"
          className="justify-self-center leading-none tracking-tight hover:opacity-85 transition-opacity"
          style={{
            fontFamily: SERIF,
            fontSize: "2.2rem",
            color: scrolled ? ink : "#FFFFFF",
          }}
        >
          <Editable value={p.brand || "Alder"} onChange={(v) => handleUpdate("brand", v)} />
        </a>

        {/* Right links + CTA */}
        <div className="flex items-center justify-end gap-8 text-[13px] tracking-wide">
          <div className="hidden md:flex items-center gap-8">
            {links.slice(2).map((l) => (
              <a
                key={l.key}
                href={l.href}
                className="hover:opacity-75 transition-opacity"
                style={{ color: scrolled ? ink : "#FFFFFF" }}
              >
                <Editable value={p[l.key] || l.label} onChange={(v) => handleUpdate(l.key, v)} />
              </a>
            ))}
          </div>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            className="hidden sm:inline-block px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
            style={{
              backgroundColor: scrolled ? accent : "#FFFFFF",
              color: scrolled ? "#FFFFFF" : "#17201B",
            }}
          >
            <Editable value={p.cta || "Enquire"} onChange={(v) => handleUpdate("cta", v)} />
          </motion.a>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t px-6 py-6 overflow-hidden"
            style={{
              backgroundColor: bg,
              color: ink,
              borderColor: "rgba(23, 32, 27, 0.12)",
            }}
          >
            <div className="flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.key}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-2xl font-serif border-b"
                  style={{
                    fontFamily: SERIF,
                    borderColor: "rgba(23, 32, 27, 0.08)",
                    color: ink,
                  }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-block mt-2 text-center py-3 rounded-full text-xs uppercase tracking-widest font-bold"
                style={{ backgroundColor: accent, color: "#FFFFFF" }}
              >
                Start a project ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export const InteriorDesignStudio3Navbar = InteriorDesignStudio2Navbar;
export default InteriorDesignStudio2Navbar;