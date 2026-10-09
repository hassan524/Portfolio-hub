// @ts-nocheck
import { ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio1Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#A7A9B3";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.09)";
  const accent = theme?.accent || "#3B82F6";

  return (
    <footer
      className="px-5 py-8 sm:px-8 lg:px-14 transition-colors"
      style={{
        backgroundColor: bg,
        color: ink,
      }}
    >
      <div
        className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] sm:text-xs uppercase tracking-wider"
        style={{ color: inkSecond }}
      >
        <span>
          <Editable
            value={props?.copyright || "© 2026 Abiola Studio"}
            onChange={(v) => onChange?.({ copyright: v })}
          />
        </span>
        <span className="hidden md:inline-block">
          <Editable
            value={props?.origin || "Made with care in Lagos"}
            onChange={(v) => onChange?.({ origin: v })}
          />
        </span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-1.5 transition-colors hover:opacity-75"
          style={{ color: ink }}
        >
          <Editable value={props?.backToTop || "Back to top"} />
          <ArrowUp size={13} style={{ color: accent }} />
        </button>
      </div>
    </footer>
  );
}
