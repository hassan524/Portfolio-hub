// @ts-nocheck
import { ArrowUpRight, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" } }),
};

export function Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";

    const stats = props?.stats || [
        { icon: "TrendingUp", value: "240%", label: "Avg ROI" },
        { icon: "Users", value: "180+", label: "Clients served" },
        { icon: "Zap", value: "12 yrs", label: "In the game" },
    ];

    const iconMap: any = { TrendingUp, Users, Zap };

    return (
        <section
            id="home"
            className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden"
            style={{ background: bg }}
        >
            <div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none"
                style={{ background: accent }}
            />
            <div className="max-w-7xl mx-auto relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <motion.div
                            initial="hidden"
                            animate="show"
                            custom={0}
                            variants={fadeUp}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                            style={{ background: surface, color: inkSecond }}
                        >
                            <Sparkles className="w-4 h-4" style={{ color: accent }} />
                            <Editable value={props?.pill || "Strategy-led digital consulting"} />
                        </motion.div>
                        <motion.div initial="hidden" animate="show" custom={1} variants={fadeUp}>
                            <Editable
                                as="h1"
                                value={props?.headline || "We build digital products that compound your advantage."}
                                onChange={(v) => onChange?.({ headline: v })}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
                                style={{ color: ink }}
                            />
                        </motion.div>
                        <motion.div initial="hidden" animate="show" custom={2} variants={fadeUp}>
                            <Editable
                                as="p"
                                value={props?.subheadline || "Nexora partners with ambitious teams to design, ship, and scale software that moves the metrics that matter — from first prototype to enterprise rollout."}
                                onChange={(v) => onChange?.({ subheadline: v })}
                                className="text-lg leading-relaxed mb-8 max-w-xl"
                                style={{ color: inkSecond }}
                            />
                        </motion.div>
                        <motion.div initial="hidden" animate="show" custom={3} variants={fadeUp} className="flex flex-wrap gap-4">
                            <a
                                href="#contact"
                                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95"
                                style={{ background: accent, color: bg }}
                            >
                                <Editable value={props?.cta || "Start a project"} />
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                            <a
                                href="#projects"
                                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95"
                                style={{ background: surface, color: ink }}
                            >
                                <Editable value={props?.cta2 || "See our work"} />
                            </a>
                        </motion.div>
                        <motion.div initial="hidden" animate="show" custom={4} variants={fadeUp} className="grid grid-cols-3 gap-4 mt-12 pt-8" style={{ borderTop: `1px solid ${surface}` }}>
                            {stats.map((s: any, i: number) => {
                                const Icon = iconMap[s.icon] || Zap;
                                return (
                                    <div key={i}>
                                        <Icon className="w-5 h-5 mb-2" style={{ color: accent }} />
                                        <Editable
                                            as="div"
                                            value={s.value}
                                            onChange={(v) => {
                                                const next = [...stats];
                                                next[i] = { ...next[i], value: v };
                                                onChange?.({ stats: next });
                                            }}
                                            className="text-2xl font-bold"
                                            style={{ color: ink }}
                                        />
                                        <Editable
                                            as="div"
                                            value={s.label}
                                            onChange={(v) => {
                                                const next = [...stats];
                                                next[i] = { ...next[i], label: v };
                                                onChange?.({ stats: next });
                                            }}
                                            className="text-xs mt-1"
                                            style={{ color: inkSecond }}
                                        />
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        className="relative"
                    >
                        <div
                            className="absolute inset-0 rounded-3xl blur-2xl opacity-30"
                            style={{ background: accent }}
                        />
                        <div
                            className="relative rounded-3xl overflow-hidden border"
                            style={{ borderColor: surface }}
                        >
                            <img
                                src={props?.heroImage || "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80"}
                                alt="Hero"
                                className="w-full h-[500px] object-cover"
                            />
                        </div>
                        <div
                            className="absolute -bottom-4 -left-4 rounded-2xl px-5 py-4 backdrop-blur-xl"
                            style={{ background: bgSecond, border: `1px solid ${surface}` }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: accent }}>
                                    <TrendingUp className="w-5 h-5" style={{ color: bg }} />
                                </div>
                                <div>
                                    <Editable as="div" value={props?.badgeTitle || "Top-rated firm"} className="text-sm font-semibold" style={{ color: ink }} />
                                    <Editable as="div" value={props?.badgeSub || "Clutch 2024"} className="text-xs" style={{ color: inkSecond }} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
