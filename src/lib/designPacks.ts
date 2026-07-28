import type { BlockKind } from "@/types/builder.schema";

// One pack = one coordinated look across every section.
// Your JSON only needs: "pack": "pack-7" at the top level.
export const DESIGN_PACKS: Record<string, Partial<Record<BlockKind, string>>> = {
  "pack-1": { navbar: "minimal",       hero: "centered",     about: "two-column", projects: "grid",       contact: "simple-links",   footer: "minimal", testimonials: "grid-cards", stats: "counter-row" },
  "pack-2": { navbar: "centered-logo", hero: "split-image",  about: "stats-side", projects: "list-rows",  contact: "big-email-link", footer: "minimal", testimonials: "carousel",   stats: "counter-row" },
  "pack-3": { navbar: "sidebar",       hero: "fullbleed",    about: "timeline",   projects: "grid",       contact: "simple-links",   footer: "minimal", testimonials: "grid-cards", stats: "counter-row" },
  "pack-4": { navbar: "split",         hero: "terminal",     about: "two-column", projects: "list-rows",  contact: "big-email-link", footer: "minimal", testimonials: "carousel",   stats: "counter-row" },
  "pack-5": { navbar: "mega",          hero: "marquee",      about: "stats-side", projects: "grid",       contact: "simple-links",   footer: "minimal", testimonials: "grid-cards", stats: "counter-row" },
  "pack-6": { navbar: "minimal",       hero: "stacked-left", about: "timeline",   projects: "list-rows",  contact: "big-email-link", footer: "minimal", testimonials: "carousel",   stats: "counter-row" },

  // New designs below — packs 7-10 this round, 11-20 coming next.
  "pack-7":  { navbar: "minimal",       hero: "big-serif",      about: "portrait-note",  projects: "grid",      contact: "simple-links",   footer: "minimal", testimonials: "grid-cards", stats: "counter-row" },
  "pack-8":  { navbar: "centered-logo", hero: "floating-card",  about: "stats-side",     projects: "list-rows", contact: "big-email-link", footer: "minimal", testimonials: "carousel",   stats: "counter-row" },
  "pack-9":  { navbar: "split",         hero: "diagonal-split", about: "two-column",     projects: "grid",      contact: "simple-links",   footer: "minimal", testimonials: "grid-cards", stats: "counter-row" },
  "pack-10": { navbar: "sidebar",       hero: "minimal-ticker", about: "timeline",       projects: "list-rows", contact: "big-email-link", footer: "minimal", testimonials: "carousel",   stats: "counter-row" },
};