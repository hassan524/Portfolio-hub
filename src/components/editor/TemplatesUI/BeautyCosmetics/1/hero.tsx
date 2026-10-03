// @ts-nocheck
import { ArrowUpRight, Star } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.12 } },
    viewport: { once: true, margin: '-80px' },
};

const staggerItem = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const fadeInRight = {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export function Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FFF8F7';
    const ink = theme?.ink || '#20191A';
    const inkSecond = theme?.['ink-second'] || '#6D5B5E';
    const surface = theme?.surface || 'rgba(255,255,255,.75)';
    const accent = theme?.accent || '#D97382';
    return (
        <section id="top" className="overflow-hidden px-5 py-16 md:py-24" style={{ backgroundColor: bg, color: ink }}>
            <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1fr_0.9fr]">
                <motion.div variants={staggerContainer} initial="initial" animate="whileInView">
                    <motion.div variants={staggerItem} className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs" style={{ backgroundColor: surface, color: inkSecond }}>
                        <Star size={13} fill={accent} style={{ color: accent }} />
                        <Editable value="Independent beauty studio · Est. 2018" />
                    </motion.div>
                    <motion.div variants={staggerItem}>
                        <Editable as="h1" value={props?.headline || 'Soft rituals for luminous skin.'} onChange={(v) => onChange?.({ headline: v })} className="max-w-xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-7xl" />
                    </motion.div>
                    <motion.div variants={staggerItem}>
                        <Editable as="p" value={props?.subheadline || 'Thoughtful cosmetics, made in small batches with botanicals that meet your skin where it is.'} onChange={(v) => onChange?.({ subheadline: v })} className="mt-6 max-w-lg text-base leading-7" style={{ color: inkSecond }} />
                    </motion.div>
                    <motion.div variants={staggerItem} className="mt-8 flex flex-wrap items-center gap-4">
                        <a href="#projects" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}>
                            <Editable value="View the collection" /><ArrowUpRight size={16} />
                        </a>
                        <a href="#about" className="text-sm underline underline-offset-4"><Editable value="Our philosophy" /></a>
                    </motion.div>
                    <motion.div variants={staggerItem} className="mt-12 flex gap-8">
                        {[['4.9', 'community love'], ['28k+', 'rituals shared'], ['100%', 'cruelty free']].map(([n, l]) => (
                            <div key={l}>
                                <Editable as="strong" value={n} className="block text-xl" />
                                <Editable as="span" value={l} className="text-xs" style={{ color: inkSecond }} />
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
                <motion.div {...fadeInRight} className="relative">
                    <div className="absolute -inset-8 rounded-full blur-3xl" style={{ backgroundColor: `${accent}35` }} />
                    <motion.img
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        src={props?.heroImage || 'https://images.pexels.com/photos/7814941/pexels-photo-7814941.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'}
                        className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl transition duration-500 hover:scale-[1.02]"
                        alt="Beauty product portrait"
                    />
                </motion.div>
            </div>
        </section>
    );
}
