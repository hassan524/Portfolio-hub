import type { SiteData } from "@/types/builder.schema";

// All fonts available to templates (same list as your main project's style.css)
const GOOGLE_FONT_LINKS = `  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Instrument+Serif:ital@0;1&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Roboto:ital,wght@0,100..900;1,100..900&family=Space+Grotesk:wght@300..700&family=Syne:wght@400..800&family=Comic+Relief:wght@400;700&display=swap" rel="stylesheet">
  `;

// Font classes used by <main className="tb-..."> in the generated App.tsx
const FONT_CSS = `  <style>
    .tb-poppins { font-family: "Poppins", sans-serif !important; --font-sans: "Poppins", sans-serif !important; }
    .tb-inter { font-family: "Inter", sans-serif !important; --font-sans: "Inter", sans-serif !important; }
    .tb-fraunces { font-family: "Fraunces", Georgia, serif !important; --font-sans: "Fraunces", Georgia, serif !important; }
    .tb-space-grotesk { font-family: "Space Grotesk", sans-serif !important; --font-sans: "Space Grotesk", sans-serif !important; }
    .tb-cormorant { font-family: "Cormorant Garamond", Georgia, serif !important; --font-sans: "Cormorant Garamond", Georgia, serif !important; }
    .tb-playfair { font-family: "Playfair Display", Georgia, serif !important; --font-sans: "Playfair Display", Georgia, serif !important; }
    .tb-dm-sans { font-family: "DM Sans", Arial, sans-serif !important; --font-sans: "DM Sans", Arial, sans-serif !important; }
    .tb-dm-mono { font-family: "DM Mono", monospace !important; --font-sans: "DM Mono", monospace !important; }
    .tb-instrument { font-family: "Instrument Serif", serif !important; --font-sans: "Instrument Serif", serif !important; }
    .tb-outfit { font-family: "Outfit", sans-serif !important; --font-sans: "Outfit", sans-serif !important; }
    .tb-comic { font-family: "Comic Relief", system-ui !important; --font-sans: "Comic Relief", system-ui !important; }
    .tb-open-sans { font-family: "Open Sans", sans-serif !important; --font-sans: "Open Sans", sans-serif !important; }
    .tb-roboto { font-family: "Roboto", sans-serif !important; --font-sans: "Roboto", sans-serif !important; }
    .tb-syne { font-family: "Syne", sans-serif !important; --font-sans: "Syne", sans-serif !important; }
    .tb-jakarta { font-family: "Plus Jakarta Sans", sans-serif !important; --font-sans: "Plus Jakarta Sans", sans-serif !important; }
    .tb-cinzel { font-family: "Cinzel", serif !important; --font-sans: "Cinzel", serif !important; }
    h1, h2, h3 { font-family: inherit; }
  </style>
`;

export function buildHtml(rawHtml: string, site: SiteData): string {
  let html = rawHtml;

  html = /<title>.*?<\/title>/.test(html)
    ? html.replace(/<title>.*?<\/title>/, `<title>${site.category || "Portfolio"}</title>`)
    : html.replace("</head>", `  <title>${site.category || "Portfolio"}</title>\n  </head>`);

  if (site.logo) {
    html = /<link rel="icon"[^>]*>/.test(html)
      ? html.replace(/<link rel="icon"[^>]*>/, `<link rel="icon" href="${site.logo}" />`)
      : html.replace("</head>", `  <link rel="icon" href="${site.logo}" />\n  </head>`);
  }

  if (!html.includes("family=Fraunces")) {
    html = html.replace("</head>", `${GOOGLE_FONT_LINKS}</head>`);
  }

  if (!html.includes(".tb-inter")) {
    html = html.replace("</head>", `${FONT_CSS}</head>`);
  }

  const themeBg = site.theme?.bg || "#0b0f19";
  const themeInk = site.theme?.ink || "#ffffff";
  const themeAccent = site.theme?.accent || "#3b82f6";
  const themeSurface = site.theme?.surface || site.theme?.bg || "#111827";

  const tailwindThemeScript = `  <script>
    window.tailwind = window.tailwind || {};
    window.tailwind.config = {
      theme: {
        extend: {
          colors: {
            background: 'var(--background)',
            foreground: 'var(--foreground)',
            ink: 'var(--ink)',
            'ink-soft': 'var(--ink-soft)',
            surface: 'var(--surface)',
            'surface-elevated': 'var(--surface-elevated)',
            accent: 'var(--accent)',
            border: 'var(--border)',
            card: 'var(--card)',
          },
          fontFamily: {
            sans: ['Poppins', 'Inter', 'sans-serif'],
            display: ['Poppins', 'Inter', 'sans-serif'],
            serif: ['Instrument Serif', 'serif'],
          },
          spacing: {
            '68': '17rem',
            '76': '19rem',
            '84': '21rem',
          },
          zIndex: {
            '25': '25',
          },
        },
      },
    };
  </script>
  <style>
    :root {
      --background: ${themeBg};
      --foreground: ${themeInk};
      --ink: ${themeInk};
      --ink-soft: color-mix(in srgb, ${themeInk} 70%, transparent);
      --surface: ${themeSurface};
      --surface-elevated: #1f2937;
      --accent: ${themeAccent};
      --border: color-mix(in srgb, ${themeInk} 15%, transparent);
      --card: ${themeSurface};
    }
  </style>
`;

  if (!html.includes("window.tailwind.config")) {
    html = html.replace("</head>", `${tailwindThemeScript}</head>`);
  }

  return html;
}