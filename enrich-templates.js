/**
 * enrich-templates.js
 *
 * Run AFTER migrate-templates.js. This is what actually makes templates
 * look different from each other, not just recolored:
 *   - picks a different variant per kind per file (deterministic, not random-random,
 *     so re-running gives the same result / clean git diffs)
 *   - adds navbar / stats / testimonials blocks to files that don't have them
 *   - shuffles block order a bit (some files: stats before projects, etc.)
 *
 * Usage:
 *   node enrich-templates.js "C:\Users\romes\Desktop\Hassan Rehan\portfolio-spark\src\data\templates"
 */

const fs = require("fs");
const path = require("path");

const dir = process.argv[2];
if (!dir) {
  console.error("Usage: node enrich-templates.js <templates-folder>");
  process.exit(1);
}

const VARIANTS = {
  navbar: ["minimal", "centered-logo", "split", "mega", "sidebar"],
  hero: ["centered", "split-image", "fullbleed", "terminal", "marquee", "stacked-left"],
  projects: ["grid", "list-rows"],
  about: ["two-column", "timeline", "stats-side"],
  contact: ["simple-links", "big-email-link"],
  footer: ["minimal"],
  testimonials: ["carousel", "grid-cards"],
  stats: ["counter-row"],
};

const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const QUOTE_POOL = [
  "Delivered exactly what we needed, on time.",
  "Rare mix of taste and technical skill.",
  "Made a complicated project feel simple.",
  "Would work with them again without hesitation.",
  "Communicated clearly at every step.",
  "Raised the bar for what we expected.",
];
const NAME_POOL = [
  { name: "J. Carter", role: "Client" },
  { name: "M. Osei", role: "Collaborator" },
  { name: "R. Fischer", role: "Project Lead" },
  { name: "S. Nakamura", role: "Partner" },
];

const STAT_LABELS = ["Years experience", "Projects completed", "Happy clients", "Awards"];

// deterministic hash -> [0,1)
function seedFrom(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return () => {
    h = (Math.imul(1664525, h) + 1013904223) | 0;
    return ((h >>> 0) % 10000) / 10000;
  };
}

function pick(rand, arr) {
  return arr[Math.floor(rand() * arr.length)];
}

function newId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
let changed = 0;

for (const file of files) {
  const full = path.join(dir, file);
  const raw = fs.readFileSync(full, "utf8");
  const data = JSON.parse(raw);
  const rand = seedFrom(data.id || file);

  const kinds = new Set(data.blocks.map((b) => b.props?.kind));

  // 1. vary the variant on every existing block, deterministically per file
  for (const block of data.blocks) {
    const kind = block.props?.kind;
    if (!kind || !VARIANTS[kind]) continue;
    block.props.variant = pick(rand, VARIANTS[kind]);
  }

  // 2. add a navbar ~65% of files, if missing
  if (!kinds.has("navbar") && rand() < 0.65) {
    data.blocks.unshift({
      id: newId("nav"),
      type: "Navbar",
      order: 0,
      props: {
        kind: "navbar",
        variant: pick(rand, VARIANTS.navbar),
        logoText: (data.name || "Portfolio").split(" ")[0],
        links: NAV_LINKS,
        ctaLabel: rand() < 0.5 ? "Contact" : undefined,
        sticky: true,
      },
    });
    kinds.add("navbar");
  }

  // 3. add stats ~45% of files, if missing
  if (!kinds.has("stats") && rand() < 0.45) {
    const items = STAT_LABELS.slice(0, 3 + Math.floor(rand() * 2)).map((label) => ({
      label,
      value: String(1 + Math.floor(rand() * 40)),
    }));
    data.blocks.push({
      id: newId("stats"),
      type: "StatsCounterRow",
      order: 0,
      props: { kind: "stats", variant: "counter-row", items },
    });
    kinds.add("stats");
  }

  // 4. add testimonials ~50% of files, if missing
  if (!kinds.has("testimonials") && rand() < 0.5) {
    const count = 2 + Math.floor(rand() * 2);
    const items = Array.from({ length: count }, () => {
      const person = pick(rand, NAME_POOL);
      return { quote: pick(rand, QUOTE_POOL), name: person.name, role: person.role };
    });
    data.blocks.push({
      id: newId("testimonials"),
      type: "Testimonials",
      order: 0,
      props: { kind: "testimonials", variant: pick(rand, VARIANTS.testimonials), heading: "What people say", items },
    });
    kinds.add("testimonials");
  }

  // 5. reorder: hero always first (after navbar). Everything else gets
  // a stable but file-specific shuffle so not every template reads
  // navbar -> hero -> projects -> about -> contact in that exact order.
  const navBlock = data.blocks.filter((b) => b.props?.kind === "navbar");
  const heroBlock = data.blocks.filter((b) => b.props?.kind === "hero");
  const footerBlock = data.blocks.filter((b) => b.props?.kind === "footer");
  const middle = data.blocks.filter(
    (b) => !["navbar", "hero", "footer"].includes(b.props?.kind)
  );
  // simple deterministic shuffle
  for (let i = middle.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [middle[i], middle[j]] = [middle[j], middle[i]];
  }
  const final = [...navBlock, ...heroBlock, ...middle, ...footerBlock];
  final.forEach((b, i) => (b.order = i));
  data.blocks = final;

  fs.writeFileSync(full + ".enrich-bak", raw);
  fs.writeFileSync(full, JSON.stringify(data, null, 2));
  changed++;
}

console.log(`Enriched ${changed} of ${files.length} files.`);
