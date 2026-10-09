// @ts-nocheck
import { FiArrowUp, FiFeather } from 'react-icons/fi';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Editable } from '@/components/editor/ui/Editable';

const C = {
    frame: '#E8ECE3',
    white: '#FFFFFF',
    ink: '#16261B',
    sage: '#5C7B5D',
    mint: '#CFE5CF'
};

export function Footer({ props = {}, onChange }: any) {
    const links = [
        ['Home', '#top'],
        ['About', '#about'],
        ['Products', '#projects'],
        ['Blog', '#testimonials'],
        ['Contact', '#contact']
    ];

    return (
        <footer
            className="w-full px-4 pb-6 pt-8 sm:px-6"
            style={{ backgroundColor: C.frame, fontFamily: 'Poppins, system-ui, sans-serif' }}
        >
            <div className="mx-auto max-w-7xl rounded-[2.5rem] px-6 py-10 sm:px-12" style={{ backgroundColor: C.ink, color: C.white }}>
                <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                    <a href="#top" className="flex items-center gap-2 rounded-full px-5 py-2.5" style={{ backgroundColor: C.white, color: C.ink }}>
                        <FiFeather size={16} style={{ color: C.sage }} />
                        <Editable
                            value={props?.brand || 'BeautyPlus'}
                            onChange={(v) => onChange?.({ brand: v })}
                            className="text-sm font-semibold"
                            style={{ color: C.ink }}
                        />
                    </a>

                    <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium">
                        {links.map(([label, href]) => (
                            <a key={href} href={href} className="transition hover:opacity-70" style={{ color: C.mint }}>
                                {label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                            className="grid h-10 w-10 place-items-center rounded-full border transition hover:scale-105"
                            style={{ borderColor: 'rgba(255,255,255,0.25)' }}
                        >
                            <FaInstagram size={16} />
                        </a>
                        <a
                            href="https://wa.me/17185550144"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="WhatsApp"
                            className="grid h-10 w-10 place-items-center rounded-full border transition hover:scale-105"
                            style={{ borderColor: 'rgba(255,255,255,0.25)' }}
                        >
                            <FaWhatsapp size={16} />
                        </a>
                        <a
                            href="#top"
                            aria-label="Back to top"
                            className="grid h-10 w-10 place-items-center rounded-full transition hover:scale-105"
                            style={{ backgroundColor: C.mint, color: C.ink }}
                        >
                            <FiArrowUp size={16} />
                        </a>
                    </div>
                </div>

                <div className="mt-8 border-t pt-6 text-xs" style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.65)' }}>
                    <Editable value="© 2026 BeautyPlus. All rights reserved." style={{ color: 'inherit' }} />
                </div>
            </div>
        </footer>
    );
}