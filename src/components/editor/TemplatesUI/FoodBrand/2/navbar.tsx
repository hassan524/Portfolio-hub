// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function FoodBrand2Navbar({ props = {}, theme, onChange }: any) {
    const [menuOpen, setMenuOpen] = useState(false);
    const bg = theme?.['bg-second'] || '#faf6f0';
    const ink = theme?.['ink-second'] || '#1c1917';

    return (
        <header
            className="w-full fixed top-0 left-0 z-50 select-none transition-all duration-300"
            style={{
                backgroundColor: 'rgba(250, 246, 240, 0.95)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(28, 25, 23, 0.08)',
            }}
        >
            <div className="mx-auto max-w-7xl px-6 sm:px-12 py-4 flex items-center justify-between">
                {/* Brand Logo */}
                <a href="#hero" className="flex items-center gap-3 group">
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-serif text-sm font-bold text-white shadow-sm"
                        style={{ backgroundColor: '#df4d26' }}
                    >
                        S
                    </div>
                    <span
                        className="text-xl font-black tracking-tight text-[#1c1917]"
                        style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                    >
                        <Editable value={props?.brand || 'Solstice Provisions'} onChange={v => onChange?.({ brand: v })} />
                    </span>
                </a>

                {/* Center Nav Links */}
                <nav className="hidden md:flex items-center gap-9 text-sm font-bold tracking-wide text-[#1c1917]/80">
                    {[
                        { label: 'Our Story', href: '#story' },
                        { label: 'The Craft', href: '#craft' },
                        { label: 'Collection', href: '#collection' },
                        { label: 'Press', href: '#press' },
                        { label: 'Stockists', href: '#stockists' },
                    ].map(link => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="hover:text-[#df4d26] transition-colors duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Right Action */}
                <div className="hidden md:flex items-center">
                    <a
                        href="#stockists"
                        className="px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider text-white transition-all duration-200 shadow-sm hover:scale-105"
                        style={{ backgroundColor: '#df4d26' }}
                    >
                        <Editable value={props?.cta || 'Find in Stores'} onChange={v => onChange?.({ cta: v })} />
                    </a>
                </div>

                {/* Mobile Button */}
                <button
                    className="md:hidden p-2 text-[#1c1917]"
                    onClick={() => setMenuOpen(p => !p)}
                    aria-label="Toggle Navigation"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div
                    className="md:hidden px-6 py-6 space-y-4 text-base font-bold border-t border-[#1c1917]/10"
                    style={{ backgroundColor: '#faf6f0', color: '#1c1917' }}
                >
                    {['Our Story', 'The Craft', 'Collection', 'Press', 'Stockists'].map(link => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase().replace(/\s+/g, '')}`}
                            className="block py-2 text-[#1c1917]/80 hover:text-[#df4d26]"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link}
                        </a>
                    ))}
                    <a
                        href="#stockists"
                        className="inline-block mt-2 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider text-white bg-[#df4d26]"
                        onClick={() => setMenuOpen(false)}
                    >
                        Find in Stores
                    </a>
                </div>
            )}
        </header>
    );
}

export const Navbar = FoodBrand2Navbar;
export default FoodBrand2Navbar;
