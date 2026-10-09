// @ts-nocheck
import { useState } from 'react';
import { Editable } from '@/components/editor/ui/Editable';
import { Menu, X } from 'lucide-react';

export function EventConference2Navbar({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#EF3829';
    const ink = theme?.ink || '#FFFFFF';
    const accent = theme?.accent || '#FFD600';
    const [open, setOpen] = useState(false);

    return (
        <header
            className="w-full relative z-40 transition-colors border-none"
            style={{
                backgroundColor: bg,
                color: ink
            }}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12 py-5 sm:py-6">
                {/* Brand Wordmark & Emblem */}
                <a href="#top" className="flex items-center gap-2 group select-none">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-black text-xs text-white group-hover:rotate-12 transition-transform">
                        PX
                    </div>
                    <span className="font-black text-2xl tracking-tighter uppercase font-sans">
                        <Editable value={props?.brand || 'PIXELSTAGE'} onChange={v => onChange?.({ brand: v })} />
                    </span>
                </a>

                {/* Nav Links */}
                <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-white/90">
                    <a href="#about" className="hover:text-white transition-colors">Story</a>
                    <a href="#projects" className="hover:text-white transition-colors">Stages</a>
                    <a href="#testimonials" className="hover:text-white transition-colors">Voices</a>
                    <a href="#contact" className="hover:text-white transition-colors">Venue & RSVP</a>
                </nav>

                {/* Right Action Button */}
                <div className="hidden sm:flex items-center gap-3">
                    <a
                        href="#contact"
                        className="px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider text-black transition-all shadow-md hover:opacity-95"
                        style={{
                            backgroundColor: accent,
                            color: '#000000'
                        }}
                    >
                        <Editable value={props?.btnLabel || 'RSVP For 2026'} onChange={v => onChange?.({ btnLabel: v })} />
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="lg:hidden p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Drawer */}
            {open && (
                <div className="lg:hidden px-6 py-5 space-y-3 bg-black/30 backdrop-blur-md border-t border-white/10">
                    <a href="#about" onClick={() => setOpen(false)} className="block text-sm font-bold uppercase tracking-wider text-white py-1">Story</a>
                    <a href="#projects" onClick={() => setOpen(false)} className="block text-sm font-bold uppercase tracking-wider text-white py-1">Stages</a>
                    <a href="#testimonials" onClick={() => setOpen(false)} className="block text-sm font-bold uppercase tracking-wider text-white py-1">Voices</a>
                    <a href="#contact" onClick={() => setOpen(false)} className="block text-center mt-3 py-2.5 rounded-full text-xs font-black uppercase tracking-wider text-black" style={{ backgroundColor: accent }}>
                        RSVP For 2026
                    </a>
                </div>
            )}
        </header>
    );
}

export const Navbar = EventConference2Navbar;
export default EventConference2Navbar;
