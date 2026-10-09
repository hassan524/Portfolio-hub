// @ts-nocheck
import { ArrowDownRight, Compass, Layers3, ScanSearch, Workflow } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const principles = props?.principles || [
        { title: "Read the whole board", text: "Start with people, constraints, and context—not the nearest ticket.", icon: "compass" },
        { title: "Make the useful move", text: "Prefer the smallest clear decision that improves what comes next.", icon: "layers" },
        { title: "Leave room to play", text: "Build systems a team can understand, extend, and change without fear.", icon: "workflow" },
        { title: "Check every square", text: "Accessibility, edge cases, and performance belong in the first draft.", icon: "search" },
    ];
    const icons: any = { compass: Compass, layers: Layers3, workflow: Workflow, search: ScanSearch };
    const updatePrinciple = (index: number, key: string, value: string) =>
        onChange?.({ principles: principles.map((item: any, i: number) => i === index ? { ...item, [key]: value } : item) });
    return (
        <section id="about" className="scroll-mt-20 py-20 md:py-28" style={{ backgroundColor: bgSecond, color: ink }}>
            <div className="mx-auto max-w-[1440px] px-5 md:px-12">
                <div className="grid gap-12 border-b pb-14 md:grid-cols-[0.38fr_1fr] md:gap-16 md:pb-20" style={{ borderColor: surface }}>
                    <div className="flex flex-col justify-between">
                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: accent }}><Editable value={props?.eyebrow || "The position"} onChange={(v) => onChange?.({ eyebrow: v })} /></p>
                            <p className="mt-5 font-mono text-xs" style={{ color: inkSecond }}><Editable value={props?.annotation || "A working philosophy"} onChange={(v) => onChange?.({ annotation: v })} /></p>
                        </div>
                        <a href="#experience" className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: accent }}>
                            <Editable value={props?.linkLabel || "Trace the path"} onChange={(v) => onChange?.({ linkLabel: v })} /><ArrowDownRight size={14} />
                        </a>
                    </div>
                    <div>
                        <h2 className="max-w-4xl font-['DM_Serif_Display'] text-4xl leading-[1.02] tracking-[-0.035em] md:text-6xl">
                            <Editable value={props?.headline || "Good engineering is the art of seeing what matters next."} onChange={(v) => onChange?.({ headline: v })} />
                        </h2>
                        <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-10">
                            <p className="text-sm leading-7 md:text-base" style={{ color: inkSecond }}><Editable value={props?.story || "I’m Alex, a software engineer who enjoys the moment a messy problem begins to make sense. For eight years I’ve worked alongside product, design, and engineering teams to turn uncertain ideas into dependable tools."} onChange={(v) => onChange?.({ story: v })} /></p>
                            <p className="text-sm leading-7 md:text-base" style={{ color: inkSecond }}><Editable value={props?.storySecond || "I stay close to the people using what we build. I ask a lot of questions, make trade-offs visible, and try to leave each system—and each collaboration—clearer than I found it."} onChange={(v) => onChange?.({ storySecond: v })} /></p>
                        </div>
                    </div>
                </div>
                <div className="grid gap-12 pt-12 md:grid-cols-[0.38fr_1fr] md:gap-16 md:pt-16">
                    <div className="flex flex-col justify-between">
                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: inkSecond }}><Editable value={props?.principlesLabel || "Rules I return to"} onChange={(v) => onChange?.({ principlesLabel: v })} /></p>
                            <p className="mt-4 font-['DM_Serif_Display'] text-3xl leading-tight"><Editable value={props?.principlesHeading || "The long game."} onChange={(v) => onChange?.({ principlesHeading: v })} /></p>
                        </div>
                        <div className="mt-8 hidden border-l pl-4 md:block" style={{ borderColor: accent }}>
                            <p className="font-mono text-[9px] uppercase tracking-[0.14em]" style={{ color: accent }}><Editable value={props?.marginLabel || "Margin note"} onChange={(v) => onChange?.({ marginLabel: v })} /></p>
                            <p className="mt-2 max-w-[220px] text-xs leading-5" style={{ color: inkSecond }}><Editable value={props?.marginNote || "Small iterations make it easier to change your mind for the right reason."} onChange={(v) => onChange?.({ marginNote: v })} /></p>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2">
                        {principles.map((item: any, index: number) => {
                            const Icon = icons[item.icon] || Compass;
                            return (
                                <article key={`principle-${index}`} className="border-t py-5 pr-5 md:py-7 md:pr-8" style={{ borderColor: surface }}>
                                    <div className="flex items-start justify-between">
                                        <span className="font-mono text-[10px]" style={{ color: accent }}>0{index + 1}</span>
                                        <Icon size={17} strokeWidth={1.5} style={{ color: accent }} />
                                    </div>
                                    <h3 className="mt-5 font-['DM_Serif_Display'] text-2xl"><Editable value={item.title} onChange={(v) => updatePrinciple(index, "title", v)} /></h3>
                                    <p className="mt-2 max-w-sm text-xs leading-6 md:text-sm" style={{ color: inkSecond }}><Editable value={item.text} onChange={(v) => updatePrinciple(index, "text", v)} /></p>
                                </article>
                            );
                        })}
                    </div>
                </div>
                <div className="mt-14 grid gap-6 border-t pt-7 md:grid-cols-[0.38fr_1fr] md:gap-16" style={{ borderColor: surface }}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.17em]" style={{ color: accent }}><Editable value={props?.quoteLabel || "A useful theorem"} onChange={(v) => onChange?.({ quoteLabel: v })} /></p>
                    <p className="max-w-4xl font-['DM_Serif_Display'] text-2xl leading-snug md:text-3xl">“<Editable value={props?.principle || "Clarity is a technical decision. It gives a team the freedom to move with confidence."} onChange={(v) => onChange?.({ principle: v })} />”</p>
                </div>
            </div>
        </section>
    );
}
