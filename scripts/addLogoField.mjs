#!/usr/bin/env node
/**
 * Adds a root-level `logo` field to every template JSON file.
 * Existing logo values are preserved. Safe to run repeatedly.
 *
 * Usage:
 *   node scripts/addLogoField.mjs
 *   node scripts/addLogoField.mjs ./src/data/templates
 */

import fs from "fs";
import path from "path";

const templatesDir = path.resolve(
  process.argv[2] || path.join(process.cwd(), "src/data/templates"),
);

function walkJsonFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkJsonFiles(filePath, files);
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(filePath);
    }
  }
  return files;
}

function addLogoField(filePath) {
  const relativePath = path.relative(templatesDir, filePath);
  const source = fs.readFileSync(filePath, "utf8");

  let template;
  try {
    template = JSON.parse(source);
  } catch (error) {
    console.warn(`Skipped ${relativePath}: invalid JSON (${error.message})`);
    return false;
  }

  if (!template || typeof template !== "object" || Array.isArray(template)) {
    console.warn(`Skipped ${relativePath}: template root must be an object`);
    return false;
  }

  if (Object.prototype.hasOwnProperty.call(template, "logo")) {
    console.log(`Unchanged ${relativePath}: logo already exists`);
    return false;
  }

  template.logo = null;
  fs.writeFileSync(filePath, `${JSON.stringify(template, null, 2)}\n`, "utf8");
  console.log(`Updated ${relativePath}`);
  return true;
}

if (!fs.existsSync(templatesDir)) {
  console.error(`Templates directory not found: ${templatesDir}`);
  process.exit(1);
}

const files = walkJsonFiles(templatesDir);
let updated = 0;

for (const filePath of files) {
  if (addLogoField(filePath)) updated += 1;
}

console.log(`\nDone. Added logo to ${updated} of ${files.length} template file(s).`);
