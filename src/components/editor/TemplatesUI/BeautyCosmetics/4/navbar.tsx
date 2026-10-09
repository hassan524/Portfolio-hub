// @ts-nocheck
import { useState } from 'react';
import { Menu, X, Droplet } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Navbar({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#06131A';
    const ink = theme?.ink || '#E2F4F6';
    const accent = theme?.accent || '#38BDF8';
    const [open, setOpen] = useState(false);
    const links = [
        ['Studio', '#about'],
        ['Treatments', '#projects'],
        ['Voices', '#testimonials'],
        ['Connect', '#contact']
    ];

    return (
        <header
            className="sticky top-4 z-50 mx-auto max-w-5xl px-4"
        >
            <div
                className="flex items-center justify-between rounded-full px-6 py-3.5 backdrop-blur-2xl border shadow-xl transition-all"
                style={{
                    backgroundColor: 'rgba(6, 19, 26, 0.75)',
                    borderColor: `${accent}33`,
                    color: ink
                }}
            >
                <a href="#top" className="flex items-center gap-2.5 group">
                    <div className="p-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 group-hover:bg-cyan-500/20 transition">
                        <Droplet size={16} fill={accent} style={{ color: accent }} />
                    </div>
                    <Editable
                        value={props?.brand || 'LUMEN'}
                        onChange={(v) => onChange?.({ brand: v })}
                        className="text-sm font-bold tracking-[0.3em] uppercase"
                    />
                </a>

                <nav className="hidden items-center gap-8 md:flex">
                    {links.map(([label, href]) => (
                        <a
                            href={href}
                            key={href}
                            className="text-xs uppercase tracking-[0.2em] transition hover:text-cyan-300 opacity-80 hover:opacity-100"
                        >
                            <Editable value={label} />
                        </a>
                    ))}
                </nav>

                <a
                    href="#contact"
                    className="hidden rounded-full px-5 py-2 text-xs font-semibold transition duration-300 hover:scale-105 active:scale-95 md:block shadow-sm"
                    style={{ backgroundColor: accent, color: bg }}
                >
                    <Editable value="Book Session" />
                </a>

                <button className="md:hidden p-1 rounded-lg" onClick={() => setOpen(!open)}>
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {open && (
                <nav
                    className="mt-3 flex flex-col gap-4 rounded-2xl p-6 backdrop-blur-2xl border md:hidden shadow-2xl"
                    style={{ backgroundColor: 'rgba(6, 19, 26, 0.95)', borderColor: `${accent}33`, color: ink }}
                >
                    {links.map(([label, href]) => (
                        <a
                            href={href}
                            key={href}
                            onClick={() => setOpen(false)}
                            className="text-sm uppercase tracking-widest font-medium py-1 border-b border-white/5"
                        >
                            <Editable value={label} />
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={() => setOpen(false)}
                        className="mt-2 text-center rounded-full py-3 text-xs font-semibold"
                        style={{ backgroundColor: accent, color: bg }}
                    >
                        <Editable value="Book Session" />
                    </a>
                </nav>
            )}
        </header>
    );
}