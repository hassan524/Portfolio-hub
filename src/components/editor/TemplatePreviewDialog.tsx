import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TemplateSidebar } from "./ui/TemplateSidebar";
import { TemplateLivePreview } from "./ui/TemplateLivePreview";
import { ElementStylePanel } from "./ui/ElementStylePanel";
import { SaveDeployModal } from "@/components/common/SaveDeployModal";
import { useAppContext } from "@/context/AppContext";
import type { Block, SiteData, Theme } from "@/types/builder.schema";
import { SaveMode } from "@/components/common/SaveDeployModal";
import type { PreviewElementEdit, PreviewElementStyle } from "@/types/previewEditTypes";
import { buildViewerAppFiles } from "@/lib/buildReactAppTemplate";

import portfolioApi from "@/api/portfolioApi";
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
} from "@/lib/functions/template";
import { DeployModal } from "../common/Deploymodal";
import { toast } from "sonner";

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

export function TemplatePreviewDialog({ template, open, onClose }: Props) {
  const navigate = useNavigate();
  const { profile } = useAppContext();

  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isSaving, setIsSaving] = useState(false);
  const [site, setSite] = useState<SiteData | null>(null);
  const [deployedPlatform, setdeployedPlatform] = useState<"vercel" | "netlify">();

  const [device, setDevice] = useState<"responsive" | "desktop">("desktop");
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [selectedElement, setSelectedElement] = useState<PreviewElementEdit | null>(null);
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [DeployModalOpen, setDeployModalOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [deployFiles, setDeployFiles] = useState<Record<string, string> | null>(null);


  const [hasChanges, setHasChanges] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    syncTemplateState(
      template,
      setSite,
      setActiveSection,
      setDevice,
      setIsMaximized,
      setSelectedElement,
    );
    setHasChanges(false);
    setDeployFiles(null);
  }, [template]);

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
    setHasChanges(true);
  };

  const handleUpdateTheme = (patch: Partial<Theme>) => {
    updateTheme(setSite, patch, FALLBACK_THEME);
    setHasChanges(true);
  };

  const handleUpdateSiteMeta = (
    patch: Partial<Pick<SiteData, "name" | "category" | "tagline">>,
  ) => {
    updateSiteMeta(setSite, patch);
    setHasChanges(true);
  };

  const handleReorderBlocks = (nextBlocks: Block[]) => {
    reorderBlocks(setSite, nextBlocks);
    setHasChanges(true);
  };

  const handleChangeElementStyle = (elementId: string, patch: Partial<PreviewElementStyle>) => {
    changeElementStyle(setSite, setSelectedElement, elementId, patch);
    setHasChanges(true);
  };

  const handleRemoveSelectedElement = () => {
    removeSelectedElement(selectedElement, (elementId, patch) =>
      changeElementStyle(setSite, setSelectedElement, elementId, patch),
    );
    setHasChanges(true);
  };

  const handleResetSelectedElement = () => {
    resetSelectedElement(selectedElement, setSite, setSelectedElement);
    setHasChanges(true);
  };



  // ----------------------------------------- SAVING FUNCTIONS ----------------------------------------- 

  const handleSaveClick = () => {
    const isPaid = profile?.is_paid === true;

    if (!isPaid) {
      onClose();
      setTimeout(() => navigate("/pricing"), 320);
      return;
    }

    setSaveModalOpen(true);
  };


  const handleConfirmSave = async (mode: SaveMode, name: string, description: string) => {
    setIsSaving(true);
    try {
      const response = await portfolioApi.createPortfolio(name, description, site, template.id, mode);
      const portfolio = response.data;

      setSaveModalOpen(false);

      if (portfolio.isdraft) {
        toast.success("Saved as draft!");
        navigate(`/dashboard/${portfolio.id}`);
      } else {

        const files = await buildViewerAppFiles(site);
        console.log("Generated files for deployment:", files);
        setDeployFiles(files);

        toast.success("Portfolio saved!");
        setDeployModalOpen(true);
      }
    } catch (error) {

      console.error("Create portfolio error:", error);
      toast.error("Failed to save portfolio. Please try again.");

    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
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
              onWheel={(e) => e.stopPropagation()}
              className={`relative border border-border bg-background shadow-lift overflow-hidden flex ${isMaximized
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
                onSave={handleSaveClick}
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
                onSave={handleSaveClick}
                hasChanges={hasChanges}
                contentRef={contentRef}
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

      <SaveDeployModal
        open={saveModalOpen}
        onOpenChange={setSaveModalOpen}
        siteName={site.name}
        onConfirmSave={handleConfirmSave}
        deployedPlatform={deployedPlatform}
        setDeployedPlatform={setdeployedPlatform}
        saving={isSaving}
      />

      <DeployModal
        open={DeployModalOpen}
        onOpenChange={setDeployModalOpen}
        name={site.name}
        description={site.tagline}
        files={deployFiles}
      />

    </>
  );
}