// @ts-nocheck
import { useState } from 'react';
import { Menu, X, CircleUserRound } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

export function Navbar({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#260C0A';
    const ink = theme?.ink || '#FFF6ED';
    const inkSecond = theme?.['ink-second'] || '#F3C7AD';
    const surface = theme?.surface || 'rgba(255,255,255,.1)';
    const accent = theme?.accent || '#F37D4C';
    const [open, setOpen] = useState(false);
    const links = [['Story', '#about'], ['Signature', '#projects'], ['Process', '#process'], ['Proof', '#testimonials'], ['Reach out', '#contact']];
    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-0 z-40 px-5 py-5"
            style={{ color: ink }}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between border-b pb-4" style={{ borderColor: `${ink}55` }}>
                <a href="#top" className="text-sm italic"><Editable value={props?.brand || 'Amber & Glow'} onChange={(v) => onChange?.({ brand: v })} /></a>
                <nav className="hidden items-center gap-7 md:flex">
                    {links.map(([label, href]) => (
                        <a href={href} key={href} className="text-[11px] uppercase tracking-[.18em] transition hover:opacity-60"><Editable value={label} /></a>
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    <span className="hidden rounded-full px-3 py-1 text-[10px] md:block" style={{ backgroundColor: surface }}><Editable value="Available for select work" /></span>
                    <CircleUserRound size={18} />
                    <button className="md:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
                </div>
            </div>
            {open && (
                <nav className="flex flex-col gap-4 border-b py-5 md:hidden" style={{ borderColor: `${ink}55` }}>
                    {links.map(([label, href]) => (
                        <a href={href} key={href} onClick={() => setOpen(false)}><Editable value={label} /></a>
                    ))}
                </nav>
            )}
        </motion.header>
    );
}
