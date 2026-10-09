// @ts-nocheck
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, ArrowUpRight } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = props?.links || [
    { label: "Story", href: "#about" },
    { label: "Method", href: "#services" },
    { label: "Collection", href: "#projects" },
    { label: "Proof", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const go = (e: any, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const updateLink = (i: number, patch: any) =>
    onChange?.({ links: links.map((l: any, idx: number) => (idx === i ? { ...l, ...patch } : l)) });

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4"
    >
      <div
        className="mx-auto max-w-6xl flex items-center justify-between gap-4 rounded-full px-4 sm:px-6 py-3 backdrop-blur-xl transition-all duration-500"
        style={{
          background: scrolled ? `${bg}E6` : "transparent",
          border: `1px solid ${scrolled ? surface : "transparent"}`,
          color: scrolled ? ink : bg,
        }}
      >
        <a href="#top" onClick={(e) => go(e, "#top")} className="flex items-center gap-2.5 min-w-0">
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: accent, color: bg }}
          >
            <Sparkles size={16} />
          </span>
          <span className="font-[Georgia,'Times_New_Roman',serif] text-2xl tracking-[0.18em] truncate">
            <Editable value={props?.brand || "VELUNA"} onChange={(v) => onChange?.({ brand: v })} />
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l: any, i: number) => (
            <a
              key={i}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className="text-sm tracking-wide opacity-80 hover:opacity-100 transition-opacity"
            >
              <Editable value={l.label} onChange={(v) => updateLink(i, { label: v })} />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span
            className="hidden md:inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs"
            style={{ background: surface, color: scrolled ? inkSecond : bg }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: accent }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accent }} />
            </span>
            <Editable value={props?.status || "Now onboarding studios"} onChange={(v) => onChange?.({ status: v })} />
          </span>

          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-95"
            style={{ background: scrolled ? accent : bg, color: scrolled ? bg : accent }}
          >
            <Editable value={props?.cta || "Start a project"} onChange={(v) => onChange?.({ cta: v })} />
            <ArrowUpRight size={15} />
          </a>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-95"
            style={{ background: surface, color: scrolled ? ink : bg }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden mx-auto max-w-6xl mt-3 rounded-3xl p-6 backdrop-blur-xl"
            style={{ background: `${bg}F2`, border: `1px solid ${surface}`, color: ink }}
          >
            <div className="flex flex-col">
              {links.map((l: any, i: number) => (
                <a
                  key={i}
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="py-3.5 font-[Georgia,'Times_New_Roman',serif] text-2xl"
                  style={{ borderBottom: `1px solid ${surface}` }}
                >
                  <Editable value={l.label} onChange={(v) => updateLink(i, { label: v })} />
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={(e) => go(e, "#contact")}
              className="mt-5 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium transition-transform active:scale-95"
              style={{ background: accent, color: bg }}
            >
              <Editable value={props?.cta || "Start a project"} onChange={(v) => onChange?.({ cta: v })} />
              <ArrowUpRight size={15} />
            </a>
            <p className="mt-4 text-center text-xs" style={{ color: inkSecond }}>
              <Editable value={props?.status || "Now onboarding studios"} onChange={(v) => onChange?.({ status: v })} />
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
