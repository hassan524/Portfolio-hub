// @ts-nocheck
import { ArrowUpRight, BriefcaseBusiness, Compass, Layers3 } from "lucide-react";
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const experience = props?.experience || [
        { period: "2021 — now", role: "Staff Software Engineer", company: "Northstar Health", description: "I lead the engineering work behind a care-coordination platform used by clinics across the Northeast. The role moves between architecture, product discovery, and hands-on implementation: designing durable service boundaries, building the clinician-facing workflows, and helping a growing team ship with confidence. Recently, I helped cut a complex patient-intake journey from nine steps to four while improving the reliability of its integrations.", tags: ["Product architecture", "TypeScript", "Team leadership"] },
        { period: "2017 — 2021", role: "Senior Full-stack Engineer", company: "Fieldnote", description: "At Fieldnote, I helped a small product group turn a promising collaboration tool into a dependable workspace for distributed research teams. I owned core application surfaces and the real-time data layer, worked directly with researchers to understand their routines, and introduced a design-system foundation that made accessibility and consistency part of our daily delivery rather than a later cleanup.", tags: ["React", "Distributed systems", "Design systems"] },
        { period: "2013 — 2017", role: "Software Engineer", company: "Common Thread Studio", description: "My early years were spent building custom digital products for organizations with very different needs: publishing tools, logistics dashboards, and public-facing services. Working in compact teams taught me to get close to the problem, make sensible trade-offs visible, and own the full arc from the first working prototype through launch and support.", tags: ["Web applications", "Ruby", "Client partnership"] },
    ];
    const capabilities = props?.capabilities || ["Product engineering", "Technical strategy", "Frontend systems", "API design", "Accessibility", "Mentorship", "Performance", "Developer experience"];

    return (
        <section id="about" className="px-5 py-24 sm:px-8 sm:py-32" style={{ backgroundColor: bg, color: ink }}>
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 border-b pb-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-20" style={{ borderColor: surface }}>
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55 }}>
                        <div className="mb-5 flex items-center gap-2 text-[11px] uppercase tracking-[.18em]" style={{ color: accent }}><Compass size={14} /><Editable value={props?.sectionLabel || "A bit of context"} onChange={(v) => onChange?.({ sectionLabel: v })} /></div>
                        <h2 className="max-w-md text-4xl font-medium leading-[1.06] tracking-[-.055em] sm:text-5xl">
                            <Editable value={props?.heading || "Curiosity is part of the toolkit."} onChange={(v) => onChange?.({ heading: v })} />
                        </h2>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, delay: 0.08 }}>
                        <p className="max-w-3xl text-lg leading-8 opacity-70">
                            <Editable value={props?.story || "I’m drawn to the seams between technology and people: the awkward handoff, the slow query, the workflow everyone has learned to work around. I like getting close enough to understand why a system became complicated, then making it simpler without losing the nuance that made it useful."} onChange={(v) => onChange?.({ story: v })} />
                        </p>
                        <p className="mt-5 max-w-3xl text-base leading-7 opacity-55">
                            <Editable value={props?.storyTwo || "That means asking good questions before reaching for a framework, writing down the trade-offs, and leaving a codebase more understandable than I found it. I do my best work with thoughtful people who care about the craft and the consequences of what they ship."} onChange={(v) => onChange?.({ storyTwo: v })} />
                        </p>
                        <div className="mt-8 flex flex-wrap gap-2">
                            {capabilities.map((capability, index) => (
                                <span key={index} className="rounded-full border px-3.5 py-2 text-xs leading-5 transition-transform hover:scale-[1.02]" style={{ borderColor: surface, color: inkSecond }}>
                                    <Editable value={capability} onChange={(v) => onChange?.({ capabilities: capabilities.map((item, i) => i === index ? v : item) })} />
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div id="experience" className="scroll-mt-28 pt-16 sm:pt-20">
                    <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
                        <div>
                            <div className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[.18em]" style={{ color: accent }}><BriefcaseBusiness size={14} /><Editable value={props?.experienceKicker || "Where I’ve been"} onChange={(v) => onChange?.({ experienceKicker: v })} /></div>
                            <h3 className="text-3xl font-medium tracking-[-.045em] sm:text-4xl"><Editable value={props?.experienceHeading || "Experience, in chapters"} onChange={(v) => onChange?.({ experienceHeading: v })} /></h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs opacity-50"><Layers3 size={14} /><Editable value={props?.experienceMeta || "A practical mix of scale and small teams"} onChange={(v) => onChange?.({ experienceMeta: v })} /></div>
                    </div>
                    <div className="relative">
                        <div className="absolute bottom-7 left-[6px] top-2 w-px" style={{ backgroundColor: surface }} />
                        <div className="space-y-0">
                            {experience.map((entry, index) => (
                                <motion.article key={index} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: index * 0.06 }} className="relative grid gap-5 pb-12 pl-8 sm:grid-cols-[150px_1fr] sm:gap-10 sm:pl-12">
                                    <span className="absolute left-0 top-1.5 h-[13px] w-[13px] rounded-full border-[3px]" style={{ backgroundColor: bg, borderColor: accent }} />
                                    <div className="pt-0.5 font-mono text-[11px] tracking-wide opacity-45"><Editable value={entry.period || "2021 — now"} onChange={(v) => onChange?.({ experience: experience.map((x, i) => i === index ? { ...x, period: v } : x) })} /></div>
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                            <h4 className="text-xl font-medium tracking-tight"><Editable value={entry.role || "Staff Software Engineer"} onChange={(v) => onChange?.({ experience: experience.map((x, i) => i === index ? { ...x, role: v } : x) })} /></h4>
                                            <span className="text-sm opacity-55"><Editable value={entry.company || "Northstar Health"} onChange={(v) => onChange?.({ experience: experience.map((x, i) => i === index ? { ...x, company: v } : x) })} /></span>
                                        </div>
                                        <p className="mt-4 max-w-3xl text-sm leading-7 opacity-60 sm:text-[15px]"><Editable value={entry.description || "I led product engineering across a complex platform, bringing teams together around dependable systems and clear customer workflows."} onChange={(v) => onChange?.({ experience: experience.map((x, i) => i === index ? { ...x, description: v } : x) })} /></p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {(entry.tags || []).map((tag, tagIndex) => (
                                                <span key={tagIndex} className="rounded-md px-2.5 py-1.5 text-[10px] uppercase tracking-[.1em]" style={{ backgroundColor: surface, color: inkSecond }}>
                                                    <Editable value={tag} onChange={(v) => onChange?.({ experience: experience.map((x, i) => i === index ? { ...x, tags: x.tags.map((t, ti) => ti === tagIndex ? v : t) } : x) })} />
                                                </span>
                                            ))}
                                            <button type="button" onClick={() => onChange?.({ experience: experience.map((x, i) => i === index ? { ...x, tags: [...(x.tags || []), "New capability"] } : x) })} className="rounded-md border px-2.5 py-1.5 text-[10px] opacity-40 transition-opacity hover:opacity-80" style={{ borderColor: surface }}><Editable value="+" /></button>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                    <a href="#projects" className="ml-8 inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-65 sm:ml-[198px]" style={{ color: accent }}>
                        <Editable value={props?.nextLink || "See what that work looks like"} onChange={(v) => onChange?.({ nextLink: v })} /><ArrowUpRight size={15} />
                    </a>
                </div>
            </div>
        </section>
    );
}
