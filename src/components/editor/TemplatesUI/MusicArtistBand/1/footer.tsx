// @ts-nocheck
import { Flame, ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";

    const columns = props?.columns || [
        { title: "Explore", links: [{ label: "Home", href: "#home" }, { label: "About", href: "#about" }, { label: "Music", href: "#projects" }] },
        { title: "Connect", links: [{ label: "Reviews", href: "#testimonials" }, { label: "Booking", href: "#contact" }, { label: "Contact", href: "#contact" }] },
    ];
    const updCol = (ci: number, k: string, v: string) => onChange?.({ columns: columns.map((c: any, j: number) => (j === ci ? { ...c, [k]: v } : c)) });
    const updLink = (ci: number, li: number, v: string) =>
        onChange?.({ columns: columns.map((c: any, j: number) => (j === ci ? { ...c, links: c.links.map((l: any, y: number) => (y === li ? { ...l, label: v } : l)) } : c)) });

    return (
        <footer className="relative px-5 pb-8 pt-16 md:px-8" style={{ background: bgSecond, color: ink, borderTop: `1px solid ${surface}` }}>
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <a href="#home" className="inline-flex items-center gap-2.5">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: accent, color: bg, boxShadow: `0 0 24px ${accent}88` }}><Flame size={20} /></span>
                            <Editable as="span" className="text-lg font-black" style={{ color: ink }} value={props?.brand || "Cinder Hollow"} onChange={(v: string) => onChange?.({ brand: v })} />
                        </a>
                        <Editable as="p" className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: inkSecond }} value={props?.summary || "A four-piece alt-rock band from Austin, Texas. Loud records, louder live shows."} onChange={(v: string) => onChange?.({ summary: v })} />
                        <span className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold" style={{ background: surface, color: ink }}>
                            <span className="relative flex h-2 w-2">
                                <span className="animate__animated animate__pulse animate__infinite absolute inline-flex h-full w-full rounded-full" style={{ background: accent }} />
                                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: accent }} />
                            </span>
                            <Editable as="span" value={props?.status || "Booking open for 2026"} onChange={(v: string) => onChange?.({ status: v })} />
                        </span>
                    </div>
                    {columns.map((c: any, ci: number) => (
                        <div key={ci}>
                            <Editable as="div" className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }} value={c.title} onChange={(v: string) => updCol(ci, "title", v)} />
                            <ul className="mt-4 space-y-3">
                                {c.links.map((l: any, li: number) => (
                                    <li key={li}>
                                        <a href={l.href} className="text-sm transition-all hover:scale-[1.02]" style={{ color: inkSecond }}>
                                            <Editable as="span" value={l.label} onChange={(v: string) => updLink(ci, li, v)} />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row" style={{ borderColor: surface }}>
                    <Editable as="p" className="text-xs" style={{ color: inkSecond }} value={props?.copyright || "© 2026 Cinder Hollow. All rights reserved."} onChange={(v: string) => onChange?.({ copyright: v })} />
                    <a href="#home" className="flex h-11 w-11 items-center justify-center rounded-full transition-all hover:scale-[1.02] active:scale-95" style={{ background: accent, color: bg, boxShadow: `0 6px 20px ${accent}55` }} aria-label="Back to top">
                        <ArrowUp size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
}