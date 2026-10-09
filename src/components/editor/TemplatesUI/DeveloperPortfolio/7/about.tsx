// @ts-nocheck
import { ArrowUpRight, Braces, Compass, Layers3, ScanSearch } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const strengths = props?.strengths || [
        { title: "Product-minded engineering", text: "I look beyond the ticket to understand the person on the other side of the screen.", icon: "compass" },
        { title: "Systems that scale", text: "A clear architecture gives a small team room to move quickly without creating a mess.", icon: "layers" },
        { title: "Care in the details", text: "Accessible, legible, and resilient are not finishing touches. They are the work.", icon: "search" },
        { title: "Full-stack range", text: "I enjoy connecting a considered interface to the data and infrastructure beneath it.", icon: "braces" },
    ];
    const icons: any = { compass: Compass, layers: Layers3, search: ScanSearch, braces: Braces };
    const updateStrength = (index: number, key: string, value: string) => {
        onChange?.({ strengths: strengths.map((item: any, i: number) => i === index ? { ...item, [key]: value } : item) });
    };

    return (
        <section id="about" className="scroll-mt-24 py-24 md:py-32" style={{ backgroundColor: bgSecond }}>
            <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-[0.85fr_1.15fr] md:gap-24 md:px-10">
                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: accent }}>
                        <Editable value={props?.eyebrow || "A bit about me"} onChange={(v) => onChange?.({ eyebrow: v })} />
                    </p>
                    <h2 className="mt-5 max-w-lg font-mono text-4xl leading-tight tracking-[-0.06em] md:text-5xl" style={{ color: ink }}>
                        <Editable value={props?.headline || "Good software should feel clear."} onChange={(v) => onChange?.({ headline: v })} />
                    </h2>
                    <div className="mt-8 space-y-5 text-sm leading-7 md:text-base" style={{ color: inkSecond }}>
                        <p><Editable value={props?.story || "I’m Alex, a software engineer who likes untangling complicated problems and making the solution feel simple. Over the past eight years, I’ve partnered with early teams and established product groups to bring useful ideas into the world."} onChange={(v) => onChange?.({ story: v })} /></p>
                        <p><Editable value={props?.storySecond || "My best work happens close to the people using the product: listening carefully, shipping in small steps, and leaving the codebase easier to understand than I found it."} onChange={(v) => onChange?.({ storySecond: v })} /></p>
                    </div>
                    <a href="#experience" className="mt-8 inline-flex items-center gap-2 text-sm transition-all hover:gap-3" style={{ color: accent }}>
                        <Editable value={props?.linkLabel || "A look at my path"} onChange={(v) => onChange?.({ linkLabel: v })} />
                        <ArrowUpRight size={15} />
                    </a>
                </div>

                <div>
                    <div className="grid gap-x-8 sm:grid-cols-2">
                        {strengths.map((item: any, index: number) => {
                            const Icon = icons[item.icon] || Braces;
                            return (
                                <article key={`strength-${index}`} className="border-t py-6" style={{ borderColor: surface }}>
                                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border" style={{ borderColor: surface, color: accent }}>
                                        <Icon size={18} strokeWidth={1.6} />
                                    </div>
                                    <h3 className="text-base font-medium" style={{ color: ink }}>
                                        <Editable value={item.title} onChange={(v) => updateStrength(index, "title", v)} />
                                    </h3>
                                    <p className="mt-2 text-sm leading-6" style={{ color: inkSecond }}>
                                        <Editable value={item.text} onChange={(v) => updateStrength(index, "text", v)} />
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                    <div className="mt-7 rounded-2xl border p-6 md:p-8" style={{ borderColor: surface }}>
                        <p className="font-mono text-xs uppercase tracking-[0.16em]" style={{ color: accent }}>
                            <Editable value={props?.principleLabel || "How I like to work"} onChange={(v) => onChange?.({ principleLabel: v })} />
                        </p>
                        <p className="mt-4 max-w-xl font-mono text-xl leading-8 tracking-tight md:text-2xl" style={{ color: ink }}>
                            <Editable value={props?.principle || "Small, thoughtful iterations beat a big reveal. I bring curiosity, honest communication, and a bias toward shipping."} onChange={(v) => onChange?.({ principle: v })} />
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
