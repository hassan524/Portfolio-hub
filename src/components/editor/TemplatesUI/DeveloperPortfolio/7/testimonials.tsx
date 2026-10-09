// @ts-nocheck
import { ArrowUpRight, Quote } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const notes = props?.testimonials || [
        { quote: "Alex has a rare ability to make the difficult feel manageable. Our team shipped more confidently because the foundations were thoughtful and the trade-offs were always clear.", name: "Priya Shah", role: "VP of Product · Northstar Studio", detail: "Worked together for 3 years" },
        { quote: "He brought equal care to the architecture and the people using it. The new workflow made a real difference to our clinicians, and the migration never put care at risk.", name: "Marcus Lee", role: "Director of Engineering · Goodkind Health", detail: "Platform rebuild, 2020" },
        { quote: "A generous collaborator and a remarkably steady engineer. Alex made room for the team to learn while keeping the work moving in the right direction.", name: "Elena Brooks", role: "Design Lead · Paperplane", detail: "Product team, 2017" },
    ];
    const updateTestimonial = (index: number, key: string, value: string) => {
        onChange?.({ testimonials: notes.map((item: any, i: number) => i === index ? { ...item, [key]: value } : item) });
    };

    return (
        <section id="testimonials" className="scroll-mt-24 py-24 md:py-32" style={{ backgroundColor: bg }}>
            <div className="mx-auto max-w-7xl px-5 md:px-10">
                <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: accent }}>
                            <Editable value={props?.eyebrow || "Kind words"} onChange={(v) => onChange?.({ eyebrow: v })} />
                        </p>
                        <h2 className="mt-5 max-w-2xl font-mono text-4xl leading-tight tracking-[-0.06em] md:text-5xl" style={{ color: ink }}>
                            <Editable value={props?.headline || "Better work happens together."} onChange={(v) => onChange?.({ headline: v })} />
                        </h2>
                    </div>
                    <p className="max-w-sm text-sm leading-6" style={{ color: inkSecond }}>
                        <Editable value={props?.intro || "A few notes from people I’ve had the pleasure of building alongside."} onChange={(v) => onChange?.({ intro: v })} />
                    </p>
                </div>
                <div className="grid gap-4 lg:grid-cols-3">
                    {notes.map((item: any, index: number) => (
                        <article key={`testimonial-${index}`} className={`flex flex-col rounded-2xl border p-6 md:p-8 ${index === 1 ? "lg:translate-y-8" : ""}`} style={{ backgroundColor: bgSecond, borderColor: surface }}>
                            <Quote size={21} strokeWidth={1.5} style={{ color: accent }} />
                            <blockquote className="mt-6 flex-1 text-base leading-7 md:text-lg md:leading-8" style={{ color: ink }}>
                                <Editable value={item.quote} onChange={(v) => updateTestimonial(index, "quote", v)} />
                            </blockquote>
                            <div className="mt-8 border-t pt-5" style={{ borderColor: surface }}>
                                <p className="text-sm font-medium" style={{ color: ink }}>
                                    <Editable value={item.name} onChange={(v) => updateTestimonial(index, "name", v)} />
                                </p>
                                <p className="mt-1 text-xs leading-5" style={{ color: inkSecond }}>
                                    <Editable value={item.role} onChange={(v) => updateTestimonial(index, "role", v)} />
                                </p>
                                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: accent }}>
                                    <Editable value={item.detail} onChange={(v) => updateTestimonial(index, "detail", v)} />
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="mt-20 flex flex-col items-start justify-between gap-7 border-t pt-8 sm:flex-row sm:items-center" style={{ borderColor: surface }}>
                    <p className="max-w-md text-sm leading-6" style={{ color: inkSecond }}>
                        <Editable value={props?.closingCopy || "The best measure of a project is what becomes easier for the people who use it."} onChange={(v) => onChange?.({ closingCopy: v })} />
                    </p>
                    <a href="#contact" className="inline-flex items-center gap-2 text-sm transition-all hover:gap-3" style={{ color: accent }}>
                        <Editable value={props?.ctaLabel || "Start a conversation"} onChange={(v) => onChange?.({ ctaLabel: v })} />
                        <ArrowUpRight size={15} />
                    </a>
                </div>
            </div>
        </section>
    );
}
