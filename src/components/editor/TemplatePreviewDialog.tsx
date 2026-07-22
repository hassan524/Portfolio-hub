import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { TemplateSidebar } from "./TemplateSidebar";
import { TemplateLivePreview } from "./TemplateLivePreview";
import type { SiteData, Theme } from "@/types/builder.schema";

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

  useEffect(() => {
    setSite(template ? structuredClone(template) : null);
  }, [template]);

  if (!open || !template || !site) return null;

  const theme = site.theme ?? FALLBACK_THEME;

  // Generic patch merge for ANY block kind — each block component now
  // knows how to build its own patch (e.g. { items: [...] }) and just
  // calls onChange(patch). No more one-off handlers per block type.
  function updateBlockProps(blockId: string, patch: Record<string, any>) {
    setSite((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        blocks: prev.blocks.map((b) =>
          b.id === blockId ? { ...b, props: { ...b.props, ...patch } } : b
        ),
      };
    });
  }

  function updateTheme(patch: Partial<Theme>) {
    setSite((prev) =>
      prev ? { ...prev, theme: { ...(prev.theme ?? FALLBACK_THEME), ...patch } } : prev
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[96vw] h-[92vh] max-w-[1600px] rounded-3xl border border-border bg-background shadow-lift overflow-hidden flex"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-surface-elevated border border-border hover:bg-secondary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <TemplateSidebar
              site={site}
              theme={theme}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              onThemeChange={updateTheme}
              onSave={onSave}
            />

            <TemplateLivePreview site={site} onUpdateBlock={updateBlockProps} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
