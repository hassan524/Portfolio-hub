// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { useState } from 'react';

export function FoodBrand3Navbar({ props = {}, theme, onChange }: any) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full fixed top-6 left-0 z-50 px-6 sm:px-12 pointer-events-none select-none">
            <div className="mx-auto max-w-6xl flex items-center justify-between">
                {/* Minimalist Gold Crest & Wordmark */}
                <a
                    href="#hero"
                    className="pointer-events-auto flex items-center gap-4 bg-[#080604]/90 backdrop-blur-md px-6 py-3 rounded-full border border-[#d4af5f]/30 shadow-2xl group transition-all hover:border-[#d4af5f]"
                >
                    <span className="w-2 h-2 rounded-full bg-[#d4af5f] animate-pulse" />
                    <span
                        className="text-lg font-light tracking-[0.25em] uppercase text-[#f5edd6]"
                        style={{ fontFamily: 'Georgia, serif' }}
                    >
                        <Editable value={props?.brand || 'OBSIDIAN'} onChange={v => onChange?.({ brand: v })} />
                    </span>
                    <span className="text-[9px] tracking-[0.3em] uppercase text-[#d4af5f]/70 hidden sm:inline border-l border-[#d4af5f]/30 pl-3">
                        ATELIER
                    </span>
                </a>

                {/* Floating Capsule Nav Island */}
                <nav className="pointer-events-auto hidden md:flex items-center gap-8 bg-[#080604]/90 backdrop-blur-md px-8 py-3 rounded-full border border-[#d4af5f]/30 shadow-2xl text-[10px] font-light tracking-[0.3em] uppercase text-[#f5edd6]/70">
                    {[
                        { label: 'The Estate', href: '#story' },
                        { label: 'Tasting Ledger', href: '#menu' },
                        { label: 'Critique', href: '#press' },
                        { label: 'Concierge', href: '#reservations' },
                    ].map(item => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="hover:text-[#d4af5f] transition-colors duration-300"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Reservation Action Capsule */}
                <a
                    href="#reservations"
                    className="pointer-events-auto hidden sm:flex items-center gap-3 bg-[#d4af5f] text-[#080604] px-6 py-3 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white transition-colors duration-300 shadow-xl"
                >
                    Book Table
                </a>
            </div>
        </header>
    );
}

export const Navbar = FoodBrand3Navbar;
export default FoodBrand3Navbar;
