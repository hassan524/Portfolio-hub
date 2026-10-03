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
    const bgSecond = theme?.['bg-second'] || '#EDE4D0';
    const ink = theme?.ink || '#1F2B26';
    const inkSecond = theme?.['ink-second'] || '#5C6B62';
    const surface = theme?.surface || 'rgba(255,255,255,.6)';
    const accent = theme?.accent || '#B58B47';
    const details = [[Mail, 'hello@maisonverte.co'], [Phone, '+44 20 7946 0321'], [MapPin, '14 Pavilion Mews, London'], [Clock, 'Wed–Sun · 10:00–18:00']];
    return (
        <section id="contact" className="px-6 py-24" style={{ backgroundColor: bgSecond, color: ink }}>
            <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_.8fr]">
                <motion.div {...fadeInLeft}>
                    <Editable value="VISIT THE ATELIER" className="text-xs font-semibold tracking-[.3em]" style={{ color: accent }} />
                    <Editable as="h2" value="Come for the ritual, stay for the calm." className="mt-5 max-w-xl text-4xl font-light leading-tight tracking-[-.03em] md:text-5xl" />
                    <Editable as="p" value="Step into our London studio for a consultation, a refill, or simply a cup of herbal tea. We would love to meet you." className="mt-6 max-w-lg leading-7" style={{ color: inkSecond }} />
                </motion.div>
                <motion.div {...fadeInRight} className="rounded-3xl p-6" style={{ backgroundColor: surface }}>
                    {details.map(([Icon, text]) => (
                        <div key={text} className="flex items-center gap-4 border-b py-4 last:border-0" style={{ borderColor: `${accent}22` }}>
                            <Icon size={18} style={{ color: accent }} />
                            <Editable value={text} className="text-sm" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
