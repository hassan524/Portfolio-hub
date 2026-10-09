// @ts-nocheck
import { ArrowUp, Sparkles } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

function isDarkColor(c?: string): boolean {
    if (!c) return false;
    const clean = c.replace('#', '').trim();
    if (clean.length < 6) return false;
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    return (r * 0.299 + g * 0.587 + b * 0.114) < 140;
}

export function JewelryBrand2Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FFF0F5';
    const isDark = isDarkColor(bg);

    const ink = isDark
        ? (theme?.ink && isDarkColor(theme.ink) ? '#FFF0F5' : theme?.ink || '#FFF0F5')
        : (theme?.ink && !isDarkColor(theme.ink) ? '#3D1A2E' : theme?.ink || '#3D1A2E');

    const inkSecond = isDark
        ? (theme?.['ink-second'] && isDarkColor(theme['ink-second']) ? '#F5B8D8' : theme?.['ink-second'] || '#F5B8D8')
        : (theme?.['ink-second'] && theme['ink-second'] !== '#000000' ? theme['ink-second'] : '#9B4F7C');

    const accent = theme?.accent || '#E8317A';
    const surface = theme?.surface || (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(232, 49, 122, 0.12)');

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            className="relative overflow-hidden pt-20 pb-12 px-6 md:px-16 border-t"
            style={{ backgroundColor: bg, color: ink, borderColor: surface }}
        >
            <div className="mx-auto max-w-6xl">
                {/* Brand signature & Big statement */}
                <div className="grid md:grid-cols-12 gap-12 pb-16 border-b" style={{ borderColor: surface }}>
                    <div className="md:col-span-5 space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="font-serif text-2xl font-light tracking-widest uppercase">
                                <Editable value={props?.brandName || 'Élodie Fontaine'} onChange={v => onChange?.({ brandName: v })} />
                            </span>
                            <Sparkles size={14} style={{ color: accent }} />
                        </div>
                        <p className="text-xs uppercase tracking-[0.25em]" style={{ color: accent }}>
                            <Editable value={props?.brandTagline || 'Haute Joaillerie & Sculptural Heirlooms'} onChange={v => onChange?.({ brandTagline: v })} />
                        </p>
                        <p className="text-sm font-light leading-relaxed max-w-sm pt-2" style={{ color: inkSecond }}>
                            <Editable
                                value={props?.description || 'Crafted with respect for timeless Parisian bench jewellery traditions and responsibly sourced unheated natural gemstones.'}
                                onChange={v => onChange?.({ description: v })}
                            />
                        </p>
                    </div>

                    <div className="md:col-span-4 space-y-4">
                        <p className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: accent }}>
                            The Salon Gazette
                        </p>
                        <p className="text-xs leading-relaxed font-light" style={{ color: inkSecond }}>
                            Receive private invitations to seasonal high jewellery debuts and rare gemstone acquisitions.
                        </p>
                        <form onSubmit={e => e.preventDefault()} className="flex items-center border-b pb-1" style={{ borderColor: surface }}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-transparent text-xs py-1 focus:outline-none"
                                style={{ color: ink }}
                            />
                            <button
                                type="submit"
                                className="text-xs font-medium tracking-wider uppercase px-2 hover:opacity-75"
                                style={{ color: accent }}
                            >
                                Join
                            </button>
                        </form>
                    </div>

                    <div className="md:col-span-3 flex flex-col md:items-end justify-between">
                        <div className="space-y-2 text-xs md:text-right" style={{ color: inkSecond }}>
                            <p className="font-medium uppercase tracking-wider" style={{ color: ink }}>Navigation</p>
                            <p><a href="#about" className="hover:underline">The Metier</a></p>
                            <p><a href="#projects" className="hover:underline">High Pieces</a></p>
                            <p><a href="#testimonials" className="hover:underline">Collector Notes</a></p>
                            <p><a href="#contact" className="hover:underline">Private Salon</a></p>
                        </div>

                        <button
                            type="button"
                            onClick={scrollToTop}
                            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:opacity-75"
                            style={{ color: accent }}
                        >
                            <span>Return to Top</span>
                            <ArrowUp size={13} />
                        </button>
                    </div>
                </div>

                {/* Bottom line */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] gap-4" style={{ color: inkSecond }}>
                    <p className="font-light">
                        © {new Date().getFullYear()} Élodie Fontaine Haute Joaillerie. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="hover:underline cursor-pointer">Place Vendôme, Paris</span>
                        <span className="hover:underline cursor-pointer">New Bond St, London</span>
                        <span className="hover:underline cursor-pointer">Private Salon</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export const Footer = JewelryBrand2Footer;
export default JewelryBrand2Footer;
