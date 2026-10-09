// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

const DISPLAY = "'Anton', 'Bebas Neue', Impact, 'Arial Narrow', sans-serif";

export const InteriorDesignStudio1Navbar: React.FC<NavbarProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [open, setOpen] = useState(false);

  const bg = theme.bg || "#101012";
  const ink = theme.ink || "#FFFFFF";
  const ink2 = theme["ink-second"] || "#A1A1AA";
  const accent = theme.accent || "#38BDF8";
  const rule = "rgba(255,255,255,0.12)";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const links = [
    { href: "#projects", key: "link1", label: "Work" },
    { href: "#about", key: "link2", label: "Studio" },
    { href: "#testimonials", key: "link3", label: "Words" },
    { href: "#contact", key: "link4", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full sticky top-0 z-50 border-b"
      style={{ backgroundColor: bg, color: ink, borderColor: rule }}
    >
      {/* One row, 12-col grid, everything vertically centered */}
      <div className="px-6 md:px-12 lg:px-16 h-[72px] grid grid-cols-12 items-center gap-6">
        {/* Brand: cols 1-4 */}
        <div className="col-span-8 lg:col-span-4 flex flex-col justify-center gap-1">
          <span className="text-sm font-bold uppercase tracking-wider leading-none">
            <Editable value={p.studioName || "THE COOL STUDIO™"} onChange={(v) => handleUpdate("studioName", v)} />
          </span>
          <span className="text-[11px] leading-none" style={{ color: ink2 }}>
            <Editable value={p.studioSub || "Interior & Spatial Architecture"} onChange={(v) => handleUpdate("studioSub", v)} />
          </span>
        </div>

        {/* Credits: cols 5-8, two equal columns, same two-line structure as brand */}
        <div className="hidden lg:grid lg:col-span-4 grid-cols-2 gap-6">
          <div className="flex flex-col justify-center gap-1">
            <span className="text-[10px] uppercase tracking-widest leading-none" style={{ color: ink2 }}>
              Designed By
            </span>
            <span className="text-xs leading-none">
              <Editable value={p.designedBy || "Mila Taylor Studio"} onChange={(v) => handleUpdate("designedBy", v)} />
            </span>
          </div>
          <div className="flex flex-col justify-center gap-1">
            <span className="text-[10px] uppercase tracking-widest leading-none" style={{ color: ink2 }}>
              Published By
            </span>
            <span className="text-xs leading-none">
              <Editable value={p.publishedBy || "The Cool Studio London"} onChange={(v) => handleUpdate("publishedBy", v)} />
            </span>
          </div>
        </div>

        {/* Links: cols 9-12, right aligned (desktop). Menu button (mobile/tablet). */}
        <nav className="hidden lg:flex lg:col-span-4 items-center justify-end gap-8 text-xs uppercase tracking-widest">
          {links.map((l) => (
            <motion.a
              key={l.key}
              href={l.href}
              whileHover={{ y: -2 }}
              className="relative leading-none"
              style={{ color: ink }}
            >
              <Editable value={p[l.key] || l.label} onChange={(v) => handleUpdate(l.key, v)} />
            </motion.a>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden col-span-4 justify-self-end text-xs uppercase tracking-widest font-bold cursor-pointer"
          style={{ color: open ? accent : ink }}
          aria-label="Toggle menu"
        >
          {open ? "Close ✕" : "Menu +"}
        </button>
      </div>

      {/* Mobile menu: number column + title column, perfectly aligned rows */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden border-t"
            style={{ backgroundColor: bg, borderColor: rule }}
          >
            <div className="px-6 md:px-12 py-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.key}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="grid grid-cols-12 items-baseline py-4 border-b"
                  style={{ borderColor: rule }}
                >
                  <span className="col-span-2 text-xs font-mono" style={{ color: ink2 }}>
                    0{i + 1}
                  </span>
                  <span
                    className="col-span-10 uppercase leading-none"
                    style={{ fontFamily: DISPLAY, fontSize: "clamp(2.5rem, 9vw, 5rem)" }}
                  >
                    {l.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default InteriorDesignStudio1Navbar;