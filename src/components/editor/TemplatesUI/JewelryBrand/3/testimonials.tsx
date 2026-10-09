// @ts-nocheck
import { Star, Sparkles, Quote } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

const defaultQuotes = [
    {
        publication: 'VOGUE FINE JEWELLERY',
        quote: 'Miller Jewelry proves that sustainable emerald high jewelry can outshine the oldest historic houses of Place Vendôme.',
        author: 'Camille Laurent',
        role: 'Senior Jewelry Editor · Paris'
    },
    {
        publication: 'HARPER’S BAZAAR',
        quote: 'The clover pendant and collar choker are modern masterpieces — radiant, architectural, yet intimately wearable.',
        author: 'Evelyn St. Claire',
        role: 'Fashion Features Director · New York'
    },
    {
        publication: 'PRIVATE COLLECTOR',
        quote: 'Wearing the emerald choker makes you feel completely transformed. It carries an aura like no other piece in my vault.',
        author: 'Genevieve Vance',
        role: 'High Jewelry Connoisseur · Zurich'
    }
];

export function JewelryBrand3Testimonials({ props = {}, theme, onChange }: any) {
    const bg = '#08251B';
    const ink = '#FFFFFF';
    const inkSecond = '#A3C8B7';
    const accent = theme?.accent || '#E0C773';

    const quotes = (props?.testimonials && props.testimonials.length > 0) ? props.testimonials : defaultQuotes;

    const updateQuote = (idx: number, key: string, val: string) => {
        const next = quotes.map((item: any, i: number) => i === idx ? { ...item, [key]: val } : item);
        onChange?.({ testimonials: next });
    };

    return (
        <section
            id="testimonials"
            className="relative py-24 md:py-36 px-6 md:px-14 border-b border-white/10"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">
                        <Editable value={props?.eyebrow || 'EDITORIAL ACCLAIM & COLLECTOR DIALOGUE'} onChange={v => onChange?.({ eyebrow: v })} />
                    </p>
                    <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight">
                        <Editable value={props?.headline || 'Praised in the World of Haute Joaillerie'} onChange={v => onChange?.({ headline: v })} />
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {quotes.map((item: any, idx: number) => (
                        <div
                            key={idx}
                            className="rounded-3xl p-8 border border-white/10 flex flex-col justify-between"
                            style={{ backgroundColor: 'rgba(11, 43, 32, 0.5)' }}
                        >
                            <div>
                                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                    <span className="font-mono text-[10px] tracking-widest text-amber-200 uppercase">
                                        <Editable value={item.publication} onChange={v => updateQuote(idx, 'publication', v)} />
                                    </span>
                                    <Sparkles size={14} className="text-emerald-400" />
                                </div>
                                <blockquote className="font-serif text-lg font-light leading-relaxed my-6">
                                    “<Editable value={item.quote} onChange={v => updateQuote(idx, 'quote', v)} />”
                                </blockquote>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <p className="font-serif text-base text-white">
                                    <Editable value={item.author} onChange={v => updateQuote(idx, 'author', v)} />
                                </p>
                                <p className="font-mono text-[10px]" style={{ color: inkSecond }}>
                                    <Editable value={item.role} onChange={v => updateQuote(idx, 'role', v)} />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export const Testimonials = JewelryBrand3Testimonials;
export default JewelryBrand3Testimonials;
