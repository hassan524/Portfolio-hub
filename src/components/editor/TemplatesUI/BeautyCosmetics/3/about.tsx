// @ts-nocheck
import { Sprout, Droplets, Sun } from 'lucide-react';
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

export function About({ props = {}, theme, onChange }: any) {
    const bgSecond = theme?.['bg-second'] || '#EDE4D0';
    const ink = theme?.ink || '#1F2B26';
    const inkSecond = theme?.['ink-second'] || '#5C6B62';
    const surface = theme?.surface || 'rgba(255,255,255,.6)';
    const accent = theme?.accent || '#B58B47';
    const values = [['Rooted in nature', 'Cold-pressed extracts and time-honored botanicals.', Sprout], ['Lightly made', 'Low-temperature batching preserves every active.', Droplets], ['Made to last', 'Refillable glass and formulas that earn their place.', Sun]];
    return (
        <section id="about" className="px-6 py-24" style={{ backgroundColor: bgSecond, color: ink }}>
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 md:grid-cols-2 md:items-center">
                    <motion.div {...fadeInLeft}>
                        <Editable value="OUR PHILOSOPHY" className="text-xs font-semibold tracking-[.3em]" style={{ color: accent }} />
                        <Editable as="h2" value={props?.title || 'A slower kind of beauty.'} onChange={(v) => onChange?.({ title: v })} className="mt-5 text-4xl font-light leading-tight tracking-[-.03em] md:text-5xl" />
                        <Editable as="p" value={props?.story || 'We believe skincare should feel like a ritual, not a routine. Every Maison Verte formula begins in our garden and ends in a bottle you will want to keep on your shelf.'} onChange={(v) => onChange?.({ story: v })} className="mt-6 max-w-lg leading-7" style={{ color: inkSecond }} />
                        <div className="mt-8 flex flex-wrap gap-2">
                            {['Vegan', 'Cruelty free', 'Small batch', 'Refillable', 'Phthalate free'].map((t) => (
                                <span key={t} className="rounded-full px-4 py-2 text-xs" style={{ backgroundColor: surface, color: ink }}><Editable value={t} /></span>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid grid-cols-2 gap-4">
                        {values.map(([title, copy, Icon]) => (
                            <motion.article key={title} variants={staggerItem} className="rounded-3xl p-6 transition hover:-translate-y-1" style={{ backgroundColor: surface }}>
                                <Icon size={22} style={{ color: accent }} />
                                <Editable as="h3" value={title} className="mt-6 text-base font-semibold" />
                                <Editable as="p" value={copy} className="mt-2 text-sm leading-6" style={{ color: inkSecond }} />
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
