// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

// A single floating butterfly for about section
function SmallButterfly({ x, y, accent, delay = 0 }: any) {
    return (
        <motion.div
            className="pointer-events-none absolute"
            style={{ left: x, top: y, width: 40, height: 30 }}
            animate={{ x: [0, 12, 0], y: [0, -10, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
            <svg viewBox="0 0 100 80" width="100%" height="100%">
                <g transform="translate(50, 40)">
                    <motion.g
                        animate={{ scaleX: [1, 0.15, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <path d="M0,0 C-20,-40 -60,-20 -40,10 C-30,30 -10,25 0,0 Z" fill={accent} opacity="0.7" />
                        <path d="M0,0 C-20,-20 -45,0 -35,20 C-25,38 -5,30 0,0 Z" fill={accent} opacity="0.4" />
                    </motion.g>
                    <motion.g
                        animate={{ scaleX: [-1, -0.15, -1] }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.05 }}
                    >
                        <path d="M0,0 C-20,-40 -60,-20 -40,10 C-30,30 -10,25 0,0 Z" fill={accent} opacity="0.7" />
                        <path d="M0,0 C-20,-20 -45,0 -35,20 C-25,38 -5,30 0,0 Z" fill={accent} opacity="0.4" />
                    </motion.g>
                    <ellipse cx="0" cy="0" rx="2" ry="11" fill="#3D1A2E" opacity="0.7" />
                </g>
            </svg>
        </motion.div>
    );
}

function isDarkColor(c?: string): boolean {
    if (!c) return false;
    const clean = c.replace('#', '').trim();
    if (clean.length < 6) return false;
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    return (r * 0.299 + g * 0.587 + b * 0.114) < 140;
}

export function JewelryBrand2About({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#FCE7F0';
    const isDark = isDarkColor(bg);

    const ink = isDark
        ? (theme?.ink && isDarkColor(theme.ink) ? '#FFF0F5' : theme?.ink || '#FFF0F5')
        : (theme?.ink && !isDarkColor(theme.ink) ? '#3D1A2E' : theme?.ink || '#3D1A2E');

    const inkSecond = isDark
        ? (theme?.['ink-second'] && isDarkColor(theme['ink-second']) ? '#F5B8D8' : theme?.['ink-second'] || '#F5B8D8')
        : (theme?.['ink-second'] && theme['ink-second'] !== '#000000' ? theme['ink-second'] : '#9B4F7C');

    const accent = theme?.accent || '#E8317A';

    return (
        <section id="about" className="relative overflow-hidden px-6 py-24 md:py-32" style={{ backgroundColor: bg, color: ink }}>
            {/* Decorative butterflies */}
            <SmallButterfly x="2%" y="10%" accent={accent} delay={0} />
            <SmallButterfly x="88%" y="60%" accent={accent} delay={1.5} />
            <SmallButterfly x="70%" y="15%" accent={accent} delay={0.8} />

            <div className="relative mx-auto max-w-5xl">
                <div className="grid gap-16 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                    {/* Left: Photo-style portrait */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.9, ease }}
                        className="relative"
                    >
                        <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                            <img
                                src="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&h=900&w=600"
                                alt="Jewelry designer at work"
                                className="h-full w-full object-cover"
                            />
                            {/* Pink overlay */}
                            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${accent}40 0%, transparent 50%)` }} />
                        </div>

                        {/* Floating badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            animate={{ y: [0, -8, 0] }}
                            className="absolute -right-6 bottom-12 rounded-full px-6 py-4 text-center shadow-xl"
                            style={{ backgroundColor: accent, color: 'white' }}
                        >
                            <p className="font-serif text-2xl font-light">8+</p>
                            <p className="text-[10px] tracking-[0.2em] uppercase mt-0.5">Years crafting</p>
                        </motion.div>
                    </motion.div>

                    {/* Right: Story */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.9, delay: 0.2, ease }}
                    >
                        <p className="mb-5 text-xs tracking-[0.35em] uppercase" style={{ color: accent }}>
                            <Editable value={props?.eyebrow || 'The Maker'} onChange={v => onChange?.({ eyebrow: v })} />
                        </p>
                        <h2 className="font-serif text-4xl font-light leading-[1.1] md:text-5xl">
                            <Editable value={props?.title || 'I create jewels that hold the moments you never want to forget.'} onChange={v => onChange?.({ title: v })} />
                        </h2>

                        <p className="mt-8 text-sm leading-8 font-light" style={{ color: inkSecond }}>
                            <Editable value={props?.bio || 'My name is Amélie, and I started making jewellery in my grandmother\'s kitchen with a pair of pliers and a dream. Every piece I design is an act of storytelling — a wearable memory made tangible. I believe beauty doesn\'t need to shout.'} onChange={v => onChange?.({ bio: v })} />
                        </p>

                        {/* Values — NO CARDS: just simple text list */}
                        <div className="mt-10 space-y-5">
                            {[
                                ['Slow fashion', 'Each piece takes weeks from sketch to final polish.'],
                                ['Ethically sourced', 'Conflict-free stones, recycled metals only.'],
                                ['Made for you', 'Every commission is a conversation about your story.'],
                            ].map(([title, copy]) => (
                                <div key={title} className="border-l-2 pl-4" style={{ borderColor: accent }}>
                                    <p className="text-sm font-medium" style={{ color: ink }}>{title}</p>
                                    <p className="mt-0.5 text-xs leading-5 font-light" style={{ color: inkSecond }}>{copy}</p>
                                </div>
                            ))}
                        </div>

                        <motion.a
                            href="#projects"
                            whileHover={{ x: 6 }}
                            className="mt-10 inline-flex items-center gap-3 text-sm font-medium"
                            style={{ color: accent }}
                        >
                            See my work <span>→</span>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export const About = JewelryBrand2About;
export default JewelryBrand2About;
