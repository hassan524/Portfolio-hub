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
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Experience", href: "#experience" },
        { label: "Testimonials", href: "#testimonials" },
        { label: "Contact", href: "#contact" },
    ];
    const updateLink = (index: number, key: string, value: string) => {
        onChange?.({ footerLinks: footerLinks.map((item: any, i: number) => i === index ? { ...item, [key]: value } : item) });
    };

    return (
        <footer className="border-t py-10 md:py-12" style={{ backgroundColor: bg, borderColor: surface }}>
            <div className="mx-auto max-w-7xl px-5 md:px-10">
                <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
                    <a href="#top" className="group flex items-start gap-3">
                        <span>
                            <span className="block font-mono text-sm font-semibold" style={{ color: ink }}>
                                <Editable value={props?.brand || "Alex Morgan"} onChange={(v) => onChange?.({ brand: v })} />
                            </span>
                            <span className="mt-1 block max-w-xs text-xs leading-5" style={{ color: inkSecond }}>
                                <Editable value={props?.summary || "Software engineer making useful things with good people."} onChange={(v) => onChange?.({ summary: v })} />
                            </span>
                        </span>
                    </a>
                    <nav className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end" aria-label="Footer navigation">
                        {footerLinks.map((item: any, index: number) => (
                            <a key={`footer-link-${index}`} href={item.href} className="text-xs transition-opacity hover:opacity-70" style={{ color: inkSecond }}>
                                <Editable value={item.label} onChange={(v) => updateLink(index, "label", v)} />
                            </a>
                        ))}
                    </nav>
                </div>
                <div className="mt-9 flex flex-col justify-between gap-4 border-t pt-5 sm:flex-row sm:items-center" style={{ borderColor: surface }}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: inkSecond }}>
                        <Editable value={props?.copyright || "© 2026 Alex Morgan. Made with care."} onChange={(v) => onChange?.({ copyright: v })} />
                    </p>
                    <a href="#top" className="inline-flex items-center gap-2 text-xs transition-all hover:gap-3" style={{ color: ink }}>
                        <Editable value={props?.backToTopLabel || "Back to top"} onChange={(v) => onChange?.({ backToTopLabel: v })} />
                        <ArrowUpRight size={13} style={{ color: accent }} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
