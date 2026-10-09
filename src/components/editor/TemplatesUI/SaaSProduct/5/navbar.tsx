// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const DEFAULT_LINKS = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Clients", href: "#testimonials" },
  ];
  const links = Array.isArray(props?.links) && props.links.length > 0 ? props.links : DEFAULT_LINKS;
  const setLink = (i: number, v: string) =>
    onChange?.({ links: links.map((l: any, j: number) => (j === i ? { ...l, label: v } : l)) });
  const go = (e: any, href: string, i?: number) => {
    e.preventDefault();
    if (i !== undefined) setActive(i);
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b" style={{ borderColor: surface }}>
      <div className="absolute inset-0 -z-10 opacity-80 backdrop-blur-xl" style={{ backgroundColor: bg }} />
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
        <a href="#home" onClick={(e) => go(e, "#home", 0)} className="flex min-w-0 items-center gap-2.5 transition hover:scale-[1.02] active:scale-95">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: accent, color: ink }}>
            <Zap size={18} />
          </span>
          <Editable as="span" value={props?.brand || "Forgeline"} onChange={(v: string) => onChange?.({ brand: v })} className="truncate font-['Poppins'] text-xl font-semibold tracking-tight" style={{ color: ink }} />
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l: any, i: number) => (
            <a key={i} href={l.href} onClick={(e) => go(e, l.href, i)} className="relative py-1 text-[15px] font-medium transition hover:scale-[1.02] active:scale-95" style={{ color: active === i ? ink : inkSecond }}>
              <Editable as="span" value={l.label} onChange={(v: string) => setLink(i, v)} />
              {active === i && <motion.span layoutId="nav-underline" className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full" style={{ backgroundColor: ink }} />}
            </a>
          ))}
          <a href="#contact" onClick={(e) => go(e, "#contact")} className="rounded-full px-6 py-3 text-[15px] font-semibold transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: ink }}>
            <Editable as="span" value={props?.cta || "Contact Us"} onChange={(v: string) => onChange?.({ cta: v })} />
          </a>
        </div>

        <button aria-label="Menu" onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center rounded-xl border transition active:scale-95 md:hidden" style={{ backgroundColor: surface, borderColor: surface, color: ink }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t md:hidden" style={{ backgroundColor: bg, borderColor: surface }}>
            <div className="flex flex-col gap-1 px-6 py-5">
              {links.map((l: any, i: number) => (
                <a key={i} href={l.href} onClick={(e) => go(e, l.href, i)} className="rounded-xl px-4 py-3 text-base font-medium" style={{ color: active === i ? ink : inkSecond, backgroundColor: active === i ? surface : "transparent" }}>
                  <Editable as="span" value={l.label} onChange={(v: string) => setLink(i, v)} />
                </a>
              ))}
              <a href="#contact" onClick={(e) => go(e, "#contact")} className="mt-3 rounded-full px-6 py-3 text-center font-semibold" style={{ backgroundColor: accent, color: ink }}>
                <Editable as="span" value={props?.cta || "Contact Us"} onChange={(v: string) => onChange?.({ cta: v })} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export const SaaSProduct5Navbar = Navbar;
export const NavbarBlock = Navbar;
export default Navbar;
