// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";

    const defaultItems = [
        { title: "FastTempMail", description: "A privacy-first temporary email service that lets users generate disposable addresses instantly. Built for speed and security, it receives email anonymously without sign-up.", tags: ["Nuxt", "MySQL", "Tailwind", "Sass"] },
        { title: "Orderain App", description: "A no-code store creation platform with an interactive template builder and advanced tools, designed to help people launch a store within seconds.", tags: ["HTML", "CSS", "Tailwind", "Vue.js"] },
        { title: "Turingoid", description: "Delivering exceptional user experiences is our expertise. From websites to mobile apps, we create engaging and intuitive digital products.", tags: ["HTML", "CSS", "Tailwind", "JavaScript"] },
        { title: "Northwind Dashboard", description: "A real-time analytics dashboard with live charts, role-based views and exportable reports for operations teams.", tags: ["Next.js", "TypeScript", "PostgreSQL", "tRPC"] },
    ];
    const rawItems = props?.items;
    const items = Array.isArray(rawItems) && rawItems.length > 0 ? rawItems : defaultItems;

    const set = (i: number, k: string, v: any) =>
        onChange?.({ items: items.map((x: any, j: number) => (j === i ? { ...x, [k]: v } : x)) });

    return (
        <section id="projects" style={{ background: bg, borderTop: `1px solid ${surface}` }}>
            {/* Tighter padding, bigger text */}
            <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
                <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14 text-center">
                    <p className="font-mono text-xs uppercase tracking-[0.3em] md:text-sm" style={{ color: inkSecond }}>
                        <Editable as="span" value={props?.eyebrow || "Portfolio"} onChange={(v) => onChange?.({ eyebrow: v })} />
                    </p>
                    <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl" style={{ color: ink }}>
                        <Editable as="span" value={props?.title || "Discover what I've created"} onChange={(v) => onChange?.({ title: v })} />
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl font-mono text-sm leading-relaxed md:text-base" style={{ color: inkSecond }}>
                        <Editable as="span" value={props?.subtitle || "Each piece reflects my passion for innovation and commitment to delivering quality work."} onChange={(v) => onChange?.({ subtitle: v })} />
                    </p>
                </motion.div>

                <div style={{ borderTop: `1px solid ${surface}` }}>
                    {items.map((p: any, i: number) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                            className="group grid grid-cols-[40px_1fr_28px] items-start gap-4 py-10 md:grid-cols-[100px_1fr_48px] md:gap-8"
                            style={{ borderBottom: `1px solid ${surface}` }}
                        >
                            <span className="pt-1.5 font-mono text-sm md:text-base font-semibold" style={{ color: inkSecond }}>0{i + 1}</span>
                            <div className="min-w-0">
                                <h3 className="text-2xl font-bold tracking-tight md:text-4xl" style={{ color: ink }}>
                                    <Editable as="span" value={p.title} onChange={(v) => set(i, "title", v)} />
                                </h3>
                                <p className="mt-3 max-w-2xl font-mono text-sm md:text-base leading-relaxed" style={{ color: inkSecond }}>
                                    <Editable as="span" value={p.description} onChange={(v) => set(i, "description", v)} />
                                </p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {(p.tags || []).map((t: string, k: number) => (
                                        <span key={k} className="rounded-full px-3.5 py-1 font-mono text-xs" style={{ border: `1px solid ${surface}`, color: inkSecond }}>
                                            <Editable as="span" value={t} onChange={(v) => set(i, "tags", (p.tags || []).map((x: string, m: number) => (m === k ? v : x)))} />
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <ArrowUpRight size={22} className="mt-1 transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:translate-x-1.5" style={{ color: inkSecond }} />
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export const DeveloperPortfolio6Projects = Projects;
export default Projects;