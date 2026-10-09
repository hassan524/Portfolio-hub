// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function EventConference3Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#121218';
    const ink = theme?.ink || '#FFFFFF';

    return (
        <section
            id="contact"
            className="w-full py-28 sm:py-40 px-6 md:px-14 text-white select-none transition-colors border-t border-white/10"
            style={{
                backgroundColor: bg,
                color: ink
            }}
        >
            <div className="mx-auto max-w-5xl space-y-12">
                
                {/* Framer Motion Animated Text Block */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/50 block">
                        THE EUROPEAN DESIGN SUMMIT · NOVEMBER 2026
                    </span>

                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight leading-[1.05] font-sans">
                        <Editable
                            value={props?.title || 'JOIN 800 CREATIVE DELEGATES IN BERLIN.'}
                            onChange={v => onChange?.({ title: v })}
                        />
                    </h2>

                    <p className="text-lg sm:text-2xl text-white/80 leading-relaxed font-light max-w-3xl pt-2">
                        <Editable
                            value={props?.desc || 'The Grand Design Pavilion & Soundstage · Köpenicker Str. 70, 10179 Berlin, Germany.'}
                            onChange={v => onChange?.({ desc: v })}
                        />
                    </p>

                    <p className="text-sm sm:text-base text-white/60 leading-relaxed font-normal max-w-2xl">
                        Three days of spatial craft, world-class keynote masterclasses, and executive roundtables. Limited passes available to maintain an intimate learning atmosphere.
                    </p>
                </motion.div>

                {/* Direct Action Link & Inquiries */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                    <div className="space-y-1">
                        <p className="text-xs font-mono uppercase tracking-wider text-white/40">
                            DELEGATE & PRESS RELATIONS
                        </p>
                        <a
                            href="mailto:concierge@hatchsummit.eu"
                            className="text-base sm:text-lg font-mono font-semibold text-white hover:text-white/70 transition-colors"
                        >
                            concierge@hatchsummit.eu
                        </a>
                    </div>

                    <a
                        href="#top"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all shadow-xl"
                    >
                        <span>Apply for Delegate Accreditation</span>
                        <ArrowRight size={14} />
                    </a>
                </motion.div>

            </div>
        </section>
    );
}

export const ContactForm = EventConference3Contact;
export default EventConference3Contact;
