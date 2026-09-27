import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loader2, PencilLine } from "lucide-react";

import type { Block, Theme } from "@/types/builder.schema";
import { getBlockComponent } from "@/lib/blockRegistry";
import { uploadBlockImage } from "@/lib/uploadBlockImage";
import { IMAGE_OVERRIDES_PROP, getImageOverrides } from "@/lib/imageOverrideUtils";
import { RenderedImageOverrides } from "@/lib/renderedImageOverrides";
import {
  buildImagePathMap,
  extractImageUrlsFromProps,
  setNestedValue,
  type ImagePath,
  type SidebarImageEntry,
} from "@/lib/functions/sidebar";
import type { ImagesTabProps } from "./types";

export function ImagesTab({
  blocks,
  theme,
  site,
  onUpdateBlock,
  onSiteMetaChange,
  onSectionChange,
}: ImagesTabProps) {
  return (
    <div className="space-y-5">
      {blocks.map((block) => (
        <BlockImagesEntry
          key={block.id}
          block={block}
          theme={theme}
          site={site}
          onUpdateBlock={onUpdateBlock}
          onSiteMetaChange={onSiteMetaChange}
          onSectionChange={onSectionChange}
        />
      ))}
    </div>
  );
}

function BlockImagesEntry({
  block,
  theme,
  site,
  onUpdateBlock,
  onSiteMetaChange,
  onSectionChange,
}: {
  block: Block;
  theme: Theme;
  site: ImagesTabProps["site"];
  onUpdateBlock: ImagesTabProps["onUpdateBlock"];
  onSiteMetaChange: ImagesTabProps["onSiteMetaChange"];
  onSectionChange: ImagesTabProps["onSectionChange"];
}) {
  const probeRef = useRef<HTMLDivElement>(null);
  const variant = (block.props as { variant?: string }).variant;
  const Cmp = getBlockComponent(block.props.kind, variant, site.category, site.id);
  const componentProps = useMemo(
    () =>
      block.props.kind === "navbar" || block.props.kind === "footer"
        ? { ...block.props, logo: site.logo }
        : block.props,
    [block.props, site.logo],
  );

  const discoverImages = useCallback(() => {
    const foundMap = new Map<string, SidebarImageEntry>();
    const pathBySrc = buildImagePathMap(componentProps);
    const overrides = getImageOverrides(componentProps as Record<string, unknown>);

    const propsImages = extractImageUrlsFromProps(componentProps);
    for (const item of propsImages) {
      const activeSrc = overrides[item.url] || item.url;
      const isLogoPath =
        (block.props.kind === "navbar" || block.props.kind === "footer") &&
        (item.path?.includes("logo") || item.url === site.logo);

      foundMap.set(item.url, {
        src: activeSrc,
        originalSrc: item.url,
        siteKey: isLogoPath ? "logo" : undefined,
        path: item.path,
      });
    }

    scanImageDom(probeRef.current, foundMap, pathBySrc, overrides);

    if ((block.props.kind === "navbar" || block.props.kind === "footer") && site.logo) {
      if (!foundMap.has(site.logo)) {
        foundMap.set(site.logo, {
          src: site.logo,
          originalSrc: site.logo,
          siteKey: "logo",
          path: null,
        });
      }
    }

    return Array.from(foundMap.values());
  }, [block.props.kind, componentProps, site.logo]);

  const [images, setImages] = useState<SidebarImageEntry[]>([]);

  useEffect(() => {
    const update = () => {
      const discovered = discoverImages();
      setImages(discovered ?? []);
    };

    update();

    const root = probeRef.current;
    if (!root) return;

    const observer = new MutationObserver(update);
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src"],
    });

    return () => observer.disconnect();
  }, [discoverImages]);

  if (!Cmp) return null;

  const displayName = block.label ?? block.name ?? block.props.kind;
  const probe = (
    <HiddenImageProbe
      probeRef={probeRef}
      component={Cmp}
      blockId={block.id}
      componentProps={componentProps}
      theme={theme}
    />
  );

  if (images.length === 0) return probe;

  return (
    <div className="space-y-3 pb-4 border-b border-border/60">
      {probe}

      <button
        type="button"
        onClick={() => onSectionChange(block.props.kind)}
        className="flex w-full cursor-pointer items-center gap-2 text-left text-xs font-medium capitalize text-ink-soft transition-colors hover:text-foreground"
      >
        <span className="truncate">{displayName}</span>
      </button>

      <div className="grid grid-cols-4 gap-2.5">
        {images.map((img, idx) => (
          <BlockImageThumb
            key={`${block.id}-${idx}`}
            url={img.src}
            editable={img.originalSrc.length > 0}
            onReplace={(newUrl) => {
              if (img.siteKey === "logo") {
                onSiteMetaChange({ logo: newUrl });
                return;
              }

              const currentOverrides = getImageOverrides(block.props as Record<string, unknown>);
              const nextOverrides = {
                ...currentOverrides,
                [img.originalSrc]: newUrl,
              };

              if (!img.path) {
                onUpdateBlock(block.id, {
                  [IMAGE_OVERRIDES_PROP]: nextOverrides,
                });
                return;
              }

              const nextProps = setNestedValue(block.props, img.path, newUrl) as Record<
                string,
                unknown
              >;
              nextProps[IMAGE_OVERRIDES_PROP] = nextOverrides;
              onUpdateBlock(block.id, nextProps);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function HiddenImageProbe({
  probeRef,
  component: Component,
  blockId,
  componentProps,
  theme,
}: {
  probeRef: React.RefObject<HTMLDivElement | null>;
  component: React.ComponentType<{
    id: string;
    props: Record<string, unknown>;
    theme: Theme;
    onChange: () => void;
  }>;
  blockId: string;
  componentProps: Record<string, unknown>;
  theme: Theme;
}) {
  return (
    <div
      ref={probeRef}
      aria-hidden
      style={{
        position: "fixed",
        left: -9999,
        top: -9999,
        width: 1280,
        height: 800,
        overflow: "hidden",
        opacity: 0,
        pointerEvents: "none",
        zIndex: -99,
      }}
    >
      <RenderedImageOverrides overrides={getImageOverrides(componentProps)}>
        <Component id={blockId} props={componentProps} theme={theme} onChange={() => {}} />
      </RenderedImageOverrides>
    </div>
  );
}

function scanImageDom(
  root: ParentNode | null,
  foundMap: Map<string, SidebarImageEntry>,
  pathBySrc: Map<string, ImagePath>,
  overrides: Record<string, string>,
) {
  if (!root) return;

  const imgEls = Array.from(root.querySelectorAll<HTMLImageElement>("img"));
  imgEls.forEach((img) => {
    const currentSrc = img.getAttribute("src") || img.src || "";
    const originalSrc = img.dataset.originalSrc || currentSrc;
    if (!originalSrc) return;

    const activeSrc = overrides[originalSrc] || currentSrc || originalSrc;
    if (!foundMap.has(originalSrc)) {
      foundMap.set(originalSrc, {
        src: activeSrc,
        originalSrc,
        path: pathBySrc.get(originalSrc) ?? pathBySrc.get(currentSrc) ?? null,
      });
    }
  });
}

function BlockImageThumb({
  url,
  editable,
  onReplace,
}: {
  url: string;
  editable: boolean;
  onReplace: (url: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);

  async function handleFile(file: File) {
    setIsUploading(true);
    try {
      const nextUrl = await uploadBlockImage(file);
      onReplace(nextUrl);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <label
      className={`group relative block aspect-square overflow-hidden rounded-lg border border-border bg-background shadow-sm transition-all ${
        editable ? "cursor-pointer hover:border-foreground/40 hover:shadow-md hover:scale-[1.02]" : "cursor-default"
      }`}
      title={editable ? "Replace image" : undefined}
    >
      <img
        src={url}
        alt=""
        className={`h-full w-full object-cover transition-all duration-300 ${
          isUploading ? "blur-sm scale-105 filter" : ""
        }`}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin text-white drop-shadow-md" />
        ) : editable ? (
          <PencilLine className="h-4 w-4 text-white opacity-0 transition-opacity group-hover:opacity-100 drop-shadow-md" />
        ) : null}
      </div>
      {editable && (
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) handleFile(file);
            event.target.value = "";
          }}
        />
      )}
    </label>
  );
}
