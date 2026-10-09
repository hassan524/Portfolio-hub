// @ts-nocheck
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const projects = props?.projects || [
        {
            title: "Fieldnotes",
            type: "Product engineering · 2024",
            description: "A collaborative research workspace that helps distributed product teams turn customer conversations into decisions they can act on.",
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
            alt: "Bright collaborative studio workspace",
            tags: ["Next.js", "TypeScript", "Postgres", "Search"],
        },
        {
            title: "Relay Health",
            type: "Platform rebuild · 2023",
            description: "Reworked a fragmented care coordination platform into a fast, accessible experience used daily by clinicians and operations teams.",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85",
            alt: "Clinician working with a tablet",
            tags: ["React", "GraphQL", "Design systems", "A11y"],
        },
        {
            title: "Common Thread",
            type: "Creative tooling · 2022",
            description: "Built a flexible asset library and review workflow that gave a small creative team one calm place to find, discuss, and approve work.",
            image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85",
            alt: "Notebook and pencil on a work table",
            tags: ["Ruby on Rails", "Stimulus", "S3", "Workflow"],
        },
    ];
    const updateProject = (index: number, key: string, value: any) => {
        onChange?.({ projects: projects.map((item: any, i: number) => i === index ? { ...item, [key]: value } : item) });
    };
    const updateTag = (projectIndex: number, tagIndex: number, value: string) => {
        onChange?.({ projects: projects.map((item: any, i: number) => i === projectIndex ? { ...item, tags: item.tags.map((tag: string, j: number) => j === tagIndex ? value : tag) } : item) });
    };

    return (
        <section id="projects" className="scroll-mt-24 py-24 md:py-32" style={{ backgroundColor: bg }}>
            <div className="mx-auto max-w-7xl px-5 md:px-10">
                <div className="mb-12 flex flex-col justify-between gap-7 md:mb-16 md:flex-row md:items-end">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: accent }}>
                            <Editable value={props?.eyebrow || "Selected work"} onChange={(v) => onChange?.({ eyebrow: v })} />
                        </p>
                        <h2 className="mt-5 max-w-2xl font-mono text-4xl leading-tight tracking-[-0.06em] md:text-6xl" style={{ color: ink }}>
                            <Editable value={props?.headline || "A few things made with care."} onChange={(v) => onChange?.({ headline: v })} />
                        </h2>
                    </div>
                    <p className="max-w-sm text-sm leading-6" style={{ color: inkSecond }}>
                        <Editable value={props?.intro || "A selection of product work across collaboration, healthcare, and creative tools."} onChange={(v) => onChange?.({ intro: v })} />
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    {projects.map((project: any, index: number) => (
                        <article key={`project-${index}`} className={`group overflow-hidden rounded-2xl border ${index === 0 ? "md:col-span-2" : ""}`} style={{ backgroundColor: bgSecond, borderColor: surface }}>
                            <div className={`relative overflow-hidden ${index === 0 ? "aspect-[2.25/1]" : "aspect-[1.8/1]"}`}>
                                <img src={project.image} alt={project.alt || project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                                <div className="absolute inset-0 opacity-20" style={{ backgroundColor: bg }} aria-hidden="true" />
                                <a href="#contact" className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all hover:scale-[1.06] active:scale-95" style={{ backgroundColor: `${bg}B8`, borderColor: surface, color: ink }} aria-label="Discuss a similar project">
                                    <ArrowUpRight size={18} />
                                </a>
                            </div>
                            <div className="p-6 md:p-8">
                                <p className="font-mono text-[11px] uppercase tracking-[0.13em]" style={{ color: accent }}>
                                    <Editable value={project.type} onChange={(v) => updateProject(index, "type", v)} />
                                </p>
                                <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
                                    <h3 className="font-mono text-2xl tracking-tight md:text-3xl" style={{ color: ink }}>
                                        <Editable value={project.title} onChange={(v) => updateProject(index, "title", v)} />
                                    </h3>
                                    <a href="#contact" className="mt-1 inline-flex items-center gap-2 text-xs transition-all hover:gap-3" style={{ color: inkSecond }}>
                                        <Editable value={props?.projectLinkLabel || "Talk through a project"} onChange={(v) => onChange?.({ projectLinkLabel: v })} />
                                        <ArrowUpRight size={14} style={{ color: accent }} />
                                    </a>
                                </div>
                                <p className="mt-4 max-w-3xl text-sm leading-6 md:text-base md:leading-7" style={{ color: inkSecond }}>
                                    <Editable value={project.description} onChange={(v) => updateProject(index, "description", v)} />
                                </p>
                                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t pt-5" style={{ borderColor: surface }}>
                                    {project.tags.map((tag: string, tagIndex: number) => (
                                        <span key={`tag-${index}-${tagIndex}`} className="font-mono text-[11px]" style={{ color: inkSecond }}>
                                            <Editable value={tag} onChange={(v) => updateTag(index, tagIndex, v)} />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="mt-12 flex items-center gap-4">
                    <span className="h-px flex-1" style={{ backgroundColor: surface }} />
                    <p className="font-mono text-xs" style={{ color: inkSecond }}>
                        <Editable value={props?.closingNote || "More good work is always in progress."} onChange={(v) => onChange?.({ closingNote: v })} />
                    </p>
                    <span className="h-px flex-1" style={{ backgroundColor: surface }} />
                </div>
            </div>
        </section>
    );
}
