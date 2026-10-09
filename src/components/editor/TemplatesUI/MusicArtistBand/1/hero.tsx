// @ts-nocheck
import { Play, ArrowDown, Flame, Disc3 } from "lucide-react";
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";

    const stats = props?.stats || [
        { value: "2.4M", label: "Monthly Listeners" },
        { value: "180+", label: "Live Shows" },
        { value: "3", label: "Studio Albums" },
    ];
    const genres = props?.genres || ["Alt Rock", "Stadium Anthems", "Raw Live Energy", "Analog Fire", "Heavy Hooks", "Midnight Tours"];
    const updStat = (i: number, k: string, v: string) =>
        onChange?.({ stats: stats.map((s: any, j: number) => (j === i ? { ...s, [k]: v } : s)) });
    const updGenre = (i: number, v: string) =>
        onChange?.({ genres: genres.map((g: string, j: number) => (j === i ? v : g)) });

    const container = { hidden: {}, show: { transition: { staggerChildren: 0.14 } } };
    const item = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };

    return (
        <section
            id="home"
            className="relative isolate overflow-hidden"
            style={{ background: `linear-gradient(180deg, ${bg}, ${bgSecond})`, color: ink }}
        >
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[620px] w-[620px] -translate-x-1/2 rounded-full blur-3xl"
                style={{ background: `radial-gradient(circle, ${accent}66, transparent 70%)` }}
            />
            <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-80 w-80 rounded-full blur-3xl"
                style={{ background: `radial-gradient(circle, ${accent}44, transparent 70%)` }}
            />

            <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 md:px-8 lg:grid-cols-2 lg:pt-24">
                <motion.div variants={container} initial="hidden" animate="show">
                    <motion.div variants={item}>
                        <span
                            className="animate__animated animate__fadeInDown inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest"
                            style={{ background: surface, color: ink, border: `1px solid ${accent}55` }}
                        >
                            <Flame size={14} style={{ color: accent }} />
                            <Editable as="span" value={props?.pill || "New Album · Ashes & Embers Out Now"} onChange={(v: string) => onChange?.({ pill: v })} />
                        </span>
                    </motion.div>

                    <motion.div variants={item}>
                        <Editable
                            as="h1"
                            className="mt-6 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl xl:text-7xl"
                            style={{ color: ink }}
                            value={props?.headline || "We Play Louder Than Fire."}
                            onChange={(v: string) => onChange?.({ headline: v })}
                        />
                    </motion.div>

                    <motion.div variants={item}>
                        <Editable
                            as="p"
                            className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
                            style={{ color: inkSecond }}
                            value={props?.subheadline || "Cinder Hollow is a four-piece alt-rock band forged in basement clubs and sold-out arenas. Raw riffs, soaring hooks, and shows you feel in your chest."}
                            onChange={(v: string) => onChange?.({ subheadline: v })}
                        />
                    </motion.div>

                    <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
                        <a
                            href="#projects"
                            className="animate__animated animate__pulse animate__infinite inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95"
                            style={{ background: accent, color: bg, boxShadow: `0 10px 40px ${accent}66`, animationDuration: "3s" }}
                        >
                            <Play size={16} />
                            <Editable as="span" value={props?.cta || "Listen Now"} onChange={(v: string) => onChange?.({ cta: v })} />
                        </a>
                        <a
                            href="#about"
                            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95"
                            style={{ background: surface, color: ink, border: `1px solid ${surface}` }}
                        >
                            <Editable as="span" value={props?.cta2 || "Meet the Band"} onChange={(v: string) => onChange?.({ cta2: v })} />
                            <ArrowDown size={16} />
                        </a>
                    </motion.div>

                    <motion.div variants={item} className="mt-12 grid grid-cols-3 gap-3">
                        {stats.map((s: any, i: number) => (
                            <div key={i} className="rounded-2xl p-4 backdrop-blur" style={{ background: surface }}>
                                <Editable as="div" className="text-2xl font-black sm:text-3xl" style={{ color: accent }} value={s.value} onChange={(v: string) => updStat(i, "value", v)} />
                                <Editable as="div" className="mt-1 text-xs font-medium" style={{ color: inkSecond }} value={s.label} onChange={(v: string) => updStat(i, "label", v)} />
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.85, rotate: 4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                    className="relative mx-auto w-full max-w-lg"
                >
                    <div className="absolute -inset-4 rounded-[2.5rem] blur-2xl" style={{ background: `${accent}44` }} />
                    <div className="relative overflow-hidden rounded-[2rem] p-2" style={{ background: surface, border: `1px solid ${accent}44` }}>
                        <img
                            src={props?.heroImage || "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80"}
                            alt="Band performing live"
                            className="aspect-[4/5] w-full rounded-[1.6rem] object-cover"
                        />
                        <div className="absolute inset-2 rounded-[1.6rem]" style={{ background: `linear-gradient(180deg, transparent 50%, ${bg}CC)` }} />
                        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                            <div className="flex items-end gap-1">
                                {[0, 1, 2, 3, 4, 5, 6].map((b) => (
                                    <motion.span
                                        key={b}
                                        animate={{ height: [10, 36, 16, 44, 12] }}
                                        transition={{ duration: 1.2, repeat: Infinity, delay: b * 0.12 }}
                                        className="w-1.5 rounded-full"
                                        style={{ background: accent }}
                                    />
                                ))}
                            </div>
                            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur" style={{ background: surface, color: ink }}>
                                <Disc3 size={14} className="animate__animated animate__rotateIn animate__infinite" style={{ color: accent }} />
                                <Editable as="span" value={props?.nowPlaying || "Now Playing: Burn Slow"} onChange={(v: string) => onChange?.({ nowPlaying: v })} />
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="overflow-hidden border-y py-4" style={{ borderColor: surface, background: surface }}>
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    className="flex w-max gap-10"
                >
                    {[...genres, ...genres].map((g: string, i: number) => (
                        <span key={i} className="flex items-center gap-10 whitespace-nowrap text-sm font-bold uppercase tracking-[0.25em]" style={{ color: inkSecond }}>
                            <Editable as="span" value={g} onChange={(v: string) => updGenre(i % genres.length, v)} />
                            <Flame size={14} style={{ color: accent }} />
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}