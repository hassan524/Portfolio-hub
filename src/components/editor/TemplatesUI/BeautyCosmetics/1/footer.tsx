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
    return (
        <footer className="border-t px-5 py-10" style={{ backgroundColor: bg, color: ink, borderColor: `${accent}22` }}>
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                    <Sparkles size={17} style={{ color: accent }} />
                    <Editable value="PEARL / atelier" className="text-sm font-semibold tracking-[0.2em]" />
                </div>
                <Editable value="Made for softer mornings and brighter nights." className="text-sm" style={{ color: inkSecond }} />
                <motion.a href="#top" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="grid h-10 w-10 place-items-center rounded-full" style={{ backgroundColor: surface }}>
                    <ArrowUp size={17} />
                </motion.a>
            </div>
            <Editable value="© 2025 Pearl Atelier · Beauty in your own rhythm." className="mx-auto mt-8 block max-w-6xl text-xs" style={{ color: inkSecond }} />
        </footer>
    );
}
