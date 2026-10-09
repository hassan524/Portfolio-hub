// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { Star, Eye, Heart } from 'lucide-react';

const GALLERY_ITEMS = [
    {
        title: 'Artisan Grilled Sourdough Melt',
        category: 'Signature Lunch',
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80',
        rating: '5.0 ★',
    },
    {
        title: 'Slow-Glazed Pork Belly Bao',
        category: 'Chef Creation',
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80',
        rating: '4.9 ★',
    },
    {
        title: 'Seared Wild Herb Salmon',
        category: 'Dinner Special',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=700&q=80',
        rating: '5.0 ★',
    },
    {
        title: 'Charred Artisan Tacos',
        category: 'Street Inspiration',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=700&q=80',
        rating: '4.9 ★',
    },
];

export function FoodBrand1Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#fbf7ee';
    const ink = theme?.['ink-second'] || '#1e523c';

    return (
        <section
            id="gallery"
            className="w-full relative px-6 sm:px-12 py-20 select-none overflow-hidden"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl w-full relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-14 max-w-2xl mx-auto"
                >
                    <h2
                        className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4"
                        style={{ color: '#1e523c', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                    >
                        <Editable
                            value={props?.galleryTitle || 'A Feast for the Eyes'}
                            onChange={v => onChange?.({ galleryTitle: v })}
                        />
                    </h2>
                    <p className="text-gray-600 text-base font-medium">
                        <Editable
                            value={props?.gallerySubtitle || 'Every plate is designed with balanced color, tantalizing textures, and unforgettable aroma.'}
                            onChange={v => onChange?.({ gallerySubtitle: v })}
                        />
                    </p>
                </motion.div>

                {/* Gallery Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {GALLERY_ITEMS.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col group hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="aspect-square w-full overflow-hidden relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-black bg-white/95 text-[#1e523c] shadow-sm">
                                    {item.rating}
                                </span>
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                        {item.category}
                                    </span>
                                    <h3 className="text-base font-bold text-gray-900 mt-1 leading-snug">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Patron Quote Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mt-14 max-w-4xl mx-auto rounded-3xl p-8 sm:p-10 border border-[#1e523c]/10 bg-white/70 shadow-sm flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
                >
                    <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#1e523c]">
                        <img
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                            alt="Happy Diner"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <div className="flex justify-center sm:justify-start gap-1 text-[#e35833] mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={15} fill="#e35833" />
                            ))}
                        </div>
                        <p className="text-gray-800 font-semibold text-base italic leading-relaxed">
                            “The crunch of the fries, the tenderness of the chicken, and the warm bakery aroma made our evening truly magical.”
                        </p>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#1e523c] mt-2">
                            Elena Rostova — Verified Guest
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export const TestimonialsDefault = FoodBrand1Testimonials;
export default FoodBrand1Testimonials;
