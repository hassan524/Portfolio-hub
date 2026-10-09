// @ts-nocheck
import { useState } from "react";
import { ArrowUpRight, X, Disc3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";

    const [active, setActive] = useState<number | null>(null);
    const items = props?.items || [
        { title: "Ashes & Embers", tags: ["Album", "2026"], description: "Our third full-length: twelve tracks of fuzzed-out riffs and big-hearted choruses.", detail: "Recorded live to tape over ten days in a converted barn. Includes the singles Burn Slow, Kerosene Heart and Last Light on Main.", price: "Vinyl $34 · Digital $11", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=80" },
        { title: "Kerosene Heart", tags: ["Single", "2025"], description: "The breakout anthem that crossed 40 million streams.", detail: "A stadium-sized chorus built on a single guitar loop. Remixed by three producers on the deluxe edition.", price: "Digital $2", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&q=80" },
        { title: "Live at Red Rocks", tags: ["Live", "Concert Film"], description: "A full 90-minute set captured under an open desert sky.", detail: "Shot on sixteen cameras with a 24-track live mix. Includes backstage footage and an acoustic encore.", price: "Blu-ray $28 · Stream $9", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900&q=80" },
        { title: "Smoke Signals EP", tags: ["EP", "2023"], description: "Five raw tracks that started the whole fire.", detail: "Our debut EP, tracked in a single weekend. Fan favorite for its stripped-back sound and gritty live feel.", price: "Cassette $15 · Digital $6", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&q=80" },
        { title: "Ember Sessions", tags: ["Acoustic", "Studio"], description: "Unplugged reworks of our biggest songs.", detail: "Eight songs, one microphone, one room. Features guest strings and a choir of fans recorded on tour.", price: "Digital $8", image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=900&q=80" },
        { title: "Hollow Nights Tour", tags: ["Tour", "2026"], description: "A 40-city run across clubs, theaters and festivals.", detail: "Full production with custom lighting, pyro and a fan-voted setlist each night. Support from rising local acts.", price: "Tickets from $45", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=900&q=80" },
    ];

    const upd = (i: number, k: string, v: string) => onChange?.({ items: items.map((it: any, j: number) => (j === i ? { ...it, [k]: v } : it)) });
    const updTag = (i: number, t: number, v: string) =>
        onChange?.({ items: items.map((it: any, j: number) => (j === i ? { ...it, tags: it.tags.map((x: string, y: number) => (y === t ? v : x)) } : it)) });

    const sel = active !== null ? items[active] : null;

    return (
        <section id="projects" className="relative px-5 py-24 md:px-8" style={{ background: bg, color: ink }}>
            <div className="mx-auto max-w-7xl">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                        <Editable as="span" className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: accent }} value={props?.eyebrow || "Music & Shows"} onChange={(v: string) => onChange?.({ eyebrow: v })} />
                        <Editable as="h2" className="mt-4 text-4xl font-black leading-tight sm:text-5xl" style={{ color: ink }} value={props?.title || "Records, films and tours."} onChange={(v: string) => onChange?.({ title: v })} />
                    </div>
                    <Editable as="p" className="max-w-sm text-sm leading-relaxed" style={{ color: inkSecond }} value={props?.subtitle || "Everything we have made so far. Tap any card for the full story behind it."} onChange={(v: string) => onChange?.({ subtitle: v })} />
                </motion.div>

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((it: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group overflow-hidden rounded-3xl"
                            style={{ background: surface, border: `1px solid ${accent}22` }}
                        >
                            <div className="relative overflow-hidden">
                                <img src={it.image} alt={it.title} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 55%, ${bg}E6)` }} />
                                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                                    {it.tags.map((t: string, k: number) => (
                                        <span key={k} className="rounded-full px-3 py-1 text-[11px] font-bold backdrop-blur" style={{ background: surface, color: ink, border: `1px solid ${accent}55` }}>
                                            <Editable as="span" value={t} onChange={(v: string) => updTag(i, k, v)} />
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6">
                                <Editable as="h3" className="text-xl font-black" style={{ color: ink }} value={it.title} onChange={(v: string) => upd(i, "title", v)} />
                                <Editable as="p" className="mt-2 text-sm leading-relaxed" style={{ color: inkSecond }} value={it.description} onChange={(v: string) => upd(i, "description", v)} />
                                <div className="mt-5 flex items-center justify-between gap-3">
                                    <Editable as="span" className="text-sm font-bold" style={{ color: accent }} value={it.price} onChange={(v: string) => upd(i, "price", v)} />
                                    <button
                                        onClick={() => setActive(i)}
                                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all hover:scale-[1.02] active:scale-95"
                                        style={{ background: accent, color: bg, boxShadow: `0 6px 20px ${accent}55` }}
                                        aria-label="Details"
                                    >
                                        <ArrowUpRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {sel && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActive(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md"
                        style={{ background: `${bg}CC` }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl"
                            style={{ background: bgSecond, border: `1px solid ${accent}55`, boxShadow: `0 0 80px ${accent}33` }}
                        >
                            <button onClick={() => setActive(null)} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full active:scale-95" style={{ background: surface, color: ink }} aria-label="Close">
                                <X size={18} />
                            </button>
                            <img src={sel.image} alt={sel.title} className="aspect-video w-full object-cover" />
                            <div className="p-7">
                                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
                                    <Disc3 size={14} />
                                    <Editable as="span" value={sel.tags[0]} onChange={(v: string) => updTag(active as number, 0, v)} />
                                </span>
                                <Editable as="h3" className="mt-2 text-3xl font-black" style={{ color: ink }} value={sel.title} onChange={(v: string) => upd(active as number, "title", v)} />
                                <Editable as="p" className="mt-4 text-base leading-relaxed" style={{ color: inkSecond }} value={sel.detail} onChange={(v: string) => upd(active as number, "detail", v)} />
                                <Editable as="div" className="mt-6 inline-block rounded-full px-5 py-2.5 text-sm font-bold" style={{ background: surface, color: accent }} value={sel.price} onChange={(v: string) => upd(active as number, "price", v)} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}