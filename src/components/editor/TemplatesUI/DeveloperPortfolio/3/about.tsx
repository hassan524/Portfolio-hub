// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Download, FileText, ArrowUpRight, Code2, Terminal } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

function Counter({ to = 7, color }: { to: number; color: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-10px" });
    const [n, setN] = useState(to);

    useEffect(() => {
        const controls = animate(0, to, {
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => setN(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, to]);

    return (
        <span ref={ref} className="tabular-nums" style={{ color }}>
            {n}
        </span>
    );
}

const DEFAULT_SKILLS = [
    { name: "TypeScript", category: "Languages" },
    { name: "React / Next.js", category: "Frontend" },
    { name: "Node.js / Express", category: "Backend" },
    { name: "Python", category: "AI & ML" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Docker / K8s", category: "DevOps" },
    { name: "AWS Cloud", category: "Infrastructure" },
    { name: "GraphQL / REST", category: "APIs" },
    { name: "Redis Cache", category: "Performance" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "LangChain / LLMs", category: "AI & ML" },
    { name: "Git / CI/CD", category: "Workflow" }
];

export function About({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#07060B";
    const bgSecond = theme?.["bg-second"] || "#0F0C14";
    const ink = theme?.ink || "#FFFFFF";
    const inkSecond = theme?.["ink-second"] || "#D6D0E0";
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#F5B335";

    const rawSkills = props?.skills;
    const skills = Array.isArray(rawSkills) && rawSkills.length > 0 ? rawSkills : DEFAULT_SKILLS;

    const years = parseInt(props?.years ?? "7", 10) || 7;
    const projectsCount = parseInt(props?.projectsCount ?? "40", 10) || 40;

    const updateSkill = (i: number, val: string) => {
        const next = [...skills];
        if (typeof next[i] === "object") {
            next[i] = { ...next[i], name: val };
        } else {
            next[i] = val;
        }
        onChange?.({ skills: next });
    };

    const ease = [0.16, 1, 0.3, 1];

    return (
        <section
            id="about"
            className="relative w-full overflow-hidden py-20 md:py-28"
            style={{ backgroundColor: bgSecond, color: ink }}
        >
            {/* Ambient Background Graphic SVG */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
                <svg className="absolute -left-20 top-0 h-full w-full max-w-4xl" viewBox="0 0 800 800" fill="none">
                    <circle cx="400" cy="400" r="350" stroke={accent} strokeWidth="0.5" strokeDasharray="4 8" />
                    <circle cx="400" cy="400" r="250" stroke={inkSecond} strokeWidth="0.5" opacity="0.3" />
                    <line x1="50" y1="400" x2="750" y2="400" stroke={accent} strokeWidth="0.5" strokeDasharray="3 6" />
                    <line x1="400" y1="50" x2="400" y2="750" stroke={accent} strokeWidth="0.5" strokeDasharray="3 6" />
                </svg>
                <div
                    className="absolute -right-32 top-1/4 h-96 w-96 rounded-full blur-[140px]"
                    style={{ backgroundColor: `${accent}15` }}
                />
            </div>

            <div className="relative mx-auto max-w-6xl px-5 md:px-8">
                {/* Top Section Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, ease }}
                    className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em]"
                    style={{ color: accent }}
                >
                    <span className="flex h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                    <Editable value={props?.eyebrow || "01 // ABOUT ME"} onChange={(v) => onChange?.({ eyebrow: v })} />
                </motion.div>

                {/* Main 2-Column Balanced Grid */}
                <div className="mt-8 grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
                    {/* LEFT COLUMN: Concise Bio, Stats & Resume Button */}
                    <div className="flex flex-col lg:col-span-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, ease }}
                            className="font-serif text-3xl font-bold leading-tight tracking-tight md:text-5xl"
                            style={{ color: ink }}
                        >
                            <Editable
                                value={props?.title || "Architecting high-performance systems with precision and craft."}
                                onChange={(v) => onChange?.({ title: v })}
                            />
                        </motion.h2>

                        {/* Short, punchy bio */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, ease, delay: 0.1 }}
                            className="mt-6 text-base leading-relaxed md:text-lg"
                            style={{ color: inkSecond }}
                        >
                            <Editable
                                value={
                                    props?.bio ||
                                    "Senior full-stack engineer and interface architect dedicated to building digital platforms that merge resilient microservices with immaculate, responsive user experiences."
                                }
                                onChange={(v) => onChange?.({ bio: v })}
                            />
                        </motion.p>

                        {/* Stats Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.7, ease, delay: 0.15 }}
                            className="mt-8 grid grid-cols-2 gap-4 border-y py-6"
                            style={{ borderColor: surface }}
                        >
                            <div>
                                <div className="font-serif text-4xl font-bold tracking-tight md:text-5xl" style={{ color: accent }}>
                                    <Counter to={years} color={accent} />
                                    <span>+</span>
                                </div>
                                <p className="mt-1 font-mono text-xs uppercase tracking-wider" style={{ color: inkSecond }}>
                                    <Editable value={props?.stat1Label || "Years Experience"} onChange={(v) => onChange?.({ stat1Label: v })} />
                                </p>
                            </div>
                            <div>
                                <div className="font-serif text-4xl font-bold tracking-tight md:text-5xl" style={{ color: accent }}>
                                    <Counter to={projectsCount} color={accent} />
                                    <span>+</span>
                                </div>
                                <p className="mt-1 font-mono text-xs uppercase tracking-wider" style={{ color: inkSecond }}>
                                    <Editable value={props?.stat2Label || "Projects Completed"} onChange={(v) => onChange?.({ stat2Label: v })} />
                                </p>
                            </div>
                        </motion.div>

                        {/* Resume CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.6, ease, delay: 0.2 }}
                            className="mt-8 flex flex-wrap items-center gap-4"
                        >
                            <a
                                href={props?.resumeUrl || "#"}
                                target="_blank"
                                rel="noreferrer"
                                className="group inline-flex items-center gap-3 rounded-full border px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-95"
                                style={{
                                    backgroundColor: accent,
                                    borderColor: accent,
                                    color: bg,
                                    boxShadow: `0 8px 24px -6px ${accent}40`,
                                }}
                            >
                                <FileText className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                                <Editable value={props?.resumeText || "Download Resume"} onChange={(v) => onChange?.({ resumeText: v })} />
                                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                            </a>

                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 rounded-full border px-5 py-3.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-95"
                                style={{ borderColor: surface, color: ink }}
                            >
                                <span>Get in touch</span>
                                <ArrowUpRight className="h-4 w-4" style={{ color: accent }} />
                            </a>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Skills Little Blocks Grid */}
                    <div className="flex flex-col lg:col-span-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, ease }}
                            className="flex items-center justify-between border-b pb-4"
                            style={{ borderColor: surface }}
                        >
                            <div className="flex items-center gap-2">
                                <Code2 className="h-4 w-4" style={{ color: accent }} />
                                <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: ink }}>
                                    <Editable value={props?.skillsTitle || "Core Technical Stack"} onChange={(v) => onChange?.({ skillsTitle: v })} />
                                </span>
                            </div>
                            <span className="font-mono text-xs" style={{ color: inkSecond }}>
                                {skills.length} Technologies
                            </span>
                        </motion.div>

                        {/* Little Blocks Grid */}
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {skills.map((s: any, i: number) => {
                                const skillName = typeof s === "object" ? s.name : s;
                                const skillCat = typeof s === "object" ? s.category : "Skill";
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-30px" }}
                                        transition={{ duration: 0.4, ease, delay: i * 0.04 }}
                                        className="group relative flex flex-col justify-between rounded-xl border p-3.5 transition-all duration-300 hover:-translate-y-1"
                                        style={{
                                            backgroundColor: "rgba(255, 255, 255, 0.02)",
                                            borderColor: surface,
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span
                                                className="h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:scale-150"
                                                style={{ backgroundColor: accent }}
                                            />
                                            <span className="font-mono text-[10px] tracking-wider uppercase opacity-50" style={{ color: inkSecond }}>
                                                {skillCat}
                                            </span>
                                        </div>
                                        <div className="mt-3">
                                            <span className="text-sm font-semibold tracking-wide transition-colors duration-200 group-hover:text-[color:var(--hl)]" style={{ color: ink, "--hl": accent }}>
                                                <Editable value={skillName} onChange={(v) => updateSkill(i, v)} />
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Terminal status line at bottom of skills */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-6 flex items-center justify-between rounded-lg border px-4 py-2.5 font-mono text-xs"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", borderColor: surface, color: inkSecond }}
                        >
                            <div className="flex items-center gap-2">
                                <Terminal className="h-3.5 w-3.5" style={{ color: accent }} />
                                <span>stack.status: active</span>
                            </div>
                            <span className="text-[11px] tracking-wider" style={{ color: accent }}>
                                ✓ Production Ready
                            </span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const DeveloperPortfolio3About = About;
export default About;