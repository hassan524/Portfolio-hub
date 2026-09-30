import { Loader2, PencilLine } from "lucide-react";
import { getBlockComponent } from "@/lib/blockRegistry";
import { TextOverrideProvider } from "../ui/Editable";
import { DraggableBlockWrapper } from "../ui/DraggableBlockWrapper";
import { RenderedImageOverrides } from "@/lib/renderedImageOverrides";
import { getImageOverrides } from "@/lib/imageOverrideUtils";
import {
  getPreviewBlockComponentProps,
  getPreviewBlockInnerClasses,
  getPreviewBlockTheme,
  getPreviewBlockWrapperClasses,
  getPreviewBlockWrapperStyle,
} from "@/lib/functions/livePreview/blockWrapper";

export function PreviewLoadingState({ bg, ink }: { bg: string; ink: string }) {
  return (
    <div
      className="flex min-h-[100vh] h-full w-full flex-col items-center justify-center gap-4"
      style={{ backgroundColor: bg, color: ink }}
    >
      <Loader2 className="h-8 w-8 animate-spin text-foreground/40" />

      <div className="text-sm font-medium text-foreground/50 animate-pulse">
        Loading preview...
      </div>
    </div>
  );
}

export function PreviewBlock({
  block,
  blocks,
  site,
  theme,
  editMode,
  moveMode,
  isDesktop,
  isActive,
  isResizingThis,
  draggingElementId,
  dragGuides,
  onReorderBlocks,
  onUpdateBlock,
  onStartBlockResize,
  onBlendBlock,
}: any) {
  const variant = (block.props as { variant?: string }).variant;
  const Cmp = getBlockComponent(block.props.kind, variant, site.category, site.id);

  if (!Cmp) return null;

  try {
    const probe = Cmp({ ...block.props, theme });
    if (probe === null || probe === undefined || probe === false) return null;
  } catch {
    // If component uses hooks, it will throw outside render which indicates real component logic
  }

  const hasCustomBg = Boolean(block.bgColor);
  const isSpacer = block.props.kind === "spacer";

  const currentHeight = block.height ?? 200;
  const displayName = block.label ?? block.name ?? block.props.kind;

  const isNewBlock = Boolean(
    block.isCustom ||
    block.isNew ||
    block.props?.isCustom ||
    isSpacer
  );

  const componentProps = getPreviewBlockComponentProps(block, site);
  const blockTheme = getPreviewBlockTheme(theme, block);
  const wrapperClassName = getPreviewBlockWrapperClasses(block, { isActive });
  const innerClassName = getPreviewBlockInnerClasses(block);

  const hasFreePositioned = Boolean(
    site.previewEdits?.elements &&
    Object.entries(site.previewEdits.elements).some(
      ([key, el]: [string, any]) =>
        (el?.blockId === block.id || key.startsWith(`${block.id}:`)) &&
        el?.style?.freePositioned
    )
  );

  const wrapperStyle = getPreviewBlockWrapperStyle(block, theme, {
    isActive,
    hasFreePositioned,
  });

  return (
    <DraggableBlockWrapper
      block={block}
      blocks={blocks}
      onReorderBlocks={onReorderBlocks}
      ink={theme.ink}
      moveMode={moveMode}
      hasFreePositioned={hasFreePositioned}
    >
      <div
        data-block-id={block.id}
        data-block-kind={block.props.kind}
        data-has-custom-bg={hasCustomBg ? "true" : undefined}
        data-has-free-positioned={hasFreePositioned ? "true" : undefined}
        className={wrapperClassName}
        style={wrapperStyle}
      >
        <ResizeHandle
          isActive={isActive}
          isDesktop={isDesktop}
          isResizingThis={isResizingThis}
          blockId={block.id}
          currentHeight={currentHeight}
          blockHeight={block.height}
          displayName={displayName}
          isNewBlock={isNewBlock}
          onStartResize={onStartBlockResize}
          onBlend={onBlendBlock}
        />

        <div
          style={block.height ? { height: "100%" } : undefined}
          className={innerClassName}
        >
          <RenderedImageOverrides overrides={getImageOverrides(componentProps)}>
            <TextOverrideProvider overrides={block.props._textOverrides ?? {}}>
              <Cmp
                id={block.id}
                props={componentProps}
                theme={blockTheme}
                onChange={(patch: Record<string, unknown>) =>
                  editMode ? onUpdateBlock(block.id, patch) : undefined
                }
              />
            </TextOverrideProvider>
          </RenderedImageOverrides>
        </div>
      </div>
    </DraggableBlockWrapper>
  );
}

function ResizeHandle({
  isActive,
  isDesktop,
  isResizingThis,
  blockId,
  currentHeight,
  blockHeight,
  displayName,
  isNewBlock,
  onStartResize,
  onBlend,
}: any) {
  if (!isActive && !isDesktop) return null;

  return (
    <div
      data-preview-chrome
      data-blend-ignore
      onMouseDown={(e) => onStartResize(blockId, currentHeight, e)}
      onClick={(e) => e.stopPropagation()}
      className="absolute bottom-0 left-0 right-0 h-6 cursor-ns-resize z-30 flex items-center justify-center pointer-events-auto select-none group/resize"
      title="Drag to resize block height smoothly"
    >
      {isActive && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-foreground text-background px-2.5 py-0.5 rounded-full text-[10px] font-medium shadow-md pointer-events-auto">
          <span className="truncate max-w-[120px] capitalize">
            {displayName}
          </span>
          {isNewBlock && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onBlend(blockId, e);
              }}
              className="flex items-center gap-1 rounded bg-background/20 hover:bg-background/30 px-1.5 py-0.5 text-[9px] font-semibold transition-colors cursor-pointer"
              title="Blend block style and colors dynamically with portfolio"
            >
              <PencilLine className="h-2.5 w-2.5 text-accent" />
              Blend
            </button>
          )}
          {blockHeight && (
            <span className="font-mono opacity-80 text-[9px]">
              {blockHeight}px
            </span>
          )}
        </div>
      )}

      {/* Resize pill bar */}
      <div
        className={`h-1.5 w-20 rounded-full transition-all flex items-center justify-center ${
          isResizingThis
            ? "bg-foreground shadow-md scale-110 opacity-100"
            : isActive
              ? "bg-foreground/50 hover:bg-foreground/90 scale-105 opacity-90"
              : "bg-foreground/30 group-hover/resize:bg-foreground/80 group-hover/resize:scale-105 opacity-0 group-hover/block:opacity-100"
        }`}
      >
        <div className="h-0.5 w-6 rounded-full bg-background/80" />
      </div>

      {isResizingThis && (
        <div
          data-block-resize-badge
          className="absolute bottom-6 bg-foreground text-background px-2.5 py-0.5 rounded text-[10px] font-mono shadow-md pointer-events-none whitespace-nowrap"
        >
          Height: {blockHeight ?? currentHeight}px
        </div>
      )}
    </div>
  );
}