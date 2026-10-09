// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { ArrowUp, Terminal } from 'lucide-react';

export function FoodBrand4Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#010611';
    const ink = theme?.['ink-second'] || '#e8f4ff';

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            className="w-full relative px-6 sm:px-12 pt-20 pb-12 select-none border-t border-[#00d4ff]/20 overflow-hidden font-mono"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl relative z-10 space-y-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#00d4ff]/20 text-[#00d4ff] flex items-center justify-center">
                            <Terminal size={18} />
                        </div>
                        <div>
                            <span className="text-sm font-black tracking-widest text-white uppercase">
                                <Editable value={props?.brand || 'NEBULA BIO-FOODS'} onChange={v => onChange?.({ brand: v })} />
                            </span>
                            <span className="text-[10px] text-white/40 block mt-0.5">
                                BIO-FORMULATION ENGINE // V.4.1
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-8 text-[11px] uppercase tracking-widest text-white/70">
                        <a href="#hero" className="hover:text-[#00d4ff] transition-colors">[01] SCENE</a>
                        <a href="#science" className="hover:text-[#00d4ff] transition-colors">[02] MATRIX</a>
                        <a href="#flavors" className="hover:text-[#00d4ff] transition-colors">[03] FLAVORS</a>
                        <a href="#reviews" className="hover:text-[#00d4ff] transition-colors">[04] DISPATCH</a>
                        <a href="#stockists" className="hover:text-[#00d4ff] transition-colors">[05] RADAR</a>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#00d4ff] text-[#00d4ff] flex items-center justify-center transition-all shrink-0"
                        aria-label="Back to top"
                    >
                        <ArrowUp size={16} />
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/40">
                    <p>&copy; {new Date().getFullYear()} Nebula Bio-Foods Inc. All Plant Substrates Verified.</p>
                    <div className="flex items-center gap-6">
                        <span className="text-[#00ff9f]">CARBON NEUTRAL 2024</span>
                        <span className="text-[#00d4ff]">NON-GMO PROJECT CERTIFIED</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export const FooterDefault = FoodBrand4Footer;
export default FoodBrand4Footer;
