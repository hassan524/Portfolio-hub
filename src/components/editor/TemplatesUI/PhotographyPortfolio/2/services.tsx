// @ts-nocheck
import { Check, ArrowUpRight, Compass, Box, Frame, ShieldCheck } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PhotographyPortfolio2Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F7F6F2";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#EDEDE6";
  const ink = theme?.text || theme?.ink || "#242922";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#636A60";
  const accent = theme?.accent || "#2D5A3E";
  const onAccent = theme?.["on-accent"] || "#FFFFFF";

  const go = (e: any, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const services = props.services || [
    {
      title: "Collector's Print Edition",
      price: "From $850",
      type: "Limited to 15",
      desc: "Museum-grade fine art prints produced on heavyweight 308gsm 100% cotton rag paper with embossed seal.",
      features: [
        "A2 / A1 / Grand Scale (120x90cm) Formats",
        "Hand-Signed & Numbered Certificate",
        "Acid-Free Archival White Border",
        "Custom Natural Oak or Dark Walnut Framing Option",
        "Worldwide Insured Wooden Crate Delivery",
      ],
      cta: "Order Print Edition",
    },
    {
      title: "Architectural Commission",
      price: "From $3,400",
      type: "Design Studios",
      featured: true,
      desc: "Comprehensive visual documentation of contemporary residences, pavilions, and public cultural spaces.",
      features: [
        "2-Day Daylight, Dusk & Twilight Coverage",
        "Interior Spatial Flow & Exterior Landscaping",
        "High-Resolution 150MP Phase One Master Files",
        "Global Editorial & Architectural Press Rights",
        "Printable Monograph PDF Book Layout",
      ],
      cta: "Commission Studio",
    },
    {
      title: "Curatorial & Licensing",
      price: "Custom Scope",
      type: "Galleries & Books",
      desc: "Commercial publishing rights, book licensing, and private curatorial collections for hotels and corporate spaces.",
      features: [
        "Exclusive Book & Periodical Cover Licenses",
        "Commercial Interior Display Licenses",
        "Custom Print Series for Hospitality Suites",
        "Curatorial Narrative & Essay Inclusions",
        "Dedicated Curatorial Archival Support",
      ],
      cta: "Contact Curatorial",
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-32" style={{ background: bg, color: ink }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: accent }}>
            <Compass size={13} />
            <Editable value={props.servicesEyebrow || "Acquisitions & Commissions"} onChange={(v) => onChange?.({ servicesEyebrow: v })} />
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight">
            <Editable value={props.servicesTitle || "Archival Offerings & Documentation"} onChange={(v) => onChange?.({ servicesTitle: v })} />
          </h2>
          <p className="text-sm font-light leading-relaxed" style={{ color: inkSecond }}>
            <Editable
              value={props.servicesSubtitle || "Signed original fine art prints and architectural commissions for discerning studios and private collectors."}
              onChange={(v) => onChange?.({ servicesSubtitle: v })}
            />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {services.map((item: any, i: number) => (
            <div
              key={item.title || i}
              className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between border transition-all duration-300 ${
                item.featured ? "shadow-2xl scale-100 lg:-translate-y-3" : "shadow-sm hover:shadow-md"
              }`}
              style={{
                background: item.featured ? bgSecond : bg,
                borderColor: `${ink}18`,
              }}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-3 py-1 rounded-full uppercase" style={{ background: `${accent}15`, color: accent }}>
                    {item.type}
                  </span>
                  <span style={{ color: inkSecond }}>No. 0{i + 1}</span>
                </div>

                <div>
                  <h3 className="text-2xl font-light">{item.title}</h3>
                  <div className="text-2xl font-mono font-medium mt-2" style={{ color: accent }}>
                    {item.price}
                  </div>
                  <p className="text-xs font-light mt-3 leading-relaxed" style={{ color: inkSecond }}>
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t space-y-3" style={{ borderColor: `${ink}12` }}>
                  {item.features.map((f: string) => (
                    <div key={f} className="flex items-start gap-2.5 text-xs font-light">
                      <Check size={14} className="shrink-0 mt-0.5" style={{ color: accent }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t" style={{ borderColor: `${ink}12` }}>
                <a
                  href="#contact"
                  onClick={(e) => go(e, "#contact")}
                  className="w-full py-3.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: item.featured ? accent : ink,
                    color: onAccent,
                  }}
                >
                  <span>{item.cta}</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PhotographyPortfolio2Services;
