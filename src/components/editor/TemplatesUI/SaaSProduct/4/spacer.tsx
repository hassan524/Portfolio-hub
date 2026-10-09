// @ts-nocheck
export function Spacer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#09090B";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#F2542D";
  return <div aria-hidden="true" className="h-10 w-full" style={{ background: bg }} />;
}
