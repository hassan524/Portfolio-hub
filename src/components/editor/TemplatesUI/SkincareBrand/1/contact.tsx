// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function SkincareBrand1Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#5c778e';
    const ink = theme?.ink || '#FFFFFF';

    return (
        <section
            id="contact"
            className="w-full relative min-h-screen flex flex-col justify-between px-6 sm:px-14 py-24 select-none overflow-hidden"
            style={{
                backgroundColor: bg,
                color: ink
            }}
        >
            <div className="mx-auto max-w-4xl w-full my-auto space-y-12 text-center">
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/60 block">
                        THE CONSCIOUS BEAUTY COLLECTIVE
                    </span>
                    
                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light uppercase tracking-tight text-white leading-[1.1]">
                        <Editable
                            value={props?.title || 'JOIN THE NAAT 99 CLUB'}
                            onChange={v => onChange?.({ title: v })}
                        />
                    </h2>

                    <p className="text-xs sm:text-base text-white/80 max-w-xl mx-auto font-sans font-light leading-relaxed">
                        <Editable
                            value={props?.desc || 'Receive curated seasonal skincare routines, private studio drop alerts, and exclusive clean beauty formulation teardowns.'}
                            onChange={v => onChange?.({ desc: v })}
                        />
                    </p>
                </motion.div>

                {/* Newsletter Box */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-md mx-auto"
                >
                    <div className="flex items-center border-b-2 border-white/80 pb-2">
                        <input
                            type="email"
                            placeholder="YOUR EMAIL ADDRESS"
                            className="bg-transparent w-full text-xs font-mono text-white placeholder-white/50 focus:outline-none tracking-widest uppercase"
                        />
                        <button
                            type="button"
                            className="text-xs font-serif uppercase tracking-widest text-white hover:text-white/70 transition-colors flex items-center gap-2 shrink-0 pl-4"
                        >
                            <span>JOIN</span>
                            <ArrowRight size={14} />
                        </button>
                    </div>

                    <p className="text-[10px] text-white/50 font-mono tracking-wider pt-3">
                        Cruelty-Free · 100% Vegan · Carbon Neutral Shipping
                    </p>
                </motion.div>

            </div>
        </section>
    );
}

export const ContactForm = SkincareBrand1Contact;
export default SkincareBrand1Contact;
