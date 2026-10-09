// @ts-nocheck
"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Flame, Hand, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const display = "font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif]";

const defaultItems = [
  {
    name: "Wood-Fired Margherita",
    tag: "Signature",
    desc: "San Marzano tomato, fior di latte, basil and cold-pressed olive oil.",
    price: "$16",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80",
    ingredients: [
      { name: "00 Flour", weight: "180G" },
      { name: "San Marzano", weight: "120G" },
      { name: "Fior di Latte", weight: "110G" },
      { name: "Fresh Basil", weight: "6G" },
      { name: "Olive Oil", weight: "12G" },
    ],
    totalWeight: "428G",
    kcal: "820KCAL",
    allergens: "Allergens: gluten, dairy.",
  },
  {
    name: "Ember-Grilled Ribeye",
    tag: "From the fire",
    desc: "Thirty-day aged ribeye, smoked salt, charred leek and bone-marrow butter.",
    price: "$42",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1000&q=80",
    ingredients: [
      { name: "Aged Ribeye", weight: "320G" },
      { name: "Bone Marrow", weight: "40G" },
      { name: "Charred Leek", weight: "90G" },
      { name: "Smoked Salt", weight: "4G" },
      { name: "Thyme", weight: "3G" },
    ],
    totalWeight: "457G",
    kcal: "980KCAL",
    allergens: "Allergens: dairy.",
  },
  {
    name: "Hand-Rolled Tagliatelle",
    tag: "Fresh pasta",
    desc: "Egg-yolk pasta rolled every morning, slow ragù and aged parmesan.",
    price: "$24",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=80",
    ingredients: [
      { name: "Egg Yolk Pasta", weight: "160G" },
      { name: "Beef Ragù", weight: "140G" },
      { name: "Parmesan", weight: "25G" },
      { name: "Red Wine", weight: "30ML" },
      { name: "Rosemary", weight: "2G" },
    ],
    totalWeight: "357G",
    kcal: "760KCAL",
    allergens: "Allergens: gluten, egg, dairy.",
  },
  {
    name: "Charred Garden Salad",
    tag: "Vegetarian",
    desc: "Blistered peppers, smoked burrata, toasted seeds and a warm lemon dressing.",
    price: "$15",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80",
    ingredients: [
      { name: "Sweet Peppers", weight: "110G" },
      { name: "Smoked Burrata", weight: "80G" },
      { name: "Mixed Seeds", weight: "15G" },
      { name: "Baby Greens", weight: "50G" },
      { name: "Lemon Dressing", weight: "20ML" },
    ],
    totalWeight: "255G",
    kcal: "380KCAL",
    allergens: "Allergens: dairy, seeds.",
  },
  {
    name: "Cedar Smoked Salmon",
    tag: "From the sea",
    desc: "Cedar-plank salmon, fennel salad, pickled shallot and dill crème fraîche.",
    price: "$29",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80",
    ingredients: [
      { name: "Salmon Fillet", weight: "200G" },
      { name: "Fennel", weight: "70G" },
      { name: "Pickled Shallot", weight: "25G" },
      { name: "Crème Fraîche", weight: "30G" },
      { name: "Fresh Dill", weight: "4G" },
    ],
    totalWeight: "329G",
    kcal: "540KCAL",
    allergens: "Allergens: fish, dairy.",
  },
  {
    name: "Olive Oil Cake",
    tag: "Dessert",
    desc: "Orange-scented olive oil cake, whipped mascarpone and macerated berries.",
    price: "$11",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1000&q=80",
    ingredients: [
      { name: "Almond Flour", weight: "70G" },
      { name: "Olive Oil", weight: "40ML" },
      { name: "Mascarpone", weight: "50G" },
      { name: "Orange Zest", weight: "5G" },
      { name: "Berries", weight: "45G" },
    ],
    totalWeight: "210G",
    kcal: "430KCAL",
    allergens: "Allergens: nuts, egg, dairy.",
  },
];

function DishStrip({ item, i, t, x, dimsRef, F, T, onReveal, draggedRef, shadow }) {
  const offset = (v) => {
    const d = dimsRef.current;
    return i * d.strip + d.strip / 2 + v - d.vw / 2;
  };
  const imgX = useSpring(useTransform(x, (v) => offset(v) * -0.16), { stiffness: 120, damping: 22 });
  const nameX = useTransform(x, (v) => offset(v) * 0.22);
  const rot = useSpring(useTransform(x, (v) => (offset(v) / (dimsRef.current.strip || 400)) * -14), {
    stiffness: 100,
    damping: 20,
  });
  const faint = `color-mix(in srgb, ${t.ink} 82%, transparent)`;
  const chip = `color-mix(in srgb, ${t.ink} 14%, transparent)`;

  return (
    <div
      className="relative h-[100svh] w-[82vw] shrink-0 select-none overflow-hidden sm:w-[48vw] lg:w-[36vw]"
      style={{ background: t.bg, color: t.ink }}
    >
      <motion.div style={{ x: nameX }} className="absolute inset-x-0 top-[17%] z-10 px-5 text-center">
        <div className={`${display} break-words text-[13vw] uppercase leading-[0.9] sm:text-[6.4vw] lg:text-[4.6vw]`} style={{ color: faint }}>
          {F(i, "name", "h3")}
        </div>
      </motion.div>

      <div className="absolute inset-x-0 top-[33%] z-20 flex justify-center">
        <motion.div style={{ x: imgX, rotate: rot }} className="w-[68%]">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              whileHover={{ scale: 1.07, rotate: 6 }}
              transition={{ type: "spring", stiffness: 160, damping: 14 }}
              animate={{ y: [0, -10, 0] }}
              className="relative aspect-square w-full"
            >
              <div
                className="absolute -bottom-4 left-1/2 h-6 w-3/4 -translate-x-1/2 rounded-full opacity-40 blur-xl"
                style={{ background: shadow }}
              />
              <img
                src={item.image}
                alt={item.name}
                draggable={false}
                className="pointer-events-none h-full w-full select-none rounded-full object-cover shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-30 flex flex-col items-center px-6 text-center">
        <div
          className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]"
          style={{ background: chip }}
        >
          <Flame className="h-3 w-3" />
          {F(i, "tag")}
        </div>
        <div className="max-w-[17rem] font-mono text-[11px] font-bold uppercase leading-relaxed tracking-[0.1em]">
          {F(i, "desc")}
        </div>
        <div className={`${display} mt-2 text-4xl leading-none md:text-5xl`}>{F(i, "price")}</div>
        <button
          type="button"
          onClick={() => {
            if (draggedRef.current) return;
            onReveal(i);
          }}
          className="group mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-black uppercase tracking-wider transition hover:scale-[1.04] active:scale-95"
          style={{ background: t.ink, color: t.bg }}
        >
          {T("revealLabel", "Reveal the dish")}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
        </button>
      </div>
    </div>
  );
}

function DishDialog({ item, i, t, c, F, T, setItem, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const ings = item.ingredients || [];
  const I = (j, field) => (
    <Editable
      as="span"
      value={ings[j][field] ?? ""}
      onChange={(v) => setItem(i, { ingredients: ings.map((g, idx) => (idx === j ? { ...g, [field]: v } : g)) })}
    />
  );

  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-y-auto"
      style={{ background: t.bg, color: t.ink }}
      initial={{ clipPath: "circle(0% at 50% 85%)" }}
      animate={{ clipPath: "circle(160% at 50% 85%)" }}
      exit={{ clipPath: "circle(0% at 50% 85%)" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative mx-auto flex min-h-full w-full max-w-7xl flex-col items-center px-5 pb-12 pt-20 md:px-10">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="fixed right-5 top-5 z-[90] grid h-12 w-12 place-items-center rounded-full transition hover:scale-[1.02] active:scale-95"
          style={{ background: t.ink, color: t.bg }}
        >
          <X className="h-5 w-5" />
        </button>

        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`${display} w-full break-words text-center text-[15vw] uppercase leading-[0.86] md:text-[9vw]`}
        >
          {F(i, "name", "h3")}
        </motion.div>

        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -80 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative -mt-[6vw] aspect-square w-[min(76vw,44svh)] md:-mt-[3vw]"
        >
          <div className="absolute -bottom-5 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full opacity-40 blur-2xl" style={{ background: c.inkSecond }} />
          <motion.img
            animate={{ rotate: 360 }}
            transition={{ duration: 80, ease: "linear", repeat: Infinity }}
            src={item.image}
            alt={item.name}
            draggable={false}
            className="h-full w-full select-none rounded-full object-cover shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ y: -200, opacity: 0, rotate: -12 }}
          animate={{ y: 0, opacity: 1, rotate: -6 }}
          transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.8 }}
          className="relative z-10 mt-10 w-[250px] lg:absolute lg:left-[3%] lg:top-[36%] lg:mt-0"
        >
          <div className="p-4 shadow-2xl" style={{ background: c.ink, color: c.inkSecond }}>
            <div className={`${display} text-2xl uppercase tracking-wide`}>{T("receiptTitle", "Ingredients")}</div>
            <div className="mt-2 font-mono text-[10px] font-bold uppercase leading-5">{F(i, "tag")}</div>
            <div className="my-3 border-t border-dashed" style={{ borderColor: c.inkSecond }} />
            <ul className="space-y-1.5 font-mono text-[11px] font-bold uppercase">
              {ings.map((g, j) => (
                <li key={j} className="flex items-baseline justify-between gap-3">
                  <span className="flex items-baseline gap-1.5">
                    <span className="h-1 w-1 shrink-0 rounded-full" style={{ background: c.inkSecond }} />
                    {I(j, "name")}
                  </span>
                  <span className="shrink-0">{I(j, "weight")}</span>
                </li>
              ))}
            </ul>
            <div className="my-3 border-t border-dashed" style={{ borderColor: c.inkSecond }} />
            <div className="flex justify-between font-mono text-[11px] font-bold uppercase">
              <span>{T("totalLabel", "Total weight")}</span>
              <span>{F(i, "totalWeight")}</span>
            </div>
            <div className="mt-1 flex justify-between font-mono text-[11px] font-bold uppercase">
              <span>{T("kcalLabel", "Calories")}</span>
              <span>{F(i, "kcal")}</span>
            </div>
            <div className="my-3 border-t border-dashed" style={{ borderColor: c.inkSecond }} />
            <div className="font-mono text-[10px] font-bold uppercase leading-4">{F(i, "allergens")}</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="relative z-10 mt-8 max-w-[280px] text-center lg:absolute lg:right-[3%] lg:top-[40%] lg:mt-0 lg:text-left"
        >
          <div className="font-mono text-[11px] font-bold uppercase leading-relaxed tracking-[0.12em]">{F(i, "desc")}</div>
          <div className={`${display} mt-4 text-6xl leading-none`} style={{ color: t.bg === c.accent ? c.inkSecond : c.accent }}>
            {F(i, "price")}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const c = { bg, bgSecond, ink, inkSecond, surface, accent };

  const items = props?.items?.length ? props.items : defaultItems;

  const T = (key, def, as = "span") => (
    <Editable as={as} value={props?.[key] || def} onChange={(v) => onChange?.({ [key]: v })} />
  );
  const setItem = (i, patch) => onChange?.({ items: items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)) });
  const F = (i, field, as = "span") => (
    <Editable as={as} value={items[i][field] ?? ""} onChange={(v) => setItem(i, { [field]: v })} />
  );

  const tones = [
    { bg: accent, ink: inkSecond },
    { bg: bgSecond, ink: inkSecond },
    { bg: bg, ink: ink },
    { bg: `color-mix(in srgb, ${accent} 42%, ${bgSecond})`, ink: inkSecond },
    { bg: `color-mix(in srgb, ${bg} 52%, ${bgSecond})`, ink: inkSecond },
    { bg: inkSecond, ink: ink },
  ];

  const x = useMotionValue(0);
  const viewRef = useRef(null);
  const trackRef = useRef(null);
  const dimsRef = useRef({ vw: 0, strip: 400 });
  const maxRef = useRef(0);
  const draggedRef = useRef(false);
  const [maxDrag, setMaxDrag] = useState(0);
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);

  const progress = useTransform(x, (v) => (maxRef.current ? Math.min(1, Math.max(0, -v / maxRef.current)) : 0));

  useEffect(() => {
    const measure = () => {
      const vw = viewRef.current?.clientWidth || 0;
      const tw = trackRef.current?.scrollWidth || 0;
      const strip = trackRef.current?.firstElementChild?.clientWidth || 400;
      dimsRef.current = { vw, strip };
      maxRef.current = Math.max(0, tw - vw);
      setMaxDrag(maxRef.current);
    };
    measure();
    const ro = new ResizeObserver(measure);
    viewRef.current && ro.observe(viewRef.current);
    trackRef.current && ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [items.length]);

  useEffect(() => {
    const unsub = x.on("change", (v) => {
      const idx = Math.round(-v / (dimsRef.current.strip || 400));
      setActive(Math.min(items.length - 1, Math.max(0, idx)));
    });
    return () => unsub();
  }, [items.length]);

  const step = (dir) => {
    const s = dimsRef.current.strip || 400;
    const idx = Math.round(-x.get() / s) + dir;
    const target = Math.max(-maxRef.current, Math.min(0, -idx * s));
    animate(x, target, { type: "spring", stiffness: 140, damping: 24 });
  };

  const glass = `color-mix(in srgb, ${bg} 72%, transparent)`;
  const go = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="projects" className="relative w-full" style={{ background: bg, color: ink }}>
      <div
        ref={viewRef}
        className="relative h-[100svh] w-full overflow-hidden"
        onWheel={(e) => {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            x.set(Math.max(-maxRef.current, Math.min(0, x.get() - e.deltaX)));
          }
        }}
      >
        {/* floating header */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-start justify-between gap-3 p-4 md:p-8">
          <div
            className="pointer-events-auto flex items-center gap-3 rounded-full py-2.5 pl-4 pr-5 backdrop-blur-xl"
            style={{ background: glass, border: `1px solid ${surface}`, color: ink }}
          >
            <Flame className="h-4 w-4" style={{ color: accent }} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">{T("title", "The Menu")}</span>
            <span className="hidden items-center gap-1.5 text-xs font-semibold opacity-80 sm:flex">
              <motion.span animate={{ x: [0, 9, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                <Hand className="h-3.5 w-3.5" />
              </motion.span>
              {T("hint", "Hold & drag to explore")}
            </span>
          </div>

          <div
            className="pointer-events-auto flex items-center gap-2 rounded-full py-1.5 pl-4 pr-1.5 backdrop-blur-xl"
            style={{ background: glass, border: `1px solid ${surface}`, color: ink }}
          >
            <span className="font-mono text-xs font-bold tracking-widest">
              <Editable as="span" value={String(active + 1).padStart(2, "0") + " / " + String(items.length).padStart(2, "0")} />
            </span>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => step(-1)}
              className="grid h-9 w-9 place-items-center rounded-full transition hover:scale-[1.02] active:scale-95"
              style={{ background: surface }}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => step(1)}
              className="grid h-9 w-9 place-items-center rounded-full transition hover:scale-[1.02] active:scale-95"
              style={{ background: accent, color: inkSecond }}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* draggable canvas */}
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.12}
          dragTransition={{ power: 0.28, timeConstant: 260 }}
          onDragStart={() => {
            draggedRef.current = true;
          }}
          onDragEnd={() => {
            window.setTimeout(() => {
              draggedRef.current = false;
            }, 80);
          }}
          style={{ x }}
          className="flex h-full w-max cursor-grab active:cursor-grabbing"
        >
          {items.map((item, i) => (
            <DishStrip
              key={i}
              item={item}
              i={i}
              t={tones[(item.tone ?? i) % tones.length]}
              x={x}
              dimsRef={dimsRef}
              F={F}
              T={T}
              draggedRef={draggedRef}
              shadow={inkSecond}
              onReveal={setOpenIndex}
            />
          ))}

          {/* closing strip */}
          <div
            className="relative flex h-[100svh] w-[88vw] shrink-0 select-none flex-col items-center justify-center overflow-hidden px-8 text-center sm:w-[56vw] lg:w-[42vw]"
            style={{ background: inkSecond, color: ink }}
          >
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
              style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 65%)` }}
            />
            <div className="relative z-10 text-xs font-black uppercase tracking-[0.3em]" style={{ color: accent }}>
              {T("endEyebrow", "Still hungry?")}
            </div>
            <div className={`${display} relative z-10 mt-4 break-words text-[17vw] uppercase leading-[0.88] sm:text-[8vw] lg:text-[6vw]`}>
              {T("endTitle", "Pull up a chair", "h3")}
            </div>
            <div className="relative z-10 mt-5 max-w-sm font-mono text-[11px] font-bold uppercase leading-relaxed tracking-[0.1em] opacity-80">
              {T("endText", "Set menus from $28. Kitchen open every evening, walk-ins always welcome.")}
            </div>
            <a
              href="#contact"
              onClick={(e) => go(e, "#contact")}
              className="group relative z-10 mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-black uppercase tracking-wider transition hover:scale-[1.04] active:scale-95"
              style={{ background: accent, color: inkSecond }}
            >
              {T("endCta", "Find us")}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </div>
        </motion.div>

        {/* progress */}
        <div className="absolute inset-x-0 bottom-0 z-40 h-1.5" style={{ background: surface }}>
          <motion.div className="h-full origin-left" style={{ scaleX: progress, background: accent }} />
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && items[openIndex] && (
          <DishDialog
            key="dialog"
            item={items[openIndex]}
            i={openIndex}
            t={tones[(items[openIndex].tone ?? openIndex) % tones.length]}
            c={c}
            F={F}
            T={T}
            setItem={setItem}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}