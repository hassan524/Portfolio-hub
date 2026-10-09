// @ts-nocheck
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Navbar({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const [open, setOpen] = useState(false);
    const links = [
        ["About", "#about"],
        ["Experience", "#experience"],
        ["Episodes", "#projects"],
        ["Kind words", "#testimonials"],
        ["Say hello", "#contact"],
    ];
    return (
        <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-7 sm:pt-6">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/15 px-4 py-3 shadow-xl backdrop-blur-xl sm:px-6"
                style={{ backgroundColor: surface, color: ink }}
                aria-label="Main navigation"
            >
                <a href="#home" className="group flex items-center gap-2.5 rounded-full py-1">
                    <span className="flex h-9 w-9 -rotate-6 items-center justify-center rounded-full transition-transform group-hover:rotate-6" style={{ backgroundColor: accent, color: bg }}>
                        <Sparkles size={17} />
                    </span>
                    <span className="font-black tracking-[-0.07em]"><Editable value={props?.brand || "MIRA / DEV"} onChange={(v) => onChange?.({ brand: v })} /></span>
                    <span className="hidden rounded-full border border-current/20 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] opacity-65 sm:inline"><Editable value="story mode" /></span>
                </a>
                <div className="hidden items-center gap-1 lg:flex">
                    {links.map(([label, href]) => (
                        <a key={href} href={href} className="rounded-full px-3 py-2 text-xs font-semibold transition-all hover:scale-[1.02] hover:bg-white/10 active:scale-95">
                            <Editable value={label} />
                        </a>
                    ))}
                </div>
                <a href="#contact" className="hidden items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition-all hover:scale-[1.02] active:scale-95 sm:flex" style={{ backgroundColor: accent, color: bg }}>
                    <Editable value="Open a conversation" />
                    <span aria-hidden="true"><Editable value="↗" /></span>
                </a>
                <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:scale-[1.02] active:scale-95 lg:hidden"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                >
                    {open ? <X size={18} /> : <Menu size={18} />}
                </button>
            </nav>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-white/15 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
                        style={{ backgroundColor: bgSecond, color: inkSecond }}
                    >
                        {links.map(([label, href], index) => (
                            <a key={href} href={href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold transition-colors hover:bg-white/10">
                                <Editable value={label} />
                                <span className="font-mono text-xs opacity-50"><Editable value={`0${index + 1}`} /></span>
                            </a>
                        ))}
                        <a href="#contact" onClick={() => setOpen(false)} className="mt-2 block rounded-2xl px-4 py-3.5 text-center text-sm font-bold" style={{ backgroundColor: accent, color: bg }}>
                            <Editable value="Open a conversation" />
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
