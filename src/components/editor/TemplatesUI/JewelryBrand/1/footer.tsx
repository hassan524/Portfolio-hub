// @ts-nocheck
import { ArrowUp } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function JewelryBrand1Footer({ props = {}, theme, onChange }: any) {
    const bg = '#12100E'; // Deep dark luxury footer matching Image 3 bottom
    const ink = '#FFFFFF';
    const inkSecond = '#A8A29E';
    const accent = theme?.accent || '#B48C56';

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            className="py-16 md:py-20 px-6 md:px-14 border-t"
            style={{ backgroundColor: bg, color: ink, borderColor: 'rgba(255,255,255,0.08)' }}
        >
            <div className="mx-auto max-w-7xl space-y-16">
                <div className="grid md:grid-cols-12 gap-12 items-start">
                    {/* Brand column */}
                    <div className="md:col-span-5 space-y-4">
                        <span className="font-serif text-3xl font-bold tracking-[0.18em] uppercase">
                            <Editable value={props?.brand || 'ADORNIX'} onChange={v => onChange?.({ brand: v })} />
                        </span>
                        <p className="text-xs font-light leading-relaxed max-w-sm" style={{ color: inkSecond }}>
                            <Editable
                                value={props?.desc || 'Crafted with passion for enduring grace. Hand-selected ethically sourced gemstones and solid recycled gold, designed for every meaningful chapter.'}
                                onChange={v => onChange?.({ desc: v })}
                            />
                        </p>
                    </div>

                    {/* Links columns (From Image 3 bottom) */}
                    <div className="md:col-span-7 grid grid-cols-3 gap-6 text-xs">
                        <div className="space-y-3">
                            <p className="font-sans font-bold uppercase tracking-wider text-white">COMPANY</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>About Us</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Artisans</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Press & Vogue</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Sustainability</p>
                        </div>
                        <div className="space-y-3">
                            <p className="font-sans font-bold uppercase tracking-wider text-white">COLLECTIONS</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Rings & Bands</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Classic Necklaces</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Bold Bracelets</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Twist Hoops</p>
                        </div>
                        <div className="space-y-3">
                            <p className="font-sans font-bold uppercase tracking-wider text-white">CUSTOMER CARE</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Free Shipping</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>30-Day Returns</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Ring Sizing Guide</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Concierge Desk</p>
                        </div>
                    </div>
                </div>

                {/* Bottom line */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[11px] gap-4" style={{ color: inkSecond }}>
                    <p>© {new Date().getFullYear()} ADORNIX Fine Jewelry Inc. All rights reserved.</p>
                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="inline-flex items-center gap-2 uppercase tracking-widest font-mono text-[10px] text-white hover:underline"
                    >
                        <span>BACK TO TOP</span>
                        <ArrowUp size={12} />
                    </button>
                </div>
            </div>
        </footer>
    );
}

export const Footer = JewelryBrand1Footer;
export default JewelryBrand1Footer;
