// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Camera } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PhotographyPortfolio1Navbar({ props = {}, theme, onChange }: any) {
  const [open, setOpen] = useState(false);
  const bg = theme?.bg || "#FCFBF8";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#F5F3ED";
  const ink = theme?.text || theme?.ink || "#1A1918";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#6E6B65";
  const accent = theme?.accent || "#8E2823";
  const onAccent = theme?.["on-accent"] || "#FFFFFF";

  const brand = props.brandName || "MAISON ÉTÉ";
  const issue = props.issueText || "ISSUE NO. 48 — EDITORIAL & HIGH FASHION ARCHIVE";
  const links = props.navLinks || [
    { label: "Selected Works", href: "#projects" },
    { label: "Services & Rates", href: "#services" },
    { label: "Biography", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Inquire", href: "#contact" },
  ];

  const go = (e: any, href: string) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: `${bg}fa`, backdropFilter: "blur(16px)", borderBottom: `1px solid ${ink}15` }}>
      {/* Top running issue ticker strip */}
      <div className="w-full py-1.5 px-4 text-[10px] tracking-[0.25em] uppercase font-mono flex items-center justify-between border-b" style={{ borderColor: `${ink}0f`, background: bgSecond, color: inkSecond }}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
          <Editable value={issue} onChange={(v) => onChange?.({ issueText: v })} />
        </div>
        <span className="hidden sm:inline opacity-75">WORLDWIDE COMMISSIONS 2026/27</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand with serif elegance */}
        <a href="#home" onClick={(e) => go(e, "#home")} className="group flex flex-col">
          <span className="text-xl sm:text-2xl font-serif tracking-tight font-normal leading-none" style={{ color: ink }}>
            <Editable value={brand} onChange={(v) => onChange?.({ brandName: v })} />
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] font-sans mt-1" style={{ color: inkSecond }}>
            <Editable value={props.tagline || "PARIS · NEW YORK"} onChange={(v) => onChange?.({ tagline: v })} />
          </span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-medium">
          {links.map((l: any) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className="relative py-1 transition-opacity hover:opacity-100 opacity-70 group"
              style={{ color: ink }}
            >
              {l.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full" style={{ background: accent }} />
            </a>
          ))}
        </nav>

        {/* CTA and mobile trigger */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
            style={{ background: accent, color: onAccent }}
          >
            <span><Editable value={props.navCta || "Book Commission"} onChange={(v) => onChange?.({ navCta: v })} /></span>
            <ArrowUpRight size={14} />
          </a>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors"
            style={{ background: bgSecond, color: ink }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t"
            style={{ background: bg, borderColor: `${ink}15` }}
          >
            <div className="px-6 py-6 space-y-4">
              {links.map((l: any) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="block text-lg font-serif tracking-wide py-2 border-b border-black/5"
                  style={{ color: ink }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => go(e, "#contact")}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-center"
                style={{ background: accent, color: onAccent }}
              >
                <span>{props.navCta || "Book Commission"}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default PhotographyPortfolio1Navbar;
