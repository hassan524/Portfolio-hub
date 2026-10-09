// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Radar, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

const CITIES = [
    {
        city: 'Los Angeles',
        stores: [
            { name: 'Erewhon Market', area: 'Venice & Beverly Hills', status: 'Chilled Vault' },
            { name: 'Equinox Sports Club', area: 'West Hollywood', status: 'Grab & Go' },
        ],
    },
    {
        city: 'New York City',
        stores: [
            { name: 'Whole Foods Market', area: 'Tribeca & Union Square', status: 'Beverage Aisle' },
            { name: 'The Goods Mart', area: 'SoHo', status: 'Chilled Stock' },
        ],
    },
    {
        city: 'San Francisco',
        stores: [
            { name: 'Bi-Rite Market', area: 'Mission District', status: 'Fresh Counter' },
            { name: 'Rainbow Grocery', area: 'Folsom St', status: 'Full Line' },
        ],
    },
    {
        city: 'Austin',
        stores: [
            { name: 'Central Market', area: 'North Lamar', status: 'Cold Vault' },
            { name: 'Royal Blue Grocery', area: 'Downtown', status: 'Chilled Grab & Go' },
        ],
    },
];

export function FoodBrand4Contact({ props = {}, theme, onChange }: any) {
    const [activeCityIdx, setActiveCityIdx] = useState(0);
    const activeCity = CITIES[activeCityIdx];
    const bg = theme?.bg || '#020b1a';
    const ink = theme?.ink || '#e8f4ff';

    return (
        <section
            id="stockists"
            className="w-full relative px-6 sm:px-12 py-28 select-none overflow-hidden border-t border-[#00d4ff]/15"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl relative z-10 space-y-16">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4ff]/30 text-[10px] font-mono text-[#00d4ff] bg-[#00d4ff]/5">
                        <Radar size={14} className="animate-spin" />
                        <span>GEO-RADAR SCANNER</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
                        <Editable
                            value={props?.radarHeading || 'Physical Retail Radar'}
                            onChange={v => onChange?.({ radarHeading: v })}
                        />
                    </h2>
                    <p className="text-sm text-white/60 leading-relaxed font-mono">
                        Select a metropolitan zone to locate chilled cans in high-density natural markets and boutique athletic clubs.
                    </p>
                </div>

                {/* Radar Interactive Zone */}
                <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-[#010611] p-8 sm:p-12 relative overflow-hidden backdrop-blur-2xl space-y-10">
                    {/* City Selector Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {CITIES.map((c, idx) => (
                            <button
                                key={c.city}
                                onClick={() => setActiveCityIdx(idx)}
                                className={`px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                                    activeCityIdx === idx
                                        ? 'bg-[#00d4ff] text-[#020b1a] shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                                }`}
                            >
                                {c.city}
                            </button>
                        ))}
                    </div>

                    {/* Active City Locations */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activeCity.stores.map((s) => (
                            <div
                                key={s.name}
                                className="p-6 rounded-2xl border border-white/10 bg-[#020b1a] flex items-center justify-between"
                            >
                                <div>
                                    <div className="text-base font-black text-white">{s.name}</div>
                                    <div className="text-xs text-white/50 flex items-center gap-1.5 mt-1">
                                        <MapPin size={12} className="text-[#00d4ff]" />
                                        <span>{s.area}</span>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono tracking-widest text-[#00ff9f] px-2.5 py-1 rounded-full bg-[#00ff9f]/10">
                                    {s.status}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Dispatch Form Strip */}
                    <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-xs text-white/60 font-mono">
                            Request retail expansion to your postal code:
                        </div>
                        <div className="flex w-full sm:w-auto gap-2">
                            <input
                                type="text"
                                placeholder="Enter ZIP code"
                                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder:text-white/30 focus:outline-none focus:border-[#00d4ff]"
                            />
                            <button
                                className="px-5 py-2.5 rounded-xl bg-[#00d4ff] text-[#020b1a] text-xs font-mono font-black uppercase tracking-wider hover:bg-white transition-colors"
                            >
                                Dispatch
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const ContactForm = FoodBrand4Contact;
export default FoodBrand4Contact;
