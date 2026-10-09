// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ArrowUpRight, Menu, X } from "lucide-react";
import Lenis from "lenis";
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
    const links = props?.links || [
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Work", href: "#projects" },
        { label: "Reviews", href: "#testimonials" },
        { label: "Contact", href: "#contact" },
    ];
    const setLink = (i: number, v: string) =>
        onChange?.({ links: links.map((l: any, j: number) => (j === i ? { ...l, label: v } : l)) });

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        let lenis: any, raf = 0;
        if (props?.smoothScroll !== false) {
            try {
                lenis = new Lenis({ duration: 1.2, anchors: true });
                const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
                raf = requestAnimationFrame(loop);
            } catch (e) { }
        }
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (raf) cancelAnimationFrame(raf);
            lenis?.destroy();
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <>
            <motion.header
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
                style={{
                    color: ink,
                    background: scrolled ? `color-mix(in srgb, ${bg} 82%, transparent)` : "transparent",
                    backdropFilter: scrolled ? "blur(18px)" : "none",
                    borderBottom: `1px solid ${scrolled ? surface : "transparent"}`,
                }}
            >
                <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto] items-center px-6 py-4 md:grid-cols-[1fr_auto_1fr] md:px-10">
                    <a href="#top" className="flex w-fit items-center gap-2 transition-transform hover:scale-[1.02] active:scale-95">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: accent, color: ink }}>
                            <Code2 size={16} />
                        </span>
                        <span className="text-sm font-semibold tracking-tight">
                            <Editable as="span" value={props?.brand || "Portfolio\u00ae"} onChange={(v: string) => onChange?.({ brand: v })} />
                        </span>
                    </a>

                    <nav className="hidden items-center gap-9 md:flex">
                        {links.map((l: any, i: number) => (
                            <a key={i} href={l.href} className="group relative text-sm transition-transform hover:scale-[1.02] active:scale-95">
                                <Editable as="span" value={l.label} onChange={(v: string) => setLink(i, v)} />
                                <sup className="ml-0.5 text-[9px]" style={{ color: inkSecond }}>
                                    <Editable as="span" value={String(i + 1).padStart(2, "0")} />
                                </sup>
                                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: ink }} />
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center justify-end gap-3">
                        <span className="hidden items-center gap-2 rounded-full px-3 py-1.5 text-[11px] lg:flex" style={{ background: surface, color: inkSecond }}>
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full" style={{ background: ink }} />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: ink }} />
                            </span>
                            <Editable as="span" value={props?.status || "Open to work"} onChange={(v: string) => onChange?.({ status: v })} />
                        </span>
                        <a href="#contact" className="hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:scale-[1.02] active:scale-95 md:flex" style={{ background: accent, color: ink }}>
                            <Editable as="span" value={props?.cta || "Let's talk"} onChange={(v: string) => onChange?.({ cta: v })} />
                            <ArrowUpRight size={15} />
                        </a>
                        <button onClick={() => setOpen(!open)} aria-label="Menu" className="relative z-[70] flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-95 md:hidden" style={{ background: surface, color: ink }}>
                            {open ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ clipPath: "circle(0% at 90% 5%)" }}
                        animate={{ clipPath: "circle(150% at 90% 5%)" }}
                        exit={{ clipPath: "circle(0% at 90% 5%)" }}
                        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[60] flex flex-col justify-between px-6 pb-10 pt-28 md:hidden"
                        style={{ background: `linear-gradient(160deg, ${bg}, ${bgSecond})`, color: ink }}
                    >
                        <div className="flex flex-col">
                            {links.map((l: any, i: number) => (
                                <motion.a key={i} href={l.href} onClick={() => setOpen(false)} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.07, duration: 0.6 }} className="flex items-baseline justify-between py-3 text-5xl font-semibold tracking-tight" style={{ borderBottom: `1px solid ${surface}` }}>
                                    <Editable as="span" value={l.label} onChange={(v: string) => setLink(i, v)} />
                                    <span className="text-xs" style={{ color: inkSecond }}>
                                        <Editable as="span" value={String(i + 1).padStart(2, "0")} />
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                        <a href="#contact" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded-full py-4 text-base font-medium" style={{ background: accent, color: ink }}>
                            <Editable as="span" value={props?.cta || "Let's talk"} onChange={(v: string) => onChange?.({ cta: v })} />
                            <ArrowUpRight size={18} />
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
export const DeveloperPortfolio5Navbar = Navbar;
export default Navbar;
