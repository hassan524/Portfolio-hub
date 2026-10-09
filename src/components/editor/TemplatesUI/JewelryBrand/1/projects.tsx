// @ts-nocheck
import { useState } from 'react';
import { ShoppingBag, Eye, Heart, Star, Sparkles } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

function isDarkColor(c?: string): boolean {
    if (!c) return false;
    const clean = c.replace('#', '').trim();
    if (clean.length < 6) return false;
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    return (r * 0.299 + g * 0.587 + b * 0.114) < 140;
}

const defaultProducts = [
    {
        id: 'ad-01',
        title: 'GOLDEN LOOP',
        category: 'Rings',
        price: '$120',
        badge: 'BEST SELLER',
        material: '18k Solid Gold',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'ad-02',
        title: 'HALO SHINE',
        category: 'Necklaces',
        price: '$150',
        badge: 'NEW',
        material: 'Diamond & White Gold',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'ad-03',
        title: 'PEARL MIST',
        category: 'Rings',
        price: '$95',
        badge: 'POPULAR',
        material: 'Freshwater Pearl · 14k Gold',
        image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'ad-04',
        title: 'LUNA DROP',
        category: 'Necklaces',
        price: '$110',
        badge: 'LIMITED',
        material: 'Crescent Moon Gold',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'ad-05',
        title: 'DUSK DROP',
        category: 'Bracelets',
        price: '$75',
        badge: 'ESSENTIAL',
        material: 'Draping Chain 18k',
        image: 'https://images.unsplash.com/photo-1611591475817-5e60d4b971c2?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'ad-06',
        title: 'TWIST HOOPS',
        category: 'Earrings',
        price: '$70',
        badge: 'TRENDING',
        material: 'Sculptural Gold Huggies',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    }
];

export function JewelryBrand1Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FBF8F5';
    const isDark = isDarkColor(bg);

    const ink = isDark
        ? (theme?.ink && isDarkColor(theme.ink) ? '#FFFFFF' : theme?.ink || '#FFFFFF')
        : (theme?.ink && !isDarkColor(theme.ink) ? '#1C1917' : theme?.ink || '#1C1917');

    const inkSecond = isDark
        ? (theme?.['ink-second'] && isDarkColor(theme['ink-second']) ? '#D6D3D1' : theme?.['ink-second'] || '#D6D3D1')
        : (theme?.['ink-second'] && theme['ink-second'] !== '#000000' ? theme['ink-second'] : '#78716C');

    const accent = theme?.accent || '#B48C56';
    const surface = isDark ? 'rgba(255, 255, 255, 0.05)' : (theme?.surface || '#F5ECE1');

    const products = (props?.items && props.items.length > 0) ? props.items : defaultProducts;
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [cartCount, setCartCount] = useState(0);

    const filtered = activeFilter === 'ALL'
        ? products
        : products.filter((p: any) => p.category?.toUpperCase() === activeFilter);

    const updateProduct = (idx: number, key: string, val: string) => {
        const next = products.map((item: any, i: number) => i === idx ? { ...item, [key]: val } : item);
        onChange?.({ items: next });
    };

    return (
        <section
            id="projects"
            className="relative py-24 md:py-36 px-6 md:px-14 border-b"
            style={{
                backgroundColor: bg,
                color: ink,
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
            }}
        >
            <div className="mx-auto max-w-7xl">
                {/* Header from Image 3: "HANDPICKED JEWELRY TO REFLECT YOU" */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }}>
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: accent }}>
                            <Editable value={props?.eyebrow || 'CURATED SHOWCASE · 2026'} onChange={v => onChange?.({ eyebrow: v })} />
                        </p>
                        <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight mt-2">
                            <Editable value={props?.headline || 'Handpicked Jewelry to Reflect You'} onChange={v => onChange?.({ headline: v })} />
                        </h2>
                    </div>

                    {/* Filter categories */}
                    <div className="flex flex-wrap items-center gap-2">
                        {['ALL', 'RINGS', 'NECKLACES', 'BRACELETS', 'EARRINGS'].map(cat => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setActiveFilter(cat)}
                                className="px-5 py-2 rounded-full font-sans text-xs font-semibold tracking-wider transition-all"
                                style={{
                                    backgroundColor: activeFilter === cat ? (isDark ? '#FFFFFF' : '#1C1917') : surface,
                                    color: activeFilter === cat ? (isDark ? '#1C1917' : '#FFFFFF') : inkSecond,
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 6 Luxury Product Cards Grid (Matching Image 3) */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
                    {filtered.map((item: any, idx: number) => (
                        <div
                            key={item.id || idx}
                            className="group relative rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl"
                            style={{
                                backgroundColor: isDark ? 'rgba(28,25,23,0.6)' : '#FFFFFF',
                                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
                            }}
                        >
                            {/* Product Photo with Badge */}
                            <div className="relative aspect-[4/4] overflow-hidden bg-black/5">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Badge */}
                                {item.badge && (
                                    <div
                                        className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-bold shadow-sm"
                                        style={{ backgroundColor: accent, color: '#FFFFFF' }}
                                    >
                                        <Editable value={item.badge} onChange={v => updateProduct(idx, 'badge', v)} />
                                    </div>
                                )}

                                {/* Hover actions */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setCartCount(c => c + 1)}
                                        className="p-3 rounded-full bg-white text-stone-900 shadow-lg hover:scale-110 transition-transform"
                                        title="Add to Bag"
                                    >
                                        <ShoppingBag size={16} />
                                    </button>
                                    <button
                                        type="button"
                                        className="p-3 rounded-full bg-white text-stone-900 shadow-lg hover:scale-110 transition-transform"
                                        title="Quick Look"
                                    >
                                        <Eye size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Card Content (Title, Material, Price) */}
                            <div className="p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="font-sans text-sm font-semibold tracking-wide">
                                        <Editable value={item.title} onChange={v => updateProduct(idx, 'title', v)} />
                                    </h3>
                                    <p className="text-xs font-light mt-0.5" style={{ color: inkSecond }}>
                                        <Editable value={item.material} onChange={v => updateProduct(idx, 'material', v)} />
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="font-serif text-lg font-medium" style={{ color: accent }}>
                                        <Editable value={item.price} onChange={v => updateProduct(idx, 'price', v)} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom View All Link */}
                <div className="mt-14 text-center">
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border text-xs uppercase tracking-widest font-semibold transition-all hover:bg-stone-900 hover:text-white"
                        style={{ borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }}
                    >
                        <span>VIEW ENTIRE CATALOGUE</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

export const Projects = JewelryBrand1Projects;
export default JewelryBrand1Projects;
