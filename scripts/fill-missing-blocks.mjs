import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, "..", "src", "data", "templates");

// Every template must have these. Order here = canonical page order —
// used both to decide "where" a missing block goes, and to reorder
// the whole blocks array at the end so nothing ends up out of place.
const CANONICAL_ORDER = ["navbar", "hero", "projects", "about", "testimonials", "contact", "footer"];
const REQUIRED_KINDS = ["hero", "projects", "about", "testimonials", "contact", "footer"];

// same hash used by the diversify script — so a newly-added block
// picks the SAME variant "set number" as the rest of that template,
// instead of clashing with a different style.
function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function setNumberFor(templateId) {
  return (hash(templateId) % 20) + 1;
}

function uniqueId(existingIds, kind) {
  let n = 1;
  let id = `block-${kind}-${n}`;
  while (existingIds.has(id)) {
    n++;
    id = `block-${kind}-${n}`;
  }
  return id;
}

// ---- default props builders, one per kind — shapes match your schema exactly ----

function defaultHero(site, setNumber) {
  return {
    kind: "hero",
    eyebrow: "Portfolio · 2026",
    name: site.name?.split("—")[1]?.trim() || site.name || "Your Name",
    tagline: site.tagline || "Building thoughtful work.",
    bio: `Independent ${site.category?.toLowerCase() || "professional"}. Currently focused on helping ambitious teams and clients ship thoughtful, considered work.`,
    primaryCta: "View work",
    secondaryCta: "Get in touch",
    location: "",
    availability: "Available for freelance",
    align: "left",
    variant: `hero-${setNumber}`,
  };
}

function defaultProjects(site, setNumber) {
  return {
    kind: "projects",
    eyebrow: "Selected Work",
    heading: "Recent projects",
    items: [
      { title: "Project One", desc: "A brief description of the work", featured: true },
      { title: "Project Two", desc: "A brief description of the work", featured: false },
      { title: "Project Three", desc: "A brief description of the work", featured: false },
    ],
    variant: `projects-${setNumber}`,
  };
}

function defaultAbout(site, setNumber) {
  return {
    kind: "about",
    heading: "A little background",
    paragraphs: [
      `With years of hands-on experience as a ${site.category?.toLowerCase() || "professional"}, I've worked across a range of projects that demand both craft and clarity.`,
      "When I'm not working, you'll usually find me reading, exploring, or sketching out the next idea.",
    ],
    skills: [],
    experience: [
      { co: "Independent", role: site.category || "Professional", yr: "2023–Present" },
    ],
    variant: `about-${setNumber}`,
  };
}

function defaultTestimonials(site, setNumber) {
  return {
    kind: "testimonials",
    heading: "What people say",
    items: [
      { quote: "A pleasure to work with — thoughtful, sharp, and always on time.", name: "Jordan Lee", role: "Product Manager" },
      { quote: "Raised the bar for what we expected from this kind of work.", name: "Amara Chen", role: "Founder" },
    ],
    variant: `testimonials-${setNumber}`,
  };
}

function defaultContact(site, setNumber) {
  return {
    kind: "contact",
    heading: "Let's work together",
    message: "I'm always open to discussing new projects, creative ideas, or opportunities to collaborate.",
    socials: [
      { platform: "email", label: "Email" },
      { platform: "github", label: "GitHub" },
      { platform: "linkedin", label: "LinkedIn" },
    ],
    variant: `contact-${setNumber}`,
  };
}

function defaultFooter(site, setNumber, existingContactBlock) {
  const socials = existingContactBlock?.props?.socials ?? [
    { platform: "email", label: "Email" },
  ];
  return {
    kind: "footer",
    heading: site.name || "Portfolio",
    socials,
    variant: `footer-${setNumber}`,
  };
}

const BUILDERS = {
  hero: defaultHero,
  projects: defaultProjects,
  about: defaultAbout,
  testimonials: defaultTestimonials,
  contact: defaultContact,
  footer: defaultFooter,
};

// ---- main ----

const files = readdirSync(TEMPLATES_DIR).filter(
  (f) => f.endsWith(".json") && !f.endsWith(".json.bak")
);

let changedCount = 0;

for (const file of files) {
  const fullPath = join(TEMPLATES_DIR, file);
  const raw = readFileSync(fullPath, "utf-8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    console.warn(`skip (bad json): ${file}`);
    continue;
  }

  if (!Array.isArray(data.blocks)) continue;

  const existingKinds = new Set(data.blocks.map((b) => b?.props?.kind).filter(Boolean));
  const missing = REQUIRED_KINDS.filter((k) => !existingKinds.has(k));

  if (missing.length === 0) continue; // already complete — untouched

  const setNumber = setNumberFor(data.id);
  const existingIds = new Set(data.blocks.map((b) => b.id));
  const existingContactBlock = data.blocks.find((b) => b.props.kind === "contact");

  for (const kind of missing) {
    const id = uniqueId(existingIds, kind);
    existingIds.add(id);
    const props = BUILDERS[kind](data, setNumber, existingContactBlock);
    data.blocks.push({
      id,
      type: `${kind[0].toUpperCase()}${kind.slice(1)}Default`,
      order: 0, // placeholder — real order assigned in the reorder pass below
      props,
    });
  }

  // Reorder EVERYTHING by canonical page position, preserving each
  // kind's original relative order among blocks of the same kind
  // (matters for multi-hero/multi-testimonials templates, if any).
  const withIndex = data.blocks.map((b, i) => ({ b, i }));
  withIndex.sort((x, y) => {
    const kx = CANONICAL_ORDER.indexOf(x.b.props.kind);
    const ky = CANONICAL_ORDER.indexOf(y.b.props.kind);
    const cx = kx === -1 ? CANONICAL_ORDER.length : kx;
    const cy = ky === -1 ? CANONICAL_ORDER.length : ky;
    if (cx !== cy) return cx - cy;
    return x.i - y.i; // stable: keep original relative order within same kind
  });

  data.blocks = withIndex.map(({ b }, newOrder) => ({ ...b, order: newOrder }));

  writeFileSync(fullPath, JSON.stringify(data, null, 2) + "\n", "utf-8");
  changedCount++;
  console.log(`${file}: added [${missing.join(", ")}]`);
}

console.log(`\nDone. ${changedCount}/${files.length} template files updated.`);