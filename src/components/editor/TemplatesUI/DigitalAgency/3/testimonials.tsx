// @ts-nocheck
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Award } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency3Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FFFFFF";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || theme?.surface || "#F5F4F2";
  const ink = theme?.text || theme?.ink || "#0F0F10";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#6B6B70";
  const accent = theme?.accent || "#2F5BFF";
  const onAccent = theme?.["on-accent"] || bg; // text colour on accent buttons
  const A = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=150&q=80`;
  const awards = props.awards || [
    { t: "Top Software Development Companies", s: "Global 2026" },
    { t: "Top Web Development Companies", s: "Singapore" },
    { t: "Top Custom Software Developers", s: "Europe" },
    { t: "Top Web Development Companies", s: "United States" },
  ];
  const reviews = props.reviews || [
    { quote: "They treated our platform like their own product. We replaced five spreadsheets with one system our team actually likes using.", author: "Marcus Sterling", role: "CEO, CloudStack", avatar: A("photo-1507003211169-0a1dd7228f2d") },
    { quote: "Design and engineering worked as one team. We launched in 14 weeks and the store has been stable since day one.", author: "Elena Rostova", role: "Founder, Shopiko", avatar: A("photo-1534528741775-53994a69daeb") },
    { quote: "They found our bottleneck in the first working session and gave us a plan we could actually follow.", author: "Julian Vance", role: "Operations Director, Novus", avatar: A("photo-1500648767791-00dcc994a43e") },
  ];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => { if (paused) return; const t = setInterval(() => setI((x) => (x + 1) % reviews.length), 6000); return () => clearInterval(t); }, [paused, reviews.length]);
  const cur = reviews[i];

  return (
    <section id="testimonials" className="py-16 sm:py-24" style={{ background: bg, color: ink }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="font-medium tracking-tight leading-[1.1] text-[clamp(1.8rem,4vw,3rem)] max-w-3xl mb-10 sm:mb-14"><Editable value={props.testimonialsTitle || "We are grateful for the validation we receive from top ratings and happy clients"} onChange={(v) => onChange?.({ testimonialsTitle: v })} /></h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {awards.map((a: any) => (
            <div key={a.t + a.s} className="rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center gap-4" style={{ background: bgSecond }}>
              <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center" style={{ border: `2px solid ${ink}` }}><Award size={26} /></span>
              <div><div className="text-xs sm:text-sm font-medium leading-snug">{a.t}</div><div className="text-xs mt-1" style={{ color: inkSecond }}>{a.s}</div></div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-4 mt-4" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="lg:col-span-8 rounded-2xl p-6 sm:p-10 flex flex-col justify-between gap-8 min-h-[18rem]" style={{ background: bgSecond }}>
            <AnimatePresence mode="wait">
              <motion.p key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="text-xl sm:text-2xl font-light leading-snug tracking-tight">“{cur.quote}”</motion.p>
            </AnimatePresence>
            <div className="flex items-center gap-3">
              <img src={cur.avatar} alt={cur.author} className="w-12 h-12 rounded-full object-cover" />
              <div><div className="text-sm font-semibold">{cur.author}</div><div className="text-xs" style={{ color: inkSecond }}>{cur.role}</div></div>
            </div>
          </div>
          <div className="lg:col-span-4 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6" style={{ background: accent, color: onAccent }}>
            <div><div className="text-5xl sm:text-6xl font-light tracking-tight">{props.rating || "4.8/5"}</div><div className="text-sm opacity-90 mt-1">{props.ratingLabel || "Average rating from client reviews"}</div></div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">{reviews.map((r: any, k: number) => <button key={r.author} type="button" aria-label={`Review ${k + 1}`} onClick={() => setI(k)} className="h-1.5 rounded-full cursor-pointer transition-all" style={{ width: k === i ? 28 : 8, background: onAccent, opacity: k === i ? 1 : 0.5 }} />)}</div>
              <div className="flex gap-2">
                <button type="button" aria-label="Previous review" onClick={() => setI((i + reviews.length - 1) % reviews.length)} className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer" style={{ background: onAccent, color: ink }}><ArrowLeft size={16} /></button>
                <button type="button" aria-label="Next review" onClick={() => setI((i + 1) % reviews.length)} className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer" style={{ background: onAccent, color: ink }}><ArrowRight size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default DigitalAgency3Testimonials;