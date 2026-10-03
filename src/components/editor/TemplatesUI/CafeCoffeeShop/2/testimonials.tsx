// @ts-nocheck
import { motion } from 'framer-motion';
import { Quote, BadgeCheck, UsersRound } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#27231e';
    const bgSecond = theme?.['bg-second'] || '#11100d';
    const ink = theme?.ink || '#f6f0e6';
    const inkSecond = theme?.['ink-second'] || ink;
    const surface = theme?.surface || 'rgba(255, 255, 255, 0.12)';
    const accent = theme?.accent || '#c89c5a';
  const fontBody = theme?.fontBody || "Inter";
    const reviews = props?.reviews || [{ quote: 'The room has a pulse of its own. Every detail feels intentional without ever feeling precious.', name: 'Elise Morgan', role: 'Design editor' }, { quote: 'My favourite kind of morning: a great coffee, a warm pastry, and nowhere else to be.', name: 'Daniel Wu', role: 'Neighbour' }];

    return (
        <section id="testimonials" className="px-6 py-28 lg:px-12" style={{ backgroundColor: bg, color: ink , fontFamily: fontBody }}>
            <div className="mx-auto max-w-[1400px]">
                <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: accent }}><Editable value={props?.label || 'From the room'} /></p>
                        <h2 className="mt-5 max-w-sm font-fraunces text-6xl leading-[0.94] tracking-[-0.05em] sm:text-8xl"><Editable value={props?.headline || 'The word on the street.'} /></h2>
                        <div className="mt-12 flex gap-8 border-t pt-6" style={{ borderColor: surface }}>
                            {[{ n: '4.9', l: 'average rating' }, { n: '12k', l: 'cups shared' }].map((s, i) => (
                                <motion.div
                                    key={s.l}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                                >
                                    <p className="font-fraunces text-4xl" style={{ color: accent }}>{s.n}</p>
                                    <p className="mt-2 text-[9px] uppercase tracking-[0.18em]" style={{ color: `${ink}77` }}><Editable value={s.l} /></p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    <div className="grid gap-px" style={{ backgroundColor: surface }}>
                        {reviews.map((review, i) => (
                            <motion.figure
                                key={review.name}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                className="p-8 sm:p-12"
                                style={{ backgroundColor: bg }}
                            >
                                <Quote size={26} style={{ color: accent }} />
                                <blockquote className="mt-10 max-w-2xl font-fraunces text-3xl leading-tight sm:text-4xl"><Editable value={review.quote} /></blockquote>
                                <figcaption className="mt-10 flex items-center justify-between text-[10px] uppercase tracking-[0.18em]" style={{ color: `${ink}77` }}>
                                    <span><b className="mr-3 font-normal" style={{ color: ink }}><Editable value={review.name} /></b><Editable value={review.role} /></span>
                                    <BadgeCheck size={18} style={{ color: accent }} />
                                </figcaption>
                            </motion.figure>
                        ))}
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 flex flex-wrap items-center gap-6 border-t pt-6 text-[10px] uppercase tracking-[0.2em]"
                    style={{ borderColor: surface, color: `${ink}77` }}
                >
                    <UsersRound size={17} style={{ color: accent }} />
                    <Editable value="A favourite for locals, travellers, and long lunches" />
                    <span className="h-px w-16" style={{ backgroundColor: surface }} />
                    <Editable value="Featured in Sydney's independent coffee guide" />
                </motion.div>
            </div>
        </section>
    );
}
