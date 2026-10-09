// @ts-nocheck
import { Rocket, Smartphone, Bot, Users, Workflow, Server, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const I = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;
const icons = { rocket: Rocket, phone: Smartphone, bot: Bot, team: Users, flow: Workflow, server: Server };

export function DigitalAgency3About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FFFFFF";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || theme?.surface || "#F5F4F2";
  const ink = theme?.text || theme?.ink || "#0F0F10";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#6B6B70";
  const accent = theme?.accent || "#2F5BFF";
  const onAccent = theme?.["on-accent"] || bg; // text colour on accent buttons
  const set = (k: string) => (v: string) => onChange?.({ [k]: v });
  const go = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  const columns = props.solutionColumns || [
    [{ t: "Launch a startup", d: "Validate your idea, build an MVP and prepare for growth.", i: "rocket" }, { img: I("photo-1512941937669-90a1b58e7e9c"), h: "aspect-[4/5]" }, { t: "Replace manual work", d: "Turn spreadsheets and repetitive workflows into software your team owns.", i: "flow" }],
    [{ t: "Build a web or mobile product", d: "Start with an MVP in 2–4 weeks, then grow it into a full product.", i: "phone" }, { t: "Extend your team", d: "Add senior designers, engineers, QA or DevOps exactly when you need them.", i: "team" }, { img: I("photo-1551650975-87deedd944c3"), h: "aspect-[4/5]" }],
    [{ t: "Automate with AI where it makes sense", d: "Automate operations, build AI assistants and introduce practical AI features.", i: "bot" }, { img: I("photo-1555774698-0b77e0d5fac6"), h: "aspect-[4/5]" }, { t: "Modernize legacy software", d: "Upgrade existing systems without disrupting your business.", i: "server" }],
  ];
  const Card = ({ c }: any) => {
    if (c.img) return <div className={`rounded-2xl overflow-hidden ${c.h}`} style={{ background: bg }}><img src={c.img} alt="" loading="lazy" className="w-full h-full object-cover" /></div>;
    const Icon = icons[c.i] || Rocket;
    return (
      <button type="button" onClick={go} className="group w-full text-left rounded-2xl p-6 flex flex-col gap-10 cursor-pointer transition-transform hover:-translate-y-1" style={{ background: bg }}>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg sm:text-xl font-medium leading-snug max-w-[12rem]">{c.t}</h3>
          <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: bgSecond }}><Icon size={16} /></span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <p className="text-sm leading-relaxed" style={{ color: inkSecond }}>{c.d}</p>
          <ArrowUpRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: accent }} />
        </div>
      </button>
    );
  };

  return (
    <section id="about" className="py-16 sm:py-24" style={{ background: bgSecond, color: ink }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-12 items-end mb-10 sm:mb-14">
          <h2 className="lg:col-span-8 font-medium tracking-tight leading-[1.1] text-[clamp(1.8rem,4vw,3rem)]"><Editable value={props.aboutTitle || "Solutions built around your goals"} onChange={set("aboutTitle")} /></h2>
          <p className="lg:col-span-4 text-sm leading-relaxed" style={{ color: inkSecond }}><Editable value={props.aboutDescription || "Every business is different. That is why we start with the outcome you want to achieve, not the technology."} onChange={set("aboutDescription")} /></p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {columns.map((col: any[], i: number) => <div key={i} className="flex flex-col gap-4">{col.map((c, k) => <Card key={k} c={c} />)}</div>)}
        </div>
      </div>
    </section>
  );
}
export default DigitalAgency3About;