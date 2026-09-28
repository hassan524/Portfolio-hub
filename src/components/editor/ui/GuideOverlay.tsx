import { useSyncExternalStore } from "react";
import { guideStore, type GuideLine } from "@/lib/functions/template";

export function GuideOverlay(_props: { guides?: GuideLine[] }) {
  const guides = useSyncExternalStore(guideStore.subscribe, guideStore.get, guideStore.get);
  if (!guides || guides.length === 0) return null;

  return (
    <div
      data-preview-chrome
      className="pointer-events-none absolute inset-0 z-[9999] overflow-visible"
      style={{ pointerEvents: "none" }}
    >
      {guides.map((g, i) => {
        const color = g.emphasis === "center" ? "#f43f5e" : "#ff4d8d";
        const hasSpan = g.start !== undefined && g.end !== undefined;

        if (g.type === "v") {
          return (
            <div
              key={`v-${i}-${g.position}`}
              className="absolute pointer-events-none"
              style={{
                left: g.position,
                top: hasSpan ? g.start : 0,
                height: hasSpan ? (g.end as number) - (g.start as number) : "100%",
                width: 1,
                transform: "translateX(-0.5px)",
                background: color,
              }}
            />
          );
        }
        return (
          <div
            key={`h-${i}-${g.position}`}
            className="absolute pointer-events-none"
            style={{
              top: g.position,
              left: hasSpan ? g.start : 0,
              width: hasSpan ? (g.end as number) - (g.start as number) : "100%",
              height: 1,
              transform: "translateY(-0.5px)",
              background: color,
            }}
          />
        );
      })}
    </div>
  );
}