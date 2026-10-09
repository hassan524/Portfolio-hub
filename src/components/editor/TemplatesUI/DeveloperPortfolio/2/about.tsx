// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUpRight, Braces, Layers3, ScanFace } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const capabilities = props?.capabilities || ["React & TypeScript", "Design systems", "Motion with purpose", "Accessibility", "Node.js APIs", "Product discovery", "Performance", "Creative coding"];
    const experience = props?.experience || [
        { role: "Staff Frontend Engineer", company: "Northstar Health", period: "2022 — now", detail: "Led a five-person product engineering pod rebuilding the clinician workspace used across 38 care teams. I set the frontend architecture, paired daily with research and design, and helped cut the time to complete a routine chart review by 31%. The work was less about shipping a shiny dashboard and more about giving people their attention back." },
        { role: "Senior Product Engineer", company: "Orbit Learning", period: "2019 — 2022", detail: "Joined as engineer number seven and helped take an early learning platform from a promising pilot to 120,000 active learners. Built the course authoring studio, introduced a shared component system, and worked with content designers to make complex lessons feel welcoming on a phone." },
        { role: "Frontend Engineer", company: "Fieldnote Studio", period: "2016 — 2019", detail: "Partnered with a compact digital studio on civic, cultural, and editorial products. I learned to prototype with the people who would use the thing, sweat the typography, and make robust interfaces out of ambitious art direction." },
    ];
    return (
        <section id="about" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32" style={{ backgroundColor: bgSecond, color: inkSecond }}>
            <div className="absolute right-[-4rem] top-10 h-64 w-64 rounded-full border border-current/10" />
            <div className="absolute right-8 top-32 h-40 w-40 rounded-full border border-current/10" />
            <div className="mx-auto max-w-7xl">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} className="grid gap-14 lg:grid-cols-[.76fr_1.24fr]">
                    <div className="relative">
                        <div className="inline-flex -rotate-2 items-center gap-2 rounded-md border-2 border-current px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] shadow-[4px_4px_0_currentColor]">
                            <ScanFace size={14} /><Editable value="Character sheet / 01" />
                        </div>
                        <h2 className="mt-7 max-w-lg text-5xl font-black leading-[0.9] tracking-[-0.075em] sm:text-7xl">
                            <Editable value={props?.title || "Engineer by trade. Curious by default."} onChange={(v) => onChange?.({ title: v })} />
                        </h2>
                        <p className="mt-7 max-w-lg text-base leading-7 opacity-75">
                            <Editable value={props?.bio || "My favorite work happens where a hard technical constraint meets a very human need. I bring product thinking, a systems lens, and a soft spot for tiny moments of delight to teams building things that matter."} onChange={(v) => onChange?.({ bio: v })} />
                        </p>
                        <div className="mt-9 flex items-start gap-4 rounded-3xl border border-current/15 p-5" style={{ backgroundColor: surface }}>
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: accent, color: bg }}><Braces size={19} /></div>
                            <div>
                                <div className="font-mono text-[10px] uppercase tracking-[0.16em] opacity-60"><Editable value="My operating principle" /></div>
                                <div className="mt-2 text-lg font-bold leading-snug"><Editable value={props?.principle || "Make the right thing obvious — and the hard thing possible."} onChange={(v) => onChange?.({ principle: v })} /></div>
                            </div>
                        </div>
                        <div className="mt-8 flex items-center gap-2 text-sm font-bold">
                            <Layers3 size={17} style={{ color: accent }} />
                            <Editable value="Abilities in my toolkit" />
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {capabilities.map((capability, index) => (
                                <span key={`${index}-${capability}`} className="min-w-0 rounded-full border border-current/20 px-3 py-2 text-xs font-medium">
                                    <Editable value={capability} onChange={(v) => onChange?.({ capabilities: capabilities.map((item, i) => i === index ? v : item) })} />
                                </span>
                            ))}
                        </div>
                    </div>
                    <div id="experience" className="scroll-mt-28">
                        <div className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-current/20 pb-4">
                            <div>
                                <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60"><Editable value="Previous chapters" /></div>
                                <h3 className="mt-2 text-3xl font-black tracking-[-0.06em] sm:text-4xl"><Editable value="The route so far" /></h3>
                            </div>
                            <span className="mb-1 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] opacity-60"><ArrowUpRight size={14} /><Editable value="2016 — present" /></span>
                        </div>
                        <div className="relative space-y-4 before:absolute before:bottom-7 before:left-[15px] before:top-7 before:w-px before:bg-current/20">
                            {experience.map((item, index) => (
                                <article key={`${index}-${item.company}`} className="group relative rounded-[1.7rem] border border-current/15 p-5 pl-12 transition-transform hover:scale-[1.02] sm:p-6 sm:pl-14" style={{ backgroundColor: surface }}>
                                    <span className="absolute left-[8px] top-7 z-10 h-4 w-4 rounded-full border-[3px]" style={{ borderColor: bgSecond, backgroundColor: accent }} />
                                    <div className="flex flex-wrap items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <h4 className="text-xl font-extrabold tracking-[-0.04em]"><Editable value={item.role} onChange={(v) => onChange?.({ experience: experience.map((entry, i) => i === index ? { ...entry, role: v } : entry) })} /></h4>
                                            <div className="mt-1 text-sm font-semibold opacity-70"><Editable value={item.company} onChange={(v) => onChange?.({ experience: experience.map((entry, i) => i === index ? { ...entry, company: v } : entry) })} /></div>
                                        </div>
                                        <span className="rounded-full border border-current/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider opacity-65"><Editable value={item.period} onChange={(v) => onChange?.({ experience: experience.map((entry, i) => i === index ? { ...entry, period: v } : entry) })} /></span>
                                    </div>
                                    <p className="mt-4 max-w-2xl text-sm leading-6 opacity-70"><Editable value={item.detail} onChange={(v) => onChange?.({ experience: experience.map((entry, i) => i === index ? { ...entry, detail: v } : entry) })} /></p>
                                </article>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
