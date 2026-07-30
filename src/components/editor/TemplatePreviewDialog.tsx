import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TemplateSidebar } from "./TemplateSidebar";
import { TemplateLivePreview } from "./TemplateLivePreview";
import { ElementStylePanel } from "./ElementStylePanel";
import type { Block, SiteData, Theme } from "@/types/builder.schema";
import type { PreviewElementEdit, PreviewElementStyle } from "@/types/previewEditTypes";

import {
  toggleMaximize,
  updateBlockProps,
  updateTheme,
  updateSiteMeta,
  reorderBlocks,
  changeElementStyle,
  removeSelectedElement,
  resetSelectedElement,
  syncTemplateState,
  handleFullscreenChange,
} from "@/lib/functions/TemplateDialog";

interface Props {
  template: SiteData | null;
  open: boolean;
  onClose: () => void;
  onSave?: (site: SiteData) => void;
}

const FALLBACK_THEME: Theme = {
  bg: "#ffffff",
  ink: "#111111",
  accent: "#6366f1",
  fontHeading: "inherit",
  fontBody: "inherit",
  corners: "soft",
  spacing: "cozy",
};

/**
 * Modal dialog component for previewing and customizing portfolio templates in real time.
 */
export function TemplatePreviewDialog({ template, open, onClose, onSave }: Props) {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [site, setSite] = useState<SiteData | null>(null);
  const [device, setDevice] = useState<"responsive" | "desktop">("desktop");
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [selectedElement, setSelectedElement] = useState<PreviewElementEdit | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);

  // Synchronize state when a new template target opens
  useEffect(() => {
    syncTemplateState(template, setSite, setActiveSection, setDevice, setIsMaximized, setSelectedElement);
  }, [template]);

  // Synchronize maximization state with native browser fullscreen state changes
  useEffect(() => {
    function onFullscreenChange() {
      handleFullscreenChange(setIsMaximized);
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  if (!open || !template || !site) return null;

  const theme = site.theme ?? FALLBACK_THEME;

  // ── State Handler Delegates ──────────────────────────────────────────
  const handleUpdateBlockProps = (blockId: string, patch: Record<string, unknown>) => {
    updateBlockProps(setSite, blockId, patch);
  };

  const handleUpdateTheme = (patch: Partial<Theme>) => {
    updateTheme(setSite, patch, FALLBACK_THEME);
  };

  const handleUpdateSiteMeta = (patch: Partial<Pick<SiteData, "name" | "category" | "tagline">>) => {
    updateSiteMeta(setSite, patch);
  };

  const handleReorderBlocks = (nextBlocks: Block[]) => {
    reorderBlocks(setSite, nextBlocks);
  };

  const handleChangeElementStyle = (elementId: string, patch: Partial<PreviewElementStyle>) => {
    changeElementStyle(setSite, setSelectedElement, elementId, patch);
  };

  const handleRemoveSelectedElement = () => {
    removeSelectedElement(selectedElement, (elementId, patch) =>
      changeElementStyle(setSite, setSelectedElement, elementId, patch)
    );
  };

  const handleResetSelectedElement = () => {
    resetSelectedElement(selectedElement, setSite, setSelectedElement);
  };

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
            className={`relative border border-border bg-background shadow-lift overflow-hidden flex ${
              isMaximized
                ? "h-screen w-screen rounded-none"
                : "h-[94vh] w-[98vw] max-w-[1800px] rounded-3xl"
            }`}
          >
            {/* Sidebar Controls */}
            <TemplateSidebar
              site={site}
              theme={theme}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              onThemeChange={handleUpdateTheme}
              onSiteMetaChange={handleUpdateSiteMeta}
              onUpdateBlock={handleUpdateBlockProps}
              onReorderBlocks={handleReorderBlocks}
              onSave={onSave}
            />

            {/* Live Interactive Preview Canvas */}
            <TemplateLivePreview
              site={site}
              device={device}
              activeSection={activeSection}
              selectedElementId={selectedElement?.id ?? null}
              onSelectElement={setSelectedElement}
              onChangeElementStyle={handleChangeElementStyle}
              onDeviceChange={setDevice}
              onUpdateBlock={handleUpdateBlockProps}
              onReorderBlocks={handleReorderBlocks}
              isMaximized={isMaximized}
              setIsMaximized={setIsMaximized}
              dialogRef={dialogRef}
              onToggleMaximize={toggleMaximize}
              onClose={onClose}
              onSave={onSave}
            />

            {/* Element Fine-Tuning Panel */}
            {selectedElement && (
              <ElementStylePanel
                edit={selectedElement}
                onChange={(patch) => handleChangeElementStyle(selectedElement.id, patch)}
                onRemove={handleRemoveSelectedElement}
                onReset={handleResetSelectedElement}
                onClose={() => setSelectedElement(null)}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}