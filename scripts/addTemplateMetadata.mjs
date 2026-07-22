#!/usr/bin/env node
/**
 * addTemplateMetadata.mjs
 *
 * Scans every *.json file inside src/data/templates/ (recursively) and adds a
 * default set of visual-editor metadata to every block, WITHOUT overwriting
 * any value that already exists. Safe to run as many times as you want.
 *
 * Usage:  node addTemplateMetadata.mjs
 * (Optional custom path: node addTemplateMetadata.mjs ./some/other/dir)
 */

import fs from "fs";
import path from "path";

const TEMPLATES_DIR = path.resolve(
  process.argv[2] || path.join(process.cwd(), "src/data/templates")
);

// ---------- default metadata shape ----------
// NOTE: none of this touches `props`. Props stays pure content.
// Everything here lives alongside `type`, `order`, `props` on the block.

function defaultLayout() {
  return {
    x: 0,
    y: 0,
    width: "100%",
    height: "auto",
    minWidth: null,
    maxWidth: null,
    minHeight: null,
    maxHeight: null,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    gap: 0,
    zIndex: 0,
  };
}

function defaultStyle() {
  return {
    backgroundColor: null,
    backgroundImage: null,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 0,
    borderWidth: 0,
    borderColor: null,
    borderStyle: "solid",
    boxShadow: null,
    opacity: 1,
    filter: null,
    overflow: "visible",
  };
}

function defaultTypography() {
  return {
    fontFamily: null, // null = inherit from theme.fontHeading/fontBody
    fontSize: null,
    fontWeight: null,
    lineHeight: null,
    letterSpacing: null,
    textAlign: null,
    color: null,
    textTransform: "none",
  };
}

function defaultAnimation() {
  return {
    type: "none", // none | fadeIn | slideUp | slideIn | scaleIn | custom
    duration: 400,
    delay: 0,
    easing: "ease-out",
    trigger: "onView", // onView | onLoad | onHover | onClick | none
    repeat: false,
  };
}

function defaultResponsive() {
  // Per-breakpoint overrides. Empty object = "use base layout/style".
  return {
    desktop: {},
    tablet: {},
    mobile: {},
  };
}

function defaultEditor() {
  return {
    name: null, // friendly layer name, e.g. "Hero Section"
    locked: false,
    visible: true,
    draggable: true,
    resizable: true,
    groupId: null,
    parentId: null,
    lastEditedAt: null,
  };
}

function defaultBlockMeta() {
  return {
    layout: defaultLayout(),
    style: defaultStyle(),
    typography: defaultTypography(),
    animation: defaultAnimation(),
    responsive: defaultResponsive(),
    editor: defaultEditor(),
  };
}

// ---------- deep merge: fills in missing keys only, never overwrites ----------

function isPlainObject(val) {
  return (
    typeof val === "object" &&
    val !== null &&
    !Array.isArray(val)
  );
}

function deepMergeDefaults(target, defaults) {
  if (!isPlainObject(target)) target = {};
  for (const key of Object.keys(defaults)) {
    const defaultVal = defaults[key];
    if (!(key in target)) {
      target[key] = defaultVal;
    } else if (isPlainObject(defaultVal) && isPlainObject(target[key])) {
      target[key] = deepMergeDefaults(target[key], defaultVal);
    }
    // if key exists and isn't a mergeable object, leave user's value untouched
  }
  return target;
}

// ---------- core processing ----------

function processBlock(block) {
  if (!isPlainObject(block)) return block;
  const merged = deepMergeDefaults(block, defaultBlockMeta());
  if (merged.editor.name === null && typeof merged.type === "string") {
    merged.editor.name = merged.type;
  }
  return merged;
}

function processTemplateFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  let json;
  try {
    json = JSON.parse(raw);
  } catch (err) {
    console.warn(`⚠️  Skipping ${filePath} — invalid JSON (${err.message})`);
    return { changed: false };
  }

  if (!Array.isArray(json.blocks)) {
    console.warn(`⚠️  Skipping ${filePath} — no "blocks" array found`);
    return { changed: false };
  }

  const before = JSON.stringify(json);
  json.blocks = json.blocks.map(processBlock);
  const after = JSON.stringify(json, null, 2);

  if (before !== JSON.stringify(json)) {
    fs.writeFileSync(filePath, after + "\n", "utf-8");
    return { changed: true };
  }
  return { changed: false };
}

function walkDir(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(fullPath);
    }
  }
  return files;
}

function main() {
  if (!fs.existsSync(TEMPLATES_DIR)) {
    console.error(`❌ Templates directory not found: ${TEMPLATES_DIR}`);
    process.exit(1);
  }

  const files = walkDir(TEMPLATES_DIR);
  console.log(`Found ${files.length} template file(s) in ${TEMPLATES_DIR}\n`);

  let updatedCount = 0;
  for (const file of files) {
    const { changed } = processTemplateFile(file);
    console.log(`${changed ? "✅ updated " : "✔️  already up to date "} ${path.relative(TEMPLATES_DIR, file)}`);
    if (changed) updatedCount++;
  }

  console.log(`\nDone. ${updatedCount}/${files.length} file(s) updated.`);
}

main();
