// @ts-nocheck
import { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion, useScroll, useSpring } from 'framer-motion';

export function Navbar({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FFF8F7';
    const ink = theme?.ink || '#20191A';
    const inkSecond = theme?.['ink-second'] || '#6D5B5E';
    const surface = theme?.surface || 'rgba(255,255,255,.75)';
    const accent = theme?.accent || '#D97382';
    const [open, setOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
    const links = [['About', '#about'], ['Collection', '#projects'], ['Journal', '#journal'], ['Contact', '#contact']];
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="sticky top-0 z-40 border-b backdrop-blur-xl"
            style={{ backgroundColor: surface, borderColor: `${accent}22`, color: ink }}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
                <a href="#top" className="flex items-center gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-full" style={{ backgroundColor: accent, color: bg }}><Sparkles size={17} /></span>
                    <Editable as="span" value={props?.brand || 'PEARL / atelier'} onChange={(v) => onChange?.({ brand: v })} className="text-sm font-semibold tracking-[0.22em]" />
                </a>
                <nav className="hidden items-center gap-7 md:flex">
                    {links.map(([label, href]) => (
                        <a key={href} href={href} className="text-xs font-medium transition-opacity hover:opacity-60">
                            <Editable value={label} />
                        </a>
                    ))}
                </nav>
                <button className="hidden rounded-full px-5 py-2 text-xs font-semibold transition hover:scale-[1.02] active:scale-95 md:block" style={{ backgroundColor: accent, color: bg }}>
                    <Editable value="Explore glow" />
                </button>
                <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
            </div>
            <motion.div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 origin-left" style={{ scaleX: progress, backgroundColor: accent }} />
            {open && (
                <nav className="flex flex-col gap-4 px-5 pb-5 md:hidden">
                    {links.map(([label, href]) => (
                        <a key={href} href={href} onClick={() => setOpen(false)} className="text-sm"><Editable value={label} /></a>
                    ))}
                </nav>
            )}
        </motion.header>
    );
}