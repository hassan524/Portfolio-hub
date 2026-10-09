// @ts-nocheck
import { ArrowUp, Sparkles } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

export function Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FFF8F7';
    const ink = theme?.ink || '#20191A';
    const inkSecond = theme?.['ink-second'] || '#6D5B5E';
    const surface = theme?.surface || 'rgba(255,255,255,.75)';
    const accent = theme?.accent || '#D97382';
    const links = [['About', '#about'], ['Collection', '#projects'], ['Journal', '#journal'], ['Contact', '#contact']];
    return (
        <footer className="relative overflow-hidden border-t px-5 pt-20" style={{ backgroundColor: bg, color: ink, borderColor: `${accent}22` }}>
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-wrap items-start justify-between gap-10">
                    <div className="max-w-sm">
                        <div className="flex items-center gap-2">
                            <motion.span animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}><Sparkles size={20} style={{ color: accent }} /></motion.span>
                            <Editable value="PEARL / atelier" className="text-sm font-semibold tracking-[0.2em]" />
                        </div>
                        <Editable value="Made for softer mornings and brighter nights." className="mt-5 block text-2xl font-medium leading-snug tracking-[-0.03em]" style={{ color: inkSecond }} />
                    </div>
                    <nav className="flex flex-col gap-3">
                        {links.map(([label, href]) => (
                            <a key={href} href={href} className="group inline-flex items-center gap-3 text-xl font-medium">
                                <span className="h-px w-0 transition-all duration-300 group-hover:w-8" style={{ backgroundColor: accent }} />
                                <span className="transition-transform duration-300 group-hover:translate-x-1">{label}</span>
                            </a>
                        ))}
                    </nav>
                    <motion.a href="#top" whileHover={{ scale: 1.12, y: -4 }} whileTap={{ scale: 0.92 }} aria-label="Back to top" className="grid h-16 w-16 place-items-center rounded-full" style={{ backgroundColor: accent, color: bg }}>
                        <ArrowUp size={22} />
                    </motion.a>
                </div>

                <div aria-hidden="true" className="mt-16 flex justify-center overflow-hidden">
                    {'PEARL'.split('').map((ch, k) => (
                        <motion.span
                            key={k}
                            initial={{ y: '110%' }}
                            whileInView={{ y: '0%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: k * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="block text-[26vw] font-semibold leading-[0.85] tracking-[-0.06em] md:text-[20vw]"
                            style={{ color: `${accent}`, opacity: 0.9 }}
                        >
                            {ch}
                        </motion.span>
                    ))}
                </div>
            </div>
            <div className="relative border-t py-6" style={{ borderColor: `${accent}22` }}>
                <Editable value="© 2025 Pearl Atelier · Beauty in your own rhythm." className="mx-auto block max-w-6xl text-xs" style={{ color: inkSecond }} />
            </div>
        </footer>
    );
}