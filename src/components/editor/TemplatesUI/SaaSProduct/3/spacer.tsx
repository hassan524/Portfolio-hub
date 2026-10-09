// @ts-nocheck
export function Spacer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F6F5EF";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#111111";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(17, 17, 17, 0.06)";
  const accent = theme?.accent || "#4ADE5A";
  return <div aria-hidden="true" className="h-10 w-full" style={{ background: bg }} />;
}
