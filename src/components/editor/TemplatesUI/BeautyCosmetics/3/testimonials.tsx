// @ts-nocheck
import { Quote, Star } from 'lucide-react';
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
    const ink = theme?.ink || '#1F2B26';
    const bg = theme?.bg || '#FAF5EC';
    const inkSecond = theme?.['ink-second'] || '#C9D4CB';
    const surface = theme?.surface || 'rgba(255,255,255,.08)';
    const accent = theme?.accent || '#B58B47';
    const reviews = (props?.reviews && props.reviews.length > 0) ? props.reviews : (props?.items && props.items.length > 0) ? props.items : [
        ['"My skin has never felt so balanced. The Green Clay is a daily reset I actually look forward to."', 'Eliza M.'],
        ['"Beautiful packaging, beautiful ingredients, beautiful results. Maison Verte is my whole shelf now."', 'Priya S.'],
    ];
    return (
        <section id="testimonials" className="px-6 py-24" style={{ backgroundColor: ink, color: bg }}>
            <div className="mx-auto max-w-7xl">
                <motion.div {...fadeInUp}>
                    <Editable value="KIND WORDS" className="text-xs font-semibold tracking-[.3em]" style={{ color: accent }} />
                </motion.div>
                <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="mt-10 grid gap-6 md:grid-cols-2">
                    {reviews.map((review: any, index: number) => (
                        <motion.article key={index} variants={staggerItem} className="rounded-3xl p-8 md:p-12" style={{ backgroundColor: surface }}>
                            <div className="flex gap-1" style={{ color: accent }}>
                                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                            </div>
                            <Quote className="mt-8" size={26} style={{ color: accent }} />
                            <Editable as="p" value={review[0]} className="mt-5 text-2xl font-light leading-tight tracking-[-.02em]" />
                            <Editable value={review[1]} className="mt-8 block text-sm" style={{ color: inkSecond }} />
                        </motion.article>
                    ))}
                </motion.div>
                <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="mt-14 grid grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-4" style={{ borderColor: `${accent}55` }}>
                    {[['4.9', 'avg rating'], ['18k', 'rituals sold'], ['7', 'awards'], ['2014', 'founded']].map(([n, l]) => (
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
