// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { Shield, ArrowUp } from 'lucide-react';

export function EventConference3Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#0A0A0D';
    const ink = theme?.ink || '#FFFFFF';

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            className="w-full py-16 px-6 md:px-12 text-white select-none transition-colors border-t border-white/10"
            style={{
                backgroundColor: bg,
                color: ink
            }}
        >
            <div className="mx-auto max-w-7xl space-y-12">
                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                                <Shield size={16} fill="white" className="text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight uppercase font-sans text-white">
                                <Editable value={props?.brand || 'HATCH'} onChange={v => onChange?.({ brand: v })} />
                            </span>
                        </div>
                        <p className="text-xs text-white/50 max-w-sm">
                            <Editable
                                value={props?.desc || 'The European summit for design craft, spatial interfaces, and creative leadership.'}
                                onChange={v => onChange?.({ desc: v })}
                            />
                        </p>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex flex-wrap items-center gap-8 text-xs font-mono uppercase tracking-wider text-white/70">
                        <a href="#top" className="hover:text-white transition-colors">Home</a>
                        <a href="#about" className="hover:text-white transition-colors">Experience</a>
                        <a href="#projects" className="hover:text-white transition-colors">Agenda</a>
                        <a href="#testimonials" className="hover:text-white transition-colors">Voices</a>
                        <a href="#contact" className="hover:text-white transition-colors">Venue</a>
                    </nav>

                    {/* Scroll to Top */}
                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp size={16} />
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
                    <p>© 2026 HATCH EUROPEAN DESIGN SUMMIT. ALL RIGHTS RESERVED.</p>
                    <div className="flex items-center gap-6">
                        <a href="#top" className="hover:text-white transition-colors">CODE OF CONDUCT</a>
                        <a href="#top" className="hover:text-white transition-colors">PRIVACY POLICY</a>
                        <a href="#top" className="hover:text-white transition-colors">PRESS</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export const FooterDefault = EventConference3Footer;
export default EventConference3Footer;
