// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const PRESS_QUOTES = [
    {
        publication: 'The New York Times',
        quote: 'Solstice has managed to capture the elusive lightning of deep, caramelized umami. This chili crisp belongs on every dining table.',
        author: 'Florence Fabricant',
    },
    {
        publication: 'Bon Appétit',
        quote: 'The single most versatile condiment in our test kitchen right now. It transforms a bowl of rice or a fried egg into an event.',
        author: 'Priya Krishna',
    },
    {
        publication: 'Food & Wine',
        quote: 'Proof that small-batch integrity still exists. The early-harvest wild garlic oil is bright, grassy, and genuinely sensational.',
        author: 'Food & Wine Editors',
    },
];

export function FoodBrand2Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#faf6f0';
    const ink = theme?.['ink-second'] || '#1c1917';

    return (
        <section
            id="press"
            className="w-full relative px-6 sm:px-12 py-24 select-none overflow-hidden border-t border-[#1c1917]/10"
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
                        Acclaim & Words
                    </span>
                    <h2
                        className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-[#1c1917] mb-4"
                        style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                    >
                        <Editable
                            value={props?.pressTitle || 'Praised by Chefs,\nLoved by Home Cooks'}
                            onChange={v => onChange?.({ pressTitle: v })}
                        />
                    </h2>
                </motion.div>

                {/* 3 Editorial Press Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PRESS_QUOTES.map((item, i) => (
                        <motion.div
                            key={item.publication}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100 flex flex-col justify-between"
                        >
                            <div>
                                <div className="text-[#df4d26] mb-6">
                                    <Quote size={28} />
                                </div>
                                <p className="text-base sm:text-lg font-bold text-gray-800 leading-relaxed italic mb-8">
                                    “{item.quote}”
                                </p>
                            </div>
                            <div className="pt-6 border-t border-gray-100">
                                <div className="text-base font-black text-[#1c1917]">
                                    {item.publication}
                                </div>
                                <div className="text-xs font-medium text-gray-400 mt-0.5">
                                    {item.author}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export const TestimonialsDefault = FoodBrand2Testimonials;
export default FoodBrand2Testimonials;
