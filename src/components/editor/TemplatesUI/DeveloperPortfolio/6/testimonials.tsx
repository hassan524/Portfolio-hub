// @ts-nocheck
import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";

    const defaultItems = [
        { quote: "Alicia rebuilt our dashboard in six weeks and our page speed doubled. Rare mix of speed and care.", name: "Jordan Hale", role: "CTO, Lumen Labs", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
        { quote: "Communicates clearly, estimates honestly and ships clean code. I'd hire her again tomorrow.", name: "Priya Nair", role: "Founder, Orderain", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
        { quote: "She turned our messy prototype into a product customers love. Truly a go-to engineer.", name: "Marcus Lee", role: "Product Lead, Turingoid", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" },
    ];
    const rawItems = props?.items;
    const items = Array.isArray(rawItems) && rawItems.length > 0 ? rawItems : defaultItems;

    const stats = props?.stats || [
        { value: "40+", label: "Projects delivered" },
        { value: "25", label: "Happy clients" },
        { value: "4.9", label: "Average rating" },
        { value: "3", label: "Industry awards" },
    ];
    const badges = props?.badges || ["Top Rated Freelancer", "Vercel Partner", "Open Source Contributor"];
    const set = (key: string, arr: any[], i: number, k: string, v: string) =>
        onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? { ...x, [k]: v } : x)) });

    return (
        <section id="testimonials" style={{ background: bg, borderTop: `1px solid ${surface}` }}>
            <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
                <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14 text-center">
                    <p className="font-mono text-xs uppercase tracking-[0.3em] md:text-sm" style={{ color: inkSecond }}>
                        <Editable as="span" value={props?.eyebrow || "Testimonials"} onChange={(v) => onChange?.({ eyebrow: v })} />
                    </p>
                    <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl" style={{ color: ink }}>
                        <Editable as="span" value={props?.title || "Kind words from clients"} onChange={(v) => onChange?.({ title: v })} />
                    </h2>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-3">
                    {items.map((t: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                            className="flex flex-col rounded-2xl p-7 transition-transform hover:scale-[1.02]"
                            style={{ background: surface, border: `1px solid ${surface}` }}
                        >
                            <div className="flex gap-1.5">
                                {[0, 1, 2, 3, 4].map((s) => (
                                    <Star key={s} size={15} fill={ink} style={{ color: ink }} />
                                ))}
                            </div>
                            <p className="mt-5 flex-1 font-mono text-sm md:text-base leading-relaxed" style={{ color: ink }}>
                                <Editable as="span" value={t.quote} onChange={(v) => set("items", items, i, "quote", v)} />
                            </p>
                            <div className="mt-6 flex items-center gap-3.5 pt-5" style={{ borderTop: `1px solid ${surface}` }}>
                                <img src={t.image} alt="" className="h-11 w-11 rounded-full object-cover grayscale" />
                                <div>
                                    <div className="text-base font-bold" style={{ color: ink }}>
                                        <Editable as="span" value={t.name} onChange={(v) => set("items", items, i, "name", v)} />
                                    </div>
                                    <div className="font-mono text-xs" style={{ color: inkSecond }}>
                                        <Editable as="span" value={t.role} onChange={(v) => set("items", items, i, "role", v)} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-14 grid grid-cols-2 gap-6 pt-10 md:grid-cols-4" style={{ borderTop: `1px solid ${surface}` }}>
                    {stats.map((s: any, i: number) => (
                        <div key={i} className="text-center">
                            <div className="text-4xl font-bold md:text-5xl" style={{ color: ink }}>
                                <Editable as="span" value={s.value} onChange={(v) => set("stats", stats, i, "value", v)} />
                            </div>
                            <div className="mt-1.5 font-mono text-xs uppercase tracking-wider md:text-sm" style={{ color: inkSecond }}>
                                <Editable as="span" value={s.label} onChange={(v) => set("stats", stats, i, "label", v)} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-3">
                    {badges.map((b: string, i: number) => (
                        <span key={i} className="inline-flex items-center gap-2 rounded-full px-5 py-2 font-mono text-xs md:text-sm" style={{ background: surface, color: ink }}>
                            <BadgeCheck size={16} />
                            <Editable as="span" value={b} onChange={(v) => onChange?.({ badges: badges.map((x: string, j: number) => (j === i ? v : x)) })} />
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}

export const DeveloperPortfolio6Testimonials = Testimonials;
export default Testimonials;