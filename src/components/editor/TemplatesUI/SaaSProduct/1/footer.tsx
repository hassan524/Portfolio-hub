// @ts-nocheck
import { ArrowUp, Sparkles } from "lucide-react";
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
      title: "Explore",
      links: [
        { label: "Story", href: "#about" },
        { label: "Method", href: "#services" },
        { label: "Collection", href: "#projects" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Proof", href: "#testimonials" },
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
    <footer className="relative overflow-hidden px-5 sm:px-8 pt-20 pb-8" style={{ background: bgSecond, color: ink }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-2.5">
              <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: accent, color: bg }}>
                <Sparkles size={17} />
              </span>
              <span className="font-[Georgia,'Times_New_Roman',serif] text-2xl tracking-[0.18em]">
                <Editable value={props?.brand || "VELUNA"} onChange={(v) => onChange?.({ brand: v })} />
              </span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed" style={{ color: inkSecond }}>
              <Editable
                value={props?.summary || "A skin intelligence platform and a small range of honest formulas, designed together in London."}
                onChange={(v) => onChange?.({ summary: v })}
              />
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs" style={{ background: surface }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: accent }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accent }} />
              </span>
              <Editable value={props?.status || "All systems running"} onChange={(v) => onChange?.({ status: v })} />
            </span>
          </div>

          {columns.map((c: any, ci: number) => (
            <div key={ci} className="md:col-span-3">
              <h4 className="text-xs tracking-[0.25em] uppercase" style={{ color: accent }}>
                <Editable value={c.title} onChange={(v) => onChange?.({ columns: columns.map((x: any, i: number) => (i === ci ? { ...x, title: v } : x)) })} />
              </h4>
              <ul className="mt-5 space-y-3">
                {c.links.map((l: any, li: number) => (
                  <li key={li}>
                    <a
                      href={l.href}
                      onClick={(e) => go(e, l.href)}
                      className="font-[Georgia,'Times_New_Roman',serif] text-xl opacity-80 hover:opacity-100 hover:pl-1.5 transition-all duration-300"
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
            <Editable value={props?.copyright || "© 2026 Veluna Studio Ltd. All rights reserved."} onChange={(v) => onChange?.({ copyright: v })} />
          </p>
          <motion.a
            href="#top"
            onClick={(e) => go(e, "#top")}
            whileHover={{ y: -3 }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium transition-transform active:scale-95"
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
