// @ts-nocheck
import { useState, useEffect } from 'react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function EventConference1Hero({ props = {}, theme, onChange }: any) {
    const [timeLeft, setTimeLeft] = useState({
        days: 20,
        hours: 19,
        mins: 23,
        secs: 38
    });
    const [email, setEmail] = useState('');
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
                if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
                if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleJoin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setJoined(true);
            setTimeout(() => setJoined(false), 4000);
            setEmail('');
        }
    };

    return (
        <section
            id="top"
            className="w-full relative overflow-hidden md:min-h-[110vh] min-h-[95vh] flex flex-col justify-center items-center text-white px-6 md:px-12 py-16 sm:py-24"
            style={{
                backgroundColor: '#10376D',
                backgroundImage: 'radial-gradient(circle at 50% 30%, #154D88 0%, #10376D 70%, #0D2D59 100%)',
                border: 'none',
            }}
        >
            {/* Ambient specular light */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[130px] opacity-30"
                style={{ background: 'radial-gradient(circle, #38BDF8 0%, #0284C7 60%, transparent 80%)' }}
            />

            <div className="relative z-10 mx-auto max-w-4xl text-center flex flex-col items-center my-auto w-full">
                {/* Main Headline: "Feel the Pulse" */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 font-sans"
                >
                    <span className="text-white">Feel the </span>
                    <span className="relative inline-block text-white font-extrabold tracking-tight drop-shadow-[0_4px_24px_rgba(255,255,255,0.3)]">
                        <Editable value={props?.brandName || 'Pulse'} onChange={v => onChange?.({ brandName: v })} />
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed mb-10 font-normal font-sans"
                >
                    <Editable
                        value={props?.subtitle || "Join a global community of visionaries, creators, and changemakers. Dive into innovation, connect with leaders, and be inspired by what's next."}
                        onChange={v => onChange?.({ subtitle: v })}
                    />
                </motion.p>

                {/* Live Countdown: "20Days : 19H : 23M : 38S" */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.25 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-white mb-10 font-sans select-none"
                >
                    <span>{String(timeLeft.days).padStart(2, '0')}Days</span>
                    <span className="mx-2 text-white/70">:</span>
                    <span>{String(timeLeft.hours).padStart(2, '0')}H</span>
                    <span className="mx-2 text-white/70">:</span>
                    <span>{String(timeLeft.mins).padStart(2, '0')}M</span>
                    <span className="mx-2 text-white/70">:</span>
                    <span>{String(timeLeft.secs).padStart(2, '0')}S</span>
                </motion.div>

                {/* Email Signup Capsule */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.35 }}
                    className="w-full max-w-md"
                >
                    <form
                        onSubmit={handleJoin}
                        className="flex items-center bg-white/15 backdrop-blur-md border border-white/25 rounded-full p-1.5 pl-5 shadow-lg focus-within:border-white/50 transition-all"
                    >
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="bg-transparent text-white placeholder-white/60 text-xs sm:text-sm focus:outline-none flex-1 pr-3 font-sans"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-full bg-[#14B8A6] hover:bg-[#0D9488] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md shrink-0 flex items-center gap-1.5"
                        >
                            {joined ? (
                                <>
                                    <Check size={14} />
                                    <span>Joined!</span>
                                </>
                            ) : (
                                <span>Join Pulse</span>
                            )}
                        </button>
                    </form>
                    {joined && (
                        <p className="text-xs text-teal-300 mt-2 font-medium animate-fade-in">
                            You are on the guestlist for Pulse 2026. Check your inbox!
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

export const HeroCentered = EventConference1Hero;
export default EventConference1Hero;
