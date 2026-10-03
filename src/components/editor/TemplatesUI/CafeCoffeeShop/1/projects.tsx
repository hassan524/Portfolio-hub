// @ts-nocheck
import { motion } from 'framer-motion';
import { ArrowUpRight, Coffee, Croissant, GlassWater } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#24140d';
    const bgSecond = theme?.['bg-second'] || '#f3e9db';
    const ink = theme?.ink || '#fff9f0';
    const inkSecond = theme?.['ink-second'] || '#24140d';
    const surface = theme?.surface || 'rgba(255, 255, 255, 0.08)';
    const accent = theme?.accent || '#e1a66b';
  const fontBody = theme?.fontBody || "Inter";
    const items = props?.items || [{ title: 'The morning pour', type: 'Coffee / From $5.50', text: 'Silky espresso, bright filter, and the kind of cup that changes your pace.', image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=80' }, { title: 'Daily provisions', type: 'Kitchen / From $9.50', text: 'Warm pastries, toasted sourdough, and little plates built for sharing.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80' }, { title: 'After light', type: 'Drinks / From $7.00', text: 'House-made sodas, slow pours, and a short list of natural wines.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80' }, { title: 'The house roast', type: 'Beans / From $18.00', text: 'A rotating bag of our favourite seasonal coffee to take home.', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80' }];
    const icons = [Coffee, Croissant, GlassWater, Coffee];

    return (
        <section id="projects" className="px-5 py-28 sm:px-10 lg:px-16" style={{ backgroundColor: bg, color: ink , fontFamily: fontBody }}>
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
                >
                    <div>
                        <p className="mb-4 text-xs uppercase tracking-[0.22em]" style={{ color: accent }}><Editable value={props?.label || 'On the table'} /></p>
                        <h2 className="font-fraunces text-5xl tracking-[-0.04em] sm:text-7xl"><Editable value={props?.headline || 'Good things, daily.'} /></h2>
                    </div>
                    <p className="max-w-xs text-sm leading-6" style={{ color: `${ink}99` }}><Editable value={props?.intro || 'A considered menu that follows the seasons and keeps the good stuff close.'} /></p>
                </motion.div>

                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                                className="group overflow-hidden rounded-[2rem]"
                                style={{ backgroundColor: bgSecond, color: inkSecond }}
                            >
                                <div className="relative h-72 overflow-hidden">
                                    <motion.img
                                        src={item.image}
                                        className="h-full w-full object-cover"
                                        whileHover={{ scale: 1.08 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <div className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full" style={{ backgroundColor: `${bgSecond}dd`, color: bg }}>
                                        <Icon size={17} />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between gap-4">
                                        <div>
                                            <p className="text-xs uppercase tracking-widest" style={{ color: `${inkSecond}88` }}><Editable value={item.type} /></p>
                                            <h3 className="mt-3 font-fraunces text-3xl"><Editable value={item.title} /></h3>
                                        </div>
                                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full transition group-hover:rotate-45" style={{ backgroundColor: accent, color: bg }}>
                                            <ArrowUpRight size={17} />
                                        </span>
                                    </div>
                                    <p className="mt-4 text-sm leading-6" style={{ color: `${inkSecond}99` }}><Editable value={item.text} /></p>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
