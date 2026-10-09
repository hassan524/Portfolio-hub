// @ts-nocheck
import { useState } from 'react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

const cardDeck = [
    {
        id: 'c1',
        title: 'Maya Lin · Immersive Spatial Audio',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
        accentBg: '#38BDF8'
    },
    {
        id: 'c2',
        title: 'DJ KRONOS · Generative Visual Swarm',
        image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?auto=format&fit=crop&w=800&q=80',
        accentBg: '#7B61FF'
    },
    {
        id: 'c3',
        title: 'Elena Vance · Interactive Creative Code',
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
        accentBg: '#A7F3D0'
    }
];

export function EventConference2Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#EF3829';
    const ink = theme?.ink || '#FFFFFF';
    const accent = theme?.accent || '#FFD600';
    const [cardIndex, setCardIndex] = useState(0);

    const nextCard = () => {
        setCardIndex(prev => (prev + 1) % cardDeck.length);
    };

    return (
        <section
            id="top"
            className="w-full relative overflow-hidden min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-8 py-16 sm:py-24 border-none select-none transition-colors"
            style={{
                backgroundColor: bg,
                color: ink
            }}
        >
            <div className="relative z-10 mx-auto max-w-7xl w-full flex flex-col items-center justify-center text-center">
                
                {/* Line 1: { REDEFINING } */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="flex items-center justify-center gap-2 sm:gap-4 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none"
                >
                    <span className="opacity-80 font-mono font-light text-4xl sm:text-6xl md:text-8xl">{'{'}</span>
                    <span className="tracking-tight">
                        <Editable value={props?.word1 || 'REDEFINING'} onChange={v => onChange?.({ word1: v })} />
                    </span>
                    <span className="opacity-80 font-mono font-light text-4xl sm:text-6xl md:text-8xl">{'}'}</span>
                </motion.div>

                {/* Line 2: YOUR [3D STACKED CARD DECK] GROWTH */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-8 mt-4 sm:mt-6 w-full">
                    
                    {/* Left Word: YOUR */}
                    <motion.span
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none"
                    >
                        <Editable value={props?.word2 || 'YOUR'} onChange={v => onChange?.({ word2: v })} />
                    </motion.span>

                    {/* Center 3D Interactive Stacked Card Deck */}
                    <div
                        onClick={nextCard}
                        className="relative w-48 h-64 sm:w-60 sm:h-80 my-4 lg:my-0 cursor-pointer group perspective-1000 shrink-0"
                    >
                        {/* Layered Card 3 (Back) */}
                        <div className="absolute inset-0 rounded-2xl bg-cyan-400 border-2 border-black -rotate-12 translate-x-3 translate-y-3 opacity-80 shadow-md group-hover:-rotate-16 transition-transform duration-300" />
                        
                        {/* Layered Card 2 (Middle) */}
                        <div className="absolute inset-0 rounded-2xl bg-purple-600 border-2 border-black rotate-6 -translate-x-2 -translate-y-2 opacity-90 shadow-lg group-hover:rotate-10 transition-transform duration-300" />

                        {/* Top Featured Card */}
                        <motion.div
                            key={cardDeck[cardIndex].id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full h-full rounded-2xl overflow-hidden border-3 border-black shadow-2xl bg-black"
                        >
                            <img
                                src={cardDeck[cardIndex].image}
                                alt="Conference Spotlight"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 text-left">
                                <p className="text-xs font-bold text-white leading-tight">
                                    {cardDeck[cardIndex].title}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Word: GROWTH */}
                    <motion.span
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none"
                    >
                        <Editable value={props?.word3 || 'GROWTH'} onChange={v => onChange?.({ word3: v })} />
                    </motion.span>
                </div>

                {/* Subtext */}
                <p className="mt-8 text-xs font-mono uppercase tracking-widest opacity-80">
                    Click central card deck to shuffle spotlight artists · Toronto Arena
                </p>

            </div>
        </section>
    );
}

export const HeroCentered = EventConference2Hero;
export default EventConference2Hero;
