// @ts-nocheck
import { ArrowUpRight, Clock3, Mail, MapPin } from "lucide-react";
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
        { label: "Based in", value: "Brooklyn, New York · ET", icon: "location" },
        { label: "Availability", value: "Open to select collaborations", icon: "clock" },
    ];
    const icons: any = { mail: Mail, location: MapPin, clock: Clock3 };
    const updateDetail = (index: number, key: string, value: string) =>
        onChange?.({ details: details.map((item: any, i: number) => i === index ? { ...item, [key]: value } : item) });
    return (
        <section id="contact" className="scroll-mt-20 py-20 md:py-28" style={{ backgroundColor: bgSecond, color: ink }}>
            <div className="mx-auto max-w-[1440px] px-5 md:px-12">
                <div className="grid gap-12 md:grid-cols-[1fr_0.72fr] md:gap-20">
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: accent }}><Editable value={props?.eyebrow || "Your move"} onChange={(v) => onChange?.({ eyebrow: v })} /></p>
                        <h2 className="mt-6 max-w-3xl font-['DM_Serif_Display'] text-5xl leading-[0.97] tracking-[-0.04em] md:text-7xl"><Editable value={props?.headline || "Have a good problem to solve?"} onChange={(v) => onChange?.({ headline: v })} /></h2>
                        <p className="mt-7 max-w-xl text-sm leading-7 md:text-base" style={{ color: inkSecond }}><Editable value={props?.intro || "Tell me what your team is working through. I’m always glad to hear about thoughtful products, ambitious teams, and problems worth making simpler."} onChange={(v) => onChange?.({ intro: v })} /></p>
                        <a href="#top" className="group mt-9 inline-flex items-center gap-3 border-b pb-2 text-sm" style={{ borderColor: accent }}>
                            <span><Editable value={props?.closingLine || "Start at the opening position"} onChange={(v) => onChange?.({ closingLine: v })} /></span>
                            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: accent }} />
                        </a>
                    </div>
                    <div className="border-y py-2" style={{ borderColor: surface }}>
                        <p className="mb-2 py-4 font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: inkSecond }}><Editable value={props?.cardLabel || "Contact coordinates"} onChange={(v) => onChange?.({ cardLabel: v })} /></p>
                        {details.map((item: any, index: number) => {
                            const Icon = icons[item.icon] || Mail;
                            return (
                                <div key={`detail-${index}`} className="grid grid-cols-[32px_1fr] gap-4 border-t py-5" style={{ borderColor: surface }}>
                                    <Icon size={16} strokeWidth={1.5} className="mt-0.5" style={{ color: accent }} />
                                    <div>
                                        <p className="font-mono text-[9px] uppercase tracking-[0.13em]" style={{ color: inkSecond }}><Editable value={item.label} onChange={(v) => updateDetail(index, "label", v)} /></p>
                                        <p className="mt-2 text-sm leading-6 md:text-base"><Editable value={item.value} onChange={(v) => updateDetail(index, "value", v)} /></p>
                                    </div>
                                </div>
                            );
                        })}
                        <p className="border-t py-4 text-xs leading-5" style={{ borderColor: surface, color: inkSecond }}><Editable value={props?.footnote || "I usually reply within two working days. Good conversations are worth making time for."} onChange={(v) => onChange?.({ footnote: v })} /></p>
                    </div>
                </div>
                <div className="mt-16 grid grid-cols-8 border-l border-t" style={{ borderColor: surface }} aria-hidden="true">
                    {Array.from({ length: 16 }).map((_, index) => <div key={`tile-${index}`} className="aspect-square border-b border-r" style={{ borderColor: surface, backgroundColor: index % 3 === 0 ? `${accent}0D` : "transparent" }} />)}
                </div>
            </div>
        </section>
    );
}
