// @ts-nocheck
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { Editable } from "@/components/editor/ui/Editable";

// ── 3D skill sphere that orbits & reacts to pointer ─────────────────────────
function SkillSphere({ accent, ink }: any) {
    const ref = useRef<any>(null);
    useFrame((s) => {
        if (!ref.current) return;
        ref.current.rotation.y = s.clock.elapsedTime * 0.22;
        ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.15) * 0.18;
    });
    return (
        <Float speed={1.2} floatIntensity={0.5}>
            <group ref={ref}>
                <mesh>
                    <icosahedronGeometry args={[1.4, 2]} />
                    <MeshDistortMaterial
                        color={accent}
                        roughness={0.05}
                        metalness={0.95}
                        distort={0.18}
                        speed={1.6}
                        envMapIntensity={2}
                    />
                </mesh>
                {/* wireframe shell */}
                <mesh scale={1.04}>
                    <icosahedronGeometry args={[1.4, 2]} />
                    <meshBasicMaterial color={ink} wireframe transparent opacity={0.08} />
                </mesh>
            </group>
        </Float>
    );
}

// ── DEFAULT SKILLS ────────────────────────────────────────────────────────────
const SKILL_DEFAULTS = [
    { name: "React / Next.js", level: 96, cat: "Frontend" },
    { name: "TypeScript", level: 94, cat: "Languages" },
    { name: "Node.js", level: 90, cat: "Backend" },
    { name: "PostgreSQL", level: 87, cat: "Database" },
    { name: "Three.js / WebGL", level: 82, cat: "3D & Motion" },
    { name: "Docker / K8s", level: 78, cat: "DevOps" },
];

// ── ABOUT SECTION ─────────────────────────────────────────────────────────────
export function About({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";

    const [ready, setReady] = useState(false);
    useEffect(() => setReady(true), []);

    // Scroll-driven text reveal
    const stRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: sp } = useScroll({ target: stRef, offset: ["start 0.85", "end 0.4"] });
    const p = useTransform(sp, [0, 1], [0, 100]);
    const p2 = useTransform(sp, [0, 1], [14, 114]);
    const dim = `color-mix(in srgb, ${ink} 18%, transparent)`;
    const fill = useMotionTemplate`linear-gradient(180deg, ${ink} 0%, ${ink} ${p}%, ${dim} ${p2}%, ${dim} 100%)`;

    const rawSkills = props?.skills;
    const skills = Array.isArray(rawSkills) && rawSkills.length > 0 ? rawSkills : SKILL_DEFAULTS;

    const features = props?.features || [
        { title: "Interface Engineering", text: "Pixel-accurate React & Next.js builds with 60fps motion that feels native." },
        { title: "System Architecture", text: "Typed APIs, schemas and distributed infrastructure built to scale." },
        { title: "AI & LLM Integration", text: "Retrieval pipelines, agent workflows and production-ready LLM systems." },
    ];
    const chips = props?.chips || ["React", "Next.js", "TypeScript", "Node.js", "Tailwind", "Framer Motion", "PostgreSQL", "Three.js"];
    const loop = [...chips, ...chips];

    const setFeature = (i: number, k: string, v: string) =>
        onChange?.({ features: features.map((f: any, j: number) => (j === i ? { ...f, [k]: v } : f)) });

    return (
        <section
            id="about"
            className="relative w-full overflow-hidden"
            style={{ background: `linear-gradient(180deg, ${bgSecond}, ${bg})`, color: ink }}
        >
            {/* ── STORY REVEAL ─────────────────────────────── */}
            <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
                <div className="grid gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-3 lg:pt-3">
                        <div className="sticky top-28">
                            <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.25em]" style={{ color: inkSecond }}>
                                <span className="h-px w-10" style={{ background: accent }} />
                                <Editable as="span" value={props?.eyebrow || "About"} onChange={(v: string) => onChange?.({ eyebrow: v })} />
                            </div>
                            {/* 3D sphere in sidebar — desktop only */}
                            {ready && (
                                <div className="hidden h-72 w-full lg:block">
                                    <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 5], fov: 38 }} gl={{ alpha: true }}>
                                        <ambientLight intensity={0.7} />
                                        <directionalLight position={[4, 5, 4]} intensity={2.5} />
                                        <pointLight position={[-3, -2, 3]} intensity={25} color={accent} />
                                        <Environment preset="city" />
                                        <SkillSphere accent={accent} ink={ink} />
                                    </Canvas>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-9">
                        {/* Scroll-revealed story paragraph */}
                        <div ref={stRef}>
                            <motion.p
                                style={{ backgroundImage: fill, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", caretColor: ink }}
                                className="text-[clamp(1.9rem,4.4vw,4.6rem)] font-semibold leading-[1.09] tracking-[-0.03em]"
                            >
                                <Editable
                                    as="span"
                                    value={props?.story || "I'm a developer who treats code as a design material — building interfaces that feel considered, products that stay fast under load, and details people notice without being able to explain why."}
                                    onChange={(v: string) => onChange?.({ story: v })}
                                />
                            </motion.p>
                        </div>

                        {/* ── SKILLS BAR GRID ────────────────────────── */}
                        <div className="mt-20">
                            <div className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.25em]" style={{ color: inkSecond }}>
                                <span className="h-px w-6" style={{ background: accent }} />
                                <span>Core Stack</span>
                            </div>
                            <div className="grid gap-5 sm:grid-cols-2">
                                {skills.map((s: any, i: number) => {
                                    const name = typeof s === "object" ? s.name : s;
                                    const level = typeof s === "object" ? (s.level ?? 85) : 85;
                                    const cat = typeof s === "object" ? (s.cat ?? "") : "";
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-40px" }}
                                            transition={{ duration: 0.5, delay: i * 0.07 }}
                                        >
                                            <div className="mb-2 flex items-baseline justify-between">
                                                <span className="text-sm font-medium">{name}</span>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] uppercase tracking-wider" style={{ color: inkSecond }}>{cat}</span>
                                                    <span className="text-xs font-semibold tabular-nums" style={{ color: accent }}>{level}%</span>
                                                </div>
                                            </div>
                                            <div className="h-1 w-full overflow-hidden rounded-full" style={{ background: surface }}>
                                                <motion.div
                                                    initial={{ scaleX: 0 }}
                                                    whileInView={{ scaleX: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                                    className="h-full origin-left rounded-full"
                                                    style={{ width: `${level}%`, background: `linear-gradient(to right, ${accent}, color-mix(in srgb, ${accent} 60%, ${ink}))` }}
                                                />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ── CAPABILITY ROWS ─────────────────────────── */}
                        <div className="mt-20">
                            {features.map((r: any, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.6, delay: i * 0.06 }}
                                    className="group grid gap-4 py-8 transition-all duration-500 hover:translate-x-2 md:grid-cols-[60px_1fr_1.3fr] md:gap-8"
                                    style={{ borderTop: `1px solid ${surface}` }}
                                >
                                    <span className="font-mono text-sm" style={{ color: accent }}>
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                                        <Editable as="span" value={r.title} onChange={(v: string) => setFeature(i, "title", v)} />
                                    </h3>
                                    <p className="text-sm leading-relaxed md:text-base" style={{ color: inkSecond }}>
                                        <Editable as="span" value={r.text} onChange={(v: string) => setFeature(i, "text", v)} />
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MARQUEE TICKER ──────────────────────────────────────────── */}
            <div className="overflow-hidden border-y" style={{ borderColor: surface }}>
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    className="flex w-max items-center gap-14 whitespace-nowrap py-5"
                >
                    {loop.map((c: string, i: number) => (
                        <span
                            key={i}
                            className="flex items-center gap-14 text-[clamp(2.8rem,8vw,7.5rem)] font-black uppercase leading-none tracking-[-0.04em]"
                            style={i % 2 ? { color: ink } : { color: "transparent", WebkitTextStroke: `1.5px ${ink}` }}
                        >
                            {c}
                            <span className="inline-block h-3.5 w-3.5 rounded-full" style={{ background: accent }} />
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export const DeveloperPortfolio5About = About;
export default About;