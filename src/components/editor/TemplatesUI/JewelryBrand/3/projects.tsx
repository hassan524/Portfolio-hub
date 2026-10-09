// @ts-nocheck
import { useState } from 'react';
import { ShoppingBag, Eye, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

const defaultCollection = [
    {
        id: 'mj-01',
        title: 'EMERALD CLOVER PENDANT',
        category: 'Pendants',
        price: '$2,450',
        badge: 'FEATURED IN VOGUE',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
        desc: 'Untreated Colombian emerald set in 18k solid yellow gold with brilliant-cut halo diamonds.'
    },
    {
        id: 'mj-02',
        title: 'REGAL EMERALD CHOKER',
        category: 'Necklaces',
        price: '$18,500',
        badge: 'HIGH JEWELRY',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
        desc: 'Our iconic multi-strand collar choker adorned with natural emeralds and baguette diamonds.'
    },
    {
        id: 'mj-03',
        title: 'MARQUISE VERDANT RING',
        category: 'Rings',
        price: '$4,200',
        badge: 'NEW ARRIVAL',
        image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
        desc: '2.8ct marquise-cut emerald floating on an asymmetrical triple gold band.'
    },
    {
        id: 'mj-04',
        title: 'CUSHION DROP EARRINGS',
        category: 'Earrings',
        price: '$3,100',
        badge: 'ICONIC',
        image: 'https://images.unsplash.com/photo-1611591475817-5e60d4b971c2?auto=format&fit=crop&w=800&q=80',
        desc: 'Pair of luminous cushion-cut emerald drops designed to catch every light angle.'
    },
    {
        id: 'mj-05',
        title: 'TROPICAL EMERALD SOLITAIRE',
        category: 'Rings',
        price: '$2,900',
        badge: 'LIMITED',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
        desc: 'Inspired by rainforest botanicals, holding a vivid green gem in organic vine prongs.'
    },
    {
        id: 'mj-06',
        title: 'PAVÉ GOLD CUFF BRACELET',
        category: 'Bracelets',
        price: '$5,800',
        badge: 'SIGNATURE',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
        desc: 'Solid heavy 18k gold hinged cuff inlaid with rows of round emeralds and diamonds.'
    }
];

export function JewelryBrand3Projects({ props = {}, theme, onChange }: any) {
    const bg = '#0B2B20';
    const ink = '#FFFFFF';
    const inkSecond = '#A3C8B7';
    const accent = theme?.accent || '#E0C773';

    const items = (props?.items && props.items.length > 0) ? props.items : defaultCollection;
    const [filter, setFilter] = useState('ALL');
    const [bagCount, setBagCount] = useState(1);

    const filtered = filter === 'ALL' ? items : items.filter((it: any) => it.category?.toUpperCase() === filter);

    const updateItem = (idx: number, key: string, val: string) => {
        const next = items.map((it: any, i: number) => i === idx ? { ...it, [key]: val } : it);
        onChange?.({ items: next });
    };

    return (
        <section
            id="projects"
            className="relative py-24 md:py-36 px-6 md:px-14 border-b border-white/10"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl">
                {/* Header & Filter */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">
                            <Editable value={props?.eyebrow || 'CURATED HIGH ARCHIVE · 2026'} onChange={v => onChange?.({ eyebrow: v })} />
                        </p>
                        <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight mt-2">
                            <Editable value={props?.headline || 'The High Emerald Collection'} onChange={v => onChange?.({ headline: v })} />
                        </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {['ALL', 'PENDANTS', 'NECKLACES', 'RINGS', 'EARRINGS', 'BRACELETS'].map(cat => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setFilter(cat)}
                                className="px-5 py-2 rounded-full font-sans text-xs tracking-wider uppercase transition-all"
                                style={{
                                    backgroundColor: filter === cat ? '#FFFFFF' : 'rgba(255, 255, 255, 0.08)',
                                    color: filter === cat ? '#0B2B20' : '#A3C8B7',
                                    fontWeight: filter === cat ? '600' : '400'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 6 High Jewelry Showcase Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
                    {filtered.map((item: any, idx: number) => (
                        <div
                            key={item.id || idx}
                            className="group relative rounded-3xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-emerald-400/50 hover:shadow-2xl"
                            style={{ backgroundColor: 'rgba(11, 43, 32, 0.6)' }}
                        >
                            {/* Product Photo */}
                            <div className="relative aspect-[4/4] overflow-hidden bg-black/30">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {item.badge && (
                                    <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500 text-stone-950 font-bold shadow-md">
                                        <Editable value={item.badge} onChange={v => updateItem(idx, 'badge', v)} />
                                    </div>
                                )}

                                {/* Hover actions */}
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setBagCount(b => b + 1)}
                                        className="p-3.5 rounded-full bg-white text-stone-900 shadow-xl hover:scale-110 transition-transform"
                                        title="Acquire Piece"
                                    >
                                        <ShoppingBag size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-6 space-y-3">
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="font-serif text-lg font-light tracking-wide text-white">
                                        <Editable value={item.title} onChange={v => updateItem(idx, 'title', v)} />
                                    </h3>
                                    <span className="font-serif text-lg font-normal text-amber-200 shrink-0">
                                        <Editable value={item.price} onChange={v => updateItem(idx, 'price', v)} />
                                    </span>
                                </div>

                                <p className="text-xs font-light leading-relaxed line-clamp-2" style={{ color: inkSecond }}>
                                    <Editable value={item.desc} onChange={v => updateItem(idx, 'desc', v)} />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export const Projects = JewelryBrand3Projects;
export default JewelryBrand3Projects;
