// @ts-nocheck
import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#07060B";
    const bgSecond = theme?.["bg-second"] || "#0F0C14";
    const ink = theme?.ink || "#FFFFFF";
    const inkSecond = theme?.["ink-second"] || "#D6D0E0";
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#F5B335";

    const email = props?.email || "hello@zayanmalik.dev";
    const phone = props?.phone || "+1 (555) 014-2290";
    const whatsapp = props?.whatsapp || phone;
    const location = props?.location || "Austin, TX · Worldwide Remote";
    const status = props?.status || "Available for Q3 & Q4 engagements";
    const statValue = props?.statValue || "24h";
    const statLabel = props?.statLabel || "Average\nreply\ntime";

    const waDigits = String(whatsapp).replace(/\D/g, "");
    const waLink = `https://wa.me/${waDigits}?text=${encodeURIComponent("Hi, I'd like to discuss a project.")}`;

    // Layout follows the width of this section, so it also works in a narrow editor canvas.
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
    const twoCol = w === 0 || w >= 720;

    const ease = [0.16, 1, 0.3, 1];

    // Big icon + big label + small value, exactly one pattern for Call and WhatsApp
    const Channel = ({ href, icon: Icon, label, external, children }: any) => (
        <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="group/ch flex items-center gap-5 transition-transform duration-300 hover:translate-x-1"
        >
            <Icon className="h-12 w-12 shrink-0 md:h-14 md:w-14" style={{ color: ink }} strokeWidth={1.6} />
            <span className="min-w-0">
                <span
                    className="block text-2xl font-light uppercase tracking-wide transition-opacity duration-300 group-hover/ch:opacity-80 md:text-3xl"
                    style={{ color: accent }}
                >
                    {label}
                </span>
                <span className="mt-1 block truncate text-sm md:text-base" style={{ color: ink }}>
                    {children}
                </span>
            </span>
        </a>
    );

    return (
        <section id="contact" className="relative w-full overflow-hidden py-24 md:py-32" style={{ backgroundColor: bgSecond, color: ink }}>
            <div className="relative mx-auto max-w-6xl px-5 md:px-8">
                <div
                    ref={wrapRef}
                    className="grid items-stretch"
                    style={{ gridTemplateColumns: twoCol ? "1.1fr 1fr" : "1fr", gap: twoCol ? 80 : 56 }}
                >
                    {/* LEFT: plain text */}
                    <div className="flex flex-col justify-center">
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
                            <Editable value={props?.eyebrow || "Contact"} onChange={(v) => onChange?.({ eyebrow: v })} />
                        </motion.p>

                        <div className="mt-5 overflow-hidden pb-2">
                            <motion.h2
                                initial={{ y: "105%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.9, ease }}
                                className="font-serif text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl"
                                style={{ color: ink }}
                            >
                                <Editable value={props?.title || "Let's build something remarkable."} onChange={(v) => onChange?.({ title: v })} />
                            </motion.h2>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, ease, delay: 0.15 }}
                            className="mt-6 max-w-md text-base leading-relaxed md:text-lg"
                            style={{ color: inkSecond }}
                        >
                            <Editable
                                value={props?.description || "Have a project in mind? Call me, message me on WhatsApp or send an email. I answer every message myself, usually within a day."}
                                onChange={(v) => onChange?.({ description: v })}
                            />
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.7, ease, delay: 0.25 }}
                            className="mt-10 space-y-4"
                        >
                            <a
                                href={`mailto:${email}`}
                                className="group/em flex items-center gap-3 transition-colors duration-300 hover:text-[color:var(--em)]"
                                style={{ color: ink, "--em": accent }}
                            >
                                <Mail className="h-5 w-5 shrink-0" style={{ color: accent }} />
                                <span className="break-all font-serif text-lg font-bold md:text-xl">
                                    <Editable value={email} onChange={(v) => onChange?.({ email: v })} />
                                </span>
                            </a>
                            <p className="flex items-center gap-3" style={{ color: inkSecond }}>
                                <MapPin className="h-5 w-5 shrink-0" style={{ color: accent }} />
                                <span className="text-base">
                                    <Editable value={location} onChange={(v) => onChange?.({ location: v })} />
                                </span>
                            </p>
                            <p className="flex items-center gap-3 pt-2 font-mono text-xs" style={{ color: inkSecond }}>
                                <span className="relative flex h-2 w-2 shrink-0">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: accent }} />
                                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                                </span>
                                <Editable value={status} onChange={(v) => onChange?.({ status: v })} />
                            </p>
                        </motion.div>
                    </div>

                    {/* RIGHT: tinted panel, same structure as the reference */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.8, ease, delay: 0.1 }}
                            className="relative flex h-full min-h-[420px] flex-col justify-between p-8 md:p-12"
                            style={{ backgroundColor: `color-mix(in srgb, ${accent} 9%, ${bg})` }}
                        >
                            {/* dotted square that overlaps the panel's corner */}
                            <motion.span
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease, delay: 0.3 }}
                                className="pointer-events-none absolute -left-6 top-6 h-36 w-36 border-2 border-dotted md:h-44 md:w-44"
                                style={{ borderColor: inkSecond, opacity: 0.45 }}
                            />

                            {/* top: big number + label */}
                            <div className="relative flex items-start gap-4">
                                <span className="font-serif text-8xl font-bold leading-none md:text-9xl" style={{ color: accent }}>
                                    <Editable value={statValue} onChange={(v) => onChange?.({ statValue: v })} />
                                </span>
                                <span
                                    className="whitespace-pre-line pt-2 font-serif text-xl font-bold leading-snug md:pt-3 md:text-2xl"
                                    style={{ color: ink }}
                                >
                                    <Editable value={statLabel} onChange={(v) => onChange?.({ statLabel: v })} />
                                </span>
                            </div>

                            {/* bottom: call + whatsapp */}
                            <div className="relative mt-16 space-y-8">
                                <Channel href={`tel:${phone}`} icon={Phone} label="Call now">
                                    <Editable value={phone} onChange={(v) => onChange?.({ phone: v })} />
                                </Channel>
                                <Channel href={waLink} icon={MessageCircle} label="WhatsApp" external>
                                    <Editable value={whatsapp} onChange={(v) => onChange?.({ whatsapp: v })} />
                                </Channel>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}