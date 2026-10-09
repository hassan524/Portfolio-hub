// @ts-nocheck
import { ArrowDownRight, ArrowUpRight, CornerDownRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const projects = props?.projects || [
        { title: "Fieldnotes", type: "Product engineering · 2024", description: "A research workspace that turns customer conversations into decisions product teams can act on. I shaped the architecture and built the search, synthesis, and shared review loop.", image: "https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg", alt: "A small product team sharing ideas around a table", result: "Research synthesis from days to minutes", stack: ["Next.js", "TypeScript", "Postgres", "Search"] },
        { title: "Relay Health", type: "Platform rebuild · 2022", description: "Replaced a fragmented care-coordination workflow with a fast, accessible platform—while clinicians kept using the service throughout the migration.", image: "https://images.pexels.com/photos/7578807/pexels-photo-7578807.jpeg", alt: "Healthcare professional reviewing a digital patient workflow", result: "One reliable workflow across 12 clinics", stack: ["React", "GraphQL", "Rails", "A11y"] },
        { title: "Common Thread", type: "Creative tooling · 2020", description: "A flexible asset library and review workflow gave a distributed creative team one calm place to find, discuss, and approve work.", image: "https://images.pexels.com/photos/6476254/pexels-photo-6476254.jpeg", alt: "Designer arranging printed work and notes on a studio desk", result: "Review cycles shortened by 38%", stack: ["Rails", "Stimulus", "S3", "Workflow"] },
    ];
    const updateProject = (index: number, key: string, value: any) =>
        onChange?.({ projects: projects.map((item: any, i: number) => i === index ? { ...item, [key]: value } : item) });
    const updateStack = (projectIndex: number, stackIndex: number, value: string) =>
        onChange?.({ projects: projects.map((item: any, i: number) => i === projectIndex ? { ...item, stack: item.stack.map((tag: string, j: number) => j === stackIndex ? value : tag) } : item) });
    return (
        <section id="projects" className="scroll-mt-20 py-20 md:py-28" style={{ backgroundColor: bg, color: ink }}>
            <div className="mx-auto max-w-[1440px] px-5 md:px-12">
                <div className="grid gap-8 border-b pb-10 md:grid-cols-[0.38fr_1fr] md:gap-16 md:pb-14" style={{ borderColor: surface }}>
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: accent }}><Editable value={props?.eyebrow || "Game record"} onChange={(v) => onChange?.({ eyebrow: v })} /></p>
                        <p className="mt-4 font-mono text-xs" style={{ color: inkSecond }}><Editable value={props?.notation || "Selected projects · 2019—24"} onChange={(v) => onChange?.({ notation: v })} /></p>
                    </div>
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <h2 className="max-w-3xl font-['DM_Serif_Display'] text-4xl leading-[1.02] md:text-6xl"><Editable value={props?.headline || "The work is in the decisions."} onChange={(v) => onChange?.({ headline: v })} /></h2>
                        <p className="max-w-xs text-sm leading-6" style={{ color: inkSecond }}><Editable value={props?.intro || "Three positions where careful engineering changed what a team could do next."} onChange={(v) => onChange?.({ intro: v })} /></p>
                    </div>
                </div>
                <div className="divide-y" style={{ borderColor: surface }}>
                    {projects.map((project: any, index: number) => (
                        <article key={`project-${index}`} className="grid gap-7 py-9 md:grid-cols-[70px_0.88fr_1.12fr] md:gap-9 md:py-12">
                            <div className="flex items-center gap-3 md:block">
                                <span className="font-mono text-xs" style={{ color: accent }}>0{index + 1}</span>
                                <span className="h-px w-10 md:mt-5 md:block" style={{ backgroundColor: surface }} />
                                <span className="hidden pt-3 font-mono text-[9px] uppercase tracking-[0.14em] md:block" style={{ color: inkSecond }}>Move</span>
                            </div>
                            <div className="min-w-0">
                                <p className="font-mono text-[9px] uppercase tracking-[0.15em]" style={{ color: accent }}><Editable value={project.type} onChange={(v) => updateProject(index, "type", v)} /></p>
                                <h3 className="mt-3 font-['DM_Serif_Display'] text-3xl md:text-4xl"><Editable value={project.title} onChange={(v) => updateProject(index, "title", v)} /></h3>
                                <p className="mt-4 max-w-xl text-sm leading-7" style={{ color: inkSecond }}><Editable value={project.description} onChange={(v) => updateProject(index, "description", v)} /></p>
                                <div className="mt-6 flex items-center gap-3 border-l pl-4" style={{ borderColor: accent }}>
                                    <CornerDownRight size={14} style={{ color: accent }} />
                                    <p className="text-xs leading-5" style={{ color: ink }}><Editable value={project.result} onChange={(v) => updateProject(index, "result", v)} /></p>
                                </div>
                                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                                    {project.stack.map((tag: string, tagIndex: number) => <span key={`stack-${index}-${tagIndex}`} className="font-mono text-[9px] uppercase tracking-[0.1em]" style={{ color: inkSecond }}><Editable value={tag} onChange={(v) => updateStack(index, tagIndex, v)} /></span>)}
                                </div>
                            </div>
                            <figure className="min-w-0">
                                <div className="relative aspect-[1.48/1] overflow-hidden border" style={{ borderColor: surface, backgroundColor: bgSecond }}>
                                    <img src={project.image} alt={project.alt || project.title} className="h-full w-full object-cover" />
                                </div>
                                <figcaption className="mt-3 grid gap-1 font-mono text-[9px] leading-4" style={{ color: inkSecond }}>
                                    <span className="flex gap-2"><span style={{ color: accent }}>SRC</span><Editable value={project.image} onChange={(v) => updateProject(index, "image", v)} /></span>
                                    <span className="flex gap-2"><span style={{ color: accent }}>ALT</span><Editable value={project.alt || project.title} onChange={(v) => updateProject(index, "alt", v)} /></span>
                                </figcaption>
                            </figure>
                        </article>
                    ))}
                </div>
                <div className="mt-8 flex flex-col gap-5 border-t pt-6 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: surface }}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: inkSecond }}><Editable value={props?.closingNote || "More positions are still being played."} onChange={(v) => onChange?.({ closingNote: v })} /></p>
                    <a href="#contact" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: accent }}><Editable value={props?.ctaLabel || "Discuss a position"} onChange={(v) => onChange?.({ ctaLabel: v })} /><ArrowUpRight size={14} /></a>
                </div>
            </div>
        </section>
    );
}
