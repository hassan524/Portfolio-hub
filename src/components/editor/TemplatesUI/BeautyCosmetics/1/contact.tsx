// @ts-nocheck
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

function Magnetic({ href, accent, bg, label }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const move = (e: any) => {
    const b = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (b.left + b.width / 2)) * 0.4);
    y.set((e.clientY - (b.top + b.height / 2)) * 0.4);
  };
  return (
    <motion.a href={href} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: sx, y: sy, backgroundColor: accent, color: bg }} whileTap={{ scale: 0.94 }} className="relative grid h-44 w-44 shrink-0 place-items-center rounded-full text-center text-base font-semibold md:h-56 md:w-56">
      <motion.span aria-hidden="true" className="absolute -inset-3 rounded-full border border-dashed" style={{ borderColor: accent }} animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }} />
      <span className="inline-flex items-center gap-1">{label}<ArrowUpRight size={18} /></span>
    </motion.a>
  );
}

export function Contact({ props = {}, theme, onChange }: any) {
  const bgSecond = theme?.['bg-second'] || '#F5E6E4';
  const bg = theme?.bg || '#FFF8F7';
  const ink = theme?.ink || '#20191A';
  const inkSecond = theme?.['ink-second'] || '#6D5B5E';
  const accent = theme?.accent || '#D97382';
  const details = [[Mail, 'hello@pearlatelier.co'], [Phone, '+1 415 555 0188'], [MapPin, '18 Clement Street, San Francisco'], [Clock, 'Mon–Fri · 9:00–17:00']];
  return (
    <section id="contact" className="relative min-h-screen overflow-hidden px-5 py-32" style={{ backgroundColor: bgSecond, color: ink }}>
      <motion.div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full blur-3xl" style={{ backgroundColor: `${accent}30` }} animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="relative mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }} className="flex flex-wrap items-center justify-between gap-12">
          <div className="max-w-3xl">
            <Editable value="COME SAY HELLO" className="text-xs font-semibold tracking-[0.35em]" style={{ color: accent }} />
            <Editable as="h2" value="A little glow is always worth a conversation." className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-7xl" />
            <Editable as="p" value="Questions about a ritual, a collaboration, or just want to share your favorite product? We would love to hear from you." className="mt-6 max-w-lg text-lg leading-8" style={{ color: inkSecond }} />
          </div>
          <Magnetic href="mailto:hello@pearlatelier.co" accent={accent} bg={bg} label="Say hello" />
        </motion.div>

        <div className="mt-24 border-t" style={{ borderColor: `${accent}44` }}>
          {details.map(([Icon, text], k) => (
            <motion.div key={text} initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, delay: k * 0.08, ease }} className="group relative flex items-center gap-6 overflow-hidden border-b px-4 py-8 md:px-8" style={{ borderColor: `${accent}44` }}>
              <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: accent, transitionTimingFunction: 'cubic-bezier(.22,1,.36,1)' }} />
              <Icon size={26} className="relative transition-colors duration-300 group-hover:text-white" style={{ color: accent }} />
              <Editable value={text} className="relative text-2xl font-medium tracking-[-0.02em] transition duration-500 group-hover:translate-x-3 group-hover:text-white md:text-4xl" />
              <ArrowUpRight size={24} className="relative ml-auto opacity-0 transition duration-300 group-hover:opacity-100 group-hover:text-white" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}