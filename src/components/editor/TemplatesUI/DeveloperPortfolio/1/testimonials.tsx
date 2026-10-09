// @ts-nocheck
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const testimonials = props?.testimonials || [
        { quote: "Mira has the rare ability to make a hard technical problem feel understandable without pretending it is simple. She brought product, clinical operations, and engineering into the same conversation, then turned that clarity into a system we could trust. Our team is still benefiting from the decisions she made long after the launch.", name: "Leah Morgan", title: "VP of Product", company: "Northstar Health", initials: "LM" },
        { quote: "She didn’t arrive with a prepackaged answer. She listened to the researchers, followed the edge cases all the way through, and gave us a technical plan that made room for the way people actually collaborate. That combination of rigor and generosity changed the pace of the whole team.", name: "Dev Patel", title: "Design Director", company: "Fieldnote", initials: "DP" },
    ];
    const stats = props?.stats || [
        { value: "11", label: "years shipping products" },
        { value: "3", label: "teams grown from zero" },
        { value: "1", label: "principle: make it useful" },
    ];

    return (
        <section id="testimonials" className="px-5 py-24 sm:px-8 sm:py-32" style={{ backgroundColor: bg, color: ink }}>
            <div className="mx-auto max-w-7xl">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }} className="mb-12 grid gap-8 md:grid-cols-[1fr_.75fr] md:items-end">
                    <div>
                        <div className="mb-5 flex items-center gap-2 text-[11px] uppercase tracking-[.18em]" style={{ color: accent }}><Quote size={14} /><Editable value={props?.kicker || "A few kind words"} onChange={(v) => onChange?.({ kicker: v })} /></div>
                        <h2 className="max-w-2xl text-4xl font-medium leading-[1.04] tracking-[-.06em] sm:text-6xl"><Editable value={props?.heading || "Good work is a team sport."} onChange={(v) => onChange?.({ heading: v })} /></h2>
                    </div>
                    <p className="max-w-md text-sm leading-6 opacity-55"><Editable value={props?.intro || "The best outcomes I’ve been part of were built in close partnership. Here’s how a couple of those collaborators remember it."} onChange={(v) => onChange?.({ intro: v })} /></p>
                </motion.div>

                <div className="grid gap-4 lg:grid-cols-2">
                    {testimonials.map((testimonial, index) => (
                        <motion.article key={index} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: index * 0.08 }} className="flex min-w-0 flex-col rounded-[1.5rem] border p-6 sm:p-8" style={{ backgroundColor: bgSecond, borderColor: surface }}>
                            <div className="mb-8 flex items-center justify-between">
                                <div className="flex gap-1" style={{ color: accent }}>
                                    {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={13} fill="currentColor" strokeWidth={1.4} />)}
                                </div>
                                <span className="text-[10px] uppercase tracking-[.15em] opacity-35"><Editable value={props?.quoteLabel || "Collaboration note"} onChange={(v) => onChange?.({ quoteLabel: v })} /></span>
                            </div>
                            <blockquote className="flex-1 text-lg leading-8 tracking-[-.02em] opacity-85 sm:text-xl sm:leading-9">
                                “<Editable value={testimonial.quote || "A thoughtful collaborator who turns complexity into clear, durable work."} onChange={(v) => onChange?.({ testimonials: testimonials.map((x, i) => i === index ? { ...x, quote: v } : x) })} />”
                            </blockquote>
                            <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t pt-5" style={{ borderColor: surface }}>
                                <div className="flex min-w-0 items-center gap-3">
                                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-xs font-medium" style={{ backgroundColor: surface, color: accent }}>
                                        <Editable value={testimonial.initials || "LM"} onChange={(v) => onChange?.({ testimonials: testimonials.map((x, i) => i === index ? { ...x, initials: v } : x) })} />
                                    </span>
                                    <div className="min-w-0">
                                        <div className="text-sm font-medium"><Editable value={testimonial.name || "Leah Morgan"} onChange={(v) => onChange?.({ testimonials: testimonials.map((x, i) => i === index ? { ...x, name: v } : x) })} /></div>
                                        <div className="mt-1 flex flex-wrap gap-x-1 text-xs opacity-50">
                                            <Editable value={testimonial.title || "VP of Product"} onChange={(v) => onChange?.({ testimonials: testimonials.map((x, i) => i === index ? { ...x, title: v } : x) })} />
                                            <Editable value="·" />
                                            <Editable value={testimonial.company || "Northstar Health"} onChange={(v) => onChange?.({ testimonials: testimonials.map((x, i) => i === index ? { ...x, company: v } : x) })} />
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[10px] uppercase tracking-[.14em] opacity-30"><Editable value={props?.quoteSource || "Project partner"} onChange={(v) => onChange?.({ quoteSource: v })} /></span>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="mt-7 grid gap-3 border-y py-6 sm:grid-cols-3" style={{ borderColor: surface }}>
                    {stats.map((stat, index) => (
                        <div key={index} className="flex min-w-0 items-baseline gap-3 px-2 py-2 sm:justify-center sm:border-r last:border-r-0" style={{ borderColor: surface }}>
                            <span className="text-2xl font-medium tracking-tight" style={{ color: accent }}><Editable value={stat.value || ["11", "3", "1"][index]} onChange={(v) => onChange?.({ stats: stats.map((x, i) => i === index ? { ...x, value: v } : x) })} /></span>
                            <span className="text-xs leading-5 opacity-55"><Editable value={stat.label || ["years shipping products", "teams grown from zero", "one useful principle"][index]} onChange={(v) => onChange?.({ stats: stats.map((x, i) => i === index ? { ...x, label: v } : x) })} /></span>
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex justify-end">
                    <a href="#contact" className="group inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-60" style={{ color: inkSecond }}>
                        <Editable value={props?.closingLink || "Let’s make something useful"} onChange={(v) => onChange?.({ closingLink: v })} /><ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
