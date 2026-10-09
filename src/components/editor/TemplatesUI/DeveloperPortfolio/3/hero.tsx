// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, TerminalSquare } from "lucide-react";
import Typed from "typed.js";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#07060B";
    const bgSecond = theme?.["bg-second"] || "#0F0C14";
    const ink = theme?.ink || "#FFFFFF";
    const inkSecond = theme?.["ink-second"] || "#D6D0E0";
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#F5B335";

    const [booted, setBooted] = useState(false);
    const typedRef = useRef(null);

    useEffect(() => {
        const t = setTimeout(() => setBooted(true), 2300);
        return () => clearTimeout(t);
    }, []);

    // typed.js effect for typewriter title/role
    useEffect(() => {
        if (!booted || !typedRef.current) return;

        const defaultStrings = [
            "Innovating AI-powered digital platforms",
            "Senior Full-Stack & Systems Architect",
            "Building high-concurrency microservices",
            "Obsessed with micro-interactions & craft"
        ];

        const rawStrings = props?.typedStrings || props?.subheadline;
        const strings = Array.isArray(rawStrings) && rawStrings.length > 0
            ? rawStrings
            : typeof rawStrings === "string"
            ? [rawStrings, ...defaultStrings.slice(1)]
            : defaultStrings;

        const typed = new Typed(typedRef.current, {
            strings,
            typeSpeed: 40,
            backSpeed: 25,
            backDelay: 1800,
            startDelay: 300,
            loop: true,
            showCursor: true,
            cursorChar: "▋",
        });

        return () => {
            typed.destroy();
        };
    }, [booted, props?.typedStrings, props?.subheadline]);

    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rotX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 14 });
    const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 14 });
    const handleMove = (e: any) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const reset = () => {
        mx.set(0);
        my.set(0);
    };

    const rawChips = props?.chips;
    const chips = Array.isArray(rawChips) && rawChips.length > 0
        ? rawChips
        : ["React", "Node.js", "Python", "LLMs", "AWS", "Postgres"];

    const chipPos = [
        "-left-4 top-2 md:-left-12",
        "-right-4 top-0 md:-right-14",
        "-left-6 top-1/2 md:-left-16",
        "-right-6 top-1/2 md:-right-16",
        "left-2 bottom-0 md:-left-8",
        "right-2 -bottom-2 md:-right-10",
    ];

    const rawTerminal = props?.terminal;
    const terminal = Array.isArray(rawTerminal) && rawTerminal.length > 0
        ? rawTerminal
        : [
            "> npm run build:future",
            "✓ 42 products shipped across 6 years",
            "✓ Now building: an AI agent platform for ops teams",
        ];

    const rawStats = props?.stats;
    const stats = Array.isArray(rawStats) && rawStats.length > 0
        ? rawStats
        : [
            { value: "6+", label: "Years shipping" },
            { value: "42", label: "Projects live" },
            { value: "18k", label: "Users served" },
        ];

    return (
        <section
            id="home"
            onMouseMove={handleMove}
            onMouseLeave={reset}
            className="relative flex min-h-screen w-full flex-col items-center justify-center px-5 py-24 md:py-32 md:px-8"
            style={{ backgroundColor: bg, color: ink, overflowX: "clip" }}
        >
            {/* Background layers */}
            <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: bg }}>
                {/* city background */}
                <motion.img
                    src={props?.bgImage || "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1800&q=80"}
                    alt=""
                    initial={{ scale: 1.25 }}
                    animate={{ scale: 1.05 }}
                    transition={{ duration: 14, ease: "easeOut" }}
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
                <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to bottom, color-mix(in srgb, ${bg} 55%, transparent), transparent 30%, ${bg})` }}
                />

                {/* hex grid */}
                <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden="true">
                    <defs>
                        <pattern id="hexgrid-1" width="56" height="100" patternUnits="userSpaceOnUse">
                            <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke={accent} strokeWidth="0.6" />
                            <path d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34" fill="none" stroke={inkSecond} strokeWidth="0.3" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hexgrid-1)" />
                </svg>

                {/* glow, parked behind the avatar side */}
                <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute right-[10%] top-1/3 h-[28rem] w-[28rem] rounded-full blur-3xl"
                    style={{ backgroundColor: accent }}
                />
            </div>

            {/* BOOT OVERLAY (plays on load) */}
            <AnimatePresence>
                {!booted && (
                    <motion.div
                        key="boot"
                        initial={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                        className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-6"
                        style={{ backgroundColor: bg }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="flex h-16 w-16 items-center justify-center rounded-2xl"
                            style={{ backgroundColor: accent, color: bg }}
                        >
                            <TerminalSquare className="h-8 w-8" />
                        </motion.div>
                        <p className="font-mono text-sm tracking-[0.3em]" style={{ color: inkSecond }}>
                            <Editable value={props?.bootText || "BOOTING PORTFOLIO"} onChange={(v) => onChange?.({ bootText: v })} />
                        </p>
                        <div className="h-1 w-56 overflow-hidden rounded-full" style={{ backgroundColor: surface }}>
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: accent }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* content: text on the left, avatar on the right, stats strip underneath */}
            <div className="relative z-10 w-full max-w-6xl">
                <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
                    {/* LEFT: text */}
                    <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            className="text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl xl:text-8xl"
                            style={{ color: ink }}
                        >
                            <Editable value={props?.headline || "Zayan Malik"} onChange={(v) => onChange?.({ headline: v })} />
                        </motion.h1>

                        {/* typed.js animated typewriter role / subheadline */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.8, duration: 0.8 }}
                            className="mt-5 flex min-h-[2.5rem] items-center text-base font-mono md:text-xl"
                            style={{ color: accent }}
                        >
                            <span className="mr-2 opacity-60" style={{ color: inkSecond }}>&gt;</span>
                            <span ref={typedRef} />
                        </motion.div>

                        {/* terminal / companion bar */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 3, duration: 0.7 }}
                            className="mt-8 w-full max-w-xl rounded-2xl border p-4 text-left font-mono text-xs backdrop-blur-xl md:text-sm"
                            style={{ backgroundColor: surface, borderColor: surface }}
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <div className="flex gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
                                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: inkSecond }} />
                                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: surface }} />
                                </div>
                                <a
                                    href="#projects"
                                    aria-label="Jump to projects"
                                    className="flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 hover:scale-[1.02] active:scale-95"
                                    style={{ backgroundColor: accent, color: bg }}
                                >
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                            </div>
                            <div className="space-y-1.5" style={{ color: inkSecond }}>
                                {terminal.map((line: string, i: number) => (
                                    <motion.p
                                        key={i}
                                        initial={{ opacity: 0, x: -14 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 3.3 + i * 0.5 }}
                                    >
                                        <Editable value={line} onChange={(v) => onChange?.({ terminal: terminal.map((x: string, k: number) => (k === i ? v : x)) })} />
                                    </motion.p>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 3.4 }}
                            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
                        >
                            <a
                                href="#projects"
                                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-transform duration-300 hover:scale-[1.02] active:scale-95"
                                style={{ backgroundColor: accent, color: bg }}
                            >
                                <Editable value={props?.secondaryCta || "View my work"} onChange={(v) => onChange?.({ secondaryCta: v })} />
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </motion.div>
                    </div>

                    {/* RIGHT: avatar with floating chips */}
                    <div className="flex justify-center lg:col-span-5">
                        <motion.div
                            initial={{ scale: 0, rotate: -90, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            transition={{ delay: 2.4, type: "spring", stiffness: 120, damping: 14 }}
                            className="relative h-60 w-60 md:h-72 md:w-72 xl:h-80 xl:w-80"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-2 rounded-full"
                                style={{ background: `conic-gradient(from 0deg, ${accent}, transparent 40%, ${accent} 70%, transparent)` }}
                            />
                            <motion.div
                                style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 800 }}
                                className="group relative h-full w-full overflow-hidden rounded-full border-4"
                            >
                                <img
                                    src={props?.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&q=80"}
                                    alt="Portrait"
                                    className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-110"
                                />
                                <img
                                    src={props?.avatarHover || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80"}
                                    alt="Portrait alternate"
                                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                />
                            </motion.div>

                            {chips.map((c: string, i: number) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                                    transition={{
                                        opacity: { delay: 2.8 + i * 0.12 },
                                        scale: { delay: 2.8 + i * 0.12, type: "spring" },
                                        y: { delay: 3, duration: 3.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
                                    }}
                                    whileHover={{ scale: 1.15, rotate: -4 }}
                                    className={`absolute ${chipPos[i % chipPos.length]} cursor-default rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-md`}
                                    style={{ backgroundColor: surface, borderColor: accent, color: ink }}
                                >
                                    <Editable value={c} onChange={(v) => onChange?.({ chips: chips.map((x: string, k: number) => (k === i ? v : x)) })} />
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Stats: one horizontal strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.6 }}
                    className="mt-16 grid w-full grid-cols-3 border-t"
                    style={{ borderColor: surface }}
                >
                    {stats.map((s: any, i: number) => (
                        <div
                            key={i}
                            className="flex flex-col gap-1 px-2 py-6 text-center md:flex-row md:items-baseline md:justify-center md:gap-4 md:text-left"
                            style={i > 0 ? { borderLeft: `1px solid ${surface}` } : undefined}
                        >
                            <p className="font-serif text-3xl font-bold md:text-4xl" style={{ color: accent }}>
                                <Editable value={s.value} onChange={(v) => onChange?.({ stats: stats.map((x: any, k: number) => (k === i ? { ...x, value: v } : x)) })} />
                            </p>
                            <p className="text-[11px] uppercase tracking-widest md:text-xs" style={{ color: inkSecond }}>
                                <Editable value={s.label} onChange={(v) => onChange?.({ stats: stats.map((x: any, k: number) => (k === i ? { ...x, label: v } : x)) })} />
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>

            <motion.a
                href="#about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 8, 0] }}
                transition={{ opacity: { delay: 3.8 }, y: { delay: 3.8, duration: 1.6, repeat: Infinity } }}
                className="absolute bottom-6 z-10 flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.3em]"
                style={{ color: inkSecond }}
            >
                <Editable value={props?.scrollLabel || "Scroll"} onChange={(v) => onChange?.({ scrollLabel: v })} />
                <ChevronDown className="h-4 w-4" style={{ color: accent }} />
            </motion.a>
        </section>
    );
}

export const DeveloperPortfolio3Hero = Hero;
export default Hero;