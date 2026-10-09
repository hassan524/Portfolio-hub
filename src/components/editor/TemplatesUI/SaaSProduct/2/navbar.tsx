// @ts-nocheck
import { useState, useEffect } from "react";
import { Menu, X, Landmark, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = props?.links || [
    { label: "Platform", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#projects" },
    { label: "Clients", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const go = (e: any, href: string) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const updLink = (i: number, label: string) =>
    onChange?.({ links: links.map((l: any, idx: number) => (idx === i ? { ...l, label } : l)) });

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-3"
    >
      <div
        className="mx-auto max-w-7xl rounded-2xl backdrop-blur-xl transition-all duration-500"
        style={{
          background: scrolled ? `${bg}D9` : `${bg}99`,
          border: `1px solid ${surface}`,
          boxShadow: scrolled ? `0 18px 50px -20px ${ink}33` : "none",
          color: ink,
        }}
      >
        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
          <a href="#top" onClick={(e) => go(e, "#top")} className="flex items-center gap-2.5 min-w-0">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: accent, color: bg, boxShadow: `0 8px 22px -6px ${accent}` }}>
              <Landmark size={17} />
            </span>
            <span className="font-bold text-lg tracking-tight truncate">
              <Editable value={props?.brand || "Vaultline"} onChange={(v) => onChange?.({ brand: v })} />
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1 rounded-full p-1" style={{ background: surface }}>
            {links.map((l: any, i: number) => (
              <a
                key={i}
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-95"
                style={{ color: inkSecond }}
              >
                <Editable value={l.label} onChange={(v) => updLink(i, v)} />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium" style={{ background: surface, color: inkSecond }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: accent }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accent }} />
              </span>
              <Editable value={props?.status || "Markets live"} onChange={(v) => onChange?.({ status: v })} />
            </span>
            <a
              href="#contact"
              onClick={(e) => go(e, "#contact")}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95"
              style={{ background: accent, color: bg, boxShadow: `0 10px 28px -8px ${accent}` }}
            >
              <Editable value={props?.cta || "Talk to us"} onChange={(v) => onChange?.({ cta: v })} />
              <ArrowRight size={15} />
            </a>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-transform active:scale-95"
              style={{ background: surface, color: ink }}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="px-4 pb-5 pt-1">
                {links.map((l: any, i: number) => (
                  <a
                    key={i}
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    className="flex items-center justify-between py-3.5 text-lg font-semibold"
                    style={{ borderBottom: `1px solid ${surface}` }}
                  >
                    <Editable value={l.label} onChange={(v) => updLink(i, v)} />
                    <ArrowRight size={16} style={{ color: accent }} />
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={(e) => go(e, "#contact")}
                  className="mt-5 flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-transform active:scale-95"
                  style={{ background: accent, color: bg }}
                >
                  <Editable value={props?.cta || "Talk to us"} onChange={(v) => onChange?.({ cta: v })} />
                  <ArrowRight size={15} />
                </a>
                <p className="mt-4 text-center text-xs" style={{ color: inkSecond }}>
                  <Editable value={props?.status || "Markets live"} onChange={(v) => onChange?.({ status: v })} />
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
