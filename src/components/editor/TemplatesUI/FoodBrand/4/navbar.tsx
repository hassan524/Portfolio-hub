// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { useState } from 'react';
import { Radio } from 'lucide-react';

export function FoodBrand4Navbar({ props = {}, theme, onChange }: any) {
    return (
        <header className="w-full fixed top-5 left-0 z-50 px-6 sm:px-12 pointer-events-none select-none">
            <div className="mx-auto max-w-6xl flex items-center justify-between">
                {/* Brand Monospace Badge */}
                <a
                    href="#hero"
                    className="pointer-events-auto flex items-center gap-3 bg-[#020b1a]/85 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-[#00d4ff]/30 shadow-[0_0_25px_rgba(0,212,255,0.15)] group"
                >
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00d4ff] shadow-[0_0_10px_#00d4ff] animate-pulse" />
                    <span
                        className="text-base font-black tracking-widest uppercase text-white font-mono"
                    >
                        <Editable value={props?.brand || 'NEBULA // 01'} onChange={v => onChange?.({ brand: v })} />
                    </span>
                </a>

                {/* Floating Sci-Fi HUD Navigation Capsule */}
                <nav className="pointer-events-auto hidden md:flex items-center gap-6 bg-[#020b1a]/85 backdrop-blur-xl px-7 py-2.5 rounded-2xl border border-white/10 shadow-2xl text-[11px] font-mono tracking-widest uppercase text-white/70">
                    {[
                        { num: '[01]', label: '3D SCENE', href: '#hero' },
                        { num: '[02]', label: 'BIO-LAB', href: '#science' },
                        { num: '[03]', label: 'FLAVORS', href: '#flavors' },
                        { num: '[04]', label: 'RADAR', href: '#stockists' },
                    ].map(item => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="hover:text-[#00d4ff] transition-colors flex items-center gap-1.5"
                        >
                            <span className="text-[#00d4ff]/60 text-[9px]">{item.num}</span>
                            <span>{item.label}</span>
                        </a>
                    ))}
                </nav>

                {/* System Status Pill */}
                <div className="pointer-events-auto hidden sm:flex items-center gap-2 bg-[#020b1a]/85 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-[#7b2fff]/40 text-[10px] font-mono tracking-widest text-[#00d4ff]">
                    <Radio size={12} className="animate-spin" />
                    <span>SYS: 100% BIO-ACTIVE</span>
                </div>
            </div>
        </header>
    );
}

export const Navbar = FoodBrand4Navbar;
export default FoodBrand4Navbar;
