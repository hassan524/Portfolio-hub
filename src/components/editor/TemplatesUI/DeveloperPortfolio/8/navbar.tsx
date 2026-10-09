// @ts-nocheck
import { useState } from "react";
import { ArrowDownRight, Menu, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Navbar({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const [menuOpen, setMenuOpen] = useState(false);
    const links = props?.navItems || [
        { label: "The position", href: "#about" },
        { label: "Game record", href: "#projects" },
        { label: "Career", href: "#experience" },
        { label: "Notes", href: "#testimonials" },
    ];
    const updateLink = (index: number, key: string, value: string) =>
        onChange?.({ navItems: links.map((item: any, i: number) => i === index ? { ...item, [key]: value } : item) });
    return (
        <header className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ backgroundColor: `${bg}F2`, borderColor: surface }}>
            <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-12">
                <a href="#top" className="flex items-center gap-3" aria-label="Return to opening position">
                    <span className="grid h-8 w-8 place-items-center border text-lg leading-none" style={{ color: accent, borderColor: accent }}>♘</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: ink }}>
                        <Editable value={props?.brand || "Alex Morgan"} onChange={(v) => onChange?.({ brand: v })} />
                    </span>
                </a>
                <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
                    {links.map((item: any, index: number) => (
                        <a key={`${item.href}-${index}`} href={item.href} className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-opacity hover:opacity-70" style={{ color: inkSecond }}>
                            <span className="h-1 w-1" style={{ backgroundColor: accent }} />
                            <Editable value={item.label} onChange={(v) => updateLink(index, "label", v)} />
                        </a>
                    ))}
                    <a href="#contact" className="inline-flex items-center gap-2 border-b pb-1 font-mono text-[10px] uppercase tracking-[0.15em]" style={{ borderColor: accent, color: ink }}>
                        <Editable value={props?.ctaLabel || "Make a move"} onChange={(v) => onChange?.({ ctaLabel: v })} />
                        <ArrowDownRight size={14} style={{ color: accent }} />
                    </a>
                </nav>
                <button type="button" onClick={() => setMenuOpen((open) => !open)} className="grid h-10 w-10 place-items-center border lg:hidden" style={{ borderColor: surface, color: ink }} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
                    {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>
            {menuOpen && (
                <nav className="border-t px-5 py-4 lg:hidden" style={{ borderColor: surface, backgroundColor: bgSecond }} aria-label="Mobile navigation">
                    <div className="mx-auto flex max-w-[1440px] flex-col">
                        {links.map((item: any, index: number) => (
                            <a key={`mobile-${item.href}-${index}`} href={item.href} onClick={() => setMenuOpen(false)} className="flex items-center gap-3 border-b py-4 font-mono text-xs uppercase tracking-[0.12em]" style={{ borderColor: surface, color: inkSecond }}>
                                <span className="text-[10px]" style={{ color: accent }}>0{index + 1}</span>
                                <Editable value={item.label} onChange={(v) => updateLink(index, "label", v)} />
                            </a>
                        ))}
                        <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-4 flex items-center justify-between py-2 font-mono text-xs uppercase tracking-[0.15em]" style={{ color: accent }}>
                            <Editable value={props?.ctaLabel || "Make a move"} onChange={(v) => onChange?.({ ctaLabel: v })} />
                            <ArrowDownRight size={16} />
                        </a>
                    </div>
                </nav>
            )}
        </header>
    );
}
