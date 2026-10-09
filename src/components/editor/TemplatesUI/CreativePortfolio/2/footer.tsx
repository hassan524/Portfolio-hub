// @ts-nocheck
import { ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio2Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FFF4F8";
  const ink = theme?.ink || "#2B1720";
  const accent = theme?.accent || "#F03D87";

  return (
    <footer
      className="px-5 py-8 sm:px-8 lg:px-12 transition-colors font-mono text-xs uppercase tracking-wider"
      style={{
        backgroundColor: bg,
        color: ink,
      }}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <span className="font-serif text-sm font-bold normal-case">
          <Editable
            value={props?.brand || "Liza / Product Designer"}
            onChange={(v) => onChange?.({ brand: v })}
          />
        </span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-1.5 transition-opacity hover:opacity-60"
        >
          <Editable value={props?.backToTop || "Back to top"} />
          <ArrowUp size={13} style={{ color: accent }} />
        </button>
      </div>
    </footer>
  );
}
