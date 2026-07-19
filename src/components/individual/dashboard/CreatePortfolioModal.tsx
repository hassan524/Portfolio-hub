import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { TEMPLATES } from "@/lib/templates";

interface CreatePortfolioModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, subdomain: string, template: string) => void;
  defaultTemplate?: string;
}

export function CreatePortfolioModal({
  open,
  onClose,
  onSubmit,
  defaultTemplate,
}: CreatePortfolioModalProps) {
  const [name, setName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [template, setTemplate] = useState("Atlas");

  useEffect(() => {
    if (open) {
      setTemplate(defaultTemplate || "Atlas");
    }
  }, [open, defaultTemplate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name, subdomain, template);
    setName("");
    setSubdomain("");
    setTemplate("Atlas");
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-2xl rounded-3xl border border-border bg-surface-elevated p-6 shadow-lift z-10 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-ink-soft hover:text-ink hover:bg-secondary/60 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="font-display text-2xl mb-1">Create Portfolio</h3>
            <p className="text-xs text-ink-soft mb-5">Set up your new professional website template.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-ink">Portfolio Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Design Portfolio 2026"
                    className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-ink">Subdomain slug</label>
                  <div className="mt-1 flex rounded-xl border border-border bg-surface overflow-hidden">
                    <input
                      type="text"
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value)}
                      placeholder="hassan-dev"
                      className="flex-1 px-3 py-2.5 text-sm focus:outline-none bg-surface"
                    />
                    <span className="bg-secondary px-3 py-2.5 text-xs text-ink-soft border-l border-border flex items-center font-mono">
                      .portfoliohub.app
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-ink">Layout Template Style</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
                  {TEMPLATES.map((t) => {
                    const isSelected = template.toLowerCase() === t.name.toLowerCase() || (template === "Terminal" && t.name === "Monoline");
                    return (
                      <div
                        key={t.slug}
                        onClick={() => setTemplate(t.name)}
                        className={`group relative rounded-2xl border p-4.5 cursor-pointer transition-all ${
                          isSelected
                            ? "border-foreground bg-secondary/35 shadow-soft"
                            : "border-border hover:border-foreground/20 bg-surface/50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-xs font-bold flex items-center gap-1.5 flex-wrap">
                              <span className="truncate">{t.name}</span>
                              <span className="text-[8px] font-bold uppercase tracking-wider text-ink-soft/90 bg-secondary/80 px-1.5 py-0.5 rounded border border-border/40 shrink-0">
                                {t.category}
                              </span>
                            </div>
                            <p className="text-[10px] text-ink-soft mt-1 leading-normal pr-4">
                              {t.tagline}
                            </p>
                          </div>
                          <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? "bg-foreground border-foreground text-background" : "border-border bg-surface"
                          }`}>
                            {isSelected && <span className="text-[9px] font-bold">✓</span>}
                          </div>
                        </div>
                        {/* Colors Preview */}
                        <div className="mt-3 flex gap-1.5">
                          {t.palette.map((c, idx) => (
                            <span
                              key={idx}
                              className="h-3 w-3 rounded-full border border-border/60"
                              style={{ backgroundColor: c }}
                              title={c}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-full border border-border py-2.5 text-xs font-semibold hover:bg-secondary cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-foreground text-background py-2.5 text-xs font-semibold hover:shadow-soft cursor-pointer"
                >
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
