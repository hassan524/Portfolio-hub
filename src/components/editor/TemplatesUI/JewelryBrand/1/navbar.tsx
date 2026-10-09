// @ts-nocheck
import { useState } from 'react';
import { Menu, X, Search, ShoppingBag, Heart } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

function isDarkColor(c?: string): boolean {
    if (!c) return false;
    const clean = c.replace('#', '').trim();
    if (clean.length < 6) return false;
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    return (r * 0.299 + g * 0.587 + b * 0.114) < 140;
}

export function JewelryBrand1Navbar({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FBF8F5';
    const isDark = isDarkColor(bg);

    const ink = isDark
        ? (theme?.ink && isDarkColor(theme.ink) ? '#FFFFFF' : theme?.ink || '#FFFFFF')
        : (theme?.ink && !isDarkColor(theme.ink) ? '#1C1917' : theme?.ink || '#1C1917');

    const inkSecond = isDark
        ? (theme?.['ink-second'] && isDarkColor(theme['ink-second']) ? '#D6D3D1' : theme?.['ink-second'] || '#D6D3D1')
        : (theme?.['ink-second'] && theme['ink-second'] !== '#000000' ? theme['ink-second'] : '#78716C');

    const accent = theme?.accent || '#B48C56';
    const surface = isDark ? 'rgba(28, 25, 23, 0.9)' : (theme?.surface || 'rgba(251, 248, 245, 0.9)');
    const [open, setOpen] = useState(false);

    return (
        <header
            className="sticky top-0 z-50 backdrop-blur-md border-b transition-colors"
            style={{ backgroundColor: surface, color: ink, borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Brand Logo */}
                <a href="#top" className="flex items-center gap-2">
                    <span className="font-serif text-2xl font-bold tracking-[0.18em] uppercase">
                        <Editable value={props?.brand || 'ADORNIX'} onChange={v => onChange?.({ brand: v })} />
                    </span>
                </a>

                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-8 font-sans text-xs uppercase tracking-[0.18em]">
                    <a href="#top" className="hover:opacity-100 opacity-80 transition-opacity font-medium">Home</a>
                    <a href="#about" className="hover:opacity-100 opacity-80 transition-opacity">About Us</a>
                    <a href="#projects" className="hover:opacity-100 opacity-80 transition-opacity">Collections</a>
                    <a href="#testimonials" className="hover:opacity-100 opacity-80 transition-opacity">Reviews</a>
                    <a href="#contact" className="hover:opacity-100 opacity-80 transition-opacity">Contact</a>
                </nav>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-5">
                    <button type="button" aria-label="Search" className="opacity-75 hover:opacity-100 transition-opacity">
                        <Search size={18} />
                    </button>
                    <button type="button" aria-label="Wishlist" className="opacity-75 hover:opacity-100 transition-opacity">
                        <Heart size={18} />
                    </button>
                    <button type="button" aria-label="Bag" className="opacity-75 hover:opacity-100 transition-opacity relative">
                        <ShoppingBag size={18} />
                        <span
                            className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full text-[9px] font-mono flex items-center justify-center text-white"
                            style={{ backgroundColor: accent }}
                        >
                            2
                        </span>
                    </button>
                    <a
                        href="#projects"
                        className="ml-2 px-5 py-2 rounded-full font-sans text-xs tracking-wider uppercase font-semibold text-white shadow-sm transition-transform hover:scale-105"
                        style={{ backgroundColor: accent }}
                    >
                        Explore Now
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="p-2 md:hidden"
                    style={{ color: ink }}
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="border-t px-6 py-6 md:hidden space-y-4" style={{ backgroundColor: bg }}>
                    <a href="#top" onClick={() => setOpen(false)} className="block text-sm uppercase tracking-wider py-1">Home</a>
                    <a href="#about" onClick={() => setOpen(false)} className="block text-sm uppercase tracking-wider py-1">About Us</a>
                    <a href="#projects" onClick={() => setOpen(false)} className="block text-sm uppercase tracking-wider py-1">Collections</a>
                    <a href="#testimonials" onClick={() => setOpen(false)} className="block text-sm uppercase tracking-wider py-1">Reviews</a>
                    <a href="#contact" onClick={() => setOpen(false)} className="block text-sm uppercase tracking-wider py-1">Contact</a>
                    <a
                        href="#projects"
                        onClick={() => setOpen(false)}
                        className="block text-center py-2.5 rounded-full text-xs font-semibold text-white uppercase mt-4"
                        style={{ backgroundColor: accent }}
                    >
                        Explore Now
                    </a>
                </div>
            )}
        </header>
    );
}

export const Navbar = JewelryBrand1Navbar;
export default JewelryBrand1Navbar;
