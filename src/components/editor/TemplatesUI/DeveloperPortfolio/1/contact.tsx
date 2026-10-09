// @ts-nocheck
import { ArrowDown, ArrowUpRight, CalendarDays, Check, Clock3, Compass, Mail, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const details = props?.details || [
        { label: "Email", value: "hello@mirachen.dev", note: "Best for a thoughtful introduction", icon: "email" },
        { label: "Phone", value: "+1 (212) 555-0147", note: "Weekdays, 10 a.m.–5 p.m. ET", icon: "phone" },
        { label: "Based in", value: "Brooklyn, NY 11222 · United States", note: "Remote-first; available for local meetings", icon: "location" },
        { label: "Office hours", value: "Monday–Thursday · 10 a.m.–5 p.m. ET", note: "Replies usually arrive within two business days", icon: "hours" },
        { label: "Availability", value: "A few focused collaborations", note: "Best fit: thoughtful product teams", icon: "availability" },
    ];
    const iconFor = (name) => name === "location" ? <Compass size={17} /> : name === "availability" ? <CalendarDays size={17} /> : name === "phone" ? <Phone size={17} /> : name === "hours" ? <Clock3 size={17} /> : <Mail size={17} />;
    const updateDetail = (index, field, value) => onChange?.({ details: details.map((detail, i) => i === index ? { ...detail, [field]: value } : detail) });

    return (
        <section id="contact" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32" style={{ backgroundColor: bgSecond, color: ink }}>
            <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full opacity-[0.08]" style={{ backgroundColor: accent }} />
            <div className="relative mx-auto max-w-7xl">
                <div className="grid gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
                    <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                        <div className="mb-6 flex items-center gap-2 text-[11px] uppercase tracking-[.18em]" style={{ color: accent }}><MessageCircle size={14} /><Editable value={props?.kicker || "Start a conversation"} onChange={(v) => onChange?.({ kicker: v })} /></div>
                        <h2 className="max-w-3xl text-[clamp(3rem,7vw,6.4rem)] font-medium leading-[.97] tracking-[-.07em]">
                            <Editable value={props?.headingOne || "Have a good"} onChange={(v) => onChange?.({ headingOne: v })} />
                            <br />
                            <span style={{ color: accent }}><Editable value={props?.headingTwo || "problem to solve?"} onChange={(v) => onChange?.({ headingTwo: v })} /></span>
                        </h2>
                        <p className="mt-7 max-w-xl text-base leading-7 opacity-60 sm:text-lg sm:leading-8">
                            <Editable value={props?.intro || "I’m always glad to compare notes with people building thoughtful products. Send a short description of what you’re working on and what feels difficult; I’ll get back to you with an honest sense of fit."} onChange={(v) => onChange?.({ intro: v })} />
                        </p>
                        <div className="mt-9 flex flex-wrap items-center gap-3">
                            <div className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium" style={{ backgroundColor: surface }}>
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                                <Editable value={props?.status || "Open to the right collaboration"} onChange={(v) => onChange?.({ status: v })} />
                            </div>
                            <a href="#home" className="group inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition-transform hover:scale-[1.02] active:scale-95" style={{ borderColor: surface, color: inkSecond }}>
                                <Editable value={props?.topLink || "Back to the top"} onChange={(v) => onChange?.({ topLink: v })} /><ArrowDown size={14} className="rotate-180 transition-transform group-hover:-translate-y-0.5" />
                            </a>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: 0.08 }} className="flex flex-col justify-center">
                        <div className="mb-4 text-[10px] uppercase tracking-[.17em] opacity-40"><Editable value={props?.detailsLabel || "A few useful details"} onChange={(v) => onChange?.({ detailsLabel: v })} /></div>
                        <div className="divide-y rounded-[1.35rem] border px-5 sm:px-7" style={{ backgroundColor: bg, borderColor: surface }}>
                            {details.map((detail, index) => (
                                <div key={index} className="grid min-w-0 grid-cols-[42px_1fr] gap-4 py-5 sm:py-6">
                                    <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ color: accent, backgroundColor: surface }}>{iconFor(detail.icon)}</span>
                                    <div className="min-w-0">
                                        <div className="text-[10px] uppercase tracking-[.15em] opacity-40"><Editable value={detail.label || "Email"} onChange={(v) => updateDetail(index, "label", v)} /></div>
                                        <div className="mt-1 break-words text-base font-medium sm:text-lg"><Editable value={detail.value || "hello@mirachen.dev"} onChange={(v) => updateDetail(index, "value", v)} /></div>
                                        <div className="mt-1 text-xs leading-5 opacity-50"><Editable value={detail.note || "Best for a thoughtful introduction"} onChange={(v) => updateDetail(index, "note", v)} /></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-5 flex items-center gap-2 px-1 text-xs opacity-45"><Check size={13} style={{ color: accent }} /><Editable value={props?.privacyNote || "No pitch deck required. A few real sentences are perfect."} onChange={(v) => onChange?.({ privacyNote: v })} /></div>
                        <a href="#projects" className="mt-7 inline-flex items-center gap-2 self-start text-xs uppercase tracking-[.14em] transition-opacity hover:opacity-60" style={{ color: inkSecond }}>
                            <Editable value={props?.workLink || "Revisit selected work"} onChange={(v) => onChange?.({ workLink: v })} /><ArrowUpRight size={14} />
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
