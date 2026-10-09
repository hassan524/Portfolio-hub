// @ts-nocheck
import { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion, useScroll, useSpring } from 'framer-motion';

function isDarkColor(c?: string): boolean {
    if (!c) return false;
    const clean = c.replace('#', '').trim();
    if (clean.length < 6) return false;
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    return (r * 0.299 + g * 0.587 + b * 0.114) < 140;
}

export function JewelryBrand2Navbar({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FFF0F5';
    const isDark = isDarkColor(bg);

    const ink = isDark
        ? (theme?.ink && isDarkColor(theme.ink) ? '#FFF0F5' : theme?.ink || '#FFF0F5')
        : (theme?.ink && !isDarkColor(theme.ink) ? '#3D1A2E' : theme?.ink || '#3D1A2E');

    const inkSecond = isDark
        ? (theme?.['ink-second'] && isDarkColor(theme['ink-second']) ? '#F5B8D8' : theme?.['ink-second'] || '#F5B8D8')
        : (theme?.['ink-second'] && theme['ink-second'] !== '#000000' ? theme['ink-second'] : '#9B4F7C');

    const accent = theme?.accent || '#E8317A';
    const surface = isDark ? 'rgba(20, 10, 16, 0.85)' : (theme?.surface || 'rgba(255,240,245,0.85)');
    const [open, setOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
    const links = [['Story', '#about'], ['Pieces', '#projects'], ['Notes', '#testimonials'], ['Salon', '#contact']];

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-0 z-40 backdrop-blur-xl"
            style={{ backgroundColor: surface, color: ink, borderBottom: `1px solid ${accent}25` }}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
                <a href="#top" className="flex items-center gap-2.5">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Heart size={18} fill={accent} style={{ color: accent }} />
                    </motion.div>
                    <Editable
                        as="span"
                        value={props?.brand || 'Rosé Bijoux'}
                        onChange={v => onChange?.({ brand: v })}
                        className="font-serif text-base italic tracking-wide"
                        style={{ color: ink }}
                    />
                </a>

                <nav className="hidden items-center gap-8 md:flex">
                    {links.map(([label, href]) => (
                        <a
                            key={href}
                            href={href}
                            className="relative text-sm font-light transition-opacity hover:opacity-70"
                            style={{ color: inkSecond }}
                        >
                            {label}
                        </a>
                    ))}
                </nav>

                <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05, backgroundColor: accent }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden rounded-full px-6 py-2.5 text-xs font-medium tracking-wide text-white transition-colors md:block"
                    style={{ backgroundColor: accent }}
                >
                    Book a Fitting
                </motion.a>

                <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: ink }}>
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            <motion.div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 origin-left rounded-full" style={{ scaleX: progress, backgroundColor: accent }} />

            {open && (
                <motion.nav
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex flex-col gap-4 px-5 pb-6 pt-2 md:hidden"
                    style={{ backgroundColor: bg }}
                >
                    {links.map(([label, href]) => (
                        <a key={href} href={href} onClick={() => setOpen(false)} className="text-sm font-light" style={{ color: inkSecond }}>
                            {label}
                        </a>
                    ))}
                </motion.nav>
            )}
        </motion.header>
    );
}

export const Navbar = JewelryBrand2Navbar;
export default JewelryBrand2Navbar;
