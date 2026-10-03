// @ts-nocheck
import { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Clock3, Leaf } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#11100d';
    const bgSecond = theme?.['bg-second'] || bg;
    const ink = theme?.ink || '#f6f0e6';
    const inkSecond = theme?.['ink-second'] || ink;
    const surface = theme?.surface || 'rgba(255, 255, 255, 0.12)';
    const accent = theme?.accent || '#c89c5a';
  const fontBody = theme?.fontBody || "Inter";

    const { scrollY } = useScroll();
    const imgY = useTransform(scrollY, [0, 800], [0, 160]);
    const textY = useTransform(scrollY, [0, 600], [0, -80]);
    const leafY = useTransform(scrollY, [0, 800], [0, -200]);

    const leaves = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: (Math.random() * 100).toFixed(2) + '%',
        delay: (Math.random() * 6).toFixed(2),
        duration: (8 + Math.random() * 8).toFixed(1),
        size: 14 + Math.floor(Math.random() * 16),
        rotate: Math.floor(Math.random() * 360),
        opacity: (0.04 + Math.random() * 0.08).toFixed(2),
    })), []);

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
    };
    const item = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <section id="home" className="relative min-h-screen overflow-hidden px-6 pb-12 pt-32 lg:px-12" style={{ backgroundColor: bg, color: ink , fontFamily: fontBody }}>
            {/* Falling leaves */}
            <motion.div style={{ y: leafY }} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                {leaves.map((l) => (
                    <motion.div
                        key={l.id}
                        className="absolute"
                        style={{ left: l.x, top: '-60px', opacity: Number(l.opacity) }}
                        initial={{ y: -60, rotate: 0 }}
                        animate={{ y: ['0vh', '115vh'], rotate: l.rotate }}
                        transition={{ duration: Number(l.duration), repeat: Infinity, delay: Number(l.delay), ease: 'linear' }}
                    >
                        <Leaf size={l.size} style={{ color: accent }} />
                    </motion.div>
                ))}
            </motion.div>

            <div className="relative z-10 mx-auto grid min-h-[720px] max-w-[1400px] items-center gap-0 lg:grid-cols-[0.9fr_1.45fr]">
                <motion.div style={{ y: textY }} variants={container} initial="hidden" animate="show" className="relative z-10 py-12 lg:pr-8">
                    <motion.p variants={item} className="mb-7 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em]" style={{ color: accent }}>
                        <span className="h-px w-8" style={{ backgroundColor: accent }} />
                        <Editable value={props?.eyebrow || 'Sydney CBD · Since 2016'} onChange={(v) => onChange?.({ eyebrow: v })} />
                    </motion.p>
                    <motion.h1 variants={item} className="max-w-xl font-fraunces text-6xl leading-[0.9] tracking-[-0.06em] sm:text-8xl">
                        <Editable as="span" value={props?.headline || 'Good coffee. Great moments. Better together.'} onChange={(v) => onChange?.({ headline: v })} />
                    </motion.h1>
                    <motion.p variants={item} className="mt-8 max-w-sm text-sm leading-7" style={{ color: `${inkSecond}99` }}>
                        <Editable value={props?.subheadline || 'A neighbourhood coffee house built around generous cups, warm light, and time well spent.'} onChange={(v) => onChange?.({ subheadline: v })} />
                    </motion.p>
                    <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
                        <motion.a href="#projects" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-3 rounded-full px-5 py-3 text-[10px] uppercase tracking-[0.2em]" style={{ backgroundColor: accent, color: bg }}>
                            <Editable value={props?.primaryCta || 'Discover our coffee'} />
                            <ArrowRight size={14} />
                        </motion.a>
                        <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-3 rounded-full border px-5 py-3 text-[10px] uppercase tracking-[0.2em]" style={{ borderColor: surface, color: ink }}>
                            <Editable value={props?.secondaryCta || 'Find us'} />
                        </motion.a>
                    </motion.div>
                    <motion.div variants={item} className="mt-16 flex items-center gap-4 text-[10px] uppercase tracking-[0.18em]" style={{ color: `${ink}88` }}>
                        <Clock3 size={15} style={{ color: accent }} />
                        <Editable value={props?.openLine || 'Open today · 6:30 am — 4:00 pm'} onChange={(v) => onChange?.({ openLine: v })} />
                    </motion.div>
                </motion.div>

                <div className="relative h-[520px] lg:h-[720px]">
                    <motion.div
                        style={{ y: imgY, borderColor: surface }}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 overflow-hidden border"
                    >
                        <img className="h-full w-full object-cover" src={props?.heroImage || 'https://images.pexels.com/photos/37131257/pexels-photo-37131257.jpeg?auto=compress&cs=tinysrgb&h=1200&w=2000'} />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#11100dcc] via-transparent to-transparent" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="absolute bottom-6 left-6 max-w-[220px] border-l-2 px-5 py-2"
                        style={{ borderColor: accent, color: ink }}
                    >
                        <p className="text-3xl font-fraunces" style={{ color: accent }}>04</p>
                        <p className="mt-2 text-[9px] uppercase leading-4 tracking-[0.16em]" style={{ color: `${ink}99` }}><Editable value="ways to take your coffee" /></p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="absolute right-5 top-5 hidden max-w-[145px] border p-4 text-[9px] uppercase leading-4 tracking-[0.16em] sm:block"
                        style={{ backgroundColor: `${bg}dd`, borderColor: surface, color: `${ink}99` }}
                    >
                        <Editable value={props?.imageNote || 'Warm light. Fresh pastries. No rush.'} onChange={(v) => onChange?.({ imageNote: v })} />
                    </motion.div>
                </div>
            </div>

            <motion.a
                href="#about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                style={{ color: `${ink}77` }}
            >
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <ChevronDown size={17} />
                </motion.div>
            </motion.a>
        </section>
    );
}
