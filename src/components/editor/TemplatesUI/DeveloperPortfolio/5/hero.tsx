// @ts-nocheck
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshTransmissionMaterial, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Editable } from "@/components/editor/ui/Editable";

// ─── 3D SCENE ────────────────────────────────────────────────────────────────

function Particles({ count = 350, accent }: any) {
    const ref = useRef<any>(null);
    const pos = useRef<Float32Array>(new Float32Array(count * 3));
    const vel = useRef<Float32Array>(new Float32Array(count));
    useEffect(() => {
        for (let i = 0; i < count; i++) {
            pos.current[i * 3] = (Math.random() - 0.5) * 18;
            pos.current[i * 3 + 1] = (Math.random() - 0.5) * 18;
            pos.current[i * 3 + 2] = (Math.random() - 0.5) * 8;
            vel.current[i] = 0.008 + Math.random() * 0.012;
        }
    }, []);
    useFrame(() => {
        if (!ref.current) return;
        for (let i = 0; i < count; i++) {
            pos.current[i * 3 + 1] += vel.current[i];
            if (pos.current[i * 3 + 1] > 9) pos.current[i * 3 + 1] = -9;
        }
        ref.current.geometry.attributes.position.needsUpdate = true;
    });
    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={pos.current} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.03} color={accent} transparent opacity={0.55} sizeAttenuation />
        </points>
    );
}

function MainKnot({ accent, ink, pointer }: any) {
    const mesh = useRef<any>(null);
    useFrame((s) => {
        if (!mesh.current) return;
        mesh.current.rotation.y = s.clock.elapsedTime * 0.18;
        mesh.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.12) * 0.25;
        // pointer tracking
        mesh.current.position.x += (s.pointer.x * 1.2 - mesh.current.position.x) * 0.05;
        mesh.current.position.y += (s.pointer.y * 0.8 - mesh.current.position.y) * 0.05;
    });
    return (
        <Float speed={1.2} floatIntensity={0.5} rotationIntensity={0.15}>
            <mesh ref={mesh}>
                <torusKnotGeometry args={[1.3, 0.42, 280, 32, 2, 3]} />
                <MeshTransmissionMaterial
                    backside
                    samples={8}
                    resolution={512}
                    transmission={1}
                    roughness={0.03}
                    thickness={1.2}
                    ior={1.75}
                    chromaticAberration={0.08}
                    color={accent}
                    toneMapped={false}
                />
            </mesh>
        </Float>
    );
}

function Rings({ accent, ink }: any) {
    const r1 = useRef<any>(null);
    const r2 = useRef<any>(null);
    const r3 = useRef<any>(null);
    useFrame((s) => {
        const t = s.clock.elapsedTime;
        if (r1.current) { r1.current.rotation.z = t * 0.2; r1.current.rotation.x = t * 0.08; }
        if (r2.current) { r2.current.rotation.x = t * -0.15; r2.current.rotation.y = t * 0.25; }
        if (r3.current) { r3.current.rotation.y = t * 0.3; r3.current.rotation.z = t * -0.1; }
    });
    return (
        <>
            <mesh ref={r1} scale={2.6}>
                <torusGeometry args={[1, 0.008, 16, 120]} />
                <meshBasicMaterial color={accent} transparent opacity={0.35} />
            </mesh>
            <mesh ref={r2} scale={3.4}>
                <torusGeometry args={[1, 0.005, 16, 100]} />
                <meshBasicMaterial color={ink} transparent opacity={0.12} />
            </mesh>
            <mesh ref={r3} scale={4.2}>
                <torusGeometry args={[1, 0.004, 16, 100]} />
                <meshBasicMaterial color={accent} transparent opacity={0.08} />
            </mesh>
        </>
    );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
export function Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0C0C0E";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#F4F0FF";
    const inkSecond = theme?.["ink-second"] || "#9490A8";
    const surface = theme?.surface || "rgba(255,255,255,0.07)";
    const accent = theme?.accent || "#F2541B";

    const sectionRef = useRef<HTMLElement>(null);
    const [ready, setReady] = useState(false);
    useEffect(() => setReady(true), []);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
    const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const canvasOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const name = props?.name || "MICHAEL";
    const stats = props?.stats || [
        { value: "40+", label: "Projects" },
        { value: "6 yrs", label: "Experience" },
        { value: "12", label: "Clients" },
    ];
    const setStat = (i: number, k: string, v: string) =>
        onChange?.({ stats: stats.map((s: any, j: number) => (j === i ? { ...s, [k]: v } : s)) });

    return (
        <section
            id="top"
            ref={sectionRef}
            className="relative min-h-[100svh] w-full overflow-hidden"
            style={{ background: `linear-gradient(155deg, ${bg} 0%, color-mix(in srgb, ${bgSecond} 85%, ${bg}) 100%)`, color: ink }}
        >
            {/* Soft radial glow behind 3D */}
            <div
                className="pointer-events-none absolute right-0 top-0 h-full w-[55%] opacity-60"
                style={{ background: `radial-gradient(ellipse at 70% 40%, ${accent}22 0%, transparent 70%)` }}
            />

            {/* 3D canvas — right-side positioned */}
            {ready && (
                <motion.div
                    style={{ opacity: canvasOpacity }}
                    className="pointer-events-none absolute inset-y-0 right-0 z-10 w-full md:w-[55%]"
                >
                    <Canvas
                        dpr={[1, 1.8]}
                        camera={{ position: [0, 0, 7], fov: 40 }}
                        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
                        eventSource={sectionRef}
                        eventPrefix="client"
                    >
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 7, 5]} intensity={3.5} />
                        <pointLight position={[-4, -3, 4]} intensity={50} color={accent} />
                        <spotLight position={[0, 10, 3]} intensity={80} angle={0.35} penumbra={1} color={ink} />
                        <Environment preset="city" />
                        <Particles count={320} accent={accent} />
                        <Rings accent={accent} ink={ink} />
                        <MainKnot accent={accent} ink={ink} />
                    </Canvas>
                </motion.div>
            )}

            {/* Content — always on top with proper z-index */}
            <div className="relative z-20 mx-auto grid min-h-[100svh] max-w-[1400px] grid-rows-[1fr_auto] px-6 pb-10 pt-24 md:px-10 md:pt-28">
                {/* Main content block */}
                <motion.div style={{ y: textY }} className="flex flex-col justify-center">
                    {/* Small role label */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        className="mb-6 flex items-center gap-3"
                    >
                        <span className="h-px w-12" style={{ background: accent }} />
                        <span className="text-xs uppercase tracking-[0.3em]" style={{ color: accent }}>
                            <Editable as="span" value={props?.role || "Full-Stack Developer & Engineer"} onChange={(v: string) => onChange?.({ role: v })} />
                        </span>
                    </motion.div>

                    {/* Giant headline */}
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "105%" }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                            className="font-black leading-[0.86] tracking-[-0.06em]"
                            style={{ fontSize: "clamp(4rem,11vw,12rem)", color: ink, maxWidth: "10ch" }}
                        >
                            <Editable as="span" value={props?.headline || "Building Digital Edge"} onChange={(v: string) => onChange?.({ headline: v })} />
                        </motion.h1>
                    </div>

                    {/* Sub + CTAs row */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65, duration: 0.8 }}
                        className="mt-8 flex max-w-lg flex-col gap-6 md:flex-row md:items-end"
                    >
                        <p className="flex-1 text-base leading-relaxed md:text-lg" style={{ color: inkSecond }}>
                            <Editable
                                as="span"
                                value={props?.subheadline || "Building fast, expressive digital products for startups and brands that last."}
                                onChange={(v: string) => onChange?.({ subheadline: v })}
                            />
                        </p>
                        <div className="flex shrink-0 flex-wrap gap-3">
                            <a
                                href="#projects"
                                className="group flex items-center gap-2.5 rounded-full px-7 py-4 text-sm font-semibold transition-all duration-300 hover:scale-[1.04] active:scale-95"
                                style={{ background: accent, color: bg, boxShadow: `0 16px 48px -12px ${accent}80` }}
                            >
                                <Editable as="span" value={props?.primaryCta || "View work"} onChange={(v: string) => onChange?.({ primaryCta: v })} />
                                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                            <a
                                href="#contact"
                                className="flex items-center gap-2 rounded-full border px-7 py-4 text-sm font-medium transition-all duration-300 hover:scale-[1.04] active:scale-95"
                                style={{ borderColor: `${ink}20`, color: ink }}
                            >
                                <Editable as="span" value={props?.secondaryCta || "Let's talk"} onChange={(v: string) => onChange?.({ secondaryCta: v })} />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom row: name + stats */}
                <div className="flex items-end justify-between gap-6 pb-2">
                    {/* Big name */}
                    <div className="overflow-hidden">
                        <motion.div
                            initial={{ y: "105%" }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                            className="font-black leading-[0.9] tracking-[-0.07em] opacity-90"
                            style={{ fontSize: "clamp(3rem,12vw,13rem)", color: ink }}
                        >
                            <Editable as="span" value={name} onChange={(v: string) => onChange?.({ name: v })} />
                        </motion.div>
                    </div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.7 }}
                        className="hidden shrink-0 items-end gap-8 pb-1 md:flex"
                    >
                        {stats.map((s: any, i: number) => (
                            <div
                                key={i}
                                className="text-right"
                                style={i < stats.length - 1 ? { borderRight: `1px solid ${surface}`, paddingRight: 32 } : undefined}
                            >
                                <div className="text-3xl font-bold tracking-tight" style={{ color: ink }}>
                                    <Editable as="span" value={s.value} onChange={(v: string) => setStat(i, "value", v)} />
                                </div>
                                <div className="mt-0.5 text-[11px] uppercase tracking-wider" style={{ color: inkSecond }}>
                                    <Editable as="span" value={s.label} onChange={(v: string) => setStat(i, "label", v)} />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll line */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ opacity: { delay: 2 }, y: { delay: 2, duration: 2, repeat: Infinity } }}
                className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="h-10 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${ink}60)` }} />
            </motion.div>
        </section>
    );
}

export const DeveloperPortfolio5Hero = Hero;
export default Hero;