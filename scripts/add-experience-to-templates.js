import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.resolve(__dirname, "../src/components/editor/TemplatesUI");

function generateExperienceTemplate(category, num) {
  const componentName = `${category}${num}Experience`;
  return `// @ts-nocheck
export function ${componentName}(props: any) {
  return null;
}

export const Experience = ${componentName};
export default ${componentName};
`;
}

function run() {
  if (!fs.existsSync(TEMPLATES_DIR)) {
    console.error(`Templates directory not found: ${TEMPLATES_DIR}`);
    process.exit(1);
  }

  const categories = fs
    .readdirSync(TEMPLATES_DIR)
    .filter((cat) => fs.statSync(path.join(TEMPLATES_DIR, cat)).isDirectory());

  let createdCount = 0;
  let skippedCount = 0;
  let totalFolders = 0;

  for (const category of categories) {
    const catPath = path.join(TEMPLATES_DIR, category);
    const subDirs = fs
      .readdirSync(catPath)
      .filter(
        (sub) =>
          fs.statSync(path.join(catPath, sub)).isDirectory() && /^\d+$/.test(sub)
      );

    for (const num of subDirs) {
      totalFolders++;
      const targetFile = path.join(catPath, num, "experience.tsx");

      if (fs.existsSync(targetFile)) {
        skippedCount++;
        continue;
      }

      const content = generateExperienceTemplate(category, num);
      fs.writeFileSync(targetFile, content, "utf8");
      createdCount++;
    }
  }

  console.log("==========================================");
  console.log(`Finished processing TemplatesUI!`);
  console.log(`Total template folders: ${totalFolders}`);
  console.log(`Created experience.tsx: ${createdCount}`);
  console.log(`Already existed / skipped: ${skippedCount}`);
  console.log("==========================================");
}

run();
