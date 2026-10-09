// @ts-nocheck
import { ArrowDown, ArrowUpRight, Code2, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const stats = props?.stats || [
        { value: "12+", label: "years building" },
        { value: "04", label: "products shipped" },
        { value: "09", label: "teams partnered" },
    ];

    return (
        <section id="home" className="relative overflow-hidden px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-44" style={{ backgroundColor: bg, color: ink }}>
            <div className="pointer-events-none absolute -right-32 -top-24 h-[520px] w-[520px] rounded-full opacity-[0.06]" style={{ backgroundColor: accent }} />
            <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: "easeOut" }}>
                    <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                        <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] tracking-wide" style={{ borderColor: surface, color: inkSecond }}>
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
                            <Editable value={props?.eyebrow || "Software engineer · product-minded"} onChange={(v) => onChange?.({ eyebrow: v })} />
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs opacity-55">
                            <MapPin size={13} />
                            <Editable value={props?.location || "Brooklyn, NY · working worldwide"} onChange={(v) => onChange?.({ location: v })} />
                        </span>
                    </div>
                    <h1 className="max-w-4xl text-[clamp(3.2rem,8vw,7.1rem)] font-medium leading-[.96] tracking-[-.075em]">
                        <span className="block"><Editable value={props?.headlineOne || "I build software"} onChange={(v) => onChange?.({ headlineOne: v })} /></span>
                        <span className="block" style={{ color: accent }}><Editable value={props?.headlineTwo || "that moves work"} onChange={(v) => onChange?.({ headlineTwo: v })} /></span>
                        <span className="block"><Editable value={props?.headlineThree || "forward."} onChange={(v) => onChange?.({ headlineThree: v })} /></span>
                    </h1>
                    <p className="mt-8 max-w-xl text-base leading-7 opacity-65 sm:text-lg sm:leading-8">
                        <Editable value={props?.intro || "I’m Mira — a staff engineer who turns complicated systems into clear, dependable products. I work across the stack, from the first sketch to the last production edge case."} onChange={(v) => onChange?.({ intro: v })} />
                    </p>
                    <div className="mt-9 flex flex-wrap items-center gap-3">
                        <a href="#projects" className="group inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}>
                            <Editable value={props?.primaryCta || "Explore selected work"} onChange={(v) => onChange?.({ primaryCta: v })} />
                            <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
                        </a>
                        <a href="#about" className="inline-flex items-center gap-2 rounded-xl border px-5 py-3.5 text-sm transition-transform hover:scale-[1.02] active:scale-95" style={{ borderColor: surface, color: inkSecond }}>
                            <Editable value={props?.secondaryCta || "A little about me"} onChange={(v) => onChange?.({ secondaryCta: v })} />
                            <ArrowUpRight size={15} />
                        </a>
                    </div>
                    <div className="mt-14 grid max-w-lg grid-cols-3 gap-3 border-t pt-6" style={{ borderColor: surface }}>
                        {stats.map((stat, index) => (
                            <div key={index} className="min-w-0">
                                <div className="text-2xl font-medium tracking-tight sm:text-3xl"><Editable value={stat.value || ["12+", "04", "09"][index]} onChange={(v) => onChange?.({ stats: stats.map((x, i) => i === index ? { ...x, value: v } : x) })} /></div>
                                <div className="mt-1 text-[10px] uppercase leading-4 tracking-[.13em] opacity-50 sm:text-[11px]"><Editable value={stat.label || ["years building", "products shipped", "teams partnered"][index]} onChange={(v) => onChange?.({ stats: stats.map((x, i) => i === index ? { ...x, label: v } : x) })} /></div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }} className="relative mx-auto w-full max-w-xl">
                    <div className="absolute -right-4 -top-5 z-10 flex items-center gap-2 rounded-xl border px-3 py-2 text-[11px] backdrop-blur-xl sm:-right-6" style={{ backgroundColor: bgSecond, borderColor: surface }}>
                        <Sparkles size={13} style={{ color: accent }} />
                        <Editable value={props?.floatingNote || "Thoughtful by default"} onChange={(v) => onChange?.({ floatingNote: v })} />
                    </div>
                    <div className="overflow-hidden rounded-[1.6rem] border shadow-2xl" style={{ backgroundColor: bgSecond, borderColor: surface }}>
                        <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: surface }}>
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                                <span className="text-xs opacity-70"><Editable value={props?.codeLabel || "how-i-work.ts"} onChange={(v) => onChange?.({ codeLabel: v })} /></span>
                            </div>
                            <span className="text-[10px] uppercase tracking-[.16em] opacity-35"><Editable value={props?.codeBadge || "in practice"} onChange={(v) => onChange?.({ codeBadge: v })} /></span>
                        </div>
                        <div className="p-5 sm:p-7">
                            <div className="mb-7 flex items-center gap-3">
                                <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ backgroundColor: surface, color: accent }}><Code2 size={18} /></span>
                                <div>
                                    <div className="text-sm font-medium"><Editable value={props?.cardTitle || "A systems-minded builder"} onChange={(v) => onChange?.({ cardTitle: v })} /></div>
                                    <div className="mt-1 text-xs opacity-50"><Editable value={props?.cardSubtitle || "From ambiguity to shipped software"} onChange={(v) => onChange?.({ cardSubtitle: v })} /></div>
                                </div>
                            </div>
                            <div className="space-y-5">
                                {[
                                    ["01", props?.stepOne || "Find the real constraint", "stepOne"],
                                    ["02", props?.stepTwo || "Make the hard thing legible", "stepTwo"],
                                    ["03", props?.stepThree || "Ship, measure, refine", "stepThree"],
                                ].map(([number, label, field]) => (
                                    <div key={number} className="grid grid-cols-[38px_1fr] items-start gap-3">
                                        <span className="pt-0.5 font-mono text-[11px]" style={{ color: accent }}>/{number}</span>
                                        <div>
                                            <div className="text-sm"><Editable value={label} onChange={(v) => onChange?.({ [field]: v })} /></div>
                                            <div className="mt-3 h-px w-full" style={{ backgroundColor: surface }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-7 flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: surface }}>
                                <span className="text-xs opacity-70"><Editable value={props?.cardFootnote || "Small details. Strong foundations."} onChange={(v) => onChange?.({ cardFootnote: v })} /></span>
                                <span className="font-mono text-[10px] opacity-45"><Editable value={props?.version || "v.2025"} onChange={(v) => onChange?.({ version: v })} /></span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-7 -left-7 hidden h-20 w-20 rounded-full border sm:block" style={{ borderColor: surface }} />
                </motion.div>
            </div>
        </section>
    );
}
