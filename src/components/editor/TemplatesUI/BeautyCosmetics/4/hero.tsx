// @ts-nocheck
import { motion } from 'framer-motion';
import { ArrowDown, Droplets, Sparkles } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#06131A';
    const ink = theme?.ink || '#E2F4F6';
    const inkSecond = theme?.['ink-second'] || '#81A8B8';
    const surface = theme?.surface || 'rgba(255, 255, 255, 0.05)';
    const accent = theme?.accent || '#38BDF8';

    return (
        <section id="top" className="relative isolate min-h-screen w-full overflow-hidden px-6 py-28 md:py-36 flex flex-col justify-center items-center" style={{ backgroundColor: bg, color: ink }}>
            {/* Ambient Water Background Gradient */}
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/30 via-slate-950 to-slate-950" />

            {/* Falling Water Drops & Dynamic Ripples */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                {[
                    { left: '15%', delay: 0, duration: 4, size: 'w-12 h-12' },
                    { left: '48%', delay: 1.5, duration: 3.5, size: 'w-16 h-16' },
                    { left: '82%', delay: 0.8, duration: 4.5, size: 'w-10 h-10' },
                    { left: '30%', delay: 2.2, duration: 3.8, size: 'w-14 h-14' },
                    { left: '70%', delay: 3.0, duration: 4.2, size: 'w-20 h-20' },
                ].map((drop, i) => (
                    <div key={i} className="absolute top-0 flex flex-col items-center" style={{ left: drop.left }}>
                        {/* Water Droplet */}
                        <motion.div
                            initial={{ y: -100, scale: 0.8, opacity: 0 }}
                            animate={{
                                y: ['0vh', '75vh'],
                                opacity: [0, 1, 0.9, 0],
                                scale: [0.6, 1.2, 1, 0.4]
                            }}
                            transition={{
                                duration: drop.duration,
                                repeat: Infinity,
                                delay: drop.delay,
                                ease: [0.4, 0, 0.8, 1]
                            }}
                            className={`rounded-full bg-gradient-to-b from-cyan-200/80 via-sky-400/50 to-cyan-500/20 shadow-[0_0_25px_rgba(56,189,248,0.6)] backdrop-blur-md ${drop.size}`}
                            style={{
                                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
                            }}
                        />
                        {/* Water Ripple on Impact */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [0, 3.5, 6],
                                opacity: [0, 0.6, 0]
                            }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                delay: drop.delay + drop.duration * 0.72,
                                ease: "easeOut"
                            }}
                            className="absolute top-[75vh] h-8 w-32 rounded-[100%] border border-cyan-300/40 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                        />
                    </div>
                ))}
            </div>

            <div className="relative mx-auto max-w-5xl text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-medium backdrop-blur-xl border"
                    style={{ backgroundColor: surface, borderColor: `${accent}33`, color: ink }}
                >
                    <Droplets size={14} className="animate-pulse" style={{ color: accent }} />
                    <Editable value="Pure Hydration & Cellular Rejuvenation" />
                    <Sparkles size={13} style={{ color: accent }} />
                </motion.div>

                <Editable
                    as="h1"
                    value={props?.headline || 'Fluid beauty, naturally restored.'}
                    onChange={(v) => onChange?.({ headline: v })}
                    className="text-5xl font-extralight tracking-tight leading-[1.05] sm:text-7xl md:text-8xl bg-gradient-to-b from-white via-slate-100 to-sky-200 bg-clip-text text-transparent drop-shadow-sm"
                />

                <Editable
                    as="p"
                    value={props?.subheadline || 'Lumen harnesses molecular water-binding therapies and pure botanical serums to awaken your skin’s inherent glow.'}
                    onChange={(v) => onChange?.({ subheadline: v })}
                    className="mx-auto mt-8 max-w-2xl text-base leading-8 sm:text-lg font-light"
                    style={{ color: inkSecond }}
                />

                <div className="mt-12 flex flex-wrap justify-center items-center gap-5">
                    <a
                        href="#projects"
                        className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(56,189,248,0.3)]"
                        style={{ backgroundColor: accent, color: bg }}
                    >
                        <Editable value="Explore Treatments" />
                        <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
                    </a>
                    <a
                        href="#about"
                        className="rounded-full px-8 py-4 text-sm font-medium border backdrop-blur-md transition hover:bg-white/5"
                        style={{ borderColor: `${accent}44`, color: ink }}
                    >
                        <Editable value="Our Philosophy" />
                    </a>
                </div>
            </div>

            {/* Aquatic Metric Cards */}
            <div className="relative mx-auto mt-20 grid max-w-5xl w-full grid-cols-2 gap-4 sm:grid-cols-4 z-10">
                {[
                    ['100%', 'Hydration lock'],
                    ['99.4%', 'Pure actives'],
                    ['15+', 'Expert therapists'],
                    ['4.95', 'Client rating']
                ].map(([num, label], i) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                        className="rounded-2xl p-6 text-center border backdrop-blur-xl relative overflow-hidden group hover:border-cyan-400/50 transition-colors"
                        style={{ backgroundColor: surface, borderColor: `${accent}22` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <Editable as="strong" value={num} className="block text-3xl font-light tracking-tight" style={{ color: accent }} />
                        <Editable as="span" value={label} className="mt-2 block text-xs uppercase tracking-widest font-medium" style={{ color: inkSecond }} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}