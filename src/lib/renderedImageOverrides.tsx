import { useLayoutEffect, useRef, type ReactNode } from "react";
import { applyRenderedImageOverrides, type ImageOverrides } from "@/lib/imageOverrideUtils";

export function RenderedImageOverrides({
  overrides,
  children,
}: {
  overrides?: ImageOverrides;
  children: ReactNode;
}) {
  const anchorRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    const root = anchor?.parentElement;
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
    <>
      <span ref={anchorRef} style={{ display: "none" }} data-preview-chrome />
      {children}
    </>
  );
}