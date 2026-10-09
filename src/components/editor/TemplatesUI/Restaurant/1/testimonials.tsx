// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, BadgeCheck, Plus, Quote, Star, Trophy } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const display = "font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif]";
const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=300&q=80`;

const defaultReviews = [
  { quote: "The margherita alone is worth the trip. Blistered crust, bright tomato, and a smoky finish I still think about a week later.", name: "Sofia Marin", role: "Food writer", rating: 5, avatar: img("1544005313-94ddf0286df2") },
  { quote: "We came for a quick lunch and stayed until the candles were lit. The ribeye is cooked exactly the way it should be.", name: "James Whitfield", role: "Regular since 2016", rating: 5, avatar: img("1506794778202-cad84cf45f1d") },
  { quote: "Warm room, brilliant staff and pasta that tastes like someone's grandmother made it. Which, apparently, she did.", name: "Aisha Rahman", role: "Local guide", rating: 5, avatar: img("1534528741775-53994a69daeb") },
  { quote: "Our whole team dinner, thirty people, zero stress. Every plate arrived hot and the wine pairing was spot on.", name: "Tom Becker", role: "Team lead, Northline", rating: 5, avatar: img("1507003211169-0a1dd7228f2d") },
];
const defaultStats = [
  { value: "4.9", label: "Average guest rating" },
  { value: "38K", label: "Pizzas fired last year" },
  { value: "12", label: "Years on the same fire" },
  { value: "80km", label: "Max distance to any farm" },
];
const defaultBadges = [{ text: "Top 10 casual dining" }, { text: "Guests' choice 2025" }, { text: "Sustainable kitchen" }];
const defaultAwards = [
  { year: "2025", title: "Best wood-fired kitchen", by: "Metro Dining Awards" },
  { year: "2024", title: "Neighborhood favorite", by: "City Eats Readers' Poll" },
  { year: "2023", title: "Best new wine list", by: "Table & Vine Review" },
];
const defaultFaqs = [
  { q: "Do you have vegetarian and vegan dishes?", a: "Yes. A third of the menu is vegetarian and most of it can be made vegan. Just tell us when you sit down." },
  { q: "Can you handle allergies?", a: "Our ingredient lists are posted for every dish and the kitchen is happy to adapt. Please mention any allergy to your server." },
  { q: "Is there outdoor seating?", a: "We have a heated patio with twenty seats, open whenever the weather allows." },
  { q: "Is the restaurant family friendly?", a: "Always. Kids' portions, high chairs and plenty of dough to play with." },
];

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const reviews = props?.reviews?.length ? props.reviews : defaultReviews;
  const stats = props?.stats?.length ? props.stats : defaultStats;
  const badges = props?.badges?.length ? props.badges : defaultBadges;
  const awards = props?.awards?.length ? props.awards : defaultAwards;
  const faqs = props?.faqs?.length ? props.faqs : defaultFaqs;

  const [active, setActive] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((a) => (a + 1) % reviews.length), 7000);
    return () => window.clearInterval(id);
  }, [reviews.length]);

  const T = (key, def, as = "span") => (
    <Editable as={as} value={props?.[key] || def} onChange={(v) => onChange?.({ [key]: v })} />
  );
  const L = (key, list, i, field, as = "span") => (
    <Editable
      as={as}
      value={list[i][field] ?? ""}
      onChange={(v) => onChange?.({ [key]: list.map((it, idx) => (idx === i ? { ...it, [field]: v } : it)) })}
    />
  );

  const reveal = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  };
  const cur = reviews[active] || reviews[0];

  return (
    <section id="testimonials" className="relative w-full overflow-hidden" style={{ background: bg, color: ink }}>
      <div
        className="pointer-events-none absolute -right-40 top-20 h-[60vmin] w-[60vmin] rounded-full opacity-30 blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 65%)` }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-10 lg:py-36">
        {/* header */}
        <motion.div {...reveal} className="max-w-3xl">
          <div className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: accent }}>
            {T("eyebrow", "Kind words")}
          </div>
          <div className={`${display} mt-3 text-5xl uppercase leading-[0.92] md:text-8xl`}>
            {T("title", "Tables we've made happy", "h2")}
          </div>
        </motion.div>

        {/* quote + reviewer list */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div className="relative min-h-[340px]">
            <Quote className="h-14 w-14" style={{ color: accent }} />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="mt-6 text-2xl font-bold leading-snug md:text-4xl">{L("reviews", reviews, active, "quote")}</p>
                <div className="mt-8 flex items-center gap-4">
                  <img src={cur.avatar} alt={cur.name} draggable={false} className="h-14 w-14 rounded-full object-cover" />
                  <div>
                    <div className="text-base font-black uppercase tracking-wide">{L("reviews", reviews, active, "name")}</div>
                    <div className="text-xs font-semibold uppercase tracking-wider opacity-70">{L("reviews", reviews, active, "role")}</div>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {Array.from({ length: Math.min(5, Number(cur.rating) || 5) }).map((_, s) => (
                      <Star key={s} className="h-4 w-4" style={{ color: accent, fill: accent }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            {reviews.map((r, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className="group relative flex w-full items-center gap-4 border-t py-5 text-left transition-all duration-300 hover:pl-3"
                style={{ borderColor: surface, opacity: i === active ? 1 : 0.55 }}
              >
                <img src={r.avatar} alt={r.name} draggable={false} className="h-11 w-11 rounded-full object-cover" />
                <span className="flex-1">
                  <span className="block text-sm font-black uppercase tracking-wide">{L("reviews", reviews, i, "name")}</span>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider opacity-70">{L("reviews", reviews, i, "role")}</span>
                </span>
                {i === active && (
                  <motion.span
                    layoutId="reviewDot"
                    className="h-3 w-3 rounded-full"
                    style={{ background: accent }}
                  />
                )}
              </button>
            ))}
            <div className="border-t" style={{ borderColor: surface }} />
          </div>
        </div>

        {/* stats */}
        <div className="mt-24 grid grid-cols-2 gap-x-6 gap-y-10 border-y py-12 md:grid-cols-4" style={{ borderColor: surface }}>
          {stats.map((s, i) => (
            <motion.div key={i} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }}>
              <div className={`${display} text-6xl leading-none md:text-7xl`} style={{ color: accent }}>
                {L("stats", stats, i, "value")}
              </div>
              <div className="mt-2 text-[11px] font-black uppercase tracking-[0.18em] opacity-80">{L("stats", stats, i, "label")}</div>
            </motion.div>
          ))}
        </div>

        {/* badges + awards */}
        <div className="mt-20 grid gap-14 lg:grid-cols-2">
          <motion.div {...reveal}>
            <div className={`${display} text-4xl uppercase md:text-5xl`}>{T("awardsTitle", "Trophies on the shelf", "h3")}</div>
            <div className="mt-6 flex flex-wrap gap-3">
              {badges.map((b, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em]"
                  style={{ background: surface }}
                >
                  <BadgeCheck className="h-4 w-4" style={{ color: accent }} />
                  {L("badges", badges, i, "text")}
                </span>
              ))}
            </div>
            <div className="mt-8">
              {awards.map((a, i) => (
                <div key={i} className="group flex items-center gap-4 border-t py-5 transition-all duration-300 hover:pl-3" style={{ borderColor: surface }}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full" style={{ background: accent, color: inkSecond }}>
                    {i % 2 ? <Award className="h-5 w-5" /> : <Trophy className="h-5 w-5" />}
                  </span>
                  <span className="flex-1">
                    <span className="block text-base font-black uppercase tracking-wide">{L("awards", awards, i, "title")}</span>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider opacity-70">{L("awards", awards, i, "by")}</span>
                  </span>
                  <span className={`${display} text-3xl`}>{L("awards", awards, i, "year")}</span>
                </div>
              ))}
              <div className="border-t" style={{ borderColor: surface }} />
            </div>
          </motion.div>

          <motion.div {...reveal}>
            <div className={`${display} text-4xl uppercase md:text-5xl`}>{T("faqTitle", "Good to know", "h3")}</div>
            <div className="mt-6">
              {faqs.map((f, i) => (
                <div key={i} className="border-t" style={{ borderColor: surface }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-base font-bold md:text-lg">{L("faqs", faqs, i, "q")}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                      style={{ background: openFaq === i ? accent : surface, color: openFaq === i ? inkSecond : ink }}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-5 text-sm leading-relaxed opacity-80 md:text-base">{L("faqs", faqs, i, "a")}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="border-t" style={{ borderColor: surface }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}