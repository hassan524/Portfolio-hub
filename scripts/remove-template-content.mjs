import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const templatesDir = join(scriptDir, "..", "src", "data", "templates");
const rootKeysToKeep = new Set(["id", "category", "theme", "blocks", "logo"]);
const blockKeysToKeep = new Set(["id", "type", "order", "props"]);
const propKeysToKeep = new Set(["kind", "variant"]);
const themeKeysToKeep = new Set([
  "bg",
  "ink",
  "accent",
  "accent2",
  "surface",
  "fontHeading",
  "fontBody",
  "corners",
  "spacing",
]);

function cleanProps(props) {
  const cleaned = {};
  for (const [key, value] of Object.entries(props ?? {})) {
    if (propKeysToKeep.has(key)) {
      cleaned[key] = value;
    } else if (Array.isArray(value)) {
      cleaned[key] = [];
    } else if (typeof value === "boolean" || typeof value === "number") {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

const entries = await readdir(templatesDir, { withFileTypes: true });
const templateFiles = entries
  .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
  .map((entry) => entry.name)
  .sort();

for (const fileName of templateFiles) {
  const filePath = join(templatesDir, fileName);
  const source = JSON.parse(await readFile(filePath, "utf8"));
  const cleaned = {};

  for (const [key, value] of Object.entries(source)) {
    if (!rootKeysToKeep.has(key) || key === "isPro") continue;
    if (key === "theme") {
      cleaned.theme = Object.fromEntries(
        Object.entries(value).filter(([themeKey]) => themeKeysToKeep.has(themeKey)),
      );
    } else if (key === "blocks") {
      cleaned.blocks = (value ?? []).map((block) => {
        const nextBlock = {};
        for (const blockKey of blockKeysToKeep) {
          if (blockKey === "props") nextBlock.props = cleanProps(block.props);
          else if (block[blockKey] !== undefined) nextBlock[blockKey] = block[blockKey];
        }
        return nextBlock;
      });
    } else {
      cleaned[key] = value;
    }
  }

  await writeFile(filePath, `${JSON.stringify(cleaned, null, 2)}\n`, "utf8");
}

console.log(`Removed template content from ${templateFiles.length} JSON files.`);
