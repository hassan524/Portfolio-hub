// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { MapPin, Calendar, Clock, ArrowRight, Sparkles, Navigation, Globe, CheckCircle2 } from 'lucide-react';

export function EventConference2Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#000000';
    const ink = theme?.ink || '#FFFFFF';
    const accent = theme?.accent || '#FFD600';

    return (
        <section
            id="contact"
            className="w-full py-20 sm:py-28 px-4 sm:px-8 text-white select-none transition-colors border-t border-neutral-900"
            style={{
                backgroundColor: bg,
                color: ink
            }}
        >
            <div className="mx-auto max-w-7xl space-y-16">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto space-y-3">
                    <p className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: accent }}>
                        LOCATION & SUMMIT ACCESS · TORONTO 2026
                    </p>
                    <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight font-sans">
                        <Editable value={props?.title || 'Experience The Energy'} onChange={v => onChange?.({ title: v })} />
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
                        24 hours of non-stop audio-visual keynotes, live stage performances, and creative design labs across Downtown Toronto.
                    </p>
                </div>

                {/* 2-Column Promotional Showcase (Zero Form Inputs) */}
                <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                    
                    {/* Left: Venue Location & Transit Card */}
                    <div className="lg:col-span-6 rounded-3xl bg-neutral-950 border-2 border-neutral-800 p-8 sm:p-10 flex flex-col justify-between shadow-2xl space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 block">
                                    OFFICIAL HOST VENUE
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                                    Metro Convention Arena & Soundstage
                                </h3>
                            </div>

                            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                                Spanning 250,000 sq ft across 3 dedicated sound stages in the heart of Downtown Toronto. Accessible via public transit, subway lines, and direct airport shuttles.
                            </p>

                            <div className="space-y-4 pt-4 border-t border-neutral-800 text-xs sm:text-sm font-mono">
                                <div className="flex items-start gap-3 text-neutral-300">
                                    <MapPin size={18} className="shrink-0 mt-0.5" style={{ color: accent }} />
                                    <span>255 Front St W, Toronto, ON M5V 2W6, Canada</span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-300">
                                    <Calendar size={18} className="shrink-0" style={{ color: accent }} />
                                    <span>October 24–25, 2026 · 24-Hour Non-Stop Summit</span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-300">
                                    <Clock size={18} className="shrink-0" style={{ color: accent }} />
                                    <span>Doors Open: 9:00 AM EDT · Midnight Shows: 12:00 AM</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
                            <span>Press & Media Inquiries:</span>
                            <span className="text-white font-bold">press@pixelstage.ca</span>
                        </div>
                    </div>

                    {/* Right: Summit Access & Experience Pass Overview (No Form) */}
                    <div className="lg:col-span-6 rounded-3xl bg-neutral-950 border-2 border-neutral-800 p-8 sm:p-10 flex flex-col justify-between shadow-2xl space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 block">
                                    WHAT'S INCLUDED WITH ENTRY
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                                    All-Access Conference Experience
                                </h3>
                            </div>

                            <div className="space-y-3 pt-2">
                                {[
                                    'Full 24-Hour Entry to All 3 Stages (Arena, Studio, Swarm)',
                                    'Access to 20+ Keynotes, Creative Code Demos & Masterclasses',
                                    'Interactive Spatial Sound & Lighting Installations',
                                    'Official After-Hours Concerts, Visual Sets & Networking Lounges'
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                                        <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: accent }} />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Call to action button */}
                        <div className="space-y-3 pt-4 border-t border-neutral-800">
                            <a
                                href="#top"
                                className="w-full py-4 rounded-full font-black text-xs uppercase tracking-wider text-black transition-all shadow-xl flex items-center justify-center gap-2 hover:opacity-95"
                                style={{
                                    backgroundColor: accent,
                                    color: '#000000'
                                }}
                            >
                                <span>Get Direction & Travel Guide</span>
                                <ArrowRight size={14} />
                            </a>
                            <p className="text-[11px] text-neutral-500 font-mono text-center">
                                Free admission for accredited creators & registered delegates.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

export const ContactForm = EventConference2Contact;
export default EventConference2Contact;
