// @ts-nocheck
import { useState } from "react";
import { Flame, Menu, X, ArrowUpRight } from "lucide-react";
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
    const links = props?.links || [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Music", href: "#projects" },
        { label: "Reviews", href: "#testimonials" },
        { label: "Contact", href: "#contact" },
    ];
    const updLink = (i: number, v: string) =>
        onChange?.({ links: links.map((l: any, j: number) => (j === i ? { ...l, label: v } : l)) });

    return (
        <header
            className="sticky top-0 z-50 w-full backdrop-blur-xl border-b"
            style={{ background: `${bg}CC`, borderColor: surface }}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
                <a href="#home" className="flex items-center gap-2.5 transition-transform hover:scale-[1.02] active:scale-95">
                    <motion.span
                        animate={{ rotate: [0, -8, 8, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ background: accent, color: bg, boxShadow: `0 0 24px ${accent}88` }}
                    >
                        <Flame size={20} />
                    </motion.span>
                    <Editable
                        as="span"
                        className="text-lg font-black tracking-tight"
                        style={{ color: ink }}
                        value={props?.brand || "Cinder Hollow"}
                        onChange={(v: string) => onChange?.({ brand: v })}
                    />
                </a>

                <nav className="hidden items-center gap-1 lg:flex">
                    {links.map((l: any, i: number) => (
                        <a
                            key={i}
                            href={l.href}
                            className="rounded-full px-4 py-2 text-sm font-medium transition-all hover:scale-[1.02] active:scale-95"
                            style={{ color: inkSecond }}
                        >
                            <Editable as="span" value={l.label} onChange={(v: string) => updLink(i, v)} />
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <span
                        className="hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold md:inline-flex"
                        style={{ background: surface, color: ink }}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate__animated animate__pulse animate__infinite absolute inline-flex h-full w-full rounded-full" style={{ background: accent }} />
                            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: accent }} />
                        </span>
                        <Editable as="span" value={props?.status || "On Tour 2026"} onChange={(v: string) => onChange?.({ status: v })} />
                    </span>
                    <a
                        href="#contact"
                        className="hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 sm:inline-flex"
                        style={{ background: accent, color: bg, boxShadow: `0 8px 30px ${accent}55` }}
                    >
                        <Editable as="span" value={props?.cta || "Book the Band"} onChange={(v: string) => onChange?.({ cta: v })} />
                        <ArrowUpRight size={16} />
                    </a>
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl transition-all active:scale-95 lg:hidden"
                        style={{ background: surface, color: ink }}
                        aria-label="Menu"
                    >
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden lg:hidden"
                        style={{ background: bgSecond }}
                    >
                        <div className="flex flex-col gap-1 px-5 py-4">
                            {links.map((l: any, i: number) => (
                                <a
                                    key={i}
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    className="rounded-xl px-4 py-3 text-base font-semibold transition-all active:scale-95"
                                    style={{ background: surface, color: ink }}
                                >
                                    <Editable as="span" value={l.label} onChange={(v: string) => updLink(i, v)} />
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setOpen(false)}
                                className="mt-2 rounded-xl px-4 py-3 text-center font-bold active:scale-95"
                                style={{ background: accent, color: bg }}
                            >
                                <Editable as="span" value={props?.cta || "Book the Band"} onChange={(v: string) => onChange?.({ cta: v })} />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}