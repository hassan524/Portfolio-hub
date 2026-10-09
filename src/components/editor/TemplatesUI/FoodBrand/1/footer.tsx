// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { UtensilsCrossed, ArrowUp } from 'lucide-react';

export function FoodBrand1Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#17432f';
    const ink = theme?.ink || '#ffffff';

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            className="w-full py-14 px-6 sm:px-12 select-none border-t border-white/10"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Brand & copyright */}
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0"
                        style={{ backgroundColor: '#2e7254' }}
                    >
                        <UtensilsCrossed size={18} className="text-[#cbe675]" />
                    </div>
                    <div>
                        <div
                            className="font-extrabold text-xl tracking-tight text-white"
                            style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                        >
                            <Editable value={props?.brand || 'Tasteory'} onChange={v => onChange?.({ brand: v })} />
                        </div>
                        <p className="text-white/60 text-xs mt-0.5">
                            Crafted with Passion, Served with Love. &copy; {new Date().getFullYear()} Tasteory Co.
                        </p>
                    </div>
                </div>

                {/* Quick Nav Links */}
                <div className="flex flex-wrap justify-center items-center gap-8 text-xs font-bold uppercase tracking-wider text-white/80">
                    <a href="#hero" className="hover:text-[#cbe675] transition-colors">Home</a>
                    <a href="#story" className="hover:text-[#cbe675] transition-colors">About</a>
                    <a href="#menu" className="hover:text-[#cbe675] transition-colors">Menu</a>
                    <a href="#gallery" className="hover:text-[#cbe675] transition-colors">Gallery</a>
                    <a href="#contact" className="hover:text-[#cbe675] transition-colors">Contact</a>
                </div>

                {/* Back to top */}
                <button
                    onClick={scrollToTop}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-[#17432f] text-white flex items-center justify-center transition-all duration-200 shadow-sm shrink-0"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={18} />
                </button>
            </div>
        </footer>
    );
}

export const FooterDefault = FoodBrand1Footer;
export default FoodBrand1Footer;
