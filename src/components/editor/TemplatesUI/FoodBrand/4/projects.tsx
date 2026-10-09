// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { Check, ArrowRight } from 'lucide-react';

const FLAVORS = [
    {
        id: 'blue',
        num: '01',
        name: 'Nebula Blue',
        subtitle: 'Cognition & Focus',
        color: '#00d4ff',
        botanicals: 'Blue Spirulina • Wild Elderberry • Lion’s Mane • L-Theanine',
        notes: 'Crisp mountain blueberry, tart elderflower, subtle oceanic coolness.',
        distort: 0.45,
    },
    {
        id: 'solar',
        num: '02',
        name: 'Solar Flare',
        subtitle: 'Cellular Vitality & Spark',
        color: '#ff9900',
        botanicals: 'Cold-Pressed Valencia Orange • Sea Buckthorn • Organic Rhodiola',
        notes: 'Sparkling citrus zest, fiery ginger root warmth, lingering sunny bloom.',
        distort: 0.35,
    },
    {
        id: 'dark',
        num: '03',
        name: 'Dark Matter',
        subtitle: 'Restoration & Deep Zen',
        color: '#7b2fff',
        botanicals: 'Dark Tart Cherry • Fermented Ashwagandha • Magnesium Malate',
        notes: 'Rich velvet blackberry, soothing lavender haze, serene evening warmth.',
        distort: 0.55,
    },
    {
        id: 'quantum',
        num: '04',
        name: 'Quantum Matcha',
        subtitle: 'Zen Kinetic Clean Energy',
        color: '#00ff9f',
        botanicals: 'Ceremonial Uji Matcha • Moringa Oleifera • Chlorella Extract',
        notes: 'Smooth earthy green tea umami, crisp cucumber snap, clean sustained lift.',
        distort: 0.4,
    },
];

function FlavorSphere3D({ color, distort }: any) {
    const ref = useRef(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.elapsedTime * 0.4;
            ref.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });
    return (
        <Float speed={2} rotationIntensity={0.5}>
            <mesh ref={ref}>
                <Sphere args={[1.3, 64, 64]}>
                    <MeshDistortMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={0.3}
                        distort={distort}
                        speed={2}
                        roughness={0.15}
                        metalness={0.7}
                    />
                </Sphere>
            </mesh>
        </Float>
    );
}

export function FoodBrand4Projects({ props = {}, theme, onChange }: any) {
    const [selectedIdx, setSelectedIdx] = useState(0);
    const flavor = FLAVORS[selectedIdx];
    const bg = theme?.bg || '#020b1a';
    const ink = theme?.ink || '#e8f4ff';

    return (
        <section
            id="flavors"
            className="w-full relative px-6 sm:px-12 py-28 select-none overflow-hidden border-t border-[#00d4ff]/15"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl relative z-10 space-y-16">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
                    <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.45em] text-[#00d4ff] block mb-2">
                            Interactive Console
                        </span>
                        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
                            <Editable
                                value={props?.consoleHeading || 'The Flavor Matrix'}
                                onChange={v => onChange?.({ consoleHeading: v })}
                            />
                        </h2>
                    </div>
                    <div className="text-right font-mono text-[11px] text-white/50">
                        Select a botanical profile to inspect 3D shader reaction
                    </div>
                </div>

                {/* 2-Column Console Layout: Left Selector, Right 3D Interactive Terminal */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left: Interactive Vertical Flavor Selector */}
                    <div className="lg:col-span-5 space-y-3">
                        {FLAVORS.map((f, idx) => {
                            const isSelected = selectedIdx === idx;
                            return (
                                <button
                                    key={f.id}
                                    onClick={() => setSelectedIdx(idx)}
                                    className={`w-full p-6 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between ${
                                        isSelected
                                            ? 'bg-white/10 scale-102 shadow-2xl'
                                            : 'bg-white/3 hover:bg-white/6'
                                    }`}
                                    style={{
                                        borderColor: isSelected ? f.color : 'rgba(255,255,255,0.08)',
                                    }}
                                >
                                    <div className="flex items-center gap-5">
                                        <span
                                            className="text-lg font-mono font-black"
                                            style={{ color: isSelected ? f.color : 'rgba(255,255,255,0.4)' }}
                                        >
                                            {f.num}
                                        </span>
                                        <div>
                                            <h3 className="text-xl font-black text-white">{f.name}</h3>
                                            <span className="text-xs text-white/50">{f.subtitle}</span>
                                        </div>
                                    </div>
                                    <div
                                        className="w-4 h-4 rounded-full border-2 transition-all"
                                        style={{
                                            borderColor: f.color,
                                            backgroundColor: isSelected ? f.color : 'transparent',
                                        }}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    {/* Right: 3D Flavor Particle Viewer & Sensory Telemetry */}
                    <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#020b1a]/80 p-8 sm:p-12 relative overflow-hidden backdrop-blur-xl space-y-8">
                        {/* 3D Canvas */}
                        <div className="w-full h-72 sm:h-80 relative flex items-center justify-center">
                            <Canvas camera={{ position: [0, 0, 3.2] }}>
                                <ambientLight intensity={0.7} />
                                <pointLight position={[5, 5, 5]} intensity={1.8} color={flavor.color} />
                                <Suspense fallback={null}>
                                    <FlavorSphere3D color={flavor.color} distort={flavor.distort} />
                                </Suspense>
                            </Canvas>
                            <span
                                className="absolute top-2 right-2 text-[9px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border"
                                style={{ borderColor: `${flavor.color}44`, color: flavor.color }}
                            >
                                Live 3D Mesh
                            </span>
                        </div>

                        {/* Sensory Notes */}
                        <div className="space-y-4 pt-4 border-t border-white/10">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                                    Botanical Formulations:
                                </span>
                                <div className="text-sm font-bold text-white mt-1">
                                    {flavor.botanicals}
                                </div>
                            </div>
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                                    Taste Profile:
                                </span>
                                <div className="text-xs text-white/70 leading-relaxed mt-1">
                                    {flavor.notes}
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <a
                                href="#stockists"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest text-[#020b1a] transition-transform hover:scale-105 shadow-xl"
                                style={{ backgroundColor: flavor.color }}
                            >
                                <span>Find {flavor.name} Near You</span>
                                <ArrowRight size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const ProjectsGrid = FoodBrand4Projects;
export default FoodBrand4Projects;
