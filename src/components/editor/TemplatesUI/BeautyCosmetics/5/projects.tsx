// @ts-nocheck
import { FiHeart, FiShoppingBag, FiArrowUpRight } from 'react-icons/fi';
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

const DEFAULT_ITEMS = [
    { title: 'Aloe Mac Foundation', category: 'Face', price: '$32', tag: 'Best seller', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85' },
    { title: 'Avocado Clay Mask', category: 'Masks', price: '$24', tag: 'New', image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=85' },
    { title: 'Green Tea Serum', category: 'Serums', price: '$38', tag: '', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85' },
    { title: 'Daily Barrier Cream', category: 'Moisturizers', price: '$28', tag: '', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=85' },
    { title: 'Gentle Foam Cleanser', category: 'Cleansers', price: '$18', tag: '', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=85' },
    { title: 'Rose Hydrating Mist', category: 'Toners', price: '$20', tag: 'New', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=85' },
    { title: 'Mineral Sunscreen SPF 40', category: 'Sun care', price: '$26', tag: '', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=85' },
    { title: 'Night Repair Balm', category: 'Night care', price: '$34', tag: '', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?auto=format&fit=crop&w=800&q=85' }
];

export function Projects({ props = {}, onChange }: any) {
    const items = props?.items && props.items.length > 0 ? props.items : DEFAULT_ITEMS;

    const update = (index: number, patch: any) => {
        const next = [...items];
        next[index] = { ...items[index], ...patch };
        onChange?.({ items: next });
    };

    return (
        <section
            id="projects"
            className="w-full px-4 py-8 sm:px-6"
            style={{ backgroundColor: C.frame, color: C.ink, fontFamily: 'Poppins, system-ui, sans-serif' }}
        >
            <div className="mx-auto max-w-7xl rounded-[2.5rem] p-6 sm:p-12" style={{ backgroundColor: C.card }}>
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold" style={{ backgroundColor: C.mint, color: C.ink }}>
                            <Editable value="Products" style={{ color: 'inherit' }} />
                        </span>
                        <Editable
                            as="h2"
                            value="Gentle care for every skin type."
                            className="mt-5 max-w-lg text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl"
                            style={{ color: C.ink }}
                        />
                    </div>
                    <a
                        href="#contact"
                        className="inline-flex w-fit items-center gap-3 rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-widest transition hover:scale-105"
                        style={{ backgroundColor: C.ink, color: C.white }}
                    >
                        <Editable value="Order now" style={{ color: 'inherit' }} />
                        <FiArrowUpRight size={16} />
                    </a>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((item: any, index: number) => (
                        <article
                            key={index}
                            className="group flex flex-col rounded-[2rem] p-3 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            style={{ backgroundColor: C.white }}
                        >
                            <div className="relative aspect-square overflow-hidden rounded-[1.5rem]" style={{ backgroundColor: C.tint }}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                                {item.tag ? (
                                    <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold" style={{ backgroundColor: C.sage, color: C.white }}>
                                        {item.tag}
                                    </span>
                                ) : null}
                                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full" style={{ backgroundColor: C.white, color: C.ink }}>
                                    <FiHeart size={15} />
                                </span>
                            </div>

                            <div className="flex flex-1 flex-col justify-between gap-4 px-3 pb-3 pt-4">
                                <div>
                                    <Editable
                                        as="p"
                                        value={item.category}
                                        onChange={(v) => update(index, { category: v })}
                                        className="text-[11px] font-medium"
                                        style={{ color: C.inkSecond }}
                                    />
                                    <Editable
                                        as="h3"
                                        value={item.title}
                                        onChange={(v) => update(index, { title: v })}
                                        className="mt-1 text-base font-semibold leading-snug"
                                        style={{ color: C.ink }}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Editable
                                        as="span"
                                        value={item.price}
                                        onChange={(v) => update(index, { price: v })}
                                        className="text-lg font-semibold"
                                        style={{ color: C.sage }}
                                    />
                                    <a
                                        href="#contact"
                                        aria-label={`Order ${item.title}`}
                                        className="grid h-10 w-10 place-items-center rounded-full transition hover:scale-110"
                                        style={{ backgroundColor: C.ink, color: C.white }}
                                    >
                                        <FiShoppingBag size={15} />
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}