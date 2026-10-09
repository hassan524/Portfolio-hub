// @ts-nocheck
import { useState } from 'react';
import { Editable } from '@/components/editor/ui/Editable';
import { Shield, Menu, X } from 'lucide-react';

export function EventConference3Navbar({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#0A0A0D';
    const ink = theme?.ink || '#FFFFFF';
    const [open, setOpen] = useState(false);

    return (
        <header
            className="w-full relative z-40 transition-colors border-none"
            style={{
                backgroundColor: bg,
                color: ink
            }}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12 py-5">
                {/* Left: Shield Emblem & Brand Name */}
                <a href="#top" className="flex items-center gap-2.5 group select-none">
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                        <Shield size={16} fill="white" className="text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight uppercase font-sans text-white">
                        <Editable value={props?.brand || 'HATCH'} onChange={v => onChange?.({ brand: v })} />
                    </span>
                </a>

                {/* Center: Navigation Links */}
                <nav className="hidden lg:flex items-center gap-8 text-xs font-medium text-white/80">
                    <a href="#top" className="hover:text-white transition-colors">Home</a>
                    <a href="#about" className="hover:text-white transition-colors">Events</a>
                    <a href="#projects" className="hover:text-white transition-colors">Agenda</a>
                    <a href="#about" className="hover:text-white transition-colors">Leadership Retreat</a>
                    <a href="#testimonials" className="hover:text-white transition-colors">Partners</a>
                </nav>

                {/* Right: Get Tickets Button */}
                <div className="hidden sm:flex items-center gap-4">
                    <a
                        href="#contact"
                        className="px-6 py-2.5 rounded-full text-xs font-semibold text-black bg-white hover:bg-neutral-100 transition-all shadow-md"
                    >
                        <Editable value={props?.btnLabel || 'Get Tickets'} onChange={v => onChange?.({ btnLabel: v })} />
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="lg:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Drawer */}
            {open && (
                <div className="lg:hidden px-6 py-4 space-y-3 bg-[#121218] border-t border-white/10">
                    <a href="#top" onClick={() => setOpen(false)} className="block text-xs font-medium text-white py-1">Home</a>
                    <a href="#about" onClick={() => setOpen(false)} className="block text-xs font-medium text-white py-1">Events</a>
                    <a href="#projects" onClick={() => setOpen(false)} className="block text-xs font-medium text-white py-1">Agenda</a>
                    <a href="#about" onClick={() => setOpen(false)} className="block text-xs font-medium text-white py-1">Leadership Retreat</a>
                    <a href="#testimonials" onClick={() => setOpen(false)} className="block text-xs font-medium text-white py-1">Partners</a>
                    <a href="#contact" onClick={() => setOpen(false)} className="block text-center mt-3 py-2.5 rounded-full text-xs font-semibold bg-white text-black">
                        Get Tickets
                    </a>
                </div>
            )}
        </header>
    );
}

export const Navbar = EventConference3Navbar;
export default EventConference3Navbar;
