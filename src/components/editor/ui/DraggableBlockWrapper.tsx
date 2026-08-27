import { useState, type ReactNode } from "react";
import { GripVertical } from "lucide-react";
import type { Block } from "@/types/builder.schema";
import { handleBlockDrop, handleBlockDragStart } from "@/lib/functions/template";

export function DraggableBlockWrapper({
  block,
  blocks,
  onReorderBlocks,
  ink,
  moveMode,
  children,
}: {
  block: Block;
  blocks: Block[];
  onReorderBlocks: (blocks: Block[]) => void;
  ink: string;
  moveMode?: boolean;
  children: ReactNode;
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/block-id");
    handleBlockDrop(draggedId, block.id, blocks, onReorderBlocks, setIsDragOver);
  }

  function onDragStart(e: React.DragEvent) {
    handleBlockDragStart(e, block.id, setIsDragging);
  }

  return (
    <div
      className="relative group/dragblock"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={onDrop}
      style={{
        outline: isDragOver ? `2px dashed ${ink}60` : "none",
        outlineOffset: -2,
        opacity: isDragging ? 0.4 : 1,
        transition: "opacity 0.15s",
      }}
    >
      <div
        data-block-drag-handle
        draggable
        onDragStart={onDragStart}
        onDragEnd={() => setIsDragging(false)}
        title="Drag to reorder"
        className={`absolute -left-2 top-3 z-20 grid h-7 w-7 cursor-grab place-items-center rounded-md shadow-sm transition-opacity active:cursor-grabbing ${
          moveMode ? "opacity-100" : "opacity-0 group-hover/dragblock:opacity-100"
        }`}
        style={{ background: `${ink}10`, backdropFilter: "blur(4px)" }}
      >
        <GripVertical className="h-4 w-4" style={{ color: ink }} />
      </div>

      {children}
    </div>
  );
}
