// @ts-nocheck
import { motion } from 'framer-motion';
import { ArrowUpRight, Coffee, Heart, Leaf, Sun, Users } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

const reveal = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function About({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#24140d';
    const bgSecond = theme?.['bg-second'] || '#f3e9db';
    const ink = theme?.ink || '#fff9f0';
    const inkSecond = theme?.['ink-second'] || '#24140d';
    const surface = theme?.surface || 'rgba(255, 255, 255, 0.08)';
    const accent = theme?.accent || '#e1a66b';
  const fontBody = theme?.fontBody || "Inter";
    const values = [{ icon: Leaf, title: 'Thoughtful sourcing', text: 'We know the farmers, the harvest, and the hands behind every cup.' }, { icon: Heart, title: 'Made with warmth', text: 'A generous welcome, a familiar face, and no rush to leave.' }, { icon: Sun, title: 'Bright by nature', text: 'Seasonal menus and sunlit spaces made for long, easy afternoons.' }];

    return (
        <section id="about" className="px-5 py-24 sm:px-10 lg:px-16" style={{ backgroundColor: bgSecond, color: inkSecond , fontFamily: fontBody }}>
            <div className="mx-auto max-w-7xl">
                <div className="mb-16 flex items-center justify-center gap-4 text-[9px] uppercase tracking-[0.22em]" style={{ color: accent }}>
                    <span className="h-px w-16" style={{ backgroundColor: surface }} />
                    <Coffee size={15} />
                    <Editable value={props?.divider || 'Take your time'} />
                    <span className="h-px w-16" style={{ backgroundColor: surface }} />
                </div>
                <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={reveal}>
                        <p className="mb-5 text-xs uppercase tracking-[0.22em]" style={{ color: `${inkSecond}99` }}><Editable value={props?.label || 'The STC feeling'} onChange={(v) => onChange?.({ label: v })} /></p>
                        <h2 className="max-w-md font-fraunces text-5xl leading-[0.95] tracking-[-0.04em] sm:text-7xl"><Editable as="span" value={props?.headline || 'A little ritual worth keeping.'} onChange={(v) => onChange?.({ headline: v })} /></h2>
                        <p className="mt-8 max-w-md text-base leading-7" style={{ color: `${inkSecond}aa` }}><Editable value={props?.story || 'STC began with a simple idea: coffee tastes better when it is part of something bigger. Today, our bar is a meeting point for neighbours, makers, dreamers, and anyone who wants one more beautiful hour in the day.'} onChange={(v) => onChange?.({ story: v })} /></p>
                        <div className="mt-10 flex items-center gap-3 text-sm"><span className="grid h-10 w-10 place-items-center rounded-full" style={{ backgroundColor: bg, color: accent }}><Users size={17} /></span><span><Editable value={props?.teamLine || 'A small team, with big care.'} onChange={(v) => onChange?.({ teamLine: v })} /></span></div>
                    </motion.div>
                    <div className="grid gap-4 sm:grid-cols-3 lg:pt-24">
                        {values.map(({ icon: Icon, title, text }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -8 }}
                                className="rounded-[2rem] p-6"
                                style={{ backgroundColor: bg, color: ink }}
                            >
                                <Icon size={22} style={{ color: accent }} />
                                <h3 className="mt-16 font-fraunces text-2xl"><Editable value={title} /></h3>
                                <p className="mt-3 text-sm leading-6" style={{ color: `${ink}aa` }}><Editable value={text} /></p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 grid gap-8 border-t pt-8 sm:grid-cols-[1fr_auto] sm:items-end"
                    style={{ borderColor: `${inkSecond}22` }}
                >
                    <div className="grid grid-cols-3 gap-6">
                        {[{ n: '08', l: 'years brewing' }, { n: '14', l: 'farm partners' }, { n: '07', l: 'daily bakes' }].map((s, i) => (
                            <motion.div
                                key={s.l}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <p className="font-fraunces text-4xl">{s.n}</p>
                                <p className="mt-2 text-[10px] uppercase tracking-[0.18em]" style={{ color: `${inkSecond}77` }}><Editable value={s.l} /></p>
                            </motion.div>
                        ))}
                    </div>
                    <a href="#contact" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] transition hover:gap-3" style={{ color: inkSecond }}>
                        <Editable value={props?.aboutCta || 'Meet the people behind the bar'} />
                        <ArrowUpRight size={15} style={{ color: accent }} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
