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
    const bg = theme?.bg || '#260C0A';
    const ink = theme?.ink || '#FFF6ED';
    const inkSecond = theme?.['ink-second'] || '#F3C7AD';
    const surface = theme?.surface || 'rgba(255,255,255,.1)';
    const accent = theme?.accent || '#F37D4C';
    const reviews = (props?.reviews && props.reviews.length > 0) ? props.reviews : (props?.items && props.items.length > 0) ? props.items : [
        ['"She understands the difference between looking beautiful and feeling undeniable."', 'Nora K. · Creative Director'],
        ['"Our launch found its face in one afternoon. The work was precise, warm, and wildly good."', 'James T. · Founder'],
    ];
    return (
        <section id="testimonials" className="px-5 py-24" style={{ backgroundColor: bg, color: ink }}>
            <div className="mx-auto max-w-6xl">
                <motion.div {...fadeInUp}>
                    <Editable value="THE GOOD WORD" className="text-xs font-semibold uppercase tracking-[.25em]" style={{ color: accent }} />
                </motion.div>
                <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="mt-12 grid gap-5 md:grid-cols-2">
                    {reviews.map((review: any, index: number) => (
                        <motion.article key={index} variants={staggerItem} className="rounded-3xl p-7 md:p-10" style={{ backgroundColor: surface }}>
                            <div className="flex gap-1" style={{ color: accent }}>
                                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                            </div>
                            <Quote className="mt-10" size={27} style={{ color: accent }} />
                            <Editable as="p" value={review[0]} className="mt-6 text-2xl leading-tight tracking-[-.03em]" />
                            <Editable value={review[1]} className="mt-8 block text-sm" style={{ color: inkSecond }} />
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
