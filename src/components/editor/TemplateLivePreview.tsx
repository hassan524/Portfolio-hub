import { getBlockComponent } from "@/lib/blockRegistry";
import type { SiteData } from "@/types/builder.schema";

export function TemplateLivePreview({
  site,
  onUpdateBlock,
}: {
  site: SiteData;
  onUpdateBlock: (blockId: string, patch: Record<string, any>) => void;
}) {
  const { theme, blocks } = site;
  const bg = theme.bg;
  const ink = theme.ink;

  // Blocks render in `order` — this is what lets one template skip the
  // navbar, another put testimonials before projects, etc.
  const sorted = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="flex-1 overflow-y-auto bg-surface-elevated">
      <div className="min-h-full" style={{ background: bg, color: ink }}>
        {/* Browser chrome */}
        <div
          className="sticky top-0 z-10 flex items-center gap-1.5 border-b px-4 py-3"
          style={{ borderColor: `${ink}15`, background: bg }}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff6058" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#27ca40" }} />
          <div
            className="ml-4 flex-1 text-center text-[11px] rounded-md py-1 px-3"
            style={{ background: `${ink}08`, color: `${ink}80` }}
          >
            yourname.portfoliohub.app
          </div>
        </div>

        {sorted.map((block) => {
          const variant = (block.props as any).variant as string | undefined;
          const Cmp = getBlockComponent(block.props.kind, variant);
          if (!Cmp) return null; // unregistered kind -> skip, don't crash
          return (
            <Cmp
              key={block.id}
              id={block.id}
              props={block.props}
              theme={theme}
              onChange={(patch: Record<string, any>) => onUpdateBlock(block.id, patch)}
            />
          );
        })}

        {!sorted.some((b) => b.props.kind === "footer") && (
          <div
            className="px-8 md:px-16 py-6 text-[11px] flex items-center justify-between"
            style={{ borderTop: `1px solid ${ink}10`, color: `${ink}40` }}
          >
            <span>© 2026 {site.name}</span>
            <span>Built with <span style={{ color: theme.accent }}>PortfolioHub</span></span>
          </div>
        )}
      </div>
    </div>
  );
}
