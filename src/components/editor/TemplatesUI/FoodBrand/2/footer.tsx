// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { ArrowUp } from 'lucide-react';

export function FoodBrand2Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#1c1917';
    const ink = theme?.ink || '#ffffff';

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            className="w-full py-16 px-6 sm:px-12 select-none border-t border-white/10"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Brand */}
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-base font-bold text-white shrink-0"
                        style={{ backgroundColor: '#df4d26' }}
                    >
                        S
                    </div>
                    <div>
                        <div
                            className="font-extrabold text-xl tracking-tight text-white"
                            style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                        >
                            <Editable value={props?.brand || 'Solstice Provisions'} onChange={v => onChange?.({ brand: v })} />
                        </div>
                        <p className="text-white/60 text-xs mt-0.5">
                            Uncompromising Flavor, Crafted by Hand. &copy; {new Date().getFullYear()} Solstice Foods Co.
                        </p>
                    </div>
                </div>

                {/* Nav Links */}
                <div className="flex flex-wrap justify-center items-center gap-8 text-xs font-bold uppercase tracking-wider text-white/80">
                    <a href="#hero" className="hover:text-[#df4d26] transition-colors">Home</a>
                    <a href="#story" className="hover:text-[#df4d26] transition-colors">Our Story</a>
                    <a href="#craft" className="hover:text-[#df4d26] transition-colors">The Craft</a>
                    <a href="#collection" className="hover:text-[#df4d26] transition-colors">Collection</a>
                    <a href="#press" className="hover:text-[#df4d26] transition-colors">Press</a>
                    <a href="#stockists" className="hover:text-[#df4d26] transition-colors">Stockists</a>
                </div>

                {/* Back to top */}
                <button
                    onClick={scrollToTop}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-[#1c1917] text-white flex items-center justify-center transition-all duration-200 shadow-sm shrink-0"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={18} />
                </button>
            </div>
        </footer>
    );
}

export const FooterDefault = FoodBrand2Footer;
export default FoodBrand2Footer;
