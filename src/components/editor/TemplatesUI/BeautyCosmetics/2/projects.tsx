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
    const bg = theme?.bg || '#260C0A';
    const ink = theme?.ink || '#FFF6ED';
    const inkSecond = theme?.['ink-second'] || '#F3C7AD';
    const surface = theme?.surface || 'rgba(255,255,255,.1)';
    const accent = theme?.accent || '#F37D4C';
    const items = (props?.items && props.items.length > 0) ? props.items : [
        { title: 'Sienna Skin', tag: 'Campaign / 2024', copy: 'Warm, dimensional skin for a new generation of complexion.', image: 'https://images.pexels.com/photos/9514677/pexels-photo-9514677.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
        { title: 'Afterglow', tag: 'Editorial / 2023', copy: 'A study in light, gloss, and the beauty of a lived-in look.', image: 'https://images.pexels.com/photos/9109102/pexels-photo-9109102.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
        { title: 'Barely There', tag: 'Brand world / 2022', copy: 'Minimal makeup, maximum presence, built for everyday confidence.', image: 'https://images.pexels.com/photos/18108805/pexels-photo-18108805.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
        { title: 'Crimson Hour', tag: 'Editorial / 2024', copy: 'Bold red tones for a fall campaign that owned the room.', image: 'https://images.pexels.com/photos/28517478/pexels-photo-28517478.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
    ];
    return (
        <section id="projects" className="px-5 py-24" style={{ backgroundColor: bg, color: ink }}>
            <div className="mx-auto max-w-6xl">
                <div className="flex items-end justify-between gap-5">
                    <div>
                        <Editable value="SELECTED WORK" className="text-xs font-semibold uppercase tracking-[.25em]" style={{ color: accent }} />
                        <Editable as="h2" value="The signature portfolio" className="mt-4 text-4xl font-semibold tracking-[-.04em] md:text-5xl" />
                    </div>
                    <Editable value="Swipe through the glow" className="hidden text-xs sm:block" style={{ color: inkSecond }} />
                </div>
                <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="mt-12 grid gap-5 md:grid-cols-2">
                    {items.map((item: any, index: number) => (
                        <motion.article key={index} variants={staggerItem} className={`group overflow-hidden rounded-[1.5rem] ${index % 3 === 0 ? 'md:col-span-2' : ''}`} style={{ backgroundColor: surface }}>
                            <div className="overflow-hidden">
                                <img src={item.image} alt={item.title} className={`w-full object-cover transition duration-500 group-hover:scale-105 ${index % 3 === 0 ? 'aspect-[16/9]' : 'aspect-[4/5]'}`} />
                            </div>
                            <div className="p-5">
                                <Editable value={item.tag} className="text-[10px] uppercase tracking-[.2em]" style={{ color: accent }} />
                                <div className="mt-3 flex items-center justify-between">
                                    <Editable as="h3" value={item.title} onChange={(v) => { const next = [...items]; next[index] = { ...item, title: v }; onChange?.({ items: next }); }} className="text-xl font-semibold" />
                                    <ArrowUpRight size={18} style={{ color: accent }} />
                                </div>
                                <Editable as="p" value={item.copy} className="mt-2 text-sm leading-6" style={{ color: inkSecond }} />
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
