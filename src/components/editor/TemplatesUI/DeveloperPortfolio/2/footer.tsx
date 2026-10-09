// @ts-nocheck
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const links = [["Top", "#home"], ["About", "#about"], ["Experience", "#experience"], ["Episodes", "#projects"], ["Kind words", "#testimonials"], ["Contact", "#contact"]];
    return (
        <footer className="px-5 pb-6 pt-5 sm:px-8" style={{ backgroundColor: bgSecond, color: inkSecond }}>
            <div className="mx-auto max-w-7xl rounded-[2rem] border border-current/15 p-6 sm:p-8" style={{ backgroundColor: surface }}>
                <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
                    <a href="#home" className="group flex w-fit items-center gap-3">
                        <span className="flex h-11 w-11 -rotate-6 items-center justify-center rounded-full transition-transform group-hover:rotate-6" style={{ backgroundColor: accent, color: bg }}><Sparkles size={19} /></span>
                        <span>
                            <span className="block text-lg font-black tracking-[-0.06em]"><Editable value={props?.name || "Mira Chen"} onChange={(v) => onChange?.({ name: v })} /></span>
                            <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.18em] opacity-55"><Editable value="Software engineer · story builder" /></span>
                        </span>
                    </a>
                    <nav className="flex flex-wrap gap-x-5 gap-y-3" aria-label="Footer navigation">
                        {links.map(([label, href]) => <a key={href} href={href} className="group inline-flex items-center gap-1 text-xs font-semibold opacity-65 transition-opacity hover:opacity-100"><Editable value={label} /><ArrowUpRight size={11} className="opacity-0 transition-opacity group-hover:opacity-100" /></a>)}
                    </nav>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] opacity-45"><Editable value={props?.copyright || "© 2025 · Made with patience & good questions"} onChange={(v) => onChange?.({ copyright: v })} /></div>
                </div>
            </div>
        </footer>
    );
}
