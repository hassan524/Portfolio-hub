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
    const bg = theme?.bg || '#FFF8F7';
    const ink = theme?.ink || '#20191A';
    const inkSecond = theme?.['ink-second'] || '#6D5B5E';
    const surface = theme?.surface || 'rgba(255,255,255,.75)';
    const accent = theme?.accent || '#D97382';
    const items = (props?.items && props.items.length > 0) ? props.items : [
        { title: 'Cloud Veil Cream', copy: 'A plush daily moisturizer for a soft, dewy finish.', price: '$42 · 50 ml', image: 'https://images.pexels.com/photos/7670680/pexels-photo-7670680.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
        { title: 'Rosewater Reset', copy: 'A quiet mist with rose, aloe, and a fresh start.', price: '$28 · 100 ml', image: 'https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
        { title: 'Night Bloom Oil', copy: 'A silky botanical blend to seal in your evening ritual.', price: '$54 · 30 ml', image: 'https://images.pexels.com/photos/8903264/pexels-photo-8903264.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
    ];
    return (
        <section id="projects" className="px-5 py-20" style={{ backgroundColor: bg, color: ink }}>
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-wrap items-end justify-between gap-5">
                    <div>
                        <Editable value="THE EDIT" className="text-xs font-semibold tracking-[0.3em]" style={{ color: accent }} />
                        <Editable as="h2" value="The daily lineup" className="mt-3 text-4xl font-semibold tracking-[-0.04em]" />
                    </div>
                    <Editable value="Three essentials. One easy rhythm." className="text-sm" style={{ color: inkSecond }} />
                </div>
                <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="mt-10 grid gap-5 md:grid-cols-3">
                    {items.map((item: any, index: number) => (
                        <motion.article key={index} variants={staggerItem} className="group rounded-[2rem] p-3 transition duration-300 hover:-translate-y-1" style={{ backgroundColor: surface }}>
                            <div className="overflow-hidden rounded-[1.5rem]">
                                <img src={item.image} alt={item.title} className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105" />
                            </div>
                            <div className="p-4">
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
