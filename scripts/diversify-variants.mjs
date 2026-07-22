import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, "..", "src", "data", "templates");

// kinds that have a full numbered set (1..20)
const NUMBERED_KINDS = ["hero", "projects", "about", "contact", "footer", "testimonials"];
const NUMBERED_COUNT = 20;

// kinds with a smaller, named pool (no numbered variants)
const NAMED_POOLS = {
  navbar: ["minimal", "centered-logo", "split", "mega", "sidebar"],
};

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const files = readdirSync(TEMPLATES_DIR).filter(
  (f) => f.endsWith(".json") && !f.endsWith(".json.bak")
);

let changed = 0;

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

  // ONE number per template, derived from the template id — this is
  // what makes hero/projects/about/contact/footer/testimonials all
  // match (e.g. everything is "2": hero-2, projects-2, about-2...)
  const setNumber = (hash(data.id) % NUMBERED_COUNT) + 1;

  let fileChanged = false;

  for (const block of data.blocks) {
    const kind = block?.props?.kind;
    if (!kind) continue;

    let newVariant = null;

    if (NUMBERED_KINDS.includes(kind)) {
      newVariant = `${kind}-${setNumber}`;
    } else if (NAMED_POOLS[kind]) {
      const pool = NAMED_POOLS[kind];
      newVariant = pool[(setNumber - 1) % pool.length];
    }

    if (newVariant && block.props.variant !== newVariant) {
      block.props.variant = newVariant;
      fileChanged = true;
    }
  }

  if (fileChanged) {
    writeFileSync(fullPath, JSON.stringify(data, null, 2) + "\n", "utf-8");
    changed++;
    console.log(`${file} -> set ${setNumber}`);
  }
}

console.log(`\nDone. ${changed}/${files.length} template files updated.`);