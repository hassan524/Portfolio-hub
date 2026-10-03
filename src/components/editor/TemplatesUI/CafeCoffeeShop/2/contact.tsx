// @ts-nocheck
import { motion } from 'framer-motion';
import { Clock3, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#11100d';
    const bgSecond = theme?.['bg-second'] || '#27231e';
    const ink = theme?.ink || '#f6f0e6';
    const inkSecond = theme?.['ink-second'] || ink;
    const surface = theme?.surface || 'rgba(255, 255, 255, 0.12)';
    const accent = theme?.accent || '#c89c5a';
  const fontBody = theme?.fontBody || "Inter";
    const details = [{ icon: MapPin, label: 'Address', value: '73 Wentworth Avenue, Sydney NSW' }, { icon: Clock3, label: 'Hours', value: 'Mon–Fri 6:30–4 · Sat–Sun 7–4' }, { icon: Phone, label: 'Phone', value: '+61 2 9188 2044' }, { icon: Mail, label: 'Email', value: 'hello@beanandbloom.au' }];

    return (
        <section id="contact" className="px-6 py-28 lg:px-12" style={{ backgroundColor: bg, color: ink , fontFamily: fontBody }}>
            <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1fr_0.8fr]">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: accent }}><Editable value={props?.label || 'Come find your corner'} /></p>
                    <h2 className="mt-5 max-w-2xl font-fraunces text-7xl leading-[0.9] tracking-[-0.06em] sm:text-9xl"><Editable value={props?.headline || 'Let’s meet over coffee.'} onChange={(v) => onChange?.({ headline: v })} /></h2>
                    <p className="mt-8 max-w-sm text-sm leading-7" style={{ color: `${ink}88` }}><Editable value={props?.intro || 'The door is open, the grinder is warm, and there is always room for one more at the table.'} /></p>
                    <motion.a href="#home" whileHover={{ gap: '1.25rem' }} className="mt-10 inline-flex items-center gap-3 border-b pb-2 text-[10px] uppercase tracking-[0.2em]" style={{ borderColor: accent, color: accent }}>
                        <Editable value={props?.cta || 'Back to the top'} />
                        <ArrowUpRight size={14} />
                    </motion.a>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="border-t"
                    style={{ borderColor: surface }}
                >
                    {details.map(({ icon: Icon, label, value }, i) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                            className="flex gap-5 border-b py-6"
                            style={{ borderColor: surface }}
                        >
                            <Icon size={18} className="mt-1" style={{ color: accent }} />
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.22em]" style={{ color: `${ink}66` }}><Editable value={label} /></p>
                                <p className="mt-2 text-sm"><Editable value={value} /></p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
