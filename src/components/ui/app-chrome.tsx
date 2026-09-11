export function StatusChip({ isDeployed }: { isDeployed?: boolean }) {
  const s = isDeployed
    ? { label: "Published", tone: "text-foreground bg-card border border-border/80", dot: "bg-emerald-400" }
    : { label: "Draft", tone: "text-muted-foreground bg-muted/60 border border-border/40", dot: "bg-muted-foreground/60" };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${s.tone}`}>
      <span className={`size-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}