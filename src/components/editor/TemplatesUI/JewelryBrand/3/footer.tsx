// @ts-nocheck
import { ArrowUp, Sparkles } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function JewelryBrand3Footer({ props = {}, theme, onChange }: any) {
    const bg = '#061C14';
    const ink = '#FFFFFF';
    const inkSecond = '#A3C8B7';

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            className="py-16 md:py-20 px-6 md:px-14 border-t border-white/10"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl space-y-16">
                <div className="grid md:grid-cols-12 gap-12 items-start">
                    <div className="md:col-span-5 space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="font-serif text-3xl font-light tracking-[0.18em] uppercase">
                                <Editable value={props?.brand || 'MILLER JEWELRY'} onChange={v => onChange?.({ brand: v })} />
                            </span>
                            <Sparkles size={16} className="text-emerald-400" />
                        </div>
                        <p className="text-xs font-light leading-relaxed max-w-sm" style={{ color: inkSecond }}>
                            <Editable
                                value={props?.desc || 'Exceptional untreated Colombian emerald high jewelry. Designed for lasting elegance and handcrafted in our London and Paris bench workshops.'}
                                onChange={v => onChange?.({ desc: v })}
                            />
                        </p>
                    </div>

                    <div className="md:col-span-7 grid grid-cols-3 gap-6 text-xs font-sans">
                        <div className="space-y-3">
                            <p className="font-bold uppercase tracking-wider text-white">COLLECTIONS</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Emerald Chokers</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Clover Pendants</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Marquise Solitaires</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Cushion Drops</p>
                        </div>
                        <div className="space-y-3">
                            <p className="font-bold uppercase tracking-wider text-white">THE MAISON</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Muzo Heritage</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Ethical Mining</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Press & Red Carpet</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Private Vault</p>
                        </div>
                        <div className="space-y-3">
                            <p className="font-bold uppercase tracking-wider text-white">SALONS</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Mayfair, London</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Place Vendôme, Paris</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Madison Ave, New York</p>
                            <p className="hover:text-white cursor-pointer transition-colors" style={{ color: inkSecond }}>Champagne Bookings</p>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[11px] gap-4" style={{ color: inkSecond }}>
                    <p>© {new Date().getFullYear()} Miller High Jewelry SA. All rights reserved.</p>
                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="inline-flex items-center gap-2 uppercase tracking-widest font-mono text-[10px] text-white hover:text-emerald-300"
                    >
                        <span>BACK TO TOP</span>
                        <ArrowUp size={12} />
                    </button>
                </div>
            </div>
        </footer>
    );
}

export const Footer = JewelryBrand3Footer;
export default JewelryBrand3Footer;
