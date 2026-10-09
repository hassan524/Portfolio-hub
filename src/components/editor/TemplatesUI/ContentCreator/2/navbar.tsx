// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Flame, Menu, Sparkles, X, Zap } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F5F0E8";
  const ink = theme?.ink || "#181713";
  const accent = theme?.accent || "#FF6B35";

  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "01 / STREAM", href: "#projects" },
    { label: "02 / HOOK SYSTEM", href: "#about" },
    { label: "03 / WAR STORIES", href: "#testimonials" },
    { label: "04 / SPRINT", href: "#contact" },
  ];

  return (
    <header className="sticky top-4 sm:top-6 z-40 px-4 sm:px-8 select-none">
      {/* BRUTALIST CORNER-PINNED DUAL NAVIGATION CONTAINER */}
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left Pinned Brand Badge */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 25 }}
          className="flex items-center gap-2 rounded-2xl border-2 border-black bg-white px-4 py-2.5 shadow-[4px_4px_0px_#000]"
        >
          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#FF6B35] text-[8px] font-black text-black">
            ●
          </span>
          <a href="#top" className="text-sm font-black uppercase tracking-tight text-black">
            <Editable value={props?.brand || "VELOCITY / STUDIO"} onChange={(v) => onChange?.({ brand: v })} />
          </a>
        </motion.div>

        {/* Center Desktop Links Strip */}
        <nav className="hidden lg:flex items-center gap-6 rounded-2xl border-2 border-black bg-white px-6 py-2 shadow-[4px_4px_0px_#000] text-xs font-black uppercase tracking-wider">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-black hover:text-[#FF6B35] transition">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action & Menu Toggle */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 25 }}
          className="flex items-center gap-3"
        >
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-2xl border-2 border-black bg-[#FF6B35] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-black shadow-[3px_3px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            <span>Lock Collaboration</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Toggle Menu Button for Mobile & Quick Access */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-black bg-black text-white shadow-[3px_3px_0px_#FF6B35] transition hover:bg-[#FF6B35] hover:text-black"
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </div>

      {/* IN-CANVAS CONTAINED DROPDOWN — NEVER ESCAPES THE IFRAME / CANVAS! */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="mx-auto mt-3 max-w-7xl rounded-3xl border-2 border-black bg-[#181713] p-6 sm:p-8 text-[#F5F0E8] shadow-[6px_6px_0px_#FF6B35]"
          >
            <div className="flex items-center justify-between border-b border-white/20 pb-4">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#FF6B35]">
                VELOCITY STREAM DIRECTORY
              </span>
              <span className="text-xs font-bold text-white/50">84.2M IMPRESSIONS</span>
            </div>

            <nav className="mt-6 grid gap-3 sm:grid-cols-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-xl font-black uppercase text-white hover:border-[#FF6B35] hover:bg-[#FF6B35] hover:text-black transition"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={20} className="transition group-hover:rotate-45" />
                </a>
              ))}
            </nav>

            <div className="mt-6 flex flex-wrap items-center justify-between border-t border-white/15 pt-4 text-xs font-bold text-white/60">
              <span>NYC • LONDON • WORLDWIDE</span>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="text-[#FF6B35] hover:underline"
              >
                Inquire For Dedicated Brand Series →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
