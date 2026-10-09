// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { ShoppingBag } from 'lucide-react';

export function SkincareBrand1Navbar({ props = {}, theme, onChange }: any) {
    return (
        <header
            className="w-full fixed top-0 left-0 z-50 px-6 sm:px-12 py-5 select-none text-white mix-blend-difference"
        >
            <div className="mx-auto max-w-7xl flex items-center justify-between">
                <a href="#hero" className="text-xl sm:text-2xl font-serif font-light tracking-wider lowercase">
                    <Editable value={props?.brand || "naat '99"} onChange={v => onChange?.({ brand: v })} />
                </a>

                <nav className="flex items-center gap-5 sm:gap-10 text-[11px] sm:text-xs font-sans tracking-widest uppercase">
                    <a href="#hero" className="hidden sm:inline opacity-80 hover:opacity-100 transition-opacity">Home</a>
                    <a href="#mission" className="opacity-80 hover:opacity-100 transition-opacity">Mission</a>
                    <a href="#vision" className="opacity-80 hover:opacity-100 transition-opacity">Products</a>
                    <a href="#contact" aria-label="Cart" className="opacity-80 hover:opacity-100 transition-opacity">
                        <ShoppingBag size={16} />
                    </a>
                </nav>
            </div>
        </header>
    );
}

export const Navbar = SkincareBrand1Navbar;
export default SkincareBrand1Navbar;