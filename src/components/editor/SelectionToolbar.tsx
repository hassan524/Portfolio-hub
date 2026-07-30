import { useEffect, useState } from "react";
import { Bold, Italic, Underline } from "lucide-react";
import { calculateSelectionPosition, applyFormat, applyColor } from "@/lib/functions/TemplateDialog";

type ToolbarState = {
  top: number;
  left: number;
};

export function SelectionToolbar({ accentColor }: { accentColor: string }) {
  const [state, setState] = useState<ToolbarState | null>(null);

  useEffect(() => {
    function handleSelectionChange() {
      const position = calculateSelectionPosition(window.getSelection());
      setState(position);
    }

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  if (!state) return null;

  return (
    <div
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