// @ts-nocheck
import { Target, Layers, Cpu, Globe, Check, Users } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";

    const features = props?.features || [
        { icon: "Target", title: "Strategy first", desc: "Every engagement starts with a deep-dive into your business model and growth levers." },
        { icon: "Layers", title: "Full-stack delivery", desc: "Design, engineering, and infrastructure under one roof — no handoff gaps." },
        { icon: "Cpu", title: "AI-native process", desc: "We embed intelligent automation into everything we ship, so your product gets smarter." },
        { icon: "Globe", title: "Global reach", desc: "Distributed teams across four continents, aligned to your time zone." },
    ];

    const values = props?.values || ["Outcome-driven", "Radically transparent", "Senior-only teams", "Weekly demos"];
    const team = props?.team || [
        { name: "Marcus Chen", role: "Founding Partner", img: "https://images.unsplash.com/photo-1560250097-0b93528c3d3a?w=400&q=80" },
        { name: "Priya Sharma", role: "Head of Design", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
        { name: "James Okafor", role: "VP Engineering", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
    ];

    const iconMap: any = { Target, Layers, Cpu, Globe };

    return (
        <section id="about" className="py-24 px-6 lg:px-8" style={{ background: bgSecond }}>
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <Editable
                            as="span"
                            value={props?.eyebrow || "Who we are"}
                            className="text-sm font-semibold uppercase tracking-wider mb-4 block"
                            style={{ color: accent }}
                        />
                        <Editable
                            as="h2"
                            value={props?.title || "A consultancy built for the post-template era."}
                            onChange={(v) => onChange?.({ title: v })}
                            className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
                            style={{ color: ink }}
                        />
                        <Editable
                            as="p"
                            value={props?.story || "Founded in 2012, Nexora started as a two-person studio obsessed with shipping software that actually moves numbers. Today we're a 40-person team across New York, London, and Bangalore, but the obsession hasn't changed. We don't sell hours — we sell outcomes. Every project starts with a strategy sprint, ends with a working product, and comes with a 90-day support window built in."}
                            onChange={(v) => onChange?.({ story: v })}
                            className="text-lg leading-relaxed mb-8"
                            style={{ color: inkSecond }}
                        />
                        <div className="flex flex-wrap gap-2">
                            {values.map((val: string, i: number) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                                    style={{ background: surface, color: ink }}
                                >
                                    <Check className="w-4 h-4" style={{ color: accent }} />
                                    <Editable
                                        value={val}
                                        onChange={(v) => {
                                            const next = [...values];
                                            next[i] = v;
                                            onChange?.({ values: next });
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {features.map((f: any, i: number) => {
                            const Icon = iconMap[f.icon] || Target;
                            return (
                                <div
                                    key={i}
                                    className="p-6 rounded-2xl transition-all hover:scale-[1.02]"
                                    style={{ background: surface, border: `1px solid ${surface}` }}
                                >
                                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: accent }}>
                                        <Icon className="w-5 h-5" style={{ color: bg }} />
                                    </div>
                                    <Editable
                                        as="h3"
                                        value={f.title}
                                        onChange={(v) => {
                                            const next = [...features];
                                            next[i] = { ...next[i], title: v };
                                            onChange?.({ features: next });
                                        }}
                                        className="text-lg font-semibold mb-2"
                                        style={{ color: ink }}
                                    />
                                    <Editable
                                        as="p"
                                        value={f.desc}
                                        onChange={(v) => {
                                            const next = [...features];
                                            next[i] = { ...next[i], desc: v };
                                            onChange?.({ features: next });
                                        }}
                                        className="text-sm leading-relaxed"
                                        style={{ color: inkSecond }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-20">
                    <div className="flex items-center gap-3 mb-8">
                        <Users className="w-5 h-5" style={{ color: accent }} />
                        <Editable as="h3" value={props?.teamTitle || "Leadership team"} className="text-xl font-semibold" style={{ color: ink }} />
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {team.map((member: any, i: number) => (
                            <div
                                key={i}
                                className="rounded-2xl overflow-hidden transition-all hover:scale-[1.02]"
                                style={{ background: surface, border: `1px solid ${surface}` }}
                            >
                                <img src={member.img} alt={member.name} className="w-full h-64 object-cover" />
                                <div className="p-5">
                                    <Editable
                                        as="h4"
                                        value={member.name}
                                        onChange={(v) => {
                                            const next = [...team];
                                            next[i] = { ...next[i], name: v };
                                            onChange?.({ team: next });
                                        }}
                                        className="text-lg font-semibold"
                                        style={{ color: ink }}
                                    />
                                    <Editable
                                        as="p"
                                        value={member.role}
                                        onChange={(v) => {
                                            const next = [...team];
                                            next[i] = { ...next[i], role: v };
                                            onChange?.({ team: next });
                                        }}
                                        className="text-sm mt-1"
                                        style={{ color: accent }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
