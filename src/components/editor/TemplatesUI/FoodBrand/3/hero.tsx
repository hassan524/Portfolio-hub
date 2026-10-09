// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';

export function FoodBrand3Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#080604';
    const ink = theme?.ink || '#f5edd6';

    return (
        <section
            id="hero"
            className="w-full relative min-h-screen flex flex-col justify-center select-none pt-28 pb-16 overflow-hidden"
            style={{ backgroundColor: bg, color: ink }}
        >
            {/* Subtle atmospheric vignette */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                    background: 'radial-gradient(circle at 70% 30%, rgba(212,175,95,0.08) 0%, transparent 60%)',
                }}
            />

            <div className="mx-auto max-w-7xl w-full px-6 sm:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column (7 cols): Giant Editorial Type + Arched Plated Dish Inset */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        className="lg:col-span-7 space-y-8"
                    >
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-px bg-[#d4af5f]" />
                            <span className="text-[10px] uppercase tracking-[0.4em] text-[#d4af5f]">
                                Three Michelin Stars · Paris
                            </span>
                        </div>

                        <h1
                            className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight uppercase leading-[0.95]"
                            style={{ fontFamily: 'Georgia, serif' }}
                        >
                            <Editable
                                value={props?.headline || 'A Study in\nSensory\nRestraint.'}
                                onChange={v => onChange?.({ headline: v })}
                            />
                        </h1>

                        <p className="text-base sm:text-lg text-[#f5edd6]/70 max-w-lg font-light leading-relaxed">
                            <Editable
                                value={props?.subtext || 'We do not follow trends. Every evening, fourteen guests enter our stone dining room for an unhurried seven-course exploration of wild French terroir.'}
                                onChange={v => onChange?.({ subtext: v })}
                            />
                        </p>

                        <div className="flex flex-wrap items-center gap-6 pt-2">
                            <a
                                href="#menu"
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.25em] bg-[#d4af5f] text-[#080604] hover:bg-white transition-all shadow-xl"
                            >
                                <span>The Autumn Ledger</span>
                                <ArrowDownRight size={14} />
                            </a>
                            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#d4af5f]/80">
                                Strictly 14 Covers Per Evening
                            </div>
                        </div>

                        {/* Arch Photo Inset */}
                        <div className="pt-6 flex items-center gap-6 border-t border-[#d4af5f]/20">
                            <div className="w-24 h-32 rounded-t-full overflow-hidden shrink-0 border border-[#d4af5f]/40 shadow-lg">
                                <img
                                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80"
                                    alt="Plated dish"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <span className="text-[9px] font-mono uppercase tracking-widest text-[#d4af5f]">
                                    Current Movement
                                </span>
                                <h4 className="text-sm font-light text-[#f5edd6] mt-0.5" style={{ fontFamily: 'Georgia, serif' }}>
                                    A5 Miyazaki Wagyu & Périgord Truffle
                                </h4>
                                <span className="text-[10px] text-white/40 block mt-1">
                                    Paired with Château Latour 2009
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column (5 cols): Tall Portrait Frame with Plating Imagery & Golden Coordinates */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden aspect-3/4 border border-[#d4af5f]/30 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"
                                alt="Obsidian Culinary Atelier"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080604] via-transparent to-black/30 p-8 flex flex-col justify-between">
                                <div className="flex justify-end">
                                    <span className="px-3 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase bg-[#080604]/80 text-[#d4af5f] border border-[#d4af5f]/30 backdrop-blur-md">
                                        48°51′N 2°20′E
                                    </span>
                                </div>
                                <div>
                                    <span className="text-[9px] uppercase tracking-[0.4em] text-[#d4af5f] block mb-1">
                                        Head Chef & Maître
                                    </span>
                                    <h3 className="text-xl font-light text-white" style={{ fontFamily: 'Georgia, serif' }}>
                                        Laurent Delacroix
                                    </h3>
                                    <p className="text-xs text-white/60 font-light mt-1">
                                        Grand Prix de la Gastronomie Française
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Razor-sharp gold hairline divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d4af5f]/40 to-transparent mt-16" />
        </section>
    );
}

export const HeroCentered = FoodBrand3Hero;
export default FoodBrand3Hero;
