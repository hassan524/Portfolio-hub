// @ts-nocheck
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const footerLinks = props?.footerLinks || [
        { label: "Position", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Experience", href: "#experience" },
        { label: "Contact", href: "#contact" },
    ];
    const updateLink = (index: number, key: string, value: string) =>
        onChange?.({ footerLinks: footerLinks.map((item: any, i: number) => i === index ? { ...item, [key]: value } : item) });
    return (
        <footer className="border-t py-8 md:py-10" style={{ backgroundColor: bg, borderColor: surface }}>
            <div className="mx-auto max-w-[1440px] px-5 md:px-12">
                <div className="flex flex-col justify-between gap-7 md:flex-row md:items-start">
                    <a href="#top" className="flex items-start gap-3">
                        <span className="grid h-9 w-9 place-items-center border font-serif text-lg" style={{ borderColor: accent, color: accent }}>♘</span>
                        <span>
                            <span className="block font-mono text-xs uppercase tracking-[0.14em]" style={{ color: ink }}><Editable value={props?.brand || "Alex Morgan"} onChange={(v) => onChange?.({ brand: v })} /></span>
                            <span className="mt-2 block max-w-sm text-xs leading-5" style={{ color: inkSecond }}><Editable value={props?.summary || "An engineer's record of considered moves, useful products, and the teams behind them."} onChange={(v) => onChange?.({ summary: v })} /></span>
                        </span>
                    </a>
                    <nav className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end" aria-label="Footer navigation">
                        {footerLinks.map((item: any, index: number) => (
                            <a key={`footer-${index}`} href={item.href} className="font-mono text-[9px] uppercase tracking-[0.12em] transition-opacity hover:opacity-65" style={{ color: inkSecond }}>
                                <Editable value={item.label} onChange={(v) => updateLink(index, "label", v)} />
                            </a>
                        ))}
                    </nav>
                </div>
                <div className="mt-8 flex flex-col justify-between gap-4 border-t pt-4 sm:flex-row sm:items-center" style={{ borderColor: surface }}>
                    <p className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: inkSecond }}><Editable value={props?.copyright || "© 2025 Alex Morgan · Built one good move at a time."} onChange={(v) => onChange?.({ copyright: v })} /></p>
                    <a href="#top" className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em]" style={{ color: ink }}><Editable value={props?.backToTopLabel || "Return to opening"} onChange={(v) => onChange?.({ backToTopLabel: v })} /><ArrowUpRight size={13} style={{ color: accent }} /></a>
                </div>
            </div>
        </footer>
    );
}
