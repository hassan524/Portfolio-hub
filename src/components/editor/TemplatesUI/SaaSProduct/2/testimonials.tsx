// @ts-nocheck
import { motion } from "framer-motion";
import { Star, Quote, ShieldCheck, Award, BadgeCheck } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const clients = props?.clients || ["Halden", "Northbridge", "Meridian", "Orchard", "Crestline", "Aurelian", "Fairhaven", "Stonegate"];
  const quotes = props?.quotes || [
    {
      text: "Vaultline replaced four tools and a very tired spreadsheet. Our quarterly reports now go out before the quarter has finished arguing with itself.",
      name: "Claire Hendricks",
      role: "Managing Partner, Halden",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    },
    {
      text: "The risk engine is the first I have used that explains itself. My committee finally trusts the numbers.",
      name: "Rahul Mehta",
      role: "CIO, Meridian Capital",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    },
    {
      text: "Onboarding took five weeks for eleven hundred accounts. Support actually picks up the phone.",
      name: "Sofia Lindqvist",
      role: "COO, Northbridge Advisory",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    },
    {
      text: "Clients log in to their portal more than they open their banking app. That never happened before.",
      name: "Marcus Bell",
      role: "Founder, Orchard Wealth",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
  ];
  const stats = props?.stats || [
    { value: "99.98%", label: "Platform uptime" },
    { value: "4.8/5", label: "Customer rating" },
    { value: "96%", label: "Annual retention" },
    { value: "31", label: "Markets covered" },
  ];
  const badges = props?.badges || ["SOC 2 Type II", "ISO 27001", "GDPR ready", "Fintech Breakthrough 2025"];
  const faqs = props?.faqs || [
    { q: "How long does onboarding take?", a: "Most firms are live in four to six weeks, including data migration and branded reporting." },
    { q: "Which custodians do you support?", a: "Over 120 custodians and platforms today, with new connections added every month." },
    { q: "Where is our data stored?", a: "Encrypted at rest and in transit, hosted in region of your choice with a full audit trail." },
    { q: "Can we export everything?", a: "Always. Your data is yours and can be exported in open formats at any time." },
  ];

  const upd = (key: string, arr: any[], i: number, patch: any) =>
    onChange?.({ [key]: arr.map((x: any, idx: number) => (idx === i ? { ...x, ...patch } : x)) });
  const marquee = [...clients, ...clients];

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: bg, color: ink }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
            <BadgeCheck size={14} />
            <Editable value={props?.eyebrow || "Client voices"} onChange={(v) => onChange?.({ eyebrow: v })} />
          </span>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
            <Editable value={props?.title || "Trusted by teams who manage real money."} onChange={(v) => onChange?.({ title: v })} />
          </h2>
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-14 relative py-6 overflow-hidden" style={{ borderTop: `1px solid ${surface}`, borderBottom: `1px solid ${surface}` }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-14 w-max"
        >
          {marquee.map((c: string, i: number) => (
            <span key={i} className="text-2xl sm:text-3xl font-extrabold tracking-tight whitespace-nowrap opacity-40 hover:opacity-100 transition-opacity" style={{ color: i % 2 ? ink : inkSecond }}>
              <Editable value={c} onChange={(v) => onChange?.({ clients: clients.map((x: string, idx: number) => (idx === i % clients.length ? v : x)) })} />
            </span>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Quote wall */}
        <div className="mt-20 grid md:grid-cols-2 gap-x-14 gap-y-14">
          {quotes.map((q: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.12 }}
              className={`relative pl-6 ${i % 2 ? "md:mt-12" : ""}`}
              style={{ borderLeft: `3px solid ${accent}` }}
            >
              <Quote size={28} style={{ color: accent }} />
              <p className="mt-4 text-xl sm:text-2xl font-semibold leading-snug tracking-tight">
                <Editable value={q.text} onChange={(v) => upd("quotes", quotes, i, { text: v })} />
              </p>
              <div className="mt-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={15} fill={s < (q.rating || 5) ? accent : "none"} style={{ color: accent }} />
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3">
                <img src={q.avatar} alt={q.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-sm">
                    <Editable value={q.name} onChange={(v) => upd("quotes", quotes, i, { name: v })} />
                  </div>
                  <div className="text-xs" style={{ color: inkSecond }}>
                    <Editable value={q.role} onChange={(v) => upd("quotes", quotes, i, { role: v })} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats band */}
        <div className="mt-24 relative rounded-[36px] overflow-hidden px-6 sm:px-12 py-12" style={{ background: accent, color: bg }}>
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-40" style={{ background: ink }} />
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s: any, i: number) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                  <Editable value={s.value} onChange={(v) => upd("stats", stats, i, { value: v })} />
                </div>
                <div className="mt-1 text-sm font-medium opacity-80">
                  <Editable value={s.label} onChange={(v) => upd("stats", stats, i, { label: v })} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {badges.map((b: string, i: number) => (
            <span key={i} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold" style={{ background: surface }}>
              {i % 2 ? <Award size={15} style={{ color: accent }} /> : <ShieldCheck size={15} style={{ color: accent }} />}
              <Editable value={b} onChange={(v) => onChange?.({ badges: badges.map((x: string, idx: number) => (idx === i ? v : x)) })} />
            </span>
          ))}
        </div>

        {/* FAQ grid */}
        <div className="mt-28">
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <Editable value={props?.faqTitle || "Frequently asked"} onChange={(v) => onChange?.({ faqTitle: v })} />
          </h3>
          <div className="mt-10 grid md:grid-cols-2 gap-x-14">
            {faqs.map((f: any, i: number) => (
              <div key={i} className="py-7" style={{ borderTop: `1px solid ${surface}` }}>
                <div className="flex gap-4">
                  <span className="text-sm font-extrabold mt-1" style={{ color: accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="text-lg font-bold">
                      <Editable value={f.q} onChange={(v) => upd("faqs", faqs, i, { q: v })} />
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: inkSecond }}>
                      <Editable value={f.a} onChange={(v) => upd("faqs", faqs, i, { a: v })} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
