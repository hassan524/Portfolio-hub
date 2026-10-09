// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { ArrowUp } from 'lucide-react';

export function EventConference2Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#EF3829';
    const ink = theme?.ink || '#FFFFFF';

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            className="w-full pt-16 pb-10 px-4 sm:px-8 text-white select-none relative overflow-hidden transition-colors"
            style={{
                backgroundColor: bg,
                color: ink
            }}
        >
            <div className="mx-auto max-w-7xl space-y-12 relative z-10">
                
                {/* Top Row */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/20">
                    <div>
                        <span className="font-extrabold text-3xl sm:text-4xl tracking-tighter uppercase font-sans block">
                            <Editable value={props?.brand || 'PIXELSTAGE'} onChange={v => onChange?.({ brand: v })} />
                        </span>
                        <p className="text-xs font-mono text-white/80 mt-1">
                            <Editable value={props?.email || 'hello@pixelstageconference.com'} onChange={v => onChange?.({ email: v })} />
                        </p>
                    </div>

                    {/* Navigation Columns */}
                    <div className="grid grid-cols-3 gap-6 font-mono text-xs font-bold uppercase tracking-wider text-white/90">
                        <div className="space-y-2">
                            <p className="text-black font-black">PROGRAM</p>
                            <p><a href="#about" className="hover:text-black transition-colors">Agenda</a></p>
                            <p><a href="#projects" className="hover:text-black transition-colors">3 Stages</a></p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-black font-black">ATTEND</p>
                            <p><a href="#contact" className="hover:text-black transition-colors">Tickets</a></p>
                            <p><a href="#testimonials" className="hover:text-black transition-colors">FAQs</a></p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-black font-black">VENUE</p>
                            <p className="text-white/80">Toronto, CA</p>
                            <p className="text-white/80">Metro Arena</p>
                        </div>
                    </div>

                    {/* Scroll to top button */}
                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="w-12 h-12 rounded-full bg-black text-white hover:bg-neutral-900 flex items-center justify-center transition-colors shrink-0 shadow-lg"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp size={18} />
                    </button>
                </div>

                {/* Bottom Center Speaker Portrait (From Screenshot) */}
                <div className="flex flex-col items-center justify-center pt-4">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-black shadow-2xl bg-neutral-900 mb-4">
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                            alt="PixelStage Performer"
                            className="w-full h-full object-cover grayscale contrast-125"
                        />
                    </div>
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-black">
                        SEE YOU ON STAGE · TORONTO 2026
                    </p>
                </div>

                {/* Legal Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60 pt-6 border-t border-white/10">
                    <p>© 2026 PIXELSTAGE CONFERENCE. ALL RIGHTS RESERVED.</p>
                    <div className="flex items-center gap-6">
                        <a href="#top" className="hover:text-white transition-colors">TERMS</a>
                        <a href="#top" className="hover:text-white transition-colors">PRIVACY</a>
                        <a href="#top" className="hover:text-white transition-colors">PRESS KIT</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export const FooterDefault = EventConference2Footer;
export default EventConference2Footer;
