// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

const MOVEMENTS = [
    {
        num: '01',
        title: 'Wild Terroir & Foraged Harvest',
        desc: 'Our pantry changes every seven days. Coastal kelp gathered from Brittany at low tide, wild autumn morels from the Sologne forests, and heirloom winter citrus from Menton.',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
        quote: '“To cook with terroir is not to alter the ingredient, but to erase everything that stands between nature and the palate.”',
    },
    {
        num: '02',
        title: 'The Vine-Wood Hearth',
        desc: 'We use no gas or electric ranges. Every element is kissed by embers of aged Burgundy grapevine cuttings, creating clean, gentle aromatics of dried fruit and cedar.',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
        quote: '“Fire is our only timer. Heat is our only seasoning.”',
    },
    {
        num: '03',
        title: 'The Subterranean Cellar',
        desc: 'Carved directly into Parisian limestone in the 17th century, our cellar maintains 11°C naturally. Houses 4,200 curated biodynamic bottles and rare single-cask vintages.',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
        quote: '“Each wine is selected not for its reputation, but for its dialogue with the dish.”',
    },
];

export function FoodBrand3About({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#0e0c09';
    const ink = theme?.['ink-second'] || '#f5edd6';

    return (
        <section
            id="story"
            className="w-full relative px-6 sm:px-12 py-28 select-none overflow-hidden"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl w-full relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-[#d4af5f]/20 mb-20">
                    <div>
                        <span className="text-[10px] uppercase tracking-[0.5em] text-[#d4af5f] block mb-2">
                            The Philosophy
                        </span>
                        <h2
                            className="text-4xl sm:text-6xl font-light uppercase tracking-tight text-[#f5edd6]"
                            style={{ fontFamily: 'Georgia, serif' }}
                        >
                            <Editable
                                value={props?.storyHeading || 'The Three\nDisciplines'}
                                onChange={v => onChange?.({ storyHeading: v })}
                            />
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#f5edd6]/60 max-w-sm font-light leading-relaxed">
                        An unyielding commitment to purity, ancient culinary techniques, and natural harmony.
                    </p>
                </div>

                {/* Staggered Full-Width Editorial Journal Rows */}
                <div className="space-y-28">
                    {MOVEMENTS.map((item, i) => (
                        <motion.div
                            key={item.num}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                                i % 2 === 1 ? 'lg:flex-row-reverse' : ''
                            }`}
                        >
                            {/* Left Text Detail */}
                            <div className={`lg:col-span-5 space-y-6 ${i % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                                <div className="text-4xl sm:text-5xl font-mono text-[#d4af5f]/40 font-light">
                                    {item.num}
                                </div>
                                <h3
                                    className="text-2xl sm:text-3xl font-light text-[#f5edd6] leading-snug"
                                    style={{ fontFamily: 'Georgia, serif' }}
                                >
                                    {item.title}
                                </h3>
                                <p className="text-sm text-[#f5edd6]/70 leading-relaxed font-light">
                                    {item.desc}
                                </p>
                                <blockquote className="p-4 border-l-2 border-[#d4af5f] text-xs font-light italic text-[#d4af5f]/90 leading-relaxed">
                                    {item.quote}
                                </blockquote>
                            </div>

                            {/* Right Letterbox 16:9 Image */}
                            <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                                <div className="aspect-16/9 rounded-2xl overflow-hidden border border-[#d4af5f]/25 shadow-2xl relative group">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export const AboutSimple = FoodBrand3About;
export default FoodBrand3About;
