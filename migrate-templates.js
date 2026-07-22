/**
 * migrate-templates.js
 *
 * Adds `variant` into every block's props, derived from the existing
 * `type` field (e.g. "HeroCentered" -> variant "centered").
 * Run once against your templates folder. Writes a .bak of each file first.
 *
 * Usage:
 *   node migrate-templates.js "C:\Users\romes\Desktop\Hassan Rehan\portfolio-spark\src\data\templates"
 */

const fs = require("fs");
const path = require("path");

const dir = process.argv[2];
if (!dir) {
  console.error("Usage: node migrate-templates.js <templates-folder>");
  process.exit(1);
}

// Exact overrides for `type` strings that don't cleanly map to a variant
// by stripping the kind prefix. Add to this as you find more.
const OVERRIDES = {
  HeroCentered: "centered",
  HeroSplit: "split-image",
  HeroSplitImage: "split-image",
  HeroFullbleed: "fullbleed",
  HeroFullBleed: "fullbleed",
  HeroTerminal: "terminal",
  HeroMarquee: "marquee",
  HeroStackedLeft: "stacked-left",

  ProjectsGrid: "grid",
  ProjectsList: "list-rows",
  ProjectsListRows: "list-rows",

  AboutSimple: "two-column",
  AboutTwoColumn: "two-column",

  ContactForm: "simple-links",
  ContactSimple: "simple-links",
  ContactLinks: "simple-links",

  NavbarMinimal: "minimal",
  NavbarCentered: "centered-logo",
  NavbarSplit: "split",
  NavbarMega: "mega",
  NavbarSidebar: "sidebar",

  FooterSimple: "minimal",
  FooterMinimal: "minimal",

  TestimonialsCarousel: "carousel",
  TestimonialsGrid: "grid-cards",

  StatsRow: "counter-row",
  StatsCounter: "counter-row",
};

// Variants that actually exist in the registry right now, per kind.
// Used to validate + as the fallback if nothing matches.
const KNOWN_VARIANTS = {
  navbar: ["minimal", "centered-logo", "split", "mega", "sidebar"],
  hero: ["centered", "split-image", "fullbleed", "terminal", "marquee", "stacked-left"],
  projects: ["grid", "list-rows"],
  about: ["two-column"],
  contact: ["simple-links"],
  footer: ["minimal"],
  testimonials: ["carousel", "grid-cards"],
  stats: ["counter-row"],
};

function toKebab(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function deriveVariant(kind, type) {
  if (OVERRIDES[type]) return OVERRIDES[type];

  // Strip a leading kind-name prefix, e.g. "Hero" off "HeroCentered"
  const kindPascal = kind.charAt(0).toUpperCase() + kind.slice(1);
  let rest = type.startsWith(kindPascal) ? type.slice(kindPascal.length) : type;
  if (!rest) rest = type;

  const slug = toKebab(rest);
  const known = KNOWN_VARIANTS[kind] || [];
  if (known.includes(slug)) return slug;

  // No confident match -> fall back to the kind's first known variant
  return known[0];
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
let changed = 0;
const unmapped = new Set();

for (const file of files) {
  const full = path.join(dir, file);
  const raw = fs.readFileSync(full, "utf8");
  const data = JSON.parse(raw);
  let touched = false;

  for (const block of data.blocks || []) {
    const kind = block.props?.kind;
    if (!kind || !KNOWN_VARIANTS[kind]) continue; // unregistered kind, skip
    if (block.props.variant) continue; // already migrated

    const variant = deriveVariant(kind, block.type || "");
    if (!variant) {
      unmapped.add(`${file}: ${block.type}`);
      continue;
    }
    block.props.variant = variant;
    touched = true;
  }

  if (touched) {
    fs.writeFileSync(full + ".bak", raw); // backup original
    fs.writeFileSync(full, JSON.stringify(data, null, 2));
    changed++;
  }
}

console.log(`Updated ${changed} of ${files.length} files.`);
if (unmapped.size) {
  console.log("\nCouldn't confidently map these (left without variant, will use fallback):");
  unmapped.forEach((u) => console.log("  " + u));
  console.log("\nAdd them to OVERRIDES in this script and re-run if you want exact control.");
}
