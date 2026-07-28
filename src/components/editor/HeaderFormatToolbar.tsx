import { useEffect, useState } from "react";
import { Bold, Italic, Underline } from "lucide-react";
import type { SiteData } from "@/types/builder.schema";

export function HeaderFormatToolbar({ ink, site }: { ink: string; site: SiteData }) {
  const [active, setActive] = useState(false);
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);

  useEffect(() => {
    function handleFocusIn(e: FocusEvent) {
      const target = e.target;
      const container = target instanceof Element ? target : null;
      const editableRoot = container?.closest('[data-editable="true"]');
      const blockRoot = container?.closest('[data-block-id]');
      setActive(Boolean(editableRoot));
      setFocusedBlockId(blockRoot?.getAttribute("data-block-id") ?? null);
    }

    function handleFocusOut(e: FocusEvent) {
      const next = e.relatedTarget;
      const nextEl = next instanceof Element ? next : null;
      const stillEditable = nextEl?.closest('[data-editable="true"]');
      const clickedToolbar = nextEl?.closest('[data-format-toolbar="true"]');
      if (!stillEditable && !clickedToolbar) {
        setActive(false);
        setFocusedBlockId(null);
      }
    }

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  function applyFormat(command: "bold" | "italic" | "underline") {
    document.execCommand(command);
    document.activeElement?.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function applyColor(color: string) {
    document.execCommand("foreColor", false, color);
    document.activeElement?.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (!active) return null;

  const focusedBlock = site.blocks.find((b) => b.id === focusedBlockId);

  return (
    <div
      data-format-toolbar="true"
      onMouseDown={(e) => e.preventDefault()}
      className="flex items-center gap-2"
    >
      <div className="flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5">
        <button
          onClick={() => applyFormat("bold")}
          title="Bold"
          className="grid h-7 w-7 place-items-center rounded-md text-ink-soft hover:bg-secondary hover:text-ink transition-colors"
        >
          <Bold className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => applyFormat("italic")}
          title="Italic"
          className="grid h-7 w-7 place-items-center rounded-md text-ink-soft hover:bg-secondary hover:text-ink transition-colors"
        >
          <Italic className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => applyFormat("underline")}
          title="Underline"
          className="grid h-7 w-7 place-items-center rounded-md text-ink-soft hover:bg-secondary hover:text-ink transition-colors"
        >
          <Underline className="h-3.5 w-3.5" />
        </button>
        <input
          type="color"
          defaultValue={ink}
          onChange={(e) => applyColor(e.target.value)}
          title="Text color"
          className="h-6 w-6 cursor-pointer rounded border-none bg-transparent p-0"
        />
      </div>

      {focusedBlock && (
        <span className="text-[10px] text-ink-soft/60 font-mono truncate max-w-[220px]">
          {JSON.stringify(focusedBlock.props)}
        </span>
      )}
    </div>
  );
}