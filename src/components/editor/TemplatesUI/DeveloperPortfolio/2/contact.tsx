// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowDownRight, AtSign, Clock3, MapPin, Orbit, Phone, RadioTower } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const details = props?.contactDetails || [
        { label: "Email", value: "hello@mirachen.dev", icon: "email" },
        { label: "Phone", value: "+1 (212) 555-0147 · weekdays", icon: "phone" },
        { label: "Based in", value: "Brooklyn, NY 11222 · United States", icon: "place" },
        { label: "Studio hours", value: "Monday–Thursday · 10 a.m.–5 p.m. ET", icon: "hours" },
        { label: "Good fit for", value: "Product engineering · Design systems · Creative tech", icon: "orbit" },
    ];
    const iconFor = (icon) => icon === "email" ? <AtSign size={18} /> : icon === "place" ? <MapPin size={18} /> : icon === "phone" ? <Phone size={18} /> : icon === "hours" ? <Clock3 size={18} /> : <Orbit size={18} />;
    return (
        <section id="contact" className="relative isolate overflow-hidden px-5 py-24 sm:px-8 sm:py-32" style={{ backgroundColor: bg, color: ink }}>
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -bottom-56 left-[30%] h-[36rem] w-[36rem] rounded-full opacity-20 blur-3xl" style={{ backgroundColor: accent }} />
                <div className="absolute right-10 top-12 text-current/10"><Orbit size={260} strokeWidth={0.7} /></div>
            </div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
                <div>
                    <div className="inline-flex rotate-2 items-center gap-2 rounded-md border-2 border-current px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.17em] shadow-[4px_4px_0_currentColor]"><RadioTower size={14} /><Editable value="Final scene / your cue" /></div>
                    <h2 className="mt-8 max-w-4xl text-[clamp(3.3rem,8vw,7.4rem)] font-black leading-[0.83] tracking-[-0.09em]">
                        <Editable value={props?.heading || "Have a good problem? Let’s get into it."} onChange={(v) => onChange?.({ heading: v })} />
                    </h2>
                    <p className="mt-8 max-w-xl text-base leading-7 opacity-70"><Editable value={props?.intro || "I’m open to thoughtful collaborations, staff-level product roles, and the occasional wonderfully specific side quest. Bring the messy version of the idea."} onChange={(v) => onChange?.({ intro: v })} /></p>
                    <a href="#home" className="mt-9 inline-flex items-center gap-3 rounded-full px-6 py-4 text-sm font-extrabold transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}>
                        <Editable value="Back to the opening scene" /><ArrowDownRight size={18} className="rotate-[-90deg]" />
                    </a>
                </div>
                <div className="relative rounded-[2rem] border border-white/15 p-6 sm:p-8" style={{ backgroundColor: surface }}>
                    <div className="absolute -right-3 -top-4 rotate-6 rounded-lg border-2 border-current px-3 py-2 font-mono text-[9px] font-black uppercase tracking-[0.14em] shadow-[4px_4px_0_currentColor]" style={{ backgroundColor: bgSecond }}>
                        <Editable value="Signal is open" />
                    </div>
                    <div className="mb-7 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50"><Editable value="Coordinates & contact" /></div>
                    <div className="space-y-2">
                        {details.map((detail, index) => (
                            <div key={`${index}-${detail.label}`} className="flex items-start gap-4 rounded-2xl border border-current/10 px-4 py-4 transition-colors hover:bg-white/5">
                                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: accent, color: bg }}>{iconFor(detail.icon)}</div>
                                <div className="min-w-0">
                                    <div className="font-mono text-[9px] uppercase tracking-[0.17em] opacity-50"><Editable value={detail.label} onChange={(v) => onChange?.({ contactDetails: details.map((item, i) => i === index ? { ...item, label: v } : item) })} /></div>
                                    <div className="mt-1 break-words text-sm font-semibold leading-6"><Editable value={detail.value} onChange={(v) => onChange?.({ contactDetails: details.map((item, i) => i === index ? { ...item, value: v } : item) })} /></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex items-center gap-2 border-t border-current/15 pt-5 text-xs opacity-55"><span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: accent }} /><Editable value={props?.availability || "Currently open to the right kind of next chapter"} onChange={(v) => onChange?.({ availability: v })} /></div>
                </div>
            </motion.div>
        </section>
    );
}
