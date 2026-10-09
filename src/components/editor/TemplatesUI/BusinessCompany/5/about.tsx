// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
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

  const principles = props?.principles || [
    { title: "Partners do the work", text: "Senior lawyers lead every matter, not just the pitch." },
    { title: "Plain advice", text: "Written opinions you can read in five minutes and act on." },
    { title: "Predictable fees", text: "Fixed or capped fees agreed before work begins." },
    { title: "Long relationships", text: "Many clients have been with us for over twenty years." },
  ];
  const partners = props?.partners || [
    { name: "Eleanor Marlowe", role: "Founding Partner, M&A", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80" },
    { name: "Henry Finch", role: "Founding Partner, Disputes", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" },
    { name: "Sana Qureshi", role: "Partner, Corporate Governance", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
    { name: "Julian Brandt", role: "Partner, Employment", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
  ];
  const values = props?.values || [
    { title: "Integrity", text: "We advise against deals that do not serve you." },
    { title: "Discretion", text: "Confidentiality is built into how we work." },
    { title: "Judgement", text: "Experience applied calmly when it matters most." },
  ];

  return (
    <section id="about" className="py-24 sm:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: accent }}>{T("eyebrow", "The firm")}</div>
              <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl" style={{ color: ink }}>{T("title", "Thirty years of steady, careful advice")}</h2>
              <img src={props?.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"} alt="Our offices" className="mt-8 h-64 w-full object-cover grayscale" />
            </div>
          </div>

          <div className="lg:col-span-8">
            <p className="text-xl leading-relaxed first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.8]" style={{ color: ink }}>
              {T("story", "Marlowe & Finch opened in 1994 with two partners and a conviction that business law should be practical. Today we are 46 lawyers advising founders, boards and family-owned companies on acquisitions, disputes, governance and employment. We remain independent, and we intend to stay that way.")}
            </p>

            <div className="mt-14 grid gap-x-10 md:grid-cols-2">
              {principles.map((p: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="py-7" style={{ borderTop: `1px solid ${ink}` }}>
                  <div className="font-serif text-sm italic" style={{ color: accent }}>{`No. ${i + 1}`}</div>
                  <h3 className="mt-2 font-serif text-2xl" style={{ color: ink }}><Editable value={p.title} onChange={up("principles", principles, i, "title")} /></h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: inkSecond }}><Editable value={p.text} onChange={up("principles", principles, i, "text")} /></p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24">
          <div className="flex items-end justify-between pb-6" style={{ borderBottom: `1px solid ${ink}` }}>
            <h3 className="font-serif text-3xl sm:text-4xl" style={{ color: ink }}>{T("teamTitle", "Partners")}</h3>
            <p className="hidden max-w-xs text-sm md:block" style={{ color: inkSecond }}>{T("teamText", "Each partner remains hands-on in client work.")}</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {partners.map((m: any, i: number) => (
              <div key={i} className="group transition-all hover:scale-[1.02]">
                <img src={m.image} alt={m.name} className="h-72 w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
                <div className="mt-4 font-serif text-xl" style={{ color: ink }}><Editable value={m.name} onChange={up("partners", partners, i, "name")} /></div>
                <div className="mt-1 text-sm" style={{ color: inkSecond }}><Editable value={m.role} onChange={up("partners", partners, i, "role")} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-0 md:grid-cols-3" style={{ backgroundColor: bgSecond }}>
          {values.map((v: any, i: number) => (
            <div key={i} className="p-8" style={{ borderLeft: i === 0 ? "none" : `1px solid ${surface}` }}>
              <h4 className="font-serif text-2xl" style={{ color: ink }}><Editable value={v.title} onChange={up("values", values, i, "title")} /></h4>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: inkSecond }}><Editable value={v.text} onChange={up("values", values, i, "text")} /></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
