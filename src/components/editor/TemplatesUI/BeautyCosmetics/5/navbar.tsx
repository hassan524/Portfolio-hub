// @ts-nocheck
import { useState } from 'react';
import { FiMenu, FiX, FiFeather, FiShoppingBag } from 'react-icons/fi';
import { Editable } from '@/components/editor/ui/Editable';

// Shared light palette (same in every section). Edit here to retune.
const C = {
    frame: '#E8ECE3',
    white: '#FFFFFF',
    ink: '#16261B',
    sage: '#5C7B5D',
    mint: '#CFE5CF'
};

export function Navbar({ props = {}, onChange }: any) {
    const [open, setOpen] = useState(false);

    const links = [
        ['Home', '#top'],
        ['About', '#about'],
        ['Products', '#projects'],
        ['Blog', '#testimonials']
    ];

    return (
        <header
            className="sticky top-0 z-50 w-full px-4 pb-2 pt-4"
            style={{ backgroundColor: C.frame, fontFamily: 'Poppins, system-ui, sans-serif' }}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
                <a href="#top" className="flex items-center gap-2 rounded-full px-5 py-2.5" style={{ backgroundColor: C.white, color: C.ink }}>
                    <FiFeather size={16} style={{ color: C.sage }} />
                    <Editable
                        value={props?.brand || 'BeautyPlus'}
                        onChange={(v) => onChange?.({ brand: v })}
                        className="text-sm font-semibold"
                        style={{ color: C.ink }}
                    />
                </a>

                <nav className="hidden items-center gap-1 rounded-full p-1.5 md:flex" style={{ backgroundColor: C.white }}>
                    {links.map(([label, href], i) => (
                        <a
                            href={href}
                            key={href}
                            className="rounded-full px-5 py-2 text-xs font-medium transition hover:opacity-70"
                            style={i === 0 ? { backgroundColor: C.mint, color: C.ink } : { color: C.ink }}
                        >
                            <Editable value={label} style={{ color: 'inherit' }} />
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <a
                        href="#contact"
                        className="hidden items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition hover:scale-105 sm:flex"
                        style={{ backgroundColor: C.white, color: C.ink }}
                    >
                        <FiShoppingBag size={14} style={{ color: C.sage }} />
                        <Editable value="My Bag" style={{ color: C.ink }} />
                    </a>
                    <button
                        aria-label="Menu"
                        className="grid h-10 w-10 place-items-center rounded-full transition hover:scale-105 md:hidden"
                        style={{ backgroundColor: C.white, color: C.ink }}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <FiX size={18} /> : <FiMenu size={18} />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="mx-auto mt-3 max-w-7xl rounded-3xl p-3 md:hidden" style={{ backgroundColor: C.white }}>
                    {links.map(([label, href]) => (
                        <a
                            key={href}
                            href={href}
                            onClick={() => setOpen(false)}
                            className="block rounded-2xl px-4 py-3 text-sm font-medium"
                            style={{ color: C.ink }}
                        >
                            {label}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
}