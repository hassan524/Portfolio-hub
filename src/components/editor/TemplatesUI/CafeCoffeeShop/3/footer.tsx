// @ts-nocheck
import { ArrowUp, Coffee } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { Editable } from '@/components/editor/ui/Editable';

export function Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#f1eadf';
    const bgSecond = theme?.['bg-second'] || '#382116';
    const ink = theme?.ink || '#382116';
    const inkSecond = theme?.['ink-second'] || ink;
    const surface = theme?.surface || 'rgba(56, 33, 22, 0.14)';
    const accent = theme?.accent || '#c98a50';
  const fontBody = theme?.fontBody || "Inter";
    return <footer className="px-5 pb-6 pt-16 sm:px-8" style={{ backgroundColor: bg, color: ink , fontFamily: fontBody }}><div className="mx-auto max-w-6xl"><div className="flex flex-col justify-between gap-8 border-b pb-10 sm:flex-row" style={{ borderColor: surface }}><div className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-full" style={{ backgroundColor: bgSecond, color: accent }}><Coffee size={16} /></span><span className="text-[10px] font-semibold uppercase tracking-[0.18em]"><Editable value={props?.brand || 'Morrow'} /></span></div><div className="flex gap-6 text-[9px] uppercase tracking-[0.17em]"><a href="#about"><Editable value="Story" /></a><a href="#projects"><Editable value="Menu" /></a><a href="#testimonials"><Editable value="Notes" /></a><a href="#contact"><Editable value="Visit" /></a></div></div><div className="flex flex-col justify-between gap-4 pt-5 text-[9px] uppercase tracking-[0.17em] sm:flex-row" style={{ color: `${inkSecond}77` }}><Editable value={props?.copyright || '© 2024 Morrow Coffee Studio'} /><div className="flex items-center gap-5"><span style={{ color: accent }}><Editable value="Open every day" /></span><FaInstagram size={14} /><a href="#home" className="grid h-8 w-8 place-items-center rounded-full" style={{ backgroundColor: bgSecond, color: inkSecond }}><ArrowUp size={14} /></a></div></div></div></footer>;
}
