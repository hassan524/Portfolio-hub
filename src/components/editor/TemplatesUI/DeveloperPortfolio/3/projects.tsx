// @ts-nocheck
import { useId, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const GAP = 48; // space between the image column and the text column
const LINK_H = 120; // height of the curved connector between two projects

/** Dashed S-curve between two projects. It is revealed as the user scrolls. */
function Connector({ width, xs, xe, accent, track }: any) {
    const uid = useId().replace(/:/g, "");
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "end 60%"] });
    const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
    const endDot = useTransform(progress, [0.9, 1], [0, 1]);

    const y0 = 6;
    const y1 = LINK_H - 6;
    const d = `M ${xs} ${y0} C ${xs} ${y0 + (y1 - y0) * 0.85}, ${xe} ${y1 - (y1 - y0) * 0.85}, ${xe} ${y1}`;

    return (
        <div ref={ref} style={{ height: LINK_H }} className="relative w-full">
            <svg width={width} height={LINK_H} className="absolute left-0 top-0 overflow-visible" aria-hidden="true">
                <defs>
                    <mask id={`m-${uid}`} maskUnits="userSpaceOnUse" x={-20} y={0} width={width + 40} height={LINK_H}>
                        <motion.path d={d} fill="none" stroke="#fff" strokeWidth={8} style={{ pathLength: progress }} />
                    </mask>
                </defs>
                {/* faint dashed track */}
                <path d={d} fill="none" stroke={track} strokeWidth={1.5} strokeDasharray="5 7" strokeLinecap="round" />
                {/* bright dashed line, revealed by the mask */}
                <path
                    d={d}
                    fill="none"
                    stroke={accent}
                    strokeWidth={1.5}
                    strokeDasharray="5 7"
                    strokeLinecap="round"
                    mask={`url(#m-${uid})`}
                />
                <circle cx={xs} cy={y0} r={4} fill={accent} />
                <motion.circle cx={xe} cy={y1} r={4} fill={accent} style={{ opacity: endDot }} />
            </svg>
        </div>
    );
}

export function Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#07060B";
    const bgSecond = theme?.["bg-second"] || "#0F0C14";
    const ink = theme?.ink || "#FFFFFF";
    const inkSecond = theme?.["ink-second"] || "#D6D0E0";
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#F5B335";

    // Support both props.projects and props.items from builder
    const rawList = props?.projects?.length
        ? props.projects
        : (props?.items?.length ? props.items : null);

    const projects = rawList || [
        {
            num: "01",
            category: "Full-Stack AI & RAG",
            title: "Atlas — AI Research Copilot",
            period: "2024 — 2025",
            description: "Retrieval-augmented intelligence engine reading thousands of academic papers with sub-second semantic search, real-time citation streaming, and automated evaluation harnesses.",
            tags: ["Next.js", "Python", "pgvector", "LangChain"],
            link: "https://github.com",
            outcomes: ["62% faster research workflows", "Sub-second streaming latency", "400+ automated eval tests"],
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&q=80",
        },
        {
            num: "02",
            category: "Realtime Systems & 3D",
            title: "Pulse — Realtime Ops Terminal",
            period: "2024",
            description: "High-density telemetry dashboard processing 40,000 WebSocket events per minute with a customized WebGL 3D globe and zero-latency reactive widget canvas.",
            tags: ["React", "TypeScript", "WebSockets", "Three.js"],
            link: "https://github.com",
            outcomes: ["Locked 60fps WebGL rendering", "40k live events / minute", "Adopted by 9 ops teams"],
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80",
        },
        {
            num: "03",
            category: "Developer Tooling · Open Source",
            title: "Forge — CLI & Container Engine",
            period: "2023 — 2024",
            description: "Zero-configuration developer command-line tool that scaffolds, containerises, and deploys full-stack environments to multi-cloud infrastructure in under 60 seconds.",
            tags: ["Go", "Docker", "Node.js", "AWS"],
            link: "https://github.com",
            outcomes: ["3.4k GitHub Stars", "12k monthly developers", "40+ active contributors"],
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&q=80",
        },
        {
            num: "04",
            category: "High-Throughput Fintech",
            title: "Nimbus — Core Banking Pipeline",
            period: "2023",
            description: "Distributed banking microservices layer handling transactional ledger synchronization with cryptographic audit logging and bank-grade reconciliation.",
            tags: ["Go", "PostgreSQL", "Kafka", "Kubernetes"],
            link: "https://github.com",
            outcomes: ["99.98% production uptime", "1.2M transactions / day", "Zero data loss SLA"],
            image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1000&q=80",
        },
    ];

    const updateProject = (index: number, field: string, value: any) => {
        const updated = projects.map((p: any, i: number) => (i === index ? { ...p, [field]: value } : p));
        onChange?.({ projects: updated, items: updated });
    };

    const updateTag = (pIdx: number, tIdx: number, val: string) => {
        const updatedTags = projects[pIdx].tags.map((t: string, i: number) => (i === tIdx ? val : t));
        updateProject(pIdx, "tags", updatedTags);
    };

    const updateOutcome = (pIdx: number, oIdx: number, val: string) => {
        const updatedOutcomes = (projects[pIdx].outcomes || []).map((o: string, i: number) => (i === oIdx ? val : o));
        updateProject(pIdx, "outcomes", updatedOutcomes);
    };

    // Layout depends on the width of this section (not the browser window),
    // so it also works inside a narrow editor canvas.
    const wrapRef = useRef<HTMLDivElement>(null);
    const [w, setW] = useState(0);
    useLayoutEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const measure = () => setW(Math.round(el.getBoundingClientRect().width));
        measure();
        if (typeof ResizeObserver === "undefined") return;
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const twoCol = w >= 480;
    const colW = (w - GAP) / 2;
    const leftCenter = colW / 2;
    const rightCenter = colW + GAP + colW / 2;

    const ease = [0.16, 1, 0.3, 1];

    return (
        <section id="projects" className="relative w-full overflow-hidden py-24 md:py-32" style={{ backgroundColor: bg, color: ink }}>
            <div className="relative mx-auto max-w-6xl px-5 md:px-8">
                {/* Header */}
                <div className="grid gap-8 md:grid-cols-12 md:items-end">
                    <div className="md:col-span-8">
                        <motion.p
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.6, ease }}
                            className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em]"
                            style={{ color: accent }}
                        >
                            <motion.span
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease, delay: 0.1 }}
                                className="block h-px w-12 origin-left"
                                style={{ backgroundColor: accent }}
                            />
                            <Editable value={props?.eyebrow || "Featured Productions"} onChange={(v) => onChange?.({ eyebrow: v })} />
                        </motion.p>
                        <div className="mt-5 overflow-hidden pb-2">
                            <motion.h2
                                initial={{ y: "105%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.9, ease }}
                                className="font-serif text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl"
                                style={{ color: ink }}
                            >
                                <Editable value={props?.title || "Crafted with Purpose & Scale"} onChange={(v) => onChange?.({ title: v })} />
                            </motion.h2>
                        </div>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, ease, delay: 0.15 }}
                        className="text-sm leading-relaxed md:col-span-4 md:text-base"
                        style={{ color: inkSecond }}
                    >
                        <Editable
                            value={props?.subtitle || "Selected engineering systems engineered for resilience, sub-second latency, and uncompromising visual craft."}
                            onChange={(v) => onChange?.({ subtitle: v })}
                        />
                    </motion.p>
                </div>

                {/* Projects: image and text swap sides, curved dashed links in between */}
                <div ref={wrapRef} className="mt-16 md:mt-24">
                    {projects.map((project: any, index: number) => {
                        const imageLeft = index % 2 === 0;
                        const next = index < projects.length - 1;

                        const media = (
                            <motion.div
                                key="media"
                                initial={{ clipPath: imageLeft ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)" }}
                                whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 1.1, ease }}
                                className="group/img relative aspect-[16/10] w-full overflow-hidden rounded-xl border"
                                style={{ backgroundColor: bgSecond, borderColor: surface, order: twoCol ? (imageLeft ? 0 : 1) : 0 }}
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                                />
                            </motion.div>
                        );

                        const text = (
                            <motion.div
                                key="text"
                                initial={{ opacity: 0, x: twoCol ? (imageLeft ? 30 : -30) : 0, y: twoCol ? 0 : 24 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.8, ease, delay: 0.15 }}
                                className="group"
                                style={{ order: twoCol ? (imageLeft ? 1 : 0) : 1 }}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-xs font-bold" style={{ color: accent }}>
                                        <Editable value={project.num || `0${index + 1}`} onChange={(v) => updateProject(index, "num", v)} />
                                    </span>
                                    <span className="h-7 w-px" style={{ backgroundColor: surface }} />
                                    <h3
                                        className="font-serif text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-[color:var(--pj)] md:text-3xl"
                                        style={{ color: ink, "--pj": accent }}
                                    >
                                        <Editable value={project.title} onChange={(v) => updateProject(index, "title", v)} />
                                    </h3>
                                </div>

                                <p className="mt-3 flex flex-wrap gap-x-3 font-mono text-[11px] uppercase tracking-widest" style={{ color: inkSecond }}>
                                    <span><Editable value={project.category || "Platform"} onChange={(v) => updateProject(index, "category", v)} /></span>
                                    <span style={{ color: accent }}>·</span>
                                    <span><Editable value={project.period || "2024"} onChange={(v) => updateProject(index, "period", v)} /></span>
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {(project.tags || []).map((tag: string, tIdx: number) => (
                                        <span
                                            key={tIdx}
                                            className="rounded-full border px-2.5 py-1 font-mono text-[10px]"
                                            style={{ borderColor: inkSecond + "55", color: inkSecond }}
                                        >
                                            <Editable value={tag} onChange={(v) => updateTag(index, tIdx, v)} />
                                        </span>
                                    ))}
                                </div>

                                <p className="mt-4 text-sm leading-relaxed" style={{ color: inkSecond }}>
                                    <Editable value={project.description} onChange={(v) => updateProject(index, "description", v)} />
                                </p>

                                {project.outcomes?.length > 0 && (
                                    <ul className="mt-4 space-y-1">
                                        {project.outcomes.map((outcome: string, oIdx: number) => (
                                            <li key={oIdx} className="flex gap-3 font-mono text-xs" style={{ color: ink }}>
                                                <span style={{ color: accent }}>—</span>
                                                <Editable value={outcome} onChange={(v) => updateOutcome(index, oIdx, v)} />
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <a
                                    href={project.link || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-5 inline-flex items-center gap-2.5 font-mono text-xs font-bold transition-transform duration-300 hover:translate-x-1"
                                    style={{ color: ink }}
                                >
                                    <span>View Case Study</span>
                                    <span
                                        className="flex h-7 w-7 items-center justify-center rounded-full border"
                                        style={{ borderColor: accent, color: accent }}
                                    >
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                    </span>
                                </a>
                            </motion.div>
                        );

                        return (
                            <div key={index}>
                                <div
                                    className="items-center"
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: twoCol ? "1fr 1fr" : "1fr",
                                        gap: twoCol ? GAP : 24,
                                    }}
                                >
                                    {media}
                                    {text}
                                </div>

                                {next && twoCol && w > 0 && (
                                    <Connector
                                        width={w}
                                        xs={imageLeft ? leftCenter : rightCenter}
                                        xe={imageLeft ? rightCenter : leftCenter}
                                        accent={accent}
                                        track={inkSecond + "40"}
                                    />
                                )}
                                {next && !twoCol && <div className="h-14" />}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}