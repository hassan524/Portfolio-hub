import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const templatesDir = join(scriptDir, "..", "src", "data", "templates");
const removableBlockKeys = ["layout", "style", "typography", "animation", "responsive", "editor"];

const entries = await readdir(templatesDir, { withFileTypes: true });
const templateFiles = entries
  .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
  .map((entry) => entry.name)
  .sort();

let changedFiles = 0;
let removedFields = 0;

for (const fileName of templateFiles) {
  const filePath = join(templatesDir, fileName);
  const site = JSON.parse(await readFile(filePath, "utf8"));
  let changed = false;

  for (const block of site.blocks ?? []) {
    for (const key of removableBlockKeys) {
      if (Object.hasOwn(block, key)) {
        delete block[key];
        removedFields += 1;
        changed = true;
      }
    }
  }

  if (changed) {
    await writeFile(filePath, `${JSON.stringify(site, null, 2)}\n`, "utf8");
    changedFiles += 1;
  }
}

console.log(`Processed ${templateFiles.length} template files.`);
console.log(
  `Updated ${changedFiles} files and removed ${removedFields} unused block metadata fields.`,
);
