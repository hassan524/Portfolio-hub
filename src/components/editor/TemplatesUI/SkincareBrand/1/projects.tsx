// @ts-nocheck
import { useState, useRef } from 'react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const collageSlides = [
    {
        id: 'slide-1',
        num: '03',
        tag: 'OUR VISION',
        desc: 'NAAT 99 pursues to find the safest ingredients for our line of products. ◇◇◇',
        btnText: 'Go To Shop',
        label: '[ DERMATOLOGICALLY APPROVED ]',
        signature: 'Inspired',
        leftPhoto: { title: 'Precision Makeup Application', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80' },
        centerPhoto: { title: 'Clean Eyeliner Craft', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80' },
        rightPhoto: { title: 'Foaming Facial Cleanse', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80' },
    },
    {
        id: 'slide-2',
        num: '04',
        tag: 'HERBAL BOTANICALS',
        desc: 'Cold-pressed botanical oils formulated to soothe, hydrate, and balance the skin. ◇◇◇',
        btnText: 'Explore Rituals',
        label: '[ 100% VEGAN FORMULA ]',
        signature: 'Radiant',
        leftPhoto: { title: 'Natural Facial Oil Elixir', image: 'https://images.unsplash.com/photo-1608248597359-291a182741d7?auto=format&fit=crop&w=800&q=80' },
        centerPhoto: { title: 'Botanical Hydration Glow', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80' },
        rightPhoto: { title: 'Gentle Rose Water Spritz', image: 'https://images.unsplash.com/photo-1512290900672-1f02e71dfb3f?auto=format&fit=crop&w=800&q=80' },
    },
    {
        id: 'slide-3',
        num: '05',
        tag: 'DAILY RITUAL',
        desc: 'Three gentle steps, morning and night. Cleanse, treat, and glow naturally. ◇◇◇',
        btnText: 'Shop The Set',
        label: '[ CRUELTY FREE ]',
        signature: 'Glow',
        leftPhoto: { title: 'Serum Dropper', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80' },
        centerPhoto: { title: 'Fresh Skin Close-up', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80' },
        rightPhoto: { title: 'Smiling Cleanse', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80' },
    },
];

/* Image with graceful fallback so a frame is never empty */
function Photo({ src, alt, className = '' }: any) {
    const [failed, setFailed] = useState(false);
    if (failed) {
        return <div className={`w-full h-full bg-gradient-to-br from-[#e9c3ad] to-[#c98f72] ${className}`} />;
    }
    return (
        <img
            src={src}
            alt={alt}
            draggable={false}
            onError={() => setFailed(true)}
            className={`w-full h-full object-cover pointer-events-none ${className}`}
        />
    );
}

function Star({ size = 18, style = {}, delay = 0 }: any) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className="absolute pointer-events-none text-neutral-900/70"
            style={style}
            animate={{ opacity: [0.35, 0.9, 0.35], rotate: [0, 25, 0], scale: [0.85, 1.1, 0.85] }}
            transition={{ duration: 3.4, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
            <path d="M12 0 C12.8 7.2 16.8 11.2 24 12 C16.8 12.8 12.8 16.8 12 24 C11.2 16.8 7.2 12.8 0 12 C7.2 11.2 11.2 7.2 12 0 Z" fill="currentColor" />
        </motion.svg>
    );
}

/* A real-looking fold: dark valley line + light ridge line + soft shading both sides */
function Fold({ orientation = 'v', pos = '33%', angle = 0, strength = 1 }: any) {
    const vertical = orientation === 'v';
    return (
        <div
            className="absolute pointer-events-none z-[5]"
            style={
                vertical
                    ? { top: '-10%', bottom: '-10%', left: pos, width: 140, marginLeft: -70, transform: `rotate(${angle}deg)` }
                    : { left: '-10%', right: '-10%', top: pos, height: 140, marginTop: -70, transform: `rotate(${angle}deg)` }
            }
        >
            <div
                className="absolute inset-0"
                style={{
                    background: vertical
                        ? `linear-gradient(90deg, transparent 0%, rgba(90,40,20,${0.12 * strength}) 44%, rgba(90,40,20,${0.38 * strength}) 49.6%, rgba(255,240,225,${0.5 * strength}) 50.4%, rgba(255,240,225,${0.18 * strength}) 56%, transparent 100%)`
                        : `linear-gradient(180deg, transparent 0%, rgba(90,40,20,${0.12 * strength}) 44%, rgba(90,40,20,${0.38 * strength}) 49.6%, rgba(255,240,225,${0.5 * strength}) 50.4%, rgba(255,240,225,${0.18 * strength}) 56%, transparent 100%)`,
                }}
            />
        </div>
    );
}

/* Small torn scrap of paper stuck exactly where a fold crosses the page */
function Scrap({ style = {}, rotate = 0, clip, children }: any) {
    return (
        <div
            className="absolute z-[8] pointer-events-none shadow-lg"
            style={{
                ...style,
                transform: `rotate(${rotate}deg)`,
                background: 'linear-gradient(135deg,#f3e4d2,#e6cdb2)',
                clipPath: clip || 'polygon(0% 6%, 12% 0%, 30% 5%, 52% 0%, 74% 6%, 100% 2%, 96% 38%, 100% 66%, 94% 100%, 66% 94%, 40% 100%, 18% 95%, 0% 100%, 5% 55%)',
            }}
        >
            {children}
        </div>
    );
}

export function SkincareBrand1Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.accent || '#d9a487';
    const [[idx, dir], setPage] = useState([0, 0]);
    const slide = collageSlides[idx];

    const paginate = (d: number) =>
        setPage(([i]) => [(i + d + collageSlides.length) % collageSlides.length, d]);

    /* custom drag cursor that follows the mouse over the collage */
    const areaRef = useRef<HTMLDivElement>(null);
    const [hover, setHover] = useState(false);
    const [grabbing, setGrabbing] = useState(false);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 500, damping: 35 });
    const sy = useSpring(my, { stiffness: 500, damping: 35 });
    const onMove = (e: any) => {
        const r = areaRef.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
    };

    const variants = {
        enter: (d: number) => ({ opacity: 0, x: d >= 0 ? 260 : -260, rotate: d >= 0 ? 4 : -4 }),
        center: { opacity: 1, x: 0, rotate: 0 },
        exit: (d: number) => ({ opacity: 0, x: d >= 0 ? -260 : 260, rotate: d >= 0 ? -4 : 4 }),
    };

    return (
        <section
            id="vision"
            className="w-full relative min-h-screen flex flex-col justify-between px-6 sm:px-14 py-16 select-none overflow-hidden"
            style={{ backgroundColor: bg, color: '#1c1c1f' }}
        >
            {/* SVG paper-grain filter */}
            <svg width="0" height="0" className="absolute">
                <filter id="paperGrain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" />
                    <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.2  0 0 0 0 0.12  0 0 0 0.55 0" />
                </filter>
                <filter id="paperWrinkle">
                    <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="4" seed="3" />
                    <feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.15  0 0 0 0 0.08  0 0 0 0.9 0" />
                </filter>
            </svg>

            {/* Old paper: fine grain + large wrinkles + vignette + stains */}
            <div className="absolute inset-0 pointer-events-none opacity-60 mix-blend-multiply" style={{ filter: 'url(#paperGrain)' }}>
                <svg width="100%" height="100%"><rect width="100%" height="100%" filter="url(#paperGrain)" /></svg>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply">
                <svg width="100%" height="100%"><rect width="100%" height="100%" filter="url(#paperWrinkle)" /></svg>
            </div>
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse at 20% 15%, rgba(255,235,215,0.35), transparent 55%), radial-gradient(ellipse at 85% 90%, rgba(110,55,30,0.28), transparent 55%), radial-gradient(ellipse at center, transparent 55%, rgba(90,40,20,0.22) 100%)',
                }}
            />

            {/* ===== FOLDS, only at deliberate points ===== */}
            <Fold orientation="v" pos="31%" angle={2} strength={1} />
            <Fold orientation="v" pos="68%" angle={-3} strength={0.8} />
            <Fold orientation="h" pos="58%" angle={-1} strength={0.9} />

            {/* ===== TORN TOP EDGE (cream paper above, ragged line, fibres) ===== */}
            <div className="absolute top-0 left-0 right-0 h-10 pointer-events-none z-30">
                <svg className="w-full h-full" viewBox="0 0 1200 40" preserveAspectRatio="none">
                    <path
                        d="M0,0 L0,18 L40,26 L70,14 L120,28 L170,12 L210,24 L260,10 L310,26 L350,16 L400,30 L450,12 L500,24 L540,8 L590,26 L640,14 L690,30 L740,12 L790,24 L830,10 L880,28 L930,14 L980,26 L1030,12 L1080,28 L1130,16 L1200,24 L1200,0 Z"
                        fill="#f6ebdd"
                    />
                    <path
                        d="M0,18 L40,26 L70,14 L120,28 L170,12 L210,24 L260,10 L310,26 L350,16 L400,30 L450,12 L500,24 L540,8 L590,26 L640,14 L690,30 L740,12 L790,24 L830,10 L880,28 L930,14 L980,26 L1030,12 L1080,28 L1130,16 L1200,24"
                        fill="none"
                        stroke="rgba(120,70,40,0.35)"
                        strokeWidth="1.2"
                        transform="translate(0,3)"
                    />
                </svg>
            </div>

            {/* ===== TORN BOTTOM EDGE ===== */}
            <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none z-30 rotate-180">
                <svg className="w-full h-full" viewBox="0 0 1200 32" preserveAspectRatio="none">
                    <path
                        d="M0,0 L0,14 L50,22 L100,8 L160,24 L220,10 L280,22 L340,6 L400,24 L470,12 L530,26 L600,10 L660,22 L730,8 L790,24 L850,12 L920,26 L980,8 L1040,22 L1110,12 L1200,20 L1200,0 Z"
                        fill="#c98f72"
                    />
                </svg>
            </div>

            {/* ===== FOLDED CORNER (top-right) ===== */}
            <div className="absolute top-8 right-0 z-[25] pointer-events-none" style={{ width: 120, height: 120 }}>
                <div
                    className="absolute top-0 right-0 w-full h-full"
                    style={{
                        background: 'linear-gradient(225deg, #f4e6d4 0%, #e3c6a8 48%, rgba(0,0,0,0) 49%)',
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                        filter: 'drop-shadow(-4px 6px 6px rgba(80,35,15,0.35))',
                    }}
                />
            </div>

            {/* ===== SCRAPS placed on fold crossings ===== */}
            <Scrap style={{ top: '16%', left: '31%', width: 90, height: 70, marginLeft: -45 }} rotate={-8}>
                <div className="w-full h-full p-2 text-[8px] font-mono tracking-widest text-neutral-700/70">NAAT '99</div>
            </Scrap>
            <Scrap
                style={{ top: '58%', left: '68%', width: 70, height: 56, marginLeft: -35 }}
                rotate={11}
                clip="polygon(4% 0%, 38% 6%, 70% 0%, 100% 10%, 94% 52%, 100% 90%, 62% 100%, 30% 94%, 0% 100%, 6% 48%)"
            >
                <div className="w-full h-full flex items-center justify-center text-neutral-800/70 text-lg">✳</div>
            </Scrap>
            <Scrap
                style={{ bottom: '10%', left: '31%', width: 60, height: 44, marginLeft: -30 }}
                rotate={-14}
                clip="polygon(0% 10%, 30% 0%, 60% 8%, 100% 0%, 96% 60%, 100% 100%, 55% 92%, 20% 100%, 4% 70%)"
            />

            {/* More stars */}
            <Star size={34} style={{ top: '22%', left: '47%' }} delay={0} />
            <Star size={16} style={{ top: '12%', left: '64%' }} delay={0.8} />
            <Star size={22} style={{ top: '48%', left: '5%' }} delay={1.4} />
            <Star size={14} style={{ top: '70%', left: '52%' }} delay={0.4} />
            <Star size={26} style={{ top: '80%', left: '90%' }} delay={1.9} />
            <Star size={12} style={{ top: '35%', left: '93%' }} delay={1.1} />

            {/* ===== TOP BAR ===== */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mx-auto max-w-7xl w-full flex flex-col md:flex-row items-start justify-between gap-8 relative z-20 pt-8"
            >
                <div className="flex items-center gap-4 text-xs font-mono text-neutral-900">
                    <span className="font-bold text-sm">{slide.num}</span>
                    <span className="w-6 h-px bg-neutral-900/40" />
                    <span className="text-[10px] uppercase tracking-wider text-neutral-800">
                        PAGE {idx + 1} OF {collageSlides.length}
                    </span>
                </div>

                <div className="space-y-3 max-w-md md:text-right">
                    <h3 className="text-3xl sm:text-5xl font-serif font-light uppercase tracking-tight text-neutral-900">
                        <Editable value={slide.tag} onChange={v => onChange?.({ visionTitle: v })} />
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-800 font-sans font-light leading-relaxed">
                        <Editable value={slide.desc} onChange={v => onChange?.({ visionDesc: v })} />
                    </p>
                    <div className="pt-2 flex items-center justify-start md:justify-end gap-3">
                        <a
                            href="#contact"
                            className="px-7 py-3 bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-sans font-medium uppercase tracking-widest shadow-xl transition-all"
                        >
                            <Editable value={slide.btnText} onChange={v => onChange?.({ btnShop: v })} />
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* ===== DRAGGABLE COLLAGE ===== */}
            <div
                ref={areaRef}
                className="my-auto py-8 relative max-w-7xl mx-auto w-full z-20 cursor-none"
                onMouseMove={onMove}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => { setHover(false); setGrabbing(false); }}
            >
                <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                        key={slide.id}
                        custom={dir}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.4}
                        onDragStart={() => setGrabbing(true)}
                        onDragEnd={(e, info) => {
                            setGrabbing(false);
                            if (info.offset.x < -110 || info.velocity.x < -600) paginate(1);
                            else if (info.offset.x > 110 || info.velocity.x > 600) paginate(-1);
                        }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                    >
                        {/* LEFT: skewed torn photo with black tape (like reference) */}
                        <div className="md:col-span-4 relative flex justify-center">
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                className="relative w-60 h-80 sm:w-72 sm:h-[26rem] -rotate-3"
                                style={{ filter: 'drop-shadow(0 18px 22px rgba(70,30,10,0.35))' }}
                            >
                                <div className="absolute -top-4 left-6 w-32 h-8 bg-neutral-900/90 -rotate-6 z-30 shadow-lg" />
                                <div
                                    className="w-full h-full overflow-hidden bg-white"
                                    style={{ clipPath: 'polygon(14% 0%, 100% 0%, 100% 78%, 0% 100%, 0% 14%)' }}
                                >
                                    <Photo src={slide.leftPhoto.image} alt={slide.leftPhoto.title} className="grayscale contrast-110" />
                                </div>
                            </motion.div>
                        </div>

                        {/* CENTER: torn paper cutout */}
                        <div className="md:col-span-4 relative flex justify-center">
                            <motion.div
                                whileHover={{ scale: 1.04 }}
                                className="relative w-56 h-72 sm:w-64 sm:h-80 rotate-2"
                                style={{ filter: 'drop-shadow(0 18px 22px rgba(70,30,10,0.35))' }}
                            >
                                <div
                                    className="w-full h-full overflow-hidden"
                                    style={{ clipPath: 'polygon(2% 6%, 40% 0%, 100% 8%, 96% 62%, 100% 100%, 22% 94%, 0% 100%, 6% 48%)' }}
                                >
                                    <Photo src={slide.centerPhoto.image} alt={slide.centerPhoto.title} className="brightness-105" />
                                </div>
                                <Star size={26} style={{ top: -14, right: -10 }} delay={0.5} />
                            </motion.div>
                        </div>

                        {/* RIGHT: polaroid with torn corner */}
                        <div className="md:col-span-4 relative flex justify-center">
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                className="relative w-56 h-72 sm:w-64 sm:h-[22rem] rotate-3"
                                style={{ filter: 'drop-shadow(0 18px 22px rgba(70,30,10,0.35))' }}
                            >
                                <div
                                    className="w-full h-full bg-white p-3"
                                    style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 90% 100%, 0% 100%)' }}
                                >
                                    <div className="w-full h-full overflow-hidden bg-neutral-200">
                                        <Photo src={slide.rightPhoto.image} alt={slide.rightPhoto.title} />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Custom cursor / moving object */}
                <motion.div
                    className="absolute top-0 left-0 z-50 pointer-events-none"
                    style={{ x: sx, y: sy }}
                    animate={{ opacity: hover ? 1 : 0, scale: grabbing ? 0.85 : 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="-translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-neutral-900 text-white flex items-center justify-center gap-1 text-[9px] font-mono tracking-widest uppercase shadow-2xl">
                        <ArrowLeft size={10} />
                        <span>{grabbing ? 'Release' : 'Drag'}</span>
                        <ArrowRight size={10} />
                    </div>
                </motion.div>
            </div>

            {/* ===== BOTTOM ROW ===== */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mx-auto max-w-7xl w-full flex flex-col sm:flex-row items-center justify-between gap-6 relative z-20 pt-4 pb-4 border-t border-neutral-900/15"
            >
                <div className="text-[10px] font-mono tracking-widest uppercase text-neutral-900 border border-neutral-900/40 px-3 py-1">
                    {slide.label}
                </div>

                <div className="flex items-center gap-4 bg-neutral-900/85 backdrop-blur-md px-5 py-2.5 rounded-full text-white shadow-xl">
                    <button type="button" onClick={() => paginate(-1)} className="p-1 hover:text-neutral-300 transition-colors" aria-label="Previous">
                        <ArrowLeft size={14} />
                    </button>
                    <div className="flex items-center gap-2">
                        {collageSlides.map((s, i) => (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => setPage([i, i > idx ? 1 : -1])}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
                            />
                        ))}
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-white/80">DRAG TO REVEAL</span>
                    <button type="button" onClick={() => paginate(1)} className="p-1 hover:text-neutral-300 transition-colors" aria-label="Next">
                        <ArrowRight size={14} />
                    </button>
                </div>

                <div className="font-serif italic text-4xl sm:text-5xl text-white font-light tracking-wide -rotate-6" style={{ textShadow: '0 2px 12px rgba(80,35,15,0.35)' }}>
                    {slide.signature}
                </div>
            </motion.div>
        </section>
    );
}

export const ProjectsGrid = SkincareBrand1Projects;
export default SkincareBrand1Projects;