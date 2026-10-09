// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

export function FoodBrand1Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#1e523c';
    const ink = theme?.ink || '#ffffff';

    return (
        <section
            id="contact"
            className="w-full relative px-6 sm:px-12 py-20 select-none overflow-hidden"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl w-full relative z-10">
                {/* 1. The Numbers That Define Us (Direct from Reference Image) */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16 max-w-2xl mx-auto"
                >
                    <h2
                        className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white mb-3"
                        style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                    >
                        <Editable
                            value={props?.numbersTitle || 'The Numbers That\nDefine Us'}
                            onChange={v => onChange?.({ numbersTitle: v })}
                        />
                    </h2>
                    <p className="text-white/80 text-base font-medium">
                        Real food cooked for real people, day after day with zero shortcuts.
                    </p>
                </motion.div>

                {/* Badges + Customer Photo Composite Showcase */}
                <div className="relative max-w-2xl mx-auto flex items-center justify-center py-10 mb-20">
                    {/* Yellow Diamond Badge (Left) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="absolute -left-2 sm:left-4 top-4 z-20 w-28 sm:w-36 h-28 sm:h-36 rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-2xl"
                        style={{
                            backgroundColor: '#eef26d',
                            color: '#1e523c',
                            transform: 'rotate(-8deg)',
                        }}
                    >
                        <span className="text-2xl sm:text-3xl font-black leading-none">98%</span>
                        <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mt-1">
                            Happy Customers
                        </span>
                    </motion.div>

                    {/* Center Customer Portrait */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="w-48 sm:w-60 h-48 sm:h-60 rounded-full overflow-hidden shadow-2xl border-4 border-white/20 relative z-10"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                            alt="Happy food diner"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Circular Yellow Sticker Badge (Bottom / Center-Left) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="absolute bottom-0 left-12 sm:left-24 z-20 w-24 sm:w-32 h-24 sm:h-32 rounded-full flex flex-col items-center justify-center p-3 text-center shadow-2xl"
                        style={{
                            backgroundColor: '#ffd700',
                            color: '#1e523c',
                        }}
                    >
                        <span className="text-xl sm:text-2xl font-black leading-none">15k+</span>
                        <span className="text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wider mt-1">
                            Meals Served
                        </span>
                    </motion.div>

                    {/* Light Blue Scalloped Starburst Badge (Right) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 8 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="absolute -right-2 sm:right-6 top-8 z-20 w-28 sm:w-36 h-28 sm:h-36 rounded-3xl flex flex-col items-center justify-center p-3 text-center shadow-2xl"
                        style={{
                            backgroundColor: '#98cbeb',
                            color: '#0d3824',
                            transform: 'rotate(8deg)',
                        }}
                    >
                        <span className="text-2xl sm:text-3xl font-black leading-none">10+</span>
                        <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mt-1">
                            Years of Passion
                        </span>
                    </motion.div>
                </div>

                {/* 2. Visit Us & Table Reservation Info Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-3xl p-8 sm:p-12 text-gray-900 shadow-2xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-[#1e523c]/10 text-[#1e523c] flex items-center justify-center shrink-0">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-400">Our Location</h4>
                            <p className="text-sm font-bold text-gray-900 mt-1">
                                <Editable value={props?.location || '742 Evergreen Terrace, Downtown culinary district'} onChange={v => onChange?.({ location: v })} />
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-[#1e523c]/10 text-[#1e523c] flex items-center justify-center shrink-0">
                            <Clock size={20} />
                        </div>
                        <div>
                            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-400">Opening Hours</h4>
                            <p className="text-sm font-bold text-gray-900 mt-1">
                                <Editable value={props?.hours || 'Tue – Sun: 11:30 AM – 10:00 PM (Mon Closed)'} onChange={v => onChange?.({ hours: v })} />
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-[#1e523c]/10 text-[#1e523c] flex items-center justify-center shrink-0">
                            <Phone size={20} />
                        </div>
                        <div>
                            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-400">Get in Touch</h4>
                            <p className="text-sm font-bold text-gray-900 mt-1">
                                <Editable value={props?.phone || '+1 (555) 349-2810 / hello@tasteory.com'} onChange={v => onChange?.({ phone: v })} />
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export const ContactForm = FoodBrand1Contact;
export default FoodBrand1Contact;
