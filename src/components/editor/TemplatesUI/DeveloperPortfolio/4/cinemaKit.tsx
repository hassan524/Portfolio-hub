// @ts-nocheck
// Shared cinema-themed building blocks, Web Audio API sound engine, and 3D Three.js camera for DeveloperPortfolio/4
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { Volume2, VolumeX, Radio, Sparkles } from "lucide-react";

export const DISPLAY = "'Bebas Neue','Oswald','Impact',sans-serif";
export const SERIF = "'Cormorant Garamond','Playfair Display',Georgia,serif";
export const MONO = "'JetBrains Mono','Space Mono','Courier New',monospace";

export const FRAME_IMAGES = [
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=70",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=70",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=70",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=70",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=70",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=70",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=70",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=70",
];

export const MOVIE_QUOTES = [
    { quote: "Here's looking at you, kid.", film: "Casablanca", year: "1942" },
    { quote: "I'm gonna make him an offer he can't refuse.", film: "The Godfather", year: "1972" },
    { quote: "May the Force be with you.", film: "Star Wars", year: "1977" },
    { quote: "Why so serious?", film: "The Dark Knight", year: "2008" },
    { quote: "I'll be back.", film: "The Terminator", year: "1984" },
    { quote: "Life is like a box of chocolates.", film: "Forrest Gump", year: "1994" },
];

/** fonts + keyframes used across the cinema template */
export function CinemaFonts() {
    return (
        <style>{`
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=JetBrains+Mono:wght@400;500;700&display=swap');
@keyframes cine-grain { 0%{transform:translate(0,0)} 20%{transform:translate(-3%,2%)} 40%{transform:translate(2%,-3%)} 60%{transform:translate(-2%,-1%)} 80%{transform:translate(3%,3%)} 100%{transform:translate(0,0)} }
@keyframes cine-flicker { 0%,100%{opacity:1} 41%{opacity:.96} 43%{opacity:.8} 46%{opacity:1} 70%{opacity:.92} 72%{opacity:1} }
@keyframes cine-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes cine-marquee-rev { from{transform:translateX(-50%)} to{transform:translateX(0)} }
@keyframes cine-spin { to{transform:rotate(360deg)} }
@keyframes cine-dust { 0%{transform:translateY(0) translateX(0);opacity:0} 15%{opacity:.8} 100%{transform:translateY(-120px) translateX(30px);opacity:0} }
@keyframes cine-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
@keyframes cine-pulse-glow { 0%,100%{box-shadow:0 0 10px rgba(232,65,47,0.4)} 50%{box-shadow:0 0 25px rgba(232,65,47,0.85)} }
@keyframes cine-eq-1 { 0%,100%{height:4px} 50%{height:16px} }
@keyframes cine-eq-2 { 0%,100%{height:14px} 50%{height:6px} }
@keyframes cine-eq-3 { 0%,100%{height:8px} 50%{height:18px} }
`}</style>
    );
}

// ─── WEB AUDIO API CINEMATIC SOUND ENGINE ─────────────────────────────────────
// Pure native synthesis: zero audio asset files needed, zero 404s, works reliably anywhere.

class CinemaAudioEngine {
    private ctx: AudioContext | null = null;
    public muted: boolean = false;
    private masterGain: GainNode | null = null;
    private initialized: boolean = false;

    private getContext(): AudioContext | null {
        if (typeof window === "undefined") return null;
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.9, this.ctx.currentTime);
                this.masterGain.connect(this.ctx.destination);
            }
        }
        if (this.ctx && this.ctx.state === "suspended") {
            this.ctx.resume().catch(() => {});
        }
        return this.ctx;
    }

    public toggleMute(): boolean {
        this.muted = !this.muted;
        if (this.masterGain && this.ctx) {
            this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.9, this.ctx.currentTime);
        }
        return this.muted;
    }

    public setMute(muted: boolean) {
        this.muted = muted;
        if (this.masterGain && this.ctx) {
            this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.9, this.ctx.currentTime);
        }
    }

    /** 35mm film projector sprocket click / ratchet sound (short organic mechanical burst) */
    public playSprocketClick(volume = 0.08) {
        if (this.muted) return;
        const ctx = this.getContext();
        if (!ctx || !this.masterGain) return;

        const now = ctx.currentTime;
        // White noise burst passed through sharp bandpass
        const bufferSize = Math.floor(ctx.sampleRate * 0.015); // 15ms buffer
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(2400 + Math.random() * 600, now);
        filter.Q.setValueAtTime(5, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(volume * (0.8 + Math.random() * 0.4), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        source.start(now);
        source.stop(now + 0.018);
    }

    /** Analog cinema camera shutter slap (dual mechanical click: mirror up + shutter blade) */
    public playShutterClick(volume = 0.22) {
        if (this.muted) return;
        const ctx = this.getContext();
        if (!ctx || !this.masterGain) return;

        const now = ctx.currentTime;

        // 1. First blade mechanical snap
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.06);

        oscGain.gain.setValueAtTime(volume, now);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(oscGain);
        oscGain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.065);

        // 2. High metallic click transient at t + 35ms
        const clickTime = now + 0.035;
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = "triangle";
        clickOsc.frequency.setValueAtTime(2200, clickTime);
        clickOsc.frequency.exponentialRampToValueAtTime(300, clickTime + 0.04);

        clickGain.gain.setValueAtTime(volume * 0.7, clickTime);
        clickGain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.04);

        clickOsc.connect(clickGain);
        clickGain.connect(this.masterGain);
        clickOsc.start(clickTime);
        clickOsc.stop(clickTime + 0.045);
    }

    /** Deep cinematic sub bass swell / film impact (Hans Zimmer style low-end rumble) */
    public playCinematicBoom(volume = 0.3) {
        if (this.muted) return;
        const ctx = this.getContext();
        if (!ctx || !this.masterGain) return;

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(85, now);
        osc.frequency.exponentialRampToValueAtTime(32, now + 0.9);

        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 1.2);
    }

    /** Wooden Clapperboard snap */
    public playClapperSnap(volume = 0.28) {
        if (this.muted) return;
        const ctx = this.getContext();
        if (!ctx || !this.masterGain) return;

        const now = ctx.currentTime;
        // Wood resonant thwack
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(680, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.07);

        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.09);

        // Crisp impact slap
        this.playSprocketClick(volume * 0.6);
    }

    /** Electronic camera focus servo motor micro-whir */
    public playLensFocus(volume = 0.12) {
        if (this.muted) return;
        const ctx = this.getContext();
        if (!ctx || !this.masterGain) return;

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.linearRampToValueAtTime(640, now + 0.07);

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1100, now);

        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.085);
    }
}

export const cinemaAudio = new CinemaAudioEngine();

/** React hook: triggers tactile film sprocket clicks as the user scrolls the page */
export function useCinemaScrollAudio() {
    const [muted, setMuted] = useState(false);
    const lastScrollY = useRef(0);
    const scrollAcc = useRef(0);
    const lastClickTime = useRef(0);

    const toggleMute = useCallback(() => {
        const next = cinemaAudio.toggleMute();
        setMuted(next);
        if (!next) {
            cinemaAudio.playShutterClick(0.2);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY || window.pageYOffset || 0;
            const delta = Math.abs(currentY - lastScrollY.current);
            lastScrollY.current = currentY;

            scrollAcc.current += delta;
            const now = performance.now();

            // Every ~45px of scroll delta triggers a projector sprocket click
            if (scrollAcc.current >= 45 && now - lastClickTime.current > 65) {
                cinemaAudio.playSprocketClick(0.07);
                scrollAcc.current = 0;
                lastClickTime.current = now;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return {
        muted,
        toggleMute,
        playSprocketClick: cinemaAudio.playSprocketClick.bind(cinemaAudio),
        playShutterClick: cinemaAudio.playShutterClick.bind(cinemaAudio),
        playCinematicBoom: cinemaAudio.playCinematicBoom.bind(cinemaAudio),
        playClapperSnap: cinemaAudio.playClapperSnap.bind(cinemaAudio),
        playLensFocus: cinemaAudio.playLensFocus.bind(cinemaAudio),
    };
}

/** Floating cinema sound control HUD widget */
export function CinemaSoundHUD({ accent = "#E8412F", ink = "#F4EDE0" }: any) {
    const { muted, toggleMute } = useCinemaScrollAudio();

    return (
        <button
            onClick={toggleMute}
            title={muted ? "Enable Cinematic Sound FX on Scroll" : "Mute Sound"}
            className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border px-4 py-2 text-xs font-mono tracking-widest backdrop-blur-md transition-all duration-300 hover:scale-105"
            style={{
                backgroundColor: "rgba(10,8,8,0.85)",
                borderColor: muted ? "rgba(244,237,224,0.18)" : accent,
                color: ink,
                boxShadow: muted ? "none" : `0 0 20px ${accent}40`,
            }}
        >
            <div className="flex items-center gap-1.5">
                {muted ? (
                    <VolumeX className="h-4 w-4 opacity-50" />
                ) : (
                    <>
                        <Volume2 className="h-4 w-4" style={{ color: accent }} />
                        <span className="flex items-end gap-[2px] h-3">
                            <span className="w-[2px] bg-red-500 rounded-full" style={{ animation: "cine-eq-1 0.6s infinite ease-in-out" }} />
                            <span className="w-[2px] bg-red-500 rounded-full" style={{ animation: "cine-eq-2 0.8s infinite ease-in-out" }} />
                            <span className="w-[2px] bg-red-500 rounded-full" style={{ animation: "cine-eq-3 0.7s infinite ease-in-out" }} />
                        </span>
                    </>
                )}
            </div>
            <div className="flex flex-col text-left text-[10px] leading-tight">
                <span className="font-bold uppercase" style={{ color: muted ? "rgba(244,237,224,0.5)" : accent }}>
                    {muted ? "AUDIO OFF" : "SOUND: LIVE"}
                </span>
                <span className="text-[9px] opacity-60">
                    {muted ? "CLICK TO UNMUTE" : "SCROLL FX ACTIVE"}
                </span>
            </div>
        </button>
    );
}

/** Realtime SMPTE timecode hook */
export function useTimecode() {
    const [frames, setFrames] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setFrames((f) => f + 1), 1000 / 24);
        return () => clearInterval(t);
    }, []);
    const ff = frames % 24;
    const s = Math.floor(frames / 24) % 60;
    const m = Math.floor(frames / 1440) % 60;
    const h = Math.floor(frames / 86400) % 24;
    const p = (x: number) => String(x).padStart(2, "0");
    return `${p(h)}:${p(m)}:${p(s)}:${p(ff)}`;
}

/** Professional Camera Viewfinder HUD overlay */
export function CinemaViewfinderHUD({ accent = "#E8412F", ink = "#F4EDE0" }: any) {
    const tc = useTimecode();
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-4 md:p-8 font-mono text-[10px] uppercase tracking-widest opacity-80">
            {/* Top HUD bar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent, animation: "cine-blink 1.2s steps(1) infinite" }} />
                    <span className="font-bold text-xs" style={{ color: accent }}>REC</span>
                    <span className="border px-1.5 py-0.5 rounded text-[9px] border-white/20">4K RAW</span>
                    <span className="text-white/60 hidden sm:inline">24.000 FPS</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-white/70">SHUTTER 180.0°</span>
                    <span className="text-white/70">ISO 800</span>
                    <span style={{ color: accent }}>{tc}</span>
                </div>
            </div>

            {/* Corner Viewfinder Brackets */}
            <div className="relative my-auto h-full w-full pointer-events-none">
                {/* Top-left corner */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: accent }} />
                {/* Top-right corner */}
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: accent }} />
                {/* Bottom-left corner */}
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: accent }} />
                {/* Bottom-right corner */}
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: accent }} />

                {/* Center crosshair */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                    <div className="relative h-6 w-6">
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/60" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/60" />
                        <div className="absolute inset-1 rounded-full border border-white/40" />
                    </div>
                </div>

                {/* 2.39:1 Anamorphic framing guide lines */}
                <div className="absolute inset-x-4 top-1/4 h-px border-b border-dashed border-white/10" />
                <div className="absolute inset-x-4 bottom-1/4 h-px border-b border-dashed border-white/10" />
            </div>

            {/* Bottom HUD bar */}
            <div className="flex items-center justify-between text-[9px] text-white/50">
                <div className="flex items-center gap-3">
                    <span>LENS: 50mm T/1.3 ANAMORPHIC</span>
                    <span className="hidden sm:inline">LUT: ARRI_K1S1</span>
                </div>
                <div className="flex items-center gap-3">
                    <span>ROLL: A04</span>
                    <span className="text-white/80">BAT: 98% 14.8V</span>
                </div>
            </div>
        </div>
    );
}

// ─── 3D THREE.JS CINEMA CAMERA MODEL ──────────────────────────────────────────

function CinemaCameraRig({ accent = "#E8412F", ink = "#F4EDE0" }: any) {
    const groupRef = useRef<THREE.Group>(null);
    const reelsRef = useRef<THREE.Group>(null);
    const lensRingRef = useRef<THREE.Group>(null);
    const lightBeamRef = useRef<THREE.SpotLight>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();
        const pointer = state.pointer;

        // Smooth rotation following pointer with inertia
        const targetRotY = pointer.x * 0.45;
        const targetRotX = -pointer.y * 0.35 + 0.12;

        groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.06;
        groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.06;

        // Subtle floating breathing motion
        groupRef.current.position.y = Math.sin(t * 1.2) * 0.08;

        // Continuous spinning film reels
        if (reelsRef.current) {
            reelsRef.current.rotation.z = t * 1.5;
        }

        // Lens focus gear subtle oscillation
        if (lensRingRef.current) {
            lensRingRef.current.rotation.z = Math.sin(t * 0.8) * 0.5;
        }

        // Pulse projector beam intensity
        if (lightBeamRef.current) {
            lightBeamRef.current.intensity = 3.5 + Math.sin(t * 8) * 0.3;
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.1, 0]}>
            {/* 1. Main Cinema Camera Chassis (Graphite/Matte dark metal) */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.6, 1.4, 2.4]} />
                <meshStandardMaterial color="#141416" roughness={0.35} metalness={0.85} />
            </mesh>

            {/* Side Ribs & Grip accents */}
            <mesh position={[0.82, 0, 0]}>
                <boxGeometry args={[0.08, 1.1, 1.8]} />
                <meshStandardMaterial color="#222226" roughness={0.5} metalness={0.6} />
            </mesh>
            <mesh position={[-0.82, 0, 0]}>
                <boxGeometry args={[0.08, 1.1, 1.8]} />
                <meshStandardMaterial color="#222226" roughness={0.5} metalness={0.6} />
            </mesh>

            {/* Red Cine Accent stripe on body */}
            <mesh position={[0, -0.4, 1.21]}>
                <boxGeometry args={[1.5, 0.08, 0.02]} />
                <meshStandardMaterial color={accent} roughness={0.2} emissive={accent} emissiveIntensity={0.6} />
            </mesh>

            {/* 2. Top Handle & Rails */}
            <mesh position={[0, 0.95, -0.1]}>
                <boxGeometry args={[0.22, 0.14, 1.8]} />
                <meshStandardMaterial color="#2a2a2e" roughness={0.4} metalness={0.9} />
            </mesh>
            {/* Handle pillars */}
            <mesh position={[0, 0.8, -0.7]}>
                <cylinderGeometry args={[0.08, 0.08, 0.35, 16]} />
                <meshStandardMaterial color="#333" metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.8, 0.5]}>
                <cylinderGeometry args={[0.08, 0.08, 0.35, 16]} />
                <meshStandardMaterial color="#333" metalness={0.9} />
            </mesh>

            {/* 3. Dual 35mm Film Magazine / Reels on Top */}
            <group position={[0, 1.25, -0.4]} rotation={[0, Math.PI / 2, 0]}>
                {/* Left Reel */}
                <group position={[0, 0, -0.42]} ref={reelsRef}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.55, 0.55, 0.16, 24]} />
                        <meshStandardMaterial color="#1a1a1c" roughness={0.3} metalness={0.8} />
                    </mesh>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.48, 0.48, 0.18, 24]} />
                        <meshStandardMaterial color={accent} roughness={0.4} metalness={0.6} wireframe />
                    </mesh>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.15, 0.15, 0.22, 16]} />
                        <meshStandardMaterial color="#silver" metalness={0.95} roughness={0.1} />
                    </mesh>
                </group>
                {/* Right Reel */}
                <group position={[0, 0, 0.42]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.55, 0.55, 0.16, 24]} />
                        <meshStandardMaterial color="#1a1a1c" roughness={0.3} metalness={0.8} />
                    </mesh>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.48, 0.48, 0.18, 24]} />
                        <meshStandardMaterial color={accent} roughness={0.4} metalness={0.6} wireframe />
                    </mesh>
                </group>
            </group>

            {/* 4. Large Cinema Anamorphic Prime Lens (Front) */}
            <group position={[0, 0, 1.5]}>
                {/* Main lens barrel */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.58, 0.64, 0.9, 32]} />
                    <meshStandardMaterial color="#0c0c0e" roughness={0.25} metalness={0.9} />
                </mesh>

                {/* Ribbed Focus Gear Rings */}
                <group ref={lensRingRef} position={[0, 0, -0.1]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[0.62, 0.04, 16, 32]} />
                        <meshStandardMaterial color="#e5c07b" roughness={0.2} metalness={0.9} />
                    </mesh>
                </group>

                {/* Aperture Accent Ring */}
                <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.61, 0.03, 16, 32]} />
                    <meshStandardMaterial color={accent} roughness={0.3} metalness={0.7} />
                </mesh>

                {/* Front Optical Glass Element */}
                <mesh position={[0, 0, 0.46]} rotation={[Math.PI / 2, 0, 0]}>
                    <sphereGeometry args={[0.52, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
                    <meshPhysicalMaterial
                        color="#4aa3df"
                        roughness={0.02}
                        metalness={0.1}
                        transmission={0.95}
                        ior={1.65}
                        reflectivity={0.9}
                        clearcoat={1}
                        clearcoatRoughness={0.05}
                    />
                </mesh>

                {/* Matte Box Sunshade Hood with flags */}
                <group position={[0, 0, 0.7]}>
                    {/* Frame hood */}
                    <mesh>
                        <boxGeometry args={[1.5, 1.2, 0.3]} />
                        <meshStandardMaterial color="#0e0e10" roughness={0.7} metalness={0.3} />
                    </mesh>
                    {/* Hollow center for lens */}
                    <mesh position={[0, 0, 0.05]}>
                        <ringGeometry args={[0.55, 0.72, 32]} />
                        <meshBasicMaterial color="#050505" />
                    </mesh>
                    {/* Top flag / barn door */}
                    <mesh position={[0, 0.65, 0.15]} rotation={[-0.35, 0, 0]}>
                        <boxGeometry args={[1.5, 0.25, 0.04]} />
                        <meshStandardMaterial color="#161618" roughness={0.8} />
                    </mesh>
                    {/* Left flag */}
                    <mesh position={[-0.8, 0, 0.15]} rotation={[0, 0.35, 0]}>
                        <boxGeometry args={[0.22, 1.1, 0.04]} />
                        <meshStandardMaterial color="#161618" roughness={0.8} />
                    </mesh>
                    {/* Right flag */}
                    <mesh position={[0.8, 0, 0.15]} rotation={[0, -0.35, 0]}>
                        <boxGeometry args={[0.22, 1.1, 0.04]} />
                        <meshStandardMaterial color="#161618" roughness={0.8} />
                    </mesh>
                </group>
            </group>

            {/* 5. Side Director's EVF / Monitor Screen */}
            <group position={[-1.05, 0.25, -0.2]} rotation={[0, 0.3, 0]}>
                <mesh>
                    <boxGeometry args={[0.08, 0.7, 1.05]} />
                    <meshStandardMaterial color="#18181c" metalness={0.7} />
                </mesh>
                {/* Glowing Monitor display with simulated timecode & waveform */}
                <mesh position={[-0.05, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                    <planeGeometry args={[0.95, 0.6]} />
                    <meshBasicMaterial color="#182e28" />
                </mesh>
                <mesh position={[-0.052, 0.15, 0]} rotation={[0, -Math.PI / 2, 0]}>
                    <planeGeometry args={[0.8, 0.06]} />
                    <meshBasicMaterial color="#00ff66" />
                </mesh>
            </group>

            {/* 6. Glowing Red Tally LED on Top-Front */}
            <mesh position={[0.55, 0.58, 1.22]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshBasicMaterial color={accent} />
            </mesh>
            <pointLight position={[0.55, 0.58, 1.3]} color={accent} intensity={1.8} distance={2.5} />

            {/* 7. Projected Spotlight Beam (Volumetric Film Projector Effect) */}
            <spotLight
                ref={lightBeamRef}
                position={[0, 0, 2.2]}
                target-position={[0, 0, 15]}
                color="#f0ece1"
                intensity={3.8}
                angle={0.45}
                penumbra={0.8}
                distance={18}
            />
        </group>
    );
}

/** Drifting projector dust motes inside cinema beam */
function CinemaProjectorDust({ count = 120, accent = "#E8412F" }: any) {
    const pointsRef = useRef<THREE.Points>(null);
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 5;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
            arr[i * 3 + 2] = Math.random() * 8 + 1;
        }
        return arr;
    }, [count]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const arr = attr.array as Float32Array;
        for (let i = 0; i < count; i++) {
            arr[i * 3 + 1] += 0.003;
            arr[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.001;
            if (arr[i * 3 + 1] > 2.5) {
                arr[i * 3 + 1] = -2.5;
            }
        }
        attr.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="#fff8e7" transparent opacity={0.65} />
        </points>
    );
}

/** Full 3D Interactive Three.js Cinema Camera Canvas Component */
export function CinemaCamera3D({ className = "", accent = "#E8412F", ink = "#F4EDE0" }: any) {
    return (
        <div className={`relative h-full w-full ${className}`}>
            <Canvas
                camera={{ position: [0, 0.4, 4.6], fov: 38 }}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 1.8]}
            >
                <ambientLight intensity={0.55} />
                {/* Key light: warm amber cinematic side spotlight */}
                <directionalLight position={[4, 5, 3]} intensity={2.2} color="#ffe8cc" />
                {/* Rim light: cool anamorphic cyan/blue backlight */}
                <directionalLight position={[-4, -2, -3]} intensity={1.8} color="#7cc9ff" />
                {/* Under glow */}
                <pointLight position={[0, -2, 1]} intensity={0.8} color={accent} />

                <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.25}>
                    <CinemaCameraRig accent={accent} ink={ink} />
                    <CinemaProjectorDust count={140} accent={accent} />
                </Float>
            </Canvas>
        </div>
    );
}

// ─── VISUAL ELEMENTS (GRAIN, REEL, CLAPPER, FILM STRIP, SMOKE) ────────────────

/** animated film grain overlay (SVG turbulence) */
export function FilmGrain({ opacity = 0.16 }: any) {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" style={{ opacity, mixBlendMode: "overlay" }}>
            <svg className="absolute -inset-[10%] h-[120%] w-[120%]" style={{ animation: "cine-grain 0.8s steps(5) infinite" }}>
                <filter id="cine-noise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#cine-noise)" />
            </svg>
        </div>
    );
}

/** spinning film reel */
export function Reel({ size = 200, color = "#fff", speed = 14, className = "", style = {} }: any) {
    const holes = [0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i * 60 * Math.PI) / 180;
        return { x: 100 + 56 * Math.cos(a), y: 100 + 56 * Math.sin(a) };
    });
    return (
        <svg viewBox="0 0 200 200" width={size} height={size} className={className} style={{ animation: `cine-spin ${speed}s linear infinite`, ...style }} aria-hidden="true">
            <circle cx="100" cy="100" r="96" fill="none" stroke={color} strokeWidth="3" />
            <circle cx="100" cy="100" r="88" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
            {holes.map((h, i) => (
                <circle key={i} cx={h.x} cy={h.y} r="21" fill="none" stroke={color} strokeWidth="3" />
            ))}
            {[0, 1, 2].map((i) => (
                <line key={i} x1="100" y1="20" x2="100" y2="180" stroke={color} strokeWidth="1" opacity="0.5" transform={`rotate(${i * 60} 100 100)`} />
            ))}
            <circle cx="100" cy="100" r="26" fill="none" stroke={color} strokeWidth="3" />
            <circle cx="100" cy="100" r="9" fill={color} />
        </svg>
    );
}

/** clapperboard whose arm snaps shut/open with audio trigger support */
export function Clapper({ open = false, size = 120, color = "#fff", accent = "#e8412f", className = "", onSnap }: any) {
    const stripes = [0, 1, 2, 3, 4, 5];
    return (
        <svg
            viewBox="0 0 120 100"
            width={size}
            className={`cursor-pointer ${className}`}
            aria-hidden="true"
            onClick={() => {
                cinemaAudio.playClapperSnap();
                onSnap?.();
            }}
        >
            {/* body */}
            <rect x="8" y="42" width="104" height="52" fill="none" stroke={color} strokeWidth="3" />
            <line x1="8" y1="60" x2="112" y2="60" stroke={color} strokeWidth="1.5" opacity="0.6" />
            <line x1="40" y1="60" x2="40" y2="94" stroke={color} strokeWidth="1.5" opacity="0.6" />
            <line x1="76" y1="60" x2="76" y2="94" stroke={color} strokeWidth="1.5" opacity="0.6" />
            {/* lower stripe bar */}
            <g>
                <rect x="8" y="30" width="104" height="12" fill="none" stroke={color} strokeWidth="3" />
                {stripes.map((i) => (
                    <polygon key={i} points={`${14 + i * 17},42 ${22 + i * 17},42 ${30 + i * 17},30 ${22 + i * 17},30`} fill={i % 2 ? accent : color} />
                ))}
            </g>
            {/* arm */}
            <g style={{ transformOrigin: "8px 28px", transform: `rotate(${open ? -26 : 0}deg)`, transition: "transform 0.28s cubic-bezier(.6,-0.3,.4,1.4)" }}>
                <rect x="8" y="16" width="104" height="12" fill="none" stroke={color} strokeWidth="3" />
                {stripes.map((i) => (
                    <polygon key={i} points={`${14 + i * 17},28 ${22 + i * 17},28 ${30 + i * 17},16 ${22 + i * 17},16`} fill={i % 2 ? color : accent} />
                ))}
            </g>
            <circle cx="8" cy="28" r="3.5" fill={color} />
        </svg>
    );
}

/** scrolling strip of film frames with sprocket holes */
export function FilmStrip({ images = FRAME_IMAGES, color = "#fff", bg = "#000", height = 120, reverse = false, speed = 40 }: any) {
    const sprocket = `repeating-linear-gradient(90deg, ${bg} 0 10px, transparent 10px 22px)`;
    const frames = [...images, ...images];
    return (
        <div className="relative w-full overflow-hidden" style={{ backgroundColor: color, height: height + 30 }} aria-hidden="true">
            <div className="absolute inset-x-0 top-[6px] h-[10px] opacity-90" style={{ backgroundImage: sprocket, backgroundSize: "22px 100%" }} />
            <div className="absolute inset-x-0 bottom-[6px] h-[10px] opacity-90" style={{ backgroundImage: sprocket, backgroundSize: "22px 100%" }} />
            <div
                className="absolute left-0 flex gap-2"
                style={{ top: 18, animation: `${reverse ? "cine-marquee-rev" : "cine-marquee"} ${speed}s linear infinite`, width: "max-content" }}
            >
                {frames.map((src, i) => (
                    <div key={i} style={{ width: height * 1.5, height, backgroundColor: bg, flexShrink: 0 }}>
                        <img src={src} alt="" className="h-full w-full object-cover" style={{ filter: "grayscale(0.55) contrast(1.1)" }} loading="lazy" />
                    </div>
                ))}
            </div>
        </div>
    );
}

/** tiny hook: tracks hover for the clapper */
export function useHover() {
    const [h, setH] = useState(false);
    return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false), onFocus: () => setH(true), onBlur: () => setH(false) }];
}

/** Real-time WebGL smoke (domain-warped fbm in a fragment shader) */
export function SmokeCanvas({ clear = 0, tint = [0.78, 0.78, 0.82], className = "", style = {} }: any) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const clearRef = useRef(clear);
    clearRef.current = clear;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
        if (!gl) return;

        const vs = "attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }";
        const fs = `
precision highp float;
uniform vec2 r; uniform float t; uniform vec2 m; uniform float clear; uniform vec3 tint;
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x), mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x), f.y); }
float fbm(vec2 p){ float v=0.; float a=.5; for(int i=0;i<6;i++){ v+=a*noise(p); p=p*2.02+vec2(1.7,9.2); a*=.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / r;
  vec2 p = (gl_FragCoord.xy - .5*r) / r.y;
  vec2 mp = (m - .5*r) / r.y;
  float md = length(p - mp);
  p += (p - mp) * exp(-md*3.) * 0.18;
  vec2 q = vec2(fbm(p*1.8 + vec2(0., -t*.10)), fbm(p*1.8 + vec2(5.2, 1.3) + t*.07));
  vec2 w = vec2(fbm(p*1.8 + 3.2*q + vec2(1.7, 9.2) + .12*t), fbm(p*1.8 + 3.2*q + vec2(8.3, 2.8) - .10*t));
  float f = fbm(p*2.0 + 3.4*w - vec2(0., t*.06));
  float dens = smoothstep(.28, .92, f);
  float rise = mix(1.0, smoothstep(1.25, -.1, uv.y), .55);
  float amount = mix(1.0, .16, clear);
  float a = clamp(dens * rise * amount * 1.15, 0., 1.);
  vec3 col = mix(tint*.45, tint, f);
  gl_FragColor = vec4(col * a, a);
}`;
        const mk = (type: number, src: string) => {
            const s = gl.createShader(type)!;
            gl.shaderSource(s, src);
            gl.compileShader(s);
            return s;
        };
        const prog = gl.createProgram()!;
        gl.attachShader(prog, mk(gl.VERTEX_SHADER, vs));
        gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, fs));
        gl.linkProgram(prog);
        gl.useProgram(prog);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, "p");
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        const U = (n: string) => gl.getUniformLocation(prog, n);
        const uR = U("r"), uT = U("t"), uM = U("m"), uC = U("clear"), uTint = U("tint");
        gl.uniform3f(uTint, tint[0], tint[1], tint[2]);

        const SCALE = 0.55;
        let w = 0, h = 0, raf = 0;
        const mouse = { x: 0, y: 0, tx: 0, ty: 0, set: false };
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2) * SCALE;
            w = Math.max(2, Math.floor(canvas.clientWidth * dpr));
            h = Math.max(2, Math.floor(canvas.clientHeight * dpr));
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }
            gl.viewport(0, 0, w, h);
            if (!mouse.set) { mouse.x = mouse.tx = w * 0.5; mouse.y = mouse.ty = h * 0.5; }
        };
        const onMove = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            const sx = w / Math.max(1, rect.width), sy = h / Math.max(1, rect.height);
            mouse.tx = (e.clientX - rect.left) * sx;
            mouse.ty = (rect.height - (e.clientY - rect.top)) * sy;
            mouse.set = true;
        };
        const doc = canvas.ownerDocument;
        doc.addEventListener("pointermove", onMove);
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);
        resize();

        const start = performance.now();
        let smoothClear = clearRef.current;
        const frame = (now: number) => {
            mouse.x += (mouse.tx - mouse.x) * 0.06;
            mouse.y += (mouse.ty - mouse.y) * 0.06;
            smoothClear += (clearRef.current - smoothClear) * 0.03;
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.uniform2f(uR, w, h);
            gl.uniform1f(uT, (now - start) / 1000);
            gl.uniform2f(uM, mouse.x, mouse.y);
            gl.uniform1f(uC, smoothClear);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(raf);
            doc.removeEventListener("pointermove", onMove);
            ro.disconnect();
            gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} style={style} aria-hidden="true" />;
}
