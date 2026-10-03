// @ts-nocheck
import { ArrowUp, Hexagon } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#0E1F1C';
    const bgSecond = theme?.['bg-second'] || bg;
    const ink = theme?.ink || '#E8F0E5';
    const inkSecond = theme?.['ink-second'] || '#9FB5A8';
    const surface = theme?.surface || 'rgba(255,255,255,.06)';
    const accent = theme?.accent || '#E4B860';
    return <footer className="border-t px-6 py-10" style={{ backgroundColor: bg, color: ink, borderColor: `${accent}22` }}><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6"><div className="flex items-center gap-2"><Hexagon size={17} style={{ color: accent }} /><Editable value="LUMEN" className="text-sm font-semibold tracking-[.35em]" /></div><Editable value="Brooklyn · New York" className="text-sm" style={{ color: inkSecond }} /><a href="#top" className="grid h-10 w-10 place-items-center rounded-full transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: surface }}><ArrowUp size={17} /></a></div><Editable value="© 2025 Lumen Studio · Considered care for considered skin." className="mx-auto mt-8 block max-w-6xl text-xs" style={{ color: inkSecond }} /></footer>;
}
