// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere, Float, Stars } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Compass, Zap, Shield, ArrowDown } from 'lucide-react';

/* ─── 3D Scene Components ─── */
function BioEnergySphere({ position, color, speed = 1, distort = 0.4 }: any) {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
        }
    });
    return (
        <Float speed={speed * 1.5} rotationIntensity={0.5} floatIntensity={1.5}>
            <mesh ref={meshRef} position={position}>
                <Sphere args={[1, 64, 64]}>
                    <MeshDistortMaterial
                        color={color}
                        distort={distort}
                        speed={2}
                        roughness={0.1}
                        metalness={0.6}
                    />
                </Sphere>
            </mesh>
        </Float>
    );
}

function FloatingCan3D({ position }: any) {
    const meshRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.9) * 0.15;
        }
    });
    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={2}>
            <group ref={meshRef} position={position}>
                {/* Can body */}
                <mesh>
                    <cylinderGeometry args={[0.5, 0.5, 1.8, 32]} />
                    <meshStandardMaterial
                        color="#051530"
                        metalness={0.9}
                        roughness={0.15}
                    />
                </mesh>
                {/* Glowing cyber stripe */}
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.51, 0.51, 0.9, 32]} />
                    <meshStandardMaterial
                        color="#00d4ff"
                        emissive="#00d4ff"
                        emissiveIntensity={0.35}
                        metalness={0.6}
                        roughness={0.2}
                    />
                </mesh>
                {/* Can rim top */}
                <mesh position={[0, 0.92, 0]}>
                    <cylinderGeometry args={[0.48, 0.48, 0.08, 32]} />
                    <meshStandardMaterial color="#c0d8f0" metalness={0.95} roughness={0.05} />
                </mesh>
                {/* Can rim bottom */}
                <mesh position={[0, -0.92, 0]}>
                    <cylinderGeometry args={[0.48, 0.48, 0.08, 32]} />
                    <meshStandardMaterial color="#c0d8f0" metalness={0.95} roughness={0.05} />
                </mesh>
            </group>
        </Float>
    );
}

export function FoodBrand4Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#020b1a';
    const ink = theme?.ink || '#e8f4ff';

    return (
        <section
            id="hero"
            className="w-full relative h-screen min-h-[700px] flex flex-col justify-between select-none overflow-hidden"
            style={{ backgroundColor: bg, color: ink }}
        >
            {/* Full-Screen 3D Interactive Canvas */}
            <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing">
                <Canvas
                    camera={{ position: [0, 0, 4.8], fov: 45 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <ambientLight intensity={0.6} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d4ff" />
                    <pointLight position={[-10, -10, -10]} intensity={1.2} color="#7b2fff" />
                    <directionalLight position={[0, 5, 5]} intensity={1} color="#ffffff" />
                    <Stars radius={50} depth={40} count={1200} factor={3} saturation={0.5} fade speed={1.5} />

                    <Suspense fallback={null}>
                        <FloatingCan3D position={[0, 0.1, 0]} />
                        <BioEnergySphere position={[-2.4, 1.2, -1.2]} color="#00d4ff" speed={1.1} distort={0.5} />
                        <BioEnergySphere position={[2.5, -1, -1.5]} color="#7b2fff" speed={0.9} distort={0.4} />
                        <BioEnergySphere position={[-2, -1.4, -2]} color="#00ff9f" speed={1.3} distort={0.6} />
                    </Suspense>

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        maxPolarAngle={Math.PI / 1.8}
                        minPolarAngle={Math.PI / 2.5}
                    />
                </Canvas>
            </div>

            {/* Cyber HUD Corner Telemetry Overlays */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-12 pointer-events-none">
                {/* Top Telemetry Row */}
                <div className="pt-20 flex justify-between items-start">
                    {/* Top-Left: Bio-metric Metrics */}
                    <div className="bg-[#020b1a]/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-1 font-mono text-[10px]">
                        <div className="text-[#00d4ff] font-bold">BIO-SPECS // REVOLUTION</div>
                        <div className="text-white/60">40B LIVE CFU PROBIOTICS</div>
                        <div className="text-white/60">0.0G REFINED SUGARS</div>
                        <div className="text-white/60">100% BOTANICAL EXTRACTION</div>
                    </div>

                    {/* Top-Right: 3D Drag Prompt */}
                    <div className="bg-[#020b1a]/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#00d4ff]/30 flex items-center gap-2 text-[10px] font-mono text-[#00d4ff]">
                        <Compass size={14} className="animate-spin" />
                        <span>360° 3D PRODUCT VIEW</span>
                    </div>
                </div>

                {/* Bottom Center: Giant Futuristic Headline + Discovery */}
                <div className="text-center space-y-6 pointer-events-auto max-w-4xl mx-auto pb-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-xs font-mono uppercase tracking-[0.4em] text-[#00d4ff] block mb-2">
                            The Quantum Nutrition Matrix
                        </span>
                        <h1
                            className="text-5xl sm:text-7xl lg:text-8.5xl font-black uppercase tracking-tight leading-[0.95] text-white"
                        >
                            <Editable
                                value={props?.title || 'BIO-ENGINEERED\nVITALITY'}
                                onChange={v => onChange?.({ title: v })}
                            />
                        </h1>
                    </motion.div>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                        <a
                            href="#flavors"
                            className="px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest text-[#020b1a] shadow-[0_0_35px_rgba(0,212,255,0.4)] transition-all hover:scale-105"
                            style={{ background: 'linear-gradient(135deg, #00d4ff, #7b2fff)' }}
                        >
                            Inspect Flavors
                        </a>
                        <a
                            href="#science"
                            className="px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20 hover:border-white transition-all bg-[#020b1a]/60 backdrop-blur-md"
                        >
                            Bio-Lab Analysis
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const HeroCentered = FoodBrand4Hero;
export default FoodBrand4Hero;
