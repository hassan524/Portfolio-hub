// @ts-nocheck
import { motion } from "framer-motion";
import { BookOpen, Compass, Users } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const ICONS: any = { story: BookOpen, process: Compass, team: Users };

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const DEFAULT_ITEMS = [
    { icon: "story", num: "01", title: "Our Story", text: "Forgeline started in 2016 when two engineers got tired of watching good ideas stall inside slow agencies. Today we are a studio of fourteen.", tags: ["Founded 2016", "San Francisco", "60+ launches"] },
    { icon: "process", num: "02", title: "How We Work", text: "Weekly demos, a shared roadmap and clean documented code. You always know what is shipping next and what it costs.", tags: ["Weekly demos", "Fixed scope", "You own the code", "60 days support"] },
    { icon: "team", num: "03", title: "Who We Are", text: "Senior engineers and designers, all in-house. You talk directly to the people building your product.", tags: ["14 specialists", "Engineers", "Designers", "Product leads"] },
  ];
  const items = Array.isArray(props?.items) && props.items.length > 0 ? props.items : DEFAULT_ITEMS;
  const setItem = (i: number, k: string, v: any) => onChange?.({ items: items.map((x: any, j: number) => (j === i ? { ...x, [k]: v } : x)) });

  return (
    <section id="about" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <Editable as="p" value={props?.eyebrow || "ABOUT US"} onChange={(v: string) => onChange?.({ eyebrow: v })} className="text-xs font-semibold tracking-[0.25em]" style={{ color: inkSecond }} />
          <Editable as="h2" value={props?.title || "A small studio with a high bar."} onChange={(v: string) => onChange?.({ title: v })} className="mt-4 font-['Poppins'] text-3xl font-bold tracking-tight sm:text-5xl" style={{ color: ink }} />
          <Editable as="p" value={props?.subtitle || "Fourteen people, one team, and a simple promise: no handoffs, no middlemen, no surprises."} onChange={(v: string) => onChange?.({ subtitle: v })} className="mt-5 text-lg leading-relaxed" style={{ color: inkSecond }} />
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((it: any, i: number) => {
            const Icon = ICONS[it.icon] || BookOpen;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08, ease: "easeOut" }}
                className="relative flex min-w-0 flex-col rounded-3xl border p-8 transition duration-300 hover:-translate-y-1"
                style={{ backgroundColor: surface, borderColor: surface }}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border" style={{ backgroundColor: bg, borderColor: surface, color: ink }}><Icon size={24} /></span>
                  <Editable as="span" value={it.num} onChange={(v: string) => setItem(i, "num", v)} className="font-['Poppins'] text-5xl font-bold opacity-20" style={{ color: inkSecond }} />
                </div>
                <Editable as="h3" value={it.title} onChange={(v: string) => setItem(i, "title", v)} className="mt-8 font-['Poppins'] text-2xl font-semibold" style={{ color: ink }} />
                <Editable as="p" value={it.text} onChange={(v: string) => setItem(i, "text", v)} className="mt-3 leading-relaxed" style={{ color: inkSecond }} />
                <div className="mt-6 flex flex-wrap gap-2">
                  {it.tags?.map((t: string, k: number) => (
                    <Editable key={k} as="span" value={t} onChange={(v: string) => setItem(i, "tags", it.tags.map((x: string, m: number) => (m === k ? v : x)))} className="rounded-full border px-3.5 py-1.5 text-sm" style={{ borderColor: inkSecond, color: inkSecond }} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const SaaSProduct5About = About;
export const AboutSimple = About;
export default About;
