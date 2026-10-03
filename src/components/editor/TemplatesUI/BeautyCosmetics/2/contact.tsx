// @ts-nocheck
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

const fadeInLeft = {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const fadeInRight = {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export function Contact({ props = {}, theme, onChange }: any) {
    const accent = theme?.accent || '#D95332';
    const bg = theme?.bg || '#260C0A';
    const ink = theme?.ink || '#FFF6ED';
    const inkSecond = theme?.['ink-second'] || '#FFE1D1';
    const surface = theme?.surface || 'rgba(255,255,255,.12)';
    const details = [[Mail, 'studio@amberandglow.com'], [Phone, '+1 212 555 0199'], [MapPin, '44 Orchard Street, New York'], [Clock, 'Tue–Sat · 10:00–18:00']];
    return (
        <section id="contact" className="px-5 py-24" style={{ backgroundColor: accent, color: ink }}>
            <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_.8fr] md:items-end">
                <motion.div {...fadeInLeft}>
                    <Editable value="LET'S MAKE A STATEMENT" className="text-xs font-semibold uppercase tracking-[.25em]" />
                    <Editable as="h2" value="Have a face, a feeling, or a launch in mind?" className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.03] tracking-[-.04em] md:text-6xl" />
                    <Editable as="p" value="For creative direction, campaign beauty, or an editorial collaboration, tell us what you are imagining." className="mt-6 max-w-lg leading-7" style={{ color: inkSecond }} />
                </motion.div>
                <motion.div {...fadeInRight} className="rounded-3xl p-5" style={{ backgroundColor: surface }}>
                    {details.map(([Icon, text]) => (
                        <div className="flex items-center gap-4 border-b py-4 last:border-0" style={{ borderColor: `${ink}33` }} key={text}>
                            <Icon size={17} />
                            <Editable value={text} className="text-sm" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
