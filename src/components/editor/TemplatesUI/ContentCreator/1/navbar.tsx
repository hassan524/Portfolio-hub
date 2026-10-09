// @ts-nocheck
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clapperboard, Circle, Menu, Play, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const ink = theme?.ink || "#ffffff";
  const accent = theme?.accent || "#7DD3FC";

  const [activeTab, setActiveTab] = useState("Reel");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [timecode, setTimecode] = useState("01:24:18");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      setTimecode(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { label: "Videos", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-4 sm:top-6 z-40 px-4 sm:px-8 font-mono select-none">
      {/* CINEMATIC FLOATING TOP NAVBAR — FULLY VISIBLE INSIDE EDITOR */}
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/20 bg-[#0A0A0C]/95 px-4 py-3 sm:px-6 shadow-2xl backdrop-blur-2xl">
        {/* Left: Director Brand Slate */}
        <a href="#top" className="flex items-center gap-3 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7DD3FC] text-[#0A0A0C]">
            <Clapperboard size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-wider uppercase">
              <Editable value={props?.brand || "MARA VANCE"} onChange={(v) => onChange?.({ brand: v })} />
            </span>
            <span className="text-[10px] text-[#7DD3FC] tracking-widest hidden sm:inline">
              DIRECTOR // 24FPS
            </span>
          </div>
        </a>

        {/* Center: Desktop Nav Pills */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveTab(item.label)}
                className={`relative px-4 py-1.5 rounded-full text-xs transition-colors ${
                  isActive ? "text-[#0A0A0C] font-bold" : "text-white/70 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="cc1NavActive"
                    className="absolute inset-0 rounded-full bg-[#7DD3FC]"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right: REC Timecode & Action CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-white/70">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white font-bold">REC</span>
            <span className="text-[#7DD3FC]">{timecode}</span>
          </div>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#7DD3FC] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0C] hover:scale-105 transition"
          >
            <span>Request Pitch</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white md:hidden"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Contained Dropdown — Stays strictly inside canvas! */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/20 bg-[#0E0E14] p-5 shadow-2xl md:hidden text-white"
          >
            <div className="flex flex-col divide-y divide-white/10 text-sm">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-white/80 hover:text-[#7DD3FC] transition flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={14} className="text-[#7DD3FC]" />
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#7DD3FC] py-3 text-xs font-bold uppercase text-[#0A0A0C]"
            >
              <span>Request Treatment Pitch</span>
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
