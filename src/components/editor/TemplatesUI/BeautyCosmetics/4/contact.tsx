// @ts-nocheck
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#0E1F1C';
    const bgSecond = theme?.['bg-second'] || bg;
    const ink = theme?.ink || '#E8F0E5';
    const inkSecond = theme?.['ink-second'] || '#9FB5A8';
    const surface = theme?.surface || 'rgba(255,255,255,.06)';
    const accent = theme?.accent || '#E4B860';
    const details = [[Mail, 'studio@lumen.co'], [Phone, '+1 718 555 0144'], [MapPin, '208 Smith Street, Brooklyn'], [Clock, 'Tue–Sat · 10:00–19:00']];
    return <section id="contact" className="px-6 py-24" style={{ backgroundColor: bg, color: ink }}><div className="mx-auto max-w-6xl"><div className="grid gap-12 md:grid-cols-[1fr_.8fr] md:items-end"><div><Editable value="CONNECT" className="text-xs font-semibold tracking-[.3em]" style={{ color: accent }} /><Editable as="h2" value="Let's begin your skin story." className="mt-5 max-w-xl text-4xl font-light leading-tight tracking-[-.03em] md:text-5xl" /><Editable as="p" value="Reach out for a consultation, a treatment question, or to simply say hello. We reply to every message within two business days." className="mt-6 max-w-lg leading-7" style={{ color: inkSecond }} /></div><div className="rounded-3xl p-6" style={{ backgroundColor: surface, border: `1px solid ${accent}22` }}>{details.map(([Icon, text]) => <div key={text} className="flex items-center gap-4 border-b py-4 last:border-0" style={{ borderColor: `${accent}22` }}><Icon size={18} style={{ color: accent }} /><Editable value={text} className="text-sm" /></div>)}</div></div></div></section>;
}
