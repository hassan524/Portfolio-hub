// @ts-nocheck
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
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
    const links = [
        { href: "#about", label: "About" },
        { href: "#experience", label: "Experience" },
        { href: "#projects", label: "Projects" },
        { href: "#testimonials", label: "Kind words" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8 sm:pt-6">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 backdrop-blur-xl sm:px-6"
                style={{ backgroundColor: bgSecond, color: ink, borderColor: surface }}
            >
                <a href="#home" className="group flex min-w-0 items-center gap-3">
                    <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-semibold tracking-tight"
                        style={{ color: bg, backgroundColor: accent }}
                    >
                        <Editable value={props?.monogram || "MC"} onChange={(v) => onChange?.({ monogram: v })} />
                    </span>
                    <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold tracking-tight">
                            <Editable value={props?.name || "Mira Chen"} onChange={(v) => onChange?.({ name: v })} />
                        </span>
                        <span className="block text-[10px] uppercase tracking-[0.16em] opacity-50">
                            <Editable value={props?.descriptor || "Independent engineer"} onChange={(v) => onChange?.({ descriptor: v })} />
                        </span>
                    </span>
                </a>

                <div className="hidden items-center gap-7 md:flex">
                    {links.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-xs transition-opacity hover:opacity-60"
                            style={{ color: inkSecond }}
                        >
                            <Editable value={item.label} />
                        </a>
                    ))}
                    <a
                        href="#contact"
                        className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium transition-transform hover:scale-[1.02] active:scale-95"
                        style={{ color: bg, backgroundColor: accent }}
                    >
                        <Editable value={props?.availability || "Available for select work"} onChange={(v) => onChange?.({ availability: v })} />
                        <ArrowUpRight size={14} />
                    </a>
                </div>

                <button
                    type="button"
                    aria-label={open ? "Close navigation" : "Open navigation"}
                    aria-expanded={open}
                    onClick={() => setOpen((value) => !value)}
                    className="grid h-10 w-10 place-items-center rounded-xl md:hidden"
                    style={{ backgroundColor: surface }}
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
                        transition={{ duration: 0.18 }}
                        className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border p-3 shadow-2xl md:hidden"
                        style={{ backgroundColor: bgSecond, color: ink, borderColor: surface }}
                    >
                        {links.map((item, index) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors"
                                style={{ backgroundColor: surface, color: inkSecond }}
                            >
                                <Editable value={item.label} />
                                <ArrowUpRight size={14} className="opacity-40" />
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setOpen(false)}
                            className="mt-2 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium"
                            style={{ color: bg, backgroundColor: accent }}
                        >
                            <Editable value={props?.availability || "Available for select work"} onChange={(v) => onChange?.({ availability: v })} />
                            <ArrowUpRight size={15} />
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
