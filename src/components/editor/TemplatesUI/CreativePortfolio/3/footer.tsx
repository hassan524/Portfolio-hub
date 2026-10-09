// @ts-nocheck
import { ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio3Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#160B2B";
  const ink = theme?.ink || "#FFF8FF";
  const accent = theme?.accent || "#C98CFF";

  return (
    <footer
      className="px-5 py-8 sm:px-8 lg:px-12 transition-colors font-mono text-xs uppercase tracking-wider"
      style={{
        backgroundColor: bg,
        color: ink,
      }}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <span className="font-bold">
          <Editable
            value={props?.brand || "Hasan Senjig / UIUX Designer"}
            onChange={(v) => onChange?.({ brand: v })}
          />
        </span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-1.5 transition-opacity hover:opacity-60"
        >
          <Editable value={props?.backToTop || "Top"} />
          <ArrowUp size={13} style={{ color: accent }} />
        </button>
      </div>
    </footer>
  );
}
