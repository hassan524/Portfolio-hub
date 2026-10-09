// @ts-nocheck
import { ArrowUp, Landmark } from "lucide-react";
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const columns = props?.columns || [
    {
      title: "Product",
      links: [
        { label: "Platform", href: "#services" },
        { label: "Work", href: "#projects" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Clients", href: "#testimonials" },
      ],
    },
    {
      title: "Reach us",
      links: [
        { label: "Contact", href: "#contact" },
        { label: "Top", href: "#top" },
      ],
    },
  ];

  const go = (e: any, href: string) => {
    e.preventDefault();
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const updLink = (ci: number, li: number, label: string) =>
    onChange?.({
      columns: columns.map((c: any, i: number) =>
        i === ci ? { ...c, links: c.links.map((l: any, j: number) => (j === li ? { ...l, label } : l)) } : c
      ),
    });

  return (
    <footer className="relative overflow-hidden px-5 sm:px-8 pt-20 pb-8" style={{ background: bg, color: ink, borderTop: `1px solid ${surface}` }}>
      <div className="absolute left-1/2 -bottom-40 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: accent }} />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: accent, color: bg, boxShadow: `0 8px 22px -6px ${accent}` }}>
                <Landmark size={18} />
              </span>
              <span className="font-bold text-xl tracking-tight">
                <Editable value={props?.brand || "Vaultline"} onChange={(v) => onChange?.({ brand: v })} />
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed" style={{ color: inkSecond }}>
              <Editable
                value={props?.summary || "Portfolio analytics, risk modelling and client reporting for advisory teams that care about precision."}
                onChange={(v) => onChange?.({ summary: v })}
              />
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium" style={{ background: surface, color: inkSecond }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: accent }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accent }} />
              </span>
              <Editable value={props?.status || "All systems operational"} onChange={(v) => onChange?.({ status: v })} />
            </span>
          </div>

          {columns.map((c: any, ci: number) => (
            <div key={ci} className="md:col-span-2 lg:col-span-2 md:first:col-start-7">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
                <Editable value={c.title} onChange={(v) => onChange?.({ columns: columns.map((x: any, i: number) => (i === ci ? { ...x, title: v } : x)) })} />
              </h4>
              <ul className="mt-5 space-y-3">
                {c.links.map((l: any, li: number) => (
                  <li key={li}>
                    <a
                      href={l.href}
                      onClick={(e) => go(e, l.href)}
                      className="text-sm font-medium opacity-75 hover:opacity-100 hover:pl-1.5 transition-all duration-300"
                    >
                      <Editable value={l.label} onChange={(v) => updLink(ci, li, v)} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: `1px solid ${surface}` }}>
          <p className="text-xs text-center sm:text-left" style={{ color: inkSecond }}>
            <Editable value={props?.copyright || "© 2026 Vaultline Technologies Inc. All rights reserved."} onChange={(v) => onChange?.({ copyright: v })} />
          </p>
          <motion.a
            href="#top"
            onClick={(e) => go(e, "#top")}
            whileHover={{ y: -3 }}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold transition-transform active:scale-95"
            style={{ background: accent, color: bg }}
          >
            <Editable value={props?.topLabel || "Back to top"} onChange={(v) => onChange?.({ topLabel: v })} />
            <ArrowUp size={14} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
