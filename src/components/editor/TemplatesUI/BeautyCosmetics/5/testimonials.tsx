// @ts-nocheck
import { FiArrowUpRight, FiClock } from 'react-icons/fi';
import { Editable } from '@/components/editor/ui/Editable';

const C = {
    frame: '#E8ECE3',
    card: '#F7F8F3',
    white: '#FFFFFF',
    ink: '#16261B',
    inkSecond: '#5F7265',
    sage: '#5C7B5D',
    mint: '#CFE5CF',
    tint: '#E3EADF'
};

const DEFAULT_POSTS = [
    {
        category: 'Skin care',
        date: 'Sep 18, 2026',
        read: '5 min read',
        title: 'How to build a simple morning routine in three steps',
        excerpt: 'Cleanse, moisturize, protect. Here is why less is often more for healthy skin, and which products to start with.',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85'
    },
    {
        category: 'Ingredients',
        date: 'Sep 02, 2026',
        read: '4 min read',
        title: 'Why aloe and avocado work so well for dry skin',
        excerpt: 'A look at the natural ingredients behind our Aloe Mac Foundation and how they support your skin barrier.',
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85'
    },
    {
        category: 'Tips',
        date: 'Aug 21, 2026',
        read: '6 min read',
        title: 'Protecting your natural skin tone from the sun',
        excerpt: 'Sunscreen basics, how often to reapply, and the mistakes that quietly age your skin faster.',
        image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=85'
    }
];

export function Testimonials({ props = {}, onChange }: any) {
    const posts = props?.posts && props.posts.length > 0 ? props.posts : DEFAULT_POSTS;

    const update = (index: number, patch: any) => {
        const next = [...posts];
        next[index] = { ...posts[index], ...patch };
        onChange?.({ posts: next });
    };

    return (
        <section
            id="testimonials"
            className="w-full px-4 py-8 sm:px-6"
            style={{ backgroundColor: C.frame, color: C.ink, fontFamily: 'Poppins, system-ui, sans-serif' }}
        >
            <div className="mx-auto max-w-7xl rounded-[2.5rem] p-6 sm:p-12" style={{ backgroundColor: C.card }}>
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold" style={{ backgroundColor: C.mint, color: C.ink }}>
                            <Editable value="Blog" style={{ color: 'inherit' }} />
                        </span>
                        <Editable
                            as="h2"
                            value="Skin care tips from our team."
                            className="mt-5 max-w-lg text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl"
                            style={{ color: C.ink }}
                        />
                    </div>
                    <Editable
                        as="p"
                        value="Short, practical reads on ingredients, routines and caring for your natural skin."
                        className="max-w-xs text-sm leading-relaxed"
                        style={{ color: C.inkSecond }}
                    />
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {posts.map((post: any, index: number) => (
                        <article key={index} className="group flex flex-col rounded-[2rem] p-3" style={{ backgroundColor: C.white }}>
                            <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem]" style={{ backgroundColor: C.tint }}>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                                <div className="flex flex-wrap items-center gap-2 text-[11px]" style={{ color: C.inkSecond }}>
                                    <span className="rounded-full px-3 py-1 font-semibold" style={{ backgroundColor: C.tint, color: C.sage }}>
                                        {post.category}
                                    </span>
                                    <span>{post.date}</span>
                                    <span className="inline-flex items-center gap-1">
                                        <FiClock size={11} /> {post.read}
                                    </span>
                                </div>

                                <Editable
                                    as="h3"
                                    value={post.title}
                                    onChange={(v) => update(index, { title: v })}
                                    className="mt-4 text-lg font-semibold leading-snug"
                                    style={{ color: C.ink }}
                                />
                                <Editable
                                    as="p"
                                    value={post.excerpt}
                                    onChange={(v) => update(index, { excerpt: v })}
                                    className="mt-3 text-sm leading-relaxed"
                                    style={{ color: C.inkSecond }}
                                />

                                <a
                                    href="#testimonials"
                                    className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition group-hover:gap-3"
                                    style={{ color: C.ink }}
                                >
                                    Read more
                                    <span className="grid h-8 w-8 place-items-center rounded-full" style={{ backgroundColor: C.ink, color: C.white }}>
                                        <FiArrowUpRight size={14} />
                                    </span>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}