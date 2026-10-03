// @ts-nocheck
import { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles, Coffee } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#24140d';
    const bgSecond = theme?.['bg-second'] || bg;
    const ink = theme?.ink || '#fff9f0';
    const inkSecond = theme?.['ink-second'] || ink;
    const surface = theme?.surface || 'rgba(255, 255, 255, 0.08)';
    const accent = theme?.accent || '#e1a66b';
  const fontBody = theme?.fontBody || "Inter";

    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 800], [0, 100]);
    const beanY = useTransform(scrollY, [0, 800], [0, -150]);

    const beans = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: (Math.random() * 100).toFixed(2) + '%',
        delay: (Math.random() * 8).toFixed(2),
        duration: (6 + Math.random() * 6).toFixed(1),
        size: 12 + Math.floor(Math.random() * 18),
        rotate: Math.floor(Math.random() * 360),
        opacity: (0.06 + Math.random() * 0.12).toFixed(2),
    })), []);

    const stagger = {
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
    };
    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <section id="home" className="relative min-h-screen overflow-hidden px-5 pb-10 pt-32 sm:px-10 lg:px-16" style={{ backgroundColor: bg, color: ink , fontFamily: fontBody }}>
            {/* Falling coffee beans */}
            <motion.div style={{ y: beanY }} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                {beans.map((b) => (
                    <motion.div
                        key={b.id}
                        className="absolute"
                        style={{ left: b.x, top: '-60px', opacity: Number(b.opacity) }}
                        initial={{ y: -60, rotate: 0 }}
                        animate={{ y: ['0vh', '110vh'], rotate: b.rotate }}
                        transition={{ duration: Number(b.duration), repeat: Infinity, delay: Number(b.delay), ease: 'linear' }}
                    >
                        <Coffee size={b.size} style={{ color: accent }} />
                    </motion.div>
                ))}
            </motion.div>

            <motion.div style={{ y: heroY }} className="relative z-10 mx-auto flex min-h-[650px] max-w-[1400px] flex-col justify-between">
                <motion.div variants={stagger} initial="hidden" animate="show" className="flex items-start justify-between text-[9px] uppercase tracking-[0.24em]" style={{ color: `${ink}99` }}>
                    <motion.span variants={item}><Editable value={props?.eyebrow || 'Sydney CBD · 71 Wentworth Ave'} onChange={(v) => onChange?.({ eyebrow: v })} /></motion.span>
                    <motion.span variants={item} className="hidden sm:block"><Editable value={props?.hours || 'Breakfast · Coffee · Lunch'} onChange={(v) => onChange?.({ hours: v })} /></motion.span>
                </motion.div>

                <div className="relative flex flex-1 items-center justify-center py-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.15 }}
                        animate={{ opacity: 0.07, scale: 1 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="absolute z-0 whitespace-nowrap font-fraunces text-[25vw] leading-none tracking-[-0.09em] sm:text-[19vw]"
                        style={{ color: '#f4e9d8' }}
                    >
                        <Editable as="span" value={props?.headline || 'STC CAFE'} onChange={(v) => onChange?.({ headline: v })} />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 h-[430px] w-[270px] overflow-hidden rounded-t-[9rem] rounded-b-[1.25rem] border-8 sm:h-[530px] sm:w-[330px]"
                        style={{ borderColor: bg }}
                    >
                        <img className="h-full w-full object-cover object-center saturate-[.85]" src={props?.heroImage || 'https://images.pexels.com/photos/18940118/pexels-photo-18940118.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800'} />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="absolute bottom-7 left-0 z-20 max-w-[190px] text-xs leading-5 sm:left-8"
                        style={{ color: `${ink}bb` }}
                    >
                        <Sparkles className="mb-4" size={16} style={{ color: accent }} />
                        <Editable value={props?.subheadline || 'A bright little corner for slow mornings, considered coffee, and the people who make the city feel like home.'} onChange={(v) => onChange?.({ subheadline: v })} />
                    </motion.div>
                    <motion.a
                        href="#projects"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute bottom-8 right-0 z-20 flex items-center gap-2 rounded-full border px-4 py-2 text-[9px] uppercase tracking-[0.2em] sm:right-8"
                        style={{ borderColor: `${ink}44`, color: ink }}
                    >
                        <Editable value={props?.primaryCta || 'See the menu'} />
                        <ArrowUpRight size={14} style={{ color: accent }} />
                    </motion.a>
                </div>

                <motion.div variants={stagger} initial="hidden" animate="show" className="flex items-end justify-between border-t pt-5 text-[9px] uppercase tracking-[0.22em]" style={{ borderColor: `${ink}22`, color: `${ink}88` }}>
                    <motion.span variants={item}><Editable value={props?.location || 'A neighbourhood ritual since 2016'} /></motion.span>
                    <motion.a variants={item} href="#about" className="flex items-center gap-2 transition hover:opacity-60">
                        <Editable value={props?.secondaryCta || 'Our story'} />
                        <ArrowDown size={13} />
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
}
