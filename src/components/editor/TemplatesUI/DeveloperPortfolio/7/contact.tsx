// @ts-nocheck
import { Mail, MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const details = props?.details || [
        { label: "Email", value: "hello@alexmorgan.dev", icon: "mail" },
        { label: "Phone", value: "+1 (917) 555-0148", icon: "phone" },
        { label: "Address", value: "28 Schermerhorn Street, Brooklyn, NY 11201", icon: "location" },
        { label: "Hours", value: "Monday–Friday · 9am–5pm ET", icon: "clock" },
    ];
    const iconMap: any = { mail: Mail, phone: Phone, location: MapPin, clock: Clock };
    const updateDetail = (index: number, key: string, value: string) => {
        onChange?.({ details: details.map((item: any, i: number) => i === index ? { ...item, [key]: value } : item) });
    };

    return (
        <section id="contact" className="scroll-mt-24 py-24 md:py-32" style={{ backgroundColor: bgSecond }}>
            <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-[1fr_0.95fr] md:gap-24 md:px-10">
                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: accent }}>
                        <Editable value={props?.eyebrow || "Contact"} onChange={(v) => onChange?.({ eyebrow: v })} />
                    </p>
                    <h2 className="mt-5 max-w-xl font-mono text-4xl leading-tight tracking-[-0.06em] md:text-6xl" style={{ color: ink }}>
                        <Editable value={props?.headline || "Have a good problem to solve?"} onChange={(v) => onChange?.({ headline: v })} />
                    </h2>
                    <p className="mt-6 max-w-lg text-sm leading-7 md:text-base" style={{ color: inkSecond }}>
                        <Editable value={props?.intro || "I’m always glad to hear about thoughtful teams, interesting products, and problems worth making simpler."} onChange={(v) => onChange?.({ intro: v })} />
                    </p>
                    <div className="mt-9 inline-flex items-center gap-3 border-b pb-3" style={{ borderColor: accent, color: ink }}>
                        <Editable value={props?.closingLine || "Tell me what you’re working on"} onChange={(v) => onChange?.({ closingLine: v })} />
                        <ArrowUpRight size={16} style={{ color: accent }} />
                    </div>
                </div>
                <div className="rounded-2xl border p-6 md:p-9" style={{ backgroundColor: bg, borderColor: surface }}>
                    <p className="font-mono text-xs uppercase tracking-[0.16em]" style={{ color: inkSecond }}>
                        <Editable value={props?.cardLabel || "Contact details"} onChange={(v) => onChange?.({ cardLabel: v })} />
                    </p>
                    <div className="mt-5 divide-y" style={{ borderColor: surface }}>
                        {details.map((item: any, index: number) => {
                            const Icon = iconMap[item.icon] || Mail;
                            return (
                                <div key={`contact-${index}`} className="flex gap-4 py-5 first:pt-2 last:pb-2">
                                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: surface, color: accent }}>
                                        <Icon size={16} strokeWidth={1.7} />
                                    </span>
                                    <div>
                                        <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: inkSecond }}>
                                            <Editable value={item.label} onChange={(v) => updateDetail(index, "label", v)} />
                                        </p>
                                        <p className="mt-1 text-sm leading-6 md:text-base" style={{ color: ink }}>
                                            <Editable value={item.value} onChange={(v) => updateDetail(index, "value", v)} />
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <p className="mt-6 border-t pt-5 text-xs leading-5" style={{ borderColor: surface, color: inkSecond }}>
                        <Editable value={props?.footnote || "If I’m away from my desk, I’ll get back to you within two working days."} onChange={(v) => onChange?.({ footnote: v })} />
                    </p>
                </div>
            </div>
        </section>
    );
}
