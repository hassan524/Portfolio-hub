// @ts-nocheck
import { Phone, Mail, MapPin, Clock, Flame, ShieldCheck, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";

    const info = props?.info || [
        { label: "Management Phone", value: "+1 (415) 555-0142" },
        { label: "Booking Email", value: "booking@cinderhollow.band" },
        { label: "Studio Address", value: "88 Foundry Row, Austin, TX 78702" },
        { label: "Office Hours", value: "Mon–Fri, 10:00 AM – 6:00 PM CST" },
    ];
    const badges = props?.badges || ["Reply within 48 hours", "Full rider available", "Worldwide touring"];
    const icons = [Phone, Mail, MapPin, Clock];
    const upd = (i: number, k: string, v: string) => onChange?.({ info: info.map((x: any, j: number) => (j === i ? { ...x, [k]: v } : x)) });
    const updBadge = (i: number, v: string) => onChange?.({ badges: badges.map((b: string, j: number) => (j === i ? v : b)) });

    return (
        <section id="contact" className="relative overflow-hidden px-5 py-24 md:px-8" style={{ background: bg, color: ink }}>
            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 7, repeat: Infinity }} className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ background: `radial-gradient(circle, ${accent}33, transparent 70%)` }} />
            <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-5">
                <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-2">
                    <Editable as="span" className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: accent }} value={props?.eyebrow || "Get in Touch"} onChange={(v: string) => onChange?.({ eyebrow: v })} />
                    <Editable as="h2" className="mt-4 text-4xl font-black leading-tight sm:text-5xl" style={{ color: ink }} value={props?.title || "Let's light up your stage."} onChange={(v: string) => onChange?.({ title: v })} />
                    <Editable as="p" className="mt-5 text-base leading-relaxed" style={{ color: inkSecond }} value={props?.text || "Festivals, venues, labels and press: reach out through any channel and the team will get back to you quickly."} onChange={(v: string) => onChange?.({ text: v })} />
                    <div className="mt-8 flex flex-wrap gap-2">
                        {badges.map((b: string, i: number) => (
                            <span key={i} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold" style={{ background: surface, color: ink, border: `1px solid ${accent}44` }}>
                                {i % 2 === 0 ? <ShieldCheck size={14} style={{ color: accent }} /> : <Headphones size={14} style={{ color: accent }} />}
                                <Editable as="span" value={b} onChange={(v: string) => updBadge(i, v)} />
                            </span>
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-3">
                    <div className="rounded-[2rem] p-3" style={{ background: surface, border: `1px solid ${accent}33` }}>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {info.map((it: any, i: number) => {
                                const Icon = icons[i % icons.length];
                                return (
                                    <div key={i} className="rounded-3xl p-6 transition-all hover:scale-[1.02]" style={{ background: bgSecond }}>
                                        <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: accent, color: bg, boxShadow: `0 6px 20px ${accent}55` }}><Icon size={20} /></span>
                                        <Editable as="div" className="mt-4 text-xs font-semibold uppercase tracking-widest" style={{ color: inkSecond }} value={it.label} onChange={(v: string) => upd(i, "label", v)} />
                                        <Editable as="div" className="mt-1 break-words text-base font-bold" style={{ color: ink }} value={it.value} onChange={(v: string) => upd(i, "value", v)} />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-3 flex items-center gap-4 rounded-3xl p-6" style={{ background: bgSecond }}>
                            <Flame size={28} style={{ color: accent }} className="animate__animated animate__pulse animate__infinite shrink-0" />
                            <Editable as="p" className="text-sm leading-relaxed" style={{ color: inkSecond }} value={props?.note || "Now booking festival and club dates for the next season. Early inquiries get priority."} onChange={(v: string) => onChange?.({ note: v })} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}