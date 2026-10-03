// @ts-nocheck
import { ArrowRight, Leaf } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

const fadeInLeft = {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const fadeInRight = {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

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

export function Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FAF5EC';
    const bgSecond = theme?.['bg-second'] || '#EDE4D0';
    const ink = theme?.ink || '#1F2B26';
    const inkSecond = theme?.['ink-second'] || '#5C6B62';
    const surface = theme?.surface || 'rgba(255,255,255,.6)';
    const accent = theme?.accent || '#B58B47';
    return (
        <section id="top" className="overflow-hidden px-6 pt-16 pb-12" style={{ backgroundColor: bg, color: ink }}>
            <div className="mx-auto max-w-7xl">
                <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
                    <motion.div {...fadeInLeft}>
                        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px]" style={{ backgroundColor: surface, color: inkSecond }}>
                            <Leaf size={13} style={{ color: accent }} />
                            <Editable value="Botanical skincare · since 2014" />
                        </div>
                        <Editable as="h1" value={props?.headline || 'Skin that breathes with the seasons.'} onChange={(v) => onChange?.({ headline: v })} className="mt-7 text-5xl font-light leading-[1.05] tracking-[-.03em] md:text-[5.5rem]" />
                        <Editable as="p" value={props?.subheadline || 'Maison Verte crafts plant-based skincare in small batches. Each formula is designed to feel like a quiet moment of care.'} onChange={(v) => onChange?.({ subheadline: v })} className="mt-7 max-w-md text-base leading-7" style={{ color: inkSecond }} />
                        <div className="mt-9 flex flex-wrap gap-4">
                            <a href="#projects" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}>
                                <Editable value="Discover rituals" /><ArrowRight size={16} />
                            </a>
                            <a href="#about" className="text-sm underline underline-offset-4"><Editable value="Our story" /></a>
                        </div>
                    </motion.div>
                    <motion.div {...fadeInRight} className="relative">
                        <div className="absolute -inset-6 rounded-[2.5rem] blur-2xl" style={{ backgroundColor: `${accent}25` }} />
                        <motion.img
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            src={props?.heroImage || 'https://images.pexels.com/photos/8490252/pexels-photo-8490252.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'}
                            className="relative aspect-square w-full rounded-[2.5rem] object-cover shadow-xl"
                            alt="Botanical skincare"
                        />
                    </motion.div>
                </div>
                <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="mt-14 grid grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-4" style={{ borderColor: `${accent}33` }}>
                    {[['10 yrs', 'craft'], ['42', 'botanicals'], ['0', 'parabens'], ['100%', 'vegan']].map(([n, l]) => (
                        <motion.div key={l} variants={staggerItem}>
                            <Editable as="strong" value={n} className="text-2xl" />
                            <Editable as="span" value={l} className="mt-1 block text-xs" style={{ color: inkSecond }} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
