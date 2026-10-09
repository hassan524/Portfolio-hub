// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

const COURSES = [
    {
        num: 'I',
        name: 'Wild Brittany Scallop & Dashi Gelee',
        harvest: 'Morning low-tide harvest, Saint-Malo',
        desc: 'Hand-dived king scallop thinly sliced, set upon a cold extraction of smoked kombu, yuzu kosho pearls, and cold-pressed chrysanthemum oil.',
        pairing: 'Chassagne-Montrachet 1er Cru 2019',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    },
    {
        num: 'II',
        name: 'A5 Miyazaki Wagyu & Périgord Truffle',
        harvest: 'Aged 45 days, seared over grapevine embers',
        desc: 'Tender loin lightly kissed by vine coals, accompanied by a glossy 72-hour marrow reduction, smoked celeriac foam, and winter black truffle shavings.',
        pairing: 'Château Latour Grand Vin 2009',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    },
    {
        num: 'III',
        name: 'Turbot en Papillote & Saffron Beurre',
        harvest: 'Line-caught in the English Channel',
        desc: 'Steamed in parchment with sea asparagus and baby leeks, finished with wild Breton butter whipped with saffron threads from Provence.',
        pairing: 'Bâtard-Montrachet Grand Cru 2018',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    },
    {
        num: 'IV',
        name: 'Wild Alpine Strawberry & Aged Balsamico',
        harvest: 'Foraged high-elevation berries, Trentino',
        desc: 'Tiny intensely fragrant wild strawberries macerated with 25-year aged traditional Modena balsamic, warm Madagascar bourbon vanilla cloud.',
        pairing: 'Château d’Yquem 2011',
        image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    },
];

export function FoodBrand3Projects({ props = {}, theme, onChange }: any) {
    const [openIndex, setOpenIndex] = useState(0);
    const bg = theme?.bg || '#080604';
    const ink = theme?.ink || '#f5edd6';

    return (
        <section
            id="menu"
            className="w-full relative px-6 sm:px-12 py-28 select-none overflow-hidden border-t border-[#d4af5f]/20"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-6xl w-full relative z-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-12 mb-16 border-b border-[#d4af5f]/20">
                    <div>
                        <span className="text-[10px] uppercase tracking-[0.5em] text-[#d4af5f] block mb-2">
                            The Tasting Ledger
                        </span>
                        <h2
                            className="text-4xl sm:text-5xl font-light uppercase tracking-tight text-[#f5edd6]"
                            style={{ fontFamily: 'Georgia, serif' }}
                        >
                            <Editable
                                value={props?.ledgerHeading || 'Four Movements of Autumn'}
                                onChange={v => onChange?.({ ledgerHeading: v })}
                            />
                        </h2>
                    </div>
                    <div className="text-right">
                        <div className="text-xs uppercase tracking-widest text-[#d4af5f]">
                            Seasonal Tasting Menu
                        </div>
                        <div className="text-[11px] text-white/50 mt-1">
                            Paired Cellar Reserves
                        </div>
                    </div>
                </div>

                {/* Interactive Horizontal Accordion Rows */}
                <div className="space-y-4">
                    {COURSES.map((course, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={course.num}
                                className="border border-[#d4af5f]/20 rounded-2xl overflow-hidden transition-colors duration-300"
                                style={{ backgroundColor: isOpen ? 'rgba(212,175,95,0.04)' : 'transparent' }}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left group"
                                >
                                    <div className="flex items-center gap-6 sm:gap-12">
                                        <span className="text-base sm:text-xl font-mono text-[#d4af5f]/60 font-light">
                                            {course.num}
                                        </span>
                                        <div>
                                            <h3
                                                className="text-lg sm:text-2xl font-light text-[#f5edd6] group-hover:text-[#d4af5f] transition-colors"
                                                style={{ fontFamily: 'Georgia, serif' }}
                                            >
                                                {course.name}
                                            </h3>
                                            <span className="text-[10px] uppercase tracking-widest text-white/40 block mt-0.5">
                                                {course.harvest}
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronDown
                                        size={20}
                                        className={`text-[#d4af5f] transition-transform duration-300 ${
                                            isOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="px-8 pb-8 pt-2 grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-[#d4af5f]/10"
                                        >
                                            <div className="md:col-span-8 space-y-4">
                                                <p className="text-sm font-light text-[#f5edd6]/80 leading-relaxed">
                                                    {course.desc}
                                                </p>
                                                <div className="flex items-center gap-4 pt-2">
                                                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4af5f] font-mono">
                                                        Cellar Reserve:
                                                    </span>
                                                    <span className="text-xs font-light italic text-[#f5edd6]" style={{ fontFamily: 'Georgia, serif' }}>
                                                        {course.pairing}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="md:col-span-4">
                                                <div className="aspect-4/3 rounded-xl overflow-hidden border border-[#d4af5f]/30 shadow-lg">
                                                    <img
                                                        src={course.image}
                                                        alt={course.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export const ProjectsGrid = FoodBrand3Projects;
export default FoodBrand3Projects;
