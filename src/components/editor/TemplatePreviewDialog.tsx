import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TemplateSidebar } from "./TemplateSidebar";
import { TemplateLivePreview } from "./TemplateLivePreview";
import type { Block, SiteData, Theme } from "@/types/builder.schema";

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
  const [site, setSite] = useState<SiteData | null>(null);
  const [device, setDevice] = useState<"responsive" | "desktop">("desktop");
  const [isMaximized, setIsMaximized] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSite(template ? structuredClone(template) : null);
    setActiveSection(template?.blocks?.[0]?.props.kind ?? "hero");
    setDevice("desktop");
    setIsMaximized(false);
  }, [template]);

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

  function updateTheme(patch: Partial<Theme>) {
    setSite((prev) =>
      prev ? { ...prev, theme: { ...(prev.theme ?? FALLBACK_THEME), ...patch } } : prev,
    );
  }

  function updateSiteMeta(patch: Partial<Pick<SiteData, "name" | "category" | "tagline">>) {
    setSite((prev) => (prev ? { ...prev, ...patch } : prev));
  }

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
            {/* No buttons here anymore — maximize/close now live inside
                TemplateLivePreview's own header row so there's only ever
                one set of controls, not a floating duplicate. */}

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

            <TemplateLivePreview
              site={site}
              device={device}
              activeSection={activeSection}
              onDeviceChange={setDevice}
              onUpdateBlock={updateBlockProps}
              isMaximized={isMaximized}
              onToggleMaximize={toggleMaximize}
              onClose={onClose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}