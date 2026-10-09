// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Layers, Radio, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const projects = props?.projects || [
        { chapter: "01", title: "A calmer kind of clinic", type: "Product platform · Northstar Health", year: "2024", summary: "A fragmented care workflow became one quiet, dependable workspace. I led the frontend rebuild from research prototype to multi-team rollout, aligning 14 chart surfaces around one predictable interaction language.", detail: "We began with observation sessions across three clinics, mapping how nurses and care coordinators moved between charts, inboxes, and disconnected forms. I designed the shared application shell, worked with backend partners on a stable patient-context API, and built a gradual migration path so each team could adopt the new workflow without interrupting active care. The result combined clearer next steps with a resilient design system that could absorb new specialties without multiplying one-off screens.", impact: "31% faster chart review", tools: "React · TypeScript · GraphQL · Storybook", tone: "coral" },
        { chapter: "02", title: "The lesson is the interface", type: "Learning tools · Orbit Learning", year: "2022", summary: "Created a visual course authoring studio that let subject experts build branching lessons without asking engineering for help. Drafts, previews, and publishing now feel like one continuous creative act.", detail: "Course authors were translating their ideas into tickets because the old workflow exposed database-shaped settings instead of the structure of a lesson. I paired with educators to model branching content in their language, then built a block editor with clear preview states, version recovery, keyboard support, and guardrails for incomplete work. We released it in small cohorts, listened to where confidence still broke down, and helped teams publish more often without making each course feel templated.", impact: "3.4× more lessons published", tools: "React · Slate · Node.js · Playwright", tone: "yellow" },
        { chapter: "03", title: "Small stories, long lives", type: "Editorial experience · Fieldnote Studio", year: "2018", summary: "Designed and built a flexible digital archive for a neighborhood oral-history project. The interface puts each voice first, stays light on slow connections, and gives a decade of community recordings room to breathe.", detail: "The archive brought together recorded interviews, family photographs, and handwritten notes contributed by residents over many years. I worked with the community editors to preserve their existing cataloguing practice while making the material easier to browse for younger visitors and researchers. A lightweight audio player, resilient image loading, transcript-first search, and a deliberately quiet visual system helped the collection stay accessible on older phones and slow connections.", impact: "8,600 stories preserved", tools: "Vue · Web Audio · CSS · Web Components", tone: "lilac" },
    ];
    const tones = {
        coral: "bg-[#F47768] text-[#242638]",
        yellow: "bg-[#F4C84A] text-[#242638]",
        lilac: "bg-[#C7B7F4] text-[#242638]",
        mint: "bg-[#96D8C2] text-[#242638]",
    };
    return (
        <section id="projects" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32" style={{ backgroundColor: bg, color: ink }}>
            <div className="mx-auto max-w-7xl">
                <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} className="mb-14 flex flex-col justify-between gap-8 border-b border-current/15 pb-9 md:flex-row md:items-end">
                    <div>
                        <div className="inline-flex rotate-1 items-center gap-2 rounded-md border-2 border-current px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.17em] shadow-[4px_4px_0_currentColor]">
                            <Radio size={13} /><Editable value="Selected work / transmissions received" />
                        </div>
                        <h2 className="mt-7 max-w-3xl text-5xl font-black leading-[0.88] tracking-[-0.08em] sm:text-7xl">
                            <Editable value={props?.heading || "A few worlds I’ve helped build."} onChange={(v) => onChange?.({ heading: v })} />
                        </h2>
                    </div>
                    <p className="max-w-xs text-sm leading-6 opacity-65"><Editable value={props?.intro || "Each project started with a messy question. These are the people, constraints, and useful things that came out the other side."} onChange={(v) => onChange?.({ intro: v })} /></p>
                </motion.div>
                <div className="space-y-7">
                    {projects.map((project, index) => (
                        <motion.article key={`${index}-${project.chapter}`} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.48, delay: index * 0.06 }} className={`group grid overflow-hidden rounded-[2rem] border border-current/15 ${index % 2 ? "lg:grid-cols-[.92fr_1.08fr]" : "lg:grid-cols-[1.08fr_.92fr]"}`} style={{ backgroundColor: surface }}>
                            <div className={`relative flex min-h-[280px] flex-col justify-between overflow-hidden p-7 sm:p-10 ${index % 2 ? "lg:order-2" : ""} ${tones[project.tone] || tones.coral}`}>
                                <div className="absolute -right-10 -top-12 h-64 w-64 rounded-full border-[1.5px] border-current/20" />
                                <div className="absolute -right-1 top-8 h-44 w-44 rounded-full border-[1.5px] border-current/20" />
                                <div className="relative z-10 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.16em]">
                                    <span className="rounded-full border border-current/35 px-3 py-1.5"><Editable value={`EPISODE ${project.chapter}`} onChange={(v) => onChange?.({ projects: projects.map((item, i) => i === index ? { ...item, chapter: v.replace(/^EPISODE\s*/i, "") } : item) })} /></span>
                                    <span><Editable value={project.year} onChange={(v) => onChange?.({ projects: projects.map((item, i) => i === index ? { ...item, year: v } : item) })} /></span>
                                </div>
                                <div className="relative z-10 mt-12 flex items-end justify-between gap-4">
                                    <div>
                                        <div className="font-mono text-[10px] uppercase tracking-[0.15em] opacity-70"><Editable value={project.type} onChange={(v) => onChange?.({ projects: projects.map((item, i) => i === index ? { ...item, type: v } : item) })} /></div>
                                        <div className="mt-3 text-3xl font-black leading-[0.96] tracking-[-0.07em] sm:text-5xl"><Editable value={project.title} onChange={(v) => onChange?.({ projects: projects.map((item, i) => i === index ? { ...item, title: v } : item) })} /></div>
                                    </div>
                                    <div className="mb-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-current transition-transform group-hover:rotate-45"><ArrowUpRight size={22} /></div>
                                </div>
                                <div className="absolute left-[46%] top-[38%] rotate-[-14deg] text-current/20"><Sparkles size={54} strokeWidth={1.2} /></div>
                            </div>
                            <div className={`flex flex-col justify-between p-7 sm:p-10 ${index % 2 ? "lg:order-1" : ""}`}>
                                <div className="space-y-4">
                                    <p className="max-w-xl text-base leading-7 opacity-75"><Editable value={project.summary} onChange={(v) => onChange?.({ projects: projects.map((item, i) => i === index ? { ...item, summary: v } : item) })} /></p>
                                    <p className="max-w-xl text-sm leading-6 opacity-60"><Editable value={project.detail} onChange={(v) => onChange?.({ projects: projects.map((item, i) => i === index ? { ...item, detail: v } : item) })} /></p>
                                </div>
                                <div className="mt-9">
                                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-extrabold" style={{ backgroundColor: accent, color: bg }}>
                                        <Layers size={15} /><Editable value={project.impact} onChange={(v) => onChange?.({ projects: projects.map((item, i) => i === index ? { ...item, impact: v } : item) })} />
                                    </div>
                                    <div className="mt-5 border-t border-current/15 pt-4">
                                        <div className="font-mono text-[9px] uppercase tracking-[0.17em] opacity-45"><Editable value="Tools in the kit" /></div>
                                        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs font-medium opacity-75">
                                            <Editable value={project.tools} onChange={(v) => onChange?.({ projects: projects.map((item, i) => i === index ? { ...item, tools: v } : item) })} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
                <div className="mt-9 flex items-center justify-center gap-3 text-xs font-mono uppercase tracking-[0.17em] opacity-50">
                    <ChevronRight size={14} /><Editable value="More chapters are being written" /><ChevronRight size={14} />
                </div>
            </div>
        </section>
    );
}
