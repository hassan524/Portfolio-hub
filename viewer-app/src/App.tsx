import siteData from "./site.json";
import { getBlockComponent } from "@/lib/blockRegistry";
import type { SiteData } from "@/types/builder.schema";

const site = siteData as unknown as SiteData;

export default function App() {
  const theme = site.theme;
  const sorted = [...site.blocks].sort((a, b) => a.order - b.order);

  return (
    <div style={{ background: theme.bg, color: theme.ink }}>
      {sorted.map((block) => {
        const variant = (block.props as { variant?: string }).variant;
        const Cmp = getBlockComponent(block.props.kind, variant);
        if (!Cmp) return null;
        return (
          <Cmp key={block.id} id={block.id} props={block.props} theme={theme} onChange={() => {}} />
        );
      })}
    </div>
  );
}