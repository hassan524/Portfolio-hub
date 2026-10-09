// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { ArrowUp } from 'lucide-react';

export function FoodBrand3Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#080604';
    const ink = theme?.['ink-second'] || '#f5edd6';

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            className="w-full relative px-6 sm:px-12 pt-20 pb-12 select-none border-t border-[#d4af5f]/20 overflow-hidden"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl relative z-10 space-y-16">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#d4af5f]/15">
                    <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#d4af5f] block mb-1">
                            Atelier de Gastronomie
                        </span>
                        <div
                            className="text-2xl font-light tracking-[0.2em] uppercase text-[#f5edd6]"
                            style={{ fontFamily: 'Georgia, serif' }}
                        >
                            <Editable value={props?.brand || 'OBSIDIAN'} onChange={v => onChange?.({ brand: v })} />
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-[#f5edd6]/60">
                        <a href="#hero" className="hover:text-[#d4af5f] transition-colors">Prologue</a>
                        <a href="#story" className="hover:text-[#d4af5f] transition-colors">Terroir</a>
                        <a href="#menu" className="hover:text-[#d4af5f] transition-colors">Movements</a>
                        <a href="#press" className="hover:text-[#d4af5f] transition-colors">Accolades</a>
                        <a href="#reservations" className="hover:text-[#d4af5f] transition-colors">Concierge</a>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="w-10 h-10 rounded-full border border-[#d4af5f]/30 hover:border-[#d4af5f] text-[#d4af5f] flex items-center justify-center transition-all shrink-0"
                        aria-label="Back to top"
                    >
                        <ArrowUp size={16} />
                    </button>
                </div>

                {/* Massive edge-to-edge watermark brand type */}
                <div
                    className="text-center text-5xl sm:text-8xl lg:text-9xl font-light tracking-[0.2em] uppercase text-[#d4af5f]/5 pointer-events-none select-none"
                    style={{ fontFamily: 'Georgia, serif' }}
                >
                    OBSIDIAN
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-widest text-white/30 pt-4">
                    <p>&copy; {new Date().getFullYear()} Obsidian Gastronomie S.A.S. Paris, France.</p>
                    <p>Three Stars · Michelin Guide</p>
                </div>
            </div>
        </footer>
    );
}

export const FooterDefault = FoodBrand3Footer;
export default FoodBrand3Footer;
