// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { Compass, Calendar, Users, Wine } from 'lucide-react';

export function FoodBrand3Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#080604';
    const ink = theme?.ink || '#f5edd6';

    return (
        <section
            id="reservations"
            className="w-full relative px-6 sm:px-12 py-28 select-none overflow-hidden border-t border-[#d4af5f]/20"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-6xl w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left: Concierge Seating Salon Selection */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 space-y-8"
                    >
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.5em] text-[#d4af5f] block mb-2">
                                Private Concierge
                            </span>
                            <h2
                                className="text-4xl sm:text-5xl font-light uppercase tracking-tight text-[#f5edd6]"
                                style={{ fontFamily: 'Georgia, serif' }}
                            >
                                <Editable
                                    value={props?.reserveHeading || 'Request Table Seating'}
                                    onChange={v => onChange?.({ reserveHeading: v })}
                                />
                            </h2>
                            <p className="text-xs sm:text-sm text-[#f5edd6]/60 font-light mt-3 max-w-md leading-relaxed">
                                Due to the intimate fourteen-cover format, reservations open thirty days in advance at midnight Central European Time.
                            </p>
                        </div>

                        {/* Interactive Seating Choice Pills */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 rounded-2xl border border-[#d4af5f]/30 bg-[#d4af5f]/5 space-y-2">
                                <span className="text-[10px] uppercase tracking-widest text-[#d4af5f] font-mono">
                                    Salon A • 8 Covers
                                </span>
                                <h4 className="text-base font-light text-[#f5edd6]" style={{ fontFamily: 'Georgia, serif' }}>
                                    The Hearth Counter
                                </h4>
                                <p className="text-xs text-white/50 font-light leading-relaxed">
                                    Direct culinary dialogue with Chef Delacroix.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl border border-[#d4af5f]/20 bg-transparent space-y-2">
                                <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
                                    Salon B • 6 Covers
                                </span>
                                <h4 className="text-base font-light text-[#f5edd6]" style={{ fontFamily: 'Georgia, serif' }}>
                                    The Vault Room
                                </h4>
                                <p className="text-xs text-white/50 font-light leading-relaxed">
                                    Private subterranean limestone enclave.
                                </p>
                            </div>
                        </div>

                        {/* Request CTA Button */}
                        <a
                            href="mailto:concierge@obsidian-atelier.fr"
                            className="inline-block px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.3em] bg-[#d4af5f] text-[#080604] hover:bg-white transition-all shadow-xl"
                        >
                            Open Reservation Ledger
                        </a>
                    </motion.div>

                    {/* Right: Architectural Salon Coordinates & House Rules */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5 p-8 rounded-3xl border border-[#d4af5f]/20 bg-[#0e0c09] space-y-6 shadow-2xl"
                    >
                        <div className="flex items-center gap-3 text-[#d4af5f]">
                            <Compass size={18} />
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
                                Atelier Location
                            </span>
                        </div>

                        <div className="space-y-1">
                            <h4 className="text-lg font-light text-[#f5edd6]" style={{ fontFamily: 'Georgia, serif' }}>
                                14 Rue de Beaujolais, 75001 Paris
                            </h4>
                            <p className="text-xs text-white/50 font-light">
                                Discretely located via the inner courtyard of the Palais-Royal.
                            </p>
                        </div>

                        <div className="pt-6 border-t border-[#d4af5f]/15 space-y-3 text-xs text-white/60 font-light">
                            <div className="flex justify-between">
                                <span className="uppercase tracking-widest text-[#d4af5f]/70 font-mono text-[10px]">Service:</span>
                                <span>Tuesday – Saturday (19:30 seating)</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="uppercase tracking-widest text-[#d4af5f]/70 font-mono text-[10px]">Attire:</span>
                                <span>Formal Evening Dress</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="uppercase tracking-widest text-[#d4af5f]/70 font-mono text-[10px]">Concierge:</span>
                                <span>+33 (0)1 42 68 00 12</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export const ContactForm = FoodBrand3Contact;
export default FoodBrand3Contact;
