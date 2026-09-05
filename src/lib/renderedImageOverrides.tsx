import { useLayoutEffect, useRef, type ReactNode } from "react";
import { applyRenderedImageOverrides, type ImageOverrides } from "@/lib/imageOverrideUtils";

export function RenderedImageOverrides({
  overrides,
  children,
}: {
  overrides?: ImageOverrides;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const apply = () => applyRenderedImageOverrides(root, overrides ?? {});
    apply();

    const observer = new MutationObserver(apply);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["src"],
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [overrides]);

  return (
    <div ref={rootRef} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
