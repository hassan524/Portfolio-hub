// @ts-nocheck

export function Spacer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  return (
    <div className="flex items-center justify-center py-1" style={{ backgroundColor: bg }}>
      <span className="h-1 w-16 rounded-full" style={{ backgroundColor: accent }} />
    </div>
  );
}
