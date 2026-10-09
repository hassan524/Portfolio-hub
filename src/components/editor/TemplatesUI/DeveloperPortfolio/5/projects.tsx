// @ts-nocheck
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#F2541B";

    const ref = useRef<HTMLElement>(null);
    const [m, setM] = useState(false);
    const [active, setActive] = useState<number | null>(null);
    useEffect(() => {
        const f = () => setM(window.innerWidth < 768);
        f();
        window.addEventListener("resize", f);
        return () => window.removeEventListener("resize", f);
    }, []);

    const _raw = props?.items;
    const items = Array.isArray(_raw) && _raw.length > 0 ? _raw : [
        { title: "SheetSync", description: "Real-time collaborative spreadsheet SaaS with live cursors, roles and version history.", tags: "Next.js, Supabase, TypeScript", price: "SaaS \u2022 2025", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80" },
        { title: "PortfolioHub", description: "Drag-and-drop portfolio builder with animated templates and one-click export.", tags: "React, Framer Motion, Tailwind", price: "Builder \u2022 2025", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80" },
        { title: "Pulse Analytics", description: "Event dashboard turning raw data into clear, beautiful insight.", tags: "Node.js, PostgreSQL, Charts", price: "Dashboard \u2022 2024", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80" },
        { title: "Nomad", description: "Scroll-driven travel experience with immersive storytelling.", tags: "Next.js, Three.js, Motion", price: "Website \u2022 2024", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80" },
        { title: "Chatly", description: "Lightweight team chat with threads, presence and instant search.", tags: "Express, WebSockets, React", price: "App \u2022 2024", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80" },
    ];

    const set = (i: number, k: string, v: string) =>
        onChange?.({ items: items.map((x: any, j: number) => (j === i ? { ...x, [k]: v } : x)) });

    const n = items.length;
    const titleW = m ? 85 : 40;
    const cardW = m ? 80 : 44;
    const gap = m ? 4 : 2;
    const total = 6 + titleW + gap + n * cardW + (n - 1) * gap + 6;
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
    const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${Math.max(total - 100, 0)}vw`]);
    const cur = active !== null ? items[active] : null;

    return (
        <section id="projects" ref={ref} className="relative w-full" style={{ height: `${n * 55 + 100}vh`, background: `linear-gradient(180deg, ${bg}, ${bgSecond})`, color: ink }}>
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x, gap: `${gap}vw`, paddingLeft: "6vw", paddingRight: "6vw" }} className="flex items-center will-change-transform">
                    <div className="shrink-0" style={{ width: `${titleW}vw` }}>
                        <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.25em]" style={{ color: inkSecond }}>
                            <span className="h-px w-10" style={{ background: accent }} />
                            <Editable as="span" value={props?.eyebrow || "Selected work"} onChange={(v: string) => onChange?.({ eyebrow: v })} />
                        </div>
                        <h2 className="text-[clamp(3rem,8vw,8.5rem)] font-black leading-[0.9] tracking-[-0.05em]">
                            <Editable as="span" value={props?.title || "Projects that ship."} onChange={(v: string) => onChange?.({ title: v })} />
                        </h2>
                        <p className="mt-6 max-w-sm text-sm leading-relaxed" style={{ color: inkSecond }}>
                            <Editable as="span" value={props?.subtitle || "Keep scrolling. Products, tools and experiments built end to end."} onChange={(v: string) => onChange?.({ subtitle: v })} />
                        </p>
                        <div className="mt-8 flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                            <span className="text-xs" style={{ color: inkSecond }}>Scroll to explore</span>
                        </div>
                    </div>

                    {items.map((p: any, i: number) => (
                        <article
                            key={i}
                            onClick={() => setActive(i)}
                            className="group relative shrink-0 cursor-pointer overflow-hidden rounded-[2rem] transition-all duration-500 hover:scale-[1.02] active:scale-95"
                            style={{ width: `${cardW}vw`, height: m ? "62vh" : "70vh", border: `1px solid ${surface}` }}
                        >
                            <img
                                src={p.image}
                                alt={p.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                            />
                            {/* gradient overlay */}
                            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, color-mix(in srgb, ${bg} 95%, transparent) 0%, transparent 65%)` }} />
                            {/* accent line at top on hover */}
                            <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: accent }} />

                            {/* top bar */}
                            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-7">
                                <span className="font-mono text-xs" style={{ color: inkSecond }}>
                                    <Editable as="span" value={String(i + 1).padStart(2, "0")} />
                                </span>
                                <span
                                    className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-500 group-hover:rotate-45 group-hover:scale-110"
                                    style={{ background: accent, color: bg }}
                                >
                                    <ArrowUpRight size={18} />
                                </span>
                            </div>

                            {/* bottom info */}
                            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                                <div className="mb-3 flex flex-wrap gap-2">
                                    {String(p.tags).split(",").map((t: string, k: number) => (
                                        <span key={k} className="rounded-full px-3 py-1 text-[11px] backdrop-blur-md" style={{ background: surface }}>
                                            {t.trim()}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-[clamp(1.8rem,3.8vw,4rem)] font-black leading-none tracking-[-0.04em]">
                                    <Editable as="span" value={p.title} onChange={(v: string) => set(i, "title", v)} />
                                </h3>
                                <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: inkSecond }}>
                                    <Editable as="span" value={p.description} onChange={(v: string) => set(i, "description", v)} />
                                </p>
                                <p className="mt-3 text-sm font-semibold tracking-wide" style={{ color: accent }}>
                                    <Editable as="span" value={p.price} onChange={(v: string) => set(i, "price", v)} />
                                </p>
                            </div>
                        </article>
                    ))}
                </motion.div>

                {/* progress bar */}
                <div className="absolute inset-x-[6vw] bottom-8 h-px" style={{ background: surface }}>
                    <motion.div style={{ scaleX: scrollYProgress, background: accent }} className="h-full origin-left" />
                </div>
            </div>

            {/* lightbox */}
            <AnimatePresence>
                {cur && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActive(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md"
                        style={{ background: `color-mix(in srgb, ${bg} 80%, transparent)` }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 40 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative grid w-full max-w-4xl overflow-hidden rounded-[2rem] md:grid-cols-2"
                            style={{ background: bg, border: `1px solid ${surface}`, boxShadow: `0 40px 120px -30px ${accent}60` }}
                        >
                            <button
                                onClick={() => setActive(null)}
                                aria-label="Close"
                                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-95"
                                style={{ background: accent, color: bg }}
                            >
                                <X size={18} />
                            </button>
                            <img src={cur.image} alt={cur.title} className="h-56 w-full object-cover md:h-full" />
                            <div className="flex flex-col justify-center p-7 md:p-10">
                                <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: accent }}>{cur.price}</p>
                                <h3 className="mt-3 text-4xl font-black tracking-[-0.04em]">{cur.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed" style={{ color: inkSecond }}>{cur.description}</p>
                                <p className="mt-5 text-xs" style={{ color: inkSecond }}>{cur.tags}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export const DeveloperPortfolio5Projects = Projects;
export default Projects;