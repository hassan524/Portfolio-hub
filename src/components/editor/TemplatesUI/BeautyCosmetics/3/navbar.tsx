// @ts-nocheck
import { useState } from 'react';
import { Menu, X, Flower2 } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

export function Navbar({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FAF5EC';
    const ink = theme?.ink || '#1F2B26';
    const inkSecond = theme?.['ink-second'] || '#5C6B62';
    const surface = theme?.surface || 'rgba(255,255,255,.6)';
    const accent = theme?.accent || '#B58B47';
    const [open, setOpen] = useState(false);
    const links = [['Philosophy', '#about'], ['Rituals', '#projects'], ['Ingredients', '#ingredients'], ['Reviews', '#testimonials'], ['Visit', '#contact']];
    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="sticky top-0 z-40 backdrop-blur-xl"
            style={{ backgroundColor: surface, color: ink, borderBottom: `1px solid ${accent}33` }}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <a href="#top" className="flex items-center gap-2">
                    <Flower2 size={18} style={{ color: accent }} />
                    <Editable value={props?.brand || 'MAISON VERTE'} onChange={(v) => onChange?.({ brand: v })} className="text-xs font-semibold tracking-[.3em]" />
                </a>
                <nav className="hidden items-center gap-8 md:flex">
                    {links.map(([label, href]) => (
                        <a href={href} key={href} className="text-xs tracking-[.15em] transition hover:opacity-60"><Editable value={label} /></a>
                    ))}
                </nav>
                <a href="#contact" className="hidden rounded-full px-5 py-2 text-xs font-semibold transition hover:scale-[1.02] active:scale-95 md:block" style={{ backgroundColor: accent, color: bg }}>
                    <Editable value="Book a consult" />
                </a>
                <button className="md:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
            </div>
            {open && (
                <nav className="flex flex-col gap-4 px-6 pb-5 md:hidden">
                    {links.map(([label, href]) => (
                        <a href={href} key={href} onClick={() => setOpen(false)} className="text-sm"><Editable value={label} /></a>
                    ))}
                </nav>
            )}
        </motion.header>
    );
}
