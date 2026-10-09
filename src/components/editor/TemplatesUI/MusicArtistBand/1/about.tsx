// @ts-nocheck
import { Guitar, Mic2, Drum, Piano, Zap, Heart, Users, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";

    const members = props?.members || [
        { name: "Jax Romero", role: "Lead Vocals", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&q=80" },
        { name: "Mina Okafor", role: "Lead Guitar", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80" },
        { name: "Dev Castellan", role: "Bass", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80" },
        { name: "Rhea Valdez", role: "Drums", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80" },
    ];
    const features = props?.features || [
        { title: "Arena-Ready Sound", text: "Mixed to hit hard on stage and hold up on headphones." },
        { title: "Fan-First Shows", text: "Every night is a different setlist, shaped by the room." },
        { title: "Self-Produced", text: "Written, recorded and mastered in our own analog studio." },
    ];
    const chips = props?.chips || ["Alt Rock", "Post-Grunge", "Anthemic", "Analog", "Live Looping"];
    const values = props?.values || [
        { title: "Loud & Honest", text: "No filters. We write what we feel and play it like we mean it." },
        { title: "Community Fire", text: "Our fans are the fourth member on every stage." },
        { title: "Never Stop Building", text: "Every record pushes the sound somewhere new." },
    ];
    const gallery = props?.gallery || [
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
        "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80",
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
    ];
    const icons = [Mic2, Guitar, Piano, Drum];
    const featIcons = [Zap, Users, Flame];
    const valIcons = [Zap, Heart, Flame];

    const upd = (key: string, arr: any[], i: number, k: string, v: string) =>
        onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? { ...x, [k]: v } : x)) });
    const updChip = (i: number, v: string) => onChange?.({ chips: chips.map((c: string, j: number) => (j === i ? v : c)) });

    const fade = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.7 } };

    return (
        <section id="about" className="relative overflow-hidden px-5 py-24 md:px-8" style={{ background: bgSecond, color: ink }}>
            <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full blur-3xl" style={{ background: `radial-gradient(circle, ${accent}33, transparent 70%)` }} />
            <div className="relative mx-auto max-w-7xl">
                <motion.div {...fade} className="max-w-3xl">
                    <Editable as="span" className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: accent }} value={props?.eyebrow || "Our Story"} onChange={(v: string) => onChange?.({ eyebrow: v })} />
                    <Editable as="h2" className="mt-4 text-4xl font-black leading-tight sm:text-5xl" style={{ color: ink }} value={props?.title || "Born in a basement. Built for the big stage."} onChange={(v: string) => onChange?.({ title: v })} />
                    <Editable as="p" className="mt-5 text-base leading-relaxed sm:text-lg" style={{ color: inkSecond }} value={props?.story || "Cinder Hollow started in 2017 with two borrowed amps and a leaking garage roof. Five years, three albums and 180 shows later, we are still writing songs the same way: loud, loose and together in one room."} onChange={(v: string) => onChange?.({ story: v })} />
                </motion.div>

                <div className="mt-14 grid gap-5 lg:grid-cols-3">
                    <motion.div {...fade} className="grid gap-5 lg:col-span-2 sm:grid-cols-2">
                        {features.map((f: any, i: number) => {
                            const Icon = featIcons[i % featIcons.length];
                            return (
                                <div key={i} className={`rounded-3xl p-6 transition-all hover:scale-[1.02] ${i === 0 ? "sm:col-span-2" : ""}`} style={{ background: surface, border: `1px solid ${accent}22` }}>
                                    <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: accent, color: bg }}><Icon size={20} /></span>
                                    <Editable as="h3" className="mt-4 text-xl font-bold" style={{ color: ink }} value={f.title} onChange={(v: string) => upd("features", features, i, "title", v)} />
                                    <Editable as="p" className="mt-2 text-sm leading-relaxed" style={{ color: inkSecond }} value={f.text} onChange={(v: string) => upd("features", features, i, "text", v)} />
                                </div>
                            );
                        })}
                        <div className="flex flex-wrap gap-2 sm:col-span-2">
                            {chips.map((c: string, i: number) => (
                                <span key={i} className="rounded-full px-4 py-2 text-xs font-semibold" style={{ background: surface, color: ink, border: `1px solid ${accent}44` }}>
                                    <Editable as="span" value={c} onChange={(v: string) => updChip(i, v)} />
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div {...fade} className="grid grid-cols-2 gap-3">
                        {gallery.map((g: string, i: number) => (
                            <img key={i} src={g} alt="Band gallery" className={`w-full rounded-3xl object-cover transition-transform hover:scale-[1.02] ${i === 0 ? "col-span-2 h-44" : "h-40"}`} />
                        ))}
                    </motion.div>
                </div>

                <motion.div {...fade} className="mt-24">
                    <Editable as="h3" className="text-3xl font-black sm:text-4xl" style={{ color: ink }} value={props?.teamTitle || "The Four Flames"} onChange={(v: string) => onChange?.({ teamTitle: v })} />
                    <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
                        {members.map((m: any, i: number) => {
                            const Icon = icons[i % icons.length];
                            return (
                                <motion.div key={i} whileHover={{ y: -8 }} className="group relative overflow-hidden rounded-3xl" style={{ background: surface }}>
                                    <img src={m.image} alt={m.name} className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 45%, ${bg}F2)` }} />
                                    <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full" style={{ background: accent, color: bg }}><Icon size={16} /></span>
                                    <div className="absolute bottom-0 p-4">
                                        <Editable as="div" className="text-base font-bold sm:text-lg" style={{ color: ink }} value={m.name} onChange={(v: string) => upd("members", members, i, "name", v)} />
                                        <Editable as="div" className="text-xs font-medium" style={{ color: accent }} value={m.role} onChange={(v: string) => upd("members", members, i, "role", v)} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                <motion.div {...fade} className="mt-24 grid gap-5 md:grid-cols-3">
                    {values.map((v: any, i: number) => {
                        const Icon = valIcons[i % valIcons.length];
                        return (
                            <div key={i} className="rounded-3xl p-7 transition-all hover:scale-[1.02]" style={{ background: surface, border: `1px solid ${accent}22` }}>
                                <Icon size={26} style={{ color: accent }} />
                                <Editable as="h4" className="mt-4 text-lg font-bold" style={{ color: ink }} value={v.title} onChange={(val: string) => upd("values", values, i, "title", val)} />
                                <Editable as="p" className="mt-2 text-sm leading-relaxed" style={{ color: inkSecond }} value={v.text} onChange={(val: string) => upd("values", values, i, "text", val)} />
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}