// @ts-nocheck
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency2Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0B0B0D";
  const text = theme?.text || theme?.ink || "#FFFFFF";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || "#A1A1AA";
  const accent = theme?.accent || "#F5559E";
  const A = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=150&q=80`;
  const quotes = props.quotes || [
    { statement: "They treated our platform like their own product. We replaced five spreadsheets with one system our team actually likes using.", author: "Marcus Sterling", role: "CEO, CloudStack AI", avatar: A("photo-1507003211169-0a1dd7228f2d"), outcome: "45% fewer support tickets" },
    { statement: "Design and engineering worked as one team. We launched in 14 weeks and the store has been stable since day one.", author: "Elena Rostova", role: "Founder, Shopiko", avatar: A("photo-1534528741775-53994a69daeb"), outcome: "Launched in 14 weeks" },
    { statement: "They found our bottleneck in the first working session and gave us a plan we could actually follow.", author: "Julian Vance", role: "Operations Director, Novus", avatar: A("photo-1500648767791-00dcc994a43e"), outcome: "5.8x freight volume" },
  ];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => { if (paused) return; const t = setInterval(() => setI((x) => (x + 1) % quotes.length), 6500); return () => clearInterval(t); }, [paused, quotes.length]);
  const cur = quotes[i];
  const line = `${textSecond}30`;

  return (
    <section id="testimonials" className="py-20 sm:py-28" style={{ background: bg, color: text }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>{props.testimonialsEyebrow || "Client feedback"}</span>
            <h2 className="font-extrabold tracking-tighter leading-[1.05] text-[clamp(2rem,4.5vw,3.25rem)] mt-3"><Editable value={props.testimonialsTitle || "What teams say after launch."} onChange={(v) => onChange?.({ testimonialsTitle: v })} /></h2>
          </div>
          <p className="lg:col-span-5 text-sm sm:text-base leading-relaxed" style={{ color: textSecond }}><Editable value={props.testimonialsDescription || "Feedback from founders and operators we have built products with."} onChange={(v) => onChange?.({ testimonialsDescription: v })} /></p>
        </div>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{ borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}` }}>
          <AnimatePresence mode="wait">
            <motion.div key={cur.author} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} className="grid lg:grid-cols-12 gap-8 lg:gap-12 py-10 sm:py-14">
              <div className="lg:col-span-4 flex lg:flex-col gap-4 lg:gap-5 items-center lg:items-start">
                <img src={cur.avatar} alt={cur.author} className="w-16 h-16 rounded-full object-cover" />
                <div><div className="font-bold">{cur.author}</div><div className="text-sm" style={{ color: textSecond }}>{cur.role}</div><div className="text-sm font-bold mt-2" style={{ color: accent }}>{cur.outcome}</div></div>
              </div>
              <p className="lg:col-span-8 text-xl sm:text-3xl font-medium leading-snug tracking-tight">“{cur.statement}”</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">{quotes.map((q: any, k: number) => <button key={q.author} type="button" aria-label={`Quote ${k + 1}`} onClick={() => setI(k)} className="h-1.5 rounded-full cursor-pointer transition-all" style={{ width: k === i ? 32 : 10, background: k === i ? accent : `${textSecond}50` }} />)}</div>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous quote" onClick={() => setI((i + quotes.length - 1) % quotes.length)} className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer" style={{ border: `1px solid ${textSecond}50` }}><ArrowLeft size={18} /></button>
            <button type="button" aria-label="Next quote" onClick={() => setI((i + 1) % quotes.length)} className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer" style={{ background: accent, color: bg }}><ArrowRight size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default DigitalAgency2Testimonials;