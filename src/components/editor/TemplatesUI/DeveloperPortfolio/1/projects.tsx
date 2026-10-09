// @ts-nocheck
import { ArrowDownRight, ArrowUpRight, GitBranch, Layers3, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
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
            year: "2024 — 2025",
            type: "PLATFORM · HEALTH TECHNOLOGY",
            title: "A clearer path through care",
            summary: "Rebuilt the intake and care-planning experience for a regional network of clinics, replacing disconnected forms and inbox triage with one coherent view of each patient’s next step.",
            description: "The original workflow had grown around the limitations of several vendor systems. I partnered with clinical operations, design, and data engineering to map where information was being re-entered and where patients lost momentum. We introduced an event-backed workflow service, a resilient integration layer, and a calmer staff interface that made incomplete information visible without making it a blocker. The new journey reduced intake from nine screens to four, gave care teams a shared source of truth, and created a foundation the organization could extend without another rewrite.",
            outcome: "9 → 4 steps",
            outcomeLabel: "patient intake journey",
            tags: ["React", "TypeScript", "GraphQL", "PostgreSQL"],
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1500&q=85",
            imageAlt: "Bright, modern clinical workspace with a desk and monitor",
        },
        {
            year: "2022 — 2023",
            type: "COLLABORATION · REAL-TIME SYSTEMS",
            title: "Research that stays in motion",
            summary: "Helped transform a collection of isolated research documents into a live workspace where distributed teams could gather evidence, make decisions, and keep the reasoning attached to the work.",
            description: "Fieldnote’s customers were doing careful, high-stakes research inside tools that treated every document as a destination. I led the technical design of a collaborative canvas supported by a real-time sync service, clear conflict behavior, and an audit trail that made changes easy to trust. We migrated teams in stages, instrumented the most fragile moments, and paired every new interaction with keyboard and screen-reader support. The result was less time spent reconciling versions and more of the team's thinking available to everyone involved.",
            outcome: "2.4× faster",
            outcomeLabel: "cross-team synthesis",
            tags: ["React", "WebSockets", "Node.js", "Accessibility"],
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1500&q=85",
            imageAlt: "Collaborative planning session with notes spread across a table",
        },
        {
            year: "2019 — 2021",
            type: "DEVELOPER EXPERIENCE · DESIGN SYSTEM",
            title: "A foundation teams could trust",
            summary: "Created a shared interface system for a growing product suite, balancing a familiar visual language with the flexibility needed by three independent product teams.",
            description: "The suite had expanded faster than its conventions. Similar controls behaved differently across products, accessibility fixes were repeated, and every redesign carried an integration tax. I worked with design and three engineering groups to define the primitives, document the exceptions, and build a versioned component library with visual and interaction tests. Rather than treating the system as a one-time handoff, we established a contribution process and usage telemetry. Adoption moved from a few pilot surfaces to the backbone of every new product feature.",
            outcome: "68%",
            outcomeLabel: "less duplicated UI code",
            tags: ["Design systems", "Storybook", "Testing", "TypeScript"],
            image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1500&q=85",
            imageAlt: "Printed interface studies and color swatches on a design desk",
        },
    ];

    const updateProject = (index, field, value) => {
        onChange?.({ projects: projects.map((project, i) => i === index ? { ...project, [field]: value } : project) });
    };

    return (
        <section id="projects" className="px-5 py-24 sm:px-8 sm:py-32" style={{ backgroundColor: bgSecond, color: ink }}>
            <div className="mx-auto max-w-7xl">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }} className="mb-16 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                    <div>
                        <div className="mb-5 flex items-center gap-2 text-[11px] uppercase tracking-[.18em]" style={{ color: accent }}><Sparkles size={14} /><Editable value={props?.kicker || "Selected work"} onChange={(v) => onChange?.({ kicker: v })} /></div>
                        <h2 className="max-w-2xl text-4xl font-medium leading-[1.04] tracking-[-.06em] sm:text-6xl"><Editable value={props?.heading || "The work is the story."} onChange={(v) => onChange?.({ heading: v })} /></h2>
                    </div>
                    <p className="max-w-sm text-sm leading-6 opacity-55 md:pb-1"><Editable value={props?.intro || "A few chapters where good engineering made the everyday feel a little easier. Each one began with listening."} onChange={(v) => onChange?.({ intro: v })} /></p>
                </motion.div>

                <div className="relative">
                    <div className="absolute bottom-12 left-[7px] top-5 hidden w-px md:block" style={{ backgroundColor: surface }} />
                    <div className="space-y-20 sm:space-y-28">
                        {projects.map((project, index) => (
                            <motion.article
                                key={index}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-70px" }}
                                transition={{ duration: 0.52, delay: index * 0.04 }}
                                className="relative grid gap-8 md:grid-cols-[minmax(0,.88fr)_minmax(0,1.12fr)] md:gap-12 md:pl-12"
                            >
                                <span className="absolute left-0 top-2 hidden h-[15px] w-[15px] rounded-full border-[4px] md:block" style={{ backgroundColor: bgSecond, borderColor: accent }} />
                                <div className="flex min-w-0 flex-col">
                                    <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[.16em] opacity-45">
                                        <Editable value={project.year || "2024 — 2025"} onChange={(v) => updateProject(index, "year", v)} />
                                        <span className="h-1 w-1 rounded-full" style={{ backgroundColor: accent }} />
                                        <Editable value={project.type || "Platform"} onChange={(v) => updateProject(index, "type", v)} />
                                    </div>
                                    <h3 className="max-w-xl text-3xl font-medium leading-[1.08] tracking-[-.05em] sm:text-4xl">
                                        <Editable value={project.title || "A clearer path through care"} onChange={(v) => updateProject(index, "title", v)} />
                                    </h3>
                                    <p className="mt-5 max-w-xl text-sm leading-7 opacity-65 sm:text-[15px]">
                                        <Editable value={project.summary || "A thoughtful product built around the people who rely on it."} onChange={(v) => updateProject(index, "summary", v)} />
                                    </p>
                                    <p className="mt-4 max-w-xl text-xs leading-6 opacity-45 sm:text-[13px]">
                                        <Editable value={project.description || "A detailed account of the product challenge, the technical decisions, collaboration, and what changed for the people using the result."} onChange={(v) => updateProject(index, "description", v)} />
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {(project.tags || []).map((tag, tagIndex) => (
                                            <span key={tagIndex} className="rounded-md border px-2.5 py-1.5 text-[10px] tracking-wide opacity-65" style={{ borderColor: surface }}>
                                                <Editable value={tag} onChange={(v) => onChange?.({ projects: projects.map((p, i) => i === index ? { ...p, tags: p.tags.map((t, ti) => ti === tagIndex ? v : t) } : p) })} />
                                            </span>
                                        ))}
                                        <button type="button" onClick={() => onChange?.({ projects: projects.map((p, i) => i === index ? { ...p, tags: [...(p.tags || []), "New skill"] } : p) })} className="rounded-md border px-2.5 py-1.5 text-[10px] opacity-35 hover:opacity-75" style={{ borderColor: surface }}><Editable value="+" /></button>
                                    </div>
                                    <div className="mt-auto flex flex-wrap items-center justify-between gap-5 border-t pt-6 sm:mt-9" style={{ borderColor: surface }}>
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-xl font-medium tracking-tight" style={{ color: accent }}><Editable value={project.outcome || "9 → 4 steps"} onChange={(v) => updateProject(index, "outcome", v)} /></span>
                                            <span className="max-w-[150px] text-[10px] leading-4 uppercase tracking-[.12em] opacity-45"><Editable value={project.outcomeLabel || "patient intake journey"} onChange={(v) => updateProject(index, "outcomeLabel", v)} /></span>
                                        </div>
                                        <a href="#contact" className="inline-flex items-center gap-2 text-xs transition-opacity hover:opacity-60" style={{ color: inkSecond }}>
                                            <Editable value={props?.projectLinkLabel || "Talk through the work"} onChange={(v) => onChange?.({ projectLinkLabel: v })} /><ArrowUpRight size={14} />
                                        </a>
                                    </div>
                                </div>
                                <div className="group relative min-w-0">
                                    <div className="absolute -inset-3 rounded-[1.6rem] opacity-50 transition-transform duration-500 group-hover:scale-[1.02]" style={{ backgroundColor: surface }} />
                                    <div className="relative overflow-hidden rounded-[1.3rem] border" style={{ borderColor: surface, backgroundColor: bg }}>
                                        <img
                                            src={project.image || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1500&q=85"}
                                            alt={project.imageAlt || project.title || "Project preview"}
                                            className="aspect-[1.35/1] w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.02]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5">
                                            <div className="rounded-lg border px-3 py-2 backdrop-blur-md" style={{ borderColor: surface, backgroundColor: bgSecond }}>
                                                <span className="block text-[9px] uppercase tracking-[.16em] opacity-45"><Editable value={props?.previewLabel || "Project preview"} onChange={(v) => onChange?.({ previewLabel: v })} /></span>
                                                <span className="mt-1 block max-w-[220px] text-xs font-medium"><Editable value={project.title || "Project preview"} onChange={(v) => updateProject(index, "title", v)} /></span>
                                            </div>
                                            <span className="grid h-10 w-10 place-items-center rounded-full" style={{ color: bg, backgroundColor: accent }}><ArrowDownRight size={17} /></span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between px-1 text-[10px] uppercase tracking-[.14em] opacity-35">
                                        <span className="flex items-center gap-2"><GitBranch size={12} /><Editable value={props?.caption || "Built with care"} onChange={(v) => onChange?.({ caption: v })} /></span>
                                        <span className="flex items-center gap-2"><Layers3 size={12} /><Editable value={props?.sequenceLabel || `0${index + 1} / 0${projects.length}`} onChange={(v) => onChange?.({ sequenceLabel: v })} /></span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
                <div className="mt-20 flex justify-center border-t pt-10" style={{ borderColor: surface }}>
                    <a href="#testimonials" className="group inline-flex items-center gap-3 rounded-xl px-5 py-3 text-sm transition-transform hover:scale-[1.02] active:scale-95" style={{ backgroundColor: surface }}>
                        <Editable value={props?.closingCta || "What it’s like to work together"} onChange={(v) => onChange?.({ closingCta: v })} />
                        <ArrowDownRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
