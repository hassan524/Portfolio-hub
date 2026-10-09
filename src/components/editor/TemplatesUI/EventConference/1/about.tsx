// @ts-nocheck
import { useState } from 'react';
import { Editable } from '@/components/editor/ui/Editable';
import { ArrowUpRight, CheckCircle2, Globe2, Layers, Zap } from 'lucide-react';

export function EventConference1About({ props = {}, theme, onChange }: any) {
    const [activeTab, setActiveTab] = useState<'distribution' | 'transactions'>('distribution');

    const topics = {
        distribution: [
            {
                number: '01',
                title: 'The Future of Distribution Ecosystems',
                desc: 'How decentralized logistics and automated inventory nodes eliminate cross-border bottlenecks for scaling consumer brands.',
                highlight: 'Global Node Scaling'
            },
            {
                number: '02',
                title: 'Predictive Demand & Edge Fulfillment',
                desc: 'Harnessing real-time transactional telemetry to route stock ahead of demand spikes with sub-24h regional delivery.',
                highlight: 'Algorithmic Routing'
            },
            {
                number: '03',
                title: 'Zero-Carbon Supply Chains',
                desc: 'Transparent emissions accounting and multi-carrier optimization benchmarks presented by top operations leaders.',
                highlight: 'Sustainable Operations'
            }
        ],
        transactions: [
            {
                number: '01',
                title: 'Next-Gen Instant Settlement Protocols',
                desc: 'Modern cross-border clearing rails cutting merchant interchange fees by 70% while settling liquidity within seconds.',
                highlight: 'Real-Time Rails'
            },
            {
                number: '02',
                title: 'Autonomous Fraud Mitigation at Scale',
                desc: 'Machine learning heuristics preventing card-not-present fraud patterns without damaging genuine conversion rates.',
                highlight: 'Zero-Friction Risk'
            },
            {
                number: '03',
                title: 'Unified Global Checkout UX',
                desc: 'Case studies from high-volume platforms achieving 94% checkout completion across 42 currencies and local wallets.',
                highlight: 'Conversion Design'
            }
        ]
    };

    return (
        <section id="about" className="py-20 md:py-28 px-6 md:px-12 bg-white text-neutral-900 font-sans">
            <div className="mx-auto max-w-6xl space-y-24">
                
                {/* 1. "Why Pulse" Header & Core Statement (Exact Screenshot Copy) */}
                <div className="text-center max-w-3xl mx-auto space-y-5">
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 font-sans">
                        <Editable value={props?.whyTitle || 'Why Pulse'} onChange={v => onChange?.({ whyTitle: v })} />
                    </h2>
                    <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-sans font-normal">
                        <Editable
                            value={props?.whyDesc || "Pulse is where energy meets opportunity. It's built for people who want real connections, fresh ideas, and moments that drive action. If you're ready to move forward, Pulse is where you need to be."}
                            onChange={v => onChange?.({ whyDesc: v })}
                        />
                    </p>
                </div>

                {/* 2. Black 4-Column Pill Container (From Screenshot) */}
                <div className="bg-neutral-950 text-white rounded-3xl sm:rounded-full px-8 py-7 max-w-4xl mx-auto shadow-xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-neutral-800">
                        {/* Col 1: Date */}
                        <div className="pt-4 md:pt-0 md:px-6 first:px-0">
                            <span className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-1.5">Date</span>
                            <span className="block text-sm sm:text-base font-semibold text-white">
                                <Editable value={props?.eventDate || 'June 20, 2026'} onChange={v => onChange?.({ eventDate: v })} />
                            </span>
                        </div>

                        {/* Col 2: Time */}
                        <div className="pt-4 md:pt-0 md:px-6">
                            <span className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-1.5">Time</span>
                            <span className="block text-sm sm:text-base font-semibold text-white">
                                <Editable value={props?.eventTime || '9:00 AM — 5:00 PM'} onChange={v => onChange?.({ eventTime: v })} />
                            </span>
                        </div>

                        {/* Col 3: Venue */}
                        <div className="pt-4 md:pt-0 md:px-6">
                            <span className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-1.5">Venue</span>
                            <span className="block text-sm sm:text-base font-semibold text-white leading-tight">
                                <Editable value={props?.eventVenue || 'Skyline Convention Center, Dhaka'} onChange={v => onChange?.({ eventVenue: v })} />
                            </span>
                        </div>

                        {/* Col 4: Access */}
                        <div className="pt-4 md:pt-0 md:px-6">
                            <span className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-1.5">Access</span>
                            <span className="block text-sm sm:text-base font-semibold text-white">
                                <Editable value={props?.eventAccess || 'In-Person & Virtual'} onChange={v => onChange?.({ eventAccess: v })} />
                            </span>
                        </div>
                    </div>
                </div>

                {/* 3. "Unlock Growth Through Innovation" (From Screenshot) */}
                <div className="space-y-10 pt-8 border-t border-neutral-100">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-xl space-y-2">
                            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 font-sans">
                                <Editable value={props?.unlockTitle || 'Unlock Growth Through Innovation'} onChange={v => onChange?.({ unlockTitle: v })} />
                            </h3>
                            <p className="text-sm sm:text-base text-neutral-500 font-sans">
                                <Editable
                                    value={props?.unlockDesc || 'Explore scalable distribution strategies, future-ready payment solutions, and seamless user experiences driving global success.'}
                                    onChange={v => onChange?.({ unlockDesc: v })}
                                />
                            </p>
                        </div>

                        {/* Filter Pills */}
                        <div className="flex items-center gap-2 p-1 bg-neutral-100 rounded-full w-fit self-start md:self-auto">
                            <button
                                type="button"
                                onClick={() => setActiveTab('distribution')}
                                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                                    activeTab === 'distribution'
                                        ? 'bg-[#0284C7] text-white shadow-sm'
                                        : 'text-neutral-600 hover:text-neutral-900'
                                }`}
                            >
                                Distribution
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('transactions')}
                                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                                    activeTab === 'transactions'
                                        ? 'bg-[#0284C7] text-white shadow-sm'
                                        : 'text-neutral-600 hover:text-neutral-900'
                                }`}
                            >
                                Transactions
                            </button>
                        </div>
                    </div>

                    {/* 3 Normal, Human-Designed Cards (Not overly bright or badge-heavy) */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {topics[activeTab].map((topic, index) => (
                            <div
                                key={index}
                                className="group bg-neutral-50 hover:bg-white rounded-3xl p-7 border border-neutral-200/80 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="w-8 h-8 rounded-xl bg-sky-100 text-[#0284C7] font-bold text-xs flex items-center justify-center font-mono">
                                            {topic.number}
                                        </span>
                                        <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                                            {topic.highlight}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold text-neutral-900 group-hover:text-[#0284C7] transition-colors leading-snug">
                                        {topic.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                                        {topic.desc}
                                    </p>
                                </div>

                                <div className="pt-6 mt-6 border-t border-neutral-200/60 flex items-center justify-between text-xs font-medium text-neutral-500">
                                    <span>Pulse Key Track</span>
                                    <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-[#0284C7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

export const AboutSimple = EventConference1About;
export default EventConference1About;
