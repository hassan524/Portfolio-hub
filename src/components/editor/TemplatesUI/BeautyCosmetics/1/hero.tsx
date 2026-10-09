// @ts-nocheck
import { useMemo } from 'react';
import { ArrowDown } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

function seeded(seed: number) {
    let s = seed;
    return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

function grow(x: number, y: number, angle: number, len: number, depth: number, r: () => number, out: any[], maxDepth: number) {
    if (depth > maxDepth || len < 12) return;
    const a2 = angle + (r() - 0.5) * 0.7;
    const x2 = x + Math.cos(a2) * len;
    const y2 = y + Math.sin(a2) * len;
    const cx = x + Math.cos(angle) * len * 0.55 + (r() - 0.5) * 50;
    const cy = y + Math.sin(angle) * len * 0.55 + (r() - 0.5) * 50;
    out.push({
        d: `M${x.toFixed(1)} ${y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`,
        depth,
        leaf: depth === maxDepth,
        x: +x2.toFixed(1),
        y: +y2.toFixed(1),
        size: +(3 + r() * 5).toFixed(1),
    });
    const branches = depth < 2 ? 2 : r() > 0.3 ? 2 : 1;
    for (let i = 0; i < branches; i++) {
        const spread = (i === 0 ? -1 : 1) * (0.35 + r() * 0.55);
        grow(x2, y2, a2 + (branches === 1 ? (r() - 0.5) * 0.5 : spread), len * (0.78 + r() * 0.1), depth + 1, r, out, maxDepth);
    }
}

function buildRoots() {
    const r = seeded(777);
    const out: any[] = [];
    [220, 600, 980].forEach((x) => grow(x, 820, -Math.PI / 2 + (r() - 0.5) * 0.25, 140, 0, r, out, 5));
    [90, 420, 800, 1110].forEach((x) => grow(x, -20, Math.PI / 2 + (r() - 0.5) * 0.25, 100, 0, r, out, 4));
    return out;
}

export function Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FFF8F7';
    const ink = theme?.ink || '#20191A';
    const inkSecond = theme?.['ink-second'] || '#6D5B5E';
    const accent = theme?.accent || '#D97382';
    const roots = useMemo(buildRoots, []);

    // Mouse parallax
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 50, damping: 20 });
    const sy = useSpring(my, { stiffness: 50, damping: 20 });
    const gx = useTransform(sx, (v) => v * -24);
    const gy = useTransform(sy, (v) => v * -16);
    const onMove = (e: any) => {
        const b = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - b.left) / b.width - 0.5);
        my.set((e.clientY - b.top) / b.height - 0.5);
    };
    const bloomAt = 5 * 0.5 + 0.8;

    return (
        <section id="top" onMouseMove={onMove} className="relative flex min-h-screen items-center justify-center overflow-hidden px-5" style={{ backgroundColor: bg, color: ink }}>
            <motion.svg
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)]"
                viewBox="0 0 1200 800"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
                style={{ x: gx, y: gy }}
            >
                {roots.map((p, i) => {
                    const delay = p.depth * 0.5 + (i % 7) * 0.04;
                    return (
                        <g key={i}>
                            <motion.path
                                d={p.d}
                                stroke={accent}
                                strokeLinecap="round"
                                strokeWidth={Math.max(0.8, 3.4 - p.depth * 0.5)}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: Math.max(0.25, 0.75 - p.depth * 0.08) }}
                                transition={{ pathLength: { duration: 1.3, delay, ease: 'easeOut' }, opacity: { duration: 0.3, delay } }}
                            />
                            {p.leaf && (
                                <motion.circle
                                    cx={p.x}
                                    cy={p.y}
                                    r={p.size}
                                    fill={accent}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: [0, 1.4, 1], opacity: 0.85 }}
                                    transition={{ duration: 0.7, delay: bloomAt + (i % 9) * 0.07, ease: 'backOut' }}
                                    style={{ transformOrigin: `${p.x}px ${p.y}px`, transformBox: 'fill-box' }}
                                />
                            )}
                        </g>
                    );
                })}
            </motion.svg>

            <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${bg} 0%, ${bg}ee 30%, transparent 70%)` }} />

            <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
                <motion.div
                    initial={{ clipPath: 'inset(0 0 100% 0)', y: 40 }}
                    animate={{ clipPath: 'inset(0 0 0% 0)', y: 0 }}
                    transition={{ duration: 1, delay: 1.2, ease }}
                >
                    <Editable as="h1" value={props?.headline || 'Soft rituals for luminous skin.'} onChange={(v) => onChange?.({ headline: v })} className="text-6xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-8xl" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 2.1, ease }}>
                    <Editable as="p" value={props?.subheadline || 'Thoughtful cosmetics, made in small batches with botanicals that meet your skin where it is.'} onChange={(v) => onChange?.({ subheadline: v })} className="mx-auto mt-7 max-w-md text-base leading-7" style={{ color: inkSecond }} />
                </motion.div>
                <motion.a
                    href="#projects"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.6, duration: 0.6 }}
                    className="mt-12 grid h-12 w-12 place-items-center rounded-full border"
                    style={{ borderColor: accent, color: accent }}
                    aria-label="Scroll to collection"
                >
                    <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                        <ArrowDown size={18} />
                    </motion.span>
                </motion.a>
            </div>
        </section>
    );
}