import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 5 Navbar Variants
const VARIANTS = ["navbar1", "navbar2", "navbar3", "navbar4", "navbar5"];

// Path to your templates folder
const TEMPLATES_DIR = path.join(__dirname, "..", "src", "data", "templates");

/**
 * Dynamically derives logo text from the hero block's person name or template title
 */
function extractLogoText(json) {
  if (Array.isArray(json.blocks)) {
    const heroBlock = json.blocks.find(
      (b) =>
        b.type === "hero" ||
        b.type?.toLowerCase().includes("hero") ||
        b.props?.kind === "hero"
    );

    if (heroBlock?.props?.name) {
      const name = heroBlock.props.name.trim();
      const parts = name.split(" ");

      if (parts.length > 1) {
        return `${parts[0][0]}. ${parts.slice(1).join(" ")}`;
      }

      return name;
    }
  }

  if (json.name) {
    return json.name.split("—")[0].trim();
  }

  return "Brand";
}

/**
 * Generates a full navbar block object matching your block schema
 */
function createNavbarBlock(variant, logoText) {
  return {
    id: `nav-${Math.random().toString(36).substring(2, 7)}`,
    type: "navbar",
    order: 0,
    props: {
      kind: "navbar",
      variant,
      logoText,
      links: [
        { label: "Work", href: "#projects" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" }
      ],
      ctaLabel: "Let's Talk",
      sticky: true
    },
    layout: {
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
      zIndex: 0
    },
    style: {
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
      overflow: "visible"
    },
    typography: {
      fontFamily: null,
      fontSize: null,
      fontWeight: null,
      lineHeight: null,
      letterSpacing: null,
      textAlign: null,
      color: null,
      textTransform: "none"
    },
    animation: {
      type: "none",
      duration: 400,
      delay: 0,
      easing: "ease-out",
      trigger: "onView",
      repeat: false
    },
    responsive: {
      desktop: {},
      tablet: {},
      mobile: {}
    },
    editor: {
      name: "navbar",
      locked: false,
      visible: true,
      draggable: true,
      resizable: true,
      groupId: null,
      parentId: null,
      lastEditedAt: null
    }
  };
}

function processTemplates() {
  if (!fs.existsSync(TEMPLATES_DIR)) {
    console.error(`Directory not found: ${TEMPLATES_DIR}`);
    return;
  }

  const files = fs.readdirSync(TEMPLATES_DIR);
  const jsonFiles = files.filter((file) => file.endsWith(".json"));

  console.log(
    `Found ${jsonFiles.length} template JSON files in ${TEMPLATES_DIR}\n`
  );

  jsonFiles.forEach((file) => {
    const filePath = path.join(TEMPLATES_DIR, file);

    try {
      const rawData = fs.readFileSync(filePath, "utf8");
      const json = JSON.parse(rawData);

      if (!Array.isArray(json.blocks)) {
        console.warn(`[Skip] ${file} does not contain a "blocks" array.`);
        return;
      }

      const existingNavIndex = json.blocks.findIndex(
        (b) =>
          b.type === "navbar" ||
          b.props?.kind === "navbar" ||
          b.type?.toLowerCase().includes("nav")
      );

      const randomVariant =
        VARIANTS[Math.floor(Math.random() * VARIANTS.length)];

      const logoText = extractLogoText(json);
      const navBlock = createNavbarBlock(randomVariant, logoText);

      if (existingNavIndex !== -1) {
        json.blocks[existingNavIndex] = navBlock;
        console.log(
          `[Updated] ${file} -> ${randomVariant} (logo: "${logoText}")`
        );
      } else {
        json.blocks.unshift(navBlock);
        console.log(
          `[Inserted] ${file} -> ${randomVariant} (logo: "${logoText}")`
        );
      }

      // Reset order values
      json.blocks.forEach((block, index) => {
        block.order = index;
      });

      fs.writeFileSync(filePath, JSON.stringify(json, null, 2), "utf8");
    } catch (err) {
      console.error(`[Error] ${file}:`, err.message);
    }
  });

  console.log("\n✅ All templates updated successfully!");
}

processTemplates();