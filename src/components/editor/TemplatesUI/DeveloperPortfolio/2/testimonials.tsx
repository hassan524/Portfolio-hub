// @ts-nocheck
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const voices = props?.testimonials || [
        { quote: "Mira has a rare ability to find the simple shape inside a complicated problem. She made our product feel coherent without sanding off what made it special.", name: "Priya Nair", title: "VP of Product, Northstar Health", initials: "PN" },
        { quote: "She doesn’t just make the design work in code; she makes the whole team better at thinking through the experience. I’d happily build another ambitious thing with her.", name: "Jonah Feld", title: "Design Director, Orbit Learning", initials: "JF" },
        { quote: "Mira notices the seam everyone else has walked past. Then she quietly fixes it, explains why it matters, and leaves the system better than she found it.", name: "Emilia Torres", title: "Creative Director, Fieldnote Studio", initials: "ET" },
    ];
    const stats = props?.stats || [
        { value: "12+", label: "years making software" },
        { value: "38", label: "care teams supported" },
        { value: "120k", label: "learners reached" },
    ];
    return (
        <section id="testimonials" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32" style={{ backgroundColor: bgSecond, color: inkSecond }}>
            <div className="pointer-events-none absolute -left-16 top-24 rotate-12 text-current/5"><Quote size={230} strokeWidth={1} /></div>
            <div className="mx-auto max-w-7xl">
                <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <div className="inline-flex -rotate-1 items-center gap-2 rounded-md border-2 border-current px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.17em] shadow-[4px_4px_0_currentColor]"><Star size={13} /><Editable value="Signals from the party" /></div>
                        <h2 className="mt-7 max-w-2xl text-5xl font-black leading-[0.9] tracking-[-0.08em] sm:text-7xl"><Editable value={props?.heading || "Good work travels by word of mouth."} onChange={(v) => onChange?.({ heading: v })} /></h2>
                    </div>
                    <p className="max-w-sm text-sm leading-6 opacity-65"><Editable value={props?.intro || "The best part of shipping is seeing a team get its time, confidence, or creative energy back."} onChange={(v) => onChange?.({ intro: v })} /></p>
                </motion.div>
                <div className="grid gap-4 md:grid-cols-3">
                    {voices.map((voice, index) => (
                        <motion.article key={`${index}-${voice.name}`} initial={{ opacity: 0, y: 20, rotate: index % 2 ? 1 : -1 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="flex min-h-[310px] flex-col rounded-[1.7rem] border border-current/15 p-6 transition-transform hover:scale-[1.02] sm:p-7" style={{ backgroundColor: surface }}>
                            <div className="flex items-center justify-between">
                                <Quote size={23} style={{ color: accent }} />
                                <div className="flex gap-1 opacity-70">{[0, 1, 2, 3, 4].map((star) => <Star key={star} size={12} fill="currentColor" />)}</div>
                            </div>
                            <blockquote className="mt-7 flex-1 text-lg font-medium leading-7 tracking-[-0.025em]">
                                “<Editable value={voice.quote} onChange={(v) => onChange?.({ testimonials: voices.map((item, i) => i === index ? { ...item, quote: v } : item) })} />”
                            </blockquote>
                            <div className="mt-8 flex items-center gap-3 border-t border-current/15 pt-5">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-current/25 font-mono text-xs font-bold" style={{ backgroundColor: accent, color: bg }}>
                                    <Editable value={voice.initials} onChange={(v) => onChange?.({ testimonials: voices.map((item, i) => i === index ? { ...item, initials: v } : item) })} />
                                </div>
                                <div className="min-w-0">
                                    <div className="font-bold"><Editable value={voice.name} onChange={(v) => onChange?.({ testimonials: voices.map((item, i) => i === index ? { ...item, name: v } : item) })} /></div>
                                    <div className="mt-1 text-xs leading-5 opacity-60"><Editable value={voice.title} onChange={(v) => onChange?.({ testimonials: voices.map((item, i) => i === index ? { ...item, title: v } : item) })} /></div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
                <div className="mt-6 grid grid-cols-1 gap-3 rounded-[1.7rem] border border-current/15 p-4 sm:grid-cols-3 sm:p-5" style={{ backgroundColor: surface }}>
                    {stats.map((stat, index) => (
                        <div key={`${index}-${stat.label}`} className={`px-4 py-3 ${index ? "sm:border-l sm:border-current/15" : ""}`}>
                            <div className="text-3xl font-black tracking-[-0.07em]" style={{ color: accent }}><Editable value={stat.value} onChange={(v) => onChange?.({ stats: stats.map((item, i) => i === index ? { ...item, value: v } : item) })} /></div>
                            <div className="mt-1 text-xs font-medium opacity-65"><Editable value={stat.label} onChange={(v) => onChange?.({ stats: stats.map((item, i) => i === index ? { ...item, label: v } : item) })} /></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
