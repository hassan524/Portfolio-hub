// @ts-nocheck
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const T = (key: string, d: string) => (
    <Editable value={props?.[key] || d} onChange={(v: string) => onChange?.({ [key]: v })} />
  );
  const up = (key: string, arr: any[], i: number, f: string) => (v: string) =>
    onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? { ...x, [f]: v } : x)) });
  const stats = props?.stats || [
    { value: "120+", label: "Products launched" },
    { value: "92%", label: "Clients who return" },
    { value: "4.9", label: "Rating on 85 reviews" },
  ];
  const quotes = props?.quotes || [
    { quote: "They behaved like co-founders. Our launch date held and the product is still the best thing we have shipped.", name: "Priya Raman", role: "CEO, Tallyboard", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" },
    { quote: "Northstack rebuilt our app without pausing a single release.", name: "Daniel Voss", role: "CTO, Routewise", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" },
    { quote: "The design system gave six teams one language overnight. Our velocity genuinely doubled, and the documentation is a joy.", name: "Lena Okafor", role: "VP Product, Atlas", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" },
    { quote: "Clear communication, honest estimates and zero drama.", name: "Marco Ricci", role: "Founder, Orchard Foods", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80" },
    { quote: "Our clinics adopted the app in weeks, not months. Patients keep telling us how simple it is.", name: "Dr. Hannah Cole", role: "Director, Pulse Care", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80" },
  ];
  const clients = props?.clients || ["Ledgerly", "Pulse Care", "Orchard Foods", "Atlas", "Routewise", "Tallyboard"];

  return (
    <section id="testimonials" className="py-24 sm:py-32" style={{ backgroundColor: bgSecond }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <h2 className="text-4xl font-black leading-[1.02] tracking-tighter sm:text-6xl" style={{ color: ink }}>{T("title", "Teams that built with us, in their words")}</h2>
          <div className="grid grid-cols-3 gap-4">
            {stats.map((s: any, i: number) => (
              <div key={i}>
                <div className="text-3xl font-black tracking-tight sm:text-5xl" style={{ color: i === 0 ? accent : ink }}><Editable value={s.value} onChange={up("stats", stats, i, "value")} /></div>
                <div className="mt-1 text-xs" style={{ color: inkSecond }}><Editable value={s.label} onChange={up("stats", stats, i, "label")} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 gap-5 md:columns-2 lg:columns-3">
          {quotes.map((q: any, i: number) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="mb-5 break-inside-avoid rounded-3xl p-7 transition-all hover:scale-[1.02]"
              style={{ backgroundColor: i === 2 ? accent : bg, color: i === 2 ? bg : ink, border: `1px solid ${surface}` }}
            >
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((k) => (
                  <Star key={k} className="h-4 w-4" style={{ color: i === 2 ? bg : accent, fill: i === 2 ? bg : accent }} />
                ))}
              </div>
              <blockquote className="mt-4 text-lg font-semibold leading-snug"><Editable value={q.quote} onChange={up("quotes", quotes, i, "quote")} /></blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img src={q.image} alt={q.name} className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-bold"><Editable value={q.name} onChange={up("quotes", quotes, i, "name")} /></div>
                  <div className="text-xs" style={{ opacity: 0.7 }}><Editable value={q.role} onChange={up("quotes", quotes, i, "role")} /></div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 pt-8" style={{ borderTop: `1px solid ${surface}` }}>
          {clients.map((c: string, i: number) => (
            <span key={i} className="text-xl font-black tracking-tight" style={{ color: inkSecond }}>
              <Editable value={c} onChange={(v: string) => onChange?.({ clients: clients.map((x: string, j: number) => (j === i ? v : x)) })} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
