// @ts-nocheck
import { ArrowDownRight, Sparkles } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

const fadeInLeft = {
    initial: { opacity: 0, x: -50 },
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
    const bg = theme?.bg || '#260C0A';
    const ink = theme?.ink || '#FFF6ED';
    const inkSecond = theme?.['ink-second'] || '#F3C7AD';
    const accent = theme?.accent || '#F37D4C';
    return (
        <section id="top" className="relative min-h-[760px] overflow-hidden px-5 pb-20 pt-36" style={{ backgroundColor: bg, color: ink }}>
            <motion.img
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                src={props?.heroImage || 'https://images.pexels.com/photos/17566310/pexels-photo-17566310.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'}
                className="absolute inset-0 h-full w-full object-cover"
                alt="Beauty portrait"
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(90deg,${bg} 10%,transparent 72%),linear-gradient(0deg,${bg},transparent 50%)` }} />
            <div className="relative mx-auto flex max-w-6xl flex-col justify-between md:min-h-[560px]">
                <motion.div {...fadeInLeft} className="max-w-xl">
                    <div className="mb-8 flex items-center gap-2 text-xs uppercase tracking-[.25em]" style={{ color: accent }}>
                        <Sparkles size={14} />
                        <Editable value="Experience / 01" />
                    </div>
                    <Editable as="h1" value={props?.headline || '15+ years of beauty expertise.'} onChange={(v) => onChange?.({ headline: v })} className="text-5xl font-semibold uppercase leading-[.95] tracking-[-.04em] md:text-7xl" />
                    <Editable as="p" value={props?.subheadline || 'Radiant skin is personal. My approach blends advanced science, calm rituals, and a point of view that is unmistakably yours.'} onChange={(v) => onChange?.({ subheadline: v })} className="mt-7 max-w-md text-sm leading-6" style={{ color: inkSecond }} />
                    <a href="#projects" className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}>
                        <Editable value="View portfolio" /><ArrowDownRight size={15} />
                    </a>
                </motion.div>
                <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="mt-20 grid max-w-2xl grid-cols-2 gap-4 border-t pt-5 sm:grid-cols-4" style={{ borderColor: `${ink}66` }}>
                    {[['15+', 'years'], ['100+', 'editorial looks'], ['38', 'brand launches'], ['4.9', 'client rating']].map(([n, l]) => (
                        <motion.div key={l} variants={staggerItem}>
                            <Editable as="strong" value={n} className="text-2xl" />
                            <Editable as="span" value={l} className="mt-1 block text-[11px]" style={{ color: inkSecond }} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
