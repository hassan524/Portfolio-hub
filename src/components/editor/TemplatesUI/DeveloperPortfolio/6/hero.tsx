// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";

    const stats = props?.stats || [
        { value: "6+", label: "Years coding" },
        { value: "40+", label: "Projects shipped" },
        { value: "100", label: "Lighthouse score" },
    ];
    const setStat = (i: number, k: string, v: string) =>
        onChange?.({ stats: stats.map((s: any, j: number) => (j === i ? { ...s, [k]: v } : s)) });

    return (
        <section id="home" className="relative overflow-hidden" style={{ background: bg }}>
            <div
                className="pointer-events-none absolute -right-32 top-10 h-[480px] w-[480px] rounded-full blur-3xl"
                style={{ background: accent, opacity: 0.08 }}
            />
            {/* Reduced padding, bigger text */}
            <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-8 md:py-16">
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div
                        className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs md:text-sm"
                        style={{ background: surface, color: inkSecond }}
                    >
                        <MapPin size={14} />
                        <Editable as="span" value={props?.pill || "Based in Karachi · Remote friendly"} onChange={(v) => onChange?.({ pill: v })} />
                    </div>
                    <p className="mb-3 font-mono text-base md:text-lg italic" style={{ color: inkSecond }}>
                        <Editable as="span" value={props?.name || "Alicia Smith"} onChange={(v) => onChange?.({ name: v })} />
                    </p>
                    <h1 className="text-5xl font-bold leading-[1.08] tracking-tight md:text-7xl lg:text-8xl" style={{ color: ink }}>
                        <Editable as="span" value={props?.headline || "Your go-to engineer for Next.js projects"} onChange={(v) => onChange?.({ headline: v })} />
                    </h1>
                    <p className="mt-6 max-w-lg font-mono text-base md:text-lg leading-relaxed" style={{ color: inkSecond }}>
                        <Editable
                            as="span"
                            value={props?.subheadline || "Bringing your ideas to life with clean, efficient, and scalable code. Whether it's building web apps, optimizing performance, or solving complex technical challenges."}
                            onChange={(v) => onChange?.({ subheadline: v })}
                        />
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 rounded-lg px-6 py-3.5 font-mono text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95"
                            style={{ background: accent, color: bg }}
                        >
                            <Editable as="span" value={props?.primaryCta || "Contact me"} onChange={(v) => onChange?.({ primaryCta: v })} />
                            <ArrowRight size={16} />
                        </a>
                        <a
                            href="#projects"
                            className="rounded-lg px-6 py-3.5 font-mono text-sm transition-transform hover:scale-[1.02] active:scale-95"
                            style={{ background: surface, color: ink }}
                        >
                            <Editable as="span" value={props?.secondaryCta || "View projects"} onChange={(v) => onChange?.({ secondaryCta: v })} />
                        </a>
                    </div>
                    <div className="mt-10 grid max-w-md grid-cols-3 gap-4 pt-6" style={{ borderTop: `1px solid ${surface}` }}>
                        {stats.map((s: any, i: number) => (
                            <div key={i}>
                                <div className="text-3xl md:text-4xl font-bold" style={{ color: ink }}>
                                    <Editable as="span" value={s.value} onChange={(v) => setStat(i, "value", v)} />
                                </div>
                                <div className="mt-1 font-mono text-xs uppercase tracking-wider" style={{ color: inkSecond }}>
                                    <Editable as="span" value={s.label} onChange={(v) => setStat(i, "label", v)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="relative mx-auto w-full max-w-sm md:max-w-md"
                >
                    <div className="absolute -left-6 -top-6 h-20 w-20 rounded-lg" style={{ background: surface }} />
                    <div className="absolute -bottom-6 -right-6 h-28 w-28 rounded-lg" style={{ background: surface }} />
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl" style={{ border: `1px solid ${surface}` }}>
                        <img
                            src={props?.heroImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80"}
                            alt="Portrait"
                            className="h-full w-full object-cover grayscale"
                        />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${bg}, transparent 50%)` }} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export const DeveloperPortfolio6Hero = Hero;
export default Hero;