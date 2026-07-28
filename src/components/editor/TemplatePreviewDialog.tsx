import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TemplateSidebar } from "./TemplateSidebar";
import { TemplateLivePreview } from "./TemplateLivePreview";
import { ElementStylePanel } from "./ElementStylePanel";
import type { Block, SiteData, Theme } from "@/types/builder.schema";
import type { PreviewElementEdit, PreviewElementStyle } from "./previewEditTypes";

type Props = {
  template: SiteData | null;
  open: boolean;
  onClose: () => void;
  onSave?: (site: SiteData) => void;
};

const FALLBACK_THEME: Theme = {
  bg: "#ffffff",
  ink: "#111111",
  accent: "#6366f1",
  fontHeading: "inherit",
  fontBody: "inherit",
  corners: "soft",
  spacing: "cozy",
};

export function TemplatePreviewDialog({ template, open, onClose, onSave }: Props) {
  const [activeSection, setActiveSection] = useState("hero");

  // ── THE MAIN JSON ────────────────────────────────────────────────
  // `site` is the ONE object that holds everything: blocks, theme,
  // meta (name/category/tagline), and previewEdits (per-element style
  // overrides). Every editing function below just does setSite(...)
  // to update a piece of this same object. This is exactly what gets
  // sent to Supabase when the user clicks Save.
  const [site, setSite] = useState<SiteData | null>(null);

  const [device, setDevice] = useState<"responsive" | "desktop">("desktop");
  const [isMaximized, setIsMaximized] = useState(false);
  const [selectedElement, setSelectedElement] = useState<PreviewElementEdit | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Whenever a new template is opened, deep-clone it into `site` state
  // so we never mutate the original template object directly.
  useEffect(() => {
    setSite(template ? structuredClone(template) : null);
    setActiveSection(template?.blocks?.[0]?.props.kind ?? "hero");
    setDevice("desktop");
    setIsMaximized(false);
    setSelectedElement(null);
  }, [template?.id]);

  // ── LIVE JSON LOGGER ─────────────────────────────────────────────
  // This runs automatically every single time `site` changes — i.e.
  // after ANY edit (bold toggle, color change, text update, block
  // reorder, drag, theme change, etc). It prints the exact object
  // you'd persist to the DB at that moment. Later, replace this
  // console.log with your actual Supabase save call (debounced),
  // or just call it manually inside your "Save" button handler.
  useEffect(() => {
    if (!site) return;
    console.log("FULL SITE JSON (this is what gets saved to DB):", JSON.stringify(site, null, 2));
  }, [site]);

  useEffect(() => {
    function handleFullscreenChange() {
      if (!document.fullscreenElement) setIsMaximized(false);
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  async function toggleMaximize() {
    const next = !isMaximized;
    setIsMaximized(next);
    try {
      if (next) {
        await dialogRef.current?.requestFullscreen?.();
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {
      // fullscreen blocked by browser — CSS maximize still kicks in either way
    }
  }

  if (!open || !template || !site) return null;

  const theme = site.theme ?? FALLBACK_THEME;

  // Updates one block's own content props (text, image url, etc).
  // Finds the block by id inside site.blocks and merges the patch in.
  function updateBlockProps(blockId: string, patch: Record<string, unknown>) {
    setSite((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        blocks: prev.blocks.map((b) =>
          b.id === blockId ? { ...b, props: { ...b.props, ...patch } } : b,
        ),
      };
    });
  }

  // Updates the global theme (colors, fonts, corners, spacing).
  function updateTheme(patch: Partial<Theme>) {
    setSite((prev) =>
      prev ? { ...prev, theme: { ...(prev.theme ?? FALLBACK_THEME), ...patch } } : prev,
    );
  }

  // Updates top-level site meta: name, category, tagline.
  function updateSiteMeta(patch: Partial<Pick<SiteData, "name" | "category" | "tagline">>) {
    setSite((prev) => (prev ? { ...prev, ...patch } : prev));
  }

  // Re-orders blocks (drag and drop) and re-numbers their `order` field.
  function reorderBlocks(nextBlocks: Block[]) {
    setSite((prev) =>
      prev
        ? {
          ...prev,
          blocks: nextBlocks.map((block, order) => ({ ...block, order })),
        }
        : prev,
    );
  }

  // ── PER-ELEMENT STYLE EDITS ──────────────────────────────────────
  // This is what runs when you click Bold/Italic/color/radius/etc in
  // ElementStylePanel. It writes into site.previewEdits.elements,
  // keyed by the element's unique id (e.g. "hero:0.1"). Each key
  // stores a `{ style: {...} }` object — bold, color, padding, x, y,
  // etc. This map is what TemplateLivePreview reads from to actually
  // apply the visual style back onto the DOM (via applyPreviewStyle).
  function changeElementStyle(elementId: string, patch: Partial<PreviewElementStyle>) {
    setSite((prev): SiteData | null => {
      if (!prev) return prev;

      // Grab whatever style this element already has (if any)
      const prevElements = prev.previewEdits?.elements ?? {};
      const prevStyle = prevElements[elementId]?.style ?? {};

      // Merge the new patch (e.g. { bold: true }) into the existing style
      const nextStyle: PreviewElementStyle = { ...prevStyle, ...patch };

      // Put the updated style back into the elements map under the same id
      const nextElements = {
        ...prevElements,
        [elementId]: { style: nextStyle },
      };

      const nextPreviewEdits = {
        ...(prev.previewEdits ?? {}),
        elements: nextElements,
      };

      // Return a brand new site object (never mutate prev directly —
      // React needs a new reference to know it should re-render)
      const nextSite: SiteData = {
        ...prev,
        previewEdits: nextPreviewEdits,
      } as SiteData;

      return nextSite;
    });

    // Also keep the currently-open panel's local copy in sync so the
    // UI (bold button highlighted, color swatch, etc) reflects the change
    // immediately without waiting for the next site-level re-render.
    setSelectedElement((prev) =>
      prev && prev.id === elementId
        ? { ...prev, style: { ...prev.style, ...patch } }
        : prev,
    );
  }

  // Marks the selected element as removed (hidden) instead of deleting
  // it from the DOM structure — keeps it reversible via Reset.
  function removeSelectedElement() {
    if (!selectedElement) return;
    changeElementStyle(selectedElement.id, { removed: true });
  }

  // Clears all style overrides for the selected element, back to default.
  function resetSelectedElement() {
    if (!selectedElement) return;
    const elementId = selectedElement.id;
    setSite((prev) => {
      if (!prev?.previewEdits) return prev;
      const { [elementId]: _removed, ...rest } = prev.previewEdits.elements;
      return {
        ...prev,
        previewEdits: { ...prev.previewEdits, elements: rest },
      };
    });
    setSelectedElement((prev) => (prev && prev.id === elementId ? { ...prev, style: {} } : prev));
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`relative border border-border bg-background shadow-lift overflow-hidden flex ${isMaximized
                ? "h-screen w-screen rounded-none"
                : "h-[94vh] w-[98vw] max-w-[1800px] rounded-3xl"
              }`}
          >
            <TemplateSidebar
              site={site}
              theme={theme}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              onThemeChange={updateTheme}
              onSiteMetaChange={updateSiteMeta}
              onUpdateBlock={updateBlockProps}
              onReorderBlocks={reorderBlocks}
              onSave={onSave}
            />

            {/*
              TemplateLivePreview renders the actual blocks, listens for
              clicks on elements (sets selectedElement), and applies
              previewEdits styles back onto the DOM live as you edit.
            */}
            <TemplateLivePreview
              site={site}
              device={device}
              activeSection={activeSection}
              selectedElementId={selectedElement?.id ?? null}
              onSelectElement={setSelectedElement}
              onChangeElementStyle={changeElementStyle}
              onDeviceChange={setDevice}
              onUpdateBlock={updateBlockProps}
              onReorderBlocks={reorderBlocks}
              isMaximized={isMaximized}
              onToggleMaximize={toggleMaximize}
              onClose={onClose}
              onSave={onSave}
            />

            {/*
              ElementStylePanel only shows once something is selected.
              Every button here (Bold, color, radius, etc) calls
              changeElementStyle, which updates site.previewEdits above.
            */}
            {selectedElement && (
              <ElementStylePanel
                edit={selectedElement}
                onChange={(patch) => changeElementStyle(selectedElement.id, patch)}
                onRemove={removeSelectedElement}
                onReset={resetSelectedElement}
                onClose={() => setSelectedElement(null)}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}