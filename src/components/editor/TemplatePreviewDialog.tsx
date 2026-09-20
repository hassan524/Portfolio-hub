import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TemplateSidebar } from "./ui/TemplateSidebar";
import { TemplateLivePreview } from "./ui/TemplateLivePreview";
import { ElementStylePanel } from "./ui/ElementStylePanel";
import { SaveDeployModal, slugifyName } from "@/components/common/SaveDeployModal";
import { useAppContext } from "@/context/AppContext";
import type { Block, SiteData, Theme } from "@/types/builder.schema";
import { SaveMode } from "@/components/common/SaveDeployModal";
import type { PreviewElementEdit, PreviewElementStyle, ResponsiveBreakpoint } from "@/types/previewEditTypes";
import { buildViewerAppFiles } from "@/lib/functions/deploy/buildViewerAppFiles";
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
import { PortfolioRow } from "@/types/portfolio";

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
  const [portfolio, setPortfolio] = useState<PortfolioRow | null>(null);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isSaving, setIsSaving] = useState(false);
  const [site, setSite] = useState<SiteData | null>(null);
  const [deployedPlatform, setdeployedPlatform] = useState<"vercel" | "netlify">();

  const [device, setDevice] = useState<"responsive" | "desktop">("desktop");
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [selectedElement, setSelectedElement] = useState<PreviewElementEdit | null>(null);
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [DeployModalOpen, setDeployModalOpen] = useState<boolean>(false);
  const [websiteName, setWebsiteName] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [description, setDescription] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const [deployFiles, setDeployFiles] = useState<Record<string, string> | null>(null);

  const [responsiveEditMode, setResponsiveEditMode] = useState(false);
  const [editBreakpoint, setEditBreakpoint] = useState<ResponsiveBreakpoint>("desktop");

  // Numeric change counter — Save unlocks once the user has made enough
  // distinct edits (see REQUIRED_CHANGES threshold in TemplateLivePreview).
  const [changeCount, setChangeCount] = useState(0);

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
    setChangeCount(0);
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
    setChangeCount((c) => c + 1);
  };

  const handleUpdateTheme = (patch: Partial<Theme>) => {
    updateTheme(setSite, patch, FALLBACK_THEME);
    setChangeCount((c) => c + 1);
  };

  const handleUpdateSiteMeta = (
    patch: Partial<Pick<SiteData, "category" | "logo">>,
  ) => {
    updateSiteMeta(setSite, patch);
    setChangeCount((c) => c + 1);
  };

  const handleReorderBlocks = (nextBlocks: Block[]) => {
    reorderBlocks(setSite, nextBlocks);
    setChangeCount((c) => c + 1);
  };

  const handleChangeElementStyle = (elementId: string, patch: Partial<PreviewElementStyle>) => {
    changeElementStyle(setSite, setSelectedElement, elementId, patch, editBreakpoint);
    setChangeCount((c) => c + 1);
  };

  const handleRemoveSelectedElement = () => {
    removeSelectedElement(selectedElement, (elementId, patch) =>
      changeElementStyle(setSite, setSelectedElement, elementId, patch, editBreakpoint),
    );
    setChangeCount((c) => c + 1);
  };

  const handleResetSelectedElement = () => {
    resetSelectedElement(selectedElement, setSite, setSelectedElement);
    setChangeCount((c) => c + 1);
  };



  // ----------------------------------------- SAVING FUNCTIONS ----------------------------------------- 

  const handleWebsiteNameChange = (nextName: string) => {
    setWebsiteName(nextName);
  };

  const handleLiveUrlChange = (nextLiveUrl: string) => {
    setLiveUrl(nextLiveUrl);
  };

  const handleDescriptionChange = (nextDesc: string) => {
    setDescription(nextDesc);
  };

  const handleSaveClick = () => {
    const isPaid = profile?.is_paid === true;

    if (!isPaid) {
      onClose();
      setTimeout(() => navigate("/pricing"), 320);
      return;
    }

    const defaultName = site.category || "Portfolio";
    setWebsiteName(defaultName);
    setLiveUrl(slugifyName(defaultName));
    setDescription("");
    setSaveModalOpen(true);
  };

  const handleConfirmSave = async (
    mode: SaveMode,
    confirmedWebsiteName?: string,
    confirmedLiveUrl?: string,
    confirmedDescription?: string,
  ) => {
    setIsSaving(true);

    const finalWebsiteName = (confirmedWebsiteName || websiteName || site.category || "Portfolio").trim();
    const finalLiveUrl = (confirmedLiveUrl || liveUrl).trim();
    const finalDescription = (confirmedDescription || description).trim();

    setWebsiteName(finalWebsiteName);
    setLiveUrl(finalLiveUrl);

    try {
      const response = await portfolioApi.createPortfolio(finalWebsiteName, finalDescription, site, template.id, mode);
      const portfolio = response.data.portfolio;
      setPortfolio(portfolio);
      setSaveModalOpen(false);

      if (portfolio.isdraft) {
        toast.success("Saved as draft!");
        navigate(`/dashboard/${portfolio.id}`);
      } else {
        const files = await buildViewerAppFiles(site);
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

  if (typeof document === "undefined") return null;

  return createPortal(
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
                ? "h-screen w-screen rounded-none gap-2"
                : "h-[94vh] w-[98vw] max-w-[1800px] rounded-3xl gap-3"
                }`}
            >
              {/* Sidebar Controls - auto-collapses when element edit panel is open */}


              {/* Live Interactive Preview Canvas */}
              <TemplateLivePreview
                site={site}
                device={device}
                responsiveEditMode={responsiveEditMode}
                onResponsiveEditModeChange={setResponsiveEditMode}
                onBreakpointChange={setEditBreakpoint}
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
                changeCount={changeCount}
                contentRef={contentRef}
                onThemeChange={handleUpdateTheme}
              />

              {!selectedElement && (
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
              )}

              {/* Element Fine-Tuning Panel */}
              {selectedElement && (
                <ElementStylePanel
                  edit={selectedElement}
                  theme={theme}
                  responsiveEditMode={responsiveEditMode}
                  editBreakpoint={editBreakpoint}
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
        websiteName={websiteName}
        onWebsiteNameChange={handleWebsiteNameChange}
        liveUrl={liveUrl}
        onLiveUrlChange={handleLiveUrlChange}
        description={description}
        onDescriptionChange={handleDescriptionChange}
        onConfirmSave={handleConfirmSave}
        deployedPlatform={deployedPlatform}
        setDeployedPlatform={setdeployedPlatform}
        saving={isSaving}
      />

      <DeployModal
        portfolio={portfolio}
        open={DeployModalOpen}
        onOpenChange={setDeployModalOpen}
        name={liveUrl || websiteName || site.category || "Portfolio"}
        files={deployFiles}
        portfolioId={portfolio?.id || site?.id}
      />

    </>,
    document.body
  );
}