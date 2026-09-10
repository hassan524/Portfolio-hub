export function StatusChip({
  state,
}: {
  state?: "live" | "building" | "draft" | "ready" | "error";
}) {
  const map = {
    live: { label: "Live", tone: "text-primary bg-primary/10", dot: "bg-primary" },
    ready: { label: "Ready", tone: "text-primary bg-primary/10", dot: "bg-primary" },
    building: { label: "Building", tone: "text-warning bg-warning/10", dot: "bg-warning" },
    draft: { label: "Draft", tone: "text-subtle bg-muted", dot: "bg-subtle" },
    error: { label: "Failed", tone: "text-destructive bg-destructive/10", dot: "bg-destructive" },
  } as const;

  const s = state && map[state] ? map[state] : map.draft; // fallback

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${s.tone}`}>
      <span className={`size-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}