// @ts-nocheck
import { Quote, Award } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

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

export function Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.ink || '#20191A';
    const ink = theme?.bg || '#FFF8F7';
    const inkSecond = theme?.['ink-second'] || '#E7D8D7';
    const surface = theme?.surface || 'rgba(255,255,255,.08)';
    const accent = theme?.accent || '#D97382';
    const reviews = (props?.reviews && props.reviews.length > 0) ? props.reviews : (props?.items && props.items.length > 0) ? props.items : [
        ['"My skin feels like it can breathe again. Pearl makes the everyday feel special."', 'Mina R.'],
        ['"The kind of formulas you keep reaching for. Beautiful, uncomplicated, effective."', 'Ari L.'],
    ];
    return (
        <section id="journal" className="px-5 py-20" style={{ backgroundColor: bg, color: ink }}>
            <div className="mx-auto max-w-6xl">
                <motion.div {...fadeInUp} className="flex items-center gap-3">
                    <Award style={{ color: accent }} />
                    <Editable value="NOTES FROM THE COMMUNITY" className="text-xs font-semibold tracking-[0.25em]" style={{ color: accent }} />
                </motion.div>
                <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="mt-10 grid gap-5 md:grid-cols-2">
                    {reviews.map((review: any, index: number) => (
                        <motion.article key={index} variants={staggerItem} className="rounded-3xl p-7 md:p-10" style={{ backgroundColor: surface }}>
                            <Quote size={30} style={{ color: accent }} />
                            <Editable as="p" value={review[0]} className="mt-8 text-2xl leading-tight tracking-[-0.03em]" />
                            <Editable value={review[1]} className="mt-8 block text-sm" style={{ color: inkSecond }} />
                        </motion.article>
                    ))}
                </motion.div>
                <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="mt-12 grid grid-cols-2 gap-5 border-t pt-8 sm:grid-cols-4" style={{ borderColor: `${accent}55` }}>
                    {[['12', 'awards'], ['96%', 'returning'], ['3', 'hero rituals'], ['2018', 'founded']].map(([n, l]) => (
                        <motion.div key={l} variants={staggerItem}>
                            <Editable as="strong" value={n} className="text-3xl" style={{ color: accent }} />
                            <Editable as="span" value={l} className="mt-1 block text-xs" style={{ color: inkSecond }} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
