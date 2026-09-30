import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TemplateSidebar, type EditorControls } from "./ui/TemplateSidebar";
import { TemplateLivePreview } from "./ui/TemplateLivePreview";
import { ElementStylePanel } from "./ui/ElementStylePanel";
import { SaveDeployModal, slugifyName } from "@/components/common/SaveDeployModal";
import { toast } from "sonner";
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
import { AlertCircle } from "lucide-react";
import { DeployModal } from "../common/Deploymodal";
import { PortfolioRow } from "@/types/portfolio";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

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
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [confirmDiscardOpen, setConfirmDiscardOpen] = useState<boolean>(false);
  const [DeployModalOpen, setDeployModalOpen] = useState<boolean>(false);
  const [websiteName, setWebsiteName] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [description, setDescription] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const [deployFiles, setDeployFiles] = useState<Record<string, string> | null>(null);

  const [responsiveEditMode, setResponsiveEditMode] = useState(false);
  const [editBreakpoint, setEditBreakpoint] = useState<ResponsiveBreakpoint>("desktop");
  const [editorControls, setEditorControls] = useState<EditorControls | null>(null);

  // Numeric change counter — Save unlocks once the user has made enough
  // distinct edits (see REQUIRED_CHANGES threshold in TemplateLivePreview).
  const [changeCount, setChangeCount] = useState(0);

  const dialogRef = useRef<HTMLDivElement>(null);

  // ── Undo / Redo History Stack ───────────────────────────────────────
  const historyRef = useRef<SiteData[]>([]);
  const historyIndexRef = useRef<number>(-1);
  const isUndoRedoRef = useRef<boolean>(false);

  // Synchronize history when site changes
  useEffect(() => {
    if (!site) return;
    if (isUndoRedoRef.current) {
      isUndoRedoRef.current = false;
      return;
    }
    const serialized = JSON.stringify(site);
    const lastSerialized =
      historyRef.current.length > 0 && historyIndexRef.current >= 0
        ? JSON.stringify(historyRef.current[historyIndexRef.current])
        : null;
    if (serialized === lastSerialized) return;

    const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
    newHistory.push(JSON.parse(serialized));
    if (newHistory.length > 50) newHistory.shift();
    historyRef.current = newHistory;
    historyIndexRef.current = newHistory.length - 1;
  }, [site]);

  const handleUndo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current -= 1;
      isUndoRedoRef.current = true;
      const targetSite = JSON.parse(JSON.stringify(historyRef.current[historyIndexRef.current]));
      setSite(targetSite);
      setSelectedElement((prev) => {
        if (!prev) return null;
        const nextElem = targetSite.previewEdits?.elements?.[prev.id];
        return nextElem ? { ...prev, style: nextElem.style ?? {} } : prev;
      });
      setChangeCount(Math.max(0, historyIndexRef.current));
    }
  }, []);

  const handleRedo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current += 1;
      isUndoRedoRef.current = true;
      const targetSite = JSON.parse(JSON.stringify(historyRef.current[historyIndexRef.current]));
      setSite(targetSite);
      setSelectedElement((prev) => {
        if (!prev) return null;
        const nextElem = targetSite.previewEdits?.elements?.[prev.id];
        return nextElem ? { ...prev, style: nextElem.style ?? {} } : prev;
      });
      setChangeCount(historyIndexRef.current);
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      const active = document.activeElement;
      if (
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement ||
        (active as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      if (!isCtrlOrCmd) return;

      if (e.key === "z" || e.key === "Z") {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if (e.key === "y" || e.key === "Y") {
        e.preventDefault();
        handleRedo();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleUndo, handleRedo]);

  const handleAttemptClose = () => {
    if (changeCount >= 10) {
      setConfirmDiscardOpen(true);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (!open) {
      setResponsiveEditMode(false);
      setDevice("desktop");
      setSelectedElement(null);
      setMobilePanelOpen(false);
      return;
    }

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
    if (template) {
      const initialName = template.name || template.category || "Portfolio";
      setWebsiteName(initialName);
      setLiveUrl(slugifyName(initialName));
    }
    setChangeCount(0);
    setDeployFiles(null);
    historyRef.current = [];
    historyIndexRef.current = -1;
    isUndoRedoRef.current = false;
  }, [template]);

  // On mobile, default to responsive mode and show desktop hint toast
  useEffect(() => {
    if (!open) return;
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      setDevice("responsive");
      toast("This editor works best on desktop", {
        description: "Switch to a larger screen for the full experience.",
        position: "bottom-center",
        duration: 4000,
        style: { background: "#111", color: "#fff", border: "1px solid #333" },
      });
    }
  }, [open]);

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
  const handleSelectElement = (elem: PreviewElementEdit | null) => {
    setSelectedElement(elem);
  };

  const handleUpdateBlockProps = (blockId: string, patch: Record<string, unknown>) => {
    updateBlockProps(setSite, blockId, patch);
    setChangeCount((c) => c + 1);
  };

  const handleUpdateTheme = (patch: Partial<Theme>) => {
    updateTheme(setSite, patch, FALLBACK_THEME);
    setChangeCount((c) => (c < 10 ? c + 1 : c));
  };

  const handleUpdateSiteMeta = (
    patch: Partial<Pick<SiteData, "category" | "logo" | "name">>,
  ) => {
    updateSiteMeta(setSite, patch);
    if (patch.name !== undefined) {
      setWebsiteName(patch.name);
      setLiveUrl(slugifyName(patch.name));
    }
    setChangeCount((c) => c + 1);
  };

  const handleReorderBlocks = (nextBlocks: Block[]) => {
    reorderBlocks(setSite, nextBlocks);
    setChangeCount((c) => c + 1);
  };

  const handleChangeElementStyle = (elementId: string, patch: Partial<PreviewElementStyle>) => {
    changeElementStyle(setSite, setSelectedElement, elementId, patch, editBreakpoint, responsiveEditMode);
    setChangeCount((c) => c + 1);
  };

  const sectionLinks = site.blocks
    .flatMap((block) => {
      const customHref = typeof block.sectionHref === "string" && block.sectionHref.trim()
        ? (block.sectionHref.startsWith("#") ? block.sectionHref : `#${block.sectionHref}`)
        : "";
      if (block.sectionHref === "") {
        return [];
      }
      if (customHref) {
        return [customHref];
      }
      const rawNames = [
        block.props.kind === "hero" ? "home" : block.props.kind,
        block.label,
        block.name,
      ].filter(Boolean) as string[];

      return rawNames.map((name) => `#${String(name).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`);
    })
    .filter((link, index, all) => link.length > 1 && all.indexOf(link) === index);

  const handleRemoveSelectedElement = () => {
    removeSelectedElement(selectedElement, (elementId, patch) =>
      changeElementStyle(setSite, setSelectedElement, elementId, patch, editBreakpoint, responsiveEditMode),
    );
    setChangeCount((c) => c + 1);
    setSelectedElement(null);
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

    const defaultName = site.name || websiteName || site.category || "Portfolio";
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
        console.log('Final site data', site)
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
            onClick={handleAttemptClose}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <motion.div
              ref={dialogRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
              className={`relative border border-border bg-background shadow-lift overflow-hidden flex flex-col lg:flex-row ${isMaximized
                ? "h-screen w-screen rounded-none gap-0 lg:gap-2"
                : "h-full w-full sm:h-[94vh] sm:w-[98vw] max-w-[1800px] rounded-none sm:rounded-3xl gap-0 lg:gap-3"
                }`}
            >
              {/* Live Interactive Preview Canvas */}
              <TemplateLivePreview
                site={site}
                device={device}
                responsiveEditMode={responsiveEditMode}
                onResponsiveEditModeChange={setResponsiveEditMode}
                onBreakpointChange={setEditBreakpoint}
                activeSection={activeSection}
                selectedElementId={selectedElement?.id ?? null}
                selectedElement={selectedElement}
                onSelectElement={handleSelectElement}
                onChangeElementStyle={handleChangeElementStyle}
                onDeviceChange={setDevice}
                onUpdateBlock={handleUpdateBlockProps}
                onReorderBlocks={handleReorderBlocks}
                isMaximized={isMaximized}
                setIsMaximized={setIsMaximized}
                dialogRef={dialogRef}
                onToggleMaximize={toggleMaximize}
                onClose={handleAttemptClose}
                onSave={handleSaveClick}
                changeCount={changeCount}
                contentRef={contentRef}
                onThemeChange={handleUpdateTheme}
                sectionLinks={sectionLinks}
                onOpenMobileMenu={() => setMobilePanelOpen(true)}
                onControlsReady={setEditorControls}
              />

              {/* Mobile overlay backdrop when panel is open on screens < lg */}
              {mobilePanelOpen && (
                <div
                  className="lg:hidden fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
                  onClick={() => setMobilePanelOpen(false)}
                />
              )}

              {/* Sidebar Controls or Element Style Panel */}
              <div
                className={`
                  fixed inset-y-0 left-0 z-[70] w-[280px] sm:w-[320px]
                  lg:relative lg:inset-auto lg:z-auto lg:w-[320px] lg:max-w-none lg:order-last
                  transition-transform duration-200 ease-out flex flex-col h-full shrink-0 bg-zinc-950
                  ${mobilePanelOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0 pointer-events-none lg:pointer-events-auto"}
                `}
              >
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
                    onMobileClose={() => setMobilePanelOpen(false)}
                    editorControls={editorControls}
                    responsiveEditMode={responsiveEditMode}
                  />
                )}

                {/* Element Fine-Tuning Panel */}
                {selectedElement && (
                  <ElementStylePanel
                    edit={selectedElement}
                    theme={theme}
                    responsiveEditMode={responsiveEditMode}
                    editBreakpoint={editBreakpoint}
                    availableSectionLinks={sectionLinks}
                    onChange={(patch) => handleChangeElementStyle(selectedElement.id, patch)}
                    onRemove={handleRemoveSelectedElement}
                    onReset={handleResetSelectedElement}
                    onClose={() => {
                      setSelectedElement(null);
                      setMobilePanelOpen(false);
                    }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Discard Changes Confirmation Modal */}
      <Dialog open={confirmDiscardOpen} onOpenChange={setConfirmDiscardOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl text-white [&>button]:hidden">
          <div className="mb-3.5">
            <h3 className="text-base font-bold text-zinc-100">Discard unsaved changes?</h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              You have made some changes to the template.
            </p>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed mb-6">
            Are you sure you want to exit the editor? Any unsaved edits will be permanently lost.
          </p>

          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setConfirmDiscardOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
            >
              Keep Editing
            </button>
            <button
              type="button"
              onClick={() => {
                setConfirmDiscardOpen(false);
                onClose();
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm"
            >
              Exit
            </button>
          </div>
        </DialogContent>
      </Dialog>

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
