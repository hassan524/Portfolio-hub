// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { Activity, Dna, Brain, Sparkles } from 'lucide-react';

function RotatingCell3D() {
    const ref = useRef(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.5;
            ref.current.rotation.z = state.clock.elapsedTime * 0.2;
        }
    });
    return (
        <Float speed={2} rotationIntensity={0.6}>
            <mesh ref={ref}>
                <Sphere args={[1.2, 48, 48]}>
                    <MeshDistortMaterial
                        color="#00d4ff"
                        emissive="#7b2fff"
                        emissiveIntensity={0.4}
                        distort={0.45}
                        speed={2.5}
                        roughness={0.1}
                        metalness={0.8}
                    />
                </Sphere>
            </mesh>
        </Float>
    );
}

export function FoodBrand4About({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#010611';
    const ink = theme?.['ink-second'] || '#e8f4ff';

    return (
        <section
            id="science"
            className="w-full relative px-6 sm:px-12 py-28 select-none overflow-hidden border-t border-[#00d4ff]/15"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl relative z-10 space-y-16">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-[0.45em] text-[#00d4ff]">
                        ◈ Cellular Formulation
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
                        <Editable
                            value={props?.scienceHeading || 'The Bio-Diagnostic Matrix'}
                            onChange={v => onChange?.({ scienceHeading: v })}
                        />
                    </h2>
                    <p className="text-sm text-white/60 leading-relaxed font-mono">
                        Standard nutrition uses static synthetic vitamins. Nebula utilizes live organic bioactive phytonutrients recognized instantly by human cells.
                    </p>
                </div>

                {/* Futuristic Bento Diagnostic Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left 2 Bento Panels */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-8 rounded-3xl border border-[#00d4ff]/20 bg-[#020b1a]/90 space-y-4">
                            <div className="flex items-center justify-between text-[#00d4ff]">
                                <Brain size={24} />
                                <span className="text-[10px] font-mono tracking-widest">SPEC // 01</span>
                            </div>
                            <h3 className="text-xl font-black text-white">Neuro-Cognitive Flow</h3>
                            <p className="text-xs text-white/60 leading-relaxed">
                                Dual-extracted Lion’s Mane mushroom and pure L-Theanine stimulate alpha brainwaves without adrenal depletion.
                            </p>
                            <div className="space-y-1 pt-2 font-mono text-[10px]">
                                <div className="flex justify-between text-[#00d4ff]">
                                    <span>SYNAPTIC SPEED</span>
                                    <span>+34%</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="w-[85%] h-full bg-[#00d4ff] rounded-full" />
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl border border-[#7b2fff]/20 bg-[#020b1a]/90 space-y-4">
                            <div className="flex items-center justify-between text-[#7b2fff]">
                                <Dna size={24} />
                                <span className="text-[10px] font-mono tracking-widest">SPEC // 02</span>
                            </div>
                            <h3 className="text-xl font-black text-white">72-Hour Micro-Fermentation</h3>
                            <p className="text-xs text-white/60 leading-relaxed">
                                Wild-harvested adaptogens fermented with prebiotic artichoke inulin for optimal gut microbiome transmission.
                            </p>
                            <div className="space-y-1 pt-2 font-mono text-[10px]">
                                <div className="flex justify-between text-[#7b2fff]">
                                    <span>BIO-AVAILABILITY</span>
                                    <span>99.2%</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="w-[99%] h-full bg-[#7b2fff] rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center 3D Interactive Cell Model */}
                    <div className="lg:col-span-4 h-96 sm:h-[420px] rounded-3xl border border-white/10 bg-[#020b1a]/50 relative overflow-hidden flex items-center justify-center">
                        <Canvas camera={{ position: [0, 0, 3] }}>
                            <ambientLight intensity={0.8} />
                            <pointLight position={[5, 5, 5]} intensity={1.5} color="#00d4ff" />
                            <pointLight position={[-5, -5, -5]} intensity={1.5} color="#7b2fff" />
                            <Suspense fallback={null}>
                                <RotatingCell3D />
                            </Suspense>
                        </Canvas>
                        <div className="absolute bottom-4 left-4 right-4 text-center font-mono text-[9px] uppercase tracking-widest text-[#00d4ff]/70 bg-[#020b1a]/80 py-1.5 rounded-full border border-[#00d4ff]/20">
                            Live Simulated Bio-Cell Mesh
                        </div>
                    </div>

                    {/* Right 2 Bento Panels */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-8 rounded-3xl border border-[#00ff9f]/20 bg-[#020b1a]/90 space-y-4">
                            <div className="flex items-center justify-between text-[#00ff9f]">
                                <Activity size={24} />
                                <span className="text-[10px] font-mono tracking-widest">SPEC // 03</span>
                            </div>
                            <h3 className="text-xl font-black text-white">Osmotic Cellular Water</h3>
                            <p className="text-xs text-white/60 leading-relaxed">
                                Deep sea oceanic minerals balanced with volcanic electrolytes for rapid intra-cellular hydration.
                            </p>
                            <div className="space-y-1 pt-2 font-mono text-[10px]">
                                <div className="flex justify-between text-[#00ff9f]">
                                    <span>HYDRATION RATE</span>
                                    <span>4.2X</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="w-[92%] h-full bg-[#00ff9f] rounded-full" />
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl border border-white/20 bg-[#020b1a]/90 space-y-4">
                            <div className="flex items-center justify-between text-white">
                                <Sparkles size={24} />
                                <span className="text-[10px] font-mono tracking-widest">SPEC // 04</span>
                            </div>
                            <h3 className="text-xl font-black text-white">Clean Plant Substrates</h3>
                            <p className="text-xs text-white/60 leading-relaxed">
                                Cold-pressed whole elderberries and spirulina. Zero artificial food dye, zero citric acid preservatives.
                            </p>
                            <div className="space-y-1 pt-2 font-mono text-[10px]">
                                <div className="flex justify-between text-white">
                                    <span>ORGANIC INTEGRITY</span>
                                    <span>100%</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="w-full h-full bg-white rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const AboutSimple = FoodBrand4About;
export default FoodBrand4About;
