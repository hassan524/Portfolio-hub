import { useCallback, useMemo, useRef, useState } from "react";
import { Files, Image as ImageIcon, LayoutGrid, Plus, Type } from "lucide-react";

import type { Block, SiteData, Theme } from "@/types/builder.schema";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ConfirmationCopy, ConfirmationType } from "@/lib/functions/template";
import { addSidebarBlock } from "@/lib/functions/sidebar";
import { BlocksTab } from "@/components/editor/sidebar/BlocksTab";
import { ImagesTab } from "@/components/editor/sidebar/ImagesTab";
import { PagesTab } from "@/components/editor/sidebar/PagesTab";
import { SidebarHeader } from "@/components/editor/sidebar/SidebarHeader";
import { TextTab } from "@/components/editor/sidebar/TextTab";

export type EditorControls = {
  moveMode: boolean;
  editMode: boolean;
  toggleMoveMode: () => void;
  toggleResponsiveEdit: () => void;
  toggleEditMode: () => void;
};

type ConfirmOptions = Partial<ConfirmationCopy> & { type?: ConfirmationType };

type Props = {
  site: SiteData;
  theme: Theme;
  activeSection: string;
  onSectionChange: (id: string) => void;
  onThemeChange: (patch: Partial<Theme>) => void;
  onSiteMetaChange: (patch: Partial<Pick<SiteData, "category" | "logo" | "name">>) => void;
  onUpdateBlock: (blockId: string, patch: Record<string, unknown>) => void;
  onReorderBlocks: (blocks: Block[]) => void;
  onSave?: (site: SiteData) => void;
  onMobileClose?: () => void;
  editorControls?: EditorControls | null;
  responsiveEditMode?: boolean;
};

export function TemplateSidebar({
  site,
  theme,
  activeSection,
  onSectionChange,
  onSiteMetaChange,
  onUpdateBlock,
  onReorderBlocks,
  onMobileClose,
}: Props) {
  const sortedBlocks = useMemo(
    () => [...site.blocks].sort((a, b) => a.order - b.order),
    [site.blocks],
  );

  const [confirmState, setConfirmState] = useState<(ConfirmOptions & { open: boolean }) | null>(
    null,
  );
  const confirmResolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((options: ConfirmOptions = {}) => {
    return new Promise<boolean>((resolve) => {
      confirmResolveRef.current = resolve;
      setConfirmState({ ...options, open: true });
    });
  }, []);

  const resolveConfirm = useCallback((value: boolean) => {
    setConfirmState(null);
    if (confirmResolveRef.current) {
      const fn = confirmResolveRef.current;
      confirmResolveRef.current = null;
      fn(value);
    }
  }, []);

  async function handleAddBlock() {
    const ok = await confirm({
      title: "Add a new block?",
      description:
        "A new block will be added to the end of your layout. You can rename, restyle, or reorder it anytime.",
      confirmLabel: "Add Block",
      cancelLabel: "Cancel",
    });
    if (!ok) return;

    addSidebarBlock(sortedBlocks, theme, onReorderBlocks);
  }

  return (
    <>
      <aside className="w-full shrink-0 border-r border-zinc-800 bg-zinc-950 text-sm flex flex-col h-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <SidebarHeader
          site={site}
          onSiteMetaChange={onSiteMetaChange}
          onMobileClose={onMobileClose}
        />

        <Tabs defaultValue="blocks" className="flex min-h-0 flex-1 flex-col gap-0">
          <div className="shrink-0 border-b border-zinc-800">
            <TabsList className="w-full h-9 rounded-none! grid grid-cols-4 gap-0 bg-background p-0">
              <SidebarTabTrigger value="blocks" icon={<LayoutGrid className="h-3 w-3" />}>
                Blocks
              </SidebarTabTrigger>
              <SidebarTabTrigger value="text" icon={<Type className="h-3 w-3" />}>
                Text
              </SidebarTabTrigger>
              <SidebarTabTrigger value="images" icon={<ImageIcon className="h-3 w-3" />}>
                Images
              </SidebarTabTrigger>
              <SidebarTabTrigger value="pages" icon={<Files className="h-3 w-3" />}>
                Pages
              </SidebarTabTrigger>
            </TabsList>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4 simple-scrollbar bg-zinc-950">
            <TabsContent value="blocks" className="mt-0 h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={handleAddBlock}
                    className="flex items-center gap-1 rounded-lg bg-background border border-zinc-700 px-2.5 py-1 text-[10px] font-semibold text-white transition-colors hover:bg-zinc-800 hover:border-zinc-600 cursor-pointer shadow-xs"
                  >
                    <Plus className="h-3 w-3" />
                    Add
                  </button>
                </div>
                <BlocksTab
                  blocks={sortedBlocks}
                  theme={theme}
                  activeSection={activeSection}
                  onSectionChange={onSectionChange}
                  onReorderBlocks={onReorderBlocks}
                  onUpdateBlock={onUpdateBlock}
                />
              </div>
            </TabsContent>

            <TabsContent value="text" className="mt-0">
              <TextTab
                blocks={sortedBlocks}
                site={site}
                onUpdateBlock={onUpdateBlock}
                onSectionChange={onSectionChange}
              />
            </TabsContent>

            <TabsContent value="images" className="mt-0">
              <ImagesTab
                blocks={sortedBlocks}
                theme={theme}
                site={site}
                onUpdateBlock={onUpdateBlock}
                onSiteMetaChange={onSiteMetaChange}
                onSectionChange={onSectionChange}
              />
            </TabsContent>

            <TabsContent value="pages" className="mt-0 h-full">
              <PagesTab />
            </TabsContent>
          </div>
        </Tabs>
      </aside>

      <ConfirmationDialog
        open={!!confirmState?.open}
        type={confirmState?.type}
        title={confirmState?.title}
        description={confirmState?.description}
        confirmLabel={confirmState?.confirmLabel}
        cancelLabel={confirmState?.cancelLabel}
        onOpenChange={(open) => {
          if (!open) resolveConfirm(false);
        }}
        onConfirm={() => resolveConfirm(true)}
        onCancel={() => resolveConfirm(false)}
      />
    </>
  );
}

export function SidebarTabTrigger({
  value,
  icon,
  children,
}: {
  value: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <TabsTrigger
      value={value}
      className="cursor-pointer flex h-full items-center justify-center gap-1.5 rounded-none! text-[10px] font-medium text-zinc-400 hover:text-white data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:shadow-xs transition-all"
    >
      {icon}
      {children}
    </TabsTrigger>
  );
}
