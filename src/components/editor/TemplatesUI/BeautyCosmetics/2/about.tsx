// @ts-nocheck
import { Aperture, Brush, Gem } from 'lucide-react';
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
    const bgSecond = theme?.['bg-second'] || '#F7E8D8';
    const ink = theme?.ink || '#260C0A';
    const inkSecond = theme?.['ink-second'] || '#754437';
    const accent = theme?.accent || '#D95332';
    const cards = [['Editorial direction', 'A distinct visual language for campaigns that want to be remembered.', Aperture], ['Skin-first artistry', 'Texture, tone, and finish guided by real skin—not a filter.', Brush], ['Quiet luxury', 'Polished details that feel considered, never overworked.', Gem]];
    return (
        <section id="about" className="px-5 py-24" style={{ backgroundColor: bgSecond, color: ink }}>
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-10 md:grid-cols-[.7fr_1.3fr]">
                    <motion.div {...fadeInLeft}>
                        <Editable value="THE POINT OF VIEW" className="text-xs font-semibold uppercase tracking-[.25em]" style={{ color: accent }} />
                    </motion.div>
                    <motion.div {...fadeInUp}>
                        <Editable as="h2" value={props?.title || 'Beauty should look like you, only more awake.'} onChange={(v) => onChange?.({ title: v })} className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-.04em] md:text-6xl" />
                        <Editable as="p" value={props?.story || 'I create beauty stories with warmth, precision, and a little bit of electricity. From a one-on-one transformation to a global launch, every project starts with listening.'} onChange={(v) => onChange?.({ story: v })} className="mt-7 max-w-xl leading-7" style={{ color: inkSecond }} />
                    </motion.div>
                </div>
                <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="mt-16 grid gap-4 md:grid-cols-3">
                    {cards.map(([title, copy, Icon]) => (
                        <motion.article key={title} variants={staggerItem} className="border-t pt-5 transition hover:-translate-y-1" style={{ borderColor: `${accent}66` }}>
                            <Icon size={23} style={{ color: accent }} />
                            <Editable as="h3" value={title} className="mt-7 text-lg font-semibold" />
                            <Editable as="p" value={copy} className="mt-2 text-sm leading-6" style={{ color: inkSecond }} />
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
