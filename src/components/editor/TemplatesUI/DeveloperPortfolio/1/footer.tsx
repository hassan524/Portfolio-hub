// @ts-nocheck
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const links = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#experience", label: "Experience" },
        { href: "#projects", label: "Projects" },
        { href: "#testimonials", label: "Kind words" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <footer className="px-5 pb-7 pt-8 sm:px-8" style={{ backgroundColor: bg, color: ink }}>
            <div className="mx-auto max-w-7xl border-t pt-7" style={{ borderColor: surface }}>
                <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                    <a href="#home" className="group flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-xl text-xs font-semibold" style={{ color: bg, backgroundColor: accent }}>
                            <Editable value={props?.monogram || "MC"} onChange={(v) => onChange?.({ monogram: v })} />
                        </span>
                        <span>
                            <span className="block text-sm font-medium"><Editable value={props?.name || "Mira Chen"} onChange={(v) => onChange?.({ name: v })} /></span>
                            <span className="mt-1 block text-[10px] uppercase tracking-[.14em] opacity-40"><Editable value={props?.descriptor || "Independent software engineer"} onChange={(v) => onChange?.({ descriptor: v })} /></span>
                        </span>
                    </a>
                    <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3">
                        {links.map((link) => (
                            <a key={link.href} href={link.href} className="text-xs opacity-55 transition-opacity hover:opacity-100" style={{ color: inkSecond }}>
                                <Editable value={link.label} />
                            </a>
                        ))}
                    </nav>
                    <a href="#home" className="group inline-flex items-center gap-2 self-start rounded-xl border px-3.5 py-2.5 text-xs transition-transform hover:scale-[1.02] active:scale-95 sm:self-auto" style={{ borderColor: surface }}>
                        <Editable value={props?.backToTop || "Back to top"} onChange={(v) => onChange?.({ backToTop: v })} /><ArrowUp size={13} />
                    </a>
                </div>
                <div className="mt-7 flex flex-col gap-2 border-t pt-5 text-[10px] uppercase tracking-[.12em] opacity-35 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: surface }}>
                    <span><Editable value={props?.copyright || "© 2025 Mira Chen"} onChange={(v) => onChange?.({ copyright: v })} /></span>
                    <span className="inline-flex items-center gap-1.5"><Editable value={props?.madeWith || "Made with care, and an unreasonable number of notes."} onChange={(v) => onChange?.({ madeWith: v })} /><ArrowUpRight size={11} /></span>
                </div>
            </div>
        </footer>
    );
}
