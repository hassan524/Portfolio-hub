// @ts-nocheck
import { ArrowUp, Coffee } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { Editable } from '@/components/editor/ui/Editable';

export function Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#11100d';
    const bgSecond = theme?.['bg-second'] || bg;
    const ink = theme?.ink || '#f6f0e6';
    const inkSecond = theme?.['ink-second'] || ink;
    const surface = theme?.surface || 'rgba(255, 255, 255, 0.12)';
    const accent = theme?.accent || '#c89c5a';
  const fontBody = theme?.fontBody || "Inter";
    return <footer className="px-6 pb-7 pt-16 lg:px-12" style={{ backgroundColor: bg, color: ink , fontFamily: fontBody }}><div className="mx-auto max-w-[1400px]"><div className="grid gap-12 border-b pb-14 md:grid-cols-[1fr_auto]" style={{ borderColor: surface }}><div><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full border" style={{ borderColor: surface, color: accent }}><Coffee size={18} /></span><span className="text-[10px] uppercase tracking-[0.3em]"><Editable value={props?.brand || 'Bean & Bloom'} /><small className="mt-1 block text-[7px] tracking-[0.35em]" style={{ color: `${ink}66` }}><Editable value="Coffee House" /></small></span></div><p className="mt-6 max-w-xs text-sm leading-6" style={{ color: `${ink}77` }}><Editable value={props?.summary || 'For the days you need a little more time, and the people who make it better.'} /></p></div><div className="grid grid-cols-2 gap-x-14 gap-y-4 text-[10px] uppercase tracking-[0.2em]"><a href="#about"><Editable value="About" /></a><a href="#projects"><Editable value="Coffee" /></a><a href="#testimonials"><Editable value="Stories" /></a><a href="#contact"><Editable value="Visit" /></a></div></div><div className="flex flex-col justify-between gap-5 pt-7 text-[9px] uppercase tracking-[0.2em] sm:flex-row" style={{ color: `${inkSecond}66` }}><Editable value={props?.copyright || '© 2024 Bean & Bloom Coffee House'} /><div className="flex items-center gap-6"><span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} /><Editable value="Now pouring" /></span><FaInstagram size={14} /><a href="#home" className="grid h-8 w-8 place-items-center rounded-full transition hover:scale-[1.02]" style={{ backgroundColor: surface, color: ink }}><ArrowUp size={14} /></a></div></div></div></footer>;
}
