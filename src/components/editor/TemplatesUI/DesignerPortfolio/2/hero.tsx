// @ts-nocheck
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const getT = (theme: any = {}) => ({
    bg: theme.bg || "#07070D",
    bg2: theme["bg-second"] || "#0E0E18",
    text: theme.text || theme.ink || "#EEF0FF",
    muted: theme["text-second"] || "#8B8FA8",
    surface: theme.surface || "#151524",
    accent: theme.accent || "#7C9DFF",
    accent2: theme["accent-second"] || "#C084FC",
});

const U = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const ease = [0.22, 1, 0.36, 1];

export function DesignerPortfolio2Hero({ props = {}, theme, onChange }: any) {
    const t = getT(theme);
    const set = (k: string) => (v: string) => onChange?.({ [k]: v });

    // mouse parallax for the floating screen stack
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 80, damping: 18 });
    const sy = useSpring(my, { stiffness: 80, damping: 18 });
    const rotY = useTransform(sx, [-1, 1], [-10, 10]);
    const rotX = useTransform(sy, [-1, 1], [8, -8]);
    const blobX = useTransform(sx, [-1, 1], [-40, 40]);
    const blobY = useTransform(sy, [-1, 1], [-30, 30]);

    const onMove = (e: any) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };

    const screens = props.heroScreens || [
        U("photo-1551650975-87deedd944c3"),
        U("photo-1559028012-481c04fa702d"),
        U("photo-1586717791821-3f44a563fa4c"),
    ];
    const tools = props.tools || ["Figma", "Framer", "Spline", "After Effects", "Webflow", "Notion"];

    return (
        <section
            id="home"
            onMouseMove={onMove}
            className="relative -mt-[72px] overflow-hidden pb-24 pt-40 font-['Poppins',sans-serif]"
            style={{ background: t.bg, color: t.text }}
        >
            {/* aurora blobs */}
            <motion.div aria-hidden style={{ x: blobX, y: blobY }} className="pointer-events-none absolute inset-0">
                <motion.div
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 30, 0] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-[10%] top-[8%] h-[28rem] w-[28rem] rounded-full blur-[110px]"
                    style={{ background: `${t.accent}55` }}
                />
                <motion.div
                    animate={{ scale: [1.1, 0.9, 1.1], rotate: [0, -25, 0] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-[8%] top-[20%] h-[24rem] w-[24rem] rounded-full blur-[110px]"
                    style={{ background: `${t.accent2}50` }}
                />
            </motion.div>
            {/* fine grid */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{ backgroundImage: `linear-gradient(${t.text} 1px, transparent 1px), linear-gradient(90deg, ${t.text} 1px, transparent 1px)`, backgroundSize: "64px 64px", maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)" }}
            />

            <div className="relative mx-auto max-w-6xl px-5 text-center">
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="mx-auto mb-8 flex w-fit items-center gap-2 text-[13px]" style={{ color: t.muted }}>
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inset-0 animate-ping rounded-full opacity-70" style={{ background: "#4ADE80" }} />
                        <span className="relative h-2 w-2 rounded-full" style={{ background: "#4ADE80" }} />
                    </span>
                    <Editable as="span" value={props.status || "Booking new projects for Q3"} onChange={set("status")} />
                </motion.div>

                <h1 className="mx-auto max-w-5xl text-[clamp(2.6rem,7vw,6.2rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
                    {[props.h1a || "I design products", props.h1b || "people fall in love with."].map((line: string, i: number) => (
                        <span key={i} className="block overflow-hidden pb-2">
                            <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.15 + i * 0.12, ease }} className="block">
                                {i === 1 ? (
                                    <span style={{ background: `linear-gradient(90deg, ${t.accent}, ${t.accent2}, ${t.accent})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                        <Editable as="span" value={line} onChange={set("h1b")} />
                                    </span>
                                ) : (
                                    <Editable as="span" value={line} onChange={set("h1a")} />
                                )}
                            </motion.span>
                        </span>
                    ))}
                </h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45, ease }} className="mx-auto mt-7 max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: t.muted }}>
                    <Editable value={props.heroText || "Product & interface designer helping startups turn complex ideas into calm, beautiful software. 9 years, 60+ shipped products, 4 Webby nods."} onChange={set("heroText")} />
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease }} className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <a href="#projects" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.03]" style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent2})`, color: t.bg, boxShadow: `0 10px 40px -10px ${t.accent}` }}>
                        <Editable as="span" value={props.ctaPrimary || "See selected work"} onChange={set("ctaPrimary")} />
                        <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
                    </a>
                    <a href="#contact" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold backdrop-blur" style={{ border: `1px solid ${t.text}22`, background: `${t.text}08` }}>
                        <Editable as="span" value={props.ctaSecondary || "Book a 20-min intro"} onChange={set("ctaSecondary")} />
                        <ArrowUpRight size={16} />
                    </a>
                </motion.div>

                {/* 3D floating screen stack */}
                <div className="relative mx-auto mt-20 h-[300px] max-w-4xl sm:h-[420px]" style={{ perspective: 1400 }}>
                    <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }} className="relative h-full w-full">
                        {screens.map((src: string, i: number) => {
                            const pos = [
                                { x: "-38%", z: -120, r: -8, d: 0.7 },
                                { x: "0%", z: 40, r: 0, d: 0.55 },
                                { x: "38%", z: -120, r: 8, d: 0.85 },
                            ][i % 3];
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 120, rotate: pos.r * 2 }}
                                    animate={{ opacity: 1, y: [0, i === 1 ? -14 : -8, 0], rotate: pos.r }}
                                    transition={{ opacity: { duration: 0.9, delay: pos.d }, rotate: { duration: 1.1, delay: pos.d, ease }, y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: pos.d } }}
                                    className="absolute left-1/2 top-0 w-[46%] overflow-hidden rounded-2xl sm:rounded-3xl"
                                    style={{ x: `calc(-50% + ${pos.x})`, z: pos.z, border: `1px solid ${t.text}1f`, background: t.surface, boxShadow: `0 40px 80px -30px #000, 0 0 0 6px ${t.text}08` }}
                                >
                                    <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: `${t.text}08` }}>
                                        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />)}
                                    </div>
                                    <img src={src} alt="Interface design preview" className="aspect-[4/3] w-full object-cover" />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* tools marquee */}
                <div className="relative mx-auto mt-16 max-w-3xl overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)" }}>
                    <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="flex w-max gap-12">
                        {[...tools, ...tools].map((tool: string, i: number) => (
                            <span key={i} className="whitespace-nowrap text-sm font-medium tracking-wide" style={{ color: t.muted }}>{tool}</span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default DesignerPortfolio2Hero;
