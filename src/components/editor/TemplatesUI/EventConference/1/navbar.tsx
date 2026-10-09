// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';

export function EventConference1Navbar({ props = {}, theme, onChange }: any) {
    return (
        <header
            className="w-full relative z-40 transition-colors"
            style={{
                backgroundColor: '#10376D',
                border: 'none',
            }}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12 py-5 sm:py-6">
                {/* Logo on Left: "pulse" */}
                <a href="#top" className="flex items-center gap-1.5 group select-none">
                    <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans lowercase">
                        <Editable value={props?.brand || 'pulse'} onChange={v => onChange?.({ brand: v })} />
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 group-hover:scale-125 transition-transform" />
                </a>

                {/* Nothing in center */}

                {/* Right: Exactly TWO buttons only, zero borders */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <a
                        href="#about"
                        className="hidden sm:inline-flex px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <Editable value={props?.btnSecondary || 'About Pulse'} onChange={v => onChange?.({ btnSecondary: v })} />
                    </a>
                    <a
                        href="#contact"
                        className="px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-neutral-900 bg-white hover:bg-neutral-100 transition-all shadow-md"
                    >
                        <Editable value={props?.btnLabel || 'Register for 2026'} onChange={v => onChange?.({ btnLabel: v })} />
                    </a>
                </div>
            </div>
        </header>
    );
}

export const Navbar = EventConference1Navbar;
export default EventConference1Navbar;
