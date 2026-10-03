// @ts-nocheck
import { ArrowUpRight } from 'lucide-react';
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

export function Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FAF5EC';
    const ink = theme?.ink || '#1F2B26';
    const inkSecond = theme?.['ink-second'] || '#5C6B62';
    const surface = theme?.surface || 'rgba(255,255,255,.6)';
    const accent = theme?.accent || '#B58B47';
    const items = (props?.items && props.items.length > 0) ? props.items : [
        { title: 'Green Clay Cleanser', copy: 'A gentle clay that draws out impurities without stripping.', price: '$36 · 120 ml', image: 'https://images.pexels.com/photos/8709575/pexels-photo-8709575.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
        { title: 'Nectar Serum', copy: 'A brightening serum with sea buckthorn and rosehip.', price: '$58 · 30 ml', image: 'https://images.pexels.com/photos/12146904/pexels-photo-12146904.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
        { title: 'Balm of Eve', copy: 'A rich balm for deep moisture and overnight repair.', price: '$48 · 50 ml', image: 'https://images.pexels.com/photos/6167867/pexels-photo-6167867.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
    ];
    return (
        <section id="projects" className="px-6 py-24" style={{ backgroundColor: bg, color: ink }}>
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-wrap items-end justify-between gap-5">
                    <div>
                        <Editable value="THE RITUALS" className="text-xs font-semibold tracking-[.3em]" style={{ color: accent }} />
                        <Editable as="h2" value="Our signature collection" className="mt-4 text-4xl font-light tracking-[-.03em] md:text-5xl" />
                    </div>
                    <Editable value="Three steps. One calm rhythm." className="text-sm" style={{ color: inkSecond }} />
                </div>
                <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="mt-12 grid gap-6 md:grid-cols-3">
                    {items.map((item: any, index: number) => (
                        <motion.article key={index} variants={staggerItem} className="group overflow-hidden rounded-[1.5rem] transition hover:-translate-y-1" style={{ backgroundColor: surface }}>
                            <div className="overflow-hidden">
                                <img src={item.image} alt={item.title} className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105" />
                            </div>
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <Editable as="h3" value={item.title} onChange={(v) => { const next = [...items]; next[index] = { ...item, title: v }; onChange?.({ items: next }); }} className="text-lg font-semibold" />
                                    <ArrowUpRight size={18} style={{ color: accent }} />
                                </div>
                                <Editable as="p" value={item.copy} className="mt-2 text-sm leading-6" style={{ color: inkSecond }} />
                                <Editable value={item.price} className="mt-5 block text-sm font-semibold" style={{ color: accent }} />
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
