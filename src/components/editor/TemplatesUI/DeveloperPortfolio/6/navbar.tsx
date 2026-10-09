// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Menu, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Navbar({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";

    const [open, setOpen] = useState(false);
    const defaultLinks = [
        { label: "Portfolio", href: "#projects" },
        { label: "About me", href: "#about" },
        { label: "Experience", href: "#experience" },
        { label: "Reviews", href: "#testimonials" },
    ];
    const rawLinks = props?.links;
    const links = Array.isArray(rawLinks) && rawLinks.length > 0 ? rawLinks : defaultLinks;

    const setLink = (i: number, v: string) =>
        onChange?.({ links: links.map((l: any, j: number) => (j === i ? { ...l, label: v } : l)) });

    return (
        <header
            className="sticky top-0 z-50 w-full backdrop-blur-xl"
            style={{ background: "rgba(0,0,0,0.6)", borderBottom: `1px solid ${surface}` }}
        >
            <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-8">
                <a href="#home" className="flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-95">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: surface }}>
                        <Terminal size={18} style={{ color: ink }} />
                    </span>
                    <span className="font-mono text-base md:text-lg font-semibold italic" style={{ color: ink }}>
                        <Editable as="span" value={props?.logo || "Alicia Smith"} onChange={(v) => onChange?.({ logo: v })} />
                    </span>
                </a>

                <nav className="hidden items-center gap-8 md:flex">
                    {links.map((l: any, i: number) => (
                        <a key={i} href={l.href} className="font-mono text-sm md:text-base transition-opacity hover:opacity-70" style={{ color: inkSecond }}>
                            <Editable as="span" value={l.label} onChange={(v) => setLink(i, v)} />
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <span
                        className="hidden items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs lg:flex"
                        style={{ background: surface, color: inkSecond }}
                    >
                        <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: accent }} />
                        <Editable as="span" value={props?.status || "Open to work"} onChange={(v) => onChange?.({ status: v })} />
                    </span>
                    <a
                        href="#contact"
                        className="hidden rounded-lg px-5 py-2.5 font-mono text-xs md:text-sm transition-transform hover:scale-[1.02] active:scale-95 md:block font-semibold"
                        style={{ background: surface, color: ink }}
                    >
                        <Editable as="span" value={props?.cta || "Contact me"} onChange={(v) => onChange?.({ cta: v })} />
                    </a>
                    <button
                        className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform active:scale-95 md:hidden"
                        style={{ background: surface, color: ink }}
                        onClick={() => setOpen(!open)}
                        aria-label="Menu"
                    >
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden md:hidden"
                        style={{ background: bg, borderTop: `1px solid ${surface}` }}
                    >
                        <div className="flex flex-col gap-1 px-5 py-5">
                            {links.map((l: any, i: number) => (
                                <a key={i} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-mono text-base font-medium" style={{ color: ink }}>
                                    <Editable as="span" value={l.label} onChange={(v) => setLink(i, v)} />
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setOpen(false)}
                                className="mt-3 rounded-lg px-4 py-3.5 text-center font-mono text-base font-semibold"
                                style={{ background: accent, color: bg }}
                            >
                                <Editable as="span" value={props?.cta || "Contact me"} onChange={(v) => onChange?.({ cta: v })} />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export const DeveloperPortfolio6Navbar = Navbar;
export default Navbar;