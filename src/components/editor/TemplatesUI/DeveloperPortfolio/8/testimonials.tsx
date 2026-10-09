// @ts-nocheck
import { ArrowDownRight, Quote } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const notes = props?.testimonials || [
        { quote: "Alex has a rare ability to make the difficult feel manageable. We shipped more confidently because the foundations were thoughtful and the trade-offs were always clear.", name: "Priya Shah", role: "VP of Product · Northstar Studio", detail: "Partnered for three years", notation: "A note on judgment" },
        { quote: "He brought equal care to the architecture and the people using it. The new workflow made a real difference to our clinicians, and the migration never put care at risk.", name: "Marcus Lee", role: "Director of Engineering · Goodkind Health", detail: "Platform rebuild, 2020", notation: "A note on care" },
        { quote: "A generous collaborator and a remarkably steady engineer. Alex made room for the team to learn while keeping the work moving in the right direction.", name: "Elena Brooks", role: "Design Lead · Paperplane", detail: "Product team, 2017", notation: "A note on partnership" },
    ];
    const updateNote = (index: number, key: string, value: string) =>
        onChange?.({ testimonials: notes.map((item: any, i: number) => i === index ? { ...item, [key]: value } : item) });
    return (
        <section id="testimonials" className="scroll-mt-20 py-20 md:py-28" style={{ backgroundColor: bg, color: ink }}>
            <div className="mx-auto max-w-[1440px] px-5 md:px-12">
                <div className="grid gap-8 border-b pb-10 md:grid-cols-[0.38fr_1fr] md:gap-16 md:pb-14" style={{ borderColor: surface }}>
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: accent }}><Editable value={props?.eyebrow || "Margin notes"} onChange={(v) => onChange?.({ eyebrow: v })} /></p>
                        <p className="mt-4 font-mono text-xs" style={{ color: inkSecond }}><Editable value={props?.sideNote || "In other people's words"} onChange={(v) => onChange?.({ sideNote: v })} /></p>
                    </div>
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <h2 className="max-w-3xl font-['DM_Serif_Display'] text-4xl leading-[1.02] md:text-6xl"><Editable value={props?.headline || "The best work has more than one author."} onChange={(v) => onChange?.({ headline: v })} /></h2>
                        <p className="max-w-xs text-sm leading-6" style={{ color: inkSecond }}><Editable value={props?.intro || "A few observations from people who shared the board."} onChange={(v) => onChange?.({ intro: v })} /></p>
                    </div>
                </div>
                <div className="mt-2 divide-y" style={{ borderColor: surface }}>
                    {notes.map((item: any, index: number) => (
                        <article key={`note-${index}`} className="grid gap-5 py-8 md:grid-cols-[80px_0.8fr_1.2fr] md:gap-8 md:py-10">
                            <span className="font-mono text-xs" style={{ color: accent }}>0{index + 1}</span>
                            <div className="flex items-start gap-3">
                                <Quote size={17} strokeWidth={1.4} className="mt-1 shrink-0" style={{ color: accent }} />
                                <p className="font-mono text-[9px] uppercase leading-5 tracking-[0.13em]" style={{ color: inkSecond }}><Editable value={item.notation} onChange={(v) => updateNote(index, "notation", v)} /></p>
                            </div>
                            <div>
                                <blockquote className="max-w-4xl font-['DM_Serif_Display'] text-2xl leading-snug md:text-3xl">“<Editable value={item.quote} onChange={(v) => updateNote(index, "quote", v)} />”</blockquote>
                                <div className="mt-6 flex flex-col justify-between gap-2 border-t pt-4 sm:flex-row sm:items-end" style={{ borderColor: surface }}>
                                    <div>
                                        <p className="text-sm font-medium"><Editable value={item.name} onChange={(v) => updateNote(index, "name", v)} /></p>
                                        <p className="mt-1 text-xs leading-5" style={{ color: inkSecond }}><Editable value={item.role} onChange={(v) => updateNote(index, "role", v)} /></p>
                                    </div>
                                    <p className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: accent }}><Editable value={item.detail} onChange={(v) => updateNote(index, "detail", v)} /></p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="mt-8 flex flex-col justify-between gap-5 border-t pt-6 sm:flex-row sm:items-center" style={{ borderColor: surface }}>
                    <p className="max-w-xl text-sm leading-6" style={{ color: inkSecond }}><Editable value={props?.closingCopy || "Trust is built in the small decisions: what we simplify, what we protect, and how we work through the hard parts."} onChange={(v) => onChange?.({ closingCopy: v })} /></p>
                    <a href="#contact" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: accent }}><Editable value={props?.ctaLabel || "Continue the conversation"} onChange={(v) => onChange?.({ ctaLabel: v })} /><ArrowDownRight size={14} /></a>
                </div>
            </div>
        </section>
    );
}
