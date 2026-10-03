// @ts-nocheck
import { motion } from 'framer-motion';
import { Quote, Star, Award } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || '#f3e9db';
  const bgSecond = theme?.['bg-second'] || '#24140d';
  const ink = theme?.ink || '#24140d';
  const inkSecond = theme?.['ink-second'] || '#fff9f0';
  const surface = theme?.surface || 'rgba(36, 20, 13, 0.12)';
  const accent = theme?.accent || '#e1a66b';
  const fontBody = theme?.fontBody || "Inter";
  const quotes = props?.quotes || [{ quote: 'The rare kind of place where the coffee is exceptional and the welcome feels even better.', name: 'Mia R.', role: 'Local regular' }, { quote: 'I came for one flat white. I stayed for the sunshine, the playlist, and another flat white.', name: 'Alex T.', role: 'Weekend wanderer' }];

  return (
    <section id="testimonials" className="px-5 py-28 sm:px-10 lg:px-16" style={{ backgroundColor: bg, color: ink , fontFamily: fontBody }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between"
        >
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.22em]" style={{ color: `${ink}88` }}><Editable value={props?.label || 'In good company'} /></p>
            <h2 className="font-fraunces text-5xl tracking-[-0.04em] sm:text-7xl"><Editable value={props?.headline || 'Loved by the neighbourhood.'} /></h2>
          </div>
          <Award className="hidden sm:block" size={42} strokeWidth={1} style={{ color: accent }} />
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {quotes.map((item, i) => (
            <motion.figure
              key={item.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="rounded-[2rem] p-8 sm:p-10"
              style={{ backgroundColor: bgSecond, color: inkSecond }}
            >
              <Quote size={27} style={{ color: accent }} />
              <blockquote className="mt-12 max-w-lg font-fraunces text-3xl leading-tight"><Editable value={item.quote} /></blockquote>
              <figcaption className="mt-12 flex items-end justify-between border-t pt-5 text-xs uppercase tracking-widest" style={{ borderColor: surface, color: `${inkSecond}99` }}>
                <span><b className="mr-3 font-medium" style={{ color: inkSecond }}><Editable value={item.name} /></b><Editable value={item.role} /></span>
                <span className="flex gap-1" style={{ color: accent }}>{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={13} fill="currentColor" />)}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
