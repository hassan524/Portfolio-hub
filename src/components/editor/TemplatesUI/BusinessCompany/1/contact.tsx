// @ts-nocheck
import { Phone, Mail, MapPin, Clock, MessageSquare, BadgeCheck } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";

    const info = props?.info || [
        { icon: "Phone", label: "Call us", value: "+1 (415) 555-0142", detail: "Mon–Fri, 9am–6pm PT" },
        { icon: "Mail", label: "Email us", value: "hello@nexora.studio", detail: "We reply within 4 hours" },
        { icon: "MapPin", label: "Visit us", value: "548 Market St, San Francisco", detail: "Floor 12, SoMa district" },
        { icon: "Clock", label: "Hours", value: "9:00 AM – 6:00 PM PT", detail: "Weekends by appointment" },
    ];

    const iconMap: any = { Phone, Mail, MapPin, Clock };

    return (
        <section id="contact" className="py-24 px-6 lg:px-8" style={{ background: bg }}>
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <Editable
                            as="span"
                            value={props?.eyebrow || "Get in touch"}
                            className="text-sm font-semibold uppercase tracking-wider mb-3 block"
                            style={{ color: accent }}
                        />
                        <Editable
                            as="h2"
                            value={props?.title || "Let's talk about your project."}
                            onChange={(v) => onChange?.({ title: v })}
                            className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
                            style={{ color: ink }}
                        />
                        <Editable
                            as="p"
                            value={props?.subtitle || "Book a free 30-minute discovery call. We'll discuss your goals, timeline, and whether we're the right fit — no pressure, no sales pitch."}
                            onChange={(v) => onChange?.({ subtitle: v })}
                            className="text-lg leading-relaxed mb-8"
                            style={{ color: inkSecond }}
                        />
                        <div className="flex flex-wrap gap-3 mb-8">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm" style={{ background: surface, color: ink }}>
                                <BadgeCheck className="w-4 h-4" style={{ color: accent }} />
                                <Editable value={props?.badge1 || "SOC 2 Type II"} />
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm" style={{ background: surface, color: ink }}>
                                <BadgeCheck className="w-4 h-4" style={{ color: accent }} />
                                <Editable value={props?.badge2 || "NDA on request"} />
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm" style={{ background: surface, color: ink }}>
                                <BadgeCheck className="w-4 h-4" style={{ color: accent }} />
                                <Editable value={props?.badge3 || "Fixed-price options"} />
                            </div>
                        </div>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95"
                            style={{ background: accent, color: bg }}
                        >
                            <MessageSquare className="w-4 h-4" />
                            <Editable value={props?.cta || "Book a discovery call"} />
                        </a>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {info.map((item: any, i: number) => {
                            const Icon = iconMap[item.icon] || Phone;
                            return (
                                <div
                                    key={i}
                                    className="p-6 rounded-2xl transition-all hover:scale-[1.02]"
                                    style={{ background: surface, border: `1px solid ${surface}` }}
                                >
                                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: accent }}>
                                        <Icon className="w-5 h-5" style={{ color: bg }} />
                                    </div>
                                    <Editable
                                        as="div"
                                        value={item.label}
                                        onChange={(v) => {
                                            const next = [...info];
                                            next[i] = { ...next[i], label: v };
                                            onChange?.({ info: next });
                                        }}
                                        className="text-xs font-semibold uppercase tracking-wider mb-2"
                                        style={{ color: inkSecond }}
                                    />
                                    <Editable
                                        as="div"
                                        value={item.value}
                                        onChange={(v) => {
                                            const next = [...info];
                                            next[i] = { ...next[i], value: v };
                                            onChange?.({ info: next });
                                        }}
                                        className="text-base font-semibold mb-1"
                                        style={{ color: ink }}
                                    />
                                    <Editable
                                        as="div"
                                        value={item.detail}
                                        onChange={(v) => {
                                            const next = [...info];
                                            next[i] = { ...next[i], detail: v };
                                            onChange?.({ info: next });
                                        }}
                                        className="text-sm"
                                        style={{ color: inkSecond }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
