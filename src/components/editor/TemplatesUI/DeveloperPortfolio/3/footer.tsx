// @ts-nocheck
import { ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#07060B";
    const bgSecond = theme?.["bg-second"] || "#0F0C14";
    const ink = theme?.ink || "#FFFFFF";
    const inkSecond = theme?.["ink-second"] || "#D6D0E0";
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#F5B335";

    const links = props?.links || [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Testimonials", href: "#testimonials" },
        { label: "Contact", href: "#contact" },
    ];

    const setLink = (i: number, v: string) =>
        onChange?.({ links: links.map((l: any, k: number) => (k === i ? { ...l, label: v } : l)) });

    return (
        <footer className="w-full border-t py-10" style={{ backgroundColor: bgSecond, borderColor: surface, color: ink }}>
            <div className="mx-auto max-w-6xl px-5 md:px-8">
                {/* Row 1: brand + links */}
                <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
                    <span className="font-serif text-xl font-bold" style={{ color: ink }}>
                        <Editable value={props?.brand || "Zayan Malik"} onChange={(v) => onChange?.({ brand: v })} />
                    </span>

                    <nav className="flex flex-wrap gap-x-7 gap-y-3">
                        {links.map((l: any, i: number) => (
                            <a
                                key={i}
                                href={l.href}
                                className="text-sm transition-colors duration-300 hover:text-[color:var(--ft)]"
                                style={{ color: inkSecond, "--ft": accent }}
                            >
                                <Editable value={l.label} onChange={(v) => setLink(i, v)} />
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Row 2: copyright + back to top */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-xs" style={{ borderColor: surface, color: inkSecond }}>
                    <p>
                        <Editable value={props?.copyright || "© 2026 Zayan Malik. All rights reserved."} onChange={(v) => onChange?.({ copyright: v })} />
                    </p>
                    <a
                        href="#home"
                        className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-[color:var(--ft)]"
                        style={{ color: inkSecond, "--ft": accent }}
                    >
                        <Editable value={props?.backToTop || "Back to top"} onChange={(v) => onChange?.({ backToTop: v })} />
                        <ArrowUp className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </footer>
    );
}