// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { Editable } from "@/components/editor/ui/Editable";

const DISPLAY = "'Bebas Neue','Oswald','Impact',sans-serif";
const SERIF = "'Cormorant Garamond','Playfair Display',Georgia,serif";

const MOVIE_QUOTES = [
  { quote: "Here's looking at you, kid.", film: "Casablanca", year: "1942" },
  { quote: "I'm gonna make him an offer he can't refuse.", film: "The Godfather", year: "1972" },
  { quote: "May the Force be with you.", film: "Star Wars", year: "1977" },
  { quote: "Why so serious?", film: "The Dark Knight", year: "2008" },
  { quote: "I'll be back.", film: "The Terminator", year: "1984" },
];

// ── 3D Camera ─────────────────────────────────────────────────────────────
function CameraRig({ accent }: any) {
  const g = useRef<THREE.Group>(null);
  const reelRef = useRef<THREE.Group>(null);
  const lensRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer;
    g.current.rotation.y += (x * 0.4 - g.current.rotation.y) * 0.05;
    g.current.rotation.x += (-y * 0.28 + 0.1 - g.current.rotation.x) * 0.05;
    g.current.position.y = Math.sin(t * 1.1) * 0.07;
    if (reelRef.current) reelRef.current.rotation.z = t * 1.4;
    if (lensRef.current) lensRef.current.rotation.z = Math.sin(t * 0.9) * 0.4;
  });

  const BODY = "#0e0e10";
  const METAL = "#1a1a1e";

  return (
    <group ref={g}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[1.7, 1.3, 2.2]} />
        <meshStandardMaterial color={BODY} roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Top handle */}
      <mesh position={[0, 0.88, -0.1]}>
        <boxGeometry args={[0.2, 0.12, 1.6]} />
        <meshStandardMaterial color={METAL} roughness={0.4} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.76, 0.5]}><cylinderGeometry args={[0.07,0.07,0.28,12]} /><meshStandardMaterial color="#2a2a2e" metalness={0.9} /></mesh>
      <mesh position={[0, 0.76, -0.65]}><cylinderGeometry args={[0.07,0.07,0.28,12]} /><meshStandardMaterial color="#2a2a2e" metalness={0.9} /></mesh>

      {/* Accent stripe */}
      <mesh position={[0, -0.38, 1.12]}>
        <boxGeometry args={[1.55, 0.07, 0.02]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} />
      </mesh>

      {/* Film Reels on top */}
      <group position={[0, 1.18, -0.35]} rotation={[0, Math.PI / 2, 0]}>
        <group ref={reelRef}>
          {/* Left reel */}
          <group position={[0,0,-0.38]}>
            <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.48,0.48,0.14,24]} /><meshStandardMaterial color="#1a1a1c" metalness={0.8} /></mesh>
            <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.42,0.42,0.16,24]} /><meshStandardMaterial color={accent} metalness={0.5} wireframe /></mesh>
            <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.13,0.13,0.2,12]} /><meshStandardMaterial color="#ccc" metalness={0.95} /></mesh>
          </group>
          {/* Right reel */}
          <group position={[0,0,0.38]}>
            <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.48,0.48,0.14,24]} /><meshStandardMaterial color="#1a1a1c" metalness={0.8} /></mesh>
            <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.42,0.42,0.16,24]} /><meshStandardMaterial color={accent} metalness={0.5} wireframe /></mesh>
          </group>
        </group>
      </group>

      {/* Lens */}
      <group position={[0, 0, 1.42]}>
        <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.54,0.6,0.82,32]} /><meshStandardMaterial color="#0b0b0d" roughness={0.2} metalness={0.95} /></mesh>
        <group ref={lensRef}>
          <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[0.58,0.038,16,32]} /><meshStandardMaterial color="#d4a854" roughness={0.15} metalness={0.95} /></mesh>
        </group>
        <mesh position={[0,0,0.18]} rotation={[Math.PI/2,0,0]}>
          <torusGeometry args={[0.57,0.025,16,32]} />
          <meshStandardMaterial color={accent} />
        </mesh>
        {/* Glass */}
        <mesh position={[0,0,0.43]} rotation={[Math.PI/2,0,0]}>
          <sphereGeometry args={[0.49,32,16,0,Math.PI*2,0,Math.PI*0.32]} />
          <meshPhysicalMaterial color="#3a8fd0" roughness={0.01} transmission={0.92} ior={1.62} reflectivity={0.95} clearcoat={1} />
        </mesh>
        {/* Matte box */}
        <group position={[0,0,0.65]}>
          <mesh><boxGeometry args={[1.42,1.1,0.28]} /><meshStandardMaterial color="#0d0d0f" roughness={0.75} /></mesh>
          <mesh position={[0,0.6,0.12]} rotation={[-0.3,0,0]}><boxGeometry args={[1.42,0.22,0.04]} /><meshStandardMaterial color="#151518" /></mesh>
          <mesh position={[-0.76,0,0.12]} rotation={[0,0.3,0]}><boxGeometry args={[0.2,1.0,0.04]} /><meshStandardMaterial color="#151518" /></mesh>
          <mesh position={[0.76,0,0.12]} rotation={[0,-0.3,0]}><boxGeometry args={[0.2,1.0,0.04]} /><meshStandardMaterial color="#151518" /></mesh>
        </group>
      </group>

      {/* Tally LED */}
      <mesh position={[0.52,0.55,1.13]}><sphereGeometry args={[0.055,16,16]} /><meshBasicMaterial color={accent} /></mesh>
      <pointLight position={[0.52,0.55,1.2]} color={accent} intensity={1.6} distance={2.2} />

      {/* Projector beam */}
      <spotLight position={[0,0,2.1]} color="#f8f2e5" intensity={3.5} angle={0.42} penumbra={0.85} distance={16} />
    </group>
  );
}

function DustMotes({ count = 90 }: any) {
  const ref = useRef<THREE.Points>(null);
  const pos = useRef(new Float32Array(count * 3));
  useEffect(() => {
    for (let i = 0; i < count; i++) {
      pos.current[i*3] = (Math.random()-0.5)*5;
      pos.current[i*3+1] = (Math.random()-0.5)*4;
      pos.current[i*3+2] = Math.random()*8+1;
    }
  }, []);
  useFrame((s) => {
    if (!ref.current) return;
    const a = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = a.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i*3+1] += 0.003;
      arr[i*3] += Math.sin(s.clock.elapsedTime+i)*0.0008;
      if (arr[i*3+1] > 2.5) arr[i*3+1] = -2.5;
    }
    a.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={pos.current} itemSize={3} /></bufferGeometry>
      <pointsMaterial size={0.05} color="#fff8e7" transparent opacity={0.5} />
    </points>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#07080A";
  const ink = theme?.ink || "#E8E4DC";
  const inkSecond = theme?.["ink-second"] || "#7A756C";
  const surface = theme?.surface || "rgba(255,255,255,0.07)";
  const accent = theme?.accent || "#E8412F";

  const [phase, setPhase] = useState(0);
  const [qi, setQi] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 1400);
    return () => clearTimeout(t);
  }, []);

  const quotes = props?.quotes?.length ? props.quotes : MOVIE_QUOTES;
  useEffect(() => {
    if (phase < 1) return;
    const t = setInterval(() => setQi(x => (x+1) % quotes.length), 6000);
    return () => clearInterval(t);
  }, [phase, quotes.length]);

  const q = quotes[qi % quotes.length];
  const setQ = (f: string, v: string) =>
    onChange?.({ quotes: quotes.map((x: any, k: number) => (k === qi % quotes.length ? { ...x, [f]: v } : x)) });

  return (
    <section id="home" className="relative flex min-h-[100vh] w-full flex-col overflow-hidden" style={{ backgroundColor: bg, color: ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,500;1,500&display=swap');
        @keyframes grain-shift { 0%{transform:translate(0,0)} 20%{transform:translate(-2%,1%)} 40%{transform:translate(1%,-2%)} 60%{transform:translate(-1%,-1%)} 80%{transform:translate(2%,2%)} 100%{transform:translate(0,0)} }
        @keyframes blink-rec { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes scroll-line { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
      `}</style>

      {/* Film grain — subtle, no brightness */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden" style={{ opacity: 0.14, mixBlendMode: "overlay" }}>
        <svg className="absolute -inset-[8%] h-[116%] w-[116%]" style={{ animation: "grain-shift 0.9s steps(5) infinite" }}>
          <filter id="h4-noise"><feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="2" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
          <rect width="100%" height="100%" filter="url(#h4-noise)" />
        </svg>
      </div>

      {/* Subtle dark radial vignette only */}
      <div className="pointer-events-none absolute inset-0 z-[5]" style={{ background: `radial-gradient(ellipse 80% 70% at 50% 40%, transparent 30%, ${bg}BB 80%, ${bg} 100%)` }} />

      {/* Top letterbox bar */}
      <div className="relative z-30 flex h-[42px] items-center justify-between border-b px-6 text-[10px] font-mono uppercase tracking-widest" style={{ backgroundColor: "#030304", borderColor: surface, color: inkSecond }}>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent, animation: "blink-rec 1.2s steps(1) infinite" }} />
          <span style={{ color: accent }} className="font-bold">REC</span>
          <span className="opacity-40 ml-2">2.39:1 SCOPE</span>
        </div>
        <span style={{ color: accent }}>STAGE 01</span>
      </div>

      {/* Main content grid */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 md:px-12">
        <AnimatePresence mode="wait">
          {phase === 0 ? (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="text-center">
              <p className="text-xs uppercase tracking-[0.6em]" style={{ color: inkSecond, fontFamily: DISPLAY }}>
                <Editable value={props?.presents || "PICTURES & CODE STUDIOS"} onChange={(v) => onChange?.({ presents: v })} />
              </p>
              <p className="mt-3 text-3xl italic md:text-5xl" style={{ fontFamily: SERIF }}>
                <Editable value={props?.presents2 || "presents a cinematic portfolio"} onChange={(v) => onChange?.({ presents2: v })} />
              </p>
            </motion.div>
          ) : (
            <motion.div key="stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }} className="grid w-full max-w-7xl items-center gap-8 lg:grid-cols-12">
              {/* Left: title + quote */}
              <div className="text-center lg:col-span-7 lg:text-left">
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                  <p className="font-mono text-xs uppercase tracking-[0.4em]" style={{ color: accent }}>
                    <Editable value={props?.directedBy || "DIRECTED & ENGINEERED BY"} onChange={(v) => onChange?.({ directedBy: v })} />
                  </p>
                  <h1 className="mt-2 text-6xl leading-none tracking-wider sm:text-7xl md:text-8xl lg:text-9xl" style={{ fontFamily: DISPLAY }}>
                    <Editable value={props?.name || "ZAYAN MALIK"} onChange={(v) => onChange?.({ name: v })} />
                  </h1>
                </motion.div>

                <motion.div
                  key={`q${qi}`}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}
                  className="mt-6 border-l-2 pl-5 text-left"
                  style={{ borderColor: accent }}
                >
                  <p className="text-xl italic leading-snug sm:text-2xl md:text-3xl" style={{ fontFamily: SERIF }}>
                    "<Editable value={q.quote} onChange={(v) => setQ("quote", v)} />"
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: inkSecond }}>
                    — <Editable value={q.film} onChange={(v) => setQ("film", v)} /> (<span style={{ color: accent }}><Editable value={q.year} onChange={(v) => setQ("year", v)} /></span>)
                  </p>
                </motion.div>

                <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-7 py-3 text-lg tracking-widest uppercase transition-all"
                    style={{ backgroundColor: accent, color: "#fff", fontFamily: DISPLAY }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    <Editable value={props?.btnProjects || "NOW SHOWING"} onChange={(v) => onChange?.({ btnProjects: v })} />
                  </a>
                  <a
                    href="#about"
                    className="inline-flex items-center border px-6 py-3 text-lg tracking-widest uppercase transition-colors"
                    style={{ borderColor: surface, color: inkSecond, fontFamily: DISPLAY }}
                    onMouseEnter={e => (e.currentTarget.style.color = ink)}
                    onMouseLeave={e => (e.currentTarget.style.color = inkSecond)}
                  >
                    <Editable value={props?.btnAbout || "DIRECTOR'S CUT"} onChange={(v) => onChange?.({ btnAbout: v })} />
                  </a>
                </div>
              </div>

              {/* Right: 3D Camera */}
              <div className="relative h-[300px] w-full sm:h-[380px] lg:col-span-5 lg:h-[480px]">
                <Canvas camera={{ position: [0, 0.3, 4.4], fov: 38 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.8]}>
                  <ambientLight intensity={0.45} />
                  <directionalLight position={[4, 5, 3]} intensity={2} color="#ffdcb0" />
                  <directionalLight position={[-4, -2, -3]} intensity={1.5} color="#7bc5ff" />
                  <pointLight position={[0, -2, 1]} intensity={0.7} color={accent} />
                  <Float speed={1.3} rotationIntensity={0.18} floatIntensity={0.22}>
                    <CameraRig accent={accent} />
                    <DustMotes count={90} />
                  </Float>
                </Canvas>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom letterbox bar */}
      <div className="relative z-30 flex h-[38px] items-center justify-between border-t px-6 font-mono text-[10px] uppercase tracking-widest" style={{ backgroundColor: "#030304", borderColor: surface, color: inkSecond }}>
        <p className="hidden sm:block">
          <Editable value={props?.tagline || "EVERY LINE OF CODE, CUT LIKE 35MM CINEMA"} onChange={(v) => onChange?.({ tagline: v })} />
        </p>
        <a href="#about" className="flex items-center gap-2 mx-auto sm:mx-0" style={{ color: accent }}>
          <span className="inline-block h-1.5 w-1.5 rounded-full animate-bounce" style={{ backgroundColor: accent }} />
          <Editable value={props?.scrollText || "SCROLL"} onChange={(v) => onChange?.({ scrollText: v })} />
        </a>
        <span className="hidden md:block opacity-40">AUDIO: WEB API SYNTH</span>
      </div>
    </section>
  );
}

export const DeveloperPortfolio4Hero = Hero;
export default Hero;
