import type { Block, SiteData, Theme } from "@/types/builder.schema";

export type SidebarMetaPatch = Partial<Pick<SiteData, "category" | "logo" | "name">>;

export type SidebarBlockUpdate = (blockId: string, patch: Record<string, unknown>) => void;

export type SidebarSectionChange = (id: string) => void;

export type BlocksTabProps = {
  blocks: Block[];
  theme: Theme;
  activeSection: string;
  onSectionChange: SidebarSectionChange;
  onReorderBlocks: (blocks: Block[]) => void;
  onUpdateBlock: SidebarBlockUpdate;
};

export type TextTabProps = {
  blocks: Block[];
  site: SiteData;
  onUpdateBlock: SidebarBlockUpdate;
  onSectionChange: SidebarSectionChange;
};

export type ImagesTabProps = {
  blocks: Block[];
  theme: Theme;
  site: SiteData;
  onUpdateBlock: SidebarBlockUpdate;
  onSiteMetaChange: (patch: SidebarMetaPatch) => void;
  onSectionChange: SidebarSectionChange;
};

export const compactInputClass =
  "w-full rounded-lg border border-white/15 bg-zinc-950 text-white placeholder:text-zinc-500 px-2.5 py-1.5 text-xs outline-none transition-all hover:border-white/30 focus:border-primary focus:ring-1 focus:ring-primary/40 shadow-xs";
