// @ts-nocheck
import { Terminal, ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";

    const columns = props?.columns || [
        { title: "Explore", links: [{ label: "Home", href: "#home" }, { label: "About me", href: "#about" }, { label: "Portfolio", href: "#projects" }] },
        { title: "More", links: [{ label: "Experience", href: "#experience" }, { label: "Reviews", href: "#testimonials" }, { label: "Contact", href: "#contact" }] },
    ];
    const setLink = (c: number, l: number, v: string) =>
        onChange?.({
            columns: columns.map((col: any, i: number) =>
                i === c ? { ...col, links: col.links.map((x: any, j: number) => (j === l ? { ...x, label: v } : x)) } : col
            ),
        });

    return (
        <footer style={{ background: bg, borderTop: `1px solid ${surface}` }}>
            <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
                <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: surface }}>
                                <Terminal size={18} style={{ color: ink }} />
                            </span>
                            <span className="font-mono text-base md:text-lg italic font-semibold" style={{ color: ink }}>
                                <Editable as="span" value={props?.brand || "Alicia Smith"} onChange={(v) => onChange?.({ brand: v })} />
                            </span>
                        </div>
                        <p className="mt-4 max-w-sm font-mono text-sm md:text-base leading-relaxed" style={{ color: inkSecond }}>
                            <Editable as="span" value={props?.summary || "Full-stack engineer crafting fast, clean and scalable web products."} onChange={(v) => onChange?.({ summary: v })} />
                        </p>
                        <div className="mt-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs" style={{ background: surface, color: inkSecond }}>
                            <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: accent }} />
                            <Editable as="span" value={props?.status || "Available for new projects"} onChange={(v) => onChange?.({ status: v })} />
                        </div>
                    </div>
                    {columns.map((col: any, c: number) => (
                        <div key={c}>
                            <h4 className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: ink }}>
                                <Editable as="span" value={col.title} onChange={(v) => onChange?.({ columns: columns.map((x: any, i: number) => (i === c ? { ...x, title: v } : x)) })} />
                            </h4>
                            <ul className="mt-4 space-y-3.5">
                                {col.links.map((l: any, i: number) => (
                                    <li key={i}>
                                        <a href={l.href} className="font-mono text-sm md:text-base transition-opacity hover:opacity-70" style={{ color: inkSecond }}>
                                            <Editable as="span" value={l.label} onChange={(v) => setLink(c, i, v)} />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-12 flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center" style={{ borderTop: `1px solid ${surface}` }}>
                    <p className="font-mono text-xs md:text-sm" style={{ color: inkSecond }}>
                        <Editable as="span" value={props?.copyright || "© 2026 Alicia Smith. All rights reserved."} onChange={(v) => onChange?.({ copyright: v })} />
                    </p>
                    <a
                        href="#home"
                        className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-mono text-xs md:text-sm transition-transform hover:scale-[1.02] active:scale-95"
                        style={{ background: surface, color: ink }}
                    >
                        <Editable as="span" value={props?.topLabel || "Back to top"} onChange={(v) => onChange?.({ topLabel: v })} />
                        <ArrowUp size={15} />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export const DeveloperPortfolio6Footer = Footer;
export default Footer;