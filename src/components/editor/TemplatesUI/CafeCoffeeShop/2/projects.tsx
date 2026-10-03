// @ts-nocheck
import { motion } from 'framer-motion';
import { ArrowUpRight, Bean, CakeSlice, CupSoda } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#11100d';
    const bgSecond = theme?.['bg-second'] || '#27231e';
    const ink = theme?.ink || '#f6f0e6';
    const inkSecond = theme?.['ink-second'] || ink;
    const surface = theme?.surface || 'rgba(255, 255, 255, 0.12)';
    const accent = theme?.accent || '#c89c5a';
  const fontBody = theme?.fontBody || "Inter";
    const items = props?.items || [{ title: 'House espresso', detail: 'Nutty · caramel · silky', price: '$5.00', text: 'A seasonal blend roasted for the sweetest everyday cup.', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80' }, { title: 'The long black', detail: 'Clean · aromatic · bright', price: '$5.50', text: 'Our house espresso opened up with just the right amount of water.', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80' }, { title: 'Something sweet', detail: 'Baked here · daily', price: '$7.00', text: 'A rotating slice, bun, or tart made for the middle of the afternoon.', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80' }, { title: 'Take it home', detail: 'Beans · retail', price: '$18.00', text: 'A small-batch bag from one of our favourite seasonal lots.', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80' }];
    const icons = [Bean, CupSoda, CakeSlice, Bean];

    return (
        <section id="projects" className="px-6 py-28 lg:px-12" style={{ backgroundColor: bg, color: ink , fontFamily: fontBody }}>
            <div className="mx-auto max-w-[1400px]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col justify-between gap-6 border-b pb-8 sm:flex-row sm:items-end"
                    style={{ borderColor: surface }}
                >
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: accent }}><Editable value={props?.label || 'What we are pouring'} /></p>
                        <h2 className="mt-5 font-fraunces text-6xl tracking-[-0.05em] sm:text-8xl"><Editable value={props?.headline || 'The good menu.'} /></h2>
                    </div>
                    <p className="max-w-xs text-sm leading-6" style={{ color: `${ink}88` }}><Editable value={props?.intro || 'Simple things, taken seriously. Our menu changes with the seasons.'} /></p>
                </motion.div>

                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((item, index) => {
                        const Icon = icons[index % icons.length];
                        return (
                            <motion.article
                                key={item.title}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -8 }}
                                className="group overflow-hidden border"
                                style={{ backgroundColor: bgSecond, borderColor: surface }}
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <motion.img
                                        src={item.image}
                                        className="h-full w-full object-cover grayscale-[20%]"
                                        whileHover={{ scale: 1.08, filter: 'grayscale(0%)' }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full" style={{ backgroundColor: `${bg}dd`, color: accent }}>
                                        <Icon size={16} />
                                    </span>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-[9px] uppercase tracking-[0.2em]" style={{ color: accent }}><Editable value={item.detail} /></p>
                                            <h3 className="mt-3 font-fraunces text-3xl"><Editable value={item.title} /></h3>
                                        </div>
                                        <p className="text-sm" style={{ color: `${ink}88` }}><Editable value={item.price} /></p>
                                    </div>
                                    <p className="mt-5 text-sm leading-6" style={{ color: `${ink}88` }}><Editable value={item.text} /></p>
                                    <a href="#contact" className="mt-7 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] transition hover:gap-3" style={{ color: accent }}>
                                        <Editable value="Make it yours" />
                                        <ArrowUpRight size={14} />
                                    </a>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
