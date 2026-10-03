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
  const bgSecond = theme?.['bg-second'] || '#F5E6E4';
  const ink = theme?.ink || '#20191A';
  const inkSecond = theme?.['ink-second'] || '#6D5B5E';
  const surface = theme?.surface || 'rgba(255,255,255,.75)';
  const accent = theme?.accent || '#D97382';
  const details = [[Mail, 'hello@pearlatelier.co'], [Phone, '+1 415 555 0188'], [MapPin, '18 Clement Street, San Francisco'], [Clock, 'Mon–Fri · 9:00–17:00']];
  return (
    <section id="contact" className="px-5 py-20" style={{ backgroundColor: bgSecond, color: ink }}>
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_0.8fr]">
        <motion.div {...fadeInLeft}>
          <Editable value="COME SAY HELLO" className="text-xs font-semibold tracking-[0.3em]" style={{ color: accent }} />
          <Editable as="h2" value="A little glow is always worth a conversation." className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl" />
          <Editable as="p" value="Questions about a ritual, a collaboration, or just want to share your favorite product? We would love to hear from you." className="mt-5 max-w-lg leading-7" style={{ color: inkSecond }} />
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
