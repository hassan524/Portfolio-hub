// @ts-nocheck
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
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
        { label: "About", href: "#about" },
        { label: "Selected work", href: "#projects" },
        { label: "Experience", href: "#experience" },
        { label: "Testimonials", href: "#testimonials" },
    ];
    const updateLink = (index: number, key: string, value: string) => {
        const next = links.map((item: any, i: number) => i === index ? { ...item, [key]: value } : item);
        onChange?.({ navItems: next });
    };

    return (
        <header className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ backgroundColor: `${bg}E8`, borderColor: surface }}>
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
                <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
                    <span className="font-mono text-sm font-semibold tracking-tight md:text-base" style={{ color: ink }}>
                        <Editable value={props?.brand || "Alex Morgan"} onChange={(v) => onChange?.({ brand: v })} />
                    </span>
                    <span className="hidden h-1.5 w-1.5 rounded-full sm:block" style={{ backgroundColor: accent }} />
                </a>

                <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
                    {links.map((item: any, index: number) => (
                        <a key={`${item.href}-${index}`} href={item.href} className="text-xs transition-colors hover:opacity-70" style={{ color: inkSecond }}>
                            <Editable value={item.label} onChange={(v) => updateLink(index, "label", v)} />
                        </a>
                    ))}
                    <a href="#contact" className="group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition-all hover:scale-[1.02] active:scale-95" style={{ borderColor: surface, color: ink }}>
                        <Editable value={props?.ctaLabel || "Get in touch"} onChange={(v) => onChange?.({ ctaLabel: v })} />
                        <ArrowUpRight size={14} style={{ color: accent }} />
                    </a>
                </nav>

                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full border md:hidden"
                    style={{ borderColor: surface, color: ink }}
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {menuOpen && (
                <nav className="border-t px-5 py-4 md:hidden" style={{ borderColor: surface, backgroundColor: bgSecond }} aria-label="Mobile navigation">
                    <div className="mx-auto flex max-w-7xl flex-col gap-1">
                        {links.map((item: any, index: number) => (
                            <a key={`mobile-${item.href}-${index}`} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm transition-colors" style={{ color: inkSecond }}>
                                <Editable value={item.label} onChange={(v) => updateLink(index, "label", v)} />
                            </a>
                        ))}
                        <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-2 inline-flex items-center justify-between rounded-lg px-3 py-3 text-sm" style={{ color: accent }}>
                            <Editable value={props?.ctaLabel || "Get in touch"} onChange={(v) => onChange?.({ ctaLabel: v })} />
                            <ArrowUpRight size={16} />
                        </a>
                    </div>
                </nav>
            )}
        </header>
    );
}
