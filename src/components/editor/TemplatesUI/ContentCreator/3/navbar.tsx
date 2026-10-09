// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, Video } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { Editable } from "@/components/editor/ui/Editable";

export function Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#123C35";
  const ink = theme?.ink || "#F1F7E8";
  const accent = theme?.accent || "#D6FF4B";

  const [activeTab, setActiveTab] = useState("Videos");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: "Videos", label: "Videos", href: "#projects" },
    { id: "About", label: "Channel & Rig", href: "#about" },
    { id: "Reviews", label: "Sponsor Reviews", href: "#testimonials" },
    { id: "Contact", label: "Inquire", href: "#contact" },
  ];

  return (
    <header className="sticky top-4 sm:top-6 z-40 px-4 sm:px-8 font-mono select-none">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#D6FF4B]/30 bg-[#0A1F1B]/95 px-5 py-3 shadow-2xl backdrop-blur-xl">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-2.5 font-bold text-[#D6FF4B] hover:opacity-80 transition pr-2 border-r border-[#D6FF4B]/30">
          <FaYoutube size={16} />
          <span className="text-xs tracking-wider">
            <Editable value={props?.brand || "LEO CHEN"} onChange={(v) => onChange?.({ brand: v })} />
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs transition-colors ${
                  isActive ? "text-[#123C35] font-bold" : "text-[#F1F7E8]/70 hover:text-[#D6FF4B]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePillCC3"
                    className="absolute inset-0 rounded-full bg-[#D6FF4B]"
                    transition={{ type: "spring", damping: 25, stiffness: 350 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Metric & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#D6FF4B]/40 bg-[#D6FF4B]/10 px-3 py-1 text-[11px] font-bold text-[#D6FF4B]">
            <span className="h-2 w-2 rounded-full bg-[#D6FF4B] animate-pulse" />
            <span>850K SUBSCRIBERS</span>
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-[#D6FF4B] px-4 py-1.5 text-xs font-bold text-[#123C35] hover:scale-105 transition"
          >
            <span>Book Sponsor</span>
            <ArrowUpRight size={13} />
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D6FF4B]/30 text-[#D6FF4B] md:hidden"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* In-Canvas Mobile Dropdown (stays strictly inside canvas) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-[#D6FF4B]/30 bg-[#0A1F1B] p-4 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-xs text-[#F1F7E8] hover:bg-white/10 hover:text-[#D6FF4B]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#D6FF4B] py-2.5 text-xs font-bold text-[#123C35]"
              >
                <span>Book Sponsorship</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
