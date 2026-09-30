import { useEffect, useState } from "react";
import { ChevronDown, GripVertical, Link as LinkIcon, PencilLine } from "lucide-react";

import type { Block, Theme } from "@/types/builder.schema";
import { blendBlockWithNeighbors } from "@/lib/functions/blockBlend";
import {
  getBlockSectionHref,
  moveSidebarBlockToTarget,
  normalizeSectionHref,
  updateSidebarBlockHeight,
  useLiveBlockHeight,
} from "@/lib/functions/sidebar";
import { getBlockDefaultBackground } from "@/lib/functions/livePreview/blockWrapper";
import { ThemeCircle } from "@/components/editor/ui/ThemeColorPicker";
import type { BlocksTabProps } from "./types";

export function BlocksTab({
  blocks,
  theme,
  activeSection,
  onSectionChange,
  onReorderBlocks,
  onUpdateBlock,
}: BlocksTabProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function moveBlock(targetId: string) {
    moveSidebarBlockToTarget(draggedId, targetId, blocks, onReorderBlocks);
  }

  return (
    <div className="space-y-2">
      {blocks.map((block, index) => (
        <BlockRow
          key={block.id}
          block={block}
          index={index}
          blocks={blocks}
          theme={theme}
          active={activeSection === block.props.kind}
          isDragging={draggedId === block.id}
          isExpanded={expandedId === block.id}
          onExpandToggle={() => setExpandedId(expandedId === block.id ? null : block.id)}
          onSectionChange={onSectionChange}
          onUpdateBlock={onUpdateBlock}
          onDragStart={() => setDraggedId(block.id)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={() => moveBlock(block.id)}
          onDragEnd={() => setDraggedId(null)}
        />
      ))}
    </div>
  );
}

type BlockRowProps = {
  block: Block;
  index: number;
  blocks: Block[];
  theme: Theme;
  active: boolean;
  isDragging: boolean;
  isExpanded: boolean;
  onExpandToggle: () => void;
  onSectionChange: (id: string) => void;
  onUpdateBlock: (blockId: string, patch: Record<string, unknown>) => void;
  onDragStart: () => void;
  onDragOver: (event: React.DragEvent) => void;
  onDrop: () => void;
  onDragEnd: () => void;
};

function BlockRow({
  block,
  index,
  blocks,
  theme,
  active,
  isDragging,
  isExpanded,
  onExpandToggle,
  onSectionChange,
  onUpdateBlock,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: BlockRowProps) {
  const storedHeight = block.height;
  const liveHeight = useLiveBlockHeight(block.id, isExpanded);
  const storedBgColor = (block as { bgColor?: string }).bgColor;
  const defaultBg = getBlockDefaultBackground(block, theme);
  // Use theme / block defaults — DOM sampling picked accent buttons inside navbars (#292929).
  const bgColor = storedBgColor ?? defaultBg;

  const [heightInput, setHeightInput] = useState<string>(
    typeof storedHeight === "number" ? String(storedHeight) : liveHeight ? String(liveHeight) : "",
  );

  useEffect(() => {
    if (typeof storedHeight === "number") {
      setHeightInput(String(storedHeight));
    } else if (liveHeight) {
      setHeightInput(String(liveHeight));
    } else {
      setHeightInput("");
    }
  }, [storedHeight, liveHeight]);

  const displayName = block.label ?? block.name ?? block.props.kind;
  const sectionHref = getBlockSectionHref(block);
  const [linkInput, setLinkInput] = useState<string>(sectionHref);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  useEffect(() => {
    setLinkInput(sectionHref);
  }, [sectionHref]);

  const handleLinkCommit = () => {
    const finalLink = normalizeSectionHref(linkInput);
    setLinkInput(finalLink);
    onUpdateBlock(block.id, { sectionHref: finalLink });
  };

  const isNewBlock = Boolean(
    block.isCustom ||
      (block as Record<string, unknown>).isNew ||
      (block.props as { isCustom?: boolean })?.isCustom ||
      block.props?.kind === "spacer",
  );

  return (
    <div className="rounded-lg border border-white/10 overflow-hidden bg-zinc-900/40 mb-4">
      <div
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
        className={`group relative flex items-center gap-2 px-2.5 py-1.5 text-xs transition-all cursor-grab active:cursor-grabbing ${
          isDragging ? "opacity-40 border-dashed scale-[0.98]" : ""
        } ${active ? "bg-zinc-800 text-white" : "text-zinc-300"}`}
      >
        <div className="flex items-center justify-center shrink-0">
          <GripVertical
            className={`h-3.5 w-3.5 transition-opacity ${
              active ? "opacity-90 text-white" : "opacity-0 text-muted-foreground"
            }`}
          />
        </div>

        <div className="flex-1 min-w-0 flex items-center gap-1.5">
          <span
            className={`shrink-0 font-mono text-[10px] w-3 text-right ${
              active ? "text-white font-bold" : "text-muted-foreground"
            }`}
          >
            {index + 1}.
          </span>
          <input
            type="text"
            value={displayName}
            draggable={false}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onSectionChange(block.props.kind);
            }}
            onChange={(event) => onUpdateBlock(block.id, { label: event.target.value })}
            className={`w-full bg-transparent font-medium capitalize outline-none cursor-text truncate text-[11px] rounded px-1 py-0.5 transition-all ${
              active ? "text-foreground font-semibold" : "text-foreground"
            }`}
          />
        </div>

        {isNewBlock && (
          <button
            type="button"
            draggable={false}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              const patch = blendBlockWithNeighbors(block.id, blocks, theme);
              onUpdateBlock(block.id, patch);
            }}
            className={`relative z-10 p-1.5 rounded-md transition-colors shrink-0 cursor-pointer ${
              active ? "text-white" : "text-muted-foreground"
            }`}
          >
            <PencilLine className="h-3 w-3" />
          </button>
        )}

        <button
          type="button"
          draggable={false}
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            onExpandToggle();
          }}
          aria-expanded={isExpanded}
          className={`relative z-10 p-1.5 rounded-md transition-colors shrink-0 cursor-pointer ${
            active ? "text-white" : "text-muted-foreground"
          }`}
        >
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-150 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/10 bg-zinc-950/40 px-2.5 py-3 space-y-3">
            <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-zinc-900/80 px-2 py-1.5 font-mono text-[10px] text-zinc-400 focus-within:text-zinc-200 transition-colors">
              <LinkIcon className="h-3 w-3 shrink-0 opacity-70" />
              <input
                type="text"
                value={linkInput}
                placeholder="+ add link"
                draggable={false}
                onChange={(event) => setLinkInput(event.target.value)}
                onBlur={handleLinkCommit}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    (event.target as HTMLInputElement).blur();
                  }
                }}
                className="w-full bg-transparent text-[10px] font-mono outline-none text-inherit placeholder:text-zinc-600 focus:placeholder-transparent cursor-text select-text"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <ThemeCircle
                label={`${displayName} Background`}
                shortLabel="BG"
                value={bgColor || defaultBg || "#000000"}
                isOpen={isColorPickerOpen}
                onOpenChange={setIsColorPickerOpen}
                onChange={(color) => {
                  onUpdateBlock(block.id, {
                    bgColor: color,
                    backgroundColor: color,
                    backgroundImage: "none",
                    isBlended: false,
                  });
                }}
                showLabel={false}
              />

              <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-zinc-900/80 px-2.5 py-1 text-xs">
                <span className="text-[10px] font-medium text-muted-foreground uppercase select-none">
                  H
                </span>
                <input
                  type="number"
                  min={0}
                  max={2500}
                  value={heightInput}
                  placeholder={liveHeight ? `${liveHeight}` : "auto"}
                  onChange={(event) => {
                    const value = event.target.value;
                    setHeightInput(value);
                    updateSidebarBlockHeight(block.id, value, onUpdateBlock);
                  }}
                  className="w-14 bg-transparent text-[11px] font-mono outline-none text-foreground text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-[10px] font-mono text-muted-foreground select-none">px</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
