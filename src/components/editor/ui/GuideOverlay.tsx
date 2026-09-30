import { useSyncExternalStore } from "react";
import { guideStore, type GuideLine } from "@/lib/functions/template";

export function GuideOverlay(props: { guides?: GuideLine[] }) {
  const storeGuides = useSyncExternalStore(guideStore.subscribe, guideStore.get, guideStore.get);
  const guides = (props.guides && props.guides.length > 0) ? props.guides : storeGuides;
  if (!guides || guides.length === 0) return null;

  return (
    <div
      data-preview-chrome
      className="pointer-events-none absolute inset-0 z-[99999] overflow-visible"
      style={{ pointerEvents: "none", zIndex: 99999 }}
    >
      {guides.map((g, i) => {
        const color = g.emphasis === "center" ? "#f43f5e" : "#ff3366";
        const hasSpan = g.start !== undefined && g.end !== undefined;
        const start = hasSpan ? Math.min(g.start as number, g.end as number) : 0;
        const end = hasSpan ? Math.max(g.start as number, g.end as number) : 0;
        const spanLength = hasSpan ? Math.max(4, end - start) : 0;

        if (g.type === "v") {
          return (
            <div
              key={`v-${i}-${g.position}`}
              className="absolute pointer-events-none"
              style={{
                left: g.position,
                top: hasSpan ? start : 0,
                height: hasSpan ? spanLength : "100%",
                width: "1.5px",
                transform: "translateX(-0.75px)",
                backgroundColor: color,
                boxShadow: `0 0 3px ${color}, 0 0 1px rgba(0,0,0,0.8)`,
                zIndex: 99999,
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
              left: hasSpan ? start : 0,
              width: hasSpan ? spanLength : "100%",
              height: "1.5px",
              transform: "translateY(-0.75px)",
              backgroundColor: color,
              boxShadow: `0 0 3px ${color}, 0 0 1px rgba(0,0,0,0.8)`,
              zIndex: 99999,
            }}
          />
        );
      })}
    </div>
  );
}