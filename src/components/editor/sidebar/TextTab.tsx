import { useEffect, useState } from "react";

import type { Block, SiteData } from "@/types/builder.schema";
import { getBlockComponent } from "@/lib/blockRegistry";
import { getImageOverrides } from "@/lib/imageOverrideUtils";
import { RenderedImageOverrides } from "@/lib/renderedImageOverrides";
import { TextOverrideProvider } from "@/components/editor/ui/Editable";
import type { TextTabProps } from "./types";
import { compactInputClass } from "./types";

type TextEntry = {
  index: string;
  text: string;
};

export function TextTab({ blocks, site, onUpdateBlock, onSectionChange }: TextTabProps) {
  return (
    <div className="space-y-5">
      {blocks.map((block) => (
        <RenderedTextBlock
          key={block.id}
          block={block}
          site={site}
          onUpdateBlock={onUpdateBlock}
          onSectionChange={onSectionChange}
        />
      ))}
    </div>
  );
}

function RenderedTextBlock({
  block,
  site,
  onUpdateBlock,
  onSectionChange,
}: {
  block: Block;
  site: SiteData;
  onUpdateBlock: TextTabProps["onUpdateBlock"];
  onSectionChange: TextTabProps["onSectionChange"];
}) {
  const [probeElement, setProbeElement] = useState<HTMLDivElement | null>(null);
  const [textEntries, setTextEntries] = useState<TextEntry[]>([]);
  const [expandedIndices, setExpandedIndices] = useState<Record<string, boolean>>({});

  const variant = (block.props as { variant?: string }).variant;
  const Cmp = getBlockComponent(block.props.kind, variant, site.category, site.id);
  const componentProps =
    block.props.kind === "navbar" || block.props.kind === "footer"
      ? { ...block.props, logo: site.logo }
      : block.props;
  const overrides = ((block.props as Record<string, unknown>)._textOverrides ?? {}) as Record<
    string,
    string
  >;

  useEffect(() => {
    if (!probeElement) return;

    const entries = Array.from(
      probeElement.querySelectorAll<HTMLElement>("[data-editable][data-text-index]"),
    ).map((element) => ({
      index: element.dataset.textIndex ?? "",
      text: element.innerText.trim(),
    }));

    setTextEntries(entries);
  }, [block.props, Cmp, probeElement, site.logo]);

  if (!Cmp) return null;

  function updateText(index: string, text: string) {
    onUpdateBlock(block.id, {
      _textOverrides: { ...overrides, [index]: text },
    });
  }

  return (
    <div className="space-y-3 border-b border-border/60 pb-4">
      <button
        type="button"
        onClick={() => onSectionChange(block.props.kind)}
        className="flex w-full cursor-pointer items-center gap-2 text-left text-xs font-medium capitalize text-ink-soft transition-colors hover:text-foreground"
      >
        <span className="truncate">{block.label ?? block.name ?? block.props.kind}</span>
      </button>
      <div
        ref={setProbeElement}
        aria-hidden
        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
      >
        <RenderedImageOverrides overrides={getImageOverrides(componentProps as Record<string, unknown>)}>
          <TextOverrideProvider overrides={overrides}>
            <Cmp id={block.id} props={componentProps} theme={site.theme} onChange={() => {}} />
          </TextOverrideProvider>
        </RenderedImageOverrides>
      </div>
      <div className="space-y-2">
        {textEntries.map((entry) => {
          const isExpanded = !!expandedIndices[entry.index];
          const isLong = entry.text.length > 40 || entry.text.includes("\n");
          const calculatedRows = Math.max(
            2,
            entry.text.split("\n").length,
            Math.ceil(entry.text.length / 38),
          );

          return (
            <div key={`${block.id}-${entry.index}`} className="relative">
              {isExpanded ? (
                <textarea
                  value={entry.text}
                  onChange={(event) => updateText(entry.index, event.target.value)}
                  className={`${compactInputClass} text-xs pr-7 resize-none overflow-hidden`}
                  rows={calculatedRows}
                />
              ) : (
                <input
                  type="text"
                  value={entry.text}
                  onChange={(event) => updateText(entry.index, event.target.value)}
                  className={`${compactInputClass} text-xs ${isLong ? "pr-7" : ""} truncate`}
                />
              )}
              {isLong && (
                <button
                  type="button"
                  onClick={() =>
                    setExpandedIndices((prev) => ({ ...prev, [entry.index]: !prev[entry.index] }))
                  }
                  className="absolute right-2 top-2 text-ink-soft/60 hover:text-foreground transition-colors"
                  title={isExpanded ? "Collapse" : "Expand"}
                >
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              )}
            </div>
          );
        })}
        {textEntries.length === 0 && (
          <p className="rounded-lg border border-dashed border-border px-3 py-2 text-[10px] text-ink-soft">
            This block has no visible text.
          </p>
        )}
      </div>
    </div>
  );
}
