// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";

    const defaultBio1 =
        "I'm a full-stack engineer focused on building fast, reliable, and accessible web applications. I care deeply about the intersection of thoughtful user experience and robust system architecture — writing code that is clean, well-tested, and easy for teams to maintain.";
    const defaultBio2 =
        "Over the past 6+ years, I've partnered with venture-backed startups and engineering teams to ship production-ready platforms, migrate legacy codebases, and optimize critical web infrastructure from day one.";
    const defaultBio3 =
        "When collaborating on a project, I believe in radical clarity, honest technical trade-offs, and taking full ownership from the first architectural sketch all the way to production monitoring.";

    const defaultStack = [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Tailwind CSS",
        "PostgreSQL",
        "GraphQL",
        "Docker",
        "AWS",
        "Redis",
        "Python",
        "Prisma",
        "Git",
        "Linux",
    ];

    const rawStack = props?.stack || props?.chips;
    const stack = Array.isArray(rawStack) && rawStack.length > 0 ? rawStack : defaultStack;

    const setStackItem = (index: number, val: string) => {
        const next = stack.map((s: string, i: number) => (i === index ? val : s));
        onChange?.({ stack: next, chips: next });
    };

    const fade = {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
    };

    return (
        <section id="about" className="relative overflow-hidden" style={{ background: bgSecond, borderTop: `1px solid ${surface}` }}>
            {/* Centered narrative text (Simple, pure text, no cards) */}
            <div className="mx-auto max-w-4xl px-5 pt-14 pb-12 text-center md:px-8 md:pt-20 md:pb-16">
                <motion.div {...fade} className="mb-8">
                    <p className="font-mono text-xs uppercase tracking-[0.3em] md:text-sm" style={{ color: inkSecond }}>
                        <Editable as="span" value={props?.eyebrow || "About me"} onChange={(v) => onChange?.({ eyebrow: v })} />
                    </p>
                    <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl" style={{ color: ink }}>
                        <Editable
                            as="span"
                            value={props?.title || "Crafting digital systems with clarity & discipline."}
                            onChange={(v) => onChange?.({ title: v })}
                        />
                    </h2>
                </motion.div>

                <motion.div {...fade} className="mx-auto max-w-3xl space-y-6 font-mono text-base md:text-lg leading-relaxed" style={{ color: inkSecond }}>
                    <p>
                        <Editable as="span" value={props?.bio1 || defaultBio1} onChange={(v) => onChange?.({ bio1: v })} />
                    </p>
                    <p>
                        <Editable as="span" value={props?.bio2 || defaultBio2} onChange={(v) => onChange?.({ bio2: v })} />
                    </p>
                    <p>
                        <Editable as="span" value={props?.bio3 || defaultBio3} onChange={(v) => onChange?.({ bio3: v })} />
                    </p>
                </motion.div>
            </div>

            {/* Big full-width spacer / marquee box for My Stack */}
            <div
                className="w-full py-10 md:py-16 overflow-hidden relative select-none"
                style={{
                    background: bg,
                    borderTop: `1px solid ${surface}`,
                    borderBottom: `1px solid ${surface}`,
                }}
            >
                {/* Subtle section label */}
                <div className="mb-6 text-center">
                    <span
                        className="inline-block rounded-full px-4 py-1 font-mono text-[10px] uppercase tracking-[0.25em]"
                        style={{ border: `1px solid ${surface}`, color: inkSecond }}
                    >
                        <Editable as="span" value={props?.stackTitle || "My Stack · Technologies & Tools"} onChange={(v) => onChange?.({ stackTitle: v })} />
                    </span>
                </div>

                {/* Infinite scrolling marquee track */}
                <div className="relative flex w-full overflow-hidden">
                    {/* Fade gradients on edges */}
                    <div
                        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 md:w-40"
                        style={{ background: `linear-gradient(to right, ${bg}, transparent)` }}
                    />
                    <div
                        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 md:w-40"
                        style={{ background: `linear-gradient(to left, ${bg}, transparent)` }}
                    />

                    {/* Scrolling container */}
                    <motion.div
                        className="flex whitespace-nowrap gap-4 md:gap-8 items-center"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                    >
                        {/* Duplicate list twice for seamless infinite scroll */}
                        {[...stack, ...stack].map((item: string, idx: number) => {
                            const realIdx = idx % stack.length;
                            return (
                                <div key={idx} className="flex items-center gap-4 md:gap-8">
                                    <span
                                        className="font-mono text-sm md:text-lg font-semibold tracking-wider transition-opacity hover:opacity-100"
                                        style={{ color: ink }}
                                    >
                                        <Editable as="span" value={item} onChange={(v) => setStackItem(realIdx, v)} />
                                    </span>
                                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent, opacity: 0.6 }} />
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export const DeveloperPortfolio6About = About;
export default About;