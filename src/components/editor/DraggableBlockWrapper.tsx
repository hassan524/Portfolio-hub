import { useState, type ReactNode } from "react";
import { GripVertical } from "lucide-react";
import type { Block } from "@/types/builder.schema";

/**
 * Wraps each rendered block inside TemplateLivePreview so it can be
 * dragged up/down directly in the canvas — not just from the sidebar
 * list. Uses the exact same order-swap logic as TemplateSidebar's
 * BlocksList, just triggered from a different surface.
 *
 * A small grip handle appears on hover in the top-left corner of the
 * block (doesn't interfere with clicking into text to edit it, since
 * it's a separate absolutely-positioned element, not an overlay on
 * top of the whole block).
 */
export function DraggableBlockWrapper({
  block,
  blocks,
  onReorderBlocks,
  ink,
  children,
}: {
  block: Block;
  blocks: Block[];
  onReorderBlocks: (blocks: Block[]) => void;
  ink: string;
  children: ReactNode;
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    const draggedId = e.dataTransfer.getData("text/block-id");
    if (!draggedId || draggedId === block.id) return;

    const sorted = [...blocks].sort((a, b) => a.order - b.order);
    const from = sorted.findIndex((b) => b.id === draggedId);
    const to = sorted.findIndex((b) => b.id === block.id);
    if (from < 0 || to < 0) return;

    const next = [...sorted];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onReorderBlocks(next);
  }

  return (
    <div
      className="relative group/dragblock"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      style={{
        outline: isDragOver ? `2px dashed ${ink}60` : "none",
        outlineOffset: -2,
        opacity: isDragging ? 0.4 : 1,
        transition: "opacity 0.15s",
      }}
    >
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("text/block-id", block.id);
          e.dataTransfer.effectAllowed = "move";
          setIsDragging(true);
        }}
        onDragEnd={() => setIsDragging(false)}
        title="Drag to reorder"
        className="absolute -left-2 top-3 z-20 grid h-7 w-7 cursor-grab place-items-center rounded-md opacity-0 shadow-sm transition-opacity group-hover/dragblock:opacity-100 active:cursor-grabbing"
        style={{ background: `${ink}10`, backdropFilter: "blur(4px)" }}
      >
        <GripVertical className="h-4 w-4" style={{ color: ink }} />
      </div>

      {children}
    </div>
  );
}