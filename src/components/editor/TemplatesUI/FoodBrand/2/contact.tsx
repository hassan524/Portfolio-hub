// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { MapPin, Store, Mail, ArrowRight } from 'lucide-react';

const STOCKISTS = [
    { name: 'Erewhon Market', location: 'Los Angeles • 10 Locations', tag: 'Full Range' },
    { name: 'Whole Foods Market', location: 'Northern California & Pacific NW', tag: 'Chili Crisp & Honey' },
    { name: 'Bi-Rite Market', location: 'San Francisco • Mission & Divisadero', tag: 'Full Range' },
    { name: 'Central Market', location: 'Texas • Austin, Dallas, Houston', tag: 'Olive Oils & Crisp' },
    { name: 'Murray’s Cheese', location: 'New York City • Greenwich Village', tag: 'Pantry Pairings' },
    { name: 'Artisan Grocers Co.', location: 'Nationwide Specialty Independent Grocers', tag: 'Seasonal Drops' },
];

export function FoodBrand2Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#faf6f0';
    const ink = theme?.['ink-second'] || '#1c1917';

    return (
        <section
            id="stockists"
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
                        Retail Partners
                    </span>
                    <h2
                        className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-[#1c1917] mb-4"
                        style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                    >
                        <Editable
                            value={props?.stockistsTitle || 'Find Us on Shelves\nAcross the Country'}
                            onChange={v => onChange?.({ stockistsTitle: v })}
                        />
                    </h2>
                    <p className="text-gray-600 text-base font-medium">
                        Available at leading independent grocers, specialty cheese shops, and farm-to-table markets.
                    </p>
                </motion.div>

                {/* Stockists Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
                    {STOCKISTS.map((item, i) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex items-start gap-4 hover:shadow-lg transition-shadow"
                        >
                            <div className="w-10 h-10 rounded-2xl bg-[#df4d26]/10 text-[#df4d26] flex items-center justify-center shrink-0">
                                <Store size={20} />
                            </div>
                            <div className="flex-1">
                                <span className="text-[10px] font-black uppercase tracking-wider text-[#df4d26] bg-[#df4d26]/10 px-2 py-0.5 rounded-full inline-block mb-1">
                                    {item.tag}
                                </span>
                                <h3 className="text-base font-black text-gray-900 leading-snug">
                                    {item.name}
                                </h3>
                                <p className="text-xs text-gray-500 font-medium mt-1">
                                    {item.location}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Chef & Wholesale Box */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-[#1c1917] text-white rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
                >
                    <div className="space-y-2 text-center md:text-left">
                        <span className="text-xs font-black uppercase tracking-widest text-[#f2a93b]">
                            Restaurants & Wholesale
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-white">
                            Are you a chef or specialty retailer?
                        </h3>
                        <p className="text-sm text-white/70 max-w-md">
                            We supply high-volume tins and custom restaurant batch sizes for professional kitchens.
                        </p>
                    </div>

                    <a
                        href="mailto:wholesale@solsticeprovisions.com"
                        className="px-8 py-4 rounded-full text-xs font-black uppercase tracking-wider bg-[#df4d26] text-white hover:scale-105 transition-transform duration-200 shrink-0"
                    >
                        Request Sample Kit
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

export const ContactForm = FoodBrand2Contact;
export default FoodBrand2Contact;
