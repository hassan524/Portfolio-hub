// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';

export function SkincareBrand1Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#fbf4ec';
    const ink = theme?.['ink-second'] || '#1a1a1a';

    return (
        <footer
            className="w-full py-16 px-6 sm:px-14 select-none border-t border-black/10"
            style={{
                backgroundColor: bg,
                color: ink
            }}
        >
            <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-neutral-500 uppercase tracking-widest">
                <div>
                    <span className="font-serif italic lowercase text-base text-neutral-900 font-normal">naat '99</span>
                    <span className="ml-4 text-[10px]">© 2026 NAAT '99 SKINCARE. ALL RIGHTS RESERVED.</span>
                </div>

                <div className="flex items-center gap-6 text-[10px]">
                    <a href="#hero" className="hover:text-neutral-900 transition-colors">PRIVACY</a>
                    <a href="#hero" className="hover:text-neutral-900 transition-colors">ETHICAL SOURCING</a>
                    <a href="#hero" className="hover:text-neutral-900 transition-colors">INSTAGRAM</a>
                </div>
            </div>
        </footer>
    );
}

export const FooterDefault = SkincareBrand1Footer;
export default SkincareBrand1Footer;
