import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const templatesDir = join(scriptDir, "..", "src", "data", "templates");
const identityKeys = new Set([
  "badgeText",
  "headline",
  "heading",
  "logoText",
  "name",
  "subheadline",
  "title",
]);
const arrayKeysRequiredByComponents = new Set(["items", "links"]);

const entries = await readdir(templatesDir, { withFileTypes: true });
const templateFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".json"));
let updatedFiles = 0;

for (const entry of templateFiles) {
  const filePath = join(templatesDir, entry.name);
  const site = JSON.parse(await readFile(filePath, "utf8"));
  if (site.category !== "AI Product") continue;

  delete site.isPro;
  site.name = "JohnDoe";

  for (const block of site.blocks ?? []) {
    const originalProps = block.props ?? {};
    const nextProps = {
      kind: originalProps.kind,
      variant: originalProps.variant,
    };

    for (const key of Object.keys(originalProps)) {
      if (identityKeys.has(key)) nextProps[key] = "JohnDoe";
      if (arrayKeysRequiredByComponents.has(key)) nextProps[key] = [];
    }

    block.props = nextProps;
  }

  await writeFile(filePath, `${JSON.stringify(site, null, 2)}\n`, "utf8");
  updatedFiles += 1;
}

console.log(`Updated ${updatedFiles} AI Product templates.`);
