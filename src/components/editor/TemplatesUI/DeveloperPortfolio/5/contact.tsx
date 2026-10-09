// @ts-nocheck
"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Zap, ShieldCheck } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Editable } from "@/components/editor/ui/Editable";

function Orb({ ink, accent }: any) {
    const g = useRef<any>(null);
    useFrame((s, d) => {
        if (!g.current) return;
        g.current.rotation.y += (s.pointer.x * 1.2 - g.current.rotation.y) * 0.04 + d * 0.15;
        g.current.rotation.x += (-s.pointer.y * 0.8 - g.current.rotation.x) * 0.04;
    });
    return (
        <Float speed={1.6} floatIntensity={1}>
            <group ref={g}>
                <mesh>
                    <icosahedronGeometry args={[1.9, 2]} />
                    <meshBasicMaterial wireframe color={ink} transparent opacity={0.55} />
                </mesh>
                <mesh>
                    <sphereGeometry args={[1.15, 64, 64]} />
                    <MeshDistortMaterial color={accent} roughness={0.2} metalness={0.9} distort={0.35} speed={2.2} />
                </mesh>
            </group>
        </Float>
    );
}

export function Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";

    const ref = useRef<HTMLElement>(null);
    const [ready, setReady] = useState(false);
    useEffect(() => setReady(true), []);

    const icons = [Phone, Mail, MapPin, Clock];
    const info = props?.info || [
        { label: "Phone", value: "+1 (555) 014-2290" },
        { label: "Email", value: "hello@michael.dev" },
        { label: "Address", value: "21 Maple Street, Austin, TX 78701" },
        { label: "Hours", value: "Mon\u2013Fri, 9:00 AM \u2013 6:00 PM" },
    ];
    const badges = props?.badges || ["Replies within 24h", "NDA friendly"];
    const set = (i: number, k: string, v: string) =>
        onChange?.({ info: info.map((x: any, j: number) => (j === i ? { ...x, [k]: v } : x)) });

    return (
        <section id="contact" ref={ref} className="relative w-full overflow-hidden py-28 md:py-40" style={{ background: `linear-gradient(180deg, ${bgSecond}, ${bg})`, color: ink }}>
            {ready && (
                <div className="pointer-events-none absolute inset-y-0 right-[-10%] z-0 w-[80%] md:right-0 md:w-[55%]">
                    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6], fov: 40 }} gl={{ alpha: true, antialias: true }} eventSource={ref} eventPrefix="client">
                        <ambientLight intensity={0.7} />
                        <directionalLight position={[3, 4, 5]} intensity={2.6} />
                        <pointLight position={[-3, -2, 3]} intensity={25} color={ink} />
                        <Orb ink={ink} accent={accent} />
                    </Canvas>
                </div>
            )}

            <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10">
                <div className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.25em]" style={{ color: inkSecond }}>
                    <span className="h-px w-10" style={{ background: inkSecond }} />
                    <Editable as="span" value={props?.eyebrow || "Contact"} onChange={(v: string) => onChange?.({ eyebrow: v })} />
                </div>

                <h2 className="max-w-4xl text-[clamp(3rem,9.5vw,10rem)] font-black leading-[0.88] tracking-[-0.06em]">
                    <Editable as="span" value={props?.title || "Let's build something great."} onChange={(v: string) => onChange?.({ title: v })} />
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed" style={{ color: inkSecond }}>
                    <Editable as="span" value={props?.subtitle || "Have a project, an idea or a role in mind? Reach out and I'll reply fast."} onChange={(v: string) => onChange?.({ subtitle: v })} />
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                    {badges.map((b: string, i: number) => (
                        <span key={i} className="flex items-center gap-2 rounded-full px-4 py-2 text-xs backdrop-blur-md" style={{ background: surface, border: `1px solid ${surface}` }}>
                            {i % 2 === 0 ? <Zap size={13} /> : <ShieldCheck size={13} />}
                            <Editable as="span" value={b} onChange={(v: string) => onChange?.({ badges: badges.map((x: string, j: number) => (j === i ? v : x)) })} />
                        </span>
                    ))}
                </div>

                <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-4" style={{ borderTop: `1px solid ${surface}` }}>
                    {info.map((c: any, i: number) => {
                        const Icon = icons[i % icons.length];
                        return (
                            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }} className="group py-8 transition-transform hover:-translate-y-1 sm:pr-6" style={{ borderLeft: i > 0 ? `1px solid ${surface}` : "none", paddingLeft: i > 0 ? 24 : 0 }}>
                                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-12" style={{ background: accent, color: ink }}>
                                    <Icon size={18} />
                                </span>
                                <div className="text-[11px] uppercase tracking-[0.2em]" style={{ color: inkSecond }}>
                                    <Editable as="span" value={c.label} onChange={(v: string) => set(i, "label", v)} />
                                </div>
                                <div className="mt-1.5 break-words text-lg font-medium">
                                    <Editable as="span" value={c.value} onChange={(v: string) => set(i, "value", v)} />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
export const DeveloperPortfolio5Contact = Contact;
export default Contact;
