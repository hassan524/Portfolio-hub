// @ts-nocheck
import { ArrowUp, Droplets } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#06131A';
    const ink = theme?.ink || '#E2F4F6';
    const inkSecond = theme?.['ink-second'] || '#81A8B8';
    const accent = theme?.accent || '#38BDF8';

    return (
        <footer className="border-t px-6 py-16 relative overflow-hidden" style={{ backgroundColor: bg, color: ink, borderColor: `${accent}22` }}>
            <div className="mx-auto max-w-6xl relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b" style={{ borderColor: `${accent}15` }}>
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full border bg-cyan-500/10" style={{ borderColor: `${accent}44` }}>
                            <Droplets size={20} style={{ color: accent }} />
                        </div>
                        <Editable value="LUMEN" className="text-xl font-light tracking-[0.4em] uppercase" />
                    </div>

                    <div className="flex flex-wrap items-center gap-8 text-xs uppercase tracking-widest font-medium" style={{ color: inkSecond }}>
                        <a href="#about" className="hover:text-cyan-300 transition">Studio</a>
                        <a href="#projects" className="hover:text-cyan-300 transition">Treatments</a>
                        <a href="#testimonials" className="hover:text-cyan-300 transition">Voices</a>
                        <a href="#contact" className="hover:text-cyan-300 transition">Contact</a>
                    </div>

                    <a
                        href="#top"
                        className="grid h-12 w-12 place-items-center rounded-full border transition hover:scale-110 active:scale-95"
                        style={{ borderColor: `${accent}44`, backgroundColor: 'rgba(255,255,255,0.03)' }}
                    >
                        <ArrowUp size={18} style={{ color: accent }} />
                    </a>
                </div>

                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light" style={{ color: inkSecond }}>
                    <Editable value="© 2026 Lumen Studio · Pure Hydration & Skin Restoration." />
                    <Editable value="Brooklyn · New York" />
                </div>
            </div>
        </footer>
    );
}