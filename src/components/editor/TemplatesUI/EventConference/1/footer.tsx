// @ts-nocheck
import { ArrowUp } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function EventConference1Footer({ props = {}, theme, onChange }: any) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            className="py-16 px-6 md:px-12 text-white font-sans transition-colors"
            style={{
                backgroundColor: '#0C203D',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
        >
            <div className="mx-auto max-w-6xl space-y-12">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">
                    {/* Brand */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                            <span className="text-2xl font-bold tracking-tight text-white font-sans lowercase">
                                <Editable value={props?.brand || 'pulse'} onChange={v => onChange?.({ brand: v })} />
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        </div>
                        <p className="text-xs text-white/60 max-w-sm">
                            <Editable
                                value={props?.tagline || 'Where energy meets opportunity. June 20, 2026 at Skyline Convention Center, Dhaka.'}
                                onChange={v => onChange?.({ tagline: v })}
                            />
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-wrap items-center gap-6 text-xs text-white/80 font-medium">
                        <a href="#top" className="hover:text-white transition-colors">Home</a>
                        <a href="#testimonials" className="hover:text-white transition-colors">Speakers</a>
                        <a href="#projects" className="hover:text-white transition-colors">Agenda</a>
                        <a href="#contact" className="hover:text-white transition-colors">Venue</a>
                        <a href="#about" className="hover:text-white transition-colors">Partners</a>
                        <a href="#about" className="hover:text-white transition-colors">Awards</a>
                        <a href="#contact" className="hover:text-white transition-colors">FAQ</a>
                    </nav>

                    {/* Back to top */}
                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp size={16} />
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
                    <p>© 2026 Pulse Global Conference. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="#top" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#top" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#top" className="hover:text-white transition-colors">Code of Conduct</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export const FooterDefault = EventConference1Footer;
export default EventConference1Footer;
