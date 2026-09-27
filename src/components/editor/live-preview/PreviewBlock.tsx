import { Loader2, PencilLine } from "lucide-react";
import { getBlockComponent } from "@/lib/blockRegistry";
import { TextOverrideProvider } from "../ui/Editable";
import { DraggableBlockWrapper } from "../ui/DraggableBlockWrapper";
import { RenderedImageOverrides } from "@/lib/renderedImageOverrides";
import { getImageOverrides } from "@/lib/imageOverrideUtils";
import { GuideOverlay } from "../ui/GuideOverlay";

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

  const isNavbar = block.props.kind === "navbar";
  const isFooter = block.props.kind === "footer";
  const isSpacer = block.props.kind === "spacer";
  const hasCustomBg = Boolean(block.bgColor);

  const currentHeight = block.height ?? 200;
  const displayName = block.label ?? block.name ?? block.props.kind;

  const isNewBlock = Boolean(
    block.isCustom ||
    block.isNew ||
    block.props?.isCustom ||
    isSpacer
  );

  const componentProps =
    isNavbar || isFooter
      ? { ...block.props, logo: site.logo }
      : isSpacer
        ? {
          ...block.props,
          backgroundColor: block.bgColor || block.props.backgroundColor,
          backgroundImage: block.bgColor ? "none" : block.props.backgroundImage,
          isBlended: block.bgColor ? false : Boolean(block.props.isBlended),
        }
        : block.props;

  const blockTheme = hasCustomBg
    ? (isNavbar
        ? { ...theme, "bg-second": block.bgColor }
        : { ...theme, bg: block.bgColor, "bg-second": block.bgColor })
    : theme;

  const wrapperClassName = [
    "relative group/block",

    isNavbar &&
    "[&_header]:!relative [&_header]:!top-auto [&_header]:!h-auto [&_header]:!min-h-0 " +
    "[&_nav]:!relative [&_nav]:!top-auto [&_nav]:!h-auto [&_nav]:!min-h-0",

    block.height && !isNavbar &&
    "[&_section]:!h-full [&_section]:!min-h-full " +
    "[&_header]:!h-full [&_header]:!min-h-full " +
    "[&_nav]:!h-full [&_nav]:!min-h-full " +
    "[&_footer]:!h-full [&_footer]:!min-h-full",

    hasCustomBg && (
      isNavbar
        ? "[&_header]:!bg-transparent [&_nav]:!bg-transparent [&_header>div]:!bg-[var(--block-bg)] [&_nav>div]:!bg-[var(--block-bg)]"
        : "[&_section]:!bg-[var(--block-bg)] [&_header]:!bg-[var(--block-bg)] " +
          "[&_nav]:!bg-[var(--block-bg)] [&_footer]:!bg-[var(--block-bg)] " +
          "[&_header>div]:!bg-[var(--block-bg)] [&_nav>div]:!bg-[var(--block-bg)]"
    ),

    isActive && "outline outline-2 outline-offset-[-2px]",
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperStyle: React.CSSProperties = {
    ...(isActive ? { outlineColor: theme.accent } : undefined),
    minHeight: block.height ? `${block.height}px` : undefined,
    height: block.height ? `${block.height}px` : undefined,
    backgroundColor: isNavbar ? "transparent" : (block.bgColor || undefined),
    ...(hasCustomBg ? ({ "--block-bg": block.bgColor } as React.CSSProperties) : {}),
  };

  return (
    <DraggableBlockWrapper
      block={block}
      blocks={blocks}
      onReorderBlocks={onReorderBlocks}
      ink={theme.ink}
      moveMode={moveMode}
    >
      <div
        data-block-id={block.id}
        data-block-kind={block.props.kind}
        data-has-custom-bg={hasCustomBg ? "true" : undefined}
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
          style={{ height: !isNavbar && block.height ? "100%" : undefined }}
          className={!isNavbar && block.height ? "h-full [&>*]:!h-full [&>*]:!min-h-full" : undefined}
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

        {draggingElementId?.startsWith(`${block.id}:`) && (
          <div data-preview-chrome>
            <GuideOverlay guides={dragGuides} />
          </div>
        )}
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