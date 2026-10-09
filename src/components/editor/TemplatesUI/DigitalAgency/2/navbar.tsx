// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency2Navbar({ props = {}, theme, onChange }: any) {
  const [open, setOpen] = useState(false);
  const bg = theme?.bg || "#0B0B0D";
  const bgSecond = theme?.["bg-second"] || "#131316";
  const text = theme?.text || theme?.ink || "#FFFFFF";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || "#A1A1AA";
  const surface = theme?.surface || "#18181C";
  const accent = theme?.accent || "#F5559E";

  const links = props.navLinks || [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];
  const go = (e: any, href: string) => { e.preventDefault(); setOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <motion.header initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full backdrop-blur-xl" style={{ background: `${bg}e6`, borderBottom: `1px solid ${textSecond}25`, color: text }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <a href="#home" onClick={(e) => go(e, "#home")} className="flex items-center gap-2 select-none">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center font-black" style={{ background: accent, color: bg }}>{(props.brandName || "Curious Packet")[0]}</span>
          <span className="text-lg sm:text-xl font-extrabold tracking-tight"><Editable value={props.brandName || "Curious Packet"} onChange={(v) => onChange?.({ brandName: v })} /></span>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l: any) => <a key={l.label} href={l.href} onClick={(e) => go(e, l.href)} className="text-sm font-semibold transition-colors hover:opacity-100 opacity-80" style={{ color: text }}>{l.label}</a>)}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" onClick={(e) => go(e, "#contact")} className="hidden sm:inline-flex px-5 py-2.5 rounded-xl text-sm font-bold transition-transform hover:-translate-y-0.5" style={{ background: accent, color: bg }}>
            <Editable value={props.navCta || "Discuss Your Product"} onChange={(v) => onChange?.({ navCta: v })} />
          </a>
          <button type="button" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open} className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer" style={{ background: surface, border: `1px solid ${textSecond}30` }}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden" style={{ background: bgSecond, borderTop: `1px solid ${textSecond}25` }}>
            <div className="px-4 sm:px-6 py-4 space-y-1">
              {links.map((l: any) => <a key={l.label} href={l.href} onClick={(e) => go(e, l.href)} className="block px-3 py-3 rounded-xl text-sm font-semibold" style={{ color: text }}>{l.label}</a>)}
              <a href="#contact" onClick={(e) => go(e, "#contact")} className="block text-center mt-3 px-5 py-3 rounded-xl text-sm font-bold" style={{ background: accent, color: bg }}>{props.navCta || "Discuss Your Product"}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
export default DigitalAgency2Navbar;