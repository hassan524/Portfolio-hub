// @ts-nocheck
import { useState } from 'react';
import { ArrowUpRight, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const defaultItems = [
    {
        title: 'Petal Solitaire',
        category: 'Engagement Rings',
        copy: 'A rose-cut pink sapphire cradled by delicate petal prongs in 18k rose gold. Soft yet striking — like the woman who wears it.',
        price: 'From £4,800',
        image: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
        material: '18k Rose Gold · Pink Sapphire',
    },
    {
        title: 'Blossom Collar',
        category: 'Necklaces',
        copy: 'A graduated chain of rose quartz beads interspersed with tiny diamond-set gold flowers. Spring perpetually around your neck.',
        price: 'From £2,200',
        image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
        material: 'Sterling Silver · Rose Quartz',
    },
    {
        title: 'Butterfly Cuff',
        category: 'Bracelets',
        copy: 'Three dimensional butterfly in pavé-set pink diamonds perched on a flexible rose gold band. Wearable whimsy.',
        price: 'From £6,400',
        image: 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
        material: '18k Rose Gold · Pink Diamonds',
    },
    {
        title: 'Dew Drop Earrings',
        category: 'Earrings',
        copy: 'Pear-cut morganite drops with a diamond halo, catching every shift in light from morning to midnight.',
        price: 'From £1,900',
        image: 'https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
        material: '14k Rose Gold · Morganite',
    },
];

function isDarkColor(c?: string): boolean {
    if (!c) return false;
    const clean = c.replace('#', '').trim();
    if (clean.length < 6) return false;
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    return (r * 0.299 + g * 0.587 + b * 0.114) < 140;
}

// NO CARDS: uses a horizontal scroll strip + sidebar detail layout
export function JewelryBrand2Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FFF0F5';
    const bgSecond = theme?.['bg-second'] || '#FCE7F0';
    const isDark = isDarkColor(bg);

    const ink = isDark
        ? (theme?.ink && isDarkColor(theme.ink) ? '#FFF0F5' : theme?.ink || '#FFF0F5')
        : (theme?.ink && !isDarkColor(theme.ink) ? '#3D1A2E' : theme?.ink || '#3D1A2E');

    const inkSecond = isDark
        ? (theme?.['ink-second'] && isDarkColor(theme['ink-second']) ? '#F5B8D8' : theme?.['ink-second'] || '#F5B8D8')
        : (theme?.['ink-second'] && theme['ink-second'] !== '#000000' ? theme['ink-second'] : '#9B4F7C');

    const accent = theme?.accent || '#E8317A';
    const items = (props?.items && props.items.length > 0) ? props.items : defaultItems;
    const [activeIdx, setActiveIdx] = useState(0);
    const active = items[activeIdx];

    return (
        <section id="projects" className="relative overflow-hidden" style={{ backgroundColor: bg, color: ink }}>
            {/* Header */}
            <div className="px-6 pt-24 pb-12 mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease }}
                >
                    <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: accent }}>
                        <Editable value={props?.eyebrow || 'Signature Pieces'} onChange={v => onChange?.({ eyebrow: v })} />
                    </p>
                    <h2 className="font-serif text-5xl font-light leading-tight md:text-7xl">
                        <Editable value={props?.headline || 'Made with love,\nworn with intention'} onChange={v => onChange?.({ headline: v })} />
                    </h2>
                </motion.div>
            </div>

            {/* Main showcase — NO CARDS: split panel */}
            <div className="grid md:grid-cols-[1.1fr_0.9fr] min-h-[70vh]" style={{ borderTop: `1px solid ${accent}20` }}>
                {/* Left: large image */}
                <div className="relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={activeIdx}
                            src={active.image}
                            alt={active.title}
                            className="h-full w-full object-cover"
                            style={{ minHeight: 400 }}
                            initial={{ opacity: 0, scale: 1.08 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.7, ease }}
                        />
                    </AnimatePresence>
                    {/* Pink overlay */}
                    <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(135deg, ${accent}25 0%, transparent 60%)` }} />

                    {/* Nav arrows on image */}
                    <div className="absolute bottom-6 left-6 flex gap-2">
                        <button
                            type="button"
                            onClick={() => setActiveIdx((activeIdx - 1 + items.length) % items.length)}
                            className="grid h-10 w-10 place-items-center rounded-full backdrop-blur-sm transition-transform hover:scale-110"
                            style={{ backgroundColor: `${accent}cc`, color: 'white' }}
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveIdx((activeIdx + 1) % items.length)}
                            className="grid h-10 w-10 place-items-center rounded-full backdrop-blur-sm transition-transform hover:scale-110"
                            style={{ backgroundColor: `${accent}cc`, color: 'white' }}
                        >
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Right: details — no card, just text flow */}
                <div className="flex flex-col justify-between px-8 py-12" style={{ backgroundColor: bgSecond }}>
                    {/* Index selector — dots as text links, not cards */}
                    <div className="flex flex-wrap gap-4">
                        {items.map((item: any, idx: number) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setActiveIdx(idx)}
                                className="border-b pb-0.5 text-xs tracking-[0.15em] uppercase transition-all"
                                style={{
                                    color: idx === activeIdx ? accent : inkSecond,
                                    borderColor: idx === activeIdx ? accent : 'transparent',
                                    fontWeight: idx === activeIdx ? '500' : '300',
                                }}
                            >
                                {String(idx + 1).padStart(2, '0')}
                            </button>
                        ))}
                    </div>

                    {/* Active item detail */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIdx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5, ease }}
                        >
                            <p className="text-[10px] tracking-[0.35em] uppercase" style={{ color: accent }}>{active.category}</p>
                            <h3 className="mt-3 font-serif text-3xl font-light md:text-4xl">{active.title}</h3>
                            <p className="mt-5 text-sm leading-7 font-light" style={{ color: inkSecond }}>{active.copy}</p>
                            <p className="mt-3 text-xs tracking-[0.1em]" style={{ color: `${inkSecond}80` }}>{active.material}</p>
                            <p className="mt-6 font-serif text-2xl font-light" style={{ color: accent }}>{active.price}</p>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex flex-col gap-3">
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center justify-center gap-2 rounded-full py-3.5 px-8 text-sm font-medium text-white"
                            style={{ backgroundColor: accent }}
                        >
                            Commission This Piece <ArrowUpRight size={15} />
                        </motion.a>
                        <a href="#projects" className="text-center text-xs tracking-[0.2em] uppercase transition-opacity hover:opacity-60" style={{ color: inkSecond }}>
                            View Full Lookbook
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const Projects = JewelryBrand2Projects;
export default JewelryBrand2Projects;
