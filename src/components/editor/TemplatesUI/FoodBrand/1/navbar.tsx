// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { UtensilsCrossed, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function FoodBrand1Navbar({ props = {}, theme, onChange }: any) {
    const [menuOpen, setMenuOpen] = useState(false);
    const bg = theme?.bg || '#1e523c';
    const ink = theme?.ink || '#ffffff';

    return (
        <header
            className="w-full fixed top-0 left-0 z-50 select-none transition-all duration-300"
            style={{
                backgroundColor: 'rgba(30, 82, 60, 0.95)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
        >
            <div className="mx-auto max-w-7xl px-6 sm:px-12 py-4 flex items-center justify-between">
                {/* Brand Logo */}
                <a href="#hero" className="flex items-center gap-2.5 group">
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: '#2e7254' }}
                    >
                        <UtensilsCrossed size={18} className="text-[#cbe675]" />
                    </div>
                    <span
                        className="text-xl font-extrabold tracking-tight text-white"
                        style={{ fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                    >
                        <Editable value={props?.brand || 'Tasteory'} onChange={v => onChange?.({ brand: v })} />
                    </span>
                </a>

                {/* Center Nav Links */}
                <nav className="hidden md:flex items-center gap-9 text-sm font-semibold tracking-wide text-white/90">
                    {[
                        { label: 'Home', href: '#hero' },
                        { label: 'About', href: '#story' },
                        { label: 'Menu', href: '#menu' },
                        { label: 'Story', href: '#craft' },
                        { label: 'Contact', href: '#contact' },
                    ].map(link => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="hover:text-[#cbe675] transition-colors duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Right CTA */}
                <div className="hidden md:flex items-center">
                    <a
                        href="#menu"
                        className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/30 hover:bg-white hover:text-[#1e523c] transition-all duration-200 shadow-sm hover:scale-105"
                    >
                        <Editable value={props?.cta || 'Get Started'} onChange={v => onChange?.({ cta: v })} />
                    </a>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden p-2 text-white/90 hover:text-white"
                    onClick={() => setMenuOpen(p => !p)}
                    aria-label="Toggle Menu"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div
                    className="md:hidden px-6 py-6 space-y-4 text-base font-semibold border-t border-white/10"
                    style={{ backgroundColor: '#1e523c', color: '#ffffff' }}
                >
                    {[
                        { label: 'Home', href: '#hero' },
                        { label: 'About', href: '#story' },
                        { label: 'Menu', href: '#menu' },
                        { label: 'Story', href: '#craft' },
                        { label: 'Contact', href: '#contact' },
                    ].map(link => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="block py-2 text-white/90 hover:text-[#cbe675]"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#menu"
                        className="inline-block mt-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#cbe675] text-[#1e523c]"
                        onClick={() => setMenuOpen(false)}
                    >
                        Get Started
                    </a>
                </div>
            )}
        </header>
    );
}

export const Navbar = FoodBrand1Navbar;
export default FoodBrand1Navbar;
