// @ts-nocheck
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const stats = props?.stats || [
        { value: "8+", label: "years building" },
        { value: "24", label: "products shipped" },
        { value: "6", label: "teams partnered with" },
    ];
    const updateStat = (index: number, key: string, value: string) => {
        onChange?.({ stats: stats.map((item: any, i: number) => i === index ? { ...item, [key]: value } : item) });
    };

    return (
        <section id="top" className="relative isolate overflow-hidden" style={{ backgroundColor: bg }}>
            <div className="pointer-events-none absolute inset-0 -z-10 hidden grid-cols-8 opacity-50 md:grid" aria-hidden="true">
                {Array.from({ length: 56 }).map((_, i) => (
                    <div key={i} className="border-b border-r" style={{ borderColor: surface }} />
                ))}
            </div>
            <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-16 md:min-h-[680px] md:grid-cols-[1.1fr_0.9fr] md:px-10 md:pb-20 md:pt-20">
                <div className="relative z-10">
                    <div className="mb-8 flex items-center gap-3">
                        <span className="h-px w-9" style={{ backgroundColor: accent }} />
                        <p className="font-mono text-xs uppercase tracking-[0.22em]" style={{ color: accent }}>
                            <Editable value={props?.eyebrow || "Independent software engineer"} onChange={(v) => onChange?.({ eyebrow: v })} />
                        </p>
                    </div>
                    <h1 className="max-w-3xl font-mono text-[clamp(3rem,8vw,6.8rem)] font-medium leading-[0.95] tracking-[-0.09em]" style={{ color: ink }}>
                        <span className="block"><Editable value={props?.headline || "I build"} onChange={(v) => onChange?.({ headline: v })} /></span>
                        <span className="mt-2 inline-block px-3 pb-2" style={{ backgroundColor: accent, color: bg }}>
                            <Editable value={props?.headlineAccent || "useful things."} onChange={(v) => onChange?.({ headlineAccent: v })} />
                        </span>
                    </h1>
                    <p className="mt-8 max-w-xl text-base leading-7 md:text-lg md:leading-8" style={{ color: inkSecond }}>
                        <Editable value={props?.subtitle || "I turn complex ideas into thoughtful, dependable software — from the first sketch to the last edge case."} onChange={(v) => onChange?.({ subtitle: v })} />
                    </p>
                    <div className="mt-9 flex flex-wrap items-center gap-3">
                        <a href={props?.primaryHref || "#projects"} className="group inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}>
                            <Editable value={props?.primaryLabel || "Explore my work"} onChange={(v) => onChange?.({ primaryLabel: v })} />
                            <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
                        </a>
                        <a href={props?.secondaryHref || "#about"} className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm transition-all hover:scale-[1.02] active:scale-95" style={{ borderColor: surface, color: ink }}>
                            <Editable value={props?.secondaryLabel || "A little about me"} onChange={(v) => onChange?.({ secondaryLabel: v })} />
                            <ArrowUpRight size={15} style={{ color: accent }} />
                        </a>
                    </div>
                    <div className="mt-14 grid max-w-xl grid-cols-3 gap-4 border-t pt-6" style={{ borderColor: surface }}>
                        {stats.map((stat: any, index: number) => (
                            <div key={`stat-${index}`}>
                                <p className="font-mono text-2xl tracking-tight md:text-3xl" style={{ color: ink }}>
                                    <Editable value={stat.value} onChange={(v) => updateStat(index, "value", v)} />
                                </p>
                                <p className="mt-1 text-[11px] leading-4 md:text-xs" style={{ color: inkSecond }}>
                                    <Editable value={stat.label} onChange={(v) => updateStat(index, "label", v)} />
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative mx-auto w-full max-w-[460px]">
                    <div className="absolute -inset-4 rounded-full border border-dashed opacity-70 motion-safe:animate-[spin_50s_linear_infinite]" style={{ borderColor: accent }} aria-hidden="true" />
                    <div className="absolute -inset-9 rounded-full border opacity-30" style={{ borderColor: surface }} aria-hidden="true" />
                    <div className="relative aspect-square overflow-hidden rounded-full border-[6px]" style={{ borderColor: bgSecond }}>
                        <img
                            src={props?.heroImage || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85"}
                            alt={props?.heroImageAlt || "Portrait of Alex Morgan"}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 rounded-full border" style={{ borderColor: surface }} aria-hidden="true" />
                    </div>
                    <div className="absolute right-1 top-7 h-3 w-3 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
                </div>
            </div>
        </section>
    );
}
