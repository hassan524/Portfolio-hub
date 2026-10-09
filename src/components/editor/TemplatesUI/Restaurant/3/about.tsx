// @ts-nocheck
import { motion } from "framer-motion";
import { Anchor, Flame, Sun, Heart } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FAF5EE";
  const bgSecond = theme?.["bg-second"] || "#FFFFFF";
  const ink = theme?.ink || "#14213D";
  const inkSecond = theme?.["ink-second"] || "#64748B";
  const accent = theme?.accent || "#E07A5F";
  const surface = theme?.surface || "#F1E9DE";

  const DEFAULT_PILLARS = [
    {
      title: "Morning Boat Deliveries",
      text: "Every morning at 6:00 AM, our chefs meet independent skiff fishermen at the docks to select wild sea bass, bluefin, and sweet rock crab.",
    },
    {
      title: "Wood Oven & Clay Hearth",
      text: "Sourdough loaves, whole coastal fish, and sweet heirloom peppers blister in our olive-wood fired masonry oven.",
    },
    {
      title: "The Lemon Garden Terrace",
      text: "Dine outdoors under canopy olive trees and fragrant Amalfi lemon blossoms with gentle afternoon sea breezes.",
    },
  ];

  const pillars = Array.isArray(props?.pillars) && props.pillars.length > 0 ? props.pillars : DEFAULT_PILLARS;
  const setPillar = (i: number, k: string, v: string) =>
    onChange?.({ pillars: pillars.map((x: any, j: number) => (j === i ? { ...x, [k]: v } : x)) });

  return (
    <section id="about" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bgSecond }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Atmospheric Visual */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="overflow-hidden rounded-[2.5rem] border shadow-lg" style={{ borderColor: surface }}>
              <img
                src={props?.aboutImage || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"}
                alt="Chefs preparing grilled seafood over wood fire"
                className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Right: Story & Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-2 font-serif text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
              <span>☀️</span>
              <Editable
                as="span"
                value={props?.eyebrow || "OUR BRASSERIE HERITAGE"}
                onChange={(v: string) => onChange?.({ eyebrow: v })}
              />
            </div>

            <Editable
              as="h2"
              value={props?.title || "From the morning tide to the wood-fired hearth."}
              onChange={(v: string) => onChange?.({ title: v })}
              className="mt-4 font-serif text-3xl font-bold tracking-tight sm:text-5xl"
              style={{ color: ink }}
            />

            <Editable
              as="p"
              value={
                props?.subtitle ||
                "Casa Riviera was born from our love of relaxed seaside tavernas from the Amalfi coast to the French Riviera. Simple food, intense freshness, and laughter that lasts late into the evening."
              }
              onChange={(v: string) => onChange?.({ subtitle: v })}
              className="mt-5 text-base sm:text-lg leading-relaxed"
              style={{ color: inkSecond }}
            />

            <div className="mt-8 space-y-4">
              {pillars.map((p: any, i: number) => (
                <div
                  key={i}
                  className="rounded-2xl border p-5 transition duration-200 hover:border-orange-300"
                  style={{ backgroundColor: bg, borderColor: surface }}
                >
                  <Editable
                    as="h3"
                    value={p.title}
                    onChange={(v: string) => setPillar(i, "title", v)}
                    className="font-serif text-base font-bold"
                    style={{ color: ink }}
                  />
                  <Editable
                    as="p"
                    value={p.text}
                    onChange={(v: string) => setPillar(i, "text", v)}
                    className="mt-1 text-xs leading-relaxed"
                    style={{ color: inkSecond }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export const Restaurant3About = About;
export const AboutSimple = About;
export default About;
