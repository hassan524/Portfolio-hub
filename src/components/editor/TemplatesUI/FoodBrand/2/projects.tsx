// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { Sparkles, Utensils } from 'lucide-react';

const PRODUCTS = [
    {
        title: 'Barrel-Aged Chili Crisp',
        subtitle: 'Batch No. 12',
        flavor: 'Crunchy • Smoky • Umami Heat',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        desc: 'Crushed heirloom chilies, toasted sesame seeds, crispy shallots, and fermented black beans steeped in wood-pressed rapeseed oil.',
        pairsWith: 'Fried eggs, creamy burrata, grilled meats, and noodles.',
    },
    {
        title: 'Wild Garlic & Herb Olive Oil',
        subtitle: 'Early Harvest 2024',
        flavor: 'Bright • Herbaceous • Peppery Finish',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
        desc: 'Single-estate Koroneiki olives cold-extracted with wild California ramp bulbs and fresh oregano harvested at dawn.',
        pairsWith: 'Crusty sourdough, heirloom Caprese, roast fish, and risotto.',
    },
    {
        title: 'Applewood Smoked Hot Honey',
        subtitle: 'Wildflower Nectar',
        flavor: 'Sweet Floral • Subtle Smoke • Lingering Zing',
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
        desc: 'Raw Northern California mountain honey cold-smoked over sweet applewood chips and finished with a pinch of habanero.',
        pairsWith: 'Artisan cheese boards, crispy pizza, fried chicken, and pastries.',
    },
];

export function FoodBrand2Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#faf6f0';
    const ink = theme?.['ink-second'] || '#1c1917';

    return (
        <section
            id="collection"
            className="w-full relative px-6 sm:px-12 py-24 select-none overflow-hidden"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl w-full relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16 max-w-2xl mx-auto"
                >
                    <span className="text-xs font-black uppercase tracking-widest text-[#df4d26] mb-3 block">
                        Signature Staples
                    </span>
                    <h2
                        className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-[#1c1917] mb-4"
                        style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                    >
                        <Editable
                            value={props?.collectionTitle || 'The Pantry Collection'}
                            onChange={v => onChange?.({ collectionTitle: v })}
                        />
                    </h2>
                    <p className="text-gray-600 text-base font-medium">
                        Thoughtfully crafted provisions engineered to bring instant depth, brightness, and texture to every home meal.
                    </p>
                </motion.div>

                {/* 3 Signature Food Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PRODUCTS.map((prod, i) => (
                        <motion.div
                            key={prod.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300"
                        >
                            <div>
                                <div className="aspect-4/3 w-full overflow-hidden relative">
                                    <img
                                        src={prod.image}
                                        alt={prod.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/95 text-[#df4d26] shadow-sm">
                                        {prod.subtitle}
                                    </span>
                                </div>

                                <div className="p-8">
                                    <h3 className="text-xl font-black text-gray-900 leading-snug mb-1">
                                        {prod.title}
                                    </h3>
                                    <div className="text-xs font-bold text-[#df4d26] uppercase tracking-wide mb-3">
                                        {prod.flavor}
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">
                                        {prod.desc}
                                    </p>

                                    {/* Food Pairing note */}
                                    <div className="pt-4 border-t border-gray-100 flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-full bg-[#faf6f0] text-[#1c1917] flex items-center justify-center shrink-0 mt-0.5">
                                            <Utensils size={14} />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">
                                                Best Paired With
                                            </span>
                                            <span className="text-xs font-bold text-gray-800">
                                                {prod.pairsWith}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export const ProjectsGrid = FoodBrand2Projects;
export default FoodBrand2Projects;
