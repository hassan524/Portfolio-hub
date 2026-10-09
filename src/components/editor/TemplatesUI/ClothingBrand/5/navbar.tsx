// @ts-nocheck
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function Navbar({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || 'Canvas';
    const bgSecond = theme?.['bg-second'] || bg;
    const ink = theme?.ink || 'CanvasText';
    const inkSecond = theme?.['ink-second'] || ink;
    const accent = theme?.accent || ink;
    const surface = theme?.surface || mix(ink, 12);
    const fontBody = theme?.fontBody;
    const fontHead = theme?.fontHeading || theme?.fontDisplay || fontBody;
    const [open, setOpen] = useState(false);

    const links = [
        ['Collection', '#projects'],
        ['Philosophy', '#about'],
        ['Notes', '#testimonials'],
        ['Visit', '#contact'],
    ];

    return (
        <header className="sticky top-0 z-50" style={{ fontFamily: fontBody }}>
            {/* Announcement strip */}
            <div className="px-5 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ backgroundColor: accent, color: bg }}>
                <Editable value={props?.announcement || 'New season is live — free shipping worldwide'} onChange={(v) => onChange?.({ announcement: v })} />
            </div>

            <div className="border-b backdrop-blur-xl" style={{ backgroundColor: mix(bg, 86), borderColor: surface, color: ink }}>
                <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 py-4 lg:px-8">
                    <nav className="hidden items-center gap-7 md:flex">
                        {links.slice(0, 2).map(([label, href]) => (
                            <a key={href} href={href} className="group relative text-[11px] uppercase tracking-[0.22em]">
                                <Editable value={label} />
                                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: accent }} />
                            </a>
                        ))}
                    </nav>
                    <button type="button" aria-label="Menu" onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-full border md:hidden" style={{ borderColor: surface }}>
                        <Menu size={18} />
                    </button>

                    <a href="#top" className="text-center text-2xl font-bold uppercase leading-none tracking-[-0.06em] sm:text-3xl" style={{ fontFamily: fontHead }}>
                        <Editable value={props?.brand || 'Aroxform'} onChange={(v) => onChange?.({ brand: v })} />
                        <span style={{ color: accent }}>.</span>
                    </a>

                    <div className="flex items-center justify-end gap-7">
                        <nav className="hidden items-center gap-7 md:flex">
                            {links.slice(2).map(([label, href]) => (
                                <a key={href} href={href} className="group relative text-[11px] uppercase tracking-[0.22em]">
                                    <Editable value={label} />
                                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: accent }} />
                                </a>
                            ))}
                        </nav>
                        <a href="#contact" className="group hidden items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:scale-105 sm:inline-flex" style={{ borderColor: ink }}>
                            <Editable value={props?.cta || 'Book a visit'} />
                            <ArrowUpRight size={13} className="transition group-hover:rotate-45" style={{ color: accent }} />
                        </a>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ clipPath: 'inset(0 0 100% 0)' }}
                        animate={{ clipPath: 'inset(0 0 0% 0)' }}
                        exit={{ clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[60] flex flex-col px-5 py-5"
                        style={{ backgroundColor: ink, color: bg }}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold uppercase tracking-[-0.06em]" style={{ fontFamily: fontHead }}>{props?.brand || 'Aroxform'}</span>
                            <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border" style={{ borderColor: mix(bg, 40) }}><X size={18} /></button>
                        </div>
                        <div className="my-auto">
                            {links.map(([label, href], i) => (
                                <motion.a
                                    key={href}
                                    href={href}
                                    onClick={() => setOpen(false)}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 + i * 0.08 }}
                                    className="flex items-baseline gap-4 border-b py-4 text-6xl font-bold uppercase tracking-[-0.06em]"
                                    style={{ borderColor: mix(bg, 20), fontFamily: fontHead }}
                                >
                                    <span className="text-xs tracking-widest" style={{ color: accent }}>0{i + 1}</span>
                                    {label}
                                </motion.a>
                            ))}
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: mix(bg, 60) }}>{props?.announcement || 'New season is live'}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}