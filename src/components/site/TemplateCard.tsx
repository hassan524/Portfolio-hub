import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import type { Template } from "@/lib/templates";

export function TemplateCard({ t, index = 0 }: { t: Template; index?: number }) {
  const [bg, ink, accent] = t.palette;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      className="group relative"
    >
      <div
        className="block overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:shadow-lift transition-all duration-500 cursor-pointer"
      >
        <div
          className="relative aspect-[4/3] overflow-hidden"
          style={{ backgroundColor: bg }}
        >
          <TemplatePreview t={t} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
          {t.isPro && (
            <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/80 text-white px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase backdrop-blur">
              <Lock className="h-3 w-3" /> Pro
            </span>
          )}
        </div>
        <div className="flex items-start justify-between gap-3 p-5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-xl">{t.name}</h3>
              <span className="text-[10px] uppercase tracking-wider text-ink-soft border border-border rounded-full px-2 py-0.5">
                {t.category}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-soft leading-relaxed">{t.tagline}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TemplatePreview({ t }: { t: Template }) {
  const [bg, ink, accent] = t.palette;
  const style = { color: ink } as const;

  if (t.layout === "editorial") {
    return (
      <div className="absolute inset-0 p-6" style={style}>
        <div className="flex items-center justify-between text-[9px] tracking-[0.2em] uppercase opacity-70">
          <span>{t.name}</span>
          <span>Vol.01</span>
        </div>
        <div className="mt-8" style={{ fontFamily: "'Instrument Serif', serif" }}>
          <div className="text-[42px] leading-[0.95]">Words that</div>
          <div className="text-[42px] leading-[0.95] italic" style={{ color: accent }}>
            find readers.
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="aspect-square rounded"
              style={{ background: i === 1 ? accent : `${ink}18` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (t.layout === "mono") {
    return (
      <div className="absolute inset-0 p-6 font-mono text-[10px]" style={style}>
        <div className="flex items-center gap-1.5 opacity-60">
          <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
          <span>~ /{t.slug}</span>
        </div>
        <div className="mt-6 space-y-1.5">
          <div>&gt; whoami</div>
          <div className="text-[22px] leading-tight" style={{ fontFamily: "inherit" }}>
            engineer.build()
          </div>
          <div className="opacity-60">// shipping since 2019</div>
        </div>
        <div className="mt-6 space-y-1">
          {["const stack = [", "  'typescript',", "  'rust', 'go',", "]"].map((l, i) => (
            <div key={i} className="opacity-80">
              {l}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (t.layout === "gallery") {
    return (
      <div className="absolute inset-0 grid grid-cols-3 gap-1.5 p-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="rounded-sm"
            style={{
              background: i === 4 ? accent : `${ink}${i % 2 ? "20" : "10"}`,
            }}
          />
        ))}
      </div>
    );
  }

  if (t.layout === "split") {
    return (
      <div className="absolute inset-0 grid grid-cols-5" style={style}>
        <div className="col-span-3 p-6 flex flex-col justify-between">
          <span className="text-[9px] tracking-[0.2em] uppercase opacity-60">Design · 2024</span>
          <div>
            <div className="text-[38px] leading-[0.95] font-semibold">Big ideas,</div>
            <div className="text-[38px] leading-[0.95] font-semibold" style={{ color: accent }}>
              small pixels.
            </div>
          </div>
        </div>
        <div className="col-span-2 relative" style={{ background: accent }}>
          <div className="absolute inset-4 rounded-lg" style={{ background: `${bg}` }} />
        </div>
      </div>
    );
  }

  if (t.layout === "grid") {
    return (
      <div className="absolute inset-0 p-4" style={style}>
        <div className="text-[26px] leading-none font-semibold">Studio {t.name}</div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-md p-2 text-[9px]"
              style={{ background: [accent, `${ink}12`, `${ink}22`, accent + "cc"][i] }}
            >
              Case {i + 1}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // stack
  return (
    <div className="absolute inset-0 p-8" style={style}>
      <div className="h-10 w-10 rounded-full" style={{ background: accent }} />
      <div className="mt-6 text-[30px] leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
        Hello. I'm a<br />
        <span className="italic" style={{ color: accent }}>
          quiet maker.
        </span>
      </div>
      <div className="mt-6 space-y-1.5">
        {[80, 60, 70].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full" style={{ background: `${ink}20`, width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}
