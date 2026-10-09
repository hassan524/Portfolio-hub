// @ts-nocheck

export function Spacer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  return (
    <div className="px-5 py-3 sm:px-8" style={{ backgroundColor: bg }}>
      <div className="mx-auto h-1 max-w-7xl" style={{ borderTop: `1px solid ${ink}`, borderBottom: `1px solid ${ink}`, opacity: 0.5 }} />
    </div>
  );
}
