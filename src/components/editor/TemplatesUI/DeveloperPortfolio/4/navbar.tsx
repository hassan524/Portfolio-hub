// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const DISPLAY = "'Bebas Neue','Oswald','Impact',sans-serif";

// Tiny Web Audio beep — no external deps
let _ctx: AudioContext | null = null;
let _muted = false;
function getCtx() {
  if (typeof window === "undefined") return null;
  if (!_ctx) _ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (_ctx.state === "suspended") _ctx.resume();
  return _ctx;
}
function click(vol = 0.12) {
  if (_muted) return;
  const ctx = getCtx(); if (!ctx) return;
  const osc = ctx.createOscillator(); const g = ctx.createGain();
  osc.type = "triangle"; osc.frequency.setValueAtTime(900, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.05);
  g.gain.setValueAtTime(vol, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
  osc.connect(g); g.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.07);
}

export function Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#07080A";
  const ink = theme?.ink || "#E8E4DC";
  const inkSecond = theme?.["ink-second"] || "#7A756C";
  const surface = theme?.surface || "rgba(255,255,255,0.07)";
  const accent = theme?.accent || "#E8412F";

  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(false);

  const links = props?.links?.length
    ? props.links
    : [
        { label: "About", href: "#about" },
        { label: "Films", href: "#projects" },
        { label: "Reviews", href: "#testimonials" },
        { label: "Contact", href: "#contact" },
      ];
  const setLink = (i: number, v: string) =>
    onChange?.({ links: links.map((l: any, k: number) => (k === i ? { ...l, label: v } : l)) });

  return (
    <header className="sticky top-0 z-50 w-full" style={{ fontFamily: DISPLAY }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,500;1,500&display=swap');
        @keyframes reel-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div
        className="flex w-full items-center justify-between px-6 py-4 border-b md:px-12"
        style={{ backgroundColor: `${bg}F0`, borderColor: surface, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
      >
        {/* Logo — spinning reel SVG inline */}
        <a href="#home" onClick={() => click(0.1)} className="flex items-center gap-3">
          <svg viewBox="0 0 40 40" width="26" height="26" style={{ animation: "reel-spin 6s linear infinite" }} aria-hidden="true">
            <circle cx="20" cy="20" r="18" fill="none" stroke={accent} strokeWidth="2" />
            {[0,1,2,3,4,5].map(i => {
              const a = (i * 60 * Math.PI) / 180;
              return <circle key={i} cx={20 + 10 * Math.cos(a)} cy={20 + 10 * Math.sin(a)} r="4" fill="none" stroke={accent} strokeWidth="2" />;
            })}
            <circle cx="20" cy="20" r="4" fill="none" stroke={accent} strokeWidth="2" />
            <circle cx="20" cy="20" r="1.5" fill={accent} />
          </svg>
          <span className="text-xl tracking-[0.2em]" style={{ color: ink }}>
            <Editable value={props?.brand || "ZAYAN MALIK"} onChange={(v) => onChange?.({ brand: v })} />
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l: any, i: number) => (
            <a
              key={i}
              href={l.href}
              onClick={() => click(0.08)}
              className="group relative text-sm tracking-[0.2em] uppercase"
              style={{ color: inkSecond }}
              onMouseEnter={e => (e.currentTarget.style.color = ink)}
              onMouseLeave={e => (e.currentTarget.style.color = inkSecond)}
            >
              <Editable value={l.label} onChange={(v) => setLink(i, v)} />
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100" style={{ backgroundColor: accent }} />
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Mute button */}
          <button
            onClick={() => { _muted = !_muted; setMuted(!muted); }}
            className="flex h-8 w-8 items-center justify-center rounded-full border transition-all"
            style={{ borderColor: muted ? surface : accent, color: muted ? inkSecond : accent }}
            title={muted ? "Unmute" : "Mute"}
          >
            {muted
              ? <VolumeX className="h-3.5 w-3.5" />
              : <Volume2 className="h-3.5 w-3.5" />
            }
          </button>

          {/* CTA */}
          <a
            href="#contact"
            onClick={() => click(0.15)}
            className="hidden sm:inline-flex items-center border px-4 py-1.5 text-sm tracking-widest uppercase transition-all"
            style={{ borderColor: accent, color: accent }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = accent; e.currentTarget.style.color = "#000"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = accent; }}
          >
            <Editable value={props?.cta || "CONTACT"} onChange={(v) => onChange?.({ cta: v })} />
          </a>

          <button aria-label="Menu" onClick={() => setOpen(!open)} className="flex h-8 w-8 items-center justify-center md:hidden" style={{ color: ink }}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b md:hidden"
            style={{ backgroundColor: bg, borderColor: surface }}
          >
            <div className="flex flex-col gap-3 px-6 py-5">
              {links.map((l: any, i: number) => (
                <a key={i} href={l.href} onClick={() => setOpen(false)} className="text-lg uppercase tracking-widest py-1 border-b" style={{ borderColor: surface, color: ink }}>
                  <Editable value={l.label} onChange={(v) => setLink(i, v)} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export const DeveloperPortfolio4Navbar = Navbar;
export default Navbar;
