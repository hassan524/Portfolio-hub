// @ts-nocheck
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Torus } from "@react-three/drei";
import { Editable } from "@/components/editor/ui/Editable";

// ── 3D spinning ring accent ───────────────────────────────────────────────────
function SpinRing({ accent, ink }: any) {
    const outer = useRef<any>(null);
    const inner = useRef<any>(null);
    useFrame((s) => {
        const t = s.clock.elapsedTime;
        if (outer.current) {
            outer.current.rotation.x = t * 0.28;
            outer.current.rotation.z = t * 0.14;
        }
        if (inner.current) {
            inner.current.rotation.y = t * -0.4;
            inner.current.rotation.x = t * 0.2;
        }
    });
    return (
        <>
            <Float speed={1.4} floatIntensity={0.6} rotationIntensity={0.1}>
                <mesh ref={outer}>
                    <torusGeometry args={[1.5, 0.05, 20, 100]} />
                    <MeshDistortMaterial color={accent} roughness={0.05} metalness={0.95} distort={0.12} speed={1.2} />
                </mesh>
            </Float>
            <Float speed={2} floatIntensity={0.4} rotationIntensity={0.2}>
                <mesh ref={inner}>
                    <torusGeometry args={[0.9, 0.04, 20, 80]} />
                    <meshBasicMaterial color={ink} transparent opacity={0.35} />
                </mesh>
            </Float>
            <Float speed={1} floatIntensity={0.3}>
                <mesh>
                    <sphereGeometry args={[0.28, 32, 32]} />
                    <MeshDistortMaterial color={accent} roughness={0.1} metalness={1} distort={0.35} speed={2} />
                </mesh>
            </Float>
        </>
    );
}

const DEFAULT_ITEMS = [
    {
        name: "Sarah Chen",
        role: "CTO, Finflow",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
        text: "The best engineer I've worked with. Michael shipped our entire dashboard in 6 weeks and the code is immaculate — zero tech debt inherited.",
        rating: 5,
    },
    {
        name: "James Okonkwo",
        role: "Founder, Pulse Labs",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
        text: "Hired Michael to rescue our launch. He fixed critical perf issues, rebuilt the auth layer and delivered on time. Remarkable under pressure.",
        rating: 5,
    },
    {
        name: "Priya Sharma",
        role: "Product Lead, Streamline",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
        text: "The 3D animations Michael built for us became a talking point at every investor demo. Clients always ask who made the website.",
        rating: 5,
    },
    {
        name: "Lucas Mendes",
        role: "Engineering Manager, Volta",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
        text: "Exceptional craft and communication. Michael proactively caught architecture issues before they became problems. Exactly what a senior engineer should be.",
        rating: 5,
    },
];

export function Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";

    const rawItems = props?.items;
    const items = Array.isArray(rawItems) && rawItems.length > 0 ? rawItems : DEFAULT_ITEMS;

    const [ready, setReady] = useState(false);
    const [active, setActive] = useState(0);
    const [dir, setDir] = useState(1); // 1 = forward, -1 = back
    useEffect(() => setReady(true), []);

    const canvasRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: canvasRef, offset: ["start end", "end start"] });
    const ringX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

    const go = (delta: number) => {
        setDir(delta);
        setActive((prev) => (prev + delta + items.length) % items.length);
    };

    const item = items[active];

    const variants = {
        enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60, scale: 0.96 }),
        center: { opacity: 1, x: 0, scale: 1 },
        exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60, scale: 0.96 }),
    };

    return (
        <section
            id="testimonials"
            className="relative w-full overflow-hidden py-28 md:py-40"
            style={{ background: `linear-gradient(180deg, ${bg}, ${bgSecond})`, color: ink }}
        >
            {/* Ambient glow */}
            <div
                className="pointer-events-none absolute right-0 top-1/3 h-[50vw] max-h-[600px] w-[50vw] max-w-[600px] rounded-full blur-[140px]"
                style={{ background: `${accent}18` }}
            />

            <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
                {/* Section header */}
                <div className="mb-20 grid gap-6 lg:grid-cols-12">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] lg:col-span-3" style={{ color: inkSecond }}>
                        <span className="h-px w-10" style={{ background: accent }} />
                        <Editable as="span" value={props?.eyebrow || "Testimonials"} onChange={(v: string) => onChange?.({ eyebrow: v })} />
                    </div>
                    <h2 className="text-[clamp(2.6rem,6.5vw,6.8rem)] font-black leading-[0.92] tracking-[-0.05em] lg:col-span-9">
                        <Editable as="span" value={props?.title || "Words from\ncollaborators."} onChange={(v: string) => onChange?.({ title: v })} />
                    </h2>
                </div>

                {/* Main testimonial layout */}
                <div className="grid items-center gap-12 lg:grid-cols-[1fr_440px]">
                    {/* LEFT: big quote card */}
                    <div className="relative">
                        {/* Quote icon */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-8 flex h-14 w-14 items-center justify-center rounded-full"
                            style={{ background: accent, color: bg }}
                        >
                            <Quote size={24} />
                        </motion.div>

                        {/* Animated quote text */}
                        <AnimatePresence mode="wait" custom={dir}>
                            <motion.blockquote
                                key={active}
                                custom={dir}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                className="text-[clamp(1.5rem,3.5vw,3.2rem)] font-semibold leading-[1.12] tracking-[-0.03em]"
                            >
                                <Editable
                                    as="span"
                                    value={item?.text || ""}
                                    onChange={(v: string) => onChange?.({ items: items.map((x: any, j: number) => (j === active ? { ...x, text: v } : x)) })}
                                />
                            </motion.blockquote>
                        </AnimatePresence>

                        {/* Stars */}
                        <div className="mt-6 flex gap-1">
                            {Array.from({ length: item?.rating ?? 5 }).map((_, i) => (
                                <Star key={i} size={16} fill={accent} style={{ color: accent }} />
                            ))}
                        </div>

                        {/* Author */}
                        <AnimatePresence mode="wait" custom={dir}>
                            <motion.div
                                key={`author-${active}`}
                                custom={dir}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                                className="mt-8 flex items-center gap-4"
                            >
                                <img
                                    src={item?.avatar || ""}
                                    alt={item?.name}
                                    className="h-12 w-12 rounded-full object-cover"
                                    style={{ border: `2px solid ${accent}` }}
                                />
                                <div>
                                    <div className="text-base font-semibold">{item?.name}</div>
                                    <div className="text-sm" style={{ color: inkSecond }}>{item?.role}</div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="mt-10 flex items-center gap-4">
                            <button
                                onClick={() => go(-1)}
                                className="flex h-12 w-12 items-center justify-center rounded-full border transition-all hover:scale-[1.05] active:scale-95"
                                style={{ borderColor: surface, color: ink }}
                                aria-label="Previous"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => go(1)}
                                className="flex h-12 w-12 items-center justify-center rounded-full transition-all hover:scale-[1.05] active:scale-95"
                                style={{ background: accent, color: bg }}
                                aria-label="Next"
                            >
                                <ChevronRight size={20} />
                            </button>
                            <span className="ml-3 text-sm tabular-nums" style={{ color: inkSecond }}>
                                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                            </span>

                            {/* Progress dots */}
                            <div className="ml-auto flex gap-2">
                                {items.map((_: any, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => { setDir(i > active ? 1 : -1); setActive(i); }}
                                        aria-label={`Go to ${i + 1}`}
                                        className="rounded-full transition-all duration-300"
                                        style={{
                                            width: i === active ? 28 : 8,
                                            height: 8,
                                            background: i === active ? accent : surface,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: 3D ring canvas + small card grid */}
                    <div ref={canvasRef} className="relative">
                        {/* 3D ring */}
                        {ready && (
                            <motion.div style={{ x: ringX }} className="h-[360px] w-full md:h-[420px]">
                                <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 5], fov: 38 }} gl={{ alpha: true }}>
                                    <ambientLight intensity={0.7} />
                                    <directionalLight position={[3, 4, 4]} intensity={2.5} />
                                    <pointLight position={[-3, -2, 3]} intensity={30} color={accent} />
                                    <Environment preset="city" />
                                    <SpinRing accent={accent} ink={ink} />
                                </Canvas>
                            </motion.div>
                        )}

                        {/* Mini testimonial cards stacked */}
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            {items.slice(0, 4).map((t: any, i: number) => (
                                <motion.button
                                    key={i}
                                    onClick={() => { setDir(i > active ? 1 : -1); setActive(i); }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07 }}
                                    className="group relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-300"
                                    style={{
                                        background: i === active ? `${accent}18` : surface,
                                        border: `1px solid ${i === active ? accent : "transparent"}`,
                                        outline: "none",
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <img src={t.avatar} alt={t.name} className="h-7 w-7 rounded-full object-cover" />
                                        <span className="text-xs font-semibold truncate">{t.name}</span>
                                    </div>
                                    <p className="line-clamp-2 text-[11px] leading-snug" style={{ color: inkSecond }}>
                                        {t.text}
                                    </p>
                                    {i === active && (
                                        <motion.div
                                            layoutId="active-indicator"
                                            className="absolute left-0 top-0 h-full w-0.5 rounded-full"
                                            style={{ background: accent }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const DeveloperPortfolio5Testimonials = Testimonials;
export default Testimonials;
