// @ts-nocheck
import { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function JewelryBrand3Navbar({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#0B2B20';
    const ink = '#FFFFFF';
    const accent = theme?.accent || '#10B981';
    const [open, setOpen] = useState(false);

    return (
        <header
            className="sticky top-0 z-50 backdrop-blur-md transition-colors"
            style={{
                backgroundColor: 'rgba(11, 43, 32, 0.85)',
                color: ink,
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-14 py-5">
                {/* Left: Minimal links as seen in Image 1 */}
                <nav className="hidden md:flex items-center gap-10 font-sans text-xs uppercase tracking-[0.2em]">
                    <a href="#top" className="hover:text-emerald-300 transition-colors font-medium">HOME</a>
                    <a href="#about" className="hover:text-emerald-300 transition-colors opacity-80">ABOUT US</a>
                    <a href="#projects" className="hover:text-emerald-300 transition-colors opacity-80">COLLECTIONS</a>
                </nav>

                {/* Mobile menu trigger */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="md:hidden p-1 text-white"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>

                {/* Brand Name Center */}
                <a href="#top" className="font-serif text-xl tracking-[0.18em] uppercase text-white font-light">
                    <Editable value={props?.brand || 'MILLER JEWELRY'} onChange={v => onChange?.({ brand: v })} />
                </a>

                {/* Right: Search, Bag, Profile icons as seen in Image 1 */}
                <div className="flex items-center gap-6">
                    <button type="button" aria-label="Search" className="opacity-80 hover:opacity-100 transition-opacity">
                        <Search size={18} />
                    </button>
                    <button type="button" aria-label="Bag" className="opacity-80 hover:opacity-100 transition-opacity relative">
                        <ShoppingBag size={18} />
                        <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full text-[8px] bg-emerald-400 text-stone-950 font-bold flex items-center justify-center">
                            1
                        </span>
                    </button>
                    <button type="button" aria-label="Profile" className="opacity-80 hover:opacity-100 transition-opacity">
                        <User size={18} />
                    </button>
                </div>
            </div>

            {/* Mobile Nav Drawer */}
            {open && (
                <div className="md:hidden px-6 py-4 space-y-3 border-t border-white/10" style={{ backgroundColor: '#0B2B20' }}>
                    <a href="#top" onClick={() => setOpen(false)} className="block text-xs uppercase tracking-widest py-2">HOME</a>
                    <a href="#about" onClick={() => setOpen(false)} className="block text-xs uppercase tracking-widest py-2">ABOUT US</a>
                    <a href="#projects" onClick={() => setOpen(false)} className="block text-xs uppercase tracking-widest py-2">COLLECTIONS</a>
                </div>
            )}
        </header>
    );
}

export const Navbar = JewelryBrand3Navbar;
export default JewelryBrand3Navbar;
