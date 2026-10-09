// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency3Navbar({ props = {}, theme, onChange }: any) {
  const [open, setOpen] = useState(false);
  const bg = theme?.bg || "#FFFFFF";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || theme?.surface || "#F5F4F2";
  const ink = theme?.text || theme?.ink || "#0F0F10";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#6B6B70";
  const accent = theme?.accent || "#2F5BFF";
  const onAccent = theme?.["on-accent"] || bg; // text colour on accent buttons

  const links = props.navLinks || [
    { label: "Solutions", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Cases", href: "#projects" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];
  const go = (e: any, href: string) => { e.preventDefault(); setOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <motion.header initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full backdrop-blur-xl" style={{ background: `${bg}e6`, borderBottom: `1px solid ${inkSecond}20`, color: ink }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <a href="#home" onClick={(e) => go(e, "#home")} className="text-xl font-black tracking-tighter select-none">
          <Editable value={props.brandName || "Stackline"} onChange={(v) => onChange?.({ brandName: v })} />
        </a>
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l: any) => <a key={l.label} href={l.href} onClick={(e) => go(e, l.href)} className="text-sm font-medium transition-opacity hover:opacity-60">{l.label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#contact" onClick={(e) => go(e, "#contact")} className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: accent, color: onAccent }}>
            <Editable value={props.navCta || "Get in touch"} onChange={(v) => onChange?.({ navCta: v })} />
          </a>
          <button type="button" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open} className="md:hidden w-10 h-10 rounded-full flex items-center justify-center cursor-pointer" style={{ background: bgSecond }}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden" style={{ background: bg, borderTop: `1px solid ${inkSecond}20` }}>
            <div className="px-4 py-3">
              {links.map((l: any) => <a key={l.label} href={l.href} onClick={(e) => go(e, l.href)} className="block py-3 text-base font-medium">{l.label}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
export default DigitalAgency3Navbar;