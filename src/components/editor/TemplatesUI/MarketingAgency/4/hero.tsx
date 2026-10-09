// @ts-nocheck
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ArrowDownRight, Sparkles, Palette, Zap } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const mount = useRef(null);
  const stats = props?.stats || [
    { value: "210", label: "Worlds built" },
    { value: "38", label: "Brave clients" },
    { value: "14", label: "Global awards" },
  ];
  const setStat = (i, k, v) => onChange?.({ stats: stats.map((s, j) => (j === i ? { ...s, [k]: v } : s)) });

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const w = () => el.clientWidth || window.innerWidth;
    const h = () => el.clientHeight || window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w() / h(), 0.1, 100);
    camera.position.z = 8.5;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w(), h());
    el.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(5, 5, 6);
    scene.add(key);
    const rim = new THREE.PointLight(new THREE.Color(accent), 50, 40);
    rim.position.set(-6, -4, 5);
    scene.add(rim);

    const mat = (c) => new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(c),
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });

    const shapes = [
      { g: new THREE.TorusKnotGeometry(1.2, 0.45, 180, 32), c: accent, p: [2.2, 0.2, 0] },
      { g: new THREE.SphereGeometry(0.85, 48, 48), c: ink, p: [-3.2, 1.8, -0.8] },
      { g: new THREE.IcosahedronGeometry(0.9, 0), c: inkSecond, p: [3.5, 2.0, -1] },
      { g: new THREE.TorusGeometry(0.7, 0.28, 32, 64), c: accent, p: [-2.8, -2, 0.4] },
      { g: new THREE.CylinderGeometry(0.45, 0.45, 1.4, 32), c: ink, p: [3.2, -2.2, 0.2] },
    ];

    const meshes = shapes.map((s) => {
      const m = new THREE.Mesh(s.g, mat(s.c));
      m.position.set(...s.p);
      scene.add(m);
      return m;
    });

    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);

    const onResize = () => {
      camera.aspect = w() / h();
      camera.updateProjectionMatrix();
      renderer.setSize(w(), h());
    };
    window.addEventListener("resize", onResize);

    let raf;
    const clock = new THREE.Clock();
    const tick = () => {
      const t = clock.getElapsedTime();
      meshes.forEach((m, i) => {
        m.rotation.x = t * 0.25 + i * 0.4;
        m.rotation.y = t * 0.35 + i * 0.6;
        m.position.y += Math.sin(t * 1.2 + i) * 0.003;
      });
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y * 1.0 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      meshes.forEach((m) => { m.geometry.dispose(); m.material.dispose(); });
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, [accent, ink, inkSecond]);

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-12 pt-36" style={{ background: `linear-gradient(160deg, ${bg}, ${bgSecond})`, color: ink }}>
      {/* Interactive Full-Screen Three.js Canvas */}
      <div ref={mount} className="pointer-events-none absolute inset-0 z-0 opacity-80" />
      <div className="pointer-events-none absolute -left-20 top-20 h-96 w-96 rounded-full opacity-30 blur-[130px]" style={{ background: accent }} />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider shadow-lg" style={{ background: accent, color: bg }}>
              <Sparkles size={14} />
              <Editable as="span" value={props?.pill || "Tactile 3D & Brand Worlds"} onChange={(v) => onChange?.({ pill: v })} />
            </span>
          </motion.div>

          {/* MONUMENTAL DISPLAY TEXT */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }} className="mt-8">
            <Editable
              as="h1"
              className="break-words text-[clamp(4rem,14vw,13rem)] font-black uppercase leading-[0.82] tracking-tighter"
              value={props?.headline || "First an idea."}
              onChange={(v) => onChange?.({ headline: v })}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <Editable
              as="p"
              className="mt-8 max-w-xl text-xl font-bold leading-relaxed md:text-2xl"
              style={{ color: inkSecond }}
              value={props?.subheadline || "We turn wild ideas into chunky, joyful, unforgettable brand worlds that people refuse to scroll past."}
              onChange={(v) => onChange?.({ subheadline: v })}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-3 rounded-full px-9 py-5 text-base font-black uppercase tracking-wider transition hover:scale-105 active:scale-95"
              style={{ background: accent, color: bg }}
            >
              <Editable as="span" value={props?.cta || "See our works"} onChange={(v) => onChange?.({ cta: v })} />
              <ArrowDownRight size={20} />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border px-8 py-5 text-base font-bold backdrop-blur-md transition hover:scale-105 active:scale-95"
              style={{ background: surface, borderColor: surface }}
            >
              <Editable as="span" value={props?.secondary || "Meet the studio"} onChange={(v) => onChange?.({ secondary: v })} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Monumental Kinetic Baseline (NO chopped bento boxes!) */}
      <div className="relative z-10 mx-auto mt-20 w-full max-w-7xl border-t pt-8" style={{ borderColor: surface }}>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: accent, color: bg }}>
              <Palette size={22} />
            </span>
            <div>
              <Editable as="span" className="text-sm font-bold uppercase tracking-wider" value={props?.imageCaption || "WebGL Realtime Engine, 2026"} onChange={(v) => onChange?.({ imageCaption: v })} />
              <div className="text-xs font-mono opacity-60">Physics Active / Interactive Camera</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl border px-6 py-3 backdrop-blur-xl"
                style={{ background: surface, borderColor: surface }}
              >
                <Editable as="span" className="mr-3 font-mono text-3xl font-black md:text-4xl" style={{ color: accent }} value={s.value} onChange={(v) => setStat(i, "value", v)} />
                <Editable as="span" className="text-xs font-bold uppercase tracking-widest" style={{ color: inkSecond }} value={s.label} onChange={(v) => setStat(i, "label", v)} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
