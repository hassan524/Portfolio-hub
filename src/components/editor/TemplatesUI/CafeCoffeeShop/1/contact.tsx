// @ts-nocheck
import { motion } from 'framer-motion';
import { Clock3, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#d9935b';
    const bgSecond = theme?.['bg-second'] || '#24140d';
    const ink = theme?.ink || '#24140d';
    const inkSecond = theme?.['ink-second'] || '#fff9f0';
    const surface = theme?.surface || 'rgba(36, 20, 13, 0.16)';
    const accent = theme?.accent || '#f3e9db';
    const fontBody = theme?.fontBody || "Inter";
    const details = [{ icon: MapPin, label: 'Come by', value: '71 Wentworth Avenue, Sydney CBD' }, { icon: Clock3, label: 'Open daily', value: 'Mon–Fri 6:30–3 · Sat–Sun 7–4' }, { icon: Phone, label: 'Say hello', value: '+61 2 9188 2044' }, { icon: Mail, label: 'Write to us', value: 'hello@stccoffee.au' }];

    return (
        <section id="contact" className="px-5 py-28 sm:px-10 lg:px-16" style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}>
            <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-end">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="mb-5 text-xs uppercase tracking-[0.22em]" style={{ color: `${ink}99` }}><Editable value={props?.label || 'Make a little time'} /></p>
                    <h2 className="max-w-2xl font-fraunces text-6xl leading-[0.9] tracking-[-0.05em] sm:text-8xl"><Editable value={props?.headline || 'See you at the bar.'} /></h2>
                    <p className="mt-8 max-w-md text-base leading-7" style={{ color: `${ink}aa` }}><Editable value={props?.intro || 'Drop in whenever the day needs a softer landing. We will have your favourite cup ready.'} /></p>
                    <motion.a href="#home" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8 inline-flex items-center gap-3 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-widest" style={{ backgroundColor: bgSecond, color: inkSecond }}>
                        <Editable value={props?.cta || 'Back to the beginning'} />
                        <ArrowUpRight size={15} />
                    </motion.a>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="rounded-[2rem] p-7"
                    style={{ backgroundColor: `${bgSecond}12`, border: `1px solid ${surface}` }}
                >
                    {details.map(({ icon: Icon, label, value }, i) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                            className="flex gap-4 border-b py-5 last:border-0"
                            style={{ borderColor: surface }}
                        >
                            <Icon className="mt-1 shrink-0" size={18} />
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: `${ink}77` }}><Editable value={label} /></p>
                                <p className="mt-2 text-sm"><Editable value={value} /></p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
