// @ts-nocheck
import { ArrowUp, Sparkles } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

export function Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#260C0A';
    const ink = theme?.ink || '#FFF6ED';
    const inkSecond = theme?.['ink-second'] || '#F3C7AD';
    const surface = theme?.surface || 'rgba(255,255,255,.1)';
    const accent = theme?.accent || '#F37D4C';
    return (
        <footer className="px-5 py-10" style={{ backgroundColor: bg, color: ink }}>
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                    <Sparkles size={16} style={{ color: accent }} />
                    <Editable value="Amber & Glow" className="text-sm italic" />
                </div>
                <Editable value="Beauty with a pulse." className="text-sm" style={{ color: inkSecond }} />
                <motion.a href="#top" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="grid h-10 w-10 place-items-center rounded-full" style={{ backgroundColor: surface }}>
                    <ArrowUp size={17} />
                </motion.a>
            </div>
            <Editable value="© 2025 Amber & Glow Studio · New York / everywhere." className="mx-auto mt-8 block max-w-6xl text-xs" style={{ color: inkSecond }} />
        </footer>
    );
}
