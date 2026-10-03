// @ts-nocheck
import { ArrowUp, Flower2 } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

export function Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FAF5EC';
    const ink = theme?.ink || '#1F2B26';
    const inkSecond = theme?.['ink-second'] || '#5C6B62';
    const surface = theme?.surface || 'rgba(255,255,255,.6)';
    const accent = theme?.accent || '#B58B47';
    return (
        <footer className="border-t px-6 py-10" style={{ backgroundColor: bg, color: ink, borderColor: `${accent}33` }}>
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                    <Flower2 size={17} style={{ color: accent }} />
                    <Editable value="MAISON VERTE" className="text-xs font-semibold tracking-[.3em]" />
                </div>
                <Editable value="Skincare, grown with care." className="text-sm" style={{ color: inkSecond }} />
                <motion.a href="#top" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="grid h-10 w-10 place-items-center rounded-full" style={{ backgroundColor: surface }}>
                    <ArrowUp size={17} />
                </motion.a>
            </div>
            <Editable value="© 2025 Maison Verte · London · All rights reserved." className="mx-auto mt-8 block max-w-7xl text-xs" style={{ color: inkSecond }} />
        </footer>
    );
}
