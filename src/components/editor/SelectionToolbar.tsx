import { useEffect, useState } from "react";
import { Bold, Italic, Underline } from "lucide-react";

type ToolbarState = {
  top: number;
  left: number;
};

/**
 * Mount this ONCE near the top of TemplateLivePreview (inside the same
 * scroll container as the rendered blocks). It watches for text selected
 * inside any [data-editable="true"] element (the Editable component) and
 * shows a small floating toolbar above the selection — bold, italic,
 * underline, and a color swatch. Formatting is applied via
 * document.execCommand, which is what makes it "just work" inside a
 * contentEditable element without hand-rolling a rich text engine.
 *
 * Note: execCommand is deprecated in the web platform sense but is still
 * broadly supported by every major browser for exactly this use case
 * (contentEditable formatting) and is the pragmatic choice here rather
 * than pulling in a full rich-text library for four buttons.
 */
export function SelectionToolbar({ accentColor }: { accentColor: string }) {
  const [state, setState] = useState<ToolbarState | null>(null);

  useEffect(() => {
    function handleSelectionChange() {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
        setState(null);
        return;
      }

      const anchorNode = selection.anchorNode;
      const container =
        anchorNode instanceof Element ? anchorNode : anchorNode?.parentElement ?? null;
      const editableRoot = container?.closest('[data-editable="true"]');
      if (!editableRoot) {
        setState(null);
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) {
        setState(null);
        return;
      }

      setState({
        top: rect.top - 44,
        left: rect.left + rect.width / 2,
      });
    }

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  function applyFormat(command: "bold" | "italic" | "underline") {
    document.execCommand(command);
  }

  function applyColor(color: string) {
    document.execCommand("foreColor", false, color);
  }

  if (!state) return null;

  return (
    <div
      // mousedown (not click) + preventDefault stops the browser from
      // collapsing the text selection before the format command runs
      onMouseDown={(e) => e.preventDefault()}
      className="fixed z-50 flex -translate-x-1/2 items-center gap-1 rounded-lg border border-border bg-foreground px-1.5 py-1 shadow-lift"
      style={{ top: state.top, left: state.left }}
    >
      <ToolbarButton onClick={() => applyFormat("bold")} label="Bold">
        <Bold className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => applyFormat("italic")} label="Italic">
        <Italic className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => applyFormat("underline")} label="Underline">
        <Underline className="h-3.5 w-3.5" />
      </ToolbarButton>
      <div className="mx-0.5 h-4 w-px bg-background/20" />
      <input
        type="color"
        defaultValue={accentColor}
        onChange={(e) => applyColor(e.target.value)}
        className="h-5 w-5 cursor-pointer rounded border-none bg-transparent p-0"
        title="Text color"
      />
    </div>
  );
}

function ToolbarButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className="grid h-6 w-6 place-items-center rounded-md text-background transition-colors hover:bg-background/15"
    >
      {children}
    </button>
  );
}