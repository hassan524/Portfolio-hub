// @ts-nocheck
import { motion } from 'framer-motion';
import { Coffee, Hand, Leaf, Music2, SunMedium } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function About({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#e9e0d2';
    const bgSecond = theme?.['bg-second'] || '#11100d';
    const ink = theme?.ink || '#11100d';
    const inkSecond = theme?.['ink-second'] || '#f6f0e6';
    const surface = theme?.surface || 'rgba(17, 16, 13, 0.13)';
    const accent = theme?.accent || '#c89c5a';
  const fontBody = theme?.fontBody || "Inter";
    const details = [{ icon: Hand, title: 'People first', text: 'The best part of the house is always the people inside it.' }, { icon: Leaf, title: 'Good roots', text: 'We partner with small farms and independent makers we believe in.' }, { icon: Music2, title: 'A certain rhythm', text: 'The room moves gently, from first light through the last pour.' }, { icon: SunMedium, title: 'Always welcoming', text: 'Come as you are. Stay as long as you like.' }];

    return (
        <section id="about" className="px-6 py-28 lg:px-12" style={{ backgroundColor: bg, color: ink , fontFamily: fontBody }}>
            <div className="mx-auto max-w-[1400px]">
                <div className="mb-16 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.24em]" style={{ color: `${ink}88` }}>
                    <span className="h-px w-20" style={{ backgroundColor: surface }} />
                    <Coffee size={14} style={{ color: accent }} />
                    <Editable value={props?.divider || 'Slow down · Stay awhile'} />
                    <span className="h-px w-20" style={{ backgroundColor: surface }} />
                </div>
                <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: `${ink}77` }}><Editable value={props?.label || 'The house philosophy'} /></p>
                        <h2 className="mt-6 max-w-lg font-fraunces text-6xl leading-[0.94] tracking-[-0.05em] sm:text-8xl"><Editable value={props?.headline || 'More than a coffee shop.'} /></h2>
                        <p className="mt-8 max-w-md text-sm leading-7" style={{ color: `${ink}99` }}><Editable value={props?.story || 'Bean & Bloom is a room for good conversation and better pauses. We built it to feel familiar from the first visit, with coffee that rewards curiosity and a team that remembers how you take it.'} onChange={(v) => onChange?.({ story: v })} /></p>
                    </motion.div>
                    <div className="grid gap-px self-end sm:grid-cols-2" style={{ backgroundColor: surface }}>
                        {details.map(({ icon: Icon, title, text }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ backgroundColor: bgSecond, color: inkSecond }}
                                className="p-7 sm:p-9"
                                style={{ backgroundColor: bg }}
                            >
                                <Icon size={21} style={{ color: accent }} />
                                <h3 className="mt-16 font-fraunces text-3xl"><Editable value={title} /></h3>
                                <p className="mt-3 text-sm leading-6" style={{ color: `${ink}99` }}><Editable value={text} /></p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 grid grid-cols-2 gap-5 border-t pt-7 sm:grid-cols-4"
                    style={{ borderColor: surface }}
                >
                    {[{ n: '09', l: 'years in the neighbourhood' }, { n: '28', l: 'small farm lots' }, { n: '06', l: 'daily bakes' }, { n: '01', l: 'good place to pause' }].map((s, i) => (
                        <motion.div
                            key={s.l}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <p className="font-fraunces text-4xl" style={{ color: accent }}>{s.n}</p>
                            <p className="mt-2 text-[9px] uppercase tracking-[0.18em]" style={{ color: `${ink}77` }}><Editable value={s.l} /></p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
