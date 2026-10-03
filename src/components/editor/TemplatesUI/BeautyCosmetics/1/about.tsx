// @ts-nocheck
import { Leaf, Heart, Sun } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

const fadeInLeft = {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
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
    const bgSecond = theme?.['bg-second'] || '#F5E6E4';
    const ink = theme?.ink || '#20191A';
    const inkSecond = theme?.['ink-second'] || '#6D5B5E';
    const surface = theme?.surface || 'rgba(255,255,255,.75)';
    const accent = theme?.accent || '#D97382';
    const values = [['Slow beauty', 'Small batches, considered formulas, no rush.', Leaf], ['Kind by design', 'Gentle choices for skin, people, and planet.', Heart], ['Light within', 'A daily ritual that feels like your own.', Sun]];
    return (
        <section id="about" className="px-5 py-20" style={{ backgroundColor: bgSecond, color: ink }}>
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
                    <motion.div {...fadeInLeft}>
                        <Editable value="THE STORY" className="text-xs font-semibold tracking-[0.3em]" style={{ color: accent }} />
                        <Editable as="h2" value={props?.title || 'Beauty is a feeling before it is a finish.'} onChange={(v) => onChange?.({ title: v })} className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl" />
                    </motion.div>
                    <motion.div {...fadeInUp}>
                        <Editable as="p" value={props?.story || 'Pearl began at a kitchen table with a simple belief: the best products make space for you. We pair familiar plant extracts with modern skin science, then wrap the experience in a little more calm.'} onChange={(v) => onChange?.({ story: v })} className="max-w-xl text-base leading-7" style={{ color: inkSecond }} />
                    </motion.div>
                </div>
                <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="mt-14 grid gap-4 md:grid-cols-3">
                    {values.map(([title, copy, Icon]) => (
                        <motion.article key={title} variants={staggerItem} className="rounded-3xl p-6 transition duration-300 hover:-translate-y-1" style={{ backgroundColor: surface }}>
                            <Icon size={22} style={{ color: accent }} />
                            <Editable as="h3" value={title} className="mt-8 text-lg font-semibold" />
                            <Editable as="p" value={copy} className="mt-2 text-sm leading-6" style={{ color: inkSecond }} />
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
