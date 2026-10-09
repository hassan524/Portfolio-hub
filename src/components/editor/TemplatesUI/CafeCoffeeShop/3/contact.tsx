// @ts-nocheck
import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || '#382116';
  const bgSecond = theme?.['bg-second'] || '#f1eadf';
  const ink = theme?.ink || '#f1eadf';
  const inkSecond = theme?.['ink-second'] || '#382116';
  const surface = theme?.surface || 'rgba(241, 234, 223, 0.14)';
  const accent = theme?.accent || '#c98a50';
  const fontBody = theme?.fontBody || "Inter";
  const details = [{ icon: MapPin, label: 'Find us', value: '71 Wentworth Avenue, Sydney CBD' }, { icon: Clock3, label: 'Hours', value: 'Every day · 7:00 am — 4:00 pm' }, { icon: Phone, label: 'Call', value: '+61 2 9188 2044' }, { icon: Mail, label: 'Write', value: 'hello@morrow.coffee' }];
  return <section id="contact" className="px-5 py-24 sm:px-8" style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}><div className="mx-auto max-w-6xl"><div className="rounded-[2rem] border p-7 sm:p-12" style={{ borderColor: surface }}><div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-end"><div><p className="text-[9px] uppercase tracking-[0.2em]" style={{ color: accent }}><Editable value={props?.label || 'Your next good morning'} /></p><h2 className="mt-5 max-w-lg font-fraunces text-6xl leading-[0.9] tracking-[-0.05em] sm:text-8xl"><Editable value={props?.headline || 'Meet us at Morrow.'} onChange={(v) => onChange?.({ headline: v })} /></h2></div><p className="max-w-sm text-sm leading-6" style={{ color: `${ink}88` }}><Editable value={props?.intro || 'No booking, no fuss. Just come through the door and find a seat that feels like yours.'} /></p></div><div className="mt-12 grid border-t sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: surface }}>{details.map(({ icon: Icon, label, value }) => <div key={label} className="border-b py-5 sm:border-r sm:px-5 lg:border-b-0" style={{ borderColor: surface }}><Icon size={17} style={{ color: accent }} /><p className="mt-5 text-[9px] uppercase tracking-[0.17em]" style={{ color: `${ink}66` }}><Editable value={label} /></p><p className="mt-2 text-xs leading-5"><Editable value={value} /></p></div>)}</div></div></div></section>;
}
