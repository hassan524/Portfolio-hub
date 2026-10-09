// @ts-nocheck
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";

    const cards = [
        { Icon: Phone, key: "phone", label: "Phone", value: props?.phone || "+92 300 123 4567" },
        { Icon: Mail, key: "email", label: "Email", value: props?.email || "hello@aliciasmith.dev" },
        { Icon: MapPin, key: "address", label: "Address", value: props?.address || "24 Clifton Block 5, Karachi, Pakistan" },
        { Icon: Clock, key: "hours", label: "Hours", value: props?.hours || "Mon – Fri, 9:00 AM – 6:00 PM" },
    ];
    const badges = props?.badges || ["Replies within 24h", "Free 30-min intro call", "Remote worldwide"];

    return (
        <section id="contact" className="relative overflow-hidden" style={{ background: bgSecond, borderTop: `1px solid ${surface}` }}>
            <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full blur-3xl" style={{ background: accent, opacity: 0.06 }} />
            <div className="relative mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
                <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14 text-center">
                    <p className="font-mono text-xs uppercase tracking-[0.3em] md:text-sm" style={{ color: inkSecond }}>
                        <Editable as="span" value={props?.eyebrow || "Contact"} onChange={(v) => onChange?.({ eyebrow: v })} />
                    </p>
                    <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl" style={{ color: ink }}>
                        <Editable as="span" value={props?.title || "Let's build something together"} onChange={(v) => onChange?.({ title: v })} />
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl font-mono text-sm leading-relaxed md:text-base" style={{ color: inkSecond }}>
                        <Editable as="span" value={props?.subtitle || "Have a project in mind or just want to say hi? Reach out using any of the details below."} onChange={(v) => onChange?.({ subtitle: v })} />
                    </p>
                </motion.div>

                <div className="grid gap-5 sm:grid-cols-2">
                    {cards.map(({ Icon, key, label, value }, i) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="flex items-start gap-4 rounded-2xl p-6 transition-transform hover:scale-[1.02]"
                            style={{ background: surface, border: `1px solid ${surface}` }}
                        >
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: accent, color: bg }}>
                                <Icon size={20} />
                            </span>
                            <div className="min-w-0">
                                <div className="font-mono text-xs uppercase tracking-wider" style={{ color: inkSecond }}>
                                    <Editable as="span" value={label} />
                                </div>
                                <div className="mt-1 break-words text-base md:text-lg font-bold" style={{ color: ink }}>
                                    <Editable as="span" value={value} onChange={(v) => onChange?.({ [key]: v })} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 rounded-2xl p-8 text-center md:p-12"
                    style={{ background: surface, border: `1px solid ${surface}` }}
                >
                    <Sparkles size={24} className="mx-auto" style={{ color: ink }} />
                    <h3 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: ink }}>
                        <Editable as="span" value={props?.cardTitle || "Currently accepting new projects"} onChange={(v) => onChange?.({ cardTitle: v })} />
                    </h3>
                    <p className="mx-auto mt-2 max-w-lg font-mono text-sm leading-relaxed md:text-base" style={{ color: inkSecond }}>
                        <Editable as="span" value={props?.cardText || "Available for freelance work and full-time roles starting next month."} onChange={(v) => onChange?.({ cardText: v })} />
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        {badges.map((b: string, i: number) => (
                            <span key={i} className="rounded-full px-4 py-2 font-mono text-xs md:text-sm" style={{ border: `1px solid ${surface}`, color: ink }}>
                                <Editable as="span" value={b} onChange={(v) => onChange?.({ badges: badges.map((x: string, j: number) => (j === i ? v : x)) })} />
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export const DeveloperPortfolio6Contact = Contact;
export default Contact;