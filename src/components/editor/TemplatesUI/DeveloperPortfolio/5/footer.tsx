// @ts-nocheck
"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { Editable } from "@/components/editor/ui/Editable";

// Subtle 3D accent shape
function FooterOrb({ accent }: any) {
    const ref = useRef<any>(null);
    useFrame((s) => {
        if (!ref.current) return;
        ref.current.rotation.y = s.clock.elapsedTime * 0.3;
        ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.2) * 0.2;
    });
    return (
        <Float speed={1.5} floatIntensity={0.8}>
            <mesh ref={ref}>
                <icosahedronGeometry args={[1, 3]} />
                <MeshDistortMaterial color={accent} roughness={0.08} metalness={0.95} distort={0.25} speed={1.5} />
            </mesh>
        </Float>
    );
}

export function Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0C0C0E";
    const ink = theme?.ink || "#F4F0FF";
    const inkSecond = theme?.["ink-second"] || "#9490A8";
    const surface = theme?.surface || "rgba(255,255,255,0.07)";
    const accent = theme?.accent || "#F2541B";

    const [ready, setReady] = useState(false);
    useEffect(() => setReady(true), []);

    const rootRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start end", "end end"] });
    const bigY = useTransform(scrollYProgress, [0, 1], ["8%", "0%"]);
    const bigOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

    const navLinks = [
        { label: "About", href: "#about" },
        { label: "Work", href: "#projects" },
        { label: "Services", href: "#services" },
        { label: "Reviews", href: "#testimonials" },
        { label: "Contact", href: "#contact" },
    ];

    const email = props?.email || "hello@michael.dev";
    const year = new Date().getFullYear();

    return (
        <footer
            ref={rootRef}
            id="footer"
            className="relative w-full overflow-hidden"
            style={{ background: bg, color: ink }}
        >
            {/* Top border line */}
            <div className="h-px w-full" style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }} />

            {/* Main content */}
            <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10">

                {/* CTA Block */}
                <div className="grid items-center gap-10 py-20 md:py-28 lg:grid-cols-[1fr_auto]">
                    <div>
                        <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: accent }}>
                            <Editable as="span" value={props?.ctaEyebrow || "Let's work together"} onChange={(v: string) => onChange?.({ ctaEyebrow: v })} />
                        </p>
                        <h2
                            className="font-black leading-[0.9] tracking-[-0.06em]"
                            style={{ fontSize: "clamp(3.5rem,10vw,10rem)" }}
                        >
                            <Editable as="span" value={props?.ctaTitle || "Start a project."} onChange={(v: string) => onChange?.({ ctaTitle: v })} />
                        </h2>
                    </div>

                    <div className="flex shrink-0 flex-col items-start gap-5 lg:items-end">
                        <a
                            href={`mailto:${email}`}
                            className="group flex items-center gap-3 text-lg font-medium transition-all duration-300 hover:opacity-70 md:text-2xl"
                        >
                            <Editable as="span" value={email} onChange={(v: string) => onChange?.({ email: v })} />
                            <span
                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:rotate-45 group-hover:scale-110"
                                style={{ background: accent, color: bg }}
                            >
                                <ArrowUpRight size={20} />
                            </span>
                        </a>

                        {/* 3D orb */}
                        {ready && (
                            <div className="h-32 w-32">
                                <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 4], fov: 40 }} gl={{ alpha: true }}>
                                    <ambientLight intensity={0.6} />
                                    <directionalLight position={[4, 5, 4]} intensity={2.5} />
                                    <pointLight position={[-3, -2, 2]} intensity={20} color={accent} />
                                    <Environment preset="city" />
                                    <FooterOrb accent={accent} />
                                </Canvas>
                            </div>
                        )}
                    </div>
                </div>

                {/* Nav row */}
                <div
                    className="flex flex-wrap items-center justify-between gap-6 border-t py-8"
                    style={{ borderColor: surface }}
                >
                    {/* Name / brand */}
                    <span className="text-sm font-semibold tracking-tight">
                        <Editable as="span" value={props?.brand || "Michael"} onChange={(v: string) => onChange?.({ brand: v })} />
                    </span>

                    {/* Links */}
                    <nav className="flex flex-wrap gap-6 md:gap-8">
                        {navLinks.map((l, i) => (
                            <a
                                key={i}
                                href={l.href}
                                className="text-xs uppercase tracking-[0.2em] transition-opacity duration-200 hover:opacity-100"
                                style={{ color: inkSecond, opacity: 0.7 }}
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>

                    {/* Year */}
                    <span className="text-xs" style={{ color: inkSecond }}>
                        <Editable as="span" value={props?.copyright || `\u00a9 ${year}`} onChange={(v: string) => onChange?.({ copyright: v })} />
                    </span>
                </div>
            </div>

            {/* Giant ghost text — mask fades it toward bottom */}
            <motion.div
                style={{ y: bigY, opacity: bigOpacity }}
                className="pointer-events-none select-none overflow-hidden whitespace-nowrap text-center font-black leading-[0.75] tracking-[-0.07em]"
                style={{
                    fontSize: "clamp(5rem,24vw,28rem)",
                    color: inkSecond,
                    opacity: 0.06,
                    WebkitMaskImage: "linear-gradient(to bottom, #000 30%, transparent 100%)",
                    maskImage: "linear-gradient(to bottom, #000 30%, transparent 100%)",
                }}
            >
                <Editable as="span" value={props?.bigText || "MICHAEL"} onChange={(v: string) => onChange?.({ bigText: v })} />
            </motion.div>
        </footer>
    );
}

export const DeveloperPortfolio5Footer = Footer;
export default Footer;